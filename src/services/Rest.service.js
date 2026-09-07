import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";
import { toCacheTags } from "./CacheTags";
import { cachedSchedule, fetchUpstream } from "./UpstreamRequest";

// Concurrency, retries and the throttle cooldown all live in UpstreamRequest,
// shared with Graphql.service.js — the two contend for one origin, so one
// budget covers both. See that file for why a per-module limiter was the thing
// producing 403s during `next build`.

// There is no time-based revalidation. Every response is cached indefinitely
// (`cache: "force-cache"` plus `revalidate: false`) and leaves the cache only
// when POST /api/revalidate flushes one of its tags. Both are stated
// explicitly because these requests carry an Authorization header, which Next
// treats as a signal not to cache unless a cache config says otherwise.

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
 *  Deduplicates identical build-time requests and shares one outbound budget
 *  with the GraphQL service.
 *  Runtime cache: held indefinitely, flushed by tag on demand.
 *  dataObj param is accepted but mostly unused — kept so callers need no
 *  changes. `method` is read from it, so read-only endpoints (wp/v2/pages
 *  and friends, which reject POST with a 401) can ask for GET, plus `baseUrl`
 *  for the few routes that live outside the wp/v2 namespace REST_API_URL points
 *  at (see wpJsonNamespace in services/rest/GraphqlShape.js), and `tag` — the
 *  cache tags this response can be revalidated by on demand (see
 *  services/CacheTags.js). `apiID` and `pageID` are ignored.
 *  @param {string} query
 *  @param {{ method?: string, baseUrl?: string, tag?: string|string[] }} [dataObj]
 */
export default async function RESTAPI(query, dataObj = {}) {
	const method = dataObj?.method || ServerHeaders.method;
	const baseUrl = dataObj?.baseUrl || process.env.REST_API_URL;
	const tags = toCacheTags(dataObj?.tag);
	return cachedSchedule(`direct:${method}:${baseUrl}${query}`, async () => {
		const req = await fetchUpstream(
			`${baseUrl}${query}`,
			{
				...ServerHeaders,
				method,
				cache: "force-cache",
				next: { revalidate: false, tags },
			},
			`REST ${method} ${query}`,
		);
		const res = await req.json();
		return proxyAllMediaUrls(res);
	});
}
