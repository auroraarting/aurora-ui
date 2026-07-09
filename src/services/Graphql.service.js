import Bottleneck from "bottleneck";
import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";

// Limits concurrent outbound calls to WordPress during builds. Kept gentle
// because Pressable is slow and throttles under load — fewer parallel calls and
// more spacing between them trades a slower build for far fewer dropped calls.
const limiter = new Bottleneck({ maxConcurrent: 5, minTime: 150 });

// Build-time in-process cache: identical queries during `next build` hit the
// network once — e.g. getInsightsCategories called per-page resolves from cache.
const buildCache = new Map();

const refreshInterval = 3600;

// Max extra seconds added on top of refreshInterval to stagger revalidations.
// Without this, every query expires at the same moment (worst case: right after
// a deploy, when all pages are built together) and stampedes WordPress at once.
const jitterWindow = 1800;

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
 *  dataObj param is accepted but unused — kept so callers need no changes.
 */
export default async function GraphQLAPI(query) {
	return cachedSchedule(`direct:${query}`, async () => {
		let lastError;
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				const req = await fetch(`${process.env.API_URL}`, {
					...ServerHeaders,
					body: JSON.stringify({ query }),
					signal: AbortSignal.timeout(requestTimeoutMs),
					next: { revalidate: revalidateFor(query) },
				});
				if (!req.ok) {
					throw new Error(`GraphQL request failed: ${req.status} ${req.statusText}`);
				}
				const res = await req.json();
				return proxyAllMediaUrls(res);
			} catch (error) {
				lastError = error;
				console.error(
					`GraphQLAPI attempt ${attempt}/${maxAttempts} failed:`,
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

/** Legacy Redis-based version. Kept for reference only. */
export async function GraphQLAPIOld(query, dataObj) {
	// let res;
	// let req;
	// try {
	// 	req = await fetch(`${process.env.API_URL}`, {
	// 		...ServerHeaders,
	// 		body: JSON.stringify({ query }),
	// 		// next: { revalidate: 1800 },
	// 	});
	// 	res = await req.json();
	// 	// res = req;
	// 	return proxyAllMediaUrls(res);
	// } catch (error) {
	// 	// req = await req.text();
	// 	console.log(error, req, "errror");
	// }

	// Cache
	let startTime = null; // Start time
	let res;
	let req;
	try {
		startTime = new Date(); // Start time
		const stagingDataObj = {
			...dataObj,
			apiID: `${dataObj.apiID}`,
			pageID: `${process.env.NEXT_PUBLIC_SITE_ENV}${dataObj.pageID}`,
		};
		const data = {
			url: `${process.env.API_URL}`,
			method: "POST",
			body: { query },
			refreshInterval: refreshInterval,
			headers: {
				...ServerHeaders.headers,
			},
			// ...dataObj,
			...stagingDataObj,
		};
		req = await fetch(`${process.env.REDIS_URL}/api/cache`, {
			"Content-Type": "application/json",
			method: "POST",
			body: JSON.stringify({ ...data }),
		});
		res = await req.json();
		console.log(res, "res");
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		// console.log(
		// 	`Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
		// );
		return proxyAllMediaUrls(res);
	} catch (error) {
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		console.log(
			`Error Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`,
		);
		console.log(error, req, "errror");
	}
}

/** @deprecated Use default GraphQLAPI instead */
export async function GraphQLAPINoBottleneck(query) {
	return GraphQLAPI(query);
}

/** @deprecated Use default GraphQLAPI instead */
export async function GraphQLAPILongerRevalidate(query) {
	return GraphQLAPI(query);
}
