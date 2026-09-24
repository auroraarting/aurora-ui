<?php
/**
 * Plugin Name: Aurora on-demand revalidation
 * Description: Tells the Next.js front end which cache tags changed, distinguishing an edit from a change in collection membership.
 * Version:     1.0.0
 *
 * Install as an mu-plugin: /srv/htdocs/wp-content/mu-plugins/aurora-revalidate.php
 *
 * Why this exists
 * ---------------
 * The front end stores every REST response with no expiry and a set of cache
 * tags, so nothing goes stale on a timer — content refreshes only when this
 * plugin says it changed. Getting the tags right is therefore the difference
 * between one edit costing a handful of upstream calls and costing hundreds.
 *
 * The rule
 * --------
 * Three tag shapes, and which ones are sent depends on what happened:
 *
 *     post:my-slug   that entry's own page
 *     post#123       the by-id fetches that resolve ACF relation pickers,
 *                    which only ever see ids
 *     post           the listings, and anything else reading the collection
 *
 *     EDITED                       -> post:my-slug, post#123
 *     CREATED / DELETED /          -> post:my-slug, post#123, post
 *     TRASHED / UNTRASHED
 *
 * An edit changes one entry, so it refreshes that entry's page and the
 * relations pointing at it — nothing else. Only a change in *membership* can
 * alter what a listing answers, so only those send the collection tag.
 *
 * The consequence, stated plainly: editing a post's title does not refresh the
 * listings showing it. That is deliberate — it is what stops a single edit
 * invalidating every listing on the site. Filter `aurora_revalidate_tags` if a
 * particular post type needs the stricter behaviour.
 *
 * Configuration
 * -------------
 *     define('AURORA_REVALIDATE_URL', 'https://auroraer.com/api/revalidate');
 *     define('AURORA_REVALIDATE_SECRET', '…');   // matches REVALIDATE_SECRET
 *
 * Requests are fired non-blocking, so saving a post is never slowed down or
 * failed by the front end being unreachable.
 */

if (! defined('ABSPATH')) {
	exit;
}

/**
 * WordPress post type / taxonomy name to the tag the front end uses.
 *
 * Kept in step with contentTags in src/services/rest/tags.js — the two halves
 * of this system have to agree on the vocabulary, and the names differ because
 * the front end's are the ones WPGraphQL exposed.
 */
function aurora_revalidate_tag_map() {
	return [
		'page'             => 'page',
		'post'             => 'post',
		'category'         => 'category',
		'post_tag'         => 'post-tag',
		'attachment'       => 'media',
		'services'         => 'service',
		'softwares'        => 'software',
		'products'         => 'product',
		'country'          => 'country',
		'region'           => 'region',
		'offices'          => 'office',
		'team'             => 'team',
		'teamsector'       => 'team',
		'event'            => 'event',
		'eventscategory'   => 'event-category',
		'eventdownload'    => 'event-download',
		'tribe_events'     => 'webinar',
		'webinar-tag'      => 'webinar-tag',
		'tribe_events_cat' => 'webinar-category',
		'podcast'          => 'podcast',
		'video'            => 'video',
		'video-category'   => 'video-category',
		'whoareyou'        => 'whoareyou',
		'howwehelp'        => 'howwehelp',
		'early-career'     => 'early-career',
		'program'          => 'program',
		'testimonial'      => 'testimonial',
		'clients-logo'     => 'client-logo',
		'post-speaker'     => 'speaker',
		'post-author'      => 'author',
		'language'         => 'language',
	];
}

/**
 * The tags for one change.
 *
 * @param string $type       Post type or taxonomy name.
 * @param string $slug       The entry's slug.
 * @param int    $id         The entry's database id.
 * @param bool   $membership True when the entry entered or left the collection.
 * @return string[]
 */
function aurora_revalidate_tags_for($type, $slug, $id, $membership) {
	$map = aurora_revalidate_tag_map();
	if (! isset($map[$type])) {
		return [];
	}
	$base = $map[$type];

	$tags = [];
	if ($slug) {
		$tags[] = "{$base}:{$slug}";
	}
	if ($id) {
		$tags[] = "{$base}#{$id}";
	}
	if ($membership) {
		$tags[] = $base;
	}

	/**
	 * Filter the tags sent for one change.
	 *
	 * Add $base here to make a post type refresh its listings on every edit.
	 */
	return apply_filters('aurora_revalidate_tags', $tags, $type, $slug, $id, $membership);
}

