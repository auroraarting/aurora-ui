<?php
/**
 * Plugin Name: Aurora WPML REST translations
 * Description: Exposes each post's and term's WPML translations on the wp/v2 REST API, the way WPGraphQL's `translations` field did.
 * Version:     1.0.0
 *
 * Install as an mu-plugin (wp-content/mu-plugins/aurora-wpml-rest-translations.php)
 * so it loads on every request and cannot be deactivated by accident.
 *
 * Why this exists
 * ---------------
 * wp/v2 offers no way to get from a post or term to its translation: the custom
 * post types are not even registered in non-default language contexts
 * (`?lang=ja` returns rest_no_route, though `?wpml_language=ja` works), the
 * translated posts get their own duplicated attachments so media ids are not a
 * shared key, and translated slugs diverge from the original. That leaves the
 * front end unable to reproduce WPGraphQL's `translations` field.
 *
 * Needed by: getInsights (post.translations and categories[].translations are
 * populated on live posts — ja, ko, pt-br) and the single-software language
 * pages. Each entry also carries the translated item's own name/title and slug,
 * so reading a translated label costs no extra request; anything more than that
 * is still fetched by id with `?wpml_language=<code>`.
 *
 * It also registers GET /wp-json/aurora/v1/languages, the site's active
 * languages in WPML's configured order. WPML exposes no public endpoint for
 * this, and it cannot be derived from wp/v2 — a post's `translations` only name
 * the languages that post happens to be translated into, not every active one.
 */

if (! defined('ABSPATH')) {
	exit;
}

/**
 * The language details WPGraphQL exposed under `translations { language { … } }`.
 * Read from WPML's active-language list so the values match what the GraphQL
 * schema returned (`id` was a string there, so it is cast to one here).
 *
 * @param string $code Language code, e.g. "ja".
 * @return array
 */
function aurora_wpml_language_details($code) {
	static $languages = null;

	if ($languages === null) {
		$languages = apply_filters('wpml_active_languages', null, ['skip_missing' => 0]);
		$languages = is_array($languages) ? $languages : [];
	}

	$language = isset($languages[$code]) ? $languages[$code] : [];

	return [
		'code'             => $code,
		'country_flag_url' => isset($language['country_flag_url']) ? $language['country_flag_url'] : null,
		'default_locale'   => isset($language['default_locale']) ? $language['default_locale'] : null,
		'id'               => isset($language['id']) ? (string) $language['id'] : null,
		'language_code'    => $code,
		'translated_name'  => isset($language['translated_name']) ? $language['translated_name'] : null,
		'native_name'      => isset($language['native_name']) ? $language['native_name'] : null,
		'url'              => isset($language['url']) ? $language['url'] : null,
	];
}

/**
 * Every translation of one element except the element itself.
 *
 * @param int    $element_id   Post or term id.
 * @param string $element_type WPML element type, e.g. "post_softwares" or "tax_category".
 * @return array
 */
function aurora_wpml_translations_for($element_id, $element_type) {
	$trid = apply_filters('wpml_element_trid', null, $element_id, $element_type);
	if (! $trid) {
		return [];
	}

	$translations = apply_filters('wpml_get_element_translations', null, $trid, $element_type);
	if (! is_array($translations)) {
		return [];
	}

	$out = [];
	foreach ($translations as $code => $translation) {
		$translated_id = isset($translation->element_id) ? (int) $translation->element_id : 0;
		// Skip the element being asked about — GraphQL listed only the others.
		if (! $translated_id || $translated_id === (int) $element_id) {
			continue;
		}
		$entry = [
			'id'       => $translated_id,
			'language' => aurora_wpml_language_details($code),
		];

		/*
		 * The translated item's own name/title, inline. Without it every caller
		 * needs a follow-up request per language just to read a translated
		 * category name — three extra requests on a single insights query. The
		 * lookup is local, so serving it here is close to free.
		 */
		if (0 === strpos($element_type, 'tax_')) {
			$term = get_term($translated_id);
			if ($term && ! is_wp_error($term)) {
				$entry['name'] = $term->name;
				$entry['slug'] = $term->slug;
			}
		} else {
			$translated_post = get_post($translated_id);
			if ($translated_post) {
				$entry['title'] = get_the_title($translated_id);
				$entry['slug'] = $translated_post->post_name;
			}
		}

		$out[] = $entry;
	}

	return $out;
}

add_action('rest_api_init', function () {
	// WPML is not active — leave the REST API exactly as it was.
	if (! has_filter('wpml_element_trid')) {
		return;
	}

	$schema = [
		'description' => 'WPML translations of this item.',
		'type'        => 'array',
		/*
		 * `embed` matters: WordPress reduces `?_embed`-ed objects to the embed
		 * context, which drops registered fields. Without it, a post embedding
		 * its terms gets them back with no translations, and the caller is forced
		 * into a second request just to read a translated name.
		 */
		'context'     => ['view', 'edit', 'embed'],
		'readonly'    => true,
	];

	foreach (get_post_types(['show_in_rest' => true], 'names') as $post_type) {
		register_rest_field($post_type, 'translations', [
			'get_callback' => function ($object) {
				return aurora_wpml_translations_for(
					$object['id'],
					'post_' . get_post_type($object['id'])
				);
			},
			'schema'       => $schema,
		]);
	}

	foreach (get_taxonomies(['show_in_rest' => true], 'names') as $taxonomy) {
		register_rest_field($taxonomy, 'translations', [
			'get_callback' => function ($object) use ($taxonomy) {
				return aurora_wpml_translations_for($object['id'], 'tax_' . $taxonomy);
			},
			'schema'       => $schema,
		]);
	}
});

add_action('rest_api_init', function () {
	// The active languages, in WPML's configured order. Public and read-only:
	// the same list the site's own language switcher renders.
	register_rest_route('aurora/v1', '/languages', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => function () {
			if (! has_filter('wpml_active_languages')) {
				return [];
			}
			$languages = apply_filters('wpml_active_languages', null, ['skip_missing' => 0]);
			if (! is_array($languages)) {
				return [];
			}

			$out = [];
			foreach (array_keys($languages) as $code) {
				$out[] = aurora_wpml_language_details($code);
			}
			return $out;
		},
	]);
});
