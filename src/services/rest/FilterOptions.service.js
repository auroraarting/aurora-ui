import RESTAPI from "../Rest.service";

import { auroraBaseUrl } from "./aurora";
import { arr, text } from "./shape";

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
		apiID: "common",
		// Any of the six collections changing invalidates the whole payload.
		tags: [
			"post-tag",
			"category",
			"country",
			"product",
			"software",
			"service",
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
