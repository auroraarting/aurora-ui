import pLimit from "p-limit";

/**
 * Outbound pacing for every WordPress REST call.
 *
 * One shared p-limit queue per process, so nothing can bypass it. During
 * `next build` the concurrency is 1: hundreds of static pages resolve their
 * data at once, and firing those together is what produced the 429s (and
 * Wordfence 403s) on Pressable. Serialising them makes the build slower but
 * finite.
 *
 * At runtime the default is higher — the limiter is per-process, so a
 * concurrency of 1 there would make simultaneous visitors queue behind each
 * other for no benefit. It is only 3, though: Pressable returned 429s for
 * plain REST reads at 6, so the ceiling here is the host's, not Next's.
 *
 * On top of the concurrency cap there is a **rate limit**: at most one request
 * per second during a build, measured between request *starts*. Concurrency
 * alone does not bound a rate — one slot still fires as fast as WordPress can
 * answer, and a cheap 12-byte response comes back in well under a second — so
 * this is what actually holds the line against Pressable's per-IP quota.
 *
 * It is global rather than per endpoint. What the host counts is requests from
 * this IP, not requests to /event; a per-endpoint limit would let a page
 * touching six endpoints still burst six at once.
 *
 * The limit applies to a build by default and is off at runtime, where it
 * would be actively harmful: a page resolving fourteen calls would take
 * fourteen seconds on a cold cache. Set WP_REST_MIN_INTERVAL_MS to enable it
 * there if a host ever needs it.
 *
 * All the knobs are env vars so pacing can be tuned on Vercel without a deploy:
 *   WP_REST_CONCURRENCY      parallel calls           (build: 1, runtime: 3)
 *   WP_REST_MIN_INTERVAL_MS  gap between starts       (build: 1000, runtime: 0)
 *   WP_REST_PAUSE_MS         gap after each call      (build: 0, runtime: 0)
 */

/** @param {string|undefined} value @param {number} fallback */
const toInt = (value, fallback) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

/** True while `next build` is generating static pages. */
export const isBuild = process.env.NEXT_PHASE === "phase-production-build";

export const concurrency = Math.max(
	1,
	toInt(process.env.WP_REST_CONCURRENCY, isBuild ? 1 : 3),
);

// Superseded by minIntervalMs below, which spaces requests properly rather
// than adding to however long the last one took. Kept as a knob because it is
// the only way to add a gap *after* a response, which a host that throttles on
// connection count rather than request rate would want.
export const pauseMs = toInt(process.env.WP_REST_PAUSE_MS, 0);

/** Smallest gap between two request starts. */
export const minIntervalMs = toInt(
	process.env.WP_REST_MIN_INTERVAL_MS,
	isBuild ? 1000 : 0,
);

/** When the next request may start. */
let nextSlotAt = 0;

/**
 * Hold until this request's turn in the rate limit.
 *
 * The slot is claimed before the await, so concurrent callers each reserve a
 * distinct one and queue behind each other rather than all reading the same
 * timestamp and starting together. Spacing is measured from the start of a
 * request, not its end, so a slow response does not push the next one further
 * out than the limit requires.
 */
async function takeSlot() {
	if (!minIntervalMs) return;
	const now = Date.now();
	const at = Math.max(now, nextSlotAt);
	nextSlotAt = at + minIntervalMs;
	if (at > now) await sleep(at - now);
}

const limit = pLimit(concurrency);

/** @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Queue one upstream call. The pause is held inside the slot (not after
 * releasing it) so it actually spaces requests out rather than just delaying
 * the caller.
 *
 * @template T
 * @param {() => Promise<T>} fn
 * @returns {Promise<T>}
 */
export function schedule(fn) {
	return limit(async () => {
		await takeSlot();
		try {
			return await fn();
		} finally {
			if (pauseMs) await sleep(pauseMs);
		}
	});
}

/** Queue depth, for logging a slow build. */
export const pending = () => ({ active: limit.activeCount, queued: limit.pendingCount });

if (isBuild) {
	console.log(
		`[wp-rest] concurrency=${concurrency} rate=${
			minIntervalMs ? `1 per ${minIntervalMs}ms` : "unlimited"
		} pause=${pauseMs}ms (build phase)`,
	);
}
