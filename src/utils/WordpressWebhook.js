import { cmsContentTypes } from "@/utils/CmsContentTypes";

/**
 * WordPress "WP Webhooks" (Send Data) -> cache tags, for /api/revalidate.
 *
 * WordPress POSTs the saved post as JSON. The create / update / delete bodies
 * are identical, so the action is worked out from the post itself:
 *   status "trash" or slug "<slug>__trashed"      -> removed   (entry + list)
 *   first publish (post_date ~ post_modified)     -> created   (entry + list)
 *   published, modified later                     -> updated   (entry only)
 *   not published, never was (post_date_gmt 0)   -> skipped   (a draft)
 *   not published, has a publish date             -> unpublished (entry + list)
 * For an event, "entry" is event:<slug> + event:<id> (getEventsInside and that
 * page's SEO) and "list" is event (getAllEvents and every call tagged "event").
 * `?action=create|update|delete|trash` on the URL overrides the guess.
 */

const listActions = ["create", "delete", "trash", "unpublish"];
const firstPublishMs = 60 * 1000;
const recentlySent = new Map(); // WordPress often fires the same save twice
const dedupeMs = 10000;

/** safeDecode: WordPress stores non-latin slugs percent-encoded */
function safeDecode(value) {
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
}

/** gmtTime: "2018-11-06 14:19:18" (GMT) -> ms, or null for WordPress' zero date */
function gmtTime(value) {
	if (!value || value.startsWith("0000")) return null;
	const time = Date.parse(`${value.replace(" ", "T")}Z`);
	return Number.isNaN(time) ? null : time;
}

/** readWebhookBody: the JSON body, or null for a normal ?tag= call */
export async function readWebhookBody(req) {
	if (req.method !== "POST") return null;
	const type = req.headers.get("content-type") || "";
	try {
		if (type.includes("application/json")) {
			const body = await req.json();
			return body?.post ? body : null;
		}
		if (type.includes("form")) {
			// form-encoded: post[post_type]=post&post[post_name]=...
			const form = Object.fromEntries(await req.formData());
			const post = {};
			for (const [key, value] of Object.entries(form)) {
				const match = key.match(/^post\[(\w+)\]$/);
				if (match) post[match[1]] = value;
			}
			return post.post_type ? { ...form, post } : null;
		}
	} catch {
		return null;
	}
	return null;
}

/** guessAction: see the table at the top */
export function guessAction(post) {
	const status = post.post_status;
	if (status === "trash" || /__trashed$/.test(post.post_name || "")) {
		return "trash";
	}
	const published = gmtTime(post.post_date_gmt);
	if (status !== "publish") return published ? "unpublish" : "draft";
	const modified = gmtTime(post.post_modified_gmt);
	if (published && modified && modified - published < firstPublishMs) {
		return "create";
	}
	return "update";
}

/**
 * webhookTags: { action, tags } for a WP Webhooks body, or { skip } when the
 * save doesn't change the live site (a draft) or is a duplicate.
 */
export function webhookTags(body, actionOverride) {
	const post = body.post || {};
	const postType = post.post_type;
	const slug = safeDecode(post.post_name || "").replace(/__trashed$/, "");
	const id = body.post_id || post.ID;
	if (!postType || (!slug && !id)) return { skip: "No post_type / post_name" };

	const action = actionOverride || guessAction(post);
	if (action === "draft") return { skip: `Skipped ${post.post_status} save` };

	const type = cmsContentTypes[postType]?.single || postType;
	const tags = [slug && `${type}:${slug}`, id && `${type}:${id}`];

	// Pages are queried by URI (page(id: "company/contact", idType: URI))
	if (postType === "page" && body.post_permalink) {
		try {
			const uri = new URL(body.post_permalink).pathname.replace(/^\/|\/$/g, "");
			if (uri) tags.push(`page:${uri}`);
		} catch {
			// not a URL, the slug tag still covers top-level pages
		}
	}
	if (listActions.includes(action)) tags.push(type);

	const unique = [...new Set(tags.filter(Boolean))];

	// Same action + same entry within 10s = WordPress firing one save twice
	const dedupeKey = `${action} ${unique.join(",")}`;
	const now = Date.now();
	if (now - (recentlySent.get(dedupeKey) || 0) < dedupeMs) {
		return { skip: "Duplicate webhook, already queued", action, tags: unique };
	}
	recentlySent.set(dedupeKey, now);

	return { action, postType, tags: unique };
}
