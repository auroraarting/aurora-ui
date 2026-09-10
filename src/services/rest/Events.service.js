import RESTAPI, { restAll, restByIds } from "../Rest.service";

import {
	getCountries,
	getPostSpeakers,
	getTestimonials,
} from "./Relations.service";
import { getPageGroup } from "./Single.service";
import {
	arr,
	decodeEntities,
	html,
	shapeAcf,
	termLookup,
	termNodes,
	text,
	translationNodes,
	urlNode,
} from "./shape";

/**
 * Events.
 *
 * `events` is the ACF field-group name WPGraphQL nested an event's fields
 * under, `eventLanding` the landing page's.
 *
 * Two relationship fields need resolving. `thumbnail.country` is a plain path,
 * so resolveRelations handles it; the speaker picker sits *inside* a repeater
 * row (`speakers.speakers[].speakers`), which a dotted path cannot reach, so
 * those are gathered across every row and resolved in one call.
 */

/** The whole field group; an event is one post, well inside the cache limit. */
const singleFields =
	"id,slug,title,content,eventscategory,featured_media,featured_image_url,acf";

/** What an event card renders. */
const listingFields =
	"id,slug,title,content,eventscategory,featured_media,featured_image_url,acf";

/** How many events to fetch per request.
 *
 *  Not the 100 cap: an event's ACF group is large, and the `<field>_source`
 *  siblings the wrapper adds for the formatted text roughly multiply it — all
 *  44 events came to 3.0 MB in one response, over the Data Cache's 2 MB
 *  per-entry limit. Next.js then serves that fetch uncached and every request
 *  re-fetches it (measured: the event detail page stayed at ~20s on repeat
 *  renders instead of dropping to ~3s). 15 a page lands near 1 MB. */
const listingPerPage = 15;

/**
 * Resolve the speaker pickers nested in the `speakers` repeater, across every
 * row of every event given.
 *
 * @param {any[]} groups shaped `events` field groups, mutated in place
 */
async function attachSpeakers(groups) {
	// Two pickers, both nested in a repeater: the speaker grid
	// (`speakers.speakers[].speakers`) and the agenda
	// (`whyAttend.agenda[].speaker`, singular). The agenda one is easy to miss
	// — it is null on the first row and populated on later ones.
	const targets = [
		...arr(groups).flatMap((group) =>
			arr(group?.speakers?.speakers).map((row) => ({ row, key: "speakers" })),
		),
		...arr(groups).flatMap((group) =>
			arr(group?.whyAttend?.agenda).map((row) => ({ row, key: "speaker" })),
		),
	].filter(({ row, key }) => row && key in row);

	const ids = [
		...new Set(targets.flatMap(({ row, key }) => arr(row[key]).map(Number))),
	].filter(Boolean);

	const byId = ids.length
		? await getPostSpeakers(ids).then(
			({ nodes }) => new Map(nodes.map((p) => [Number(p.id), p])),
		)
		: new Map();

	for (const { row, key } of targets) {
		const own = arr(row[key])
			.map((id) => byId.get(Number(id)))
			.filter(Boolean);
		row[key] = own.length ? { nodes: own } : null;
	}
}

/**
 * Resolve the eventscategory taxonomy across a set of events.
 *
 * @param {any[]} posts raw REST events
 * @returns {Promise<Array<{ nodes: any[] }>>} one connection per post
 */
async function getEventCategories(posts) {
	const ids = [
		...new Set(
			arr(posts).flatMap((post) => arr(post?.eventscategory).map(Number)),
		),
	].filter(Boolean);

	const terms = ids.length
		? await restByIds("eventscategory", ids, {
			apiID: "eventscategory",
			// Terms carry WPML translations, which the GraphQL query selected.
			fields: "id,name,slug,translations",
		})
		: [];
	const lookup = termLookup(terms);
	return arr(posts).map((post) => termNodes(post?.eventscategory, lookup));
}

