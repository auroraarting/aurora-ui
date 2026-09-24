import RESTAPI from "../Rest.service";

import { auroraBaseUrl } from "./aurora";

/**
 * WPML's language list.
 *
 * WPGraphQL exposed a `languages` root field; wp/v2 has no equivalent, so this
 * reads /aurora/v1/languages, which returns the same fields (`code`,
 * `country_flag_url`, `default_locale`, `language_code`, `native_name`,
 * `translated_name`) plus `id` and `url`.
 *
 * Degrades to an empty list rather than throwing: a language switcher with no
 * options is a smaller failure than a 500 on every page that renders one.
 *
 * @returns {Promise<any[]>} what callers previously read as `res.data.languages`
 */
export const getAllLanguages = async () => {
	try {
		const languages = await RESTAPI("languages", {
			apiID: "language",
			baseUrl: auroraBaseUrl(),
		});
		return Array.isArray(languages) ? languages : [];
	} catch (error) {
		console.error("Language list unavailable:", error?.message || error);
		return [];
	}
};
