// Real Performance methodologies — Aurora Methodologies API (Strapi v5).
//
// The Real Performance tab's methodology used to come from the Battery
// Benchmarks page in WordPress (the `realPMethodology_v2` ACF repeater, still
// normalised in BatteryBenchmarkPage.service.js). It now comes from this API
// instead: one published document per market, authored in the Aurora CMS.
// The Backcast tab is untouched and still reads ACF.
//
// The output shape here is exactly what MethodologyPanelV2 already consumes —
// one row per region, each carrying a nested `sections` outline — so the panel
// itself needed no changes and the ACF field remains a working fallback.
//
// Docs: methodolofy.md at the repo root.

import { REGION_LABELS } from "@/sections/battery-benchmark/benchmarkData";

const BASE_URL =
	process.env.METHODOLOGY_API_URL ||
	"https://cms.service.auroraer.com/api/methodologies";

// Every Real Performance methodology is filed under this product in the CMS.
// If Flexplorer ever gains a methodology that is *not* Real Performance, this
// filter is the thing to narrow — there is no other field on the document that
// distinguishes them.
const PRODUCT = "Flexplorer";

// Media in these payloads is served by pre-signed URLs that expire one hour
// after the response is generated, so a cached response must not outlive them.
// Thirty minutes keeps every URL well inside its hour while still meaning the
// API is hit twice an hour rather than per page view.
//
// Timed rather than tag-flushed on purpose: like the Flexplorer API in
// BatteryBenchmark.service.js this is not WordPress, so no CMS webhook reaches
// /api/revalidate for it and a cache tag would never be invalidated. The tag is
// carried anyway so the endpoint can be flushed by hand after an urgent edit.
const REFRESH_INTERVAL = 1800; // 30 minutes
export const METHODOLOGY_TAG = "methodology";

const requestTimeoutMs = 20000;

/** Populate the whole document in one call. Chapters and their blocks are not
 *  returned at all unless asked for, and each block type has to be named
 *  separately because `blocks` is a dynamic zone. */
const POPULATE = {
	"populate[product]": "true",
	"populate[chapters][populate][regions]": "true",
	"populate[chapters][populate][blocks][on][shared.text-block][populate]": "*",
	"populate[chapters][populate][blocks][on][shared.image-block][populate]": "*",
	"populate[chapters][populate][blocks][on][shared.image-text-block][populate]":
		"*",
	"populate[chapters][populate][blocks][on][shared.table-block][populate]": "*",
	"populate[chapters][populate][blocks][on][shared.video-block][populate]": "*",
	"populate[chapters][populate][blocks][on][shared.cta-block][populate]": "*",
	"populate[chapters][populate][blocks][on][chart.chart-editor-block][populate]":
		"*",
	"populate[chapters][populate][blocks][on][shared.accordion-block][populate][items][populate][body][populate]":
		"*",
};

/* ── HTML rendering ─────────────────────────────────────────────────────── */

const ESCAPES = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
};

/** Escape text before it goes into the HTML string the panel renders. Bodies
 *  reach ContentFromCms, which parses them as markup, so unescaped copy would
 *  let a stray `<` in an editor's prose break the page. */
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Strapi rich-text leaves → HTML. Marks are nested outside-in so bold italic
 *  text comes out as `<strong><em>…</em></strong>` rather than two siblings. */
function inlineHtml(nodes) {
	return (Array.isArray(nodes) ? nodes : [])
		.map((node) => {
			if (node?.type === "link") {
				const href = esc(node.url || "");
				// Authors link out to regulator and exchange documentation, so links
				// open away from the panel rather than navigating the page out of it.
				return `<a href="${href}" target="_blank" rel="noopener noreferrer">${inlineHtml(
					node.children,
				)}</a>`;
			}
			if (node?.type === "text" || typeof node?.text === "string") {
				let html = esc(node.text);
				if (!html) return "";
				if (node.code) html = `<code>${html}</code>`;
				if (node.strikethrough) html = `<s>${html}</s>`;
				if (node.underline) html = `<u>${html}</u>`;
				if (node.italic) html = `<em>${html}</em>`;
				if (node.bold) html = `<strong>${html}</strong>`;
				return html;
			}
			return inlineHtml(node?.children);
		})
		.join("");
}

/** One rich-text block node → HTML. Returns "" for anything with no content, so
 *  an empty trailing paragraph doesn't leave a blank box behind. */
