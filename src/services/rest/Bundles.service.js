import RESTAPI from "../Rest.service";

import { shapeAcf } from "./shape";

/**
 * The bundles comparison table, stored on the "bundles" page.
 *
 * WPGraphQL nested these fields under the ACF field-group name
 * (`page.bundles.tabs`); REST exposes the group's fields directly on `acf`, so
 * the two keys are read straight off it. Callers previously unwrapped
 * `res.data.page.bundles` themselves and passed the result on as the `bundles`
 * prop — this returns that same object, so the sections are unchanged.
 *
 * @returns {Promise<{ tabs: any, bundleTabs: any }>}
 */
export const getBundlesSection = async () => {
	const data = await RESTAPI(
		"pages?slug=bundles&_fields=acf.tabs,acf.bundle_tabs",
		{ apiID: "pages", slug: "bundles" },
	);
	const acf = (Array.isArray(data) ? data[0]?.acf : data?.acf) || {};
	const shaped = shapeAcf(acf);
	return { tabs: shaped.tabs ?? null, bundleTabs: shaped.bundleTabs ?? null };
};
