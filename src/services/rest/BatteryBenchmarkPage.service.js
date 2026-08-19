// Editorial content for /battery-benchmarks, from WordPress.
// The page lives on the REST side only (wp/v2/pages?slug=battery-benchmarks),
// so this is the one CMS source for the page — the Flexplorer numbers come
// from BatteryBenchmark.service.js instead.

import RESTAPI from "../Rest.service";

const SLUG = "battery-benchmarks";

// A methodology tab points at two taxonomies by term id: `section_tag` is the
// heading it files under in the panel's side navigation, `tags` are its scope
// chips (Universal / Region). Both are fetched so the ids can be named.
const SECTION_TAXONOMY = "section-tag";
const SCOPE_TAXONOMY = "tab-column";

/** ACF returns `false` for an empty repeater/relation — normalise that to null */
const orNull = (value) =>
	value === false || value === "" || value === undefined ? null : value;

/** ACF file/image field → the `{ node: { mediaItemUrl } }` shape the shared
 *  button helpers expect. The field can come back as an object, a plain URL, or
 *  an attachment ID (nothing to resolve from an ID here, so it's dropped). */
function toMediaNode(file) {
	if (!file) return null;
	if (typeof file === "string") {
		return { node: { mediaItemUrl: file, altText: "" } };
	}
	if (typeof file === "object") {
		const url = file.url || file.source_url || file.mediaItemUrl;
		if (!url) return null;
		return { node: { mediaItemUrl: url, altText: file.alt || file.title || "" } };
	}
	return null;
}

/** Term reference → `{ id, name, slug }`. ACF hands back bare term ids here, so
 *  the name comes from `terms`; an already-expanded object is passed through. */
function toTerm(value, terms) {
	if (!value && value !== 0) return null;
	if (typeof value === "object") {
		const id = value.term_id || value.id || null;
		return {
			id,
			name: value.name || terms?.get(id)?.name || "",
			slug: value.slug || terms?.get(id)?.slug || "",
		};
	}
	return terms?.get(value) || { id: value, name: "", slug: "" };
}

/** ACF gives a taxonomy field as an array (or a single value when it holds one) */
function toTerms(value, terms) {
	const list = Array.isArray(value) ? value : [value];
	return list.map((item) => toTerm(item, terms)).filter(Boolean);
}

/** Repeater row → one market's methodology. A row carries the intro copy for a
 *  region (`region_code` matches the explorer's codes: "gbr", "deu", …) and the
 *  tabs the panel lists down its side navigation. */
function toMethodologySection(row, index, termsBySection, termsByScope) {
	const tabs = Array.isArray(row?.tabs) ? row.tabs : [];
	const regionCode = orNull(row?.region_code);

	return {
		id: regionCode || `section-${index + 1}`,
		regionCode,
		description: orNull(row?.description),
		tabs: tabs
			.filter((tab) => tab?.title || tab?.description)
			.map((tab, tabIndex) => ({
				id: `${regionCode || index + 1}-tab-${tabIndex + 1}`,
				title: tab?.title || "",
				description: orNull(tab?.description),
				// Heading this tab is grouped under in the side navigation
				section: toTerm(
					Array.isArray(tab?.section_tag) ? tab.section_tag[0] : tab?.section_tag,
					termsBySection,
				),
				// "Universal" / "Region" — rendered as the scope badges
				scopes: toTerms(tab?.tags, termsByScope),
			})),
	};
}

/** Parse a `table_tsv` textarea into a table.
 *  Editors paste straight out of Word or Excel, which yields tab-separated cells,
 *  one row per line. The first line is the header. Ragged rows are padded so the
 *  rendered table never has short rows. */
function toTable(tsv, caption) {
	const lines = String(tsv || "")
		.split(/\r?\n/)
		.map((line) => line.replace(/\s+$/, ""))
		.filter((line) => line.trim() !== "");
	if (!lines.length) return null;

	const grid = lines.map((line) => line.split("\t").map((cell) => cell.trim()));
	const width = Math.max(...grid.map((cells) => cells.length));
	const padded = grid.map((cells) => [
		...cells,
		...Array(width - cells.length).fill(""),
	]);

	return {
		caption: orNull(caption),
		head: padded[0],
		rows: padded.slice(1),
	};
}

/** Flat outline rows → a nested tree, using each row's `level` (1/2/3).
 *  The outline is authored linearly, the way the source Word document is written,
 *  so depth comes from the level field rather than nested repeaters. A level that
 *  arrives without its parent (a stray level 3, say) is lifted to the deepest
 *  open ancestor rather than dropped. */
