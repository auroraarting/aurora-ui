import { getAllSlugs, getSingleBySlug } from "./Single.service";

/**
 * The /service/[slug] page.
 *
 * `services` is the ACF field-group name WPGraphQL nested these fields under,
 * and ServicesWrap reads `data.services.banner…`. The four relationship fields
 * this post type carries are the shared ones — see Relations.service.js.
 */

/** One service, with every ACF relationship resolved.
 *  @param {string} slug
 *  @returns {Promise<any|null>} the node ServicesWrap takes as `data` */
export const getServiceData = (slug) =>
	getSingleBySlug("services", slug, { group: "services" });

/** Every service, for generateStaticParams.
 *  @returns {Promise<Array<{ title: string, slug: string }>>} */
export const getAllServiceData = () => getAllSlugs("services");
