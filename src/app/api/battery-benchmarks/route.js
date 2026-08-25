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
			return Response.json({ indices });
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
			const seriesData = await getLeaderboardSeries(region, {
				start,
				end,
				index,
			});
			return Response.json(
				{ series: { [index]: seriesData } },
				{
					headers: {
						"Cache-Control":
							"public, s-maxage=86400, stale-while-revalidate=604800",
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
		// The page now seeds every series server-side, so this route is only a
		// fallback. Benchmarks change monthly, so let the CDN and browser hold the
		// response for a day and serve it stale for a week while it refreshes —
		// otherwise every request pays the upstream's flat ~2.8s per benchmark.
		return Response.json(
			{ series },
			{
				headers: {
					"Cache-Control":
						"public, s-maxage=86400, stale-while-revalidate=604800",
				},
			},
		);
	} catch (error) {
		console.error("Error fetching benchmark series:", error);
		return Response.json({ error: "Failed to fetch series" }, { status: 500 });
	}
}
