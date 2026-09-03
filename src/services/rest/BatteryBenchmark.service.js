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

/** Shared request for the JSON endpoints.
 *
 *  The one place in the app that still revalidates on a timer, deliberately:
 *  this is the benchmark vendor's API, not WordPress, so no CMS webhook can
 *  ever flush it and a tag would never be invalidated. Everything sourced from
 *  WordPress is cached indefinitely and flushed on demand instead — see
 *  services/CacheTags.js. */
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

/** Split CSV line taking quotes into account */
function splitCsvLine(text) {
	const result = [];
	let curr = "";
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === "," && !inQuotes) {
			result.push(curr.trim());
			curr = "";
		} else {
			curr += char;
		}
	}
	result.push(curr.trim());
	return result;
}

/** Real Performance markets currently supported */
export const REAL_PERFORMANCE_REGIONS = ["gbr", "ita", "aus", "erc"];

/** Normalize a leaderboard index from /leaderboards/<region>/indices */
export function normalizeLeaderboardIndex(item) {
	if (!item) return null;
	const name = item.name || "";
	let duration = null;
	const durationMatch =
		name.match(/(\d+)H/i) ||
		name.match(/(\d+)\s*hr/i) ||
		name.match(/(\d+)\s*hour/i);
	if (durationMatch) {
		duration = parseInt(durationMatch[1], 10);
	} else if (item.filters?.batteryDurationH) {
		const val = item.filters.batteryDurationH.find((f) => f.startsWith(">="));
		if (val) duration = Math.round(parseFloat(val.replace(">=", "")));
	}

	let priceZone = null;
	if (item.filters?.region?.[0]) {
		priceZone = item.filters.region[0].replace(/^Italy\s+/i, "").trim();
	} else {
		const zones = [
			"Sardina",
			"Sardinia",
			"North",
			"South",
			"NSW",
			"New South Wales",
			"QLD",
			"Queensland",
			"SA",
			"South Australia",
			"VIC",
			"Victoria",
		];
		for (const z of zones) {
			if (new RegExp(`\\b${z}\\b`, "i").test(name)) {
				priceZone = z;
				break;
			}
		}
	}

	return {
		uuid: item.leaderboardIndexUuid,
		title: item.name,
		description: item.description || "",
		region: item.region,
		priceZone,
		duration: duration || 2,
		status: "Published",
		isRealPerformance: true,
	};
}

/** Fetch available indices for a real performance region */
export const getLeaderboardIndices = async (region) => {
	try {
		const res = await RESTAPI(`/leaderboards/${region}/indices`);
		const list = Array.isArray(res) ? res : res?.data || [];
		return list.map(normalizeLeaderboardIndex).filter(Boolean);
	} catch (error) {
		console.error(
			`getLeaderboardIndices(${region}) failed:`,
			error?.message || error,
		);
		return [];
	}
};

/** Fetch all published indices across real performance regions */
export const getAllLeaderboardIndices = async (
	regions = REAL_PERFORMANCE_REGIONS,
) => {
	const results = await Promise.all(
		regions.map(async (region) => {
			const indices = await getLeaderboardIndices(region);
			return indices;
		}),
	);
	return results.flat();
};

/** Default date range for live leaderboards: rolling 12 months up to today */
export function getDefaultLeaderboardDateRange() {
	const now = new Date();
	const endYear = now.getFullYear();
	const endMonth = String(now.getMonth() + 1).padStart(2, "0");
	const endDay = String(now.getDate()).padStart(2, "0");
	const end = `${endYear}-${endMonth}-${endDay}`;

	// 12 months rolling window from 1st of month 11 months prior to current date
	const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
	const startYear = startDate.getFullYear();
	const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
	const start = `${startYear}-${startMonth}-01`;

	return { start, end };
}

/** Parse a /leaderboards/<region> CSV response into monthly time series.
 *  Aggregates total net revenue (cashflow discharge + cashflow charge) per unit,
 *  then calculates fleet average per kW for each month. */
