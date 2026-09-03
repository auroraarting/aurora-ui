import Bottleneck from "bottleneck";
import { AsyncResource } from "node:async_hooks";
import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";
import { toCacheTags } from "./CacheTags";

// Limits concurrent outbound calls to WordPress during builds. Kept gentle
// because Pressable is slow and throttles under load — fewer parallel calls and
// more spacing between them trades a slower build for far fewer dropped calls.
const limiter = new Bottleneck({ maxConcurrent: 4, minTime: 300 });

// Build-time in-process cache: identical queries during `next build` hit the
// network once — e.g. getInsightsCategories called per-page resolves from cache.
// Only populated during a build; see cachedSchedule below for why.
const buildCache = new Map();

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

// There is no time-based revalidation. Every response is cached indefinitely
// (`cache: "force-cache"` plus `revalidate: false`) and leaves the cache only
// when POST /api/revalidate flushes one of its tags. Both are stated
// explicitly because these requests carry an Authorization header, which Next
// treats as a signal not to cache unless a cache config says otherwise.
//
// The consequence: a tag that no query carries, or a webhook that never fires,
// means content stays stale until the next deploy. There is no timer to fall
// back on, so a change to the tag vocabulary has to be matched on the
// WordPress side (see services/CacheTags.js).

// The memo below is build-only. It is a permanent promise cache, and it sits in
// *front* of Next's Data Cache — so in a long-lived server process a query
// would resolve once and never run again, leaving both the TTL and
// revalidateTag() with no visible effect (the webhook answers 200, the page
// rebuilds with the old data). At runtime Next already de-duplicates identical
// fetches within a render, so dropping the memo there costs nothing.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

// Bottleneck runs a queued job from whichever async context happened to drain
// the queue — the *previous* job's, not the caller's. Next.js keeps its render
// store in an AsyncLocalStorage, so an unbound job either sees another page's
// store or none at all, and `next: { tags }` is then recorded against the wrong
// route (or dropped entirely, because patch-fetch falls straight through to the
// unpatched fetch when there is no store). The pages still render, so nothing
// looks broken — but their prerendered HTML carries the wrong tags and
// revalidateTag() never matches it. AsyncResource.bind pins each job to the
// context that scheduled it.
/** @param {() => Promise<any>} fn */
const schedule = (fn) => limiter.schedule(AsyncResource.bind(fn));

/** @param {string} key @param {() => Promise<any>} fn */
function cachedSchedule(key, fn) {
	if (!isBuild) return schedule(fn);
	if (buildCache.has(key)) return buildCache.get(key);
	// Evict on failure so a single failed fetch isn't cached and replayed to
	// every later caller — the next request gets a fresh attempt instead.
	const p = schedule(fn).catch((err) => {
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
 *  Runtime cache: held indefinitely, flushed by tag on demand.
 *  Only `tag` is read from dataObj — the cache tags this response can be
 *  revalidated by on demand (see services/CacheTags.js). `apiID` and `pageID`
 *  are still accepted and ignored, so callers need no changes.
 *  @param {string} query
 *  @param {{ tag?: string|string[] }} [dataObj]
 */
export default async function GraphQLAPI(query, dataObj = {}) {
	const tags = toCacheTags(dataObj?.tag);
	return cachedSchedule(`direct:${query}`, async () => {
		let lastError;
		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				const req = await fetch(`${process.env.API_URL}`, {
					...ServerHeaders,
					body: JSON.stringify({ query }),
					signal: AbortSignal.timeout(requestTimeoutMs),
					cache: "force-cache",
					next: { revalidate: false, tags },
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
