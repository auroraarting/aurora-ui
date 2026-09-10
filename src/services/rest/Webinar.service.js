import RESTAPI, { restAll, restByIds } from "../Rest.service";

import {
	getCountries,
	getFeaturedImages,
	getPostSpeakers,
	resolveRelations,
	resolveRelationsBatch,
} from "./Relations.service";
import { getPageGroup, resolveMixedPosts } from "./Single.service";
import {
	arr,
	html,
	nodes,
	raw,
	shapeAcf,
	termLookup,
	termNodes,
	text,
	translationNodes,
} from "./shape";

/**
 * Webinars.
 *
 * These live in the `tribe_events` post type — The Events Calendar's CPT,
 * registered in this install with the label "Webinars" — not in anything
 * called `webinar`. `webinarsFields` is the ACF field-group name WPGraphQL
 * nested their fields under.
 *
 * The listing is fetched under `context=edit`, because the GraphQL query asked
 * for `content(format: RAW)` and REST only exposes `content.raw` in that
 * context. That needs the AUTH_TOKEN to be valid for editing; without it these
 * calls 401 rather than quietly returning filtered content.
 */

/** How many webinars to fetch per request.
 *
 *  Not the 100 cap: `context=edit` returns `raw` *and* `rendered` for both
 *  title and content, which took 100 webinars to ~2.5 MB — over the Data
 *  Cache's 2 MB per-entry limit. Next.js logs "items over 2MB can not be
 *  cached" and then serves that fetch uncached, so every request re-fetches
 *  it, which is the load this migration exists to remove. 40 a page lands
 *  around 1 MB. */
const listingPerPage = 40;

/** What a webinar card renders. */
const listingFields = [
	"id",
	"slug",
	"title",
	"content",
	"translations",
	"webinar-tag",
	"tribe_events_cat",
	"featured_media",
	"featured_image_url",
	"acf.country",
	"acf.start_date_and_time",
	"acf.end_date_and_time",
	"acf.timezone",
	"acf.service_by",
	"acf.sections",
].join(",");

/** The detail page reads the whole field group. */
const insideFields =
	"id,slug,title,content,translations,webinar-tag,tribe_events_cat,featured_media,featured_image_url,acf";

/** The post types the `service_by` picker accepts, with the ACF group name
 *  WPGraphQL exposed each one's fields under. */
const serviceByTypes = [
	{ endpoint: "products", group: "products" },
	{ endpoint: "services", group: "services" },
	{ endpoint: "softwares", group: "softwares" },
];

/** The relationship fields on this post type. */
const relations = {
	country: getCountries,
	serviceBy: (ids) => resolveMixedPosts(ids, serviceByTypes).then(nodes),
	speakers: getPostSpeakers,
};

/** Term ids a webinar carries, by taxonomy, in the shape GraphQL used. */
const taxonomies = [
	{ key: "webinar-tag", endpoint: "webinar-tag", field: "webinarTags" },
	{
		key: "tribe_events_cat",
		endpoint: "tribe_events_cat",
		field: "eventCategories",
	},
];

/**
 * Resolve both taxonomies across a whole set of webinars — one call per
 * taxonomy for the set, not per webinar.
 *
 * @param {any[]} posts raw REST webinars
 * @returns {Promise<Array<Record<string, any>>>} one term-node object per post
 */
async function getTaxonomies(posts) {
	const lookups = await Promise.all(
		taxonomies.map(async ({ key, endpoint }) => {
			const ids = [
				...new Set(arr(posts).flatMap((post) => arr(post?.[key]).map(Number))),
			].filter(Boolean);
			if (!ids.length) return termLookup([]);
			const terms = await restByIds(endpoint, ids, {
				apiID: endpoint,
				// Terms carry WPML translations, which the GraphQL query selected.
				fields: "id,name,slug,translations",
			});
			return termLookup(terms);
		}),
	);

	return arr(posts).map((post) =>
		Object.fromEntries(
			taxonomies.map(({ key, field }, index) => [
				field,
				termNodes(post?.[key], lookups[index]),
			]),
		),
	);
}

/**
 * One webinar, before its relations and terms are attached.
 *
 * The two queries this replaces disagree about `content`: the listing asked
 * for `content(format: RAW)` and the detail page for plain `content`, which is
 * the filtered output. So the listing reads `content.raw` (edit context) and
 * the detail page the rendered form.
 *
 * @param {any} post raw REST webinar
 * @param {object} [options]
 * @param {boolean} [options.rawContent] take the unfiltered body
 */
const shapeWebinar = (post, options = {}) => ({
	title: text(post.title),
	slug: post.slug,
	content: options.rawContent ? raw(post.content) : html(post.content) || null,
	translations: translationNodes(post.translations),
	webinarsFields: shapeAcf(post.acf || {}),
});

/**
 * The webinar-listing landing content.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.webinarsListing`
 */
export const getWebinarPage = () => getPageGroup("webinar-listing");

/**
 * Every webinar, shaped as GraphQL nodes.
 *
 * @param {object} [options]
 * @param {number} [options.first] cap the list; omit for all of them
 * @returns {Promise<any[]>} the nodes previously read as
 *   `res.data.webinars.nodes`
 */
export const getWebinars = async (options = {}) => {
	const { first } = options;
	const query = `tribe_events?context=edit&_fields=${listingFields}`;

	const posts = first
		? arr(
			await RESTAPI(`${query}&per_page=${Math.min(first, 100)}`, {
				apiID: "tribe_events",
			}),
		)
		: await restAll(`${query}&per_page=${listingPerPage}`, {
			apiID: "tribe_events",
		});
	if (!posts.length) return [];

	const webinars = posts.map((post) => shapeWebinar(post, { rawContent: true }));
	const [terms, images] = await Promise.all([
		getTaxonomies(posts),
		getFeaturedImages(posts),
		resolveRelationsBatch(
			webinars.map((webinar) => webinar.webinarsFields),
			relations,
		),
	]);

	webinars.forEach((webinar, index) => {
		Object.assign(webinar, terms[index]);
		webinar.featuredImage = images.get(Number(posts[index].id)) ?? null;
	});
	return webinars;
};

/**
 * One webinar, with every ACF relationship and both taxonomies resolved.
 *
 * @param {string} slug
 * @returns {Promise<any|null>}
 */
export const getWebinarInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`tribe_events?slug=${encodeURIComponent(clean)}&_fields=${insideFields}`,
		{ apiID: "tribe_events", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const webinar = shapeWebinar(post);
	const [terms, images] = await Promise.all([
		getTaxonomies([post]),
		getFeaturedImages([post]),
		resolveRelations(webinar.webinarsFields, relations),
	]);

	Object.assign(webinar, terms[0]);
	webinar.featuredImage = images.get(Number(post.id)) ?? null;
	return webinar;
};
