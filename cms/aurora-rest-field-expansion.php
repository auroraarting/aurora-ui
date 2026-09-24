<?php
/**
 * Plugin Name: Aurora REST field expansion
 * Description: Resolves ACF media, taxonomy and relation fields to usable values in REST responses, and adds featured_image_url to every post type.
 * Version:     1.0.0
 *
 * Install as a regular plugin (wp-content/plugins/aurora-rest-field-expansion.php)
 * rather than an mu-plugin. The other four Aurora files are mu-plugins because the
 * front end breaks without them; this one is the opposite case. It reshapes values
 * that other code already reads, so if it misbehaves on production the useful thing
 * is to be able to switch it off from wp-admin without a deploy. Dropping it in
 * mu-plugins/ also works — the header is valid in both locations — but then there
 * is no off switch.
 *
 * Why this exists
 * ---------------
 * This is the block that lived at the bottom of the staging theme's functions.php
 * and never reached production, which is why the two environments disagreed about
 * what a nested ACF image is. Moving it into a plugin makes it deployable, version
 * controlled, and removable, and lets the same file serve both environments so the
 * drift cannot come back.
 *
 * What it does
 * ------------
 *   * image / file fields      -> attachment URL string
 *   * gallery fields           -> array of URL strings
 *   * taxonomy fields          -> { id, title, slug }
 *   * relationship/post_object -> { id, title, slug, link, type, acf }
 *   * every show_in_rest type gains a `featured_image_url` field
 *
 * Depth is controlled per request with ?acf_depth=N.
 *   0  raw ACF behaviour, ids as before
 *   1  default, one hop of relation expansion, deeper collapses to null
 *   2+ that many hops before collapsing
 *
 * Three deliberate differences from the staging functions.php version
 * -------------------------------------------------------------------
 * 1. REST only. The staging version hooks acf/format_value unconditionally, so it
 *    fires for every get_field() call on the site — WPGraphQL resolvers, wp-admin,
 *    theme templates. Production still serves most of its pages from WPGraphQL, so
 *    reshaping values there would change live output. The filters are installed
 *    inside rest_api_init, which only runs when WordPress is serving a REST
 *    request, so GraphQL and admin behave exactly as they do today.
 *
 * 2. The relation depth counter is unwound in a finally block. In the staging
 *    version an exception thrown while walking a related post left the static
 *    counter incremented for the rest of the request, silently collapsing every
 *    later relation field to null.
 *
 * 3. The default depth is a constant and a filter, not just a query parameter, so
 *    it can be changed per environment without editing this file.
 *
 * Interaction with aurora-acf-expand.php
 * --------------------------------------
 * That mu-plugin rebuilds the whole acf block on rest_prepare_{$post_type} from
 * *unformatted* reads — aurora_acf_raw_value() passes false as get_field()'s third
 * argument — so it bypasses these filters entirely and wins at the top level. Where
 * the two do meet is nested data: aurora_acf_post_acf() calls get_fields() (formatted)
 * for related posts, and aurora_acf_term_acf() does the same for terms, so those go
 * through this plugin.
 *
 * That means relation values get expanded here and then reduced back to an id by
 * aurora_acf_reference_id(), which is wasted PHP on a box that is already CPU
 * limited. Turning the `aurora_rest_acf_skip_inside_rest_prepare` filter on below
 * skips that work. It is off by default because it is not a pure optimisation: a
 * field with a value but no reachable ACF definition is passed through by the
 * mu-plugin's walk, and for those the expansion is not discarded. Off keeps
 * production byte-identical to staging; on trades that edge case for less CPU.
 *
 * @package Aurora
 */

if (! defined('ABSPATH')) {
	exit;
}

/** Depth applied when the request does not ask for one. */
if (! defined('AURORA_REST_ACF_DEFAULT_DEPTH')) {
	define('AURORA_REST_ACF_DEFAULT_DEPTH', 1);
}

