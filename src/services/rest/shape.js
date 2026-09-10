/**
 * Reshapes WordPress REST responses into the structure the pages and sections
 * already consume.
 *
 * The components were written against WPGraphQL, and the two APIs disagree in
 * four systematic ways. Rather than rewrite every section, the differences are
 * normalised once, here:
 *
 *  1. Field naming. ACF exposes snake_case over REST ("short_description");
 *     WPGraphQL exposed camelCase ("shortDescription"). Keys are camelised
 *     recursively. WPGraphQL occasionally renamed a field beyond simple
 *     camel-casing, so `rename` handles those by hand.
 *
 *  2. Images. ACF returns the whole attachment row over REST, and literal
 *     `false` when the field is empty. WPGraphQL returned
 *     `{ node: { altText, mediaItemUrl } }` and `null`. Attachments are
 *     detected and rewrapped.
 *
 *  3. Lists. WPGraphQL wrapped every connection in `{ nodes: [...] }`.
 *
 *  4. Entity encoding. REST returns titles as stored — "Let&#8217;s" — while
 *     WPGraphQL decoded them, so REST text goes through the site unrendered as
 *     "Let&#8217;s". Titles are decoded; `content` is deliberately left alone,
 *     because it is HTML and is handed to html-react-parser.
 *
 * Deliberately dependency-free, so it can be exercised outside Next.js.
 */

/** Named entities WordPress actually emits. Numeric ones are handled
 *  generically below, which covers the long tail. */
const namedEntities = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\u0022",
	apos: "'",
	nbsp: " ",
	hellip: "…",
	mdash: "—",
	ndash: "–",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”",
	bull: "•",
	middot: "·",
	deg: "°",
	eacute: "é",
	egrave: "è",
	uuml: "ü",
	ouml: "ö",
	auml: "ä",
	szlig: "ß",
	copy: "©",
	reg: "®",
	trade: "™",
	euro: "€",
	pound: "£",
	times: "×",
};

/**
 * Decode HTML entities, matching what WPGraphQL returned for plain-text
 * fields. `&amp;` is resolved last so `&amp;#8217;` (double-encoded, which
 * does occur in the CMS) collapses correctly rather than leaving a stray `#`.
 *
 * @param {string} value
 * @returns {string}
 */
export function decodeEntities(value) {
	if (typeof value !== "string" || !value.includes("&")) return value;
	return value
		.replace(/&#[xX]([0-9a-fA-F]+);/g, (_, hex) =>
			String.fromCodePoint(Number.parseInt(hex, 16)),
		)
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (match, name) => {
			const key = name.toLowerCase();
			return key === "amp" ? match : (namedEntities[key] ?? match);
		})
		.replace(/&amp;/g, "&");
}

/** Unwrap `{ rendered }`, or pass a plain string through. */
const unwrap = (value) =>
	value && typeof value === "object" && "rendered" in value
		? value.rendered
		: value;

/**
 * The unfiltered value of a `{ raw, rendered }` field, which REST returns only
 * under `context=edit`. This is what `content(format: RAW)` gave over GraphQL.
 * Falls back to the rendered form so a request without edit context still
 * produces something.
 *
 * @param {any} value
 * @returns {string}
 */
export function raw(value) {
	if (value && typeof value === "object" && typeof value.raw === "string") {
		return value.raw;
	}
	const rendered = unwrap(value);
	return typeof rendered === "string" ? rendered : "";
}

/**
 * A plain-text field — post titles, term names. Entity-decoded.
 * @param {any} value
 * @returns {string}
 */
export function text(value) {
	const raw = unwrap(value);
	return typeof raw === "string" ? decodeEntities(raw) : "";
}

/**
 * An HTML field — post content, excerpts. Left encoded, because the markup is
 * parsed downstream and decoding would corrupt it.
 * @param {any} value
 * @returns {string}
 */
export function html(value) {
	const raw = unwrap(value);
	return typeof raw === "string" ? raw : "";
}

