// Cache tags for on-demand revalidation.
//
// Every call into GraphQLAPI / RESTAPI carries a `tag` alongside the older
// `apiID`. `apiID` is left exactly as it was — it named the Redis bucket the
// retired cache layer wrote to and several of its values are page-specific
// rather than content-specific ("previousVideos", "country-regions",
// "early-career-regions-3"), so it is not usable as a revalidation key.
//
// `tag` is that key: what a fetch would have to be told about for its cached
// response to be stale. Time-based revalidation still runs underneath (see
// `revalidateFor` in Graphql.service.js), so a missed tag means slow, not wrong.
//
// Vocabulary — one canonical name per thing WordPress can save:
//
//   Post types   page, post, event, software, product, service, podcast,
//                webinar, video, press, region, country, office, team,
//                team-sector, testimonial, how-we-help, who-are-you,
//                early-career, program, language, media, clients-logo,
//                post-author, post-speaker, eventdownload
//   Taxonomies   category, post-tag, event-category (eventscategory, on
//                events), webinar-category (tribe_events_cat, on webinars),
//                webinar-tag, eventdownload, region, program, team-sector,
//                section-tag, tab-column, video-category, video-tag
//   Site-wide    seo (Yoast metadata, whatever entry it hangs off)
//
// A query that reads one specific entry is tagged `<type>:<slug>`
// (`page:about`, `software:chronos`) so saving that entry does not revalidate
// every other page of the same type. A listing is tagged with the bare type, so
// saving any entry of it does revalidate the listing. A query spanning several
// types carries an array — the WordPress side revalidates the bare type plus
// the entry tag on save, and both kinds of consumer are covered.
//
// A query is tagged for everything it *reads*, not just its root field. The
// About page selects the page plus its leadership (team), their posts and
// categories, the client logos and the testimonials — so it carries all seven
// tags. Miss one and editing a testimonial leaves the About page showing the
// old text until the TTL expires.
//
// The signal for this is the query text: root fields, taxonomy connections
// (`categories(first:)`, `tags(first:)`) and every `... on Type` inline
// fragment, which is how ACF relations resolve. Beware the ACF groups that
// share a name with a post type — `testimonials { designation }` on a
// Testimonial post, `videos { videoType }` on a Software, `tags { text }` on a
// press release, `categories { categorytext }` on the FAQ page. Those are the
// entry's own fields, not relations, and they must not add a tag.
//
// The cost of a wide tag is fan-out. Of the ~85 GraphQL call sites, `country`
// is on 32, `software` 27, `product` 26, `service` 25, `testimonial` 22,
// `post` 18, `clients-logo` 15 — so one testimonial edit invalidates the
// homepage, About, EOS, every software, product, service, how-we-help,
// who-are-you, insight and country page. That is correct, those pages do render
// it, but it is the number to look at before widening a tag further, and the
// reason the hot types are the ones worth pruning first if revalidation
// traffic becomes a problem.

/** Added to every fetch, so /api/revalidate can flush everything at once. */
export const GLOBAL_TAG = "alldata";

/** Normalise a `tag` (string, array, or absent) to the list Next.js wants.
 *  @param {string|string[]|undefined|null} tag
 *  @returns {string[]} */
export function toCacheTags(tag) {
	const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];
	return [...new Set([...tags.filter(Boolean), GLOBAL_TAG])];
}

/** Tag for one specific entry: `entryTag("page", "about")` -> "page:about".
 *  Slugs arrive URL-encoded from route params; the tag uses the decoded form so
 *  it matches what WordPress knows the slug as.
 *  @param {string} type @param {string} slug */
export function entryTag(type, slug) {
	let decoded = slug;
	try {
		decoded = decodeURIComponent(slug);
	} catch {
		// Malformed escape sequence — the raw slug still makes a usable tag.
	}
	return `${type}:${decoded}`;
}

/** REST base (WP's plural route segment) -> the canonical tag above. Bases that
 *  already match the vocabulary are absent and fall through unchanged. */
