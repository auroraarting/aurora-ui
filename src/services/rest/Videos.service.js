import RESTAPI, { restAll } from "../Rest.service";

import {
	getCountries,
	getPostSpeakers,
	getPoweredBy,
	getTestimonials,
	resolveRelations,
	resolveRelationsBatch,
} from "./Relations.service";
import { resolveMixedPosts } from "./Single.service";
import { html, nodes, shapeAcf, text, urlNode } from "./shape";

/**
 * Videos.
 *
 * `videoFields` is the ACF field-group name WPGraphQL nested these under, and
 * the sections read `item.videoFields.date`.
 *
 * Two relationship fields on the listing need resolving: `country` (a Country
 * relation) and `topic`, which accepts pages, software and products in one
 * field. Both are resolved once for the whole listing.
 */

/** What a video card renders. */
const listingFields =
	"id,slug,title,content,acf.thumbnail,acf.topic,acf.date,acf.time,acf.country";

/** The card fields the "latest videos" rail needs, minus the body. */
const latestFields =
	"id,slug,title,date,acf.date,acf.time,acf.thumbnail,acf.country";

/** The post types the `topic` picker accepts. Only id/title/slug are read off
 *  them, so the ACF group each one would carry is not fetched. */
const topicTypes = [
	{ endpoint: "pages", group: "page", fields: "id,type,slug,title" },
	{ endpoint: "softwares", group: "softwares", fields: "id,type,slug,title" },
	{ endpoint: "products", group: "products", fields: "id,type,slug,title" },
];

/** A `topic` picker resolved across its three possible post types.
 *  @param {Array<number>} ids */
const getTopics = async (ids) => nodes(await resolveMixedPosts(ids, topicTypes));

/** The relationship fields on the video listing. */
const listingRelations = { country: getCountries, topic: getTopics };

/** The extra ones the detail page carries. */
const insideRelations = {
	...listingRelations,
	speakers: getPostSpeakers,
	testimonials: getTestimonials,
	poweredBy: getPoweredBy,
};

/** One video card. @param {any} post raw REST video */
const shapeVideo = (post) => ({
	title: text(post.title),
	slug: post.slug,
	...("content" in post ? { content: html(post.content) || null } : {}),
	...("date" in post ? { date: post.date } : {}),
	videoFields: shapeAcf(post.acf || {}),
});

/**
 * Every video, shaped as GraphQL nodes.
 *
 * @returns {Promise<any[]>} the nodes previously read as `res.data.videos.nodes`
 */
export const getAllVideos = async () => {
	const posts = await restAll(`video?_fields=${listingFields}`, {
		apiID: "video",
	});
	if (!posts.length) return [];
	const entries = posts.map(shapeVideo);
	await resolveRelationsBatch(
		entries.map((entry) => entry.videoFields),
		listingRelations,
	);
	return entries;
};

/**
 * The most recent videos, newest first, excluding the given one.
 *
 * The ordering and the `date` fallback are the GraphQL service's own — it did
 * this filtering in JavaScript too, because the sort key is an ACF field
 * rather than the post date.
 *
 * @param {string} slug the video to leave out
 * @returns {Promise<any[]>}
 */
export const getLatestVideos = async (slug) => {
	const posts = await restAll(`video?_fields=${latestFields}`, {
		apiID: "video",
	});
	const entries = posts.map(shapeVideo);
	await resolveRelationsBatch(
		entries.map((entry) => entry.videoFields),
		listingRelations,
	);

	/** The CMS date, falling back to the published date. @param {any} item */
	const videoDate = (item) => item?.videoFields?.date || item?.date;
	const currentSlug = decodeURIComponent(slug || "");

	return entries
		.filter((item) => item?.slug !== currentSlug)
		.sort((a, b) => new Date(videoDate(b)) - new Date(videoDate(a)))
		.map((item) => ({ ...item, date: videoDate(item) }));
};

/**
 * One video, with every ACF relationship resolved.
 *
 * @param {string} slug
 * @returns {Promise<any|null>}
 */
export const getVideosInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`video?slug=${encodeURIComponent(clean)}&_fields=id,slug,title,content,featured_media,featured_image_url,acf`,
		{ apiID: "video", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const videoFields = shapeAcf(post.acf || {});
	const entry = {
		title: text(post.title),
		slug: post.slug,
		content: html(post.content) || null,
		featuredImage: urlNode(post.featured_image_url),
		videoFields,
	};

	await resolveRelations(videoFields, insideRelations);
	return entry;
};
