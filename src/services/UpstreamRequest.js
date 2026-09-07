// Shared outbound-request budget for WordPress (Pressable).
//
// Why this module exists — the 403s during `next build`:
//
// Graphql.service.js and Rest.service.js each used to hold their own Bottleneck
// limiter. A limiter is process state, and it bounded exactly one process's
// traffic, which is not what the numbers implied:
//
//   * The two limiters never saw each other, so one worker could have
//     `maxConcurrent` GraphQL calls *plus* `maxConcurrent` REST calls in flight
//     at once — against the same origin.
//   * `next build` does not render in one process. Static generation is farmed
//     out to worker processes, `max(1, os.cpus().length - 1)` of them by default
//     (getNumberOfWorkers in next/dist/build/index.js), and every worker
//     imports its own copy of these modules and so builds its own limiter.
//
// On an 8-core build machine that is 7 workers × (2 + 4) = 42 simultaneous
// requests to Pressable while the config reads "2". Pressable answers the
// overflow with 403, the retry loop replied to each 403 with three more
// attempts a second apart, and the build died on whichever page happened to be
// rendering.
//
// So: one limiter for both services, and a budget expressed as a whole-build
// total that is divided by the worker count rather than multiplied by it.

import Bottleneck from "bottleneck";
import os from "node:os";
import { AsyncResource } from "node:async_hooks";

/** Simultaneous requests to WordPress across the *entire* build, not per
 *  worker. Raise it only against a build that is provably not being throttled —
 *  this is the number that was effectively ~42 when the 403s started. */
const TOTAL_CONCURRENCY = Number(process.env.WP_MAX_CONCURRENCY) || 6;

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

/** Minimum spacing between two request starts in one worker, in ms.
 *
 *  Build only. A build has thousands of requests to get through and all the
 *  time in the world (staticPageGenerationTimeout is 1000s), so pacing them is
 *  free. A runtime render does not: it has one function budget to render one
 *  page in, and spacing there is pure latency added to a live regeneration. */
const MIN_SPACING_MS = isBuildPhase
	? Number(process.env.WP_MIN_SPACING_MS) || 300
	: Number(process.env.WP_MIN_SPACING_MS) || 0;

/** How many processes are sharing the budget above.
 *
 *  Mirrors Next's own default (`experimental.cpus`, i.e. one worker per core
 *  bar one). Set WP_BUILD_WORKERS to correct it if that ever drifts — guessing
 *  high is the safe direction, since it only makes each worker gentler.
 *
 *  At runtime there is a single server process, so the whole budget is its. */
function workerCount() {
	if (!isBuildPhase) return 1;
	const configured = Number(process.env.WP_BUILD_WORKERS);
	if (configured > 0) return configured;
	return Math.max(1, (os.cpus()?.length || 1) - 1);
}

const maxConcurrent = Math.max(
	1,
	Math.floor(TOTAL_CONCURRENCY / workerCount()),
);

// One limiter for every WordPress call this process makes, GraphQL and REST
// alike. They queue against each other because they contend for one origin.
const limiter = new Bottleneck({ maxConcurrent, minTime: MIN_SPACING_MS });

// if (isBuildPhase) {
// 	console.log(
// 		`[upstream] ${maxConcurrent} concurrent × ${workerCount()} workers ` +
// 			`(budget ${TOTAL_CONCURRENCY}), ${MIN_SPACING_MS}ms apart`,
// 	);
// }

/** Backstop TTL for every cached WordPress response, in seconds.
 *
 *  These responses used to be cached with `revalidate: false` — held forever,
 *  leaving the cache only when /api/revalidate flushed one of their tags. The
 *  comment on that policy claimed a missed tag meant "stale until the next
 *  deploy", and that turned out to be false: the fetch cache key is
 *  [v3, prefix, url, method, headers, …, body] with no build or deployment id
 *  in it (incremental-cache/index.js), and tags are only written on a cache
 *  miss (patch-fetch.js), so a redeploy re-reads the entry the previous build
 *  wrote and never re-tags it. A missed tag meant stale *forever*, with nothing
 *  in the system able to recover it — which is exactly what happened to the
 *  event pages.
 *
 *  A day-long TTL restores the backstop the comment assumed. On-demand
 *  revalidation still makes edits appear immediately; this only bounds how bad
 *  it gets when a tag is missed or a webhook never fires. */
