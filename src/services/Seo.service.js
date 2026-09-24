/* eslint-disable quotes */
// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/**
 * The GraphQL root field that selects each REST post type.
 *
 * The two halves of the app name these differently — `pages` over REST is
 * `page` in the schema, `products` is `productBy` — so a route can ask in
 * either dialect. Every entry here is verified against the live schema.
 */
const rootField = {
	pages: "page",
	products: "productBy",
	services: "serviceBy",
	softwares: "softwareBy",
	podcast: "podcastBy",
	whoareyou: "whoareyouBy",
	country: "countryBy",
	howwehelp: "howwehelpBy",
	"early-career": "earlyCareerBy",
};

/**
 * A page's Yoast SEO block.
 *
 * Callable two ways, so a route can move between the REST and GraphQL services
 * by changing its import line and nothing else:
 *
 *   getPageSeo('page(id: "service", idType: URI)')  the original form: a raw
 *       selector, returning the whole `{ data: { page: { seo } } }` envelope
 *   getPageSeo("pages", "service")                  the REST service's form,
 *       returning `{ status, seo }` — what `meta?.seo` expects
 *
 * The second form is the one to prefer. It carries real cache tags: the raw
 * form has to fall back to `apiID: "common"`, because a hand-written selector
 * does not say what content type it reads, and "common" matches no content
 * type a webhook would ever name — so those responses stay cached until a
 * deploy. Naming the endpoint and slug gives the fetch `pages:service`, which
 * /api/revalidate can actually reach.
 *
 * @param {string} pageOrEndpoint a GraphQL selector, or a REST post type
 * @param {string} [slug] present only in the second form
 */
export const getPageSeo = async (pageOrEndpoint, slug) => {
	const bySelector = slug === undefined;

	const root = bySelector ? null : rootField[pageOrEndpoint];
	if (!bySelector && !root) {
		throw new Error(
			`getPageSeo: no GraphQL root field for "${pageOrEndpoint}". Add it to ` +
				"rootField in Seo.service.js — an unmapped type would otherwise " +
				"return a title of \"Default Title\" with no error.",
		);
	}

	const clean = decodeURIComponent(slug ?? "");
	const selector = bySelector
		? pageOrEndpoint
		: root === "page"
			? `page(id: "${clean}", idType: URI)`
			: `${root}(slug: "${clean}")`;

	const query = `
query GetSeo {
${selector} {
status
    seo {
      title
      metaDesc
      metaKeywords
    }
  }
}
    `;
	const res = await GraphQLAPI(
		query,
		bySelector
			? { apiID: "common", pageID: "/common" }
			: { apiID: pageOrEndpoint, slug: clean, pageID: `/${pageOrEndpoint}` },
	);

	if (bySelector) return res;

	const node = res?.data?.[root];
	return { status: node?.status ?? null, seo: node?.seo ?? null };
};
