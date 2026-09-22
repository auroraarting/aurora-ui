import { revalidateTag } from "next/cache";
import { allTag } from "@/lib/cacheConfig";

/**
 * GET /api/revalidate - purge cached WPGraphQL responses.
 *
 * Called by WordPress when content is published. This is what keeps the site
 * fresh now that the cache windows are measured in minutes rather than seconds,
 * so a failure here is worth surfacing rather than swallowing.
 *
 * Query params:
 *   secret - required once REVALIDATE_SECRET is set in the environment.
 *   apiID  - optional; purges just that content type (e.g. "post", "event").
 *            Omit to purge everything.
 */
export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const secret = process.env.REVALIDATE_SECRET;

	// Until the secret is configured on both sides this stays open, so existing
	// webhooks keep working. Set REVALIDATE_SECRET to close it: an unauthenticated
	// full purge lets anyone force every page to refetch from WordPress at once.
	if (secret) {
		const provided =
			searchParams.get("secret") || req.headers.get("x-revalidate-secret");
		if (provided !== secret) {
			return Response.json({ msg: "Invalid secret" }, { status: 401 });
		}
	} else {
		console.warn(
			"REVALIDATE_SECRET is not set - /api/revalidate is publicly callable.",
		);
	}

	try {
		const apiID = searchParams.get("apiID");
		const tag = apiID ? `api:${apiID}` : allTag;

		revalidateTag(tag);

		return Response.json({ msg: `Revalidated ${tag}`, tag });
	} catch (error) {
		console.error("Revalidation failed:", error);
		return new Response(`Revalidation error: ${error.message}`, {
			status: 500,
		});
	}
}
