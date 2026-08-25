// Destinations for the Battery Benchmark CTAs, kept in one place so the
// Flexplorer card, the closing CTA band and the chart footer stay in sync.

/** EOS sign-in. */
export const EOS_LOGIN_URL = "https://eos.auroraer.com/dragonfly/login/";

/** Pardot form for "Request a Flexplorer demo", shown in the iframe modal. */
export const FLEXPLORER_DEMO_FORM =
	"https://go.auroraer.com/l/885013/2026-03-10/qk5rv";

/** Where the demo CTA points if the form can't be embedded. */
export const FLEXPLORER_PRODUCT_URL =
	"https://auroraer.com/products/flexible-energy";

/**
 * Vimeo id for the Flexplorer product video shown in the closing CTA band —
 * the full cut, not the version with Mike. Numbers only, e.g. "123456789";
 * for an unlisted video Vimeo also needs the hash, as "123456789/abcdef1234".
 *
 * Left empty until Aurora supply the video: while it is blank the CTA band
 * falls back to the feature grid rather than rendering an empty column.
 */
export const FLEXPLORER_VIDEO_ID = "https://vimeo.com/1208038046/54eef817cd";

const FLEXPLORER_BASE = "https://eos.auroraer.com/dragonfly/flexplorer";

/**
 * Deep link into Flexplorer for the market currently on screen.
 *
 * Backcast lands on the benchmarks view. Real Performance goes to leaderboards
 * instead — that view doesn't take an index in the URL, so the region is as
 * specific as the link can get.
 *
 * @param {string} region - API region code, e.g. "gbr"
 * @param {string} benchmarkType - "backcast" | anything else (real performance)
 * @returns {string}
 */
export function flexplorerChartUrl(region, benchmarkType = "backcast") {
	const view = benchmarkType === "backcast" ? "benchmarks" : "leaderboards";
	const url = new URL(`${FLEXPLORER_BASE}/${view}`);
	if (region) url.searchParams.set("region", region);
	return url.toString();
}
