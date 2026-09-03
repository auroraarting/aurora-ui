// Bundles section (the /software comparison table) from WordPress over the REST API.
//
// Drop-in replacement for the GraphQL `getBundlesSection` query, returning the
// same `{ data: { page: { bundles: { bundleTabs, tabs } } } }` shape so
// src/components/Bundles.js needs no changes.
//
// One deliberate difference from GraphQL, which is a fix rather than a drift:
// WPGraphQL returned `logo: null` on every row, so the component rendered its
// `<img>` with no src at all and the logos never appeared. REST serves the
// images the editors actually uploaded, so they now render. To go back to
// byte-identical GraphQL output, return `null` from `mapLogo`.

import {
	group,
	orNull,
	rest,
	toMediaNode,
	toRows,
	asList,
} from "./GraphqlShape";

const PAGE_ID = "/page";

/** The ACF field names behind this table were generated from editor-facing
 *  labels, so they carry ampersands and U+2028 line separators
 *  ("strategy &_planning", "financing_&_m&a"). Matching on a normalised
 *  key rather than the literal name keeps the mapping working when a label is
 *  retyped with different spacing. */
const normalise = (key) => String(key).toLowerCase().replace(/[^a-z0-9]/g, "");

/** GraphQL field name → the row value, found by normalised ACF key. */
function rowValue(row, graphqlName) {
	const wanted = normalise(graphqlName);
	for (const key of Object.keys(row)) {
		if (key.endsWith("_source")) continue;
		if (normalise(key) === wanted) return row[key];
	}
	return undefined;
}

/** A checkmark count. The CMS stores 0 on a row that means "none", which
 *  WPGraphQL surfaced as null; the component renders `Array(value || 0)`, so
 *  both come out as no checkmarks. Normalised to null to match GraphQL. */
const toCount = (value) => {
	const count = orNull(value);
	return count === 0 ? null : count;
};

/** One row of the comparison table, in the field order the query used. */
function mapRow(row) {
	const count = (name) => toCount(rowValue(row, name));
	return {
		bgColor: orNull(rowValue(row, "bgColor")),
		designAndOptimisation: count("designAndOptimisation"),
		financingMA: count("financingMA"),
		investmentAnalysis: count("investmentAnalysis"),
		logoText: orNull(rowValue(row, "logoText")),
		ongoingValuation: count("ongoingValuation"),
		portfolioManagementPpas: count("portfolioManagementPpas"),
		projectSiting: count("projectSiting"),
		strategyPlanning: count("strategyPlanning"),
		logo: toMediaNode(rowValue(row, "logo")),
	};
}

/** A repeater of tabs, each holding its own rows. */
function mapTabs(field) {
	const tabs = toRows(field);
	if (!tabs) return null;
	return tabs.map((tab) => ({
		tabName: orNull(rowValue(tab, "tabName")),
		list: toRows(tab.list)?.map(mapRow) ?? null,
	}));
}

/** Bundles Section */
export const getBundlesSection = async () => {
	const res = await rest("/pages?slug=bundles&_fields=id,acf", {
		apiID: "page",
		tag: "page:bundles",
		pageID: PAGE_ID,
	});
	const pageRow = asList(res)[0] || null;
	if (!pageRow) return { data: { page: null } };

	const acf = pageRow.acf || {};
	const bundleTabs = group(acf, "bundle_tabs");
	const tabs = group(acf, "tabs");

	return {
		data: {
			page: {
				bundles: {
					bundleTabs: bundleTabs === null ? null : mapTabs(acf.bundle_tabs),
					tabs: tabs === null ? null : mapTabs(acf.tabs),
				},
			},
		},
	};
};
