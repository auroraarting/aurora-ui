<?php
/**
 * Plugin Name: Aurora ACF relation expansion
 * Description: Optionally expands ACF relation fields one level in wp/v2 responses, so the front end can read related posts without a request per relation.
 * Version:     1.0.0
 *
 * Install as an mu-plugin: /srv/htdocs/wp-content/mu-plugins/aurora-acf-expand.php
 * (an mu-plugin rather than the theme's functions.php, because the front end
 * depends on this field existing and it must survive a theme change.)
 *
 * Why this exists
 * ---------------
 * ACF relation fields serialise as bare post ids over REST:
 *
 *     "our_client": { "select_logos": [1381, 999, 1382], "testimonials": [56376] }
 *
 * so a page that reads three relations costs three extra HTTP requests, each
 * paying WordPress's ~1.5s bootstrap. That is what turned the /software page
 * from 6 GraphQL calls into 33 REST calls — and every one of those counts against
 * the host's per-IP rate limiting.
 *
 * Payload is cheap by comparison: on this site a 12-byte response takes ~1.7s and
 * a 1.18 MB response ~3.6s. Fetching more in one request is close to free;
 * fetching it in more requests is not.
 *
 * Usage
 * -----
 *     GET /wp-json/wp/v2/softwares?slug=chronos&_acf_expand=1
 *
 * Opt-in on purpose. Expanding unconditionally would inflate every existing
 * response — an insights query with poweredBy, authors, speakers, testimonials
 * and case studies across 100 posts would be enormous, and nothing else on the
 * site needs it.
 *
 * Each expanded entry carries the related post's own `acf`, which is the whole
 * point: the front end needs values like `products.map.logo` and
 * `post-author.thumbnail.designation`, and a plain post object has neither.
 *
 * Strictly one level. Two would let post → related → related recurse without a
 * natural floor.
 */

if (! defined('ABSPATH')) {
	exit;
}

/** Query parameter that turns expansion on. */
const AURORA_ACF_EXPAND_PARAM = '_acf_expand';

/** ACF field types that hold references to other posts. */
const AURORA_ACF_POST_TYPES = ['relationship', 'post_object', 'page_link'];

/** ACF field types that hold term references. */
const AURORA_ACF_TERM_TYPES = ['taxonomy'];

/** Field types whose sub_fields have to be walked to reach the relations. */
const AURORA_ACF_CONTAINER_TYPES = ['group', 'repeater', 'flexible_content'];

/**
 * Ceiling on how many posts one request will expand. A relation set to
 * `first: 999` would otherwise let a single request run 999 get_fields() calls;
 * past the cap the remaining values are left as ids, which every consumer
 * already knows how to read.
 */
const AURORA_ACF_EXPAND_LIMIT = 200;

add_action('rest_api_init', function () {
	// ACF is not active — leave the REST API exactly as it was.
	if (! function_exists('acf_get_field_groups')) {
		return;
	}
	foreach (get_post_types(['show_in_rest' => true], 'names') as $post_type) {
		// Priority 20, so this runs after ACF has put `acf` on the response.
		add_filter("rest_prepare_{$post_type}", 'aurora_acf_expand_response', 20, 3);
	}
});

/**
 * Rewrites the `acf` payload with relations expanded, when asked.
 *
 * @param WP_REST_Response $response
 * @param WP_Post          $post
 * @param WP_REST_Request  $request
 * @return WP_REST_Response
 */
function aurora_acf_expand_response($response, $post, $request) {
	if (! $request->get_param(AURORA_ACF_EXPAND_PARAM)) {
		return $response;
	}

	$data = $response->get_data();
	if (empty($data['acf']) || ! is_array($data['acf'])) {
		return $response;
	}

	$fields = [];
	foreach (acf_get_field_groups(['post_id' => $post->ID]) as $group) {
		foreach ((array) acf_get_fields($group) as $field) {
			$fields[] = $field;
		}
	}

	$budget = AURORA_ACF_EXPAND_LIMIT;
	$data['acf'] = aurora_acf_walk_fields($fields, $data['acf'], $post->ID, $budget);
	$response->set_data($data);

	return $response;
}