/**
 * The order EventsMiddleDescription needs `sectionOrders` keys in.
 *
 * That section does `Object.entries(sectionOrders).sort((a, b) => a[1] - b[1])`
 * — and two of the values collide: `whyattend` is stored as the *string* `"3"`
 * while `speakers` is the *number* `3`, so they tie and the sort falls back to
 * insertion order. WPGraphQL returned these keys in its query's selection
 * order, which put `speakers` first; ACF returns them in field order, which
 * puts `whyattend` first. The result is a whole section rendering in the wrong
 * place, and a different branch of that component showing 16 fewer speaker
 * photographs.
 *
 * So the key order is pinned to what the GraphQL query selected. The real fix
 * is in the CMS — store `whyattend` as a number so nothing ties — after which
 * this can go.
 */
const sectionOrderKeys = [
	"glimps",
	"hightlights",
	"overview",
	"promotionalbanner",
	"speakers",
	"sponsors",
	"thumbnail",
	"whyattend",
	"sections",
];

/** Re-key `sectionOrders` into the order above, keeping any field the CMS adds
 *  later at the end. @param {any} orders */
function orderSectionOrders(orders) {
	if (!orders || typeof orders !== "object") return orders;
	const known = sectionOrderKeys.filter((key) => key in orders);
	const extra = Object.keys(orders).filter(
		(key) => !sectionOrderKeys.includes(key),
	);
	return Object.fromEntries(
		[...known, ...extra].map((key) => [key, orders[key]]),
	);
}

/** One event, before its relations are attached. @param {any} post */
const shapeEvent = (post) => ({
	title: text(post.title),
	slug: post.slug,
	content: html(post.content) || null,
	featuredImage: urlNode(post.featured_image_url),
	translations: translationNodes(post.translations),
	events: withOrderedSections(shapeAcf(post.acf || {})),
});

/** @param {any} group a shaped `events` field group */
function withOrderedSections(group) {
	if (group?.sectionOrders) {
		group.sectionOrders = orderSectionOrders(group.sectionOrders);
	}
	return group;
}

/**
 * Resolve the two ACF galleries an event can carry — the "glimpse" gallery and
 * one per sponsor row — plus the `eventdownload` terms each download row
 * points at. All batched across every event given.
 *
 * @param {any[]} groups shaped `events` field groups, mutated in place
 */
async function attachGalleriesAndDownloads(groups) {
	const list = arr(groups);

	// Galleries: `glimps.gallery` and every `sponsors.sponsors[].gallery`.
	const galleryTargets = [
		...list.filter((g) => g?.glimps && "gallery" in g.glimps).map((g) => g.glimps),
		...list.flatMap((g) =>
			arr(g?.sponsors?.sponsors).filter((row) => row && "gallery" in row),
		),
	];
	const galleryIds = [
		...new Set(galleryTargets.flatMap((t) => arr(t.gallery).map(Number))),
	].filter(Boolean);

	// `downloads[].type` is the eventdownload taxonomy, and those terms carry
	// their own ACF group (an icon) under the name WPGraphQL used.
	const downloadRows = list.flatMap((g) =>
		arr(g?.downloads).filter((row) => row && "type" in row),
	);
	const termIds = [
		...new Set(downloadRows.flatMap((row) => arr(row.type).map(Number))),
	].filter(Boolean);

	const [media, terms] = await Promise.all([
		galleryIds.length
			? restByIds("media", galleryIds, {
				apiID: "media",
				fields: "id,alt_text,source_url",
			})
			: [],
		termIds.length
			? restByIds("eventdownload", termIds, {
				apiID: "eventdownload",
				fields: "id,name,slug,acf",
			})
			: [],
	]);

	const mediaById = new Map(media.map((item) => [Number(item.id), item]));
	const termsById = new Map(
		terms.map((term) => [
			Number(term.id),
			{
				id: term.id,
				name: text(term.name),
				slug: term.slug,
				// The ACF group name WPGraphQL nested this taxonomy's fields under.
				eventDownloads: shapeAcf(term.acf || {}),
			},
		]),
	);

	for (const target of galleryTargets) {
		// A gallery is `{ nodes: [{ altText, mediaItemUrl }] }` — the attachment
		// fields sit directly on each node, unlike a single image field.
		const nodes = arr(target.gallery)
			.map((id) => mediaById.get(Number(id)))
			.filter(Boolean)
			.map((item) => ({
				altText: decodeEntities(item.alt_text || ""),
				mediaItemUrl: item.source_url,
			}));
		target.gallery = nodes.length ? { nodes } : null;
	}

	for (const row of downloadRows) {
		const nodes = arr(row.type)
			.map((id) => termsById.get(Number(id)))
			.filter(Boolean);
		row.type = nodes.length ? { nodes } : null;
	}
}

