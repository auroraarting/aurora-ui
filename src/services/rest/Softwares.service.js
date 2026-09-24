import { restAll } from "../Rest.service";

import { resolveRelationsBatch } from "./Relations.service";
import {
	getAllSlugs,
	getPageGroup,
	getSingleBySlug,
} from "./Single.service";
import { shapeAcf, text, translationNodes } from "./shape";

/**
 * Software.
 *
 * `softwares` is the ACF field-group name WPGraphQL nested a product's fields
 * under, `softwareLanding` the landing page's. The relationship fields are the
 * shared four, so Relations.service.js covers them.
 *
 * `translations` rides along on the single fetch: the detail page builds its
 * language switcher by matching each translation's `language.language_code`
 * against the site's language list, and REST publishes that field with the
 * same nesting.
 */

/**
 * One software product, with every ACF relationship resolved.
 *
 * @param {string} slug
 * @returns {Promise<any|null>} the node the section takes as `data`
 */
export const getSingleSoftware = (slug) =>
	getSingleBySlug("softwares", slug, {
		group: "softwares",
		fields: "id,slug,title,content,translations,featured_media,featured_image_url,acf",
	});

/**
 * The /software landing page: the `softwareLanding` field group plus every
 * software product with its own fields.
 *
 * The listing derives its client-logo and testimonial rails by merging each
 * product's own pickers, so those are resolved across all five at once.
 *
 * @returns {Promise<{ landing: any, softwares: any[] }>}
 */
export const getSoftwarePage = async () => {
	const [landing, posts] = await Promise.all([
		getPageGroup("software"),
		restAll("softwares?_fields=id,slug,title,content,translations,acf", {
			apiID: "softwares",
		}),
	]);

	const softwares = posts.map((post) => ({
		id: post.id,
		title: text(post.title),
		slug: post.slug,
		translations: translationNodes(post.translations),
		softwares: shapeAcf(post.acf || {}),
	}));
	await resolveRelationsBatch(softwares.map((item) => item.softwares));

	return { landing, softwares };
};

/** Every software slug, for generateStaticParams.
 *  @returns {Promise<Array<{ title: string, slug: string }>>} */
export const getSoftwareSlugs = () => getAllSlugs("softwares");

/**
 * NOT CONVERTED: /software/[slug]/[language].
 *
 * That route stays on the GraphQL service, and this is the reason, measured
 * rather than assumed.
 *
 * The page's data comes from a merge that expects each translation to be a
 * *whole* node. WPGraphQL nests them three levels deep: the software's own
 * translated node, and inside it every relation's translated node — a case
 * study's `translations[0]` carries that case study's translated `content`,
 * `date`, `featuredImage` and `postFields`, and a testimonial's carries its
 * translated `content` and `designation`.
 *
 * REST's `translations` field is a stub: the translated post's id, slug and
 * language, nothing more. Following one stub is a request (and it needs
 * `wpml_language=<code>`, since WPML scopes every query to one language and
 * the default context returns an empty list for a translated id). Following
 * them all means one request per related post per language — for a software
 * with ~50 client logos, 5 testimonials and 5 case studies, roughly 60 extra
 * requests per language on top of the page's own.
 *
 * A working implementation of this got as far as the software's own
 * translation and the country list; what it cannot do cheaply is the nested
 * relation translations. The fix is server-side, next to the two routes that
 * already exist in the `aurora/v1` namespace: an endpoint that returns a post
 * with its translations expanded, the way /aurora/v1/filter-options returns
 * six collections in one request. With that, this becomes a normal conversion.
 */

