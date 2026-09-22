import { ServerHeaders } from "@/utils/RequestHeaders";
import {
	buildTags,
	proxyRefreshSeconds,
	revalidateFor,
} from "@/lib/cacheConfig";

/**
 * GraphQLAPI - the single entry point for every WPGraphQL request.
 *
 * Requests go to the shared Redis proxy rather than straight to WordPress, and
 * the response is additionally held in Next's Data Cache under a set of tags so
 * /api/revalidate can purge it the moment content is published. Without those
 * tags the only way a change could reach the site was waiting out the TTL,
 * which is why the TTLs used to be set to 30s and why WordPress was being
 * re-queried for the same data all day.
 */
export default async function GraphQLAPI(query, dataObj = {}) {
	const { apiID, pageID } = dataObj;
	const revalidate = revalidateFor(apiID);
	const startTime = Date.now();

	const payload = {
		url: `${process.env.API_URL}`,
		method: "POST",
		body: { query },
		// The proxy's own TTL, in ms. Kept short on purpose: Next's Data Cache
		// below is what shields WordPress in steady state, so the proxy only
		// gets called when we actually want fresh data. See cacheConfig.
		refreshInterval: proxyRefreshSeconds * 1000,
		headers: {
			...ServerHeaders.headers,
		},
		...dataObj,
		apiID: `${apiID}`,
		pageID: `${process.env.NEXT_PUBLIC_SITE_ENV}${pageID}`,
	};

	try {
		const req = await fetch(`${process.env.REDIS_URL}/api/cache`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			next: { revalidate, tags: buildTags(apiID) },
		});

		if (!req.ok) {
			throw new Error(`Cache proxy responded ${req.status}`);
		}

		const res = await req.json();

		// A GraphQL error still arrives as a 200, so Next would cache it for the
		// full window. Log it loudly rather than letting a bad response sit in
		// the cache unnoticed.
		if (res?.errors) {
			console.error(
				`GraphQL errors for ${apiID} ${pageID}:`,
				JSON.stringify(res.errors),
			);
		}

		return res;
	} catch (error) {
		console.error(
			`GraphQL fetch failed for ${apiID} ${pageID} after ${Date.now() - startTime}ms`,
			error,
		);
	}
}