/** ACF returns `false` (image), `null` or `""` (repeater) for "not set".
 *  @param {any} value */
const isEmptyAcf = (value) =>
	value === false || value === null || value === undefined || value === "";

/**
 * Always an array. ACF gives `false`/`null` for an empty repeater, which
 * breaks a bare `.map()`.
 * @param {any} value
 * @returns {any[]}
 */
export const arr = (value) =>
	Array.isArray(value) ? value : isEmptyAcf(value) ? [] : [value];

/**
 * Wrap a list the way WPGraphQL did.
 * @param {any} value
 * @returns {{ nodes: any[] }}
 */
export const nodes = (value) => ({ nodes: arr(value) });

/** Does this object look like an ACF-expanded attachment row?
 *  @param {any} value */
function isAttachment(value) {
	return (
		!!value &&
		typeof value === "object" &&
		!Array.isArray(value) &&
		typeof value.url === "string" &&
		("ID" in value || "id" in value) &&
		("filename" in value || "mime_type" in value)
	);
}

/**
 * The same shape from a bare URL — for `featured_image_url`, which REST
 * registers as a string rather than an attachment row.
 *
 * `altText` defaults to empty because that is what WPGraphQL returned:
 * `featured_image_url` carries no alt text, and the attachment's own alt is
 * empty across the logos and thumbnails checked. Filling it with the post
 * title instead would read better, but it is a content change nobody asked
 * for — the real alt would need a /media call per attachment.
 *
 * @param {string|null|undefined} url
 * @param {string} [altText]
 * @returns {{ node: { altText: string, mediaItemUrl: string } } | null}
 */
export function urlNode(url, altText = "") {
	if (!url || typeof url !== "string") return null;
	return { node: { altText: decodeEntities(altText), mediaItemUrl: url } };
}

/**
 * An attachment in the shape the components read: `image?.node?.mediaItemUrl`.
 * Returns null (not `false`) when unset, so optional chaining behaves as it
 * did under GraphQL.
 *
 * A bare URL string is accepted as well. Not every image field in this CMS
 * holds an attachment row — `eos_ai.logo` is stored as a plain URL — and there
 * is no field metadata to tell an image URL from a link URL (that field has no
 * `_source` sibling), so shapeAcf cannot spot it. Callers that know a field is
 * an image pass its value here explicitly.
 *
 * @param {any} value ACF image/file value, or a URL string
 * @returns {{ node: { altText: string, mediaItemUrl: string, title: string, caption: string, mimeType: string } } | null}
 */
export function mediaNode(value) {
	if (typeof value === "string") return urlNode(value);
	if (!isAttachment(value)) return null;
	return {
		node: {
			altText: decodeEntities(value.alt || ""),
			mediaItemUrl: value.url,
			title: decodeEntities(value.title || ""),
			caption: value.caption || "",
			mimeType: value.mime_type || "",
			// WPGraphQL's mediaItem carries WPML translations, and some queries
			// select them. ACF's attachment row over REST has no such field, and
			// the real value would cost a /media call per image — but it is empty
			// for every attachment in this CMS (0 of the first 100) and GraphQL
			// returns `[]` for the ones checked, so the empty array is faithful.
			// Revisit if media ever gets translated.
			translations: [],
		},
	};
}

/**
 * An ACF field name as WPGraphQL exposed it.
 *
 * Not just snake_case: field names in this CMS contain spaces and ampersands
 * ("ongoing valuation", "financing_&M&a", "strategy &Planning"), and WPGraphQL
 * normalised those by dropping every non-alphanumeric run and capitalising the
 * segment that follows — giving `ongoingValuation`, `financingMA`,
 * `strategyPlanning`, which is what the sections read. Handling only `_` and
 * `-` leaves those fields under names nothing looks up, and the value silently
 * renders as empty.
 *
 * Segments keep their own capitalisation ("portfolioManagement &Ppas" →
 * "portfolioManagementPpas"), keys with nothing to normalise are returned
 * untouched (so image sizes like `1536x1536` survive), and WordPress meta keys
 * beginning with an underscore are left alone.
 *
 * @param {string} key
 * @returns {string}
 */