function toOutlineTree(outline, idPrefix) {
	const sections = [];
	let currentGroup = "";
	let counter = 0;

	(Array.isArray(outline) ? outline : [])
		.filter((row) => row?.title || row?.body || row?.table_tsv)
		.forEach((row) => {
			const level = Number(row?.level) || 1;
			// A blank nav group continues the previous one, so editors name a group
			// once rather than repeating it on every row.
			if (orNull(row?.nav_group)) currentGroup = row.nav_group;

			counter += 1;
			const node = {
				id: `${idPrefix}-s${counter}`,
				number: orNull(row?.number),
				title: row?.title || "",
				scope: orNull(row?.scope) || "none",
				body: orNull(row?.body),
				table: toTable(row?.table_tsv, row?.table_caption),
				// The second prose block: renders after the table when the row has one,
				// otherwise straight after `body`. Deliberately not gated on there being
				// a table — silently discarding copy an editor has typed and saved is
				// worse than letting it show as a trailing paragraph.
				bodyAfter: orNull(row?.body_after),
				children: [],
			};

			const last = sections[sections.length - 1];
			if (level === 1 || !last) {
				sections.push({ ...node, navGroup: currentGroup, children: [] });
				return;
			}
			if (level === 2) {
				last.children.push(node);
				return;
			}
			// level 3
			const parent = last.children[last.children.length - 1];
			(parent ? parent.children : last.children).push(node);
		});

	return sections;
}

/** Repeater row → one market's methodology, v2 shape.
 *  Kept entirely separate from `toMethodologySection` so the original field and
 *  its panel keep working untouched while the two are compared. */
function toMethodologyV2Section(row, index) {
	const regionCode = orNull(row?.region_code);
	const idPrefix = regionCode || `section-${index + 1}`;
	const log = Array.isArray(row?.version_log) ? row.version_log : [];

	return {
		id: idPrefix,
		regionCode,
		// Draft rows are written up before they go live, so the panel skips them.
		status: orNull(row?.status) || "published",
		version: orNull(row?.methodology_version),
		lastReviewed: orNull(row?.last_reviewed),
		description: orNull(row?.description),
		sections: toOutlineTree(row?.outline, idPrefix),
		versionLog: log
			.filter((entry) => entry?.version || entry?.change_summary)
			.map((entry) => ({
				version: orNull(entry?.version),
				effectiveDate: orNull(entry?.effective_date),
				changeSummary: orNull(entry?.change_summary),
				sectionsAffected: orNull(entry?.sections_affected),
			})),
	};
}

/** ACF's snake_case payload → the camelCase shape the sections consume */
function normalise(page, termsBySection, termsByScope) {
	if (!page) return null;
	const acf = page.acf || {};
	const button = acf.top_section_button || {};
	const methodology = Array.isArray(acf.methodology) ? acf.methodology : [];
	const methodologyV2 = Array.isArray(acf.methodology_v2)
		? acf.methodology_v2
		: [];

	return {
		id: page.id,
		title: page.title?.rendered || "",
		slug: page.slug,
		banner: {
			title: orNull(acf.banner?.title),
			description: orNull(acf.banner?.description),
		},
		topSectionButton: {
			buttonText: orNull(button.button_text),
			iframe: orNull(button.iframe),
			url: orNull(button.url),
			file: toMediaNode(orNull(button.file)),
		},
		methodology: methodology.map((row, index) =>
			toMethodologySection(row, index, termsBySection, termsByScope),
		),
		// The proposed replacement, read alongside the original so both can be
		// compared on the page. Empty until the v2 field is filled in.
		methodologyV2: methodologyV2.map((row, index) =>
			toMethodologyV2Section(row, index),
		),
		updated: page.modified || null,
		seo: {
			title: page.yoast_head_json?.title || page.title?.rendered || "",
			description: page.yoast_head_json?.description || "",
			canonical: page.yoast_head_json?.canonical || "",
			robots: page.yoast_head_json?.robots || null,
		},
	};
}

/** `id → { id, name, slug }` for a taxonomy. An unreachable taxonomy leaves the
 *  map empty, which only costs the terms their labels — never the page. */
async function getTerms(taxonomy) {
	try {
		const res = await RESTAPI(`/${taxonomy}?per_page=100`, {
			method: "GET",
			apiID: taxonomy,
			pageID: `/${SLUG}`,
		});
		const list = Array.isArray(res) ? res : [];
		return new Map(
			list.map((term) => [
				term.id,
				{ id: term.id, name: term.name || "", slug: term.slug || "" },
			]),
		);
	} catch (error) {
		console.error(`${taxonomy} terms fetch failed:`, error?.message || error);
		return new Map();
	}
}

/** Fetch the Battery Benchmarks page content.
 *  Returns null when WordPress has no such page, so the sections fall back to
 *  their built-in copy rather than the route failing to build. */
export const getBatteryBenchmarkPage = async () => {
	try {
		const [res, termsBySection, termsByScope] = await Promise.all([
			RESTAPI(`/pages?slug=${SLUG}`, {
				method: "GET",
				apiID: "pages",
				pageID: `/${SLUG}`,
			}),
			getTerms(SECTION_TAXONOMY),
			getTerms(SCOPE_TAXONOMY),
		]);
		return normalise(
			Array.isArray(res) ? res[0] : res,
			termsBySection,
			termsByScope,
		);
	} catch (error) {
		console.error(
			"Battery Benchmarks page fetch failed:",
			error?.message || error,
		);
		return null;
	}
};
