// Cache tags for on-demand revalidation.
//
// Every upstream fetch is tagged with the content types it reads, so a
// WordPress webhook hitting /api/revalidate?tags=software regenerates exactly
// the pages that consumed software data — including composite pages like the
// home page, which inherit the union of the tags of everything they fetch. No
// page maintains its own tag list.
//
// A single-item fetch is tagged with its slug too, so editing one article
// regenerates that article's page rather than all 709 of them.

/** `apiID` values the services already pass, mapped to one canonical tag each.
 *  The raw values grew organically ("post" / "pages" / "tribe_events" /
 *  "country-regions"), so they are normalised here rather than at 100 call
 *  sites. Anything unmapped falls through as-is, which is harmless: an unknown
 *  tag simply never matches a webhook. */
const API_ID_TAGS = {
	page: "page",
	pages: "page",
	common: "common",
	post: "post",
	"post-translations": "post",
	categories: "category",
	tags: "tag",
	media: "media",
	softwares: "software",
	products: "product",
	services: "service",
	country: "country",
	"country-titles": "country",
	"country-inside": "country",
	"country-regions": "country",
	offices: "office",
	team: "team",
	teams: "team",
	event: "event",
	tribe_events: "event",
	webinar: "webinar",
	podcast: "podcast",
	video: "video",
	previousVideos: "video",
	videos: "video",
	"press-room": "press",
	whoareyou: "whoareyou",
	howwehelp: "howwehelp",
	"early-career": "early-career",
	"early-career-regions-3": "early-career",
};

/** Tag every page depends on. Firing it rebuilds the whole site, which is the
 *  right escape hatch for a global change (navigation, footer, settings). */
export const ALL_TAG = "alldata";

/** The tags for one fetch.
 *
 *  `tags` given explicitly wins — services pass it for the fetches whose scope
 *  the apiID alone cannot express: a single item (add its slug) or a query that
 *  reads several collections at once (list them all).
 *
 *  @param {{ apiID?: string, tags?: string[] }} options
 *  @returns {string[]}
 */
export function cacheTagsFor({ apiID, tags } = {}) {
	const resolved = new Set([ALL_TAG]);

	for (const tag of tags || []) {
		if (tag) resolved.add(String(tag));
	}
	if (!tags?.length && apiID) {
		resolved.add(API_ID_TAGS[apiID] || apiID);
	}

	return [...resolved];
}