/**
 * Walks a set of ACF field definitions against the values already in the
 * response, expanding the relations it finds.
 *
 * Driven by the field definitions rather than by guessing from the values: a
 * plain number field like `why_aurora.list[].value = 200` must never be mistaken
 * for post 200.
 *
 * @param array $fields  ACF field definitions.
 * @param array $values  The values as they appear in the REST response.
 * @param int   $owner   Post whose fields these are, for cycle avoidance.
 * @param int   $budget  Remaining posts this request may expand (by reference).
 * @return array
 */
function aurora_acf_walk_fields($fields, $values, $owner, &$budget) {
	if (! is_array($values)) {
		return $values;
	}

	foreach ($fields as $field) {
		if (empty($field['name']) || ! array_key_exists($field['name'], $values)) {
			continue;
		}
		$values[$field['name']] = aurora_acf_walk_value(
			$field,
			$values[$field['name']],
			$owner,
			$budget
		);
	}

	return $values;
}

/**
 * One field's value: recursed into if it is a container, expanded if it is a
 * relation, returned untouched otherwise.
 *
 * @param array $field
 * @param mixed $value
 * @param int   $owner
 * @param int   $budget
 * @return mixed
 */
function aurora_acf_walk_value($field, $value, $owner, &$budget) {
	$type = isset($field['type']) ? $field['type'] : '';

	if ('group' === $type) {
		$sub = isset($field['sub_fields']) ? $field['sub_fields'] : [];
		return aurora_acf_walk_fields($sub, $value, $owner, $budget);
	}

	if ('repeater' === $type) {
		if (! is_array($value)) {
			return $value;
		}
		$sub = isset($field['sub_fields']) ? $field['sub_fields'] : [];
		foreach ($value as $index => $row) {
			$value[$index] = aurora_acf_walk_fields($sub, $row, $owner, $budget);
		}
		return $value;
	}

	if ('flexible_content' === $type) {
		if (! is_array($value)) {
			return $value;
		}
		$layouts = [];
		foreach ((array) (isset($field['layouts']) ? $field['layouts'] : []) as $layout) {
			if (! empty($layout['name'])) {
				$layouts[$layout['name']] = isset($layout['sub_fields']) ? $layout['sub_fields'] : [];
			}
		}
		foreach ($value as $index => $row) {
			$name = is_array($row) && isset($row['acf_fc_layout']) ? $row['acf_fc_layout'] : '';
			if (isset($layouts[$name])) {
				$value[$index] = aurora_acf_walk_fields($layouts[$name], $row, $owner, $budget);
			}
		}
		return $value;
	}

	if (in_array($type, AURORA_ACF_POST_TYPES, true)) {
		return aurora_acf_expand_posts($value, $owner, $budget);
	}

	if (in_array($type, AURORA_ACF_TERM_TYPES, true)) {
		return aurora_acf_expand_terms($value);
	}

	return $value;
}

/**
 * Post references → summaries. Preserves whether the field held one value or a
 * list, so the shape the consumer sees only gains detail.
 *
 * @param mixed $value
 * @param int   $owner
 * @param int   $budget
 * @return mixed
 */
function aurora_acf_expand_posts($value, $owner, &$budget) {
	if (empty($value)) {
		return $value;
	}

	$single = ! is_array($value);
	$ids = $single ? [$value] : $value;
	$out = [];

	foreach ($ids as $item) {
		$id = aurora_acf_reference_id($item);
		// Leave it alone past the cap, or if it would point back at its owner.
		if (! $id || $id === (int) $owner || $budget < 1) {
			$out[] = $item;
			continue;
		}
		$post = get_post($id);
		if (! $post) {
			$out[] = $item;
			continue;
		}
		$budget--;
		$out[] = aurora_acf_post_summary($post);
	}

	return $single ? $out[0] : $out;
}

/**
 * One related post, with its own ACF but no further expansion.
 *
 * Carries everything the front end previously needed extra requests for:
 *   * `content` — rendered through the_content, matching what WPGraphQL served
 *     and what wp/v2 puts in `content.rendered`.
 *   * `terms` — the post's assigned taxonomy terms, so a caller reading a
 *     related post's categories does not need a separate /categories request.
 *   * `type_label` — the post type's plural label, which otherwise costs a
 *     /types lookup.
 *
 * @param WP_Post $post
 * @return array
 */