export function camelKey(key) {
	if (typeof key !== "string" || !key) return key;
	if (key.startsWith("_")) return key;
	if (!/[^A-Za-z0-9]/.test(key)) return key;

	const parts = key.split(/[^A-Za-z0-9]+/).filter(Boolean);
	if (!parts.length) return key;
	return parts
		.map((part, index) =>
			index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
		)
		.join("");
}

/**
 * ACF keys whose WPGraphQL name is not what {@link camelKey} produces.
 *
 * Applied to every payload by default, so no service has to remember them.
 * The list is deliberately tiny and was not guessed: camel-casing every ACF
 * key exposed by every post type (207 distinct names) and checking each
 * against the names the sections actually read left exactly these two
 * unmatched, plus two genuinely unused CMS fields.
 *
 *  - `4_step_process`: GraphQL cannot start a field name with a digit, so
 *    WPGraphQL spelled the number out.
 *  - `our_clients`: only the services post type names the group in the plural;
 *    every other type uses `our_client`, which camel-cases to the same thing.
 */
export const acfFieldNames = {
	"4_step_process": "fourStepProcess",
	our_clients: "ourClient",
};

/**
 * The name for an ACF field whose own name is blank.
 *
 * At least one group in this CMS was saved without a field name — the insights
 * group on how-we-help — so REST returns it keyed by the empty string. Nothing
 * can read `acf[""]`, and WPGraphQL exposed it as `insights`, having fallen
 * back to the field's label. That label is available over REST too, on the
 * `<field>_source` sibling ACF adds alongside every field, so the same
 * fallback is applied here.
 *
 * @param {any} parent the object the field lives on
 * @param {string} key the field's (blank) key
 * @returns {string|null}
 */
function labelName(parent, key) {
	const label = parent?.[`${key}_source`]?.label;
	if (typeof label !== "string" || !label.trim()) return null;
	const camel = camelKey(label.trim());
	return camel.charAt(0).toLowerCase() + camel.slice(1);
}

/**
 * ACF `true_false` fields nested inside a group or repeater.
 *
 * `false` means two different things in an ACF payload: an unset image, which
 * WPGraphQL returned as null, and a genuine "no" on a true/false field, which
 * it returned as `false`. The two are told apart by the field's type, which
 * ACF publishes on the `<field>_source` sibling — but only for top-level
 * fields, since a group's sibling carries values and no per-field types.
 *
 * So nested true/false fields are listed here by their **raw REST key**
 * (snake_case, as ACF returns it) — not the camel-cased name the sections
 * read. All current entries
 * were found by the parity checks (npm run rest:parity) rather than guessed,
 * and both are only read for truthiness today, so the distinction is about
 * staying faithful rather than fixing a visible bug.
 */
export const acfBooleanFields = new Set([
	"islive",
	"open_external_in_new_tab",
]);

/** How ACF stores its two date fields, and how it formats either for display.
 *  A date picker holds `Ymd` (`20251220`); a date-time picker holds
 *  `Y-m-d H:i:s` (`2026-09-17 11:00:00`). Both display as `d/m/Y`, optionally
 *  with a time. WPGraphQL returned ISO 8601 for both. */
const acfStoredDate = /^(\d{4})(\d{2})(\d{2})$/;
const acfStoredDateTime =
	/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
const acfDisplayDate = /^\d{1,2}\/\d{1,2}\/\d{4}/;

