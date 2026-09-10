import RESTAPI, { restAll } from "../Rest.service";

import {
	getCountries,
	getFeaturedImages,
	getPostSpeakers,
	getPoweredBy,
	getTestimonials,
	resolveRelations,
	resolveRelationsBatch,
} from "./Relations.service";
import { html, shapeAcf, text, urlNode } from "./shape";

/**
 * Podcast episodes (Energy Unplugged).
 *
 * `podcastFields` is the ACF field-group name WPGraphQL nested these under.
 * The relationship fields are the ones shared with videos and webinars, so the
 * resolvers come from Relations.service.js; for a listing they are batched
 * across every episode at once.
 */

/** What an episode card renders. */
const listingFields =
	"id,slug,title,date,content,featured_media,featured_image_url,acf.time,acf.date,acf.country,acf.powered_by,acf.sections";

/** The detail page reads the whole field group. */
const insideFields =
	"id,slug,title,content,featured_media,featured_image_url,acf";

/** The relationship fields on this post type. */
const relations = {
	country: getCountries,
	poweredBy: getPoweredBy,
	speakers: getPostSpeakers,
	testimonials: getTestimonials,
};

/** One episode. @param {any} post raw REST podcast */
const shapeEpisode = (post) => ({
	title: text(post.title),
	slug: post.slug,
	...("date" in post ? { date: post.date } : {}),
	content: html(post.content) || null,
	featuredImage: urlNode(post.featured_image_url),
	podcastFields: shapeAcf(post.acf || {}),
});

/**
 * Every episode, shaped as GraphQL nodes.
 *
 * @returns {Promise<any[]>} the nodes previously read as
 *   `res.data.podcasts.nodes`
 */
export const getPodcasts = async () => {
	const posts = await restAll(`podcast?_fields=${listingFields}`, {
		apiID: "podcast",
	});
	if (!posts.length) return [];

	const episodes = posts.map(shapeEpisode);
	const [images] = await Promise.all([
		getFeaturedImages(posts),
		resolveRelationsBatch(
			episodes.map((episode) => episode.podcastFields),
			relations,
		),
	]);
	// The episode artwork carries real alt text in this CMS, which
	// featured_image_url alone does not expose.
	episodes.forEach((episode, index) => {
		episode.featuredImage = images.get(Number(posts[index].id)) ?? null;
	});
	return episodes;
};

/**
 * One episode, with every ACF relationship resolved.
 *
 * @param {string} slug
 * @returns {Promise<any|null>}
 */
export const getPodcastInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`podcast?slug=${encodeURIComponent(clean)}&_fields=${insideFields}`,
		{ apiID: "podcast", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const episode = shapeEpisode(post);
	const [images] = await Promise.all([
		getFeaturedImages([post]),
		resolveRelations(episode.podcastFields, relations),
	]);
	episode.featuredImage = images.get(Number(post.id)) ?? null;
	return episode;
};
