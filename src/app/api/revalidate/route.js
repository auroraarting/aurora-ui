import { revalidatePath, revalidateTag } from "next/cache";

import { everyContentTag } from "@/services/rest/tags";

/**
 * On-demand revalidation — the only way REST-backed pages go stale.
 *
 * The REST services store every fetch with no TTL and a set of cache tags (see
 * services/rest/tags.js), so nothing regenerates on a timer. WordPress calls
 * this endpoint when content changes and names the tags it touched; Next.js
 * then rebuilds exactly the pages that read that content, including composite
 * pages, which inherit the union of the tags of everything they fetched.
 *
 *   /api/revalidate?tags=software                 every page reading software
 *   /api/revalidate?tags=post:my-article-slug     one article's page
 *   /api/revalidate?tags=service,country          two content types at once
 *   /api/revalidate?paths=/service/advisory       one route, by path
 *   /api/revalidate?tags=post%23123                one post by id
 *   /api/revalidate                               everything (see below)
 *
 * Tags may also be sent as JSON — `{ "tags": ["post", "post:slug"] }` — which
 * is easier from a WordPress hook posting an array.
 *
 * Tags come in three shapes, and **a webhook should send all three**:
 *
 *   post          the content type — matches listings and anything that reads
 *                 the collection, so it is what makes a new or deleted item
 *                 show up
 *   post:my-slug  the item as a page addresses it — matches that item's page
 *   post#123      the item as an ACF relation field stores it — matches the
 *                 batched by-id fetches that resolve relation pickers, which
 *                 only ever see ids
 *
 * Sending only the item tags leaves listings stale; sending only the type tag
 * works but invalidates more than it needs to. See services/rest/tags.js.
 *
 * AUTHENTICATION: when REVALIDATE_SECRET is set, callers must supply it as
 * `?secret=` or an `x-revalidate-secret` header. Note that this endpoint used
 * to be open, so the WordPress webhook has to start sending the secret;
 * clearing REVALIDATE_SECRET restores the previous unauthenticated behaviour.
 */

/** Comma- or space-separated list to a clean array. @param {string|null} value */
const parseList = (value) =>
	(value || "")
		.split(/[,\s]+/)
		.map((item) => item.trim())
		.filter(Boolean);

/** @param {Request} req */
function isAuthorised(req) {
	const expected = process.env.REVALIDATE_SECRET;
	if (!expected) return true; // not configured — endpoint stays open
	const url = new URL(req.url);
	const given =
		req.headers.get("x-revalidate-secret") || url.searchParams.get("secret");
	return given === expected;
}

/** @param {Request} req */
async function revalidate(req) {
	if (!isAuthorised(req)) {
		return Response.json({ error: "Invalid revalidation secret" }, { status: 401 });
	}

	const url = new URL(req.url);
	let tags = parseList(url.searchParams.get("tags"));
	let paths = parseList(url.searchParams.get("paths"));

	// A JSON body is the easier shape to send from a WordPress hook.
	if (req.method === "POST") {
		try {
			const body = await req.json();
			if (Array.isArray(body?.tags)) tags = [...tags, ...body.tags];
			if (Array.isArray(body?.paths)) paths = [...paths, ...body.paths];
			if (typeof body?.tags === "string") tags = [...tags, ...parseList(body.tags)];
		} catch {
			// No body, or not JSON — the query string alone is fine.
		}
	}

	// No tags named means "something changed and we don't know what". That
	// fans out over every content type rather than relying on a global tag
	// stored on every cache entry: nothing carries such a tag any more, so the
	// cost of purging the whole site is explicit here instead of being one
	// webhook away at all times. Prefer naming what changed.
	if (!tags.length && !paths.length) tags = [...everyContentTag];

	try {
		for (const tag of new Set(tags)) revalidateTag(tag);
		for (const path of new Set(paths)) revalidatePath(path);
		return Response.json({
			revalidated: true,
			tags: [...new Set(tags)],
			paths: [...new Set(paths)],
			now: Date.now(),
		});
	} catch (error) {
		console.error("Revalidation failed:", error);
		return Response.json(
			{ revalidated: false, error: error.message },
			{ status: 500 },
		);
	}
}

/** @param {Request} req */
export async function GET(req) {
	return revalidate(req);
}

/** @param {Request} req */
export async function POST(req) {
	return revalidate(req);
}
