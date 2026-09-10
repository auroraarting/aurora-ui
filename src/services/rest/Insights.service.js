import RESTAPI, { restAll, restByIds } from "../Rest.service";

import {
	getPostAuthors,
	getPostSpeakers,
	getPoweredBy,
	getTestimonials,
} from "./Relations.service";
import { shapePosts } from "./Posts.service";
import { arr, text } from "./shape";

/**
 * Insight (post) queries.
 *
 * `getInsights` takes an options object rather than the GraphQL argument
 * string the old service accepted, because REST cannot express
 * `where: {categoryName: "a,b,c"}` — core filters posts by term **id** only,
 * with no slug filter. Slugs are therefore resolved to ids first, in one call
 * for the whole list, and `categories=1,2,3` gives the same OR semantics
 * `categoryName` had.
 *
 *   getInsights({ first: 3, categories: ["commentary", "case-studies"] })
 *
 * Every call site of the old service still passes the GraphQL string, so each
 * needs its argument rewritten as it migrates — these are not pure import
 * swaps.
 */

/**
 * The categories every landing page's insight teaser pulls from.
 *
 * Four pages passed the same `where: {categoryName: "a,b,c"}` string to the
 * GraphQL service; the list lives here now so it is stated once. Slugs, not
 * ids — getInsights resolves them, because core REST filters posts by term id
 * only.
 */
export const insightTeaserCategories = [
	"case-studies",
	"commentary",
	"market-reports",
	"policy-notes",
	"newsletters",
	"new-launches",
];

/** What an insight card renders. Kept in step with the GraphQL selection: an
 *  image, its categories, a read time and the button groups. */
const insightFields =
	"id,slug,title,date,content,featured_image_url,categories,tags,translations,acf";

/** Relationship fields on a post's own ACF group, which WPGraphQL inlined.
 *  Paths are relative to the shaped `postFields` group. */
const postRelations = {
	authors: getPostAuthors,
	speakers: getPostSpeakers,
	poweredBy: getPoweredBy,
	testimonials: getTestimonials,
};

/** The six option lists the filter dropdowns are built from.
 *
 *  `order` matters and is easy to miss: these become <select> options, and a
 *  list in the wrong order contains exactly the same items, so a diff that
 *  compares sets rather than sequences will not notice. The GraphQL query
 *  asked for countries by TITLE ASC explicitly and left the rest to
 *  WPGraphQL's defaults, which REST does not share — /country defaults to
 *  newest-first, not alphabetical. */
const optionEndpoints = {
	tags: {
		endpoint: "tags",
		apiID: "tags",
		fields: "id,name,slug",
		query: "orderby=name&order=asc",
		sortKey: "name",
	},
	categories: {
		endpoint: "categories",
		apiID: "categories",
		fields: "id,name,slug",
		query: "orderby=name&order=asc",
		sortKey: "name",
	},
	countries: {
		endpoint: "country",
		apiID: "country",
		fields: "id,title,slug",
		query: "orderby=title&order=asc",
	},
	products: { endpoint: "products", apiID: "products", fields: "id,title,slug" },
	softwares: {
		endpoint: "softwares",
		apiID: "softwares",
		fields: "id,title,slug",
	},
	services: { endpoint: "services", apiID: "services", fields: "id,title,slug" },
};

/** Re-sort terms the way WPGraphQL did.
 *
 *  Both APIs order terms by name, but they break ties differently: several
 *  categories share a name ("Alberta", "NORAM", "Public"), and WPGraphQL put
 *  the higher term id first where REST puts the lower one. Without this the
 *  dropdowns hold the right names in a subtly different order.
 *
 *  @param {any[]} items @param {string} key the name field to sort on */
function orderTermsLikeGraphql(items, key) {
	return [...items].sort((a, b) => {
		const byName = String(a?.[key] ?? "").localeCompare(String(b?.[key] ?? ""));
		if (byName !== 0) return byName;
		return Number(b?.id ?? 0) - Number(a?.id ?? 0);
	});
}

/**
 * Term ids for a list of category slugs, in one call.
 *
 * @param {string[]} slugs
 * @returns {Promise<number[]>}
 */
export async function getCategoryIds(slugs) {
	const wanted = arr(slugs)
		.flatMap((slug) => String(slug).split(","))
		.map((slug) => slug.trim())
		.filter(Boolean);
	if (!wanted.length) return [];

	const terms = await RESTAPI(
		`categories?slug=${wanted.map(encodeURIComponent).join(",")}&per_page=100&_fields=id,slug`,
		{ apiID: "categories" },
	);
	return arr(terms).map((term) => Number(term.id)).filter(Boolean);
}

