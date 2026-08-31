<?php
/**
 * Plugin Name: Aurora SCF REST exposure
 * Description: Exposes every Secure Custom Fields / ACF field group on the wp/v2 REST API, so the front end can read custom fields without WPGraphQL.
 * Version:     1.0.0
 *
 * Install as an mu-plugin (wp-content/mu-plugins/aurora-scf-rest.php) so it
 * loads on every request and cannot be deactivated by accident.
 *
 * Why this exists
 * ---------------
 * Field groups carry a per-group "Show in REST API" setting, and most of this
 * site's groups have it off. Where it is off, wp/v2 returns `"acf": []` for the
 * post and the fields are simply unreachable — while WPGraphQL exposes them
 * regardless. That blocks porting any service whose data lives in those groups.
 *
 * Groups currently reachable over REST: posts, softwares, testimonial, and the
 * "software" page. Not reachable, and needed by the remaining conversions:
 *   * country            → getRegions (map, markers, bannerSection, hideonglobalpresence)
 *   * products, services → getRegions markers and getInsights postFields.poweredBy
 *   * post-author, post-speaker → getInsights postFields.authors / .speakers
 *   * clients-logo       → nothing today (only its featured image is read)
 *   * page "bundles"     → getBundlesSection
 *
 * Turning the setting on per group in the admin has exactly the same effect; this
 * file just does it for every group at once so the two APIs agree, and keeps
 * agreeing when a new group is added.
 *
 * Note this only widens what wp/v2 returns for custom fields. It grants no new
 * capability: REST already respects post status and read permissions, and these
 * groups are already public through WPGraphQL.
 */

if (! defined('ABSPATH')) {
	exit;
}

add_filter('acf/load_field_group', function ($group) {
	$group['show_in_rest'] = 1;
	return $group;
});