function blockHtml(node) {
	const type = node?.type;

	if (type === "paragraph") {
		const inner = inlineHtml(node.children);
		return inner.trim() ? `<p>${inner}</p>` : "";
	}

	if (type === "heading") {
		// Levels 1–3 are lifted out into their own outline nodes before this runs
		// (see toOutline), so anything arriving here is deeper than the panel's own
		// headings and renders at the bottom of its scale.
		const level = Math.min(Math.max(Number(node.level) || 2, 2) + 3, 6);
		const inner = inlineHtml(node.children);
		return inner.trim() ? `<h${level}>${inner}</h${level}>` : "";
	}

	if (type === "list") {
		const tag = node.format === "ordered" ? "ol" : "ul";
		const items = (node.children || [])
			.map((item) =>
				// A nested list is a `list` child of the item, so items render through
				// this same function rather than inlineHtml alone.
				item?.type === "list"
					? blockHtml(item)
					: `<li>${inlineHtml(item?.children)}</li>`,
			)
			.join("");
		return items ? `<${tag}>${items}</${tag}>` : "";
	}

	if (type === "quote") {
		const inner = inlineHtml(node.children);
		return inner.trim() ? `<blockquote><p>${inner}</p></blockquote>` : "";
	}

	if (type === "code") {
		const inner = esc(
			(node.children || []).map((child) => child?.text || "").join("\n"),
		);
		return inner.trim() ? `<pre><code>${inner}</code></pre>` : "";
	}

	if (type === "image") {
		return imageHtml(node.image);
	}

	return "";
}

/** A Strapi media object → a figure. Width and height are carried through so the
 *  panel doesn't reflow as images load. */
function imageHtml(image, caption) {
	const url = image?.url;
	if (!url) return "";
	const dims = [
		image.width ? ` width="${esc(image.width)}"` : "",
		image.height ? ` height="${esc(image.height)}"` : "",
	].join("");
	const img = `<img src="${esc(url)}" alt="${esc(
		image.alternativeText || "",
	)}"${dims} loading="lazy" />`;
	const text = caption || image.caption;
	return text
		? `<figure>${img}<figcaption>${esc(text)}</figcaption></figure>`
		: `<figure>${img}</figure>`;
}

/** `table_data` → the `{ caption, head, rows }` shape the panel's CmsTable
 *  renders. Ragged rows are padded so the rendered table never has short rows. */
function toTable(tableData, caption) {
	const head = Array.isArray(tableData?.headers) ? tableData.headers : [];
	const body = Array.isArray(tableData?.rows) ? tableData.rows : [];
	if (!head.length && !body.length) return null;

	const width = Math.max(head.length, ...body.map((row) => row.length), 0);
	const pad = (row) => {
		const cells = (Array.isArray(row) ? row : []).map((cell) =>
			String(cell ?? "").trim(),
		);
		return [...cells, ...Array(Math.max(0, width - cells.length)).fill("")];
	};

	// A table with no header row would render an empty `<thead>`, so its first row
	// is promoted instead — the panel always draws a header.
	const rows = body.map(pad);
	return {
		caption: caption || null,
		head: head.length ? pad(head) : rows.shift() || [],
		rows,
	};
}

/** Table rendered as markup, for the second and later tables under one heading.
 *  A node carries a single structured `table`; anything beyond that would be
 *  dropped, and silently losing a table an editor has published is worse than
 *  rendering it inside the prose. */
