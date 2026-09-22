/**
 * Central cache configuration for every WPGraphQL request.
 *
 * Two layers sit in front of WordPress:
 *
 *   1. The shared Redis proxy (`REDIS_URL/api/cache`) — shared by every running
 *      instance, keyed by apiID/pageID.
 *   2. Next's Data Cache — per-deployment, and purgeable by tag through
 *      `revalidateTag()` from /api/revalidate.
 *
 * Both layers read their TTL from the table below so the two can't drift apart.
 * Freshness comes from the webhook purge, not from short TTLs — these values are
 * the backstop for when a webhook is missed.
 */

/** Revalidate windows, in seconds. */
export const REVALIDATE = {
	/** Navigation, header/footer, taxonomies — changes rarely. */
	COMMON: 3600,
	/** Editorial content: pages, posts, insights, press releases. */
	CONTENT: 1800,
	/** Anything with a date that can lapse: events, webinars. */
	SCHEDULED: 900,
};

/** Used when a request doesn't declare an apiID. */
export const defaultRevalidate = REVALIDATE.CONTENT;

/**
 * The Redis proxy's own TTL, in seconds — deliberately much shorter than the
 * windows above.
 *
 * In steady state Next's Data Cache answers every request and the proxy is
 * never called, so WordPress is protected by the long windows regardless of
 * this value. The proxy is only reached on a cold start, a deploy, or straight
 * after a tag purge — and in all three cases we want current data. Holding the
 * proxy at 30 minutes too would mean a publish purged Next, Next refetched, and
 * the proxy handed back the same stale response it already had.
 */
export const proxyRefreshSeconds = 60;

/** Tag that purges every cached GraphQL response in one call. */
export const allTag = "alldata";

/** apiIDs that map to something other than the default CONTENT window. */
const revalidateByApiId = {
	// Dated content — shortest window.
	event: REVALIDATE.SCHEDULED,
	tribe_events: REVALIDATE.SCHEDULED,
	webinar: REVALIDATE.SCHEDULED,

	// Structural / reference data — longest window.
	common: REVALIDATE.COMMON,
	country: REVALIDATE.COMMON,
	"country-inside": REVALIDATE.COMMON,
	"country-regions": REVALIDATE.COMMON,
	"country-titles": REVALIDATE.COMMON,
	"early-career": REVALIDATE.COMMON,
	"early-career-regions-3": REVALIDATE.COMMON,
	howwehelp: REVALIDATE.COMMON,
	offices: REVALIDATE.COMMON,
	products: REVALIDATE.COMMON,
	services: REVALIDATE.COMMON,
	softwares: REVALIDATE.COMMON,
	team: REVALIDATE.COMMON,
	whoareyou: REVALIDATE.COMMON,
};

/** revalidateFor - how long a given apiID's response stays cached. */
export function revalidateFor(apiID) {
	return revalidateByApiId[apiID] ?? defaultRevalidate;
}

/**
 * buildTags - cache tags for a single GraphQL request.
 *
 * Every response carries allTag so a full purge stays one call, plus a
 * per-apiID tag so a WordPress webhook can purge just the content type that
 * actually changed instead of stampeding the whole site.
 */
export function buildTags(apiID) {
	return apiID ? [allTag, `api:${apiID}`] : [allTag];
}
