import { ServerHeaders } from "@/utils/RequestHeaders";

import { schedule } from "./rest/limiter";
import { tagsFor } from "./rest/tags";

/**
 * WordPress REST wrapper — the REST counterpart of Graphql.service.js.
 *
 * Differences from the GraphQL service, all deliberate:
 *
 *  - No Redis hop. GraphQLAPI posts every query to REDIS_URL/api/cache because
 *    /graphql is slow enough to need it. The REST endpoints are cheap, so calls
 *    go straight to WordPress and Next.js's own Data Cache does the caching.
 *
 *  - No time-based revalidation. Nothing here carries a TTL: entries are stored
 *    with `cache: "force-cache"` and a tag set, and only ever go stale when
 *    WordPress calls /api/revalidate with those tags. (Next.js 15 no longer
 *    caches fetch by default, which is why force-cache is explicit.)
 *
 *  - No in-process memoisation of responses. Deduplicating identical calls in a
 *    Map looks like an easy build win, but the second caller then receives a
 *    promise instead of making a fetch, so its page never registers the tags —
 *    and on-demand revalidation silently stops working for that page. Next.js
 *    already dedupes identical fetches per render while attributing tags to
 *    every caller, so it is left to do the job.
 *
 *  - Concurrency is capped by ./rest/limiter (p-limit): one call at a time
 *    during `next build`, so static generation cannot stampede Pressable.
 */

/** Abort a call that takes longer than this, so a hanging upstream cannot stall
 *  a background revalidation forever. Set well above the slowest real
 *  response, not near it — this should only trip on a genuine hang. */
const requestTimeoutMs = 60000;

/** Pressable drops calls under load; the limiter paces them but does not
 *  retry. Without this a single dropped response fails a whole page. */
const maxAttempts = 3;
const retryBaseDelayMs = 1000; // 1s, then 2s

/** A 429 needs to outlast the rate-limit window, not just a blip. Retrying a
 *  throttled call after one second simply gets throttled again — observed
 *  against Pressable, where both retries failed at 1s/2s — so throttling backs
 *  off from 5s the way the GraphQL service did. */
const throttleBaseDelayMs = 5000; // 5s, then 10s

/** WordPress caps per_page at 100. */
export const maxPerPage = 100;

/** @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Statuses worth a second attempt: throttling and transient upstream faults.
 *  A 4xx that is not 429 is a bad request — retrying only wastes the budget. */
const isRetryable = (status) => status === 429 || status === 408 || status >= 500;

/** Honour Retry-After when WordPress sends one, else exponential backoff from
 *  a base that depends on why the call failed.
 *  @param {Response|null} res @param {number} attempt @param {number} [status] */
function backoffMs(res, attempt, status) {
	const header = Number.parseInt(res?.headers?.get("retry-after") ?? "", 10);
	if (Number.isFinite(header) && header > 0) return Math.min(header, 30) * 1000;
	const base = status === 429 ? throttleBaseDelayMs : retryBaseDelayMs;
	return base * 2 ** (attempt - 1);
}

/** Registered REST fields that are computed from another field, and so come
 *  back null if `_fields` trims the field they are derived from.
 *
 *  `featured_image_url` is the one that matters: asking for
 *  `_fields=id,featured_image_url` returns null for every post, with no error
 *  and no warning, because the callback reads `featured_media` off the
 *  response it is decorating. Nested `_fields` is worth using — it took the
 *  country payload from 3.6 MB to 200 KB — so rather than ban it, the
 *  dependency is added back here, once, where no service can forget it. */
const fieldDependencies = {
	featured_image_url: "featured_media",
};

/** The `_source` sibling for a requested ACF path.
 *
 *  Selecting `_fields=acf.banner` returns the raw group but leaves behind
 *  `acf.banner_source`, and that is where ACF publishes the value with
 *  WordPress's content filters applied — the `<p>…</p>` and curly quotes
 *  WPGraphQL returned (see shapeAcf). Asking for one without the other silently
 *  drops the formatting: text still renders, just unwrapped and with straight
 *  quotes. Only the first segment matters, because the top-level sibling
 *  carries the whole formatted subtree.
 *
 *  @param {string} field a `_fields` entry
 *  @returns {string|null} the sibling to add, or null if not applicable */
function acfSourceFor(field) {
	const match = /^acf\.([^.]+)/.exec(field);
	if (!match || match[1].endsWith("_source")) return null;
	return `acf.${match[1]}_source`;
}

/** Add back any field that a requested `_fields` value is computed from.
 *  @param {string} path */
function withFieldDependencies(path) {
	const match = /([?&])_fields=([^&]*)/.exec(path);
	if (!match) return path;

	const fields = decodeURIComponent(match[2]).split(",").filter(Boolean);
	const extra = new Set();

	for (const [field, dep] of Object.entries(fieldDependencies)) {
		if (fields.includes(field) && !fields.includes(dep)) extra.add(dep);
	}
	for (const field of fields) {
		const sibling = acfSourceFor(field);
		if (sibling && !fields.includes(sibling)) extra.add(sibling);
	}
	if (!extra.size) return path;

	const merged = [...fields, ...extra].join(",");
	return path.replace(match[0], `${match[1]}_fields=${merged}`);
}

/** Join a base URL and a path/query without doubling or dropping the slash.
 *  @param {string} baseUrl @param {string} path */
function buildUrl(baseUrl, path) {
	const base = baseUrl.replace(/\/+$/, "");
	const rel = withFieldDependencies(String(path).replace(/^\/+/, ""));
	return `${base}/${rel}`;
}