/**
 * Install the value filters, but only for REST requests.
 *
 * rest_api_init fires from rest_api_loaded() on parse_request, well before any
 * route callback reads a field, so the filters are in place in time. It does not
 * fire for a normal page load, an admin screen, or a POST to /graphql — which is
 * the whole point.
 *
 * @return void
 */
add_action('rest_api_init', 'aurora_rest_field_expansion_boot');
function aurora_rest_field_expansion_boot() {

	if (function_exists('get_field')) {
		add_filter('acf/format_value/type=image', 'aurora_rest_media_field_to_url', 20, 3);
		add_filter('acf/format_value/type=file', 'aurora_rest_media_field_to_url', 20, 3);
		add_filter('acf/format_value/type=gallery', 'aurora_rest_gallery_field_to_urls', 20, 3);
		add_filter('acf/format_value/type=taxonomy', 'aurora_rest_taxonomy_field_expand', 20, 3);
		add_filter('acf/format_value/type=relationship', 'aurora_rest_relationship_field_expand', 20, 3);
		add_filter('acf/format_value/type=post_object', 'aurora_rest_relationship_field_expand', 20, 3);
	}

	aurora_rest_register_featured_image_url();
}

/**
 * Expansion depth for the current request.
 *
 * Cached in a static because it is read once per field and cannot change mid
 * request. Only reachable during REST, so the query parameter cannot leak into
 * an admin-ajax or front-end read the way it could on staging.
 *
 * @return int
 */
function aurora_rest_get_acf_depth() {
	static $depth = null;

	if (null === $depth) {
		$requested = isset($_GET['acf_depth'])
			? (int) $_GET['acf_depth']
			: (int) AURORA_REST_ACF_DEFAULT_DEPTH;

		/**
		 * Filter the resolved expansion depth.
		 *
		 * @param int $requested
		 */
		$depth = max(0, (int) apply_filters('aurora_rest_acf_depth', $requested));
	}

	return $depth;
}

/**
 * How many relation hops deep the current walk is.
 *
 * @param int $delta 1 before recursing, -1 after.
 * @return int
 */
function aurora_rest_relationship_depth($delta = 0) {
	static $current = 0;

	if (0 !== $delta) {
		$current += $delta;
	}

	return $current;
}

/**
 * Whether aurora-acf-expand.php is currently rebuilding a response.
 *
 * Its walk discards anything this plugin expands, so the work can be skipped —
 * see the note at the top of the file for why that is opt in.
 *
 * @return bool
 */
function aurora_rest_inside_rest_prepare() {
	/**
	 * Filter whether to skip relation expansion inside aurora-acf-expand's walk.
	 *
	 * @param bool $skip Default false.
	 */
	if (! apply_filters('aurora_rest_acf_skip_inside_rest_prepare', false)) {
		return false;
	}

	foreach ((array) $GLOBALS['wp_current_filter'] as $hook) {
		if (0 === strpos($hook, 'rest_prepare_')) {
			return true;
		}
	}

	return false;
}

/**
 * Normalise an attachment id, attachment array or bare url down to a url.
 *
 * @param mixed $item
 * @return string|null
 */
function aurora_rest_attachment_to_url($item) {
	if (empty($item)) {
		return null;
	}

	if (is_numeric($item)) {
		$url = wp_get_attachment_url((int) $item);
		return $url ?: null;
	}

	if (is_array($item) && isset($item['ID'])) {
		$url = wp_get_attachment_url((int) $item['ID']);
		return $url ?: (isset($item['url']) ? $item['url'] : null);
	}

	if (is_array($item) && isset($item['url'])) {
		return $item['url'];
	}

	if (is_string($item)) {
		return $item;
	}

	return null;
}

/**
 * image / file field -> url.
 *
 * @param mixed $value
 * @param mixed $post_id
 * @param array $field
 * @return mixed
 */
function aurora_rest_media_field_to_url($value, $post_id, $field) {
	if (empty($value)) {
		return $value;
	}

	return aurora_rest_attachment_to_url($value);
}

