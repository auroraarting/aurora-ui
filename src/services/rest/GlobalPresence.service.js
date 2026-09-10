import RESTAPI, { restAll } from "../Rest.service";

import { arr, html, mediaNode, shapeAcf, text, urlNode } from "./shape";

/**
 * Regions, their countries, and the map markers on each country.
 *
 * The GraphQL original was one query nesting four levels — regions → countries
 * → ACF map → markers → a polymorphic relationship to Service | Product |
 * Software. REST cannot nest, so the same data is assembled from five calls:
 *
 *   1. the region taxonomy terms                     (4 terms)
 *   2. every country, with only the ACF groups needed (44 in one call)
 *   3-5. services, products and softwares            (10 posts total)
 *
 * Countries are grouped by their `region` term IDs locally rather than queried
 * per region, and markers are resolved against a single ID→node lookup built
 * from calls 3-5, so marker count does not affect call count.
 *
 * Nested `_fields` matters here: the full ACF payload for 44 countries is
 * 3.6 MB, which is over the Next.js Data Cache's per-entry limit and would
 * silently stop being cached. Selecting the three groups actually used brings
 * it to ~200 KB.
 *
 * The return value keeps the GraphQL envelope — `{ data: { regions: { nodes }}}`
 * — because filterMarkersBySlug and the getMapJsonFor* helpers in @/utils walk
 * exactly that path.
 */

/** ACF groups getRegions reads off a country. Anything not listed here is not
 *  fetched at all — see the size note above. */
const countryFields = [
	"id",
	"slug",
	"title",
	"content",
	"region",
	"featured_image_url",
	"acf.map",
	"acf.banner_section",
	"acf.hideonglobalpresence",
].join(",");

/** The three post types a map marker can point at, and the ACF field-group
 *  name WPGraphQL exposed each one's fields under. The group name is part of
 *  the shape the map helpers read (`node.services.map.logo`), so it has to be
 *  rebuilt rather than flattened. */
const markerTypes = ["services", "products", "softwares"];

/** Only the logo is read off a marker's target. */
const markerFields = "id,type,title,slug,content,acf.map.logo";

/**
 * One ID→node lookup covering every post a marker can reference.
 *
 * Markers store a bare post ID with no hint of its type, so all three
 * collections are fetched and indexed together. They total ten posts, so this
 * is cheaper than resolving markers individually would ever be.
 *
 * @returns {Promise<Map<number, any>>}
 */
async function getMarkerTargets() {
	const collections = await Promise.all(
		markerTypes.map((endpoint) =>
			restAll(`${endpoint}?_fields=${markerFields}`, { apiID: endpoint }),
		),
	);

	const lookup = new Map();
	collections.forEach((items, index) => {
		const groupKey = markerTypes[index];
		for (const item of items) {
			lookup.set(Number(item.id), {
				id: item.id,
				title: text(item.title),
				slug: item.slug,
				content: html(item.content),
				// REST's `type` is the same string GraphQL's contentType.node.name
				// returned ("services"/"products"/"softwares"), which the map helpers
				// switch on.
				contentType: { node: { name: item.type } },
				[groupKey]: {
					map: { logo: mediaNode(item.acf?.map?.logo) },
				},
			});
		}
	});
	return lookup;
}

/**
 * One country in the GraphQL shape, including its ACF group container.
 *
 * The whole ACF payload is shaped in one call rather than group by group, so
 * the formatted counterparts thread through the recursion. The country banner
 * descriptions are WYSIWYG, and shaping `acf.banner_section` on its own would
 * lose the `<p>` wrappers and curly quotes WPGraphQL returned — the formatted
 * mirror lives on the parent as `banner_section_source` (see shapeAcf). Only
 * the marker relations are patched up afterwards.
 *
 * @param {any} country raw REST country
 * @param {Map<number, any>} targets from {@link getMarkerTargets}
 */
function shapeCountry(country, targets) {
	const acf = shapeAcf(country.acf || {});

	// `category` is a single ID over REST and was a connection over GraphQL, so
	// it is wrapped back into { nodes: [...] }. Unresolvable IDs (a target that
	// was deleted or unpublished) drop out rather than becoming null entries
	// the map helpers would have to guard against.
	for (const marker of arr(acf.map?.markers)) {
		marker.category = {
			nodes: arr(marker.category)
				.map((id) => targets.get(Number(id)))
				.filter(Boolean),
		};
	}

	return {
		// Empty was null over GraphQL, not "" — matched so sections that test
		// truthiness or hand the value to a parser behave as they do today.
		content: html(country.content) || null,
		slug: country.slug,
		title: text(country.title),
		featuredImage: urlNode(country.featured_image_url),
		// "countries" is the ACF field-group name WPGraphQL nested these under.
		countries: acf,
	};
}

/**
 * Regions with their countries and markers.
 *
 * @returns {Promise<{ data: { regions: { nodes: any[] } } }>}
 */
export const getRegions = async () => {
	const [regions, countries, targets] = await Promise.all([
		restAll("region?_fields=id,name,slug&orderby=name&order=asc", {
			apiID: "region",
		}),
		restAll(
			`country?_fields=${countryFields}&orderby=title&order=asc`,
			// Tagged for both types: this one fetch is invalidated by a country
			// edit and by a change to the region taxonomy itself.
			{ apiID: "country", tags: ["region"] },
		),
		getMarkerTargets(),
	]);

	const nodes = regions.map((region) => ({
		name: text(region.name),
		slug: region.slug,
		countries: {
			nodes: countries
				.filter((country) => arr(country.region).map(Number).includes(Number(region.id)))
				.map((country) => shapeCountry(country, targets)),
		},
	}));

	return { data: { regions: { nodes } } };
};

/** A flat, title-ordered list of countries — the `countries(first: 9999)`
 *  selection several single-page queries carried alongside their own data.
 *  @returns {Promise<Array<{ title: string, slug: string }>>} */
export const getCountryList = async () => {
	const countries = await RESTAPI(
		"country?per_page=100&orderby=title&order=asc&_fields=title,slug",
		{ apiID: "country" },
	);
	return arr(countries).map((country) => ({
		title: text(country.title),
		slug: country.slug,
	}));
};