/**
 * An ACF date value as WPGraphQL returned it, or null if this is not one.
 *
 * The field type settles it where ACF publishes one, which it does for
 * top-level fields. Inside a repeater there is no type, so the fallback is the
 * pair: a raw value in one of ACF's two storage formats *and* a slash-
 * formatted counterpart. Neither half alone is safe — plenty of fields hold
 * eight digits, and plenty hold slashes.
 *
 * This matters more than it looks. Both values reach the page through
 * `new Date(...)`: the careers popup renders `20/12/2025` as **"Invalid
 * Date"**, and `2026-09-17 11:00:00` parses as *local* time where the ISO form
 * is UTC, which shifts webinar times and their sort order.
 *
 * @param {string} raw the value on the `acf` key
 * @param {any} formatted its counterpart on the `_source` mirror
 * @param {string} [type] the ACF field type, when known
 * @returns {string|null}
 */
function isoDate(raw, formatted, type) {
	const looksFormatted =
		typeof formatted === "string" && acfDisplayDate.test(formatted);

	const dateTime = acfStoredDateTime.exec(raw);
	if (dateTime && (type === "date_time_picker" || looksFormatted)) {
		const [, y, m, d, hh, mm, ss] = dateTime;
		return `${y}-${m}-${d}T${hh}:${mm}:${ss}+00:00`;
	}

	const date = acfStoredDate.exec(raw);
	if (date && (type === "date_picker" || looksFormatted)) {
		return `${date[1]}-${date[2]}-${date[3]}T00:00:00+00:00`;
	}
	return null;
}

/**
 * Recursively normalise an ACF payload into the WPGraphQL shape.
 *
 * Attachments become `{ node }`, keys are camelised, and `false` collapses to
 * null so an unset image reads as absent rather than as the boolean it
 * literally is.
 *
 * **Text comes from ACF's `<field>_source.formatted_value`, not the raw key.**
 * WordPress runs its content filters on the way out — `wptexturize` turning
 * `Aurora's` into `Aurora&#8217;s`, `wpautop` wrapping a WYSIWYG value in
 * `<p>…</p>\n` — and WPGraphQL inherited them while the plain `acf` key does
 * not. Rather than reimplement those filters, the formatted mirror ACF already
 * publishes alongside every field is used for string values, which reproduces
 * WPGraphQL's output exactly. It is only trusted for strings: for images the
 * formatted value is a bare URL, losing the id, alt text and sizes the raw
 * attachment row carries.
 *
 * Relationship and post-object fields stay as the bare ID arrays REST returns
 * — they cannot be expanded without another request, so the services resolve
 * them explicitly (see restByIds).
 *
 * @param {any} value
 * @param {object} [options]
 * @param {Record<string,string>} [options.rename] extra REST key to component
 *   name mappings, merged over {@link acfFieldNames}
 * @param {any} [options.formatted] the parallel formatted tree, threaded
 *   through the recursion; callers do not pass this
 * @returns {any}
 */
