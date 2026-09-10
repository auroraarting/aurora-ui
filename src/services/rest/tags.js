/**
 * Cache tags for on-demand revalidation.
 *
 * There is no time-based revalidation anywhere in the REST layer: every fetch
 * is stored with `revalidate: false` and a set of tags. Content goes stale only
 * when WordPress says so, by calling /api/revalidate with the tags it changed.
 *
 * A fetch carries two kinds of tag:
 *   - the content type it reads  ("service", "post", "country")
 *   - the single item it reads   ("service:advisory")
 *
 * Editing one insight therefore regenerates that insight's page, while adding a
 * new country regenerates everything that lists countries. Composite pages need
 * no tag list of their own: a page inherits the union of the tags of every
 * fetch it made, because Next.js attributes tags per caller.
 */

/** Fired by /api/revalidate with no arguments. Rebuilds everything. */
export const allTag = "alldata";

/** Canonical tag per content type. Keys are what services pass as `apiID`
 *  (they mirror the WP `rest_base`); values are the tag the WordPress webhook
 *  is expected to send. Kept as a map rather than free-form strings so a typo
 *  in a service shows up here instead of silently producing a tag no webhook
 *  will ever match. */
export const apiIdTags = {
	pages: "page",
	posts: "post",
	categories: "category",
	tags: "post-tag",
	media: "media",
	services: "service",
	softwares: "software",
	products: "product",
	country: "country",
	region: "region",
	offices: "office",
	team: "team",
	teamsector: "team",
	event: "event",
	tribe_events: "event",
	"webinar-tag": "webinar",
	podcast: "podcast",
	video: "video",
	"video-category": "video",
	"press-room-subscript": "press",
	whoareyou: "whoareyou",
	howwehelp: "howwehelp",
	"early-career": "early-career",
	program: "program",
	testimonial: "testimonial",
	"clients-logo": "client-logo",
	"post-speaker": "speaker",
	"post-author": "author",
	eventscategory: "event",
	eventdownload: "event",
	icons: "icon",
	"icon-collections": "icon",
};

/** Normalise one raw type into its canonical tag. Unmapped values pass
 *  through — harmless, they just never match a webhook. */
export const tagFor = (type) => apiIdTags[type] || type;

/**
 * The tags for a single fetch.
 *
 * @param {object} [options]
 * @param {string} [options.apiID] content type being read, e.g. "services"
 * @param {string} [options.slug]  single item being read, e.g. "advisory"
 * @param {string[]} [options.tags] extra tags for a fetch that reads more than
 *   one collection, or whose scope the apiID alone cannot express
 * @returns {string[]}
 */
export function tagsFor({ apiID, slug, tags } = {}) {
	const out = new Set([allTag]);
	if (apiID) {
		const base = tagFor(apiID);
		out.add(base);
		if (slug) out.add(`${base}:${slug}`);
	}
	for (const tag of tags || []) {
		if (tag) out.add(tag);
	}
	return [...out];
}

/** The item-level tag for a type/slug pair, for callers that need to name one
 *  explicitly (a webhook handler, or a fetch tagged for a slug it did not
 *  itself request by slug). */
export const itemTag = (type, slug) => `${tagFor(type)}:${slug}`;
