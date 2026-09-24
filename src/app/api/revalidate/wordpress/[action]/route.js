/* eslint-disable require-jsdoc */
import { after } from "next/server";
import {
	guessAction,
	readWebhookBody,
	webhookTags,
} from "@/utils/WordpressWebhook";

export const dynamic = "force-dynamic";

// Endpoint for the WordPress "WP Webhooks" plugin (Send Data). One webhook per
// trigger, the action is the last part of the path:
//   Post created  ->  POST /api/revalidate/wordpress/create?secret=<REVALIDATE_SECRET>
//   Post updated  ->  POST /api/revalidate/wordpress/update?secret=...
//   Post deleted  ->  POST /api/revalidate/wordpress/delete?secret=...
//   Post trashed  ->  POST /api/revalidate/wordpress/trash?secret=...
//
// WordPress POSTs the saved post as JSON; the tags come from that body
// (post.post_type + post.post_name, see utils/WordpressWebhook.js). For an event:
//   update                   event:<slug> + event:<id> -> getEventsInside and
//                            that page's SEO; nothing else
//   create / delete / trash  the same + event -> getAllEvents and every other
//   (and update when it is   call tagged "event", because the list changed
//   a first publish or an
//   unpublish)
//   draft saves              skipped
// The tags are then handed to /api/revalidate, which works through them one
// per second.

const actions = ["create", "update", "delete", "trash"];

export async function POST(req, { params }) {
	const { searchParams, origin } = req.nextUrl;
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

	const { action } = await params;
	if (!actions.includes(action)) {
		return Response.json(
			{ msg: `Unknown action "${action}", use ${actions.join(" / ")}` },
			{ status: 404 },
		);
	}

	const body = await readWebhookBody(req);
	if (!body) {
		return Response.json(
			{ msg: "Expected the WP Webhooks JSON body with a post" },
			{ status: 400 },
		);
	}

	// delete / trash are what the path says. create / update are checked
	// against the post: WordPress fires "update" when a draft is published for
	// the first time (the lists must refresh), and for plain draft saves (the
	// live site doesn't change)
	let resolved = ["delete", "trash"].includes(action)
		? action
		: guessAction(body.post);
	if (action === "create" && resolved === "update") resolved = "create";
	if (resolved === "draft") {
		return Response.json({ msg: `Skipped ${body.post.post_status} save` });
	}

	const result = webhookTags(body, resolved);
	if (result.skip) return Response.json({ msg: result.skip, ...result });

	const key = result.tags.join(",");
	console.log(
		`[revalidate/wordpress] ${action} (${resolved}) ${result.postType}: ${key}`,
	);

	// Answer WordPress straight away; /api/revalidate works through the tags
	// one per second in the background
	after(async () => {
		const query = new URLSearchParams({ tag: key, secret });
		try {
			const res = await fetch(`${origin}/api/revalidate?${query}`, {
				cache: "no-store",
			});
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
		} catch (error) {
			console.error(`[revalidate/wordpress] could not queue ${key}`, error);
		}
	});

	return Response.json({
		msg: "Queued",
		action,
		treatedAs: resolved,
		tags: result.tags,
	});
}