function aurora_acf_post_summary($post) {
	$thumbnail_id = (int) get_post_thumbnail_id($post->ID);
	$post_type = get_post_type_object($post->post_type);
	$summary = [
		'id'             => (int) $post->ID,
		'slug'           => $post->post_name,
		'title'          => get_the_title($post->ID),
		'content'        => aurora_acf_rendered_content($post),
		'type'           => $post->post_type,
		'type_label'     => $post_type ? $post_type->labels->name : $post->post_type,
		'status'         => $post->post_status,
		'date'           => mysql_to_rfc3339($post->post_date),
		'link'           => get_permalink($post->ID),
		'terms'          => aurora_acf_post_terms($post),
		'featured_media' => $thumbnail_id,
		'featured_image' => null,
		'acf'            => function_exists('get_fields')
			? (get_fields($post->ID) ?: [])
			: [],
	];

	if ($thumbnail_id) {
		$url = wp_get_attachment_url($thumbnail_id);
		if ($url) {
			$summary['featured_image'] = [
				'url' => $url,
				'alt' => (string) get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true),
			];
		}
	}

	return $summary;
}

/**
 * A related post's body, rendered the way the_content renders it.
 *
 * @param WP_Post $post
 * @return string
 */
function aurora_acf_rendered_content($post) {
	if ('' === trim((string) $post->post_content)) {
		return '';
	}

	// Saved and restored so rendering a related post cannot leave the main query
	// pointing somewhere else.
	$previous = isset($GLOBALS['post']) ? $GLOBALS['post'] : null;
	$GLOBALS['post'] = $post;
	$rendered = apply_filters('the_content', $post->post_content);
	$GLOBALS['post'] = $previous;

	return (string) $rendered;
}

/**
 * A related post's taxonomy terms, keyed by taxonomy.
 *
 * @param WP_Post $post
 * @return array
 */
function aurora_acf_post_terms($post) {
	$out = [];
	foreach (get_object_taxonomies($post->post_type, 'names') as $taxonomy) {
		$terms = get_the_terms($post->ID, $taxonomy);
		if (! $terms || is_wp_error($terms)) {
			continue;
		}
		$out[$taxonomy] = array_map(function ($term) {
			return [
				'id'   => (int) $term->term_id,
				'name' => $term->name,
				'slug' => $term->slug,
			];
		}, $terms);
	}
	return $out;
}

/**
 * Term references → `{ id, name, slug, taxonomy }`.
 *
 * @param mixed $value
 * @return mixed
 */
function aurora_acf_expand_terms($value) {
	if (empty($value)) {
		return $value;
	}

	$single = ! is_array($value);
	$refs = $single ? [$value] : $value;
	$out = [];

	foreach ($refs as $item) {
		if ($item instanceof WP_Term) {
			$out[] = [
				'id'       => (int) $item->term_id,
				'name'     => $item->name,
				'slug'     => $item->slug,
				'taxonomy' => $item->taxonomy,
			];
			continue;
		}
		$id = aurora_acf_reference_id($item);
		$term = $id ? get_term($id) : null;
		if (! $term || is_wp_error($term)) {
			$out[] = $item;
			continue;
		}
		$out[] = [
			'id'       => (int) $term->term_id,
			'name'     => $term->name,
			'slug'     => $term->slug,
			'taxonomy' => $term->taxonomy,
		];
	}

	return $single ? $out[0] : $out;
}

/**
 * The post/term id behind an ACF reference, which may arrive as an int, a
 * numeric string, an object, or an already-expanded array.
 *
 * @param mixed $item
 * @return int
 */
function aurora_acf_reference_id($item) {
	if (is_numeric($item)) {
		return (int) $item;
	}
	if ($item instanceof WP_Post) {
		return (int) $item->ID;
	}
	if (is_array($item)) {
		if (isset($item['ID'])) {
			return (int) $item['ID'];
		}
		if (isset($item['id'])) {
			return (int) $item['id'];
		}
	}
	if (is_object($item) && isset($item->ID)) {
		return (int) $item->ID;
	}
	return 0;
}
