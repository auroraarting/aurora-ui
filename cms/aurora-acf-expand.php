<?php
/**
 * Plugin Name: Aurora ACF relation expansion
 * Description: Optionally expands ACF relation fields, to a requested depth, in wp/v2 responses, so the front end can read related posts without a request per relation.
 * Version:     2.0.0
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
 *     GET /wp-json/wp/v2/event?slug=some-event&_acf_expand=2
 *
 * The value is the depth: 1 expands a post's relations, 2 also expands the
 * relations of those relations, and so on up to AURORA_ACF_EXPAND_MAX_DEPTH.
 * `_acf_expand=1` behaves exactly as it did before.
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
 * Depth
 * -----
 * Depth is bounded three ways, because relations in this content model do form
 * cycles (an event points at speakers, and a speaker's `articles` point back at
 * posts that point at events):
 *
 *   * the requested depth, capped by AURORA_ACF_EXPAND_MAX_DEPTH;
 *   * AURORA_ACF_EXPAND_LIMIT, a whole-request ceiling on posts expanded;
 *   * an ancestry set, so a branch never expands a post already open above it.
 *
 * Media
 * -----
 * Image, file and gallery fields are normalised to `{ id, url, alt, … }`
 * whatever their return format, because the formats are inconsistent across
 * this site's field groups and two of them lose information:
 *
 *   * a field set to return "URL" gives a bare string, so alt text is gone;
 *   * `get_fields()` returns null for some image sub-fields that ACF's own REST
 *     layer resolves, which is why a nested speaker's `company_logo` used to
 *     come back empty here while /wp/v2/post-speaker had it.
 *
 * Normalising means a consumer never needs a follow-up /media request for alt
 * text, at any depth.
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

/** ACF field types that hold a single attachment reference. */
const AURORA_ACF_MEDIA_TYPES = ['image', 'file'];

/** ACF field types that hold a list of attachment references. */
const AURORA_ACF_GALLERY_TYPES = ['gallery'];

/**
 * Hard ceiling on the requested depth. Depth 2 is what this content model
 * actually needs (event → speaker → the speaker's own images); anything beyond
 * 3 is a mistake in the query string rather than a real requirement.
 */
const AURORA_ACF_EXPAND_MAX_DEPTH = 3;

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
	$requested = $request->get_param(AURORA_ACF_EXPAND_PARAM);
	if (! $requested) {
		return $response;
	}

	$data = $response->get_data();
	if (empty($data['acf']) || ! is_array($data['acf'])) {
		return $response;
	}

	// `_acf_expand=1` is the historical form and stays the default, so a caller
	// that has not asked for more depth sees exactly what it saw before.
	$depth = is_numeric($requested) ? (int) $requested : 1;
	$depth = max(1, min(AURORA_ACF_EXPAND_MAX_DEPTH, $depth));

	$budget = AURORA_ACF_EXPAND_LIMIT;
	$data['acf'] = aurora_acf_walk_fields(
		aurora_acf_field_definitions($post->ID),
		$data['acf'],
		$post->ID,
		$budget,
		$depth,
		[(int) $post->ID => true]
	);
	$response->set_data($data);

	return $response;
}

/**
 * Every top-level ACF field definition that applies to a post.
 *
 * @param int $post_id
 * @return array
 */
