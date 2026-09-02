<?php
/**
 * Plugin Name: Aurora filter options
 * Description: Returns every option list behind the insights filters in one request.
 * Version:     1.0.0
 *
 * Install as an mu-plugin: /srv/htdocs/wp-content/mu-plugins/aurora-filter-options.php
 *
 * Why this exists
 * ---------------
 * The insights filters need six independent lists — tags, categories, countries,
 * products, softwares, services. Over wp/v2 that is one request per list plus
 * pagination (240 tags and 149 categories are 3 and 2 pages), so nine requests
 * in total, each paying WordPress's ~1.5s bootstrap. WPGraphQL fetched all six
 * in a single query.
 *
 * None of these are relations, so cms/aurora-acf-expand.php cannot help: the
 * only way to close the gap is to serve the lists together.
 *
 *     GET /wp-json/aurora/v1/filter-options
 *
 * Ordering mirrors what the GraphQL query returned, because the front end feeds
 * these straight into <select> elements:
 *   * terms      — by name, ties broken by descending term id
 *   * countries  — by title ascending
 *   * others     — WP's default (newest first)
 */

if (! defined('ABSPATH')) {
	exit;
}

/** Taxonomies returned as `{ id, name, slug }`. */
const AURORA_FILTER_TAXONOMIES = [
	'tags'       => 'post_tag',
	'categories' => 'category',
];

/**
 * Post types returned as `{ id, title, slug }`, with the ordering each list used.
 * `orderby` of null means WP's default, which is what the GraphQL connection did.
 */
const AURORA_FILTER_POST_TYPES = [
	'countries' => ['type' => 'country',   'orderby' => 'title'],
	'products'  => ['type' => 'products',  'orderby' => null],
	'softwares' => ['type' => 'softwares', 'orderby' => null],
	'services'  => ['type' => 'services',  'orderby' => null],
];

add_action('rest_api_init', function () {
	register_rest_route('aurora/v1', '/filter-options', [
		'methods'             => 'GET',
		'permission_callback' => '__return_true',
		'callback'            => 'aurora_filter_options',
	]);
});

/**
 * @return array
 */
function aurora_filter_options() {
	$out = [];

	foreach (AURORA_FILTER_TAXONOMIES as $key => $taxonomy) {
		$terms = get_terms([
			'taxonomy'   => $taxonomy,
			'hide_empty' => false,
			'orderby'    => 'name',
			'order'      => 'ASC',
			'number'     => 0,
		]);
		if (is_wp_error($terms)) {
			$out[$key] = [];
			continue;
		}
		// Equal names are ordered by descending id, the way WPGraphQL did.
		usort($terms, function ($a, $b) {
			$byName = strcmp($a->name, $b->name);
			return 0 !== $byName ? $byName : ($b->term_id - $a->term_id);
		});
		$out[$key] = array_map(function ($term) {
			return [
				'id'   => (int) $term->term_id,
				'name' => $term->name,
				'slug' => $term->slug,
			];
		}, $terms);
	}

	foreach (AURORA_FILTER_POST_TYPES as $key => $config) {
		$args = [
			'post_type'      => $config['type'],
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'no_found_rows'  => true,
		];
		if ($config['orderby']) {
			$args['orderby'] = $config['orderby'];
			$args['order'] = 'ASC';
		}
		$out[$key] = array_map(function ($post) {
			return [
				'id'    => (int) $post->ID,
				'title' => get_the_title($post->ID),
				'slug'  => $post->post_name,
			];
		}, get_posts($args));
	}

	return $out;
}
