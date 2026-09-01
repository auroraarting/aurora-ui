// Shared helpers for the services being ported from WPGraphQL to the wp/v2 REST
// API. Their whole job is to make a REST payload indistinguishable from the
// GraphQL one the components were written against, so nothing outside
// src/services has to change.
//
// Each rule here was found by diffing a live GraphQL response against the REST
// equivalent — none of them are cosmetic.

import RESTAPI from "../Rest.service";

// Read-only wp/v2 collections reject POST with a 401, so every call is a GET.
export const GET = { method: "GET" };

// WP caps `per_page` at 100.
export const PER_PAGE = 100;

// The query param that switches WPML's active language for a request.
export const LANG_PARAM = "wpml_language";

/** WPGraphQL returned null for a field an editor left blank; REST sends "" for
 *  empty text, `false` for an empty image/file and `null` for an empty
 *  repeater. Use on text, media and relation fields only — never on a real
 *  boolean, where `false` is a value rather than an absence. */
export const orNull = (value) =>
	value === "" || value === false || value === undefined || value === null
		? null
		: value;

const NAMED_ENTITIES = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
	nbsp: " ",
	hellip: "…",
	ndash: "–",
	mdash: "—",
	lsquo: "‘",
	rsquo: "’",
	ldquo: "“",
	rdquo: "”",
};

/** Core REST escapes post titles and term names ("US &amp; Canada") where
 *  WPGraphQL decoded them. */
export function decodeEntities(value) {
	if (typeof value !== "string" || !value.includes("&")) return value;
	return value
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
			String.fromCodePoint(parseInt(hex, 16)),
		)
		.replace(/&([a-z]+);/gi, (match, name) => {
			const replacement = NAMED_ENTITIES[name.toLowerCase()];
			return replacement === undefined ? match : replacement;
		});
}

/** `title.rendered` → the title string GraphQL returned. */
export const renderedTitle = (field) =>
	orNull(decodeEntities(field?.rendered ?? null));

/** `content.rendered` → post content as-is. Unlike titles, GraphQL kept the
 *  entities inside rendered HTML, so this one must not be decoded. */
export const renderedHtml = (field) => orNull(field?.rendered ?? null);

/** REST percent-encodes a non-ASCII slug; GraphQL returned the readable form.
 *  ASCII slugs are unchanged by this. */
export function toSlug(slug) {
	if (typeof slug !== "string") return slug;
	try {
		return decodeURIComponent(slug);
	} catch {
		return slug;
	}
}

/** A quote after whitespace, an opening bracket, or at the very start of the
 *  value is an opening quote; anything else closes, or is an apostrophe. */
