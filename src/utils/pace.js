// Pacing for outbound WordPress calls.
//
// Pressable answers a burst with 429, and once its bot protection trips, with a
// 403 "Checking your browser..." challenge page — which a server-rendered fetch
// cannot solve, so the query simply fails. Spacing the calls a page needs keeps
// the request rate under whatever the per-IP window actually is.
//
// This is deliberately page-level and separate from the Bottleneck limiter in
// services/Graphql.service.js. The limiter caps how many calls are in flight at
// once; it does not slow a strictly sequential chain, because such a chain never
// has more than one call in flight to begin with. Only an explicit wait does.
//
// The cost is render time, paid out of the route's `maxDuration` (300s — see the
// header of any app/**/page.js). A page awaiting six services at ~2.5-11s each
// plus five pauses lands well inside that, but it is real latency on a cold
// request and on every ISR regeneration.

// Runtime only — and this part is load-bearing.
//
// A prerender renders every page in the same process, so these pauses would
// multiply by the page count: ~974 pages x 3-4 pauses is 50-65 minutes of pure
// sleeping added to a build that also has to wait out the rate limiter. Vercel
// stops a build at 45 minutes, so leaving them on during a build does not slow
// it down, it stops it finishing at all.
//
// Nothing is lost by skipping them there. The Bottleneck limiters in
// Graphql.service.js / Rest.service.js already space every request by their
// minTime, and a build is one process, so that spacing is the whole-build rate.
// The page-level pause exists for the runtime case, where a single render's
// handful of calls is what has to stay under the ceiling.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

/** Wait between two WordPress calls. No-op during `next build`.
 *  @param {number} [ms] */
export const pause = (ms = 1000) =>
	isBuildPhase ? Promise.resolve() : new Promise((resolve) => setTimeout(resolve, ms));