const TAG_BY_REST_BASE = {
	pages: "page",
	posts: "post",
	categories: "category",
	tags: "post-tag",
	softwares: "software",
	products: "product",
	services: "service",
	events: "event",
	podcasts: "podcast",
	webinars: "webinar",
	videos: "video",
	presses: "press",
	offices: "office",
	teams: "team",
	teamsectors: "team-sector",
	testimonials: "testimonial",
	"post-author": "post-author",
	"post-speaker": "post-speaker",
	"clients-logo": "clients-logo",
};

/** The tag a REST collection maps to. @param {string} base */
export const restTag = (base) => TAG_BY_REST_BASE[base] || base;

/** WordPress slug -> canonical tag, for the revalidation webhook.
 *
 *  The keys are the exact strings a webhook sends as `post.post_type` (or the
 *  taxonomy name), read out of the CMS's own registry rather than guessed:
 *
 *      curl $API_URL -H "Authorization: Bearer $AUTH_TOKEN" \
 *        -d '{"query":"{contentTypes(first:100){nodes{name}} \
 *                       taxonomies(first:100){nodes{name}}}"}'
 *
 *  Note the ones that do not read the way you would expect: webinars are
 *  `tribe_events`, offices/products/services/softwares are plural while
 *  country/team/testimonial/video are singular, and events and webinars have
 *  *different* category taxonomies (`eventscategory` vs `tribe_events_cat`). */
const TAG_BY_CONTENT_TYPE = {
	// Post types
	page: "page",
	post: "post",
	event: "event",
	softwares: "software",
	products: "product",
	services: "service",
	podcast: "podcast",
	tribe_events: "webinar",
	video: "video",
	country: "country",
	offices: "office",
	team: "team",
	testimonial: "testimonial",
	"clients-logo": "clients-logo",
	howwehelp: "how-we-help",
	whoareyou: "who-are-you",
	"early-career": "early-career",
	"post-author": "post-author",
	"post-speaker": "post-speaker",
	attachment: "media",
	// Press releases are not registered on cms-staging, so this slug could not
	// be read from the registry the way the others were — it is the value the
	// retired `apiID` used. Confirm it with the first webhook from production:
	// an unknown type answers 400 and names what it received.
	"press-room": "press",
	press: "press",
	// Taxonomies
	category: "category",
	post_tag: "post-tag",
	eventscategory: "event-category",
	tribe_events_cat: "webinar-category",
	"webinar-tag": "webinar-tag",
	eventdownload: "eventdownload",
	region: "region",
	program: "program",
	teamsector: "team-sector",
	"section-tag": "section-tag",
	"tab-column": "tab-column",
	"video-category": "video-category",
	"video-tag": "video-tag",
};

/** Types the CMS can save that no page reads — form submissions, editor
 *  internals, WPML plumbing. A webhook for one of these is answered politely
 *  and does nothing, rather than raising the alarm an unknown type raises. */
const IGNORED_CONTENT_TYPES = new Set([
	"contactlead",
	"feedback",
	"press-room-subscript",
	"jetpack_form",
	"jp_act_log_event",
	"jp_pay_order",
	"jp_pay_product",
	"nav_menu_item",
	"revision",
	"post_format",
	"wp_block",
	"wp_font_face",
	"wp_font_family",
	"wp_global_styles",
	"wp_navigation",
	"wp_template",
	"wp_template_part",
]);

/** The tag a CMS post type or taxonomy maps to, or null when unmapped.
 *  @param {string} slug */
export const contentTypeTag = (slug) => TAG_BY_CONTENT_TYPE[slug] || null;

/** Whether a slug is one the site deliberately ignores. @param {string} slug */
export const isIgnoredContentType = (slug) => IGNORED_CONTENT_TYPES.has(slug);

/** Every tag a save of `slug` should flush: the bare type, so listings rebuild,
 *  plus the entry's own tag(s), so its detail page rebuilds. Both the slug and
 *  the database id are emitted where available — most page queries select by
 *  URI, but a couple select by DATABASE_ID.
 *  @param {string} slug @param {{ name?: string, id?: number|string }} [entry]
 *  @returns {string[]} */
export function tagsForContentType(slug, entry = {}) {
	const tag = contentTypeTag(slug);
	if (!tag) return [];
	const tags = [tag];
	if (entry.name) tags.push(entryTag(tag, String(entry.name)));
	if (entry.id) tags.push(`${tag}:${entry.id}`);
	return tags;
}