/**
 * One REST call, paced, retried, cached and tagged.
 *
 * @param {string} path endpoint and query, e.g. `services?slug=advisory`
 * @param {object} [dataObj]
 * @param {string} [dataObj.apiID] content type, for the cache tag — see ./rest/tags
 * @param {string} [dataObj.slug] single item, for the item-level cache tag
 * @param {string[]} [dataObj.tags] extra cache tags
 * @param {string} [dataObj.method] defaults to GET; the read endpoints reject POST
 * @param {string} [dataObj.baseUrl] for routes outside the wp/v2 namespace
 * @returns {Promise<{ data: any, total: number, totalPages: number }>}
 */
export async function restRequest(path, dataObj = {}) {
	const method = dataObj.method || "GET";
	const baseUrl = dataObj.baseUrl || process.env.REST_API_URL;
	const url = buildUrl(baseUrl, path);
	const tags = tagsFor(dataObj);

	return schedule(async () => {
		let lastError;
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			let res = null;
			try {
				res = await fetch(url, {
					method,
					headers: ServerHeaders.headers,
					signal: AbortSignal.timeout(requestTimeoutMs),
					cache: "force-cache",
					next: { tags },
				});
				if (!res.ok) {
					const err = new Error(
						`REST ${method} ${url} failed: ${res.status} ${res.statusText}`,
					);
					err.status = res.status;
					throw err;
				}
				return {
					data: await res.json(),
					total: Number.parseInt(res.headers.get("x-wp-total") ?? "", 10) || 0,
					totalPages:
						Number.parseInt(res.headers.get("x-wp-totalpages") ?? "", 10) || 0,
				};
			} catch (error) {
				lastError = error;
				const retryable = !error?.status || isRetryable(error.status);
				if (!retryable || attempt === maxAttempts) break;
				console.warn(
					`[wp-rest] attempt ${attempt}/${maxAttempts} for ${url}: ${error?.message || error}`,
				);
				await sleep(backoffMs(res, attempt, error?.status));
			}
		}
		// Rethrow rather than return undefined: on a background revalidation
		// Next.js then keeps serving the last good page and retries later,
		// instead of the caller crashing while destructuring the response.
		console.error(`[wp-rest] giving up on ${url}: ${lastError?.message || lastError}`);
		throw lastError;
	});
}

/**
 * The common case — the response body only.
 *
 * @param {string} path
 * @param {object} [dataObj] see {@link restRequest}
 * @returns {Promise<any>}
 */
export default async function RESTAPI(path, dataObj = {}) {
	const { data } = await restRequest(path, dataObj);
	return data;
}

/**
 * Every item in a collection, following X-WP-TotalPages.
 *
 * Replaces the `first: 9999` the GraphQL queries used, which REST cannot
 * express — per_page is capped at 100. Page 1 tells us how many pages there
 * are, so the rest can be requested without probing.
 *
 * @param {string} path endpoint and query; per_page is added if absent
 * @param {object} [dataObj] see {@link restRequest}
 * @returns {Promise<any[]>}
 */
export async function restAll(path, dataObj = {}) {
	const sep = path.includes("?") ? "&" : "?";
	const sized = /(\?|&)per_page=/.test(path)
		? path
		: `${path}${sep}per_page=${maxPerPage}`;

	const first = await restRequest(`${sized}&page=1`, dataObj);
	const items = Array.isArray(first.data) ? [...first.data] : [];
	if (first.totalPages <= 1) return items;

	// Sequential on purpose: the limiter would serialise these during a build
	// anyway, and a collection large enough to paginate is exactly what should
	// not be fired at WordPress all at once.
	for (let page = 2; page <= first.totalPages; page++) {
		const next = await restRequest(`${sized}&page=${page}`, dataObj);
		if (Array.isArray(next.data)) items.push(...next.data);
	}
	return items;
}

/**
 * Fetch posts by ID in as few calls as possible.
 *
 * ACF relationship and post-object fields come back from REST as bare IDs,
 * where GraphQL inlined the whole node. Resolving them one at a time is what
 * turns a page into dozens of calls, so they are batched through `include`
 * (100 per call) and returned in the order the IDs were given — `include` does
 * not preserve it, and these fields are hand-ordered in the CMS.
 *
 * @param {string} endpoint e.g. "clients-logo"
 * @param {Array<number|string>} ids
 * @param {object} [dataObj] see {@link restRequest}; `fields` sets _fields
 * @returns {Promise<any[]>}
 */
export async function restByIds(endpoint, ids, dataObj = {}) {
	const wanted = [...new Set((ids || []).map(Number).filter(Boolean))];
	if (!wanted.length) return [];

	const { fields, ...rest } = dataObj;
	const query = fields ? `&_fields=${fields}` : "";
	const found = [];

	for (let i = 0; i < wanted.length; i += maxPerPage) {
		const batch = wanted.slice(i, i + maxPerPage);
		const data = await RESTAPI(
			`${endpoint}?include=${batch.join(",")}&per_page=${batch.length}&orderby=include${query}`,
			rest,
		);
		if (Array.isArray(data)) found.push(...data);
	}

	// `orderby=include` is supported by core, but fall back to sorting here so
	// the order is guaranteed even on endpoints that ignore it.
	const byId = new Map(found.map((item) => [item.id, item]));
	return wanted.map((id) => byId.get(id)).filter(Boolean);
}
