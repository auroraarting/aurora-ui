/* eslint-disable require-jsdoc */
// On-demand revalidation, called by the WordPress webhooks whenever content is
// created, changed or deleted:
//
//     /api/revalidate?secret=<secret>&tags=software,chronos
//
// Every upstream fetch is tagged with the content types it reads (see
// services/cacheTags.js), so invalidating a tag regenerates exactly the pages
// that consumed that data — a composite page like the home page included,
// because it inherits the tags of everything it fetches.
//
// Pages regenerate lazily: the next visitor gets the fresh render, everyone
// after that gets it from cache. Nothing is rebuilt until it is asked for.

import { revalidateTag } from "next/cache";
import { ALL_TAG } from "@/services/cacheTags";

/** Tags accept letters, numbers, and the separators WordPress slugs use. Keeps
 *  a malformed webhook from spraying junk into the cache layer.
 *
 *  Unicode letters are allowed because a non-Latin title gives a non-Latin
 *  `post_name`, and the per-slug tags are built from the decoded slug. */
const VALID_TAG = /^[\p{L}\p{M}\p{N}._:-]{1,120}$/u;

/** A percent-encoded slug → the decoded form the tags are built from, so a
 *  webhook may send either. Left alone if it is not valid encoding. */
function decodeSlug(tag) {
	if (!tag.includes("%")) return tag;
	try {
		return decodeURIComponent(tag);
	} catch {
		return tag;
	}
}

/** `tags=software,chronos` — also tolerates the `[a,b]` form, since the webhook
 *  URL is written by hand and brackets are easy to leave in. */
function parseTags(raw) {
	if (!raw) return [];
	return [
		...new Set(
			String(raw)
				.replace(/^\[|\]$/g, "")
				.split(",")
				.map((tag) => decodeSlug(tag.trim().replace(/^["']|["']$/g, "")))
				.filter((tag) => VALID_TAG.test(tag)),
		),
	];
}

async function handle(request) {
	const { searchParams } = new URL(request.url);
	const secret = searchParams.get("secret");
	const expected = process.env.REVALIDATE_SECRET;

	// Without a configured secret the endpoint would let anyone force a rebuild
	// of the whole site, so it refuses rather than running unauthenticated.
	if (!expected) {
		return Response.json(
			{ revalidated: false, error: "REVALIDATE_SECRET is not configured" },
			{ status: 500 },
		);
	}
	if (secret !== expected) {
		return Response.json(
			{ revalidated: false, error: "Invalid secret" },
			{ status: 401 },
		);
	}

	// No tags means "something changed but we don't know what" — fall back to the
	// site-wide tag rather than silently doing nothing, which is what the previous
	// version of this route did.
	const requested = parseTags(searchParams.get("tags"));
	const tags = requested.length ? requested : [ALL_TAG];

	const revalidated = [];
	const failed = [];
	for (const tag of tags) {
		try {
			revalidateTag(tag);
			revalidated.push(tag);
		} catch (error) {
			console.error(`revalidateTag(${tag}) failed:`, error?.message || error);
			failed.push(tag);
		}
	}

	return Response.json({
		revalidated: failed.length === 0,
		tags: revalidated,
		...(failed.length ? { failed } : {}),
		now: Date.now(),
	});
}

export async function GET(request) {
	return handle(request);
}

// WP Webhooks can be configured either way, so both verbs are accepted.
export async function POST(request) {
	return handle(request);
}
