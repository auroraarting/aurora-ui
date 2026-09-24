import Bottleneck from "bottleneck";
import { ServerHeaders } from "@/utils/RequestHeaders";
// import memoizedFetch from "@/lib/memoizedFetch";

// During `next build`, let only two CMS requests start per second so static
// generation doesn't flood WPGraphQL. At runtime (ISR/SSR) requests run freely.
const isBuild = process.env.NEXT_PHASE === "phase-production-build";
const buildLimiter = new Bottleneck({ maxConcurrent: 2, minTime: 500 });

// Build cache: many pages send the exact same request (SEO, navigation,
// listings...). Next's Data Cache stores the first response, so identical
// requests are answered from the cache without reaching WordPress. They only
// need to skip the limiter queue, and still call fetch themselves so each page
// collects its own cache tags. Key = request body -> did the first one get cached?
const buildCache = new Map();
const maxCacheableBytes = 2 * 1024 * 1024; // Next silently skips caching bigger responses
const cacheHitMaxMs = 1500; // a real CMS round trip takes seconds

let buildRequestCount = 0;
let buildCacheHits = 0;

/** queryName: "GetInsights" from "query GetInsights {", else the first field */
function queryName(query = "") {
	const match =
		query.match(/query\s+(\w+)/) || query.match(/{\s*(\w+[^{]*?)\s*{/);
	return match ? match[1].replace(/\s+/g, " ").slice(0, 80) : "anonymous";
}

/** safeDecode: "caf%C3%A9" and "café" must give the same tag */
function safeDecode(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

/**
 * cmsTags: the tags each call passes (`tags: [...]` in the services). There is
 * deliberately no catch-all tag: revalidating one would rebuild every page at
 * once and flood WordPress. WordPress webhooks hit /api/revalidate, which sends:
 *   event:<slug>    on every save of that event -> getEventsInside
 *   event           on create / delete / trash  -> getAllEvents, getEventsInside
 *   page:<slug>     on every save of that page  -> getEventLandingPage ...
 */
export function cmsTags(tags = []) {
	return tags
		.filter(Boolean)
		.map((tag) => safeDecode(String(tag)).slice(0, 256)); // Next's max tag length
}

/**
 * seoTags: tags for Seo.getPageSeo, whose query is passed in, so they follow
 * the same entry the page shows:
 *   earlyCareerBy(slug: "x")        -> ["earlyCareer", "earlyCareer:x"]
 *   page(id: "about", idType: URI)  -> ["page:about"]
 */
export function seoTags(page = "") {
	const match = page.match(
		/(\w+?)(?:By)?\s*\(\s*(?:slug|id)\s*:\s*"?([^",)]+)"?/,
	);
	if (!match) return [];
	const [, type, value] = match;
	return type === "page" ? [`page:${value}`] : [type, `${type}:${value}`];
}

/**
 * waitForBuildSlot: resolves when the limiter lets this request start, and
 * returns the function that frees the slot. The fetch itself must run in the
 * caller's code, not inside a Bottleneck job: jobs run in the async context of
 * whichever page's job finished before, so the fetch's cache tags would be
 * collected onto that other page.
 */
function waitForBuildSlot(name) {
	return new Promise((started) => {
		buildLimiter.schedule(
			() =>
				new Promise((release) => {
					const { QUEUED } = buildLimiter.counts();
					console.log(
						`[CMS build] #${++buildRequestCount} started: ${name} (${QUEUED} waiting)`,
					);
					started(release);
				}),
		);
	});
}

/** fromBuildCache: an identical request was already cached, skip the queue */
async function fromBuildCache(fn, name, key) {
	const startTime = Date.now();
	const res = await fn();
	const ms = Date.now() - startTime;
	if (ms > cacheHitMaxMs) {
		// Too slow to be a cache hit, so it went to the CMS: queue these again
		buildCache.set(key, Promise.resolve(false));
		console.warn(
			`[CMS build] ${name} took ${ms}ms, not served from cache; queueing it again`,
		);
	} else {
		console.log(`[CMS build] from cache (${++buildCacheHits}): ${name}`);
	}
	return res;
}

/** limitDuringBuild  */
async function limitDuringBuild(fn, name, key, retries = 3) {
	if (!isBuild) return fn();

	const earlier = buildCache.get(key);
	if (earlier && (await earlier)) return fromBuildCache(fn, name, key);

	// First request for this key (or the earlier one couldn't be cached)
	let settle;
	if (!earlier) buildCache.set(key, new Promise((r) => (settle = r)));
	try {
		let res;
		for (let i = 0; ; i++) {
			const release = await waitForBuildSlot(name);
			try {
				res = await fn();
			} finally {
				release();
			}
			if (res.status !== 429 || i === retries) break;
			// Still rate limited: back off (5s, 10s, 15s) before queueing again
			console.warn(`[CMS build] 429 for ${name}, retrying in ${(i + 1) * 5}s`);
			await new Promise((r) => setTimeout(r, (i + 1) * 5000));
		}

		let cached = res.status === 200;
		if (cached) {
			const bytes = (await res.clone().arrayBuffer()).byteLength;
			if (bytes > maxCacheableBytes) {
				cached = false;
				console.warn(
					`[CMS build] ${name} is ${(bytes / 1048576).toFixed(1)}MB, over Next's 2MB cache limit: every page will fetch it`,
				);
			}
		}
		if (settle) settle(cached);
		else if (cached) buildCache.set(key, Promise.resolve(true));
		return res;
	} catch (error) {
		settle?.(false);
		throw error;
	}
}

/** fetchWithRetry  */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 5000) {
	for (let i = 0; i < retries; i++) {
		try {
			const res = await fetch(url, options);
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			return await res.json();
		} catch (err) {
			if (i === retries - 1) throw err;
			console.warn(`Fetch failed for ${url}, retrying in ${delay}ms...`);
			await new Promise((res) => setTimeout(res, delay));
		}
	}
}

/** GraphQLAPI  */
export default async function GraphQLAPI(query, dataObj = {}) {
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
	// 	return res;
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
		const tags = cmsTags(dataObj.tags);
		const body = JSON.stringify({ query });
		const name = `${queryName(query)} [${tags.join(", ")}]`;
		req = await limitDuringBuild(
			() =>
				fetch(`${process.env.API_URL}`, {
					...ServerHeaders,
					body,
					// Cached until one of its tags is revalidated (no time-based expiry)
					next: { revalidate: false, tags },
				}),
			name,
			body,
		);
		if (!req.ok) throw new Error(`CMS responded ${req.status}`);
		res = await req.json();
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		// console.log(
		// 	`Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
		// );
		return res;
	} catch (error) {
		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		console.log(
			`Error Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`,
		);
		console.log(error, req, "errror");
		// Outside the build, fail the render so Next keeps serving the last good
		// page. Returning nothing would cache a broken page until revalidated.
		if (!isBuild) throw error;
	}
}

/** GraphQLAPI  */
export async function GraphQLAPINoBottleneck(query, ttl = 86400) {
	let res;
	let req;

	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

		req = await limitDuringBuild(
			() =>
				fetch(`${process.env.API_URL}`, {
					...ServerHeaders,
					body: JSON.stringify({ query }),
					next: { revalidate: false, tags: cmsTags() },
				}),
			queryName(query),
			query,
		);
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}

/** GraphQLAPI  */
export async function GraphQLAPILongerRevalidate(query, ttl = 86400) {
	let res;
	let req;
	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

		req = await limitDuringBuild(
			() =>
				fetch(`${process.env.API_URL}`, {
					...ServerHeaders,
					body: JSON.stringify({ query }),
					next: { revalidate: false, tags: cmsTags() },
				}),
			queryName(query),
			query,
		);
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}