const CACHE_TTL_SECONDS = Number(process.env.WP_CACHE_TTL) || 86400;

/** The cache config every WordPress request is made with. `cache` and
 *  `revalidate` are both set deliberately: either one alone is enough to count
 *  as an explicit config (which is what keeps these cacheable at all), and
 *  `force-cache` with a numeric revalidate is not one of the combinations Next
 *  treats as conflicting — the TTL wins. */
export const upstreamCacheConfig = (tags) => ({
	cache: "force-cache",
	next: { revalidate: CACHE_TTL_SECONDS, tags },
});

// Every number below is split by phase, and for one reason: at build time the
// only budget is the whole build's, so patience is cheap and a stubborn retry
// is worth it. At runtime the budget is a single function invocation rendering
// a single page — maxDuration, 300s, the Pro + Fluid ceiling, see the header of
// any app/**/page.js — and anything spent waiting here is spent out of the
// render's own budget. Blow it and the invocation is killed: no error, no page,
// and the stale HTML an on-demand revalidation just marked for replacement
// stays on the site. That is the failure the 15s default was causing.
//
// 300s is enough headroom that the runtime ladder can be about resilience
// rather than triage: Pressable throttled us 23 times in one build, and a
// regeneration that gives up too early leaves the page stale until the next
// webhook. A full run of the runtime ladder is ~100s worst case, so even a
// badly throttled render still has two thirds of its budget left to render in.

// Abort a request that takes longer than this, so a hanging upstream can't
// stall a background revalidation indefinitely. Both values sit well above the
// slowest legitimate query (some insights queries take ~15s) so this only trips
// on a real hang, not a slow-but-working response.
const REQUEST_TIMEOUT_MS = isBuildPhase ? 60000 : 30000;

const MAX_ATTEMPTS = isBuildPhase ? 4 : 3;
const RETRY_BASE_DELAY_MS = 1000; // 1s, 2s, 4s between attempts

// A 403/429 is not a dropped connection — it is the host saying "stop". Retrying
// it on the same one-second rhythm as a network blip is what turned a brief
// throttle into a failed build, so those get their own, much longer, ladder.
// Build: 5s, 15s, 45s. Runtime: 3s, 9s — still patient enough to outlast a
// short throttle, still far short of the render's budget.
const THROTTLE_STATUSES = new Set([403, 429, 503]);
const THROTTLE_BASE_DELAY_MS = isBuildPhase ? 5000 : 3000;

/** Resolve after `ms` milliseconds. @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Shared cooldown. One throttled response holds back every *other* request in
// this process too — without it the remaining in-flight calls keep hammering a
// host that has already said no, and each of them earns its own 403.
let cooldownUntil = 0;

/** @param {number} ms */
function openCooldown(ms) {
	cooldownUntil = Math.max(cooldownUntil, Date.now() + ms);
}

async function awaitCooldown() {
	// Re-read the deadline each time: a second throttle landing while this one
	// waits should extend the wait, not be slept straight through.
	for (
		let wait = cooldownUntil - Date.now();
		wait > 0;
		wait = cooldownUntil - Date.now()
	) {
		await sleep(wait);
	}
}

// Bottleneck runs a queued job from whichever async context happened to drain
// the queue — the *previous* job's, not the caller's. Next.js keeps its render
// store in an AsyncLocalStorage, so an unbound job either sees another page's
// store or none at all, and `next: { tags }` is then recorded against the wrong
// route (or dropped entirely, because patch-fetch falls straight through to the
// unpatched fetch when there is no store). The pages still render, so nothing
// looks broken — but their prerendered HTML carries the wrong tags and
// revalidateTag() never matches it. AsyncResource.bind pins each job to the
// context that scheduled it.
/** @param {() => Promise<any>} fn */
export const schedule = (fn) => limiter.schedule(AsyncResource.bind(fn));

