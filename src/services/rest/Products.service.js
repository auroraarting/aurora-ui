import { restAll } from "../Rest.service";

import { resolveRelationsBatch } from "./Relations.service";
import {
	getAllSlugs,
	getPageGroup,
	getSingleBySlug,
} from "./Single.service";
import { shapeAcf, text } from "./shape";

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

/**
 * The /products landing page: the `productLanding` field group plus every
 * product with its own fields.
 *
 * WPGraphQL fetched both in one query. Over REST they are the page, the
 * product collection, and one batched call per relationship field across all
 * four products — the listing derives its client-logo and testimonial rails by
 * merging each product's own pickers.
 *
 * @returns {Promise<{ landing: any, products: any[] }>}
 */
export const getProductPage = async () => {
	const [landing, posts] = await Promise.all([
		getPageGroup("product"),
		restAll("products?_fields=id,slug,title,acf", { apiID: "products" }),
	]);

	const products = posts.map((post) => ({
		id: post.id,
		title: text(post.title),
		slug: post.slug,
		products: shapeAcf(post.acf || {}),
	}));
	await resolveRelationsBatch(products.map((product) => product.products));

	return { landing, products };
};
