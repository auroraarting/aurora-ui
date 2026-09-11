import RESTAPI from "../Rest.service";

import { auroraBaseUrl } from "./aurora";
import { arr, text } from "./shape";
import { tagFor } from "./tags";

/**
 * The six option lists the filter dropdowns are built from — tags, categories,
 * countries, products, softwares and services — in one request.
 *
 * WPGraphQL fetched all six in a single query. Over wp/v2 that is six separate
 * collection calls, so /aurora/v1/filter-options exists to put them back
 * together. Titles and names arrive entity-encoded, as everywhere else in
 * REST, and are decoded here.
 *
 * @returns {Promise<{ tags: any[], categories: any[], countries: any[], products: any[], softwares: any[], services: any[] }>}
 */
export const getFilterOptions = async () => {
	const options = await RESTAPI("filter-options", {
		// One request covering six collections, so it carries all six tags —
		// any of them changing has to invalidate the whole payload. There is no
		// single content type to name here, which is why `tags` is used
		// directly rather than an `apiID`.
		tags: [
			tagFor("tags"),
			tagFor("categories"),
			tagFor("country"),
			tagFor("products"),
			tagFor("softwares"),
			tagFor("services"),
		],
		baseUrl: auroraBaseUrl(),
	});

	/** @param {any[]} list */
	const decode = (list) =>
		arr(list).map((item) => ({
			...item,
			...(item?.name === undefined ? {} : { name: text(item.name) }),
			...(item?.title === undefined ? {} : { title: text(item.title) }),
		}));

	return {
		tags: decode(options?.tags),
		categories: decode(options?.categories),
		countries: decode(options?.countries),
		products: decode(options?.products),
		softwares: decode(options?.softwares),
		services: decode(options?.services),
	};
};
