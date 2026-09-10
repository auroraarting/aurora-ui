import { getAllSlugs, getSingleBySlug } from "./Single.service";

/**
 * The /products/[slug] page.
 *
 * `products` is the ACF field-group name WPGraphQL nested these fields under,
 * and ProductsInsideWrap reads `data.products…`. The relationship fields this
 * post type carries are the shared four — see Relations.service.js.
 *
 * The `countries` list the GraphQL query selected alongside the product is now
 * a separate call (getCountryList in GlobalPresence.service), because REST
 * cannot combine two collections in one request and the list is shared with
 * several other pages anyway.
 */

/** One product, with every ACF relationship resolved.
 *  @param {string} slug
 *  @returns {Promise<any|null>} the node ProductsInsideWrap takes as `data` */
export const getProductBySlug = (slug) =>
	getSingleBySlug("products", slug, { group: "products" });

/**
 * Every product slug, for generateStaticParams.
 *
 * The GraphQL page took these from getProductPage, which also fetched the
 * whole product landing page just to read the slug list off the side of it.
 * @returns {Promise<Array<{ title: string, slug: string }>>}
 */
export const getProductSlugs = () => getAllSlugs("products");
