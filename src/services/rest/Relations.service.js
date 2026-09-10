import { restByIds } from "../Rest.service";

import { getPostsByIds } from "./Posts.service";
import {
	arr,
	decodeEntities,
	html,
	nodes,
	shapeAcf,
	text,
	translationNodes,
	urlNode,
} from "./shape";

/**
 * The ACF relationship fields that recur across the CPT single pages.
 *
 * services, products, softwares, whoareyou and howwehelp all carry the same
 * four: a client-logo picker, a testimonial picker, selected case studies and
 * selected insights. Over GraphQL these arrived inline; over REST each is a
 * list of post IDs that has to be fetched and reshaped. Doing that once here
 * keeps the five page services thin, and means a fix to any of these shapes
 * lands everywhere at once.
 */

/** Case-study cards show an image, categories and a read time. */
export const caseStudyFields =
	"id,slug,title,date,content,featured_image_url,categories,acf.time";

/** Insight cards show no image or body — a date, categories, read time. */
export const insightFields = "id,slug,title,date,categories,acf.time";

const logoFields = "id,title,featured_image_url";
const testimonialFields =
	"id,slug,title,content,featured_image_url,acf.designation";

/**
 * Client logos as `{ nodes: [{ id, featuredImage }] }`.
 *
 * REST carries no alt text on `featured_image_url`, so the post title is used
 * — for a logo that is the company name, which is better alt text than the
 * mostly-empty attachment field GraphQL returned.
 *
 * @param {Array<number>} ids
 */
export async function getClientLogos(ids) {
	const logos = await restByIds("clients-logo", ids, {
		apiID: "clients-logo",
		fields: logoFields,
	});
	return nodes(
		logos.map((logo) => ({
			id: logo.id,
			title: text(logo.title),
			featuredImage: urlNode(logo.featured_image_url),
		})),
	);
}

/**
 * Testimonials as `{ nodes: [{ id, title, content, featuredImage,
 * testimonials: { designation } }] }` — `testimonials` being the ACF group
 * name WPGraphQL nested the role under.
 *
 * @param {Array<number>} ids
 */
export async function getTestimonials(ids) {
	const items = await restByIds("testimonial", ids, {
		apiID: "testimonial",
		fields: testimonialFields,
	});
	return nodes(
		items.map((item) => ({
			id: item.id,
			title: text(item.title),
			slug: item.slug,
			content: html(item.content) || null,
			featuredImage: urlNode(item.featured_image_url),
			// Empty was null over GraphQL, not "" — see the note in shapeAcf.
			testimonials: { designation: item.acf?.designation || null },
		})),
	);
}

/** Selected posts as a `{ nodes }` connection. @param {Array<number>} ids @param {string} fields */
const postConnection = async (ids, fields) =>
	nodes(await getPostsByIds(ids, { fields }));

/** ACF path to the resolver for the IDs stored there. Paths are given in the
 *  shaped (camel-cased) form, because they are applied after shapeAcf. */
const defaultRelations = {
	"ourClient.selectLogos": getClientLogos,
	"ourClient.testimonials": getTestimonials,
	"caseStudy.selectCaseStudies": (ids) =>
		postConnection(ids, caseStudyFields),
	"insights.list": (ids) => postConnection(ids, insightFields),
};

/** Read a dotted path without creating anything along the way. */
function getAt(object, path) {
	return path.split(".").reduce((node, key) => node?.[key], object);
}

/** Write a dotted path, but only over a key that is already there.
 *
 *  Both conditions matter. An absent group must stay absent rather than being
 *  invented, and a group that exists without this particular field must not
 *  gain one: the insights group on life-at-aurora has no `list`, and writing
 *  `list: null` onto it would add a field GraphQL never returned. */
function setAt(object, path, value) {
	const keys = path.split(".");
	const last = keys.pop();
	const parent = keys.reduce((node, key) => node?.[key], object);
	if (parent && typeof parent === "object" && last in parent) {
		parent[last] = value;
	}
}

/**
 * Resolve every relationship field on a shaped ACF payload, in place.
 *
 * Fields with no selection are set to null rather than an empty connection,
 * because that is what GraphQL returned and several sections branch on it
 * (TrustedLeaders renders nothing at all when `selectLogos` is absent).
 *
 * All resolvers run together; the limiter decides the actual concurrency, so
 * this controls call count, not parallelism.
 *
 * @param {any} acf output of shapeAcf
 * @param {Record<string, (ids: number[]) => Promise<any>>} [overrides] extra or
 *   replacement resolvers, keyed by shaped ACF path
 * @returns {Promise<any>} the same object, mutated
 */
