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
 * Both knobs are env vars so pacing can be tuned on Vercel without a deploy:
 *   WP_REST_CONCURRENCY   parallel calls        (build: 1, runtime: 3)
 *   WP_REST_PAUSE_MS      gap after each call   (build: 100, runtime: 0)
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

export const pauseMs = toInt(process.env.WP_REST_PAUSE_MS, isBuild ? 100 : 0);

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
		`[wp-rest] concurrency=${concurrency} pause=${pauseMs}ms (build phase)`,
	);
}
