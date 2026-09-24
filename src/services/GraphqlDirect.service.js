import pLimit from "p-limit";

import { ServerHeaders } from "@/utils/RequestHeaders";

import { tagsFor } from "./rest/tags";

/**
 * GraphQL without the Redis hop, paced and cacheable.
 *
 * A drop-in alternative to GraphQLAPI in Graphql.service.js, which is left
 * exactly as it is — switching a service over is a one-line import change, and
 * switching back is the same. Both can be in use at once.
 *
 * Why this exists
 * ---------------
 * One GraphQL query answers what a dozen REST calls do, and the host counts
 * requests per IP, so for a build the request count matters more than the size
 * of each response. Measured against this CMS: a REST call is ~1.5-1.8s and a
 * page needs 15-24 of them; a GraphQL query is ~2s and a page needs 2-6.
 *
 * Two deliberate differences from GraphQLAPI:
 *
 *   - **No Redis.** GraphQLAPI posts every query to REDIS_URL/api/cache. That
 *     is fast (~400ms), but the response is then a cached body Next.js knows
 *     nothing about, so nothing is taggable. This goes to the origin.
 *
 *   - **GET, not POST, whenever the query fits in a URL.** This is the part
 *     that makes on-demand revalidation possible at all: Next.js does not
 *     cache POST fetches, and an uncached fetch cannot carry cache tags. Over
 *     GET the response lands in the Data Cache with tags, exactly like the
 *     REST layer, and /api/revalidate reaches it.
 *
 *     WPGraphQL accepts queries over GET (verified against this CMS: same 200,
 *     same body), and this host accepts urls well past 16k characters. With
 *     whitespace collapsed, every one of this app's 84 queries encodes to
 *     under 12k — the largest is 9,703 — so all of them travel as cacheable,
 *     taggable GETs. The POST fallback below exists for a query that grows
 *     past the limit later; nothing takes it today.
 *
 * Pacing
 * ------
 * One request at a time with a 2s gap between starts, matching the discipline
 * the REST layer uses. Fewer, larger requests is the whole point, so the gap
 * can be generous without costing much: six queries at 2s apart is 12s of
 * pacing for a page that would otherwise make twenty REST calls.
 *
 *   GQL_CONCURRENCY      parallel queries          (default 1)
 *   GQL_MIN_INTERVAL_MS  gap between starts        (default 2000)
 *   GQL_MAX_URL          longest GET url to build  (default 6000)
 */

/** @param {string|undefined} value @param {number} fallback */
const toInt = (value, fallback) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

const concurrency = Math.max(1, toInt(process.env.GQL_CONCURRENCY, 1));
const minIntervalMs = toInt(process.env.GQL_MIN_INTERVAL_MS, 2000);

/**
 * Above this the query goes by POST, losing caching and tags with it.
 *
 * Measured rather than assumed: this CMS answered 200 with no errors for GET
 * urls of 6k, 8k, 10k, 12k and 16k characters, so the ceiling is somewhere
 * above 16k. The largest query this app sends is 9,703 encoded characters
 * (getSingleSoftwareByLanguage), and all 84 of them are under 12k — so at this
 * setting every query is a cacheable, taggable GET and the POST path below is
 * a fallback that nothing currently takes.
 *
 * It was briefly 6,000, which was a guess, and it pushed the three largest
 * queries onto POST for no reason.
 */
const maxUrlLength = toInt(process.env.GQL_MAX_URL, 12000);

const requestTimeoutMs = 60000;
const maxAttempts = 3;
const maxThrottleAttempts = 5;
const retryBaseDelayMs = 1000;
const throttleBaseDelayMs = 10000;

const limit = pLimit(concurrency);

/** @param {number} ms */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** When the next query may start. */
let nextSlotAt = 0;

/** Claim a pacing slot. Reserved before the await so simultaneous callers
 *  queue behind each other rather than all reading the same timestamp. */
async function takeSlot() {
	if (!minIntervalMs) return;
	const now = Date.now();
	const at = Math.max(now, nextSlotAt);
	nextSlotAt = at + minIntervalMs;
	if (at > now) await sleep(at - now);
}

/** Squeeze the whitespace out of a query so more of them fit in a URL. Safe
 *  for GraphQL, where newlines and runs of spaces are token separators.
 *  @param {string} query */
const compact = (query) => String(query ?? "").replace(/\s+/g, " ").trim();

