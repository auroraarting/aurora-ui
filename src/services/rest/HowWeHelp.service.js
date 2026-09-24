import { restAll } from "../Rest.service";

import { resolveRelationsBatch } from "./Relations.service";
import { getAllSlugs, getSingleBySlug, resolveMixedPosts } from "./Single.service";
import { nodes, shapeAcf, text } from "./shape";

/**
 * The /how-we-help/[slug] page, and the how-we-help listing that both this
 * page and /who-are-you/[slug] pass to their sections as `services`.
 *
 * `howWeHelpInside` is the ACF field-group name WPGraphQL nested these fields
 * under, and the sections read `data.howWeHelpInside…`.
 */

/** The post types the spotlight picker accepts, each with the ACF group name
 *  WPGraphQL exposed its fields under. The sections switch on
 *  `contentType.node.name` and then read that type's group. */
const spotlightTypes = [
	{ endpoint: "howwehelp", group: "howWeHelpInside" },
	{ endpoint: "products", group: "products" },
	{ endpoint: "services", group: "services" },
	{ endpoint: "softwares", group: "softwares" },
];

/** `spotlights.selected` mixes four post types in one ID list, which GraphQL
 *  handled with an inline fragment each. */
const spotlightRelations = {
	"spotlights.selected": async (ids) =>
		nodes(await resolveMixedPosts(ids, spotlightTypes)),
};

/** One how-we-help entry, with every ACF relationship resolved.
 *  @param {string} slug
 *  @returns {Promise<any|null>} */
export const getSingleHowWeHelp = (slug) =>
	getSingleBySlug("howwehelp", slug, {
		group: "howWeHelpInside",
		relations: spotlightRelations,
	});

/**
 * Every how-we-help entry with its full field group — the listing the
 * spotlight and card sections render.
 *
 * Each entry carries its own logo and testimonial pickers, so those are
 * resolved across the whole listing at once (two calls for the list, not two
 * per entry).
 *
 * @returns {Promise<any[]>} the nodes the sections take as `services`
 */
export const getHowWeHelpListing = async () => {
	const posts = await restAll("howwehelp?_fields=id,slug,title,acf", {
		apiID: "howwehelp",
	});

	const shaped = posts.map((post) => ({
		id: post.id,
		title: text(post.title),
		slug: post.slug,
		howWeHelpInside: shapeAcf(post.acf || {}),
	}));

	await resolveRelationsBatch(shaped.map((item) => item.howWeHelpInside));
	return shaped;
};

/** Slugs only, for generateStaticParams.
 *  @returns {Promise<Array<{ title: string, slug: string }>>} */
export const getHowWeHelpSlugs = () => getAllSlugs("howwehelp");