export async function resolveRelations(acf, overrides = {}) {
	if (!acf || typeof acf !== "object") return acf;
	const spec = { ...defaultRelations, ...overrides };

	await Promise.all(
		Object.entries(spec).map(async ([path, resolve]) => {
			const keys = path.split(".");
			const field = keys[keys.length - 1];
			const parent = keys.slice(0, -1).join(".");
			// Nothing to do if the group, or the field itself, is not on this
			// post type — setAt would ignore the write anyway, and this saves
			// the upstream call.
			const owner = parent ? getAt(acf, parent) : acf;
			if (!owner || typeof owner !== "object" || !(field in owner)) return;

			const ids = arr(getAt(acf, path)).map(Number).filter(Boolean);
			setAt(acf, path, ids.length ? await resolve(ids) : null);
		}),
	);
	return acf;
}

/**
 * Resolve the same relationship fields across a whole list of posts, batching
 * each field into one call for the entire list.
 *
 * A listing where every item carries its own client-logo and testimonial
 * pickers would otherwise cost two calls per item. Collecting the IDs across
 * all items first makes it two calls for the listing, then redistributing them
 * preserves each item's own selection and order.
 *
 * Resolvers must return a `{ nodes }` connection whose nodes carry `id`, which
 * every resolver here does.
 *
 * @param {any[]} acfList shaped ACF payloads, one per post; mutated in place
 * @param {Record<string, (ids: number[]) => Promise<any>>} [overrides]
 * @returns {Promise<any[]>} the same list
 */
export async function resolveRelationsBatch(acfList, overrides = {}) {
	const list = arr(acfList).filter((acf) => acf && typeof acf === "object");
	if (!list.length) return acfList;
	const spec = { ...defaultRelations, ...overrides };

	await Promise.all(
		Object.entries(spec).map(async ([path, resolve]) => {
			const segments = path.split(".");
			const field = segments[segments.length - 1];
			const parentPath = segments.slice(0, -1).join(".");

			// null marks a post that does not carry this field at all, so it is
			// left untouched rather than given an empty connection.
			const perPost = list.map((acf) => {
				const owner = parentPath ? getAt(acf, parentPath) : acf;
				if (!owner || typeof owner !== "object" || !(field in owner)) {
					return null;
				}
				return arr(getAt(acf, path)).map(Number).filter(Boolean);
			});

			const everyId = [...new Set(perPost.flatMap((ids) => ids || []))];
			if (!everyId.length) {
				perPost.forEach((ids, index) => {
					if (ids !== null) setAt(list[index], path, null);
				});
				return;
			}

			const resolved = await resolve(everyId);
			const byId = new Map(
				arr(resolved?.nodes).map((node) => [Number(node?.id), node]),
			);

			perPost.forEach((ids, index) => {
				if (ids === null) return;
				setAt(
					list[index],
					path,
					ids.length
						? { nodes: ids.map((id) => byId.get(id)).filter(Boolean) }
						: null,
				);
			});
		}),
	);
	return acfList;
}

/** Article cards under a team member carry an image, categories and a time. */
const articleFields =
	"id,slug,title,date,featured_image_url,categories,acf.time";

/**
 * An ACF gallery as `{ nodes: [{ altText, mediaItemUrl }] }`.
 *
 * Note the shape: WPGraphQL's `gallery { nodes { altText mediaItemUrl } }` puts
 * the attachment fields directly on each node, unlike a single image field,
 * which wraps them in `node`. REST stores a gallery as attachment IDs, so they
 * are fetched from /media in one call.
 *
 * @param {Array<number>} ids attachment IDs
 */
export async function getGallery(ids) {
	const media = await restByIds("media", ids, {
		apiID: "media",
		fields: "id,alt_text,source_url,title",
	});
	return nodes(
		media.map((item) => ({
			altText: decodeEntities(item.alt_text || ""),
			mediaItemUrl: item.source_url,
		})),
	);
}

/**
 * People — team members, post authors, speakers — as
 * `{ nodes: [{ id, title, slug, content, [group]: … }] }`, where `group` is the
 * ACF field-group name WPGraphQL nested that post type's fields under.
 *
 * All three types share a shape: a thumbnail group with a designation and a
 * LinkedIn link, and an `articles.articlesby` relation pointing at their own
 * posts. That relation is resolved across the whole set of people at once, so
 * a fourteen-leader section costs one extra call rather than fourteen.
 *
 * @param {string} endpoint WP rest_base, e.g. "team", "post-author"
 * @param {string} group ACF group name, e.g. "teams", "postAuthors"
 * @param {Array<number>} ids
 */
