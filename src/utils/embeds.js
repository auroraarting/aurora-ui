/**
 * Rewrites third-party video embed URLs coming out of the CMS into their
 * privacy-preserving equivalents.
 *
 * Why this exists: CookieYes auto-blocks an iframe purely by matching its URL
 * against a provider list. The check is
 *
 *   hasAttribute("data-cookieyes") && categoryBlocked(...)  ||  providerMatches(src)
 *
 * — an OR, not an exemption — so `data-cookieyes="cookieyes-necessary"` on an
 * iframe does NOT unblock it while the src still matches a provider. The only
 * thing that keeps an embed alive pre-consent is a URL that isn't tracked in
 * the first place.
 */

/** Pull a YouTube video id out of any of the URL shapes WordPress emits. */
function youTubeId(url) {
	const patterns = [
		/youtube\.com\/embed\/([\w-]{6,})/i,
		/youtube\.com\/watch\?[^#]*\bv=([\w-]{6,})/i,
		/youtu\.be\/([\w-]{6,})/i,
	];
	for (const re of patterns) {
		const m = url.match(re);
		if (m) return m[1];
	}
	return null;
}

/**
 * Normalize a single iframe src.
 * - YouTube  → youtube-nocookie.com (privacy-enhanced mode: no tracking
 *   cookies until the visitor actually presses play).
 * - Vimeo    → adds `dnt=1` so the player sets no analytics cookies.
 * Anything else is returned untouched.
 *
 * @param {string} src
 * @returns {string}
 */
export function normalizeEmbedSrc(src) {
	if (!src || typeof src !== "string") return src;

	// Protocol-relative URLs would otherwise fail to parse.
	const absolute = src.startsWith("//") ? `https:${src}` : src;

	let url;
	try {
		url = new URL(absolute, "https://placeholder.invalid");
	} catch {
		return src;
	}

	const host = url.hostname.toLowerCase();

	if (host.includes("youtube.com") || host.includes("youtu.be")) {
		const id = youTubeId(absolute);
		if (!id) return src;
		const next = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
		// Carry over playback params, dropping the id key from /watch?v= links.
		url.searchParams.forEach((value, key) => {
			if (key !== "v") next.searchParams.set(key, value);
		});
		return next.toString();
	}

	if (host.includes("vimeo.com")) {
		url.searchParams.set("dnt", "1");
		return url.toString();
	}

	return src;
}

/**
 * html-react-parser `replace` handler that runs every CMS iframe through
 * normalizeEmbedSrc. Also adds lazy-loading, which CMS embeds rarely carry.
 */
export function replaceCmsEmbeds(node) {
	if (node.type !== "tag" || node.name !== "iframe" || !node.attribs?.src) {
		return undefined;
	}
	const src = normalizeEmbedSrc(node.attribs.src);
	if (src === node.attribs.src && node.attribs.loading) return undefined;
	node.attribs.src = src;
	node.attribs.loading = node.attribs.loading || "lazy";
	return undefined; // keep default rendering, with the mutated attributes
}