/** Throttling, WAF blocks and transient upstream faults are worth retrying; a
 *  400 from a malformed query is not. 403 is here because the WAF returns it
 *  under load, not because the credentials are wrong.
 *  @param {number} status */
const isRetryable = (status) =>
	status === 429 || status === 403 || status === 408 || status >= 500;

/** @param {number} attempt @param {number} [status] */
const backoffMs = (attempt, status) =>
	Math.min(
		(status === 429 || status === 403 ? throttleBaseDelayMs : retryBaseDelayMs) *
			2 ** (attempt - 1),
		30000,
	);

const logging = (process.env.WP_REST_LOG ?? "1") !== "0";
let requestNo = 0;

/**
 * One GraphQL query, paced, retried, and cached when it can be.
 *
 * @param {string} query the GraphQL document
 * @param {object} [dataObj]
 * @param {string} [dataObj.apiID] content type, for the cache tag — see rest/tags
 * @param {string} [dataObj.slug] single item, for the item-level tag
 * @param {Array<number|string>} [dataObj.ids] items a by-id query names
 * @param {string[]} [dataObj.tags] extra cache tags
 * @param {string} [dataObj.pageID] accepted for signature parity with
 *   GraphQLAPI, which used it as part of the Redis key; unused here
 * @returns {Promise<any>} the raw `{ data }` envelope the services expect
 */
export default async function GraphQLDirectAPI(query, dataObj = {}) {
	const endpoint = process.env.API_URL;
	if (!endpoint) {
		throw new Error(
			"API_URL is not set. The GraphQL endpoint is required, e.g. " +
				"https://cms-production.auroraer.com/graphql — set it in the " +
				"deployment's environment variables.",
		);
	}

	const document = compact(query);
	const url = `${endpoint}?query=${encodeURIComponent(document)}`;
	const useGet = url.length <= maxUrlLength;
	const tags = tagsFor(dataObj);

	return limit(async () => {
		await takeSlot();

		let lastError;
		let attempts = maxAttempts;
		for (let attempt = 1; attempt <= attempts; attempt++) {
			const id = ++requestNo;
			const startedAt = Date.now();
			if (logging) {
				console.log(
					`[graphql] #${id} → ${useGet ? "GET" : "POST"} ${dataObj.apiID || "query"}` +
						` ${document.length}B${attempt > 1 ? ` retry ${attempt}/${attempts}` : ""}`,
				);
			}
			try {
				const res = await fetch(useGet ? url : endpoint, {
					method: useGet ? "GET" : "POST",
					headers: ServerHeaders.headers,
					signal: AbortSignal.timeout(requestTimeoutMs),
					...(useGet
						? // Cached and taggable, which is the whole reason for GET.
						{ cache: "force-cache", next: { tags } }
						: // A POST is neither, so it re-runs on every render.
						{ body: JSON.stringify({ query: document }), cache: "no-store" }),
				});
				if (!res.ok) {
					const err = new Error(
						`GraphQL ${useGet ? "GET" : "POST"} failed: ${res.status} ${res.statusText}`,
					);
					err.status = res.status;
					throw err;
				}
				const body = await res.json();
				if (logging) {
					console.log(
						`[graphql] #${id} ← ${res.status} ${dataObj.apiID || "query"} in ${Date.now() - startedAt}ms`,
					);
				}
				// GraphQL reports failures in the body with a 200, so a query that
				// resolved nothing is surfaced rather than returned as empty data.
				if (body?.errors?.length && body.data == null) {
					const err = new Error(`GraphQL errors: ${body.errors[0]?.message}`);
					err.status = 400;
					throw err;
				}
				return body;
			} catch (error) {
				lastError = error;
				if (logging) {
					console.log(
						`[graphql] #${id} ✗ ${error?.status || "ERR"} ${dataObj.apiID || "query"}` +
							` after ${Date.now() - startedAt}ms`,
					);
				}
				if (error?.status === 429 || error?.status === 403) {
					attempts = Math.max(attempts, maxThrottleAttempts);
				}
				const retryable = !error?.status || isRetryable(error.status);
				if (!retryable || attempt === attempts) break;
				await sleep(backoffMs(attempt, error?.status));
			}
		}
		console.error(`[graphql] giving up: ${lastError?.message || lastError}`);
		throw lastError;
	});
}

/** Whether a given query would be sent as a cacheable GET. Exported so a
 *  service can be checked without running it. @param {string} query */
export const wouldUseGet = (query) =>
	`${process.env.API_URL || ""}?query=${encodeURIComponent(compact(query))}`.length <=
	maxUrlLength;
