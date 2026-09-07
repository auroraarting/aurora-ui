import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";
import { toCacheTags } from "./CacheTags";
import { cachedSchedule, fetchUpstream } from "./UpstreamRequest";

// Concurrency, retries and the throttle cooldown all live in UpstreamRequest,
// shared with Rest.service.js — the two contend for one origin, so one budget
// covers both. See that file for why a per-module limiter was the thing
// producing 403s during `next build`.

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
 *  Deduplicates identical build-time queries and shares one outbound budget
 *  with the REST service.
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
		const req = await fetchUpstream(
			`${process.env.API_URL}`,
			{
				...ServerHeaders,
				body: JSON.stringify({ query }),
				cache: "force-cache",
				next: { revalidate: false, tags },
			},
			"GraphQL request",
		);
		const res = await req.json();
		return proxyAllMediaUrls(res);
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
