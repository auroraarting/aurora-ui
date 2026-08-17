/* eslint-disable require-jsdoc */
import { getBenchmarkSeriesByUuid } from "@/services/rest/BatteryBenchmark.service";

// One region's chips never need more than this many benchmarks at once
const MAX_UUIDS = 12;
const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

/** Proxies /benchmarks/<uuid>/data/total so the API token stays server-side.
 *  GET /api/battery-benchmarks?uuids=<uuid>,<uuid> */
export async function GET(req) {
	const { searchParams } = new URL(req.url);
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
