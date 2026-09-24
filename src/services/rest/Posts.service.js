import { restByIds } from "../Rest.service";

import {
	getFeaturedImages,
	resolveRelationsBatch,
} from "./Relations.service";

import { arr, postNode, termLookup } from "./shape";

/**
 * Shared post and taxonomy resolution.
 *
 * REST returns term IDs on a post and bare post IDs inside ACF relationship
 * fields, where GraphQL inlined the whole node. Almost every page therefore
 * needs the same two steps — fetch a set of posts by ID, then resolve the term
 * IDs they carry — so both live here rather than in each page's service.
 *
 * Terms are resolved in one call per taxonomy for the whole set of posts, not
 * per post: a list of 20 insights referencing 30 categories costs one extra
 * call, not twenty.
 */

/** Enough to render a post in a listing or card. `content` is included because
 *  several sections derive an excerpt from it. */
export const postCardFields =
	"id,slug,title,date,content,featured_image_url,categories,tags,translations,acf.time";

/** WPGraphQL exposed a few post ACF fields under names that are not the plain
 *  camel-cased REST key. */
export const postAcfRename = {};

/**
 * Term lookups for every term ID a set of posts references.
 *
 * @param {any[]} posts raw REST posts
 * @param {object} [options]
 * @param {boolean} [options.tags] also resolve the post-tag taxonomy
 * @returns {Promise<{ categories: Map<number, any>, tags: Map<number, any> }>}
 */
export async function getTermLookups(posts, options = {}) {
	/** Every distinct term ID the posts carry under `key`. @param {string} key */
	const collect = (key) => [
		...new Set(arr(posts).flatMap((post) => arr(post?.[key]).map(Number))),
	].filter(Boolean);

	const categoryIds = collect("categories");
	const tagIds = options.tags ? collect("tags") : [];

	const [categories, tags] = await Promise.all([
		categoryIds.length
			? restByIds("categories", categoryIds, {
				apiID: "categories",
				fields: "id,name,slug,translations",
			})
			: [],
		tagIds.length
			? restByIds("tags", tagIds, {
				apiID: "tags",
				fields: "id,name,slug,translations",
			})
			: [],
	]);

	return { categories: termLookup(categories), tags: termLookup(tags) };
}

/**
 * Posts by ID, shaped as GraphQL nodes with their terms resolved.
 *
 * Used for every ACF relationship field that points at posts — a service's
 * case studies, a country's insights, a landing page's hand-picked articles.
 * Order follows the IDs given, because those fields are ordered in the CMS.
 *
 * @param {Array<number|string>} ids
 * @param {object} [options]
 * @param {string} [options.fields] _fields to request, default {@link postCardFields}
 * @param {boolean} [options.tags] resolve post tags as well as categories
 * @param {string} [options.endpoint] post type to read, default "posts"
 * @param {string} [options.group] ACF container key, default "postFields"
 * @returns {Promise<any[]>}
 */
export async function getPostsByIds(ids, options = {}) {
	const {
		fields = postCardFields,
		tags = false,
		endpoint = "posts",
		group = "postFields",
	} = options;

	const posts = await restByIds(endpoint, ids, { apiID: endpoint, fields });
	return shapePosts(posts, { tags, group, relations: options.relations });
}

/**
 * Shape an already-fetched list of posts, resolving their terms and any
 * relationship fields on their ACF group.
 *
 * Relationships are resolved across the whole list at once, so a list of
 * twenty insights referencing authors costs one extra call, not twenty.
 *
 * @param {any[]} posts raw REST posts
 * @param {object} [options] see {@link getPostsByIds}
 * @param {Record<string, (ids: number[]) => Promise<any>>} [options.relations]
 *   resolvers keyed by path within the ACF group
 * @returns {Promise<any[]>}
 */
export async function shapePosts(posts, options = {}) {
	const { tags = false, group = "postFields", relations } = options;
	const list = arr(posts);
	if (!list.length) return [];

	const [lookups, images] = await Promise.all([
		getTermLookups(list, { tags }),
		getFeaturedImages(list),
	]);
	const shaped = list.map((post) =>
		postNode(post, {
			categories: lookups.categories,
			tags: tags ? lookups.tags : undefined,
			rename: postAcfRename,
			group,
		}),
	);

	// The attachment's own alt text, which featured_image_url does not carry.
	shaped.forEach((post, index) => {
		if (post) post.featuredImage = images.get(Number(list[index].id)) ?? null;
	});

	if (relations) {
		await resolveRelationsBatch(
			shaped.map((post) => post[group]).filter(Boolean),
			relations,
		);
	}
	return shaped;
}
