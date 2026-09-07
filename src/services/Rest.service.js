import { ServerHeaders } from "@/utils/RequestHeaders";
import { proxyMediaUrl } from "@/utils";
import { toCacheTags } from "./CacheTags";
import {
	fetchUpstream,
	schedule,
	upstreamCacheConfig,
} from "./UpstreamRequest";

// Concurrency, retries and the throttle cooldown all live in UpstreamRequest,
// shared with Graphql.service.js — the two contend for one origin, so one
// budget covers both. See that file for why a per-module limiter was the thing
// producing 403s during `next build`.

// Responses are cached under a long TTL (see upstreamCacheConfig) and flushed
// early by tag when POST /api/revalidate names one of them. The TTL is the
// backstop, not the mechanism: an edit shows up as soon as the webhook fires,
// and the timer only bounds how stale a page can get if that never happens.

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
 *  Shares one outbound budget with the GraphQL service.
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
	// Not memoized per request — see UpstreamRequest.js.
	return schedule(async () => {
		const req = await fetchUpstream(
			`${baseUrl}${query}`,
			{
				...ServerHeaders,
				method,
				...upstreamCacheConfig(tags),
			},
			`REST ${method} ${query}`,
		);
		const res = await req.json();
		return proxyAllMediaUrls(res);
	});
}
