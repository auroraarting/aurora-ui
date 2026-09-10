/**
 * The site's own REST namespace, `aurora/v1`.
 *
 * Two routes live there, both already installed on the CMS, and both supply
 * something wp/v2 cannot:
 *
 *   /aurora/v1/languages       WPML's language list. wp/v2 has no equivalent —
 *                              a post's `translations` field only names the
 *                              languages *that post* is translated into.
 *   /aurora/v1/filter-options  the six option lists the filter dropdowns are
 *                              built from, in one request instead of six.
 *
 * REST_API_URL points at the wp/v2 namespace, so the base is derived from it
 * rather than configured separately — one URL to change per environment.
 */

/** Base URL for the aurora/v1 namespace, derived from REST_API_URL. */
export const auroraBaseUrl = () =>
	String(process.env.REST_API_URL || "").replace(/\/wp\/v2\/?$/, "/aurora/v1");
