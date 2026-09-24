/**
 * Cache tags for on-demand revalidation.
 *
 * There is no time-based revalidation anywhere in the REST layer: every fetch
 * is stored with no TTL and a set of tags, and content goes stale only when
 * WordPress calls /api/revalidate with the tags it changed.
 *
 * Three kinds of tag, and every fetch carries as many as it can:
 *
 *   service            the content type   — any service changed
 *   service:advisory   one item by slug   — that one service changed
 *   service#125        one item by id     — same, for a fetch that only knows
 *                                           ids (an ACF relation picker)
 *
 * Slug and id tags exist side by side because the two halves of the system
 * name things differently: a page is addressed by slug, while a relation field
 * stores post ids. WordPress knows both on save, so a webhook can send either.
 *
 * **There is deliberately no global "everything" tag.** One used to be added
 * to every fetch, which meant a single webhook could invalidate the entire
 * site — and, worse, made it tempting to fire that instead of naming what
 * actually changed. /api/revalidate can still purge everything, but it does so
 * by fanning out over the list below, so the cost is explicit at the call site
 * rather than hidden on every cache entry.
 *
 * **A fetch that names its items does not carry the content-type tag.** This
 * is the rule that keeps a single edit cheap, and it is worth understanding.
 *
 * `posts?slug=my-article` depends on exactly one post, so `posts:my-article`
 * and `posts#123` are enough to invalidate it. Adding the bare `posts` tag as
 * well would mean every one of the 644 single-post cache entries went stale
 * whenever *any* post was edited — measured at ~669 upstream calls to re-warm
 * the site after one edit, of which 643 re-download posts that did not
 * change, and 644 detail pages re-rendered. Without it the same edit costs
 * ~26 calls and one re-render.
 *
 * The content-type tag therefore belongs only on a fetch whose *result set*
 * can change: an unfiltered or filtered collection read, where a new or
 * deleted item alters the answer. Those keep it automatically, because they
 * name no items.
 *
 * **This makes the item tags mandatory in the webhook.** A webhook that sends
 * only `post` will no longer refresh an individual article's page. It has to
 * send `post:<slug>` and `post#<id>` too — which is the contract documented in
 * /api/revalidate, and the reason the route spells all three out.
 */

/**
 * Canonical tag per content type.
 *
 * Keys are what services pass as `apiID` and mirror the WP `rest_base`;
 * values are the tag a WordPress webhook is expected to send. Kept as a map
 * rather than free-form strings so a typo in a service shows up here instead
 * of silently producing a tag no webhook will ever match.
 */
export const contentTags = {
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
	eventscategory: "event-category",
	eventdownload: "event-download",
	tribe_events: "webinar",
	"webinar-tag": "webinar-tag",
	tribe_events_cat: "webinar-category",
	podcast: "podcast",
	video: "video",
	"video-category": "video-category",
	whoareyou: "whoareyou",
	howwehelp: "howwehelp",
	"early-career": "early-career",
	program: "program",
	testimonial: "testimonial",
	"clients-logo": "client-logo",
	"post-speaker": "speaker",
	"post-author": "author",
	language: "language",

	// Aliases for the names the GraphQL services pass. Those predate this map
	// and use their own vocabulary — a query's purpose ("country-inside") or a
	// plural ("videos") rather than the REST endpoint. tagFor falls through to
	// the raw string for anything unmapped, so without these a fetch was tagged
	// `latestVideos` or `country-titles`: a tag no webhook will ever send, which
	// leaves the response cached until the next deploy.
	//
	// They resolve to existing values, so everyContentTag is unchanged.
	videos: "video",
	latestVideos: "video",
	"press-room": "post",
	"post-translations": "post",
	"country-regions": "country",
	"country-inside": "country",
	"country-titles": "country",
	"early-career-regions-3": "early-career",
};

/** Every distinct content tag, for the explicit purge-everything path. */
export const everyContentTag = [...new Set(Object.values(contentTags))];

/**
 * Next.js caps the tags on a single fetch at 128 (NEXT_CACHE_TAG_MAX_ITEMS in
 * next/dist/lib/constants.js; over it Next warns and silently drops the rest,
 * it does not throw). 120 leaves room for the handful a caller may add.
 *
 * This used to be 32, which was wrong in a way that mattered: a by-id batch of
 * more than 32 fell back to the collection tag, and the collection tag is only
 * sent when an item is created or deleted — so editing one of those 33 posts
 * would not have refreshed the fetch that reads them. restByIds batches at
 * maxPerPage (100), so with the cap at 120 the fallback below is now
 * unreachable in practice; it stays as a guard, and over-broad beats
 * unreachable if a caller ever hand-rolls a larger id list.
 */
const maxIdTags = 120;

/** Normalise one raw type into its canonical tag. An unmapped value passes
 *  through, which is harmless but also useless — it will never match a
 *  webhook, so add it to the map above instead.
 *  @param {string} type */
export const tagFor = (type) => contentTags[type] || type;

/** One item, addressed the way a page addresses it.
 *  @param {string} type @param {string} slug */
export const itemTag = (type, slug) => `${tagFor(type)}:${slug}`;

/** One item, addressed the way an ACF relation stores it.
 *  @param {string} type @param {number|string} id */
export const idTag = (type, id) => `${tagFor(type)}#${id}`;

/**
 * The tags for a single fetch.
 *
 * @param {object} [options]
 * @param {string} [options.apiID] content type being read, e.g. "services"
 * @param {string} [options.slug] single item being read, e.g. "advisory"
 * @param {string[]} [options.slugs] several items, for a multi-slug lookup
 * @param {Array<number|string>} [options.ids] the items a by-id fetch names
 * @param {string[]} [options.tags] extra tags, for a fetch that reads more
 *   than one collection or whose scope the apiID alone cannot express
 * @param {boolean} [options.collection] keep the content-type tag on a fetch
 *   that names items, for the rare case where its result set can still change
 * @returns {string[]}
 */
export function tagsFor({ apiID, slug, slugs, ids, tags, collection } = {}) {
	const out = new Set();

	if (apiID) {
		const base = tagFor(apiID);
		const named = (ids || []).filter(Boolean);
		const bySlug = [slug, ...(slugs || [])].filter(Boolean);
		const namesItems = bySlug.length > 0 || named.length > 0;

		// A fetch that names its items does not get the collection tag — see
		// the note above. `collection: true` forces it back on for a fetch that
		// names items *and* whose result set can still change.
		if (!namesItems || collection) out.add(base);

		for (const one of bySlug) out.add(`${base}:${one}`);
		if (named.length && named.length <= maxIdTags) {
			for (const id of named) out.add(`${base}#${id}`);
		} else if (named.length) {
			// Too many ids to tag individually, so fall back to the collection —
			// better over-broad than unreachable.
			out.add(base);
		}
	}

	for (const tag of tags || []) {
		if (tag) out.add(tag);
	}
	return [...out];
}