function tableHtml(table) {
	if (!table?.head?.length) return "";
	const head = table.head.map((cell) => `<th scope="col">${esc(cell)}</th>`).join("");
	const rows = table.rows
		.map(
			(row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`,
		)
		.join("");
	const caption = table.caption ? `<caption>${esc(table.caption)}</caption>` : "";
	return `<table>${caption}<thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

/* ── Outline ────────────────────────────────────────────────────────────── */

/** "9.1 Core calculation principle" → `{ number: "9.1", title: "Core …" }`.
 *  Authors number their headings by hand in the CMS, and the panel renders the
 *  number in its own column, so it is split back off here rather than left in
 *  the title where it would sit under the column. */
function splitNumber(raw) {
	const text = String(raw || "").trim();
	const match = text.match(/^(\d+(?:\.\d+)*\.?)\s+(.+)$/);
	return match
		? { number: match[1], title: match[2].trim() }
		: { number: null, title: text };
}

/** A node while it is being filled. `parts` keeps prose and tables in the order
 *  they were authored; foldNode below collapses that into the panel's fixed
 *  body / table / bodyAfter slots. */
function makeNode(id, rawTitle) {
	const { number, title } = splitNumber(rawTitle);
	return {
		id,
		number,
		title,
		// The API has no equivalent of the ACF scope taxonomy, so no Universal /
		// Regional badge is claimed for these sections.
		scope: "none",
		parts: [],
		children: [],
	};
}

/** parts[] → { body, table, bodyAfter }. The first table becomes the node's
 *  structured table; prose before it is `body`, prose after it is `bodyAfter`,
 *  and any further table is rendered as markup into `bodyAfter` so it survives. */
function foldNode(node) {
	let table = null;
	const before = [];
	const after = [];

	for (const part of node.parts) {
		if (part.table) {
			if (!table) {
				table = part.table;
				continue;
			}
			after.push(tableHtml(part.table));
			continue;
		}
		(table ? after : before).push(part.html);
	}

	const join = (list) => list.filter(Boolean).join("") || null;
	return {
		id: node.id,
		number: node.number,
		title: node.title,
		scope: node.scope,
		body: join(before),
		table,
		bodyAfter: join(after),
		children: node.children.map(foldNode),
	};
}

/** One chapter → one level-1 outline node.
 *
 *  Chapters carry their sub-structure inside their rich text rather than as
 *  nested entries — "9. Calculation Methodology" is one chapter holding level-2
 *  headings "9.1", "9.2" and so on — so headings are lifted out into the child
 *  nodes the panel collapses individually. Content before the first heading
 *  stays on the chapter itself. */
function toSection(chapter, idPrefix) {
	const root = makeNode(idPrefix, chapter?.title);
	root.navGroup = "";
	let counter = 0;
	let current = root;
	let lastLevel2 = null;

	const openChild = (rawTitle, level) => {
		counter += 1;
		const node = makeNode(`${idPrefix}-h${counter}`, rawTitle);
		if (level >= 3 && lastLevel2) {
			lastLevel2.children.push(node);
		} else {
			root.children.push(node);
			lastLevel2 = node;
		}
		current = node;
	};

	const addHtml = (html) => {
		if (html) current.parts.push({ html });
	};

	for (const block of Array.isArray(chapter?.blocks) ? chapter.blocks : []) {
		switch (block?.__component) {
			case "shared.text-block":
				for (const node of Array.isArray(block.body) ? block.body : []) {
					const level = Number(node?.level) || 0;
					if (node?.type === "heading" && level <= 3) {
						openChild(inlineHtml(node.children).replace(/<[^>]+>/g, ""), level);
						continue;
					}
					addHtml(blockHtml(node));
				}
				break;

			case "shared.table-block": {
				const table = toTable(block.table_data, block.caption);
				if (table) current.parts.push({ table });
				break;
			}

			case "shared.image-block":
				addHtml(imageHtml(block.image, block.caption));
				break;

			case "shared.image-text-block":
				addHtml(
					[
						block.eyebrow ? `<p><strong>${esc(block.eyebrow)}</strong></p>` : "",
						block.heading ? `<h6>${esc(block.heading)}</h6>` : "",
						imageHtml(block.image, block.caption),
						(Array.isArray(block.body) ? block.body : []).map(blockHtml).join(""),
					].join(""),
				);
				break;

			case "shared.video-block": {
				const url = block.video?.url;
				addHtml(
					url
						? `<figure><video src="${esc(url)}" controls preload="metadata"></video>${
								block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : ""
							}</figure>`
						: "",
				);
				break;
			}

			case "shared.cta-block":
				addHtml(
					[
						block.heading ? `<h6>${esc(block.heading)}</h6>` : "",
						block.body ? `<p>${esc(block.body)}</p>` : "",
						block.link_url
							? `<p><a href="${esc(
									block.link_url,
								)}" target="_blank" rel="noopener noreferrer">${esc(
									block.link_label || block.link_url,
								)}</a></p>`
							: "",
					].join(""),
				);
				break;

			case "shared.accordion-block":
				// The panel already folds every heading away, so a second layer of
				// accordions inside one would just be a fold inside a fold — the items
				// are flattened to headed prose instead.
				for (const item of Array.isArray(block.items) ? block.items : []) {
					addHtml(item?.title ? `<h6>${esc(item.title)}</h6>` : "");
					for (const node of Array.isArray(item?.body) ? item.body : []) {
						addHtml(blockHtml(node));
					}
				}
				break;

			default:
				// chart.chart-editor-block among others: nothing in this panel renders a
				// chart, and a half-drawn one would be worse than none. Skipped loudly
				// so an editor adding one to a methodology gets an answer from the logs.
				if (block?.__component) {
					console.warn(
						`[methodology] unsupported block "${block.__component}" skipped in "${chapter?.title}"`,
					);
				}
		}
	}

	return foldNode(root);
}

/* ── Documents ──────────────────────────────────────────────────────────── */

/** Region codes the explorer knows, so a token can be recognised as one. */
const REGION_CODES = new Set(Object.keys(REGION_LABELS));

/** The market a document belongs to, as the lowercase code the explorer and the
 *  panel match on.
 *
 *  `chapters[].regions[]` is the field meant for this and is read first, but it
 *  is empty on every document published so far — the market is instead only in
 *  the document's own title and slug ("… (GBR)", "RPB_methodology_GBR_V1.1"), so
 *  those are tokenised as the fallback. A token counts only on an exact match
 *  against a known code, so ordinary words in a title cannot be mistaken for
 *  one. */
function regionCodeFor(doc) {
	for (const chapter of Array.isArray(doc?.chapters) ? doc.chapters : []) {
		for (const region of Array.isArray(chapter?.regions) ? chapter.regions : []) {
			const code = String(region?.code || "").toLowerCase();
			if (REGION_CODES.has(code)) return code;
		}
	}
	for (const token of `${doc?.title || ""} ${doc?.slug || ""}`.split(/[^A-Za-z]+/)) {
		const code = token.toLowerCase();
		if (REGION_CODES.has(code)) return code;
	}
	return null;
}

/** One API document → one row of the shape MethodologyPanelV2 consumes. */
function toMethodologyRow(doc) {
	const regionCode = regionCodeFor(doc);
	if (!regionCode) return null;

	const idPrefix = `rpb-${regionCode}`;
	const chapters = Array.isArray(doc?.chapters) ? doc.chapters : [];

	return {
		id: idPrefix,
		regionCode,
		// The API serves published content only, so every row it returns is live.
		status: "published",
		version: doc?.version || null,
		lastReviewed: doc?.updatedAt || doc?.publishedAt || null,
		description: doc?.summary ? `<p>${esc(doc.summary)}</p>` : null,
		sections: chapters
			.map((chapter, index) => toSection(chapter, `${idPrefix}-c${index + 1}`))
			.filter(
				(section) =>
					section.title || section.body || section.table || section.children.length,
			),
		// The API has no per-version change log; the document carries a single
		// `version`, which is shown in the panel header instead.
		versionLog: [],
	};
}

/** GET the Real Performance methodologies for every market. */
async function fetchMethodologies(locale) {
	const params = new URLSearchParams({
		...POPULATE,
		"filters[product][name][$eq]": PRODUCT,
		locale,
		// One market per document and a handful of markets, so a single page is
		// the whole set. 100 is the API's maximum.
		"pagination[pageSize]": "100",
	});

	const res = await fetch(`${BASE_URL}?${params}`, {
		method: "GET",
		headers: { Accept: "application/json" },
		signal: AbortSignal.timeout(requestTimeoutMs),
		next: { revalidate: REFRESH_INTERVAL, tags: [METHODOLOGY_TAG] },
	});
	if (!res.ok) {
		throw new Error(
			`Methodologies API failed: ${res.status} ${res.statusText}`,
		);
	}
	const json = await res.json();
	return Array.isArray(json?.data) ? json.data : [];
}

/** Real Performance methodology rows, one per market.
 *
 *  Returns [] on any failure — an unreachable API leaves the Real Performance
 *  tab on whatever the ACF field still holds rather than failing the page. */
export const getRealPerformanceMethodology = async (locale = "en") => {
	try {
		const docs = await fetchMethodologies(locale);
		const byRegion = new Map();

		for (const doc of docs) {
			const row = toMethodologyRow(doc);
			if (!row) {
				console.warn(
					`[methodology] no known market in "${doc?.title || doc?.slug}" — skipped`,
				);
				continue;
			}
			// Two documents for one market: the most recently updated wins, so a
			// superseded one left published cannot shadow the current methodology.
			const held = byRegion.get(row.regionCode);
			const stamp = String(doc?.updatedAt || "");
			if (!held || stamp > held.stamp) byRegion.set(row.regionCode, { row, stamp });
		}

		return [...byRegion.values()].map((entry) => entry.row);
	} catch (error) {
		console.error(
			"Real Performance methodology fetch failed:",
			error?.message || error,
		);
		return [];
	}
};
