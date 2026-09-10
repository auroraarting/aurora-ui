import { getHowWeHelpListing } from "./HowWeHelp.service";
import { getAllSlugs, getSingleBySlug } from "./Single.service";

/**
 * The /who-are-you/[slug] page.
 *
 * `whoAreYous` is the ACF field-group name WPGraphQL nested these fields
 * under, and WhoAreYouInsideWrap reads `data.whoAreYous…`.
 */

/** One who-are-you entry, with every ACF relationship resolved.
 *  @param {string} slug
 *  @returns {Promise<any|null>} */
export const getSingleWhoAreYou = (slug) =>
	getSingleBySlug("whoareyou", slug, { group: "whoAreYous" });

/**
 * The listing this page passes to its sections as `services`.
 *
 * Note this returns how-we-help entries, not who-are-you entries: the GraphQL
 * service it replaces queried `howWeHelps` under the name `getWhoAreYous`, and
 * the page uses the result both for that prop and for generateStaticParams.
 * That looks like a copy-paste slip in the original, but changing it would
 * change which pages get pre-rendered, so the behaviour is preserved exactly —
 * see getWhoAreYouSlugs for the list this page arguably wanted.
 *
 * @returns {Promise<any[]>}
 */
export const getWhoAreYous = () => getHowWeHelpListing();

/** The who-are-you slugs themselves, which the page does not currently use.
 *  @returns {Promise<Array<{ title: string, slug: string }>>} */
export const getWhoAreYouSlugs = () => getAllSlugs("whoareyou");