const isOpeningPosition = (previous) =>
	previous === undefined || /[\s([{\u00a0]/.test(previous);

/** The quote and dash conversions WP's `wptexturize` makes inside the content
 *  filters WPGraphQL ran and REST does not, so a straight apostrophe typed by an
 *  editor comes back as `&#8217;` on both sides.
 *
 *  Text inside HTML tags is skipped, exactly as wptexturize skips it, which is
 *  what keeps the straight quotes in `<span style="font-weight: 400;">` intact.
 *  The preceding-character context carries *across* those tags, so the closing
 *  quote in `"<strong>title</strong>"` is still recognised as closing.
 *  Already-curly punctuation is left alone: only the straight forms match. */
export function wptexturize(html) {
	// Tracks the last character of real text, with tags stepped over.
	let previous;

	return String(html)
		.split(/(<[^>]*>)/)
		.map((part, index) => {
			// Odd indices are the tags themselves.
			if (index % 2 === 1) return part;

			// WP's four dash rules, in its order: em dash, spaced double hyphen,
			// bare double hyphen (skipping punycode's "xn--"), then a hyphen
			// standing alone between spaces.
			const dashed = part
				.replace(/---/g, "&#8212;")
				.replace(/(^|[\s\u00a0])--(?=$|[\s\u00a0])/g, "$1&#8212;")
				.replace(/(?<!xn)--/g, "&#8211;")
				.replace(/(^|[\s\u00a0])-(?=$|[\s\u00a0])/g, "$1&#8211;")
				.replace(/\.\.\./g, "&#8230;");

			let out = "";
			for (const character of dashed) {
				if (character === '"') {
					out += isOpeningPosition(previous) ? "&#8220;" : "&#8221;";
				} else if (character === "'") {
					out += isOpeningPosition(previous) ? "&#8216;" : "&#8217;";
				} else {
					out += character;
				}
				previous = character;
			}
			return out;
		})
		.join("");
}

// The block-level tags WP's wpautop refuses to wrap in a paragraph.
const BLOCK_TAGS =
	"(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|" +
	"li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|" +
	"section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)";

/** A port of WP's `wpautop`, which WPGraphQL applied to ACF WYSIWYG fields via
 *  the content filters and REST does not apply at all.
 *
 *  It is not enough to wrap a blank-line-separated value in `<p>`: mixed content
 *  that opens with a heading still gets its loose prose paragraphed and its
 *  single newlines turned into `<br />`, which is what the CMS's section bodies
 *  look like. The step order mirrors WP's so the output matches character for
 *  character. */
function autop(text, br = true) {
	if (String(text).trim() === "") return "";
	let out = `${text}\n`;

	out = out.replace(/<br \/>\s*<br \/>/g, "\n\n");
	out = out.replace(new RegExp(`(<${BLOCK_TAGS}[^>]*>)`, "g"), "\n$1");
	out = out.replace(new RegExp(`(<\\/${BLOCK_TAGS}>)`, "g"), "$1\n\n");
	out = out.replace(/\r\n?/g, "\n");
	out = out.replace(/\n\n+/g, "\n\n");

	out = out
		.split(/\n\s*\n/)
		.filter((paragraph) => paragraph !== "")
		.map((paragraph) => `<p>${paragraph.replace(/^\n+|\n+$/g, "")}</p>\n`)
		.join("");

	out = out.replace(/<p>\s*<\/p>/g, "");
	out = out.replace(
		/<p>([^<]+)<\/(div|address|form)>/g,
		"<p>$1</p></$2>",
	);
	out = out.replace(
		new RegExp(`<p>\\s*(<\\/?${BLOCK_TAGS}[^>]*>)\\s*<\\/p>`, "g"),
		"$1",
	);
	out = out.replace(/<p>(<li[\s\S]+?)<\/p>/g, "$1");
	out = out.replace(/<p><blockquote([^>]*)>/gi, "<blockquote$1><p>");
	out = out.replace(/<\/blockquote><\/p>/g, "</p></blockquote>");
	out = out.replace(
		new RegExp(`<p>\\s*(<\\/?${BLOCK_TAGS}[^>]*>)`, "g"),
		"$1",
	);
	out = out.replace(
		new RegExp(`(<\\/?${BLOCK_TAGS}[^>]*>)\\s*<\\/p>`, "g"),
		"$1",
	);

	if (br) {
		// Newlines inside these elements are content, not layout.
		const preserved = [];
		out = out.replace(
			/<(script|style|svg|math)[\s\S]*?<\/\1>/g,
			(match) => {
				preserved.push(match.replace(/\n/g, "<WPPreserveNewline />"));
				return `<WPPreserveBlock${preserved.length - 1} />`;
			},
		);
		out = out.replace(/(?<!<br \/>)\s*\n/g, "<br />\n");
		preserved.forEach((block, index) => {
			out = out.replace(`<WPPreserveBlock${index} />`, block);
		});
		out = out.replace(/<WPPreserveNewline \/>/g, "\n");
	}

	out = out.replace(
		new RegExp(`(<\\/?${BLOCK_TAGS}[^>]*>)\\s*<br \\/>`, "g"),
		"$1",
	);
	out = out.replace(
		/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/g,
		"$1",
	);
	out = out.replace(/\n<\/p>$/, "</p>");

	return out;
}

// Sizes wider than this are left out of a srcset — WP's `max_srcset_image_width`
// default.
const MAX_SRCSET_WIDTH = 2048;

/** `wp_constrain_dimensions`, with only a maximum width given. */
function constrainDimensions(currentWidth, currentHeight, maxWidth) {
	const ratio = maxWidth / currentWidth;
	let width = Math.round(currentWidth * ratio);
	const height = Math.round(currentHeight * ratio);
	// WP snaps a rounding error back onto the requested maximum.
	if (width !== maxWidth && Math.abs(width - maxWidth) <= 1) width = maxWidth;
	return [width, height];
}

/** `wp_image_matches_ratio` — WP keeps a candidate size only when it is the same
 *  crop as the rendered one, so a hard-cropped thumbnail never lands in a
 *  srcset. It does not compare ratios directly: it scales whichever image is
 *  larger down to the other's width and checks both dimensions land within a
 *  pixel, which tolerates the rounding in WP's own generated sizes. */
function matchesRatio(sourceWidth, sourceHeight, targetWidth, targetHeight) {
	if (!sourceWidth || !sourceHeight || !targetWidth || !targetHeight) return false;

	const [constrained, expected] =
		sourceWidth > targetWidth
			? [
					constrainDimensions(sourceWidth, sourceHeight, targetWidth),
					[targetWidth, targetHeight],
				]
			: [
					constrainDimensions(targetWidth, targetHeight, sourceWidth),
					[sourceWidth, sourceHeight],
				];

	return (
		Math.abs(constrained[0] - expected[0]) <= 1 &&
		Math.abs(constrained[1] - expected[1]) <= 1
	);
}

/** `wp_calculate_image_srcset` — the candidate list for one image, or null when
 *  the attachment offers nothing beyond the size already in use.
 *
 *  Two details matter and are easy to get wrong. The candidates are not sorted
 *  by width: WP prepends the size whose *file* the `src` points at (an iOS 8
 *  workaround) and leaves the rest in the order the attachment's metadata lists
 *  them. And the width in the markup need not be a registered size at all —
 *  an editor who resized the image in place still gets a full srcset. */
function calculateSrcset(details, src, width, height) {
	if (!details) return null;
	// WP drops any query string before matching, so a cache-busting
	// `?_t=…` on the src still identifies the size in use.
	const cleanSrc = String(src).split("?")[0];
	const srcFile = cleanSrc.split("/").pop();
	const baseUrl = cleanSrc.slice(0, cleanSrc.lastIndexOf("/") + 1);

	const sizes = [
		...Object.values(details.sizes || {}),
		// The original, appended the way wp_calculate_image_srcset appends it.
		{
			file: String(details.file || "")
				.split("/")
				.pop(),
			width: details.width,
			height: details.height,
		},
	];

	const candidates = new Map();
	let srcWidth = null;
	for (const size of sizes) {
		if (!size?.file || !size.width) continue;
		const isSrc = size.file === srcFile;
		// A size wider than the cap is dropped unless it is the one in use.
		if (size.width > MAX_SRCSET_WIDTH && !isSrc) continue;
		if (!matchesRatio(width, height, size.width, size.height)) continue;
		candidates.set(size.width, `${baseUrl}${size.file}`);
		if (isSrc) srcWidth = size.width;
	}

	// WP emits nothing when the image is the only candidate.
	if (candidates.size < 2) return null;

	const entries = [...candidates];
	const ordered =
		srcWidth === null
			? entries
			: [
					[srcWidth, candidates.get(srcWidth)],
					...entries.filter(([candidateWidth]) => candidateWidth !== srcWidth),
				];

	return ordered
		.map(([candidateWidth, url]) => `${url} ${candidateWidth}w`)
		.join(", ");
}

/** The `<img>` rewriting WP's `wp_filter_content_tags` does, which runs after
 *  wpautop in the `the_content` chain: `loading`/`decoding` on every image, plus
 *  `srcset`/`sizes` for any image whose attachment has other sizes registered.
 *
 *  `imageMedia` maps attachment id to that attachment's `media_details`; without
 *  it only the two static attributes are added, since the candidate sizes are
 *  not knowable from the markup alone. An image that already declares the
 *  attribute is left alone, as WP leaves it. */
export function wpFilterContentTags(html, imageMedia) {
	return String(html).replace(/<img\s[^>]*>/g, (tag) => {
		let out = tag;

		if (!/\ssrcset\s*=/.test(out) && imageMedia) {
			const id = Number(/wp-image-(\d+)/.exec(out)?.[1]);
			const src = /\ssrc="([^"]*)"/.exec(out)?.[1];
			const width = Number(/\swidth="(\d+)"/.exec(out)?.[1]);
			const height = Number(/\sheight="(\d+)"/.exec(out)?.[1]);
			const srcset = id && src && width && height
				? calculateSrcset(imageMedia.get(id), src, width, height)
				: null;
			if (srcset) {
				// WP appends both after the existing attributes.
				// WP 6.7+ prefixes `auto` on a lazy-loaded image's sizes.
				out = out.replace(
					/\s*\/?>$/,
					` srcset="${srcset}" sizes="auto, (max-width: ${width}px) 100vw, ${width}px" />`,
				);
			}
		}

		if (!/\sloading\s*=/.test(out)) {
			out = out.replace(/^<img\s/, '<img loading="lazy" decoding="async" ');
		}
		return out;
	});
}

/** Every attachment id an ACF WYSIWYG value embeds, so the caller can fetch
 *  their sizes before mapping. */
export function imageIdsIn(value) {
	if (typeof value !== "string") return [];
	return [...value.matchAll(/wp-image-(\d+)/g)].map((match) => Number(match[1]));
}

/** An ACF WYSIWYG value as WPGraphQL served it: texturized, paragraphed, then
 *  run through the content-tag filter, in the order WordPress's `the_content`
 *  filters run. */
export function wpautop(value, imageMedia) {
	const text = orNull(value);
	if (text === null) return null;
	return wpFilterContentTags(autop(wptexturize(String(text))), imageMedia);
}

/** GraphQL node ids are base64 of `post:<databaseId>`. Regenerated so the `id`
 *  keys components use for React lists and de-duplication stay stable. */
export const toGlobalId = (id) => Buffer.from(`post:${id}`).toString("base64");

/** ACF image/file field → the `{ node: … }` wrapper GraphQL returned. */
export function toMediaNode(field, { withMimeType = false } = {}) {
	const file = orNull(field);
	if (!file || typeof file !== "object") return null;
	const url = file.url || file.source_url || null;
	if (!url) return null;
	const node = { altText: file.alt ?? "", mediaItemUrl: url };
	if (withMimeType) node.mimeType = file.mime_type ?? null;
	return { node };
}

/** A /media row → the same `{ node: … }` wrapper, for featured images. */
export function toFeaturedImage(media) {
	if (!media?.source_url) return null;
	return {
		node: { altText: media.alt_text ?? "", mediaItemUrl: media.source_url },
	};
}

/** ACF relation / post-object field → a plain array of post ids. */
export function toIds(field) {
	const value = orNull(field);
	if (!value) return [];
	return (Array.isArray(value) ? value : [value])
		.map((item) =>
			item && typeof item === "object" ? (item.ID ?? item.id) : item,
		)
		.map((id) => Number(id))
		.filter((id) => Number.isFinite(id) && id > 0);
}

/** ACF repeater → the array GraphQL returned, or null when it holds no rows. */
export const toRows = (field) => {
	const rows = orNull(field);
	return Array.isArray(rows) && rows.length ? rows : null;
};

/** An ACF group always exists on a REST response, even when every subfield is
 *  blank, and GraphQL likewise returned an object of nulls rather than null. A
 *  group missing from `acf` altogether is null in both. */
export const group = (acf, key) =>
	key in (acf || {}) ? (acf[key] ?? {}) : null;

/** `{ nodes: [ … ] }` — GraphQL wrapped every list in a connection object. */
export const toConnection = (nodes) => ({ nodes });

/** A connection built from an ACF relation. GraphQL returned null, not an empty
 *  connection, when the editor left the relation empty. */
export const toRelation = (ids, nodes) => (ids.length ? { nodes } : null);

export const asList = (res) => (Array.isArray(res) ? res : []);

/** One REST call. RESTAPI already de-duplicates identical queries during a
 *  build, throttles concurrency and retries what Pressable drops. */
export const rest = (path, { apiID, pageID } = {}) =>
	RESTAPI(path, { ...GET, apiID, pageID });

/** One WordPress page with its ACF, by slug or by numeric id — the REST
 *  equivalent of `page(id: …, idType: URI | DATABASE_ID)`. Returns null when the
 *  page does not exist, which is what GraphQL returned too.
 *
 *  `fields` is deliberately narrow: ACF groups on these pages are small, but
 *  asking for the whole `acf` object is still cheaper than one request per group. */
export async function loadPage(idOrSlug, { apiID = "page", pageID, fields = "id,slug,title,acf" } = {}) {
	const byId = typeof idOrSlug === "number" || /^\d+$/.test(String(idOrSlug));
	const path = byId
		? `/pages/${idOrSlug}?_fields=${fields}`
		: `/pages?slug=${encodeURIComponent(idOrSlug)}&_fields=${fields}`;
	const res = await rest(path, { apiID, pageID });
	// A by-id request returns the object itself; a slug query returns a list.
	const row = byId ? res : asList(res)[0];
	return row && row.id ? row : null;
}

/** The base URL for a namespace other than the `wp/v2` one REST_API_URL points
 *  at, e.g. the `aurora/v1` routes the mu-plugins register. */
export const wpJsonNamespace = (namespace) =>
	`${String(process.env.REST_API_URL || "").replace(/\/wp\/v2\/?$/, "")}/${namespace}`;

/** One REST call against another namespace. */
export const restNamespaced = (namespace, path, { apiID, pageID } = {}) =>
	RESTAPI(path, {
		...GET,
		apiID,
		pageID,
		baseUrl: wpJsonNamespace(namespace),
	});

/** Batch-fetch posts of one type by id, keyed by id. `orderby=include` keeps
 *  the response in the order the ids were given, which is the order the editor
 *  arranged the ACF relation in. */
export async function loadByIds(
	base,
	ids,
	fields,
	{ apiID, pageID, language } = {},
) {
	const unique = [...new Set(ids)];
	if (!unique.length) return new Map();
	// `?lang=` makes WPML unregister the custom post types outright (the route
	// 404s); `?wpml_language=` switches the active language with routes intact,
	// which is the only way to read a translated post or term.
	const languageParam = language ? `&${LANG_PARAM}=${language}` : "";
	const res = await rest(
		`/${base}?include=${unique.join(",")}&orderby=include&per_page=${PER_PAGE}${languageParam}&_fields=${fields}`,
		{ apiID: apiID || base, pageID },
	);
	return new Map(asList(res).map((item) => [item.id, item]));
}

/** Every page of a collection, for the sets GraphQL asked for in full
 *  (`first: 9999`). Stops as soon as a short page comes back. */
export async function loadAll(base, params, { apiID, pageID, maxPages = 20 } = {}) {
	const items = [];
	for (let page = 1; page <= maxPages; page++) {
		const res = await rest(
			`/${base}?per_page=${PER_PAGE}&page=${page}&${params}`,
			{ apiID: apiID || base, pageID },
		);
		const rows = asList(res);
		items.push(...rows);
		if (rows.length < PER_PAGE) break;
	}
	return items;
}

/** WPGraphQL ordered terms by name and broke ties by **descending** term id;
 *  REST breaks the same ties ascending. Only equal-name runs are touched, so
 *  REST's own collation for the primary sort is preserved. */
export function orderTermsLikeGraphql(terms) {
	const ordered = [...terms];
	for (let start = 0; start < ordered.length; ) {
		let end = start + 1;
		while (end < ordered.length && ordered[end].name === ordered[start].name) {
			end++;
		}
		if (end - start > 1) {
			const run = ordered.slice(start, end).sort((a, b) => b.id - a.id);
			ordered.splice(start, end - start, ...run);
		}
		start = end;
	}
	return ordered;
}