// There was a `cachedSchedule` here — a build-phase Map of query -> promise, so
// that a query several pages share (getInsightsCategories, the client logos, the
// testimonials) hit the network once per build instead of once per page. It has
// been removed, because a promise cache in front of `fetch` silently steals the
// tags off every page but the first.
//
// patch-fetch.js collects `next.tags` onto the *current* render's prerender
// store, at the top of the patched fetch and before it consults any cache. So
// the tags a prerendered page can later be revalidated by are exactly the tags
// of the fetch calls made during that page's own render. Serve a page from a
// promise another page created and no fetch happens in its render at all: no
// tags collected, nothing written to its .meta, and revalidateTag() has no way
// to reach it. The build output showed it plainly — two pages of the same route,
// same template, same services:
//
//   careers/early-careers/berlin-graduate-analyst-programme   27 tags
//   careers/early-careers/oxford-graduate-analyst-programme    4 tags
//
// Berlin rendered first and did the fetching; Oxford awaited Berlin's promises
// and inherited almost nothing. /careers came out with zero tags — not even
// `alldata`, so no webhook and no manual flush could ever refresh it.
//
// Nothing is lost by removing it: Next's own Data Cache already de-duplicates
// across SSG workers (it is why patch-fetch keeps fetches cacheable while
// `isPrerendering`, and it takes a per-key lock before reading, so two identical
// fetches racing in one worker still only leave once). A repeat is now a Data
// Cache read rather than a round trip — and it registers its tags on the way
// through, which is the whole point.

/** A throttled response's own advice, when it gives any. @param {Response} res */
function retryAfterMs(res) {
	const header = res.headers.get("retry-after");
	if (!header) return 0;
	const seconds = Number(header);
	if (Number.isFinite(seconds)) return seconds * 1000;
	const date = Date.parse(header);
	return Number.isNaN(date) ? 0 : Math.max(0, date - Date.now());
}

/** One WordPress request, with the shared budget, the shared cooldown and
 *  retries applied.
 *
 *  Throws once every attempt is spent, rather than returning undefined, so that
 *  on a background revalidation Next keeps serving the last good page and
 *  retries next time instead of the caller crashing on `data.data.…`.
 *
 *  @param {string} url
 *  @param {RequestInit} init
 *  @param {string} label What to call this request in the logs.
 *  @returns {Promise<Response>} */
export async function fetchUpstream(url, init, label = "request") {
	let lastError;

	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		await awaitCooldown();
		try {
			const res = await fetch(url, {
				...init,
				signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
			});
			if (res.ok) return res;

			const throttled = THROTTLE_STATUSES.has(res.status);
			// The body says which 403 this is — a WAF block, a rate limit, or an
			// expired AUTH_TOKEN all arrive as a bare "403 Forbidden" otherwise, and
			// they need completely different fixes.
			const body = await res.text().catch(() => "");
			const detail = body.trim().slice(0, 300);
			lastError = new Error(
				`${label} failed: ${res.status} ${res.statusText}${
					detail ? ` — ${detail}` : ""
				}`,
			);

			if (throttled && attempt < MAX_ATTEMPTS) {
				const advised = retryAfterMs(res);
				// The host's own Retry-After is honoured, but not without limit:
				// a 120s hint is sound advice for a build and a death sentence for
				// a render, which would be killed still waiting to take it.
				const backoff = Math.min(
					isBuildPhase ? Infinity : 10000,
					advised || THROTTLE_BASE_DELAY_MS * 3 ** (attempt - 1),
				);
				console.warn(
					`[upstream] ${res.status} on ${label}; pausing this worker for ${backoff}ms ` +
						`(attempt ${attempt}/${MAX_ATTEMPTS})`,
				);
				// Hold every other request in this process back too, not just this one.
				openCooldown(backoff);
				continue;
			}
			if (!throttled && attempt < MAX_ATTEMPTS) {
				await sleep(RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
				continue;
			}
			throw lastError;
		} catch (error) {
			lastError = error;
			// An abort or a dropped connection: back off briefly and try again.
			// Pressable dropping one call shouldn't fail the whole page/build.
			console.error(
				`[upstream] ${label} attempt ${attempt}/${MAX_ATTEMPTS} failed:`,
				error?.message || error,
			);
			if (attempt < MAX_ATTEMPTS) {
				await sleep(RETRY_BASE_DELAY_MS * 2 ** (attempt - 1));
			}
		}
	}

	throw lastError;
}