/**
 * Insights, shaped as GraphQL post nodes.
 *
 * @param {object} [options]
 * @param {number} [options.first] how many, default 100 (REST's per_page cap)
 * @param {string[]} [options.categories] category **slugs** to filter by
 * @param {string[]} [options.exclude] post ids to leave out
 * @param {number} [options.afterYear] only posts published from this year on —
 *   REST's `after` takes an ISO date where GraphQL took `dateQuery`
 * @param {boolean} [options.all] fetch every match, following pagination
 * @returns {Promise<any[]>} the nodes previously read as `res.data.posts.nodes`
 */
export const getInsights = async (options = {}) => {
	const {
		first = 100,
		categories = [],
		exclude = [],
		afterYear,
		all = false,
	} = options;

	const params = [`_fields=${insightFields}`];
	if (categories.length) {
		const ids = await getCategoryIds(categories);
		// No matching category means no posts — not "every post", which is what
		// omitting the filter would silently give.
		if (!ids.length) return [];
		params.push(`categories=${ids.join(",")}`);
	}
	if (exclude.length) params.push(`exclude=${exclude.join(",")}`);
	if (afterYear) params.push(`after=${afterYear}-01-01T00:00:00`);

	const query = `posts?${params.join("&")}`;
	// 50 a page, not the 100 cap: an insight carries its whole body, and 100 of
	// them come to ~1.2 MB — inside the Data Cache's 2 MB per-entry limit but
	// not by much. An entry that outgrows the limit stops being cached
	// silently, and then every request refetches it, which is the load this
	// migration exists to avoid.
	const posts = all
		? await restAll(`${query}&per_page=50`, { apiID: "posts" })
		: arr(
			await RESTAPI(`${query}&per_page=${Math.min(first, 100)}`, {
				apiID: "posts",
			}),
		);

	return shapePosts(posts, { tags: true, relations: postRelations });
};

/**
 * The option lists the insight filters are built from.
 *
 * WPGraphQL fetched all six in one query; REST needs one call per collection,
 * so ask for only the lists the page actually renders. A page that wants just
 * `countries` should use getCountryList from GlobalPresence.service instead —
 * one call rather than six.
 *
 * @param {object} [options]
 * @param {string[]} [options.only] subset of tags, categories, countries,
 *   products, softwares, services
 * @returns {Promise<{ tags?: any[], categories?: any[], countries?: any[], products?: any[], softwares?: any[], services?: any[] }>}
 */
export const getInsightsCategories = async (options = {}) => {
	const requested = arr(options.only).filter((name) => optionEndpoints[name]);
	const names = requested.length ? requested : Object.keys(optionEndpoints);
	const lists = await Promise.all(
		names.map(async (name) => {
			const { endpoint, apiID, fields, query, sortKey } = optionEndpoints[name];
			const path = `${endpoint}?_fields=${fields}${query ? `&${query}` : ""}`;
			const items = (await restAll(path, { apiID })).map((item) => ({
				...item,
				// Terms carry `name`, post types carry `title`; both are
				// entity-encoded over REST and were decoded by GraphQL.
				...(item.name === undefined ? {} : { name: text(item.name) }),
				...(item.title === undefined ? {} : { title: text(item.title) }),
			}));
			return sortKey ? orderTermsLikeGraphql(items, sortKey) : items;
		}),
	);
	return Object.fromEntries(names.map((name, index) => [name, lists[index]]));
};

/**
 * Every insight slug and date, for generateStaticParams and sitemaps.
 * @returns {Promise<Array<{ title: string, slug: string, date: string }>>}
 */
export const getInsightsPath = async () => {
	const posts = await restAll("posts?_fields=title,slug,date", {
		apiID: "posts",
	});
	return posts.map((post) => ({
		title: text(post.title),
		slug: post.slug,
		date: post.date,
	}));
};

/**
 * Posts by id, shaped as insight cards — for the hand-picked lists ACF
 * relationship fields hold.
 * @param {Array<number>} ids
 * @returns {Promise<any[]>}
 */
export const getInsightsByIds = async (ids) => {
	const posts = await restByIds("posts", ids, {
		apiID: "posts",
		fields: insightFields,
	});
	return shapePosts(posts, { tags: true, relations: postRelations });
};

/**
 * One insight, with its terms and every ACF relationship resolved.
 *
 * `status` is returned because the detail page 404s on a draft.
 *
 * @param {string} slug
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.postBy`
 */
export const getInsightsInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`posts?slug=${encodeURIComponent(clean)}&_fields=${insightFields},status`,
		{ apiID: "posts", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const [shaped] = await shapePosts([post], {
		tags: true,
		relations: postRelations,
	});
	return shaped ? { ...shaped, status: post.status } : null;
};
