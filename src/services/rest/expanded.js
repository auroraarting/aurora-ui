import { arr } from "./shape";

/**
 * Reading ACF relations that arrived inline.
 *
 * With `_acf_expand` (see withExpansion in Rest.service.js) a relation field
 * holds the related posts themselves rather than their ids, so the resolvers in
 * Relations.service.js can shape what is already in hand instead of fetching
 * it. The shapes they produce are unchanged — this only removes the request.
 *
 * An expanded entry, from cms/aurora-acf-expand.php:
 *
 *     { id, slug, title, content, type, type_label, status, date, link,
 *       terms, featured_media, featured_image: { url, alt } | null, acf }
 *
 * Two things it does not carry, which callers have to account for:
 *
 *   - **`translations`.** Every relation target checked on production has an
 *     empty `translations` array, and translationNodes(undefined) is likewise
 *     `[]`, so reading it off an expanded node matches today's output. It would
 *     stop matching if any of these post types were ever translated.
 *   - **the root post's own taxonomies.** Expansion rewrites the `acf` block
 *     only, so a post's own categories/tags still cost their own lookup.
 *
 * `title` is entity-encoded here (get_the_title()), exactly as wp/v2 sends it,
 * so the usual `text()` decode applies unchanged.
 */

/** Does this look like an expanded relation entry rather than a bare id?
 *  @param {any} value */
export const isExpandedNode = (value) =>
	!!value &&
	typeof value === "object" &&
	!Array.isArray(value) &&
	"type" in value &&
	"acf" in value &&
	"slug" in value;

/**
 * The expanded entries behind a relation value, or null if it is still ids.
 *
 * All-or-nothing on purpose: a half-expanded value means the plugin hit its
 * budget, and shaping only the entries that made it would silently drop the
 * rest. Returning null there sends the caller back to fetching, which is
 * correct if slower.
 *
 * @param {any} value
 * @returns {any[]|null}
 */
export function expandedNodes(value) {
	const list = arr(value);
	if (!list.length) return null;
	return list.every(isExpandedNode) ? list : null;
}

/** An expanded media value — `{ id, url, alt }` — as the `{ node }` wrapper the
 *  components read. The plugin normalises every image, file and gallery field
 *  to this shape at any depth, which is what removes the /media call that
 *  existed only to recover alt text.
 *  @param {any} value @returns {{node: {altText: string, mediaItemUrl: string}}|null} */
export function expandedMedia(value) {
	const url = value?.url ?? value?.mediaItemUrl;
	if (!url || typeof url !== "string") return null;
	return { node: { altText: String(value?.alt ?? ""), mediaItemUrl: url } };
}

/** A related post's featured image, in the same `{ node }` wrapper.
 *  @param {any} node expanded entry */
export const expandedFeatured = (node) => expandedMedia(node?.featured_image);

/**
 * Term ids for one taxonomy off an expanded entry's `terms`.
 *
 * The plugin groups a post's terms by taxonomy; the resolvers want the same
 * `{ id, name, slug }` rows their own lookup produced.
 *
 * @param {any} node expanded entry
 * @param {string} taxonomy
 * @returns {any[]}
 */
export const expandedTerms = (node, taxonomy) => arr(node?.terms?.[taxonomy]);
