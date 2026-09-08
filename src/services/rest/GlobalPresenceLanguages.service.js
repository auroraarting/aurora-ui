// The site's active languages, over REST.
//
// Drop-in replacement for the GraphQL `getAllLanguages` query, returning the
// same `{ data: { languages: [ … ] } }` shape so the language switchers reading
// it need no changes.
//
// This one cannot come from core REST at all: WPML publishes no endpoint for the
// language list, and it is not derivable from wp/v2 — a post's `translations`
// only name the languages that post happens to be translated into, not every
// language the site has active. The route it calls is registered by
// cms/aurora-wpml-rest-translations.php.

import { asList, orNull, restNamespaced } from "./GraphqlShape";

const NAMESPACE = "aurora/v1";
const PAGE_ID = "/common";

/** getAllLanguages
 *
 *  The endpoint returns WPML's full details per language; the GraphQL query
 *  selected six of them, so the rest are dropped rather than handed to callers
 *  that never had them. Order is WPML's own, which is what the query returned.
 */
export const getAllLanguages = async () => {
	let res;
	try {
		res = await restNamespaced(NAMESPACE, "/languages", {
			apiID: "common",
			pageID: PAGE_ID,
		});
	} catch (error) {
		// The route is missing (mu-plugin not installed) or WPML is inactive.
		// An empty list costs the language switcher its options; throwing would
		// cost the whole page, so it degrades instead.
		console.error("Languages fetch failed:", error?.message || error);
		return { data: { languages: [] } };
	}

	return {
		data: {
			languages: asList(res).map((language) => ({
				code: orNull(language.code),
				country_flag_url: orNull(language.country_flag_url),
				default_locale: orNull(language.default_locale),
				language_code: orNull(language.language_code),
				native_name: orNull(language.native_name),
				translated_name: orNull(language.translated_name),
			})),
		},
	};
};