function aurora_acf_field_definitions($post_id) {
	if (! function_exists('acf_get_field_groups')) {
		return [];
	}
	$fields = [];
	foreach (acf_get_field_groups(['post_id' => $post_id]) as $group) {
		foreach ((array) acf_get_fields($group) as $field) {
			$fields[] = $field;
		}
	}
	return $fields;
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
 * @param int   $owner    Post whose fields these are, for cycle avoidance.
 * @param int   $budget   Remaining posts this request may expand (by reference).
 * @param int   $depth    Remaining levels of relation expansion.
 * @param array $ancestry Post ids already open above this branch, as a set.
 * @return array
 */
function aurora_acf_walk_fields($fields, $values, $owner, &$budget, $depth = 1, $ancestry = []) {
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
			$budget,
			$depth,
			$ancestry
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
 * @param int   $depth
 * @param array $ancestry
 * @return mixed
 */
function aurora_acf_walk_value($field, $value, $owner, &$budget, $depth = 1, $ancestry = []) {
	$type = isset($field['type']) ? $field['type'] : '';

	if ('group' === $type) {
		$sub = isset($field['sub_fields']) ? $field['sub_fields'] : [];
		return aurora_acf_walk_fields($sub, $value, $owner, $budget, $depth, $ancestry);
	}

	if ('repeater' === $type) {
		if (! is_array($value)) {
			return $value;
		}
		$sub = isset($field['sub_fields']) ? $field['sub_fields'] : [];
		foreach ($value as $index => $row) {
			$value[$index] = aurora_acf_walk_fields($sub, $row, $owner, $budget, $depth, $ancestry);
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
				$value[$index] = aurora_acf_walk_fields($layouts[$name], $row, $owner, $budget, $depth, $ancestry);
			}
		}
		return $value;
	}

	if (in_array($type, AURORA_ACF_POST_TYPES, true)) {
		return aurora_acf_expand_posts($value, $owner, $budget, $depth, $ancestry);
	}

	if (in_array($type, AURORA_ACF_TERM_TYPES, true)) {
		return aurora_acf_expand_terms($value);
	}

	// Media is normalised at every depth. It costs no budget: an attachment has
	// no relations of its own, so it cannot deepen or widen the walk.
	if (in_array($type, AURORA_ACF_MEDIA_TYPES, true)) {
		if (empty($value)) {
			$value = aurora_acf_raw_value($field, $owner);
		}
		return aurora_acf_media_object($value);
	}

	if (in_array($type, AURORA_ACF_GALLERY_TYPES, true)) {
		if (empty($value)) {
			$value = aurora_acf_raw_value($field, $owner);
		}
		if (empty($value) || ! is_array($value)) {
			return $value;
		}
		$out = [];
		foreach ($value as $item) {
			$image = aurora_acf_media_object($item);
			if (null !== $image) {
				$out[] = $image;
			}
		}
		return $out;
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
 * @param int   $depth
 * @param array $ancestry
 * @return mixed
 */
function aurora_acf_expand_posts($value, $owner, &$budget, $depth = 1, $ancestry = []) {
	if (empty($value) || $depth < 1) {
		return $value;
	}

	$single = ! is_array($value);
	$ids = $single ? [$value] : $value;
	$out = [];

	foreach ($ids as $item) {
		$id = aurora_acf_reference_id($item);
		// Leave it as an id past the cap, or where expanding would revisit a post
		// already open further up this branch — that is what makes cycles safe.
		if (! $id || $id === (int) $owner || isset($ancestry[$id]) || $budget < 1) {
			$out[] = $item;
			continue;
		}
		$post = get_post($id);
		if (! $post) {
			$out[] = $item;
			continue;
		}
		$budget--;
		$out[] = aurora_acf_post_summary($post, $budget, $depth - 1, $ancestry + [$id => true]);
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
 * At depth 0 the related post's own ACF is still normalised — media resolved,
 * terms expanded — but its relations are left as ids.
 *
 * @param WP_Post $post
 * @param int     $budget
 * @param int     $depth
 * @param array   $ancestry
 * @return array
 */
function aurora_acf_post_summary($post, &$budget = null, $depth = 0, $ancestry = []) {
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
		'acf'            => aurora_acf_post_acf($post, $budget, $depth, $ancestry),
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
 * A related post's own ACF, walked against its field definitions.
 *
 * Walking rather than returning `get_fields()` verbatim is what fixes nested
 * media: `get_fields()` hands back whatever each field's return format happens
 * to be, and for some image sub-fields on this site it hands back nothing at
 * all. The walk resolves every image, file and gallery to the same object shape
 * and expands any relations still within the remaining depth.
 *
 * @param WP_Post $post
 * @param int     $budget
 * @param int     $depth
 * @param array   $ancestry
 * @return array
 */
function aurora_acf_post_acf($post, &$budget, $depth, $ancestry) {
	if (! function_exists('get_fields')) {
		return [];
	}
	$values = get_fields($post->ID);
	if (! is_array($values)) {
		return [];
	}
	// A null budget means an older caller invoked the summary directly; give the
	// walk a local budget so media still gets normalised.
	if (null === $budget) {
		$local = AURORA_ACF_EXPAND_LIMIT;
		return aurora_acf_walk_fields(
			aurora_acf_field_definitions($post->ID),
			$values,
			$post->ID,
			$local,
			$depth,
			$ancestry
		);
	}
	return aurora_acf_walk_fields(
		aurora_acf_field_definitions($post->ID),
		$values,
		$post->ID,
		$budget,
		$depth,
		$ancestry
	);
}

/**
 * The unformatted value of a top-level field, read straight from meta.
 *
 * This exists because `get_fields()` returns nothing for some image fields that
 * ACF's own REST layer resolves — a nested speaker's `company_logo` was empty
 * here while /wp/v2/post-speaker had it. The raw read recovers the attachment
 * id in that case.
 *
 * Restricted to top-level fields on purpose: ACF identifies a repeater row's
 * sub-field by the same key in every row, so a raw read inside a repeater would
 * return the first row's value for all of them. `parent` is the field group's
 * numeric id for a top-level field and a `field_…` key for a sub-field, which
 * is how the two are told apart.
 *
 * @param array $field
 * @param int   $owner
 * @return mixed
 */
function aurora_acf_raw_value($field, $owner) {
	if (! $owner || empty($field['key']) || ! function_exists('get_field')) {
		return null;
	}
	if (! isset($field['parent']) || ! is_numeric($field['parent'])) {
		return null;
	}
	return get_field($field['key'], (int) $owner, false);
}

/**
 * An attachment reference → a consistent object, whatever the field's return
 * format was.
 *
 * ACF may hand over an id, an attachment array, or a bare url. The url form has
 * lost the attachment id, so it is looked back up — that is the only way to
 * recover alt text for a field set to return "URL", and it is what let a nested
 * speaker photo arrive without one.
 *
 * @param mixed $value
 * @return array|null
 */
function aurora_acf_media_object($value) {
	if (empty($value)) {
		return null;
	}

	// Already an attachment array from ACF: keep it, but guarantee url and alt.
	if (is_array($value) && (isset($value['url']) || isset($value['ID']) || isset($value['id']))) {
		$id = aurora_acf_reference_id($value);
		$url = isset($value['url']) ? $value['url'] : ($id ? wp_get_attachment_url($id) : '');
		if (! $url) {
			return null;
		}
		if (! isset($value['alt']) || '' === $value['alt']) {
			$value['alt'] = $id
				? (string) get_post_meta($id, '_wp_attachment_image_alt', true)
				: '';
		}
		$value['url'] = $url;
		if ($id) {
			$value['id'] = (int) $id;
			$value['ID'] = (int) $id;
		}
		return $value;
	}

	$id = 0;
	if (is_numeric($value)) {
		$id = (int) $value;
	} elseif (is_string($value)) {
		// A "URL" return format. attachment_url_to_postid costs a query, so it
		// only runs for this format, and only when the url is local.
		$id = (int) attachment_url_to_postid($value);
		if (! $id) {
			return ['id' => 0, 'url' => $value, 'alt' => '', 'title' => ''];
		}
	} else {
		$id = aurora_acf_reference_id($value);
	}

	if (! $id) {
		return null;
	}
	$url = wp_get_attachment_url($id);
	if (! $url) {
		return null;
	}
	$attachment = get_post($id);

	return [
		'id'        => $id,
		'ID'        => $id,
		'url'       => $url,
		'alt'       => (string) get_post_meta($id, '_wp_attachment_image_alt', true),
		'title'     => $attachment ? $attachment->post_title : '',
		'filename'  => wp_basename($url),
		'mime_type' => $attachment ? $attachment->post_mime_type : '',
	];
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
 * Term references → `{ id, name, slug, taxonomy, acf }`.
 *
 * The `acf` is what makes the download-type icons reachable: the icon lives on
 * the `eventdownload` term, not on the event, so without it a caller had to
 * fetch /wp/v2/eventdownload separately.
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
		$term = $item instanceof WP_Term ? $item : null;
		if (! $term) {
			$id = aurora_acf_reference_id($item);
			$term = $id ? get_term($id) : null;
		}
		if (! $term || is_wp_error($term)) {
			$out[] = $item;
			continue;
		}
		$out[] = [
			'id'       => (int) $term->term_id,
			'name'     => $term->name,
			'slug'     => $term->slug,
			'taxonomy' => $term->taxonomy,
			'acf'      => aurora_acf_term_acf($term),
		];
	}

	return $single ? $out[0] : $out;
}

/**
 * A term's own ACF, with its media normalised the same way a post's is.
 *
 * Terms cannot hold relations in this content model, so there is no depth to
 * carry here — only the media normalisation, which is what the icons need.
 *
 * @param WP_Term $term
 * @return array
 */
function aurora_acf_term_acf($term) {
	if (! function_exists('get_fields')) {
		return [];
	}
	$values = get_fields('term_' . $term->term_id);
	if (! is_array($values)) {
		return [];
	}
	$fields = [];
	if (function_exists('acf_get_field_groups')) {
		foreach (acf_get_field_groups(['taxonomy' => $term->taxonomy]) as $group) {
			foreach ((array) acf_get_fields($group) as $field) {
				$fields[] = $field;
			}
		}
	}
	$budget = 0; // No relations are expanded from a term; media costs nothing.
	return aurora_acf_walk_fields($fields, $values, 0, $budget, 0, []);
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
