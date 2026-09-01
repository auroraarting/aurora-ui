// SEO metadata from WordPress over the REST API.
//
// Drop-in replacement for the GraphQL `getPageSeo` query in terms of *response*:
// the object returned is keyed by the same GraphQL root field the old selector
// string named, so `generateMetadata` implementations reading
// `meta?.data?.page?.seo` or `meta?.data?.softwareBy?.seo` need no changes.
//
// The *argument* is REST-shaped rather than a GraphQL fragment:
//
//     getPageSeo({ postType: "pages", slug: "software" })
//     getPageSeo({ postType: "softwares", slug: "chronos" })
//
// Yoast supplies the values through `yoast_head_json`.

import { asList, rest } from "./GraphqlShape";

const PAGE_ID = "/common";

/** REST post type → the GraphQL root field whose name keyed the response.
 *  Deliberately explicit: a post type that is not listed throws, so migrating
 *  another route means adding its mapping on purpose rather than silently
 *  returning an object under the wrong key. */
const ROOT_FIELD = {
	pages: "page",
	softwares: "softwareBy",
};

/** Yoast omits `description` entirely when it is unset, where WPGraphQL's
 *  `metaDesc` came back as an empty string. */
const orEmpty = (value) => (value === undefined || value === null ? "" : value);

/** getPageSeo
 *
 *  `metaKeywords` is always "" — Yoast's legacy keywords field is not published
 *  in `yoast_head_json`, and it is empty on every item checked here, which is
 *  what GraphQL returned too. If this site ever starts using keywords, they will
 *  need exposing on the REST side before this field means anything.
 */
export const getPageSeo = async ({ postType, slug } = {}) => {
	const rootField = ROOT_FIELD[postType];
	if (!rootField) {
		throw new Error(
			`getPageSeo: unmapped postType ${JSON.stringify(postType)} — ` +
				`add it to ROOT_FIELD (known: ${Object.keys(ROOT_FIELD).join(", ")})`,
		);
	}

	const res = await rest(
		`/${postType}?slug=${encodeURIComponent(decodeURIComponent(slug))}` +
			"&_fields=id,slug,status,yoast_head_json",
		{ apiID: "common", pageID: PAGE_ID },
	);
	const row = asList(res)[0] || null;

	return {
		data: {
			[rootField]: row
				? {
						status: row.status,
						seo: {
							title: orEmpty(row.yoast_head_json?.title),
							metaDesc: orEmpty(row.yoast_head_json?.description),
							metaKeywords: "",
						},
					}
				: null,
		},
	};
};
