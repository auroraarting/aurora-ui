// Global-presence data from WordPress over the REST API.
//
// Drop-in replacement for the GraphQL `getRegions` query, returning the same
// `{ data: { regions: { nodes: [ … ] } } }` shape so the map helpers
// (getMapJsonForSoftware, filterMarkersBySlug) and the sections that read them
// need no changes.
//
// Two things REST does not hand over the way GraphQL did:
//   * Countries hang off the `region` taxonomy, so each region's countries come
//     from a filtered `/country` collection rather than a nested connection.
//   * A marker's `category` is a bare post id with no hint of which post type
//     owns it, so all three candidate types are asked at once and the id is
//     matched against whichever answers.

import {
	asList,
	decodeEntities,
	loadByIds,
	orNull,
	renderedHtml,
	renderedTitle,
	rest as restCall,
	toConnection,
	toFeaturedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
	PER_PAGE,
} from "./GraphqlShape";

const PAGE_ID = "/global-presence";
const API_ID = "country-regions";

/** The post types a map marker's `category` can point at. GraphQL resolved this
 *  through inline fragments on Service / Software / Product; here the id is
 *  looked up in each collection and the one that answers wins. Each entry maps
 *  the REST post type to the field name GraphQL nested its ACF under. */
const MARKER_TYPES = [
	{ postType: "products", field: "products" },
	{ postType: "softwares", field: "softwares" },
	{ postType: "services", field: "services" },
];

const rest = (path) => restCall(path, { apiID: API_ID, pageID: PAGE_ID });

/** `{ lat, lng }` — ACF stores both as strings and GraphQL passed them through. */
function toLatLng(point) {
	const value = orNull(point);
	if (!value) return null;
	return { lat: orNull(value.lat), lng: orNull(value.lng) };
}

/** One marker's `category` connection. The ACF field currently holds a single
 *  post id, but `toIds` also copes with it being an array or an expanded object,
 *  so a change to the field's return format does not blank every marker. */
function mapMarkerCategory(field, targets) {
	const ids = toIds(field);
	if (!ids.length) return toConnection([]);

	const nodes = [];
	for (const id of ids) {
		const target = targets.get(id);
		if (!target) continue;
		nodes.push({
			contentType: { node: { name: target.postType } },
			id: toGlobalId(target.row.id),
			title: renderedTitle(target.row.title),
			slug: toSlug(target.row.slug),
			content: renderedHtml(target.row.content),
			// Only the group for this marker's own post type — GraphQL's inline
			// fragments never added the other two.
			[target.field]: {
				map: { logo: toMediaNode((target.row.acf?.map || {}).logo) },
			},
		});
	}
	return toConnection(nodes);
}

/** The `map` field group on a country. */
function mapCountryMap(acf, targets) {
	const map = orNull(acf.map);
	if (!map) return null;
	const markers = toRows(map.markers);
	return {
		zoom: orNull(map.zoom),
		countryPin: toLatLng(map.country_pin),
		markers:
			markers?.map((marker) => ({
				mapThumbnail: toMediaNode(marker.map_thumbnail),
				category: mapMarkerCategory(marker.category, targets),
				coordinates: toLatLng(marker.coordinates),
			})) ?? null,
	};
}

/** The `bannerSection` field group on a country. */
function mapBannerSection(acf) {
	const banner = orNull(acf.banner_section);
	if (!banner) return null;
	return {
		description: wpautop(banner.description),
		title: orNull(banner.title),
		videoLink: orNull(banner.video_link),
		image: toMediaNode(banner.image),
		mobileImage: toMediaNode(banner.mobile_image),
	};
}

/** One country node, in the shape the GraphQL connection returned it. */
function mapCountry(row, { targets, media }) {
	const acf = row.acf || {};
	return {
		content: renderedHtml(row.content),
		slug: toSlug(row.slug),
		title: renderedTitle(row.title),
		// GraphQL nested the country ACF group under `countries`.
		countries: {
			hideonglobalpresence: acf.hideonglobalpresence ?? null,
			bannerSection: mapBannerSection(acf),
			map: mapCountryMap(acf, targets),
		},
		featuredImage: toFeaturedImage(media.get(row.featured_media)),
	};
}

/** Resolve marker ids across the three candidate post types, one call each. */
async function loadMarkerTargets(ids) {
	const unique = [...new Set(ids)];
	const targets = new Map();
	if (!unique.length) return targets;

	const results = await Promise.all(
		MARKER_TYPES.map(({ postType }) =>
			loadByIds(postType, unique, "id,slug,title,content,acf.map", {
				apiID: postType,
				pageID: PAGE_ID,
			}),
		),
	);

	results.forEach((rows, index) => {
		const { postType, field } = MARKER_TYPES[index];
		for (const [id, row] of rows) {
			// An id can only belong to one post type, so first answer wins.
			if (!targets.has(id)) targets.set(id, { postType, field, row });
		}
	});
	return targets;
}

/** Fetch Regions Data */
export const getRegions = async () => {
	// Regions come back ordered by name, which is what the GraphQL connection did.
	const regions = asList(
		await rest(`/region?per_page=${PER_PAGE}&_fields=id,name,slug`),
	);

	// Each region's countries, ordered by title the way the query asked.
	const countriesByRegion = await Promise.all(
		regions.map((region) =>
			rest(
				`/country?region=${region.id}&orderby=title&order=asc&per_page=${PER_PAGE}` +
					"&_fields=id,slug,title,content,featured_media,acf",
			).then(asList),
		),
	);

	// Marker targets and country featured images are only knowable once the
	// countries are in, and both batch across every region.
	const markerIds = [];
	const mediaIds = [];
	for (const countries of countriesByRegion) {
		for (const row of countries) {
			if (row.featured_media) mediaIds.push(row.featured_media);
			for (const marker of toRows((row.acf?.map || {}).markers) || []) {
				markerIds.push(...toIds(marker.category));
			}
		}
	}

	const [targets, media] = await Promise.all([
		loadMarkerTargets(markerIds),
		loadByIds("media", mediaIds, "id,source_url,alt_text", {
			apiID: "media",
			pageID: PAGE_ID,
		}),
	]);

	return {
		data: {
			regions: toConnection(
				regions.map((region, index) => ({
					name: decodeEntities(region.name),
					slug: toSlug(region.slug),
					countries: toConnection(
						countriesByRegion[index].map((row) =>
							mapCountry(row, { targets, media }),
						),
					),
				})),
			),
		},
	};
};
