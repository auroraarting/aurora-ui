import Bottleneck from "bottleneck";
import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";

// Limits concurrent outbound calls to WordPress during builds
const limiter = new Bottleneck({ maxConcurrent: 5, minTime: 150 });

// Build-time in-process cache: identical queries during `next build` hit the
// network once — e.g. getInsightsCategories called per-page resolves from cache.
const buildCache = new Map();

const refreshInterval = 3600;

/** @param {string} key @param {() => Promise<any>} fn */
function cachedSchedule(key, fn) {
	if (buildCache.has(key)) return buildCache.get(key);
	const p = limiter.schedule(fn);
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
 *  Runtime cache: Next.js ISR revalidates every 30 seconds.
 *  dataObj param is accepted but unused — kept so callers need no changes.
 */
export default async function GraphQLAPINew(query) {
	return cachedSchedule(`direct:${query}`, async () => {
		try {
			const req = await fetch(`${process.env.API_URL}`, {
				...ServerHeaders,
				body: JSON.stringify({ query }),
				next: { revalidate: refreshInterval },
			});
			const res = await req.json();
			return proxyAllMediaUrls(res);
		} catch (error) {
			console.log(error, "errror");
		}
	});
}

/** Legacy Redis-based version. Kept for reference only. */
export async function GraphQLAPI(query, dataObj) {
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
			pageID: `newstaging${dataObj.pageID}`,
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