export function shapeAcf(value, options = {}) {
	const rename = options.rename
		? { ...acfFieldNames, ...options.rename }
		: acfFieldNames;
	const formatted = options.formatted;

	// Recurse with the merged map, not the caller's options, so the defaults
	// are not re-merged at every level.
	const nested = { rename };

	if (Array.isArray(value)) {
		// A repeater's formatted mirror is an array of formatted rows, matched
		// by position.
		return value.map((item, index) =>
			shapeAcf(item, {
				...nested,
				formatted: Array.isArray(formatted) ? formatted[index] : undefined,
			}),
		);
	}
	if (!value || typeof value !== "object") {
		// Every falsy ACF value became null over GraphQL: `false` for an unset
		// image or group, `""` for an unset text field, and `0` for an unset
		// number or numeric select — the bundles comparison columns store 0 for
		// "not included" and WPGraphQL returned null for them. The sections were
		// written against null and already guard for it, so collapsing them keeps
		// REST faithful to the shape they expect. Non-empty strings, non-zero
		// numbers and `true` pass through untouched; a genuine `false` on a
		// true/false field is handled before this point.
		return value === false || value === "" || value === 0 ? null : value;
	}
	if (isAttachment(value)) return mediaNode(value);

	// Where the formatted counterparts for this level come from: the parallel
	// tree if we are inside one, otherwise each key's own `_source` sibling.
	const isTree = !!formatted && typeof formatted === "object";

	const out = {};
	for (const [key, val] of Object.entries(value)) {
		if (key.endsWith("_source")) continue; // ACF field metadata, not content
		const name = rename[key] || camelKey(key) || labelName(value, key);
		if (!name) continue; // no usable name — nothing could read it anyway

		const meta = isTree ? undefined : value[`${key}_source`];
		const fmt = isTree ? formatted[key] : meta?.formatted_value;

		// An image or file field is sometimes stored as a bare URL rather than
		// an attachment row (the video thumbnails are), and a string would
		// never satisfy `image?.node?.mediaItemUrl`. ACF names the field's type
		// on its `_source` sibling, so where that is available the wrapping is
		// automatic; nested fields have no type and need their service to call
		// mediaNode explicitly (see Eos.service.js).
		if (
			typeof val === "string" &&
			(meta?.type === "image" || meta?.type === "file")
		) {
			out[name] = mediaNode(val);
			continue;
		}

		// A date picker is the one field whose formatted value is the wrong
		// shape for the components — see isoDate.
		if (typeof val === "string") {
			const iso = isoDate(val, fmt, meta?.type);
			if (iso) {
				out[name] = iso;
				continue;
			}
		}

		// Only strings are taken from the formatted mirror — see the note above.
		if (typeof val === "string" && typeof fmt === "string") {
			out[name] = fmt === "" ? null : fmt;
			continue;
		}

		// A true/false field keeps its boolean; only an unset image collapses
		// to null. See acfBooleanFields.
		if (
			typeof val === "boolean" &&
			(meta?.type === "true_false" || acfBooleanFields.has(key))
		) {
			out[name] = val;
			continue;
		}
		out[name] = shapeAcf(val, { ...nested, formatted: fmt });
	}
	return out;
}

/**
 * WPML translations in the shape the components read.
 *
 * REST nests the language details in a `language` object
 * (`{ id, language: { code, native_name, … }, name, slug }`), while WPGraphQL
 * flattened the one field anything uses to `languageCode`. Values match
 * exactly — both are lowercase, "ja" and "pt-br" — so the code is lifted onto
 * each entry and the rest of the REST payload is left in place.
 *
 * Insights.js filters posts on `item.translations`, so this is load-bearing on
 * the insight listings, not decoration.
 *
 * @param {any} value REST `translations` array
 * @returns {any[]}
 */
export function translationNodes(value) {
	return arr(value).map((entry) => {
		if (!entry || typeof entry !== "object") return entry;
		const language = entry.language || {};
		return {
			...entry,
			...(entry.name === undefined ? {} : { name: text(entry.name) }),
			languageCode:
				language.code || language.language_code || entry.language_code || null,
		};
	});
}

/**
 * Shape one field of an ACF payload, keeping its formatted counterpart.
 *
 * Use this instead of `shapeAcf(acf.someGroup)` whenever you shape part of a
 * payload rather than the whole thing. The formatted mirror lives on the
 * *parent* as `<key>_source`, so passing the sub-object alone loses it, and
 * text comes back raw — unwrapped and with straight quotes. Passing the parent
 * and the key keeps them together.
 *
 * @param {any} parent the ACF object the field lives on
 * @param {string} key the field name, in its REST (snake_case) form
 * @param {object} [options] passed through to {@link shapeAcf}
 * @returns {any}
 */
export function shapeAcfField(parent, key, options = {}) {
	return shapeAcf(parent?.[key], {
		...options,
		formatted: parent?.[`${key}_source`]?.formatted_value,
	});
}

/**
 * Terms in the `{ nodes: [{ name, slug }] }` shape, resolved from the term IDs
 * a REST post carries against a lookup built once per request.
 *
 * @param {number[]} ids term IDs from the post
 * @param {Map<number, {name: string, slug: string, id: number}>} lookup
 * @returns {{ nodes: Array<{id: number, name: string, slug: string}> }}
 */
