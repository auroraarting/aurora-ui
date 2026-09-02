// Global-presence data from WordPress over the REST API.
//
// Drop-in replacement for the GraphQL `getRegions` query, returning the same
// `{ data: { regions: { nodes: [ … ] } } }` shape so the map helpers
// (getMapJsonForSoftware, filterMarkersBySlug) and the sections that read them
// need no changes.
//
// Countries hang off the `region` taxonomy, so they come from one `/country`
// collection grouped by region rather than a nested connection. Each country's
// map markers arrive with their `category` relation already expanded by
// cms/aurora-acf-expand.php, which is what used to cost three extra requests
// (one per candidate post type) plus one for the marker thumbnails.

import {
	ACF_EXPAND,
	asList,
	decodeEntities,
	expandedTitle,
	loadByIds,
	orNull,
	rest as restCall,
	toConnection,
	toExpanded,
	toFeaturedImage,
	toGlobalId,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
	PER_PAGE,
} from "./GraphqlShape";

const PAGE_ID = "/global-presence";
const API_ID = "country-regions";

/** The GraphQL query nested each marker target's ACF under a key named after
 *  its post type. The expanded row reports that type, so the key comes from the
 *  data rather than from a lookup table. */
const MARKER_FIELD = {
	products: "products",
	softwares: "softwares",
	services: "services",
};

const rest = (path) => restCall(path, { apiID: API_ID, pageID: PAGE_ID });

/** `{ lat, lng }` — ACF stores both as strings and GraphQL passed them through. */
function toLatLng(point) {
	const value = orNull(point);
	if (!value) return null;
	return { lat: orNull(value.lat), lng: orNull(value.lng) };
}

/** One marker's `category` connection, built from the expanded relation. */
function mapMarkerCategory(field) {
	const nodes = [];
	for (const target of toExpanded(field)) {
		const key = MARKER_FIELD[target.type];
		if (!key) continue;
		nodes.push({
			contentType: { node: { name: target.type } },
			id: toGlobalId(target.id),
			title: expandedTitle(target),
			slug: toSlug(target.slug),
			content: orNull(target.content),
			// Only the group for this marker's own post type — GraphQL's inline
			// fragments never added the other two.
			[key]: { map: { logo: toMediaNode((target.acf?.map || {}).logo) } },
		});
	}
	return toConnection(nodes);
}

/** The `map` field group on a country. */
function mapCountryMap(acf) {
	const map = orNull(acf.map);
	if (!map) return null;
	const markers = toRows(map.markers);
	return {
		zoom: orNull(map.zoom),
		countryPin: toLatLng(map.country_pin),
		markers:
			markers?.map((marker) => ({
				mapThumbnail: toMediaNode(marker.map_thumbnail),
				category: mapMarkerCategory(marker.category),
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
function mapCountry(row, media) {
	const acf = row.acf || {};
	return {
		content: orNull(row.content?.rendered ?? null),
		slug: toSlug(row.slug),
		title: expandedTitle({ title: row.title?.rendered }),
		// GraphQL nested the country ACF group under `countries`.
		countries: {
			hideonglobalpresence: acf.hideonglobalpresence ?? null,
			bannerSection: mapBannerSection(acf),
			map: mapCountryMap(acf),
		},
		featuredImage: toFeaturedImage(media.get(row.featured_media)),
	};
}

/** Fetch Regions Data
 *
 *  Two requests: the regions, and every country in one go with its ACF expanded.
 *  The countries come back title-ascending, and filtering a sorted list per
 *  region keeps each region sorted — so grouping client-side gives the same
 *  order the four separate per-region queries did.
 *
 *  A third request happens only if a country has a featured image (one does), to
 *  pick up its alt text, which `featured_image_url` does not carry. */
export const getRegions = async () => {
	const [regions, countries] = await Promise.all([
		rest(`/region?per_page=${PER_PAGE}&_fields=id,name,slug`),
		rest(
			`/country?per_page=${PER_PAGE}&orderby=title&order=asc` +
				`&_fields=id,slug,title,content,featured_media,region,acf&${ACF_EXPAND}`,
		).then(asList),
	]);

	const mediaIds = countries
		.map((country) => country.featured_media)
		.filter(Boolean);
	const media = mediaIds.length
		? await loadByIds("media", mediaIds, "id,source_url,alt_text", {
				apiID: "media",
				pageID: PAGE_ID,
			})
		: new Map();

	return {
		data: {
			regions: toConnection(
				asList(regions).map((region) => ({
					name: decodeEntities(region.name),
					slug: toSlug(region.slug),
					countries: toConnection(
						countries
							.filter((country) => (country.region || []).includes(region.id))
							.map((country) => mapCountry(country, media)),
					),
				})),
			),
		},
	};
};