export function parseLeaderboardCsv(csv, fallbackCurrency = null) {
	const lines = String(csv || "")
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	if (lines.length < 2) {
		return { currency: fallbackCurrency, points: [] };
	}

	const header = splitCsvLine(lines[0]);
	const dateCol = header.indexOf("local_date");
	const unitCol =
		header.indexOf("unit") !== -1
			? header.indexOf("unit")
			: header.indexOf("unit id");
	const chargeCol = header.findIndex((h) => h.includes("cashflow charge"));
	const dischargeCol = header.findIndex((h) =>
		h.includes("cashflow discharge"),
	);

	let detectedCurrency = fallbackCurrency;
	if (chargeCol !== -1) {
		const match = header[chargeCol].match(/,\s*([a-z]{3})\/kw/i);
		if (match) detectedCurrency = match[1].toLowerCase();
	}

	if (
		dateCol === -1 ||
		unitCol === -1 ||
		chargeCol === -1 ||
		dischargeCol === -1
	) {
		return { currency: detectedCurrency, points: [] };
	}

	const monthlyUnits = new Map();

	for (let i = 1; i < lines.length; i++) {
		const row = splitCsvLine(lines[i]);
		const dateStr = row[dateCol];
		if (!dateStr || dateStr.length < 7) continue;

		const monthKey = dateStr.slice(0, 7);
		const unit = row[unitCol];
		const charge = parseFloat(row[chargeCol]) || 0;
		const discharge = parseFloat(row[dischargeCol]) || 0;
		const net = charge + discharge;

		if (!monthlyUnits.has(monthKey)) {
			monthlyUnits.set(monthKey, new Map());
		}
		const unitMap = monthlyUnits.get(monthKey);
		unitMap.set(unit, (unitMap.get(unit) || 0) + net);
	}

	const sortedMonths = Array.from(monthlyUnits.keys()).sort();
	const points = sortedMonths.map((monthKey) => {
		const unitMap = monthlyUnits.get(monthKey);
		let total = 0;
		for (const val of unitMap.values()) {
			total += val;
		}
		const avg = unitMap.size > 0 ? total / unitMap.size : 0;
		const [year, monthNum] = monthKey.split("-");
		const mIdx = parseInt(monthNum, 10) - 1;
		return {
			key: monthKey,
			label: `${MONTH_SHORT[mIdx] || monthNum} ${year.slice(2)}`,
			value: Math.round(avg * 100) / 100,
		};
	});

	return {
		currency: detectedCurrency,
		points,
	};
}

/** Fetch the real-performance leaderboard for a region.
 *  Returns the raw CSV. */
export const getLeaderboard = async (
	region,
	{ start, end, index } = {},
	options = {},
) => {
	const range = getDefaultLeaderboardDateRange();
	const params = new URLSearchParams();
	params.set("start", start || range.start);
	params.set("end", end || range.end);
	if (index) params.set("index", index);

	try {
		return await RESTAPICsv(`/leaderboards/${region}?${params.toString()}`, {
			cache: "no-store",
			...options,
		});
	} catch (error) {
		console.error(`getLeaderboard(${region}) failed:`, error?.message || error);
		return "";
	}
};

/** Fetch one real performance index monthly series */
export const getLeaderboardSeries = async (
	region,
	{ start, end, index, currency } = {},
) => {
	try {
		const csv = await getLeaderboard(region, { start, end, index });
		return { uuid: index, ...parseLeaderboardCsv(csv, currency) };
	} catch (error) {
		console.error(
			`getLeaderboardSeries(${region}, ${index}) failed:`,
			error?.message || error,
		);
		return { uuid: index, currency: null, points: [] };
	}
};

/** Fetch several real performance indices series in parallel batches */
export const getLeaderboardSeriesByIndices = async (
	indices = [],
	{ start, end } = {},
) => {
	const list = await inBatches(indices.filter(Boolean), (item) =>
		getLeaderboardSeries(item.region, {
			start,
			end,
			index: item.uuid,
			currency: item.currency,
		}),
	);
	return Object.fromEntries(list.map((item) => [item.uuid, item]));
};

