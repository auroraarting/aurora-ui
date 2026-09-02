// Office locations over REST.
//
// `getOffices` is the flat list of every office — one request, same
// `{ data: { offices: { nodes } } }` shape the GraphQL query returned.
//
// `getOfficesByRegions` is deliberately NOT ported: it walks regions → countries
// → each country's office relation, which is the same fan-out as GlobalPresence
// and turns one query into a dozen-plus requests. Converting it would work
// against the throttling it is meant to relieve, so the routes that need it
// still use the GraphQL service.

import { loadAll, orNull, renderedTitle, toConnection, toMediaNode, toSlug } from "./GraphqlShape";

const PAGE_ID = "/company/contact";

/** The `map` group. ACF already stores lat/lng as numbers, which is what
 *  GraphQL returned too. */
const mapLocation = (field) => {
	const map = orNull(field);
	if (!map) return null;
	return {
		lat: orNull(map.lat),
		lng: orNull(map.lng),
		mapUrl: orNull(map.map_url),
	};
};

/** Fetch Offices
 *
 *  `first` caps the list. The standalone query asked for everything, but the
 *  Life at Aurora query omits the argument entirely, which means WPGraphQL's
 *  default page size of 10 — so that caller passes it explicitly. */
export const getOffices = async ({ first } = {}) => {
	const rows = (
		await loadAll("offices", "_fields=id,slug,title,acf.map,acf.thumbnail", {
			apiID: "offices",
			pageID: PAGE_ID,
		})
	).slice(0, first ?? Infinity);

	return {
		data: {
			offices: toConnection(
				rows.map((row) => ({
					offices: {
						thumbnail: toMediaNode(row.acf?.thumbnail),
						map: mapLocation(row.acf?.map),
					},
					title: renderedTitle(row.title),
					slug: toSlug(row.slug),
				})),
			),
		},
	};
};
