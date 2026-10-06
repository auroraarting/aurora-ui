import Bottleneck from "bottleneck";
import { AsyncResource } from "node:async_hooks";
import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";
import { DATA_CACHE_TTL, toCacheTags } from "./CacheTags";

// Pressable rate-limits each source IP to 2 requests/second and answers 429
// above that. Bottleneck only caps how many calls are in flight; the pacing is
// done by waitTurn() below, which every attempt — retries included — has to
// pass. Per-process only, which is why next.config.js builds with one worker.
const limiter = new Bottleneck({ maxConcurrent: 4 });

// Minimum gap between request starts: 600ms is ~1.67 req/s, under the 2 req/s
// cap with headroom for clock jitter between us and Pressable.
const minGapMs = 600;

// Build-time in-process cache: identical queries during `next build` hit the
// network once — e.g. getInsightsCategories called per-page resolves from cache.
// Only populated during a build; see cachedSchedule below for why.
const buildCache = new Map();

// Abort a WordPress request that takes longer than this, so a hanging upstream
// can't stall a background revalidation indefinitely. Set well above the
// slowest legitimate query (some insights queries take ~15s) so this only
// trips on a real hang, not a slow-but-working response.
const requestTimeoutMs = 60000;

// Retry-with-backoff for calls WordPress (Pressable) drops under load, so a
// single failed/slow response doesn't fail the whole page/build.
const maxAttempts = 3;
const retryBaseDelayMs = 2000; // backoff: 2s, then 4s between attempts

// A 429 means "come back later", and retrying after a second or two just gets
// throttled again. Throttled calls get more attempts and a longer backoff
// (5s, 10s, 20s, 40s — ~75s in all), unless Pressable sends a Retry-After.
const maxThrottleAttempts = 5;
const throttleBaseDelayMs = 5000;

// Queries go out as GET (query in the URL) by default, but the WordPress host
// rejects long URLs with 414 Request-URI Too Large (nginx's default header
// buffer is 8KB). Anything over this length is sent as a POST body instead.
// Next's Data Cache keys POST requests on the body, so both are cached alike.
const maxGetUrlLength = 60000000;

/** Build the fetch URL + options for a query, choosing GET or POST by size.
 *  @param {string} query */
function buildRequest(query) {
	const getUrl = `${process.env.API_URL}?query=${encodeURIComponent(query)}`;
	if (getUrl.length <= maxGetUrlLength) {
		return { url: getUrl, init: { method: "GET" } };
	}
	return {
		url: process.env.API_URL,
		init: { method: "POST", body: JSON.stringify({ query }) },
	};
}

/** Resolve after `ms` milliseconds. @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Earliest time the next request may start. Each caller reserves its slot
// synchronously before sleeping, so concurrent callers queue up minGapMs apart
// instead of all waking at once.
let nextStartAt = 0;

/** Wait for this request's slot under the rate limit. */
async function waitTurn() {
	const now = Date.now();
	const startAt = Math.max(now, nextStartAt);
	nextStartAt = startAt + minGapMs;
	if (startAt > now) await sleep(startAt - now);
}

/** Pause every request in this process for `ms` — after a 429, the other
 *  queued calls would only be throttled too. @param {number} ms */
function coolDown(ms) {
	nextStartAt = Math.max(nextStartAt, Date.now() + ms);
}

/** Whether a failed attempt is worth repeating. A 4xx other than 408/429 —
 *  e.g. the CDN's 403 bot challenge — won't change on retry, and repeating it
 *  only adds to the traffic that triggered it. @param {any} error */
function isRetryable(error) {
	const status = error?.status;
	if (!status) return true; // timeout or network error
	return status >= 500 || status === 408 || status === 429;
}

/** Backoff before the next attempt, in ms. @param {any} error @param {number} attempt */
function retryDelay(error, attempt) {
	if (error?.status !== 429) return retryBaseDelayMs * 2 ** (attempt - 1);
	const retryAfterSec = Number(error.retryAfter);
	if (retryAfterSec > 0) return retryAfterSec * 1000;
	return throttleBaseDelayMs * 2 ** (attempt - 1);
}

// Every response is cached (`cache: "force-cache"`) for DATA_CACHE_TTL, and
// POST /api/revalidate flushes it sooner by tag. Both are stated explicitly
// because these requests carry an Authorization header, which Next treats as
// a signal not to cache unless a cache config says otherwise.
//
// The TTL is the safety net: a tag that no query carries, or a webhook that
// never fires, now means content up to an hour stale rather than stale until
// someone purges the Data Cache (see services/CacheTags.js).

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
	if (!isBuild) return fn();
	if (buildCache.has(key)) return buildCache.get(key);
	// Evict on failure so a single failed fetch isn't cached and replayed to
	// every later caller — the next request gets a fresh attempt instead.
	const p = fn().catch((err) => {
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
		let attemptLimit = maxAttempts;
		for (let attempt = 1; attempt <= attemptLimit; attempt++) {
			try {
				// Each attempt queues in the limiter and waits its turn, so retries
				// count against the same rate as first attempts. The backoff sleep
				// below happens outside, so a waiting retry holds no slot.
				return await schedule(async () => {
					await waitTurn();
					const { url, init } = buildRequest(query);
					const req = await fetch(url, {
						...init,
						headers: {
							"Content-Type": "application/json",
						},
						signal: AbortSignal.timeout(requestTimeoutMs),
						cache: "force-cache",
						next: { revalidate: DATA_CACHE_TTL, tags },
					});
					if (!req.ok) {
						const err = new Error(
							`GraphQL request failed: ${req.status} ${req.statusText}`,
						);
						err.status = req.status;
						err.retryAfter = req.headers.get("retry-after");
						throw err;
					}
					const res = await req.json();
					// return proxyAllMediaUrls(res);
					return res;
				});
			} catch (error) {
				lastError = error;
				if (error?.status === 429) {
					attemptLimit = Math.max(maxAttempts, maxThrottleAttempts);
				}
				console.error(
					`GraphQLAPI attempt ${attempt}/${attemptLimit} failed:`,
					error?.message || error,
				);
				if (attempt >= attemptLimit || !isRetryable(error)) break;
				const delay = retryDelay(error, attempt);
				if (error?.status === 429) coolDown(delay);
				await sleep(delay);
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
	const refreshInterval = 3600; // 30 minutes
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
			url: `${process.env.API_URL}?query=${encodeURIComponent(query)}`,
			method: "GET",
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
		// console.log(res, JSON.stringify(res), "res");
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		// console.log(
		// 	`Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
		// );
		// return proxyAllMediaUrls(res);
		return res;
	} catch (error) {
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		console.log(
			`Error Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`,
		);
		console.log(error, JSON.stringify(query), "errror");
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
