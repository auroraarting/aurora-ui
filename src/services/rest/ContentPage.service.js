// The plain content pages — the ones whose whole payload is a WordPress page's
// title and body, with no ACF fields at all.
//
// Drop-in replacements for the GraphQL Cookies / Terms / Policy / SafeSender
// services: each returns the same `{ data: { page: { slug, title, content } } }`
// shape, so the routes reading `data.page.title` need no changes.
//
// These four had identical queries, so they share one mapper here. Because they
// touch no ACF, they are unaffected by which field groups are exposed to REST —
// and each is a single request, exactly as the GraphQL version was.

import { asList, renderedHtml, renderedTitle, rest, toSlug } from "./GraphqlShape";

/** One page by slug, in the shape the GraphQL `page(id: …, idType: URI)`
 *  selection returned. `page` is null when WordPress has no such page — the
 *  same thing GraphQL did, and what the routes' destructuring expects to be an
 *  object whenever the page exists. */
async function getContentPage(slug, pageID) {
	const res = await rest(
		`/pages?slug=${encodeURIComponent(slug)}&_fields=slug,title,content`,
		{ apiID: "page", pageID },
	);
	const row = asList(res)[0] || null;

	return {
		data: {
			page: row
				? {
						slug: toSlug(row.slug),
						title: renderedTitle(row.title),
						content: renderedHtml(row.content),
					}
				: null,
		},
	};
}

/** Fetch Page */
export const getCookies = async () => getContentPage("cookies", "/legal/cookies");

/** Fetch Page */
export const getTerms = async () => getContentPage("terms", "/legal/terms");

/** Fetch Page */
export const getPolicy = async () =>
	getContentPage("policies-and-compliance", "/policies-and-compliance");

/** Fetch Page */
export const getSafeSender = async () =>
	getContentPage(
		"add-aurora-as-a-safe-sender",
		"/add-aurora-as-a-safe-sender",
	);