/**
 * gallery field -> array of urls.
 *
 * @param mixed $value
 * @param mixed $post_id
 * @param array $field
 * @return mixed
 */
function aurora_rest_gallery_field_to_urls($value, $post_id, $field) {
	if (empty($value) || ! is_array($value)) {
		return $value;
	}

	$urls = [];

	foreach ($value as $item) {
		$url = aurora_rest_attachment_to_url($item);
		if ($url) {
			$urls[] = $url;
		}
	}

	return $urls;
}

/**
 * taxonomy field -> { id, title, slug }.
 *
 * @param mixed $value
 * @param mixed $post_id
 * @param array $field
 * @return mixed
 */
function aurora_rest_taxonomy_field_expand($value, $post_id, $field) {
	if (empty($value)) {
		return $value;
	}

	if (aurora_rest_get_acf_depth() < 1) {
		return $value;
	}

	$is_multiple = is_array($value);
	$ids         = $is_multiple ? $value : [$value];
	$terms       = [];

	foreach ($ids as $term_id) {
		$term_id = is_object($term_id) ? $term_id->term_id : $term_id;
		$term    = get_term((int) $term_id);

		if ($term && ! is_wp_error($term)) {
			$terms[] = [
				'id'    => $term->term_id,
				'title' => $term->name,
				'slug'  => $term->slug,
			];
		}
	}

	return $is_multiple ? $terms : ($terms[0] ?? null);
}

/**
 * relationship / post_object field -> shallow related post objects.
 *
 * @param mixed $value
 * @param mixed $post_id
 * @param array $field
 * @return mixed
 */
function aurora_rest_relationship_field_expand($value, $post_id, $field) {
	if (empty($value)) {
		return $value;
	}

	$depth = aurora_rest_get_acf_depth();

	if ($depth < 1 || aurora_rest_inside_rest_prepare()) {
		return $value;
	}

	if (aurora_rest_relationship_depth() >= $depth) {
		// Depth limit reached. Return null rather than the raw ids, so a consumer
		// never has to guess whether an integer is a post id or a real value.
		return null;
	}

	$is_multiple = is_array($value)
		&& (empty($field['type']) || 'post_object' !== $field['type'] || ! empty($field['multiple']));
	$items       = is_array($value) ? $value : [$value];
	$results     = [];

	aurora_rest_relationship_depth(1);

	try {
		foreach ($items as $item) {
			$related_post = is_object($item) ? $item : get_post($item);

			if (! $related_post) {
				continue;
			}

			$entry = [
				'id'    => $related_post->ID,
				'title' => get_the_title($related_post),
				'slug'  => $related_post->post_name,
				'link'  => get_permalink($related_post),
				'type'  => $related_post->post_type,
			];

			$sub_fields = get_fields($related_post->ID);
			if ($sub_fields) {
				$entry['acf'] = $sub_fields;
			}

			$results[] = $entry;
		}
	} finally {
		// Unwound here rather than after the loop: the staging version leaked the
		// increment whenever get_fields() threw, which collapsed every later
		// relation field in the request to null.
		aurora_rest_relationship_depth(-1);
	}

	return $is_multiple ? $results : ($results[0] ?? null);
}

/**
 * Add featured_image_url to every post type that appears in REST.
 *
 * featured_media is only an attachment id, so a listing that shows thumbnails
 * otherwise costs one /wp/v2/media request per row.
 *
 * @return void
 */
function aurora_rest_register_featured_image_url() {
	foreach (get_post_types(['show_in_rest' => true], 'names') as $post_type) {
		register_rest_field(
			$post_type,
			'featured_image_url',
			[
				'get_callback' => function ($object) {
					if (empty($object['featured_media'])) {
						return null;
					}

					$url = wp_get_attachment_url((int) $object['featured_media']);

					return $url ?: null;
				},
				'schema'       => [
					'description' => 'URL of the featured image, or null.',
					'type'        => ['string', 'null'],
					'format'      => 'uri',
					'context'     => ['view', 'edit', 'embed'],
				],
			]
		);
	}
}
