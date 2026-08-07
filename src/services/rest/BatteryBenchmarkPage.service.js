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

/** ACF's snake_case payload → the camelCase shape the sections consume */
function normalise(page, termsBySection, termsByScope) {
	if (!page) return null;
	const acf = page.acf || {};
	const button = acf.top_section_button || {};
	const methodology = Array.isArray(acf.methodology) ? acf.methodology : [];

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
