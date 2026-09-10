import RESTAPI, { restAll, restByIds } from "../Rest.service";

import { resolveRelations } from "./Relations.service";
import { html, shapeAcf, text } from "./shape";

/**
 * The shape shared by every CPT single page.
 *
 * services, products, softwares, whoareyou, howwehelp and country all follow
 * the same three steps: fetch one post by slug, rebuild the ACF field-group
 * container WPGraphQL nested its fields under, and resolve the relationship
 * fields REST returns as bare IDs. Only the endpoint, the group name and any
 * extra relationships differ, so each page service is now a few lines.
 */

/** The whole ACF payload plus the post fields the sections read. A CPT single
 *  is one post, so fetching `acf` wholesale is well inside the Data Cache's
 *  per-entry limit — the trimming that matters is on collections. */
const singleFields = "id,slug,title,content,featured_media,featured_image_url,acf";

/**
 * One post of a custom post type, in the shape its section expects.
 *
 * @param {string} endpoint WP rest_base, e.g. "services", "whoareyou"
 * @param {string} slug
 * @param {object} options
 * @param {string} options.group ACF field-group name WPGraphQL used, e.g.
 *   "services", "whoAreYous", "howWeHelpInside" — the sections read this path
 * @param {Record<string, (ids: number[]) => Promise<any>>} [options.relations]
 *   extra or replacement relationship resolvers, keyed by shaped ACF path
 * @param {string} [options.fields] override the `_fields` requested
 * @returns {Promise<any|null>} null when no post matches the slug
 */
export async function getSingleBySlug(endpoint, slug, options) {
	const { group, relations = {}, fields = singleFields } = options;
	const clean = decodeURIComponent(slug ?? "");

	const found = await RESTAPI(
		`${endpoint}?slug=${encodeURIComponent(clean)}&_fields=${fields}`,
		{ apiID: endpoint, slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const acf = await resolveRelations(shapeAcf(post.acf || {}), relations);

	return {
		id: post.id,
		title: text(post.title),
		slug: post.slug,
		[group]: acf,
	};
}

/**
 * Every slug of a post type, for generateStaticParams.
 *
 * @param {string} endpoint WP rest_base
 * @param {object} [options]
 * @param {string} [options.fields] extra fields beyond title and slug
 * @returns {Promise<Array<{ title: string, slug: string }>>}
 */
export async function getAllSlugs(endpoint, options = {}) {
	const fields = options.fields || "title,slug";
	const posts = await restAll(`${endpoint}?_fields=${fields}`, {
		apiID: endpoint,
	});
	return posts.map((post) => ({
		...post,
		title: text(post.title),
		slug: post.slug,
	}));
}

/**
 * Resolve post IDs whose post type is not known in advance.
 *
 * ACF relationship fields that accept several post types store a flat list of
 * IDs with no type information — a spotlight picker holding a mix of
 * how-we-help entries, products, services and software, where GraphQL used an
 * inline fragment per type. Each candidate endpoint is asked for the IDs it
 * recognises, so the cost is one call per candidate type however many IDs
 * there are, and posts of the wrong type simply do not come back.
 *
 * Each result carries `contentType.node.name` (REST's `type`, which is the
 * same string GraphQL returned) and its own ACF group, because the sections
 * switch on the type and then read the type's group.
 *
 * @param {Array<number|string>} ids
 * @param {Array<{ endpoint: string, group: string, fields?: string }>} types
 *   candidate post types, each with the ACF group name WPGraphQL used
 * @returns {Promise<any[]>} in the order the IDs were given
 */
export async function resolveMixedPosts(ids, types) {
	const wanted = [...new Set((ids || []).map(Number).filter(Boolean))];
	if (!wanted.length) return [];

	const found = await Promise.all(
		types.map(({ endpoint, group, fields }) =>
			restByIds(endpoint, wanted, {
				apiID: endpoint,
				fields: fields || "id,type,slug,title,content,acf",
			}).then((posts) =>
				posts.map((post) => ({
					id: post.id,
					title: text(post.title),
					slug: post.slug,
					contentType: { node: { name: post.type } },
					[group]: shapeAcf(post.acf || {}),
				})),
			),
		),
	);

	const byId = new Map(found.flat().map((post) => [Number(post.id), post]));
	return wanted.map((id) => byId.get(id)).filter(Boolean);
}

/**
 * A WordPress page's title and content, nothing else.
 *
 * The legal and policy routes render only these, so they need no ACF at all
 * and are immune to whether a field group is exposed to REST.
 *
 * WPGraphQL addressed these pages by URI (`page(id: "cookies", idType: URI)`).
 * REST has no URI lookup, but every page here is top-level, so its slug is its
 * URI — verified for each one, each returning exactly one match.
 *
 * @param {string} slug
 * @param {object} [options]
 * @param {string} [options.pageId] cache-tag hint when the slug is not the tag
 * @returns {Promise<{ slug: string, title: string, content: string|null }|null>}
 */
export async function getPageContent(slug, options = {}) {
	const found = await RESTAPI(
		`pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,title,content`,
		{ apiID: "pages", slug: options.pageId || slug },
	);
	const page = Array.isArray(found) ? found[0] : found;
	if (!page) return null;
	return {
		slug: page.slug,
		title: text(page.title),
		// Empty was null over GraphQL, not "".
		content: html(page.content) || null,
	};
}

/**
 * One page's ACF field group, in the shape its section expects.
 *
 * The landing pages each keep their fields in a single group that WPGraphQL
 * exposed under the group's own name (`faq`, `joinUs`, `lifeAtAurora`), which
 * REST flattens onto `acf`. Callers previously unwrapped `res.data.page.<group>`
 * themselves, so this returns that inner object directly.
 *
 * @param {string} slug page slug
 * @param {object} [options]
 * @param {Record<string, (ids: number[]) => Promise<any>>} [options.relations]
 *   relationship resolvers, keyed by shaped ACF path
 * @param {string} [options.fields] `_fields` to request, default the whole acf
 * @returns {Promise<any|null>}
 */
export async function getPageGroup(slug, options = {}) {
	const { relations = {}, fields = "id,slug,title,acf" } = options;
	const found = await RESTAPI(
		`pages?slug=${encodeURIComponent(slug)}&_fields=${fields}`,
		{ apiID: "pages", slug },
	);
	const page = Array.isArray(found) ? found[0] : found;
	if (!page) return null;
	return resolveRelations(shapeAcf(page.acf || {}), relations);
}

/**
 * One page's ACF field group, addressed by database id rather than slug.
 *
 * The videos landing service identifies its page by id, so this exists for it.
 * `pages?include=<id>` is used rather than `pages/<id>` because the latter
 * answers 404 for a missing id, which the wrapper turns into a thrown error;
 * the collection form returns an empty list, matching the `null` WPGraphQL
 * returned for an id that no longer exists.
 *
 * @param {number} id page database id
 * @param {object} [options] see {@link getPageGroup}
 * @returns {Promise<any|null>}
 */
export async function getPageGroupById(id, options = {}) {
	const { relations = {}, fields = "id,slug,title,acf" } = options;
	const found = await RESTAPI(
		`pages?include=${Number(id)}&per_page=1&_fields=${fields}`,
		{ apiID: "pages", tags: [`page:${id}`] },
	);
	const page = Array.isArray(found) ? found[0] : found;
	if (!page) return null;
	return resolveRelations(shapeAcf(page.acf || {}), relations);
}
