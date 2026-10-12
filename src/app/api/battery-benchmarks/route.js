// Force this route to run fresh on every request — no Next.js route cache,
// no Data Cache for its fetch() calls.
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* eslint-disable require-jsdoc */
import {
	getBenchmarkSeriesByUuid,
	getLeaderboardIndices,
	getLeaderboardSeries,
} from "@/services/rest/BatteryBenchmark.service";

// One region's chips never need more than this many benchmarks at once
const MAX_UUIDS = 12;
const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

/** Proxies /benchmarks/<uuid>/data/total and /leaderboards so the API token stays server-side.
 *  - GET /api/battery-benchmarks?uuids=<uuid>,<uuid>
 *  - GET /api/battery-benchmarks?type=real&region=<region>&index=<uuid>
 *  - GET /api/battery-benchmarks?type=indices&region=<region>
 */
export async function GET(req) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get("type");
	const region = searchParams.get("region");

	// Real performance indices list for a region
	if (type === "indices" && region) {
		try {
			const indices = await getLeaderboardIndices(region);
			return Response.json(
				{ indices },
				{
					headers: {
						"Cache-Control":
							"no-store, no-cache, must-revalidate, proxy-revalidate",
					},
				},
			);
		} catch (error) {
			console.error("Error fetching leaderboard indices:", error);
			return Response.json(
				{ error: "Failed to fetch indices" },
				{ status: 500 },
			);
		}
	}

	// Real performance leaderboard series for a region & index
	if (type === "real" && region) {
		const index = searchParams.get("index");
		const start = searchParams.get("start");
		const end = searchParams.get("end");

		if (!index || !UUID_PATTERN.test(index)) {
			return Response.json({ error: "Invalid index UUID" }, { status: 400 });
		}

		try {
			// A visitor's own date range must always be live, not the ISR-cached
			// default window the page pre-seeds server-side.
			const seriesData = await getLeaderboardSeries(
				region,
				{ start, end, index },
				{ cache: "no-store" },
			);
			return Response.json(
				{ series: { [index]: seriesData } },
				{
					headers: {
						"Cache-Control":
							"no-store, no-cache, must-revalidate, proxy-revalidate",
						Pragma: "no-cache",
						Expires: "0",
					},
				},
			);
		} catch (error) {
			console.error("Error fetching leaderboard series:", error);
			return Response.json(
				{ error: "Failed to fetch leaderboard series" },
				{ status: 500 },
			);
		}
	}

	const uuids = (searchParams.get("uuids") || "")
		.split(",")
		.map((uuid) => uuid.trim())
		.filter((uuid) => UUID_PATTERN.test(uuid))
		.slice(0, MAX_UUIDS);

	if (!uuids.length) {
		return Response.json({ error: "No valid uuids" }, { status: 400 });
	}

	try {
		const series = await getBenchmarkSeriesByUuid(uuids);
		return Response.json(
			{ series },
			{
				headers: {
					"Cache-Control":
						"no-store, no-cache, must-revalidate, proxy-revalidate",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching benchmark series:", error);
		return Response.json({ error: "Failed to fetch series" }, { status: 500 });
	}
}
