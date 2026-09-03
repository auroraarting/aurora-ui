import { wordpressLimiter } from "./limiter";
import { ServerHeaders } from "@/utils/RequestHeaders";
import { cacheTagsFor } from "./cacheTags";
import { proxyMediaUrl } from "@/utils";

// Paces outbound calls to WordPress. The queue lives in ./limiter and is shared
// with the GraphQL service, so the two cannot overlap each other — by default one
// call is in flight at a time with a pause after each.
const limiter = wordpressLimiter;

// Build-time in-process cache: identical queries during `next build` hit the
// network once — e.g. getInsightsCategories called per-page resolves from cache.
const buildCache = new Map();

// Content now refreshes on demand: WordPress calls /api/revalidate with the
// tags it changed. This is only a safety net for a webhook that never arrives —
// a day rather than an hour, so a missed hook self-heals without paying for
// hourly regeneration of every page.
const refreshInterval = 86400;

// Max extra seconds added on top of refreshInterval to stagger revalidations.
// Without this, every query expires at the same moment (worst case: right after
// a deploy, when all pages are built together) and stampedes WordPress at once.
const jitterWindow = 21600;

// Abort a WordPress request that takes longer than this, so a hanging upstream
// can't stall a background revalidation indefinitely. Set well above the
// slowest legitimate query (some insights queries take ~15s) so this only
// trips on a real hang, not a slow-but-working response.
const requestTimeoutMs = 60000;

// Retry-with-backoff for calls WordPress (Pressable) drops under load. The
// Bottleneck limiter above only caps concurrency; it does NOT retry, so a
// single failed/slow response would otherwise fail the whole page/build.
const maxAttempts = 3;
const retryBaseDelayMs = 1000; // backoff: 1s, then 2s between attempts

/** Resolve after `ms` milliseconds. @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Stable per-query TTL in [refreshInterval, refreshInterval + jitterWindow).
 *  Same query always gets the same TTL, so cache entries aren't fragmented,
 *  but different queries expire at spread-out times. */
function revalidateFor(query) {
	let hash = 0;
	for (let i = 0; i < query.length; i++) {
		hash = (hash * 31 + query.charCodeAt(i)) | 0;
	}
	return refreshInterval + (Math.abs(hash) % jitterWindow);
}

/** @param {string} key @param {() => Promise<any>} fn */
function cachedSchedule(key, fn) {
	if (buildCache.has(key)) return buildCache.get(key);
	// Evict on failure so a single failed fetch isn't cached and replayed to
	// every later caller — the next request gets a fresh attempt instead.
	const p = limiter.schedule(fn).catch((err) => {
		buildCache.delete(key);
		throw err;
	});
	buildCache.set(key, p);
	return p;
}

/** Recursively replace all WordPress upload URLs in a GraphQL response object */
function proxyAllMediaUrls(obj) {
	if (!obj || typeof obj !== "object") return obj;
	if (Array.isArray(obj)) return obj.map(proxyAllMediaUrls);
	const result = {};
	for (const key of Object.keys(obj)) {
		const val = obj[key];
		if (typeof val === "string") {
			result[key] = proxyMediaUrl(val);
		} else if (typeof val === "object") {
			result[key] = proxyAllMediaUrls(val);
		} else {
			result[key] = val;
		}
	}
	return result;
}

/** Hits WordPress directly — no Redis.
 *  Deduplicates identical build-time queries and throttles concurrency.
 *  Runtime cache: Next.js ISR revalidates every 1 hour.
 *  dataObj param is accepted but mostly unused — kept so callers need no
 *  changes. Only `method` is read from it, so read-only endpoints (wp/v2/pages
 *  and friends, which reject POST with a 401) can ask for GET, plus `baseUrl`
 *  for the few routes that live outside the wp/v2 namespace REST_API_URL points
 *  at (see wpJsonNamespace in services/rest/GraphqlShape.js).
 */
export default async function RESTAPI(query, dataObj = {}) {
	const method = dataObj?.method || ServerHeaders.method;
	const baseUrl = dataObj?.baseUrl || process.env.REST_API_URL;
	return cachedSchedule(`direct:${method}:${baseUrl}${query}`, async () => {
		let lastError;
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				const req = await fetch(`${baseUrl}${query}`, {
					...ServerHeaders,
					method,
					signal: AbortSignal.timeout(requestTimeoutMs),
					next: {
						revalidate: revalidateFor(query),
						tags: cacheTagsFor(dataObj),
					},
				});
				if (!req.ok) {
					throw new Error(
						`REST API request failed: ${req.status} ${req.statusText}`,
					);
				}
				const res = await req.json();
				return proxyAllMediaUrls(res);
			} catch (error) {
				lastError = error;
				console.error(
					`REST API attempt ${attempt}/${maxAttempts} failed:`,
					error?.message || error,
				);
				// Back off and retry — Pressable dropping one call shouldn't fail the
				// whole page/build. Last attempt falls through to the throw below.
				if (attempt < maxAttempts) {
					await sleep(retryBaseDelayMs * 2 ** (attempt - 1));
				}
			}
		}
		// All attempts exhausted. Rethrow (rather than returning undefined) so that
		// on a background revalidation Next.js keeps serving the last good page and
		// retries next time, instead of the caller crashing on `data.data.…`.
		throw lastError;
	});
}