/**
 * Attach every relation a set of events carries, batched across all of them.
 * @param {any[]} events shaped events @param {any[]} posts the raw posts
 */
async function attachRelations(events, posts) {
	const groups = events.map((event) => event.events).filter(Boolean);

	const countryIds = [
		...new Set(groups.flatMap((group) => arr(group?.thumbnail?.country).map(Number))),
	].filter(Boolean);

	const [countries, categories] = await Promise.all([
		countryIds.length ? getCountries(countryIds) : { nodes: [] },
		getEventCategories(posts),
		attachSpeakers(groups),
		attachGalleriesAndDownloads(groups),
	]);

	const byId = new Map(
		arr(countries.nodes).map((country) => [Number(country.id), country]),
	);
	for (const group of groups) {
		if (!group?.thumbnail || !("country" in group.thumbnail)) continue;
		const own = arr(group.thumbnail.country)
			.map((id) => byId.get(Number(id)))
			.filter(Boolean);
		group.thumbnail.country = own.length ? { nodes: own } : null;
	}
	events.forEach((event, index) => {
		event.eventscategories = categories[index];
	});
}

/**
 * Every event, shaped as GraphQL nodes.
 * @returns {Promise<any[]>} the nodes previously read as `res.data.events.nodes`
 */
export const getAllEvents = async () => {
	const posts = await restAll(
		`event?_fields=${listingFields}&per_page=${listingPerPage}`,
		{ apiID: "event" },
	);
	if (!posts.length) return [];
	const events = posts.map(shapeEvent);
	await attachRelations(events, posts);
	return events;
};

/**
 * One event, with every relation resolved.
 * @param {string} slug
 * @returns {Promise<any|null>}
 */
export const getEventsInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`event?slug=${encodeURIComponent(clean)}&_fields=${singleFields}`,
		{ apiID: "event", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const event = shapeEvent(post);
	await attachRelations([event], [post]);
	return event;
};

/**
 * Events by id, shaped like the listing — for the landing page's `featured`
 * picker, which holds event posts rather than plain posts.
 *
 * @param {Array<number>} ids
 */
async function getFeaturedEvents(ids) {
	const posts = await restByIds("event", ids, {
		apiID: "event",
		fields: listingFields,
	});
	if (!posts.length) return null;
	const events = posts.map(shapeEvent);
	await attachRelations(events, posts);
	return { nodes: events };
}

/**
 * The events landing content.
 * @returns {Promise<any|null>} previously `res.data.page.eventLanding`
 */
export const getEventLandingPage = () =>
	getPageGroup("event-landing", {
		relations: {
			featured: getFeaturedEvents,
			"audienceSpeak.testimonials": getTestimonials,
			"speakers.speakers": getPostSpeakers,
		},
	});

/**
 * The eventscategory terms, for the listing filters.
 * @returns {Promise<any[]>} previously `res.data.eventscategories.nodes`
 */
export const getAllEventCategories = async () => {
	const terms = await restAll("eventscategory?_fields=id,name,slug", {
		apiID: "eventscategory",
	});
	return terms.map((term) => ({
		id: term.id,
		name: text(term.name),
		slug: term.slug,
	}));
};

export { getFilterOptions } from "./FilterOptions.service";
