// Flexplorer REST API — battery benchmark data.
// Docs (from Aurora): /regions/all, /benchmarks/all,
// /benchmarks/<uuid>/data/total, /leaderboards/<region>

// Benchmarks are republished monthly (see `latestReleaseMonth`), so the series
// data is cached for a week. The upstream endpoint costs a flat ~2.8s per
// benchmark and does not get faster on repeat — it has no caching of its own —
// so a short window here just means visitors pay that latency again for nothing.
const REFRESH_INTERVAL = 604800; // 1 week

// The benchmark endpoints are slow (~2.8s each), so a whole region's worth of
// series is fetched in small parallel batches rather than one at a time.
// Do NOT raise this: measured against the live API, 6 at a time returns 32/32,
// while 12 at a time reliably fails 4 of 32 with HTTP 500.
const BATCH_SIZE = 6;

const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const MONTH_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

/** Shared request for the JSON endpoints */
const RESTAPI = async (query, options) => {
	const res = await fetch(`${process.env.BATTERY_BENCHMARK_API_URL}${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Private-Token": process.env.BATTERY_BENCHMARK_TOKEN,
		},
		next: { revalidate: REFRESH_INTERVAL },
		...options,
	});
	if (!res.ok) {
		throw new Error(`Benchmark API ${query} failed: ${res.status}`);
	}
	const data = await res.json();
	return data;
};

/** Shared request for the endpoints that answer with CSV */
const RESTAPICsv = async (query, options) => {
	const res = await fetch(`${process.env.BATTERY_BENCHMARK_API_URL}${query}`, {
		method: "GET",
		headers: {
			"Private-Token": process.env.BATTERY_BENCHMARK_TOKEN,
		},
		next: { revalidate: REFRESH_INTERVAL },
		...options,
	});
	if (!res.ok) {
		throw new Error(`Benchmark API ${query} failed: ${res.status}`);
	}
	return res.text();
};

/** Run `fn` over `items` a few at a time, keeping input order */
async function inBatches(items, fn, size = BATCH_SIZE) {
	const out = [];
	for (let i = 0; i < items.length; i += size) {
		const batch = items.slice(i, i + size);
		out.push(...(await Promise.all(batch.map(fn))));
	}
	return out;
}

/** Fetch the region codes the API has data for, e.g. ["gbr", "deu"].
 *  Returns an empty list on failure so the page still renders its full market
 *  list instead of failing the build. */
export const getAllRegions = async () => {
	try {
		const res = await RESTAPI("/regions/all");
		return res?.data || [];
	} catch (error) {
		console.error("getAllRegions failed:", error?.message || error);
		return [];
	}
};

/** Fetch the published backcast benchmarks — the catalogue the selector and the
 *  duration/price-zone toggles are built from. */
export const getAllBenchmarks = async () => {
	try {
		const res = await RESTAPI("/benchmarks/all");
		return (res?.data || [])
			.filter((item) => item?.status === "Published" && item?.benchmarkUuid)
			.map((item) => ({
				uuid: item.benchmarkUuid,
				title: item.title,
				description: item.description || "",
				region: item.region,
				priceZone: item.priceZone || null,
				duration: item.batteryDuration,
				currency: item.baseCurrencyCode || null,
				latestReleaseMonth: item.latestReleaseMonth || null,
			}));
	} catch (error) {
		console.error("getAllBenchmarks failed:", error?.message || error);
		return [];
	}
};

/** Parse a `/data/total` CSV response.
 *  Row 1 is the header, row 2 carries the units ("GBP/kW asset"), then one row
 *  per month: Year,month,asset,market,direction,cashflow,volume */
export function parseBenchmarkCsv(csv) {
	const lines = String(csv || "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	const unitCell = lines[1]?.split(",")[5] || "";
	const currency = unitCell.split("/")[0]?.trim();

	const points = lines
		.slice(2)
		.map((line) => {
			const [year, month, , , , cashflow] = line.split(",");
			const monthIndex = MONTHS.indexOf(month);
			const value = parseFloat(cashflow);
			if (monthIndex === -1 || !Number.isFinite(value)) return null;
			return {
				key: `${year}-${String(monthIndex + 1).padStart(2, "0")}`,
				label: `${MONTH_SHORT[monthIndex]} ${String(year).slice(2)}`,
				value,
			};
		})
		.filter(Boolean)
		.sort((a, b) => a.key.localeCompare(b.key));

	return {
		// "UNKNOWN" is what the API sends when a benchmark has no base currency
		currency: currency && currency !== "UNKNOWN" ? currency : null,
		points,
	};
}

/** Fetch one benchmark's monthly total-revenue series */
export const getBenchmarkSeries = async (uuid) => {
	try {
		const csv = await RESTAPICsv(`/benchmarks/${uuid}/data/total`);
		return { uuid, ...parseBenchmarkCsv(csv) };
	} catch (error) {
		console.error(`getBenchmarkSeries(${uuid}) failed:`, error?.message || error);
		return { uuid, currency: null, points: [] };
	}
};

/** Fetch several benchmarks' series, keyed by uuid */
export const getBenchmarkSeriesByUuid = async (uuids = []) => {
	const list = await inBatches([...new Set(uuids)].filter(Boolean), (uuid) =>
		getBenchmarkSeries(uuid),
	);
	return Object.fromEntries(list.map((item) => [item.uuid, item]));
};

/** Fetch the real-performance leaderboard for a region. Aurora has no published
 *  index yet — wired up so it only needs an index UUID once they publish one.
 *  Returns the raw CSV; the response is large (several MB per region). */
export const getLeaderboard = async (region, { start, end, index } = {}) => {
	const params = new URLSearchParams();
	if (start) params.set("start", start);
	if (end) params.set("end", end);
	if (index) params.set("index", index);

	try {
		return await RESTAPICsv(`/leaderboards/${region}?${params.toString()}`);
	} catch (error) {
		console.error(`getLeaderboard(${region}) failed:`, error?.message || error);
		return "";
	}
};
