/* eslint-disable require-jsdoc */
import { after } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { readWebhookBody, webhookTags } from "@/utils/WordpressWebhook";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

// How it works (pages have no time-based revalidate, this is the only refresh).
// Every call needs ?secret=<REVALIDATE_SECRET> (401 without it).
//
// WordPress (WP Webhooks, Send Data) uses /api/revalidate/wordpress/<action>,
// one URL per trigger, which hands its tags to this route. A WP Webhooks body
// POSTed straight here also works (the action is then guessed from the post,
// see utils/WordpressWebhook.js).
//
// By hand:
//   /api/revalidate?tag=event:<slug>           one event: its page + its SEO
//   /api/revalidate?tag=event                  every call tagged "event"
//                                              (getAllEvents, event pages...)
//   /api/revalidate?tag=page:event-landing     one WordPress page
//   /api/revalidate?tag=regions                a taxonomy (not sent by webhooks)
//   /api/revalidate?tag=post:a,post:b          several (comma-separated or repeated ?tag=)
//   /api/revalidate?path=/company/contact      a URL path instead of a tag
//   /api/revalidate                            no params = 400, there is no
//                                              "revalidate everything" on purpose
//
// Tags are the `tags: [...]` passed next to each GraphQLAPI call in services/. Items are handled
// one per request, 1 second apart: this request revalidates the first item and
// responds straight away, then calls itself with the rest a second later.
// Each revalidation is its own request because Next only flushes
// revalidateTag() at the end of a request (inside after() too, where every
// call would be flushed together at the very end).
//
// Revalidating never slows visitors down: the next visit still gets the cached
// page instantly and Next rebuilds it in the background. Spacing the items
// spreads those background rebuilds out so they don't hit WordPress at once.

const delayMs = 1000;
const maxItems = 50;

/** readItems: ?tag=a,b&tag=c&path=/x -> ["tag:a", "tag:b", "tag:c", "path:/x"] */
function readItems(searchParams) {
	const split = (key) =>
		searchParams
			.getAll(key)
			.flatMap((value) => value.split(","))
			.map((value) => value.trim())
			.filter(Boolean);

	const items = [
		...split("tag").map((tag) => `tag:${tag}`),
		...split("path").map((path) => `path:${path}`),
	];
	return [...new Set(items)];
}

/** toSearchParams: the inverse of readItems, for the next request in the chain */
function toSearchParams(items, extra) {
	const params = new URLSearchParams(extra);
	for (const item of items) {
		const [kind, ...rest] = item.split(":");
		params.append(kind, rest.join(":"));
	}
	return params;
}

async function handler(req) {
	const { searchParams, origin } = req.nextUrl;

	// Always required: without it anyone could queue rebuilds against WordPress
	const secret = process.env.REVALIDATE_SECRET;
	if (!secret) {
		return Response.json(
			{ msg: "REVALIDATE_SECRET is not set on this deployment" },
			{ status: 500 },
		);
	}
	if (searchParams.get("secret") !== secret) {
		return Response.json({ msg: "Invalid secret" }, { status: 401 });
	}

	let items = readItems(searchParams);
	let webhook = null;

	const body = await readWebhookBody(req);
	if (body) {
		webhook = webhookTags(body, searchParams.get("action"));
		if (webhook.skip) return Response.json({ msg: webhook.skip, ...webhook });
		items = [...new Set([...items, ...webhook.tags.map((tag) => `tag:${tag}`)])];
		console.log(
			`[revalidate] WordPress ${webhook.action} ${webhook.postType}: ${webhook.tags.join(", ")}`,
		);
	}

	if (items.length === 0) {
		return Response.json(
			{ msg: "Pass ?tag= or ?path= (there is no revalidate-everything)" },
			{ status: 400 },
		);
	}

	const badPath = items.find(
		(item) => item.startsWith("path:") && !item.startsWith("path:/"),
	);
	if (badPath) {
		return Response.json(
			{ msg: "path must start with /", item: badPath },
			{ status: 400 },
		);
	}
	if (items.length > maxItems) {
		return Response.json(
			{ msg: `At most ${maxItems} tags/paths per call`, count: items.length },
			{ status: 400 },
		);
	}

	// Position in the whole chain, for the logs
	const done = Number(searchParams.get("done") || 0);
	const total = Number(searchParams.get("total") || items.length);

	const [current, ...remaining] = items;
	const value = current.slice(current.indexOf(":") + 1);
	try {
		if (current.startsWith("tag:")) revalidateTag(value);
		else revalidatePath(value);
	} catch (error) {
		console.error(`[revalidate] failed ${current}:`, error);
		return new Response(`Webhook error: ${error.message}`, { status: 500 });
	}
	console.log(
		`[revalidate] ${done + 1}/${total} ${current} (${remaining.length} queued)`,
	);

	if (remaining.length) {
		after(async () => {
			await new Promise((r) => setTimeout(r, delayMs));
			const params = toSearchParams(remaining, {
				done: done + 1,
				total,
				secret,
			});
			try {
				const res = await fetch(`${origin}/api/revalidate?${params}`, {
					cache: "no-store",
				});
				if (!res.ok) throw new Error(`HTTP ${res.status}`);
			} catch (error) {
				console.error(
					`[revalidate] could not queue the next item, dropped: ${remaining.join(", ")}`,
					error,
				);
			}
		});
	}

	return Response.json({
		msg: "Revalidated",
		...(webhook && { action: webhook.action }),
		revalidated: current,
		queued: remaining,
		secondsUntilAllDone: remaining.length * (delayMs / 1000),
	});
}

export const GET = handler;
export const POST = handler;