export function termNodes(ids, lookup) {
	if (!lookup) return { nodes: [] };
	const resolved = arr(ids)
		.map((id) => lookup.get(Number(id)))
		.filter(Boolean);

	// WPGraphQL returns a post's terms ordered by name, where REST returns them
	// in the order the post stores them. Ties break by *descending* id — this
	// CMS has two categories called "NORAM" and two called "Alberta", and
	// without the tie-break they come back swapped.
	resolved.sort((a, b) => {
		const byName = String(a?.name ?? "").localeCompare(String(b?.name ?? ""));
		return byName !== 0 ? byName : Number(b?.id ?? 0) - Number(a?.id ?? 0);
	});
	return { nodes: resolved };
}

/**
 * Build the term lookup {@link termNodes} needs.
 * @param {any[]} terms REST term objects
 * @returns {Map<number, {id: number, name: string, slug: string}>}
 */
export function termLookup(terms) {
	return new Map(
		arr(terms).map((term) => [
			Number(term.id),
			{
				id: term.id,
				name: text(term.name),
				slug: term.slug,
				// Present on terms as well as posts — see the note in postNode.
				...("translations" in term
					? { translations: translationNodes(term.translations) }
					: {}),
			},
		]),
	);
}

/**
 * The fields every post-like node shares, in the GraphQL shape.
 *
 * ACF fields land under `group`, because WPGraphQL nested a post type's fields
 * under its field-group name (`postFields` for posts, `services` for the
 * services CPT) while REST exposes them flat on `acf`. The sections read the
 * grouped path, so the container is rebuilt here.
 *
 * @param {any} post REST post object
 * @param {object} [options]
 * @param {Map<number, any>} [options.categories] lookup for `categories`
 * @param {Map<number, any>} [options.tags] lookup for `tags`
 * @param {Record<string,string>} [options.rename] passed to {@link shapeAcf}
 * @param {string} [options.group] ACF container key, default "postFields"
 * @returns {any}
 */
export function postNode(post, options = {}) {
	if (!post) return null;
	const { categories, tags, rename, group = "postFields" } = options;
	const shaped = {
		id: post.id,
		databaseId: post.id,
		slug: post.slug,
		title: text(post.title),
		date: post.date,
		modified: post.modified,
		link: post.link,
		status: post.status,
		featuredImage: urlNode(post.featured_image_url),
	};
	// `content`/`excerpt` were null over GraphQL when the post had none, and
	// REST returns "" — matched here so a section testing truthiness, or
	// handing the value to a parser, behaves as it does today.
	if ("content" in post) shaped.content = html(post.content) || null;
	if ("excerpt" in post) shaped.excerpt = html(post.excerpt) || null;
	// WPML translations. REST publishes this field on posts and terms alike, so
	// it passes straight through. Every post on production currently has none,
	// so the empty case is verified and the populated one is not.
	if ("translations" in post) {
		shaped.translations = translationNodes(post.translations);
	}
	if (categories) shaped.categories = termNodes(post.categories, categories);
	if (tags) shaped.tags = termNodes(post.tags, tags);
	if (post.acf && typeof post.acf === "object" && !Array.isArray(post.acf)) {
		shaped[group] = shapeAcf(post.acf, { rename });
	}
	return shaped;
}

/**
 * Yoast's REST payload in the shape the `seo` GraphQL field had.
 * @param {any} post REST post carrying yoast_head_json
 * @returns {{ title: string, metaDesc: string, metaKeywords: string }}
 */
export function seoFrom(post) {
	const yoast = post?.yoast_head_json || {};
	return {
		title: decodeEntities(yoast.title || text(post?.title) || ""),
		metaDesc: decodeEntities(yoast.description || ""),
		metaKeywords: decodeEntities(
			yoast.keywords || yoast.meta_keywords || "",
		),
	};
}