async function getPeople(endpoint, group, ids) {
	const people = await restByIds(endpoint, ids, {
		apiID: endpoint,
		fields: "id,slug,title,content,acf",
	});

	const shaped = people.map((person) => ({
		id: person.id,
		title: text(person.title),
		slug: person.slug,
		content: html(person.content) || null,
		[group]: shapeAcf(person.acf || {}),
	}));

	await resolveRelationsBatch(
		shaped.map((person) => person[group]),
		{
			"articles.articlesby": (articleIds) =>
				postConnection(articleIds, articleFields),
		},
	);

	return nodes(shaped);
}

/** Team members, under the `teams` ACF group. @param {Array<number>} ids */
export const getTeamMembers = (ids) => getPeople("team", "teams", ids);

/** Post authors, under the `postAuthors` ACF group. @param {Array<number>} ids */
export const getPostAuthors = (ids) =>
	getPeople("post-author", "postAuthors", ids);

/** Post speakers, under the `postSpeakers` ACF group. @param {Array<number>} ids */
export const getPostSpeakers = (ids) =>
	getPeople("post-speaker", "postSpeakers", ids);

/**
 * Countries as `{ nodes: [{ id, slug, title }] }`.
 *
 * The country picker appears on videos, podcasts, webinars and programmes, so
 * it lives here rather than in each of them.
 *
 * @param {Array<number>} ids
 */
export async function getCountries(ids) {
	const countries = await restByIds("country", ids, {
		apiID: "country",
		fields: "id,slug,title,translations",
	});
	return nodes(
		countries.map((country) => ({
			id: country.id,
			slug: country.slug,
			title: text(country.title),
			// The webinar query selects these; harmless extra elsewhere.
			translations: translationNodes(country.translations),
		})),
	);
}

/** The post types a `powered_by` picker accepts, with the ACF field-group name
 *  WPGraphQL exposed each one's fields under. The sections switch on
 *  `contentType.node.name` and then read that type's group. */
const poweredByTypes = [
	{ endpoint: "products", group: "products" },
	{ endpoint: "services", group: "services" },
	{ endpoint: "softwares", group: "softwares" },
];

/**
 * A `powered_by` picker resolved across its three possible post types.
 *
 * Single.service.js is imported at call time rather than at the top of the
 * file: it imports this module for resolveRelations, and a static import both
 * ways would be a cycle.
 *
 * @param {Array<number>} ids
 */
export async function getPoweredBy(ids) {
	const { resolveMixedPosts } = await import("./Single.service");
	return nodes(await resolveMixedPosts(ids, poweredByTypes));
}

/**
 * Featured images with their real alt text, keyed by post id.
 *
 * `featured_image_url` is a URL and nothing else, so a featured image shaped
 * from it alone has an empty `altText` — while WPGraphQL returned the
 * attachment's own alt. Mostly that is the same thing (3 of the first 100
 * attachments in this CMS carry alt text at all), but the podcast episodes do
 * have it, and dropping it is an accessibility regression on every episode
 * card. One `/media?include=…` call per listing buys the real value.
 *
 * Falls back to the URL-only shape for a post whose attachment cannot be
 * fetched, so a deleted attachment degrades rather than throwing.
 *
 * @param {any[]} posts raw REST posts carrying `featured_media`
 * @returns {Promise<Map<number, any>>} post id to `{ node }` or null
 */
export async function getFeaturedImages(posts) {
	const list = arr(posts);
	const ids = [
		...new Set(list.map((post) => Number(post?.featured_media)).filter(Boolean)),
	];

	const media = ids.length
		? await restByIds("media", ids, {
			apiID: "media",
			fields: "id,alt_text,source_url",
		})
		: [];
	const byId = new Map(media.map((item) => [Number(item.id), item]));

	const out = new Map();
	for (const post of list) {
		const item = byId.get(Number(post?.featured_media));
		out.set(
			Number(post?.id),
			item
				? {
					node: {
						altText: decodeEntities(item.alt_text || ""),
						mediaItemUrl: item.source_url,
					},
				}
				: urlNode(post?.featured_image_url),
		);
	}
	return out;
}
