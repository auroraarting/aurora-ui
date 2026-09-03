// On-demand revalidation endpoint.
//
// The CMS calls this when an editor saves something, and it flushes the cache
// tags that content appears under (see services/CacheTags.js for the tag
// vocabulary and the WordPress slug -> tag map). Time-based revalidation is
// still in place underneath, so a webhook that never fires costs freshness
// until the TTL expires rather than forever.
//
// Two ways to call it, and they can be combined in one request:
//
//   1. A webhook payload. WP Webhooks posts { post: { post_type, post_name,
//      ID } }; the type is mapped to a tag, and the bare type plus the entry's
//      own tag are both flushed, so listings and the detail page rebuild.
//
//   2. Explicit tags, for manual fixes and CI: ?tag=post,software:chronos or
//      a JSON body { "tags": [...] }. `alldata` flushes everything.
//
// The secret travels in the x-revalidate-secret header, or ?secret= when the
// caller cannot set headers (query strings end up in access logs, so prefer
// the header).

import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import {
	GLOBAL_TAG,
	isIgnoredContentType,
	tagsForContentType,
} from "@/services/CacheTags";

// Never prerender or cache the endpoint itself.
export const dynamic = "force-dynamic";

const SECRET_HEADER = "x-revalidate-secret";

/** Constant-time secret comparison, so a wrong secret cannot be narrowed down
 *  by timing the response. Lengths are compared first because
 *  timingSafeEqual throws on a length mismatch. */
function secretMatches(given, expected) {
	if (typeof given !== "string" || given.length !== expected.length) {
		return false;
	}
	return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

/** Normalise a webhook payload into { type, entry }. Each adapter returns null
 *  for a payload it does not own, so another backend is one entry away. */
const adapters = [
	// WP Webhooks: { post: { post_type, post_name, ID } }
	(body) =>
		body?.post?.post_type
			? {
					type: body.post.post_type,
					entry: { name: body.post.post_name, id: body.post.ID },
				}
			: null,
	// A flatter shape, which some WordPress webhook plugins send instead.
	(body) =>
		body?.post_type
			? { type: body.post_type, entry: { name: body.post_name, id: body.ID } }
			: null,
];

/** @param {any} body */
function normalise(body) {
	for (const adapt of adapters) {
		const hit = adapt(body);
		if (hit) return hit;
	}
	return null;
}

/** The request body as an object, whichever way the backend sends it: JSON,
 *  or form-encoded (some webhook plugins post `post[post_type]=…` instead).
 *  An empty or unreadable body is not an error — the tags may be in the query
 *  string instead. @param {Request} request */
async function readBody(request) {
	const type = request.headers.get("content-type") || "";
	try {
		if (type.includes("json")) return await request.json();
		if (type.includes("form")) {
			const form = await request.formData();
			const flat = {};
			for (const [key, value] of form.entries()) {
				// post[post_type]=x -> { post: { post_type: "x" } }
				const nested = key.match(/^(\w+)\[(\w+)\]$/);
				if (nested) {
					flat[nested[1]] = { ...flat[nested[1]], [nested[2]]: value };
				} else {
					flat[key] = value;
				}
			}
			return flat;
		}
		// No usable content type: try JSON anyway, since that is what the
		// WordPress plugins send even when they mislabel it.
		return JSON.parse(await request.text());
	} catch {
		return null;
	}
}

/** Tags named directly by the caller, from ?tag= and from the JSON body.
 *  @param {URLSearchParams} params @param {any} body */
function explicitTags(params, body) {
	const fromQuery = (params.get("tag") || params.get("tags") || "").split(",");
	const fromBody = Array.isArray(body?.tags)
		? body.tags
		: String(body?.tags || body?.tag || "").split(",");
	return [...fromQuery, ...fromBody]
		.map((tag) => tag.trim())
		.filter(Boolean);
}

export async function POST(request) {
	const { searchParams } = new URL(request.url);
	const expected = process.env.REVALIDATE_SECRET;

	console.log("[revalidate] incoming", {
		method: "POST",
		hasHeaderSecret: Boolean(request.headers.get(SECRET_HEADER)),
		hasQuerySecret: searchParams.has("secret"),
	});

	if (!expected) {
		console.error("[revalidate] REVALIDATE_SECRET is not configured");
		return Response.json(
			{ revalidated: false, message: "REVALIDATE_SECRET is not configured" },
			{ status: 500 },
		);
	}

	const given = request.headers.get(SECRET_HEADER) || searchParams.get("secret");
	if (!secretMatches(given, expected)) {
		console.warn("[revalidate] invalid token");
		return Response.json(
			{ revalidated: false, message: "Invalid token" },
			{ status: 401 },
		);
	}

	const body = await readBody(request);

	const hit = normalise(body);
	const tags = new Set(explicitTags(searchParams, body));

	if (hit) {
		if (isIgnoredContentType(hit.type)) {
			console.log("[revalidate] ignored type", hit.type);
			return Response.json({
				revalidated: false,
				type: hit.type,
				message: `Content type "${hit.type}" is not rendered by the site; nothing to do.`,
			});
		}
		const mapped = tagsForContentType(hit.type, hit.entry);
		if (!mapped.length) {
			// Loud on purpose: a misconfiguration must not look like a success.
			console.error("[revalidate] unconfigured type", hit.type);
			return Response.json(
				{
					revalidated: false,
					type: hit.type,
					message: `Received post_type "${hit.type}", which is not configured. Add it to TAG_BY_CONTENT_TYPE in src/services/CacheTags.js.`,
				},
				{ status: 400 },
			);
		}
		for (const tag of mapped) tags.add(tag);
	}

	console.log("[revalidate] resolved", {
		type: hit?.type ?? null,
		slug: hit?.entry?.name ?? null,
		mapped: Boolean(hit),
		tags: [...tags],
	});

	if (!tags.size) {
		return Response.json(
			{
				revalidated: false,
				message:
					"Nothing to revalidate: no recognised post payload and no tags in the request.",
			},
			{ status: 400 },
		);
	}

	const results = [];
	for (const tag of tags) {
		try {
			revalidateTag(tag);
			console.log("[revalidate] OK", tag);
			results.push({ tag, revalidated: true });
		} catch (error) {
			console.error("[revalidate] FAIL", tag, error?.message || error);
			results.push({
				tag,
				revalidated: false,
				error: error?.message || String(error),
			});
		}
	}

	const failed = results.filter((result) => !result.revalidated).length;
	console.log("[revalidate] done", {
		revalidated: failed === 0,
		total: results.length,
		failed,
	});

	return Response.json(
		{
			revalidated: failed === 0,
			type: hit?.type ?? null,
			slug: hit?.entry?.name ?? null,
			results,
		},
		{ status: failed ? 207 : 200 },
	);
}

/** Opening the URL in a browser is the most common way to test this by
 *  accident; answer with the shape a real call takes rather than a bare 405. */
export async function GET() {
	return Response.json(
		{
			revalidated: false,
			message:
				"Use POST with the secret in the x-revalidate-secret header (or ?secret=), " +
				"plus either a webhook payload or ?tag=<comma-separated>. " +
				`"${GLOBAL_TAG}" flushes every cached response.`,
		},
		{ status: 405 },
	);
}
