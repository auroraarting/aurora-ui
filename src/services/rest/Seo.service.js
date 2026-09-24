import RESTAPI from "../Rest.service";

import { seoFrom } from "./shape";

/**
 * Page SEO from Yoast's REST payload.
 *
 * The GraphQL version took a raw query fragment — getPageSeo('page(id: "about",
 * idType: URI)') — and callers built that string themselves. REST has no
 * equivalent, so the signature is now the endpoint plus the slug, which is what
 * every call site was really expressing:
 *
 *   getPageSeo("pages", "about")        // was page(id: "about", idType: URI)
 *   getPageSeo("services", params.slug) // was serviceBy(slug: "…")
 *
 * `yoast_head_json.title` / `.description` are the same strings the `seo`
 * GraphQL field returned, so nothing downstream of `seo` changes.
 *
 * @param {string} endpoint WP rest_base, e.g. "pages", "services", "country"
 * @param {string} slug
 * @returns {Promise<{ status: string|null, seo: { title: string, metaDesc: string, metaKeywords: string } }>}
 */
export const getPageSeo = async (endpoint, slug) => {
	const clean = encodeURIComponent(decodeURIComponent(slug ?? ""));
	const data = await RESTAPI(
		`${endpoint}?slug=${clean}&_fields=status,title,yoast_head_json`,
		{ apiID: endpoint, slug },
	);
	const post = Array.isArray(data) ? data[0] : data;
	return { status: post?.status ?? null, seo: seoFrom(post) };
};