/**
 * POST the tags to the front end, without blocking the save.
 *
 * @param string[] $tags
 * @return void
 */
function aurora_revalidate_send($tags) {
	$tags = array_values(array_unique(array_filter($tags)));
	if (! $tags || ! defined('AURORA_REVALIDATE_URL') || ! AURORA_REVALIDATE_URL) {
		return;
	}

	$headers = ['Content-Type' => 'application/json'];
	if (defined('AURORA_REVALIDATE_SECRET') && AURORA_REVALIDATE_SECRET) {
		$headers['x-revalidate-secret'] = AURORA_REVALIDATE_SECRET;
	}

	wp_remote_post(AURORA_REVALIDATE_URL, [
		// Never let the front end being down block an editor's save.
		'blocking' => false,
		'timeout'  => 1,
		'headers'  => $headers,
		'body'     => wp_json_encode(['tags' => $tags]),
	]);
}

/**
 * A post was saved.
 *
 * `wp_after_insert_post` rather than `save_post`, because it runs after terms
 * and meta are written — ACF included — so the front end refetches a complete
 * row rather than racing the rest of the save.
 *
 * Membership changes are detected from the status transition, not from
 * $update: a scheduled post becoming `publish`, or a post being restored from
 * the trash, both change what a listing answers while `$update` is true.
 */
add_action('wp_after_insert_post', 'aurora_revalidate_post', 20, 4);
function aurora_revalidate_post($post_id, $post, $update, $post_before) {
	if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
		return;
	}
	if ('auto-draft' === $post->post_status) {
		return;
	}

	$was = $post_before ? $post_before->post_status : 'new';
	$now = $post->post_status;

	// Visible to the front end, i.e. present in a listing.
	$was_public = ('publish' === $was);
	$now_public = ('publish' === $now);

	// Entered or left the collection — including a first publish, a trash, an
	// untrash, and a slug change, which moves the entry to a different URL.
	$membership = ($was_public !== $now_public)
		|| (! $update)
		|| ($post_before && $post_before->post_name !== $post->post_name);

	$tags = aurora_revalidate_tags_for($post->post_type, $post->post_name, $post_id, $membership);

	// A slug change leaves the old URL's page cached under the old tag, so it
	// is named as well; otherwise the front end keeps serving the stale route.
	if ($post_before && $post_before->post_name && $post_before->post_name !== $post->post_name) {
		$map = aurora_revalidate_tag_map();
		if (isset($map[$post->post_type])) {
			$tags[] = $map[$post->post_type] . ':' . $post_before->post_name;
		}
	}

	aurora_revalidate_send($tags);
}

/**
 * A post was deleted outright, which is always a membership change.
 */
add_action('before_delete_post', 'aurora_revalidate_deleted_post', 10, 2);
function aurora_revalidate_deleted_post($post_id, $post) {
	if (! $post || wp_is_post_revision($post_id)) {
		return;
	}
	aurora_revalidate_send(
		aurora_revalidate_tags_for($post->post_type, $post->post_name, $post_id, true)
	);
}

/**
 * Terms follow the same rule: editing a term's name is an edit, creating or
 * deleting one changes what the filter lists answer.
 */
add_action('created_term', 'aurora_revalidate_term_membership', 10, 3);
add_action('delete_term', 'aurora_revalidate_term_membership', 10, 3);
function aurora_revalidate_term_membership($term_id, $tt_id, $taxonomy) {
	$term = get_term($term_id, $taxonomy);
	$slug = ($term && ! is_wp_error($term)) ? $term->slug : '';
	aurora_revalidate_send(aurora_revalidate_tags_for($taxonomy, $slug, $term_id, true));
}

add_action('edited_term', 'aurora_revalidate_term_edit', 10, 3);
function aurora_revalidate_term_edit($term_id, $tt_id, $taxonomy) {
	$term = get_term($term_id, $taxonomy);
	$slug = ($term && ! is_wp_error($term)) ? $term->slug : '';
	aurora_revalidate_send(aurora_revalidate_tags_for($taxonomy, $slug, $term_id, false));
}
