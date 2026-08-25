// UTILS / DATA for the Battery Benchmark module //

/** Colours per battery duration, keyed by the API's `batteryDuration` (hours) */
const DURATION_COLORS = { 1: "#1d1d1d", 2: "#7030a0", 4: "#ffcc00" };
const DEFAULT_DURATION_COLOR = "#00a3a1";

/** Short month names used to label the x axis */
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

/** Display names for the region codes returned by the API (/regions/all) */
export const REGION_LABELS = {
	// Europe
	gbr: "Great Britain",
	deu: "Germany",
	fra: "France",
	ita: "Italy",
	bel: "Belgium",
	nld: "Netherlands",
	ibe: "Iberia",
	irx: "Ireland",
	nod: "Nordics",
	swe: "Sweden",
	dnk: "Denmark",
	fin: "Finland",
	bal: "Baltics",
	est: "Estonia",
	ltu: "Lithuania",
	pol: "Poland",
	hun: "Hungary",
	rou: "Romania",
	bgr: "Bulgaria",
	grc: "Greece",
	// Americas
	erc: "ERCOT",
	cas: "CAISO",
	pjm: "PJM",
	mis: "MISO",
	spp: "SPP",
	ny: "NYISO",
	ne: "ISO-NE",
	aies: "Alberta",
	chl: "Chile",
	// APAC
	aus: "Australia NEM",
	waa: "Western Australia",
	jpn: "Japan",
	kor: "South Korea",
	ind: "India",
	phl: "Philippines",
};

/** Order the selector renders in — codes outside this list follow, A → Z */
const REGION_ORDER = [
	"gbr",
	"deu",
	"fra",
	"ita",
	"bel",
	"nld",
	"ibe",
	"irx",
	"nod",
	"swe",
	"dnk",
	"fin",
	"bal",
	"est",
	"ltu",
	"pol",
	"hun",
	"rou",
	"bgr",
	"grc",
	"erc",
	"cas",
	"pjm",
	"mis",
	"spp",
	"ny",
	"ne",
	"aies",
	"chl",
	"aus",
	"waa",
	"jpn",
	"kor",
	"ind",
	"phl",
];

/** regionLabel - display name for a code, falling back to the code itself */
export function regionLabel(code) {
	return REGION_LABELS[code] || String(code || "").toUpperCase();
}

/** buildRegions - turns the API's region codes into selector items, in display
 *  order. A market is flagged "soon" when the benchmark catalogue has nothing
 *  published for it yet. Called with no codes it lists every known market, so
 *  the selector still renders if /regions/all fails. */
export function buildRegions(codes, benchmarks = []) {
	const list = codes?.length ? codes : REGION_ORDER;
	const published = new Set(benchmarks.map((item) => item.region));

	return [...new Set(list)]
		.map((code) => ({
			key: code,
			label: regionLabel(code),
			soon: !published.has(code),
		}))
		.sort((a, b) => {
			const aIndex = REGION_ORDER.indexOf(a.key);
			const bIndex = REGION_ORDER.indexOf(b.key);
			if (aIndex === -1 && bIndex === -1) return a.label.localeCompare(b.label);
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		});
}

/** firstAvailableRegion - the market the selector opens on */
export function firstAvailableRegion(regions = []) {
	return regions.find((item) => !item.soon)?.key || regions[0]?.key || null;
}

/** Readable names for the API's price-zone codes. The Nordic and Iberian codes
 *  ("nod_fi", "esp") are internal shorthand, so they are spelled out to match
 *  how every other market names its zones. CAISO's NP15 / SP15 / ZP26 are
 *  industry-standard terms and deliberately left as they are. */
const ZONE_LABELS = {
	esp: "Spain",
	prt: "Portugal",
	nod_fi: "Finland",
	nod_dk1: "Denmark 1",
	nod_dk2: "Denmark 2",
	nod_no1: "Norway 1",
	nod_no2: "Norway 2",
	nod_no3: "Norway 3",
	nod_no4: "Norway 4",
	nod_no5: "Norway 5",
	nod_se1: "Sweden 1",
	nod_se2: "Sweden 2",
	nod_se3: "Sweden 3",
	nod_se4: "Sweden 4",
};

/** zoneLabel - display name for a price-zone code, falling back to the code */
export function zoneLabel(zone) {
	if (!zone) return "";
	const key = String(zone).toLowerCase().replace(/-/g, "_");
	return ZONE_LABELS[key] || zone;
}

/** zonesFor - price zones published for a region ([] when it has none) */
export function zonesFor(benchmarks = [], region) {
	return [
		...new Set(
			benchmarks
				.filter((item) => item.region === region && item.priceZone)
				.map((item) => item.priceZone),
		),
	].sort((a, b) => zoneLabel(a).localeCompare(zoneLabel(b)));
}

/** benchmarksFor - the published benchmarks behind the current selection */
export function benchmarksFor(benchmarks = [], region, zone) {
	const filtered = benchmarks.filter(
		(item) => item.region === region && (!zone || item.priceZone === zone),
	);
	const seen = new Set();
	const unique = [];
	for (const item of filtered) {
		const key = `${item.duration}`;
		if (!seen.has(key)) {
			seen.add(key);
			unique.push(item);
		}
	}
	return unique.sort((a, b) => a.duration - b.duration);
}

/** durationsFor - duration chips available for the current selection */
export function durationsFor(benchmarks = [], region, zone) {
	return benchmarksFor(benchmarks, region, zone).map((item) => ({
		key: item.duration,
		label: `${item.duration}-hour`,
		color: DURATION_COLORS[item.duration] || DEFAULT_DURATION_COLOR,
		uuid: item.uuid,
	}));
}

/** Currency the chart is denominated in. */
const CURRENCY_SYMBOLS = { eur: "€", gbp: "£", usd: "$" };

/** Currency per market, used when the API sends no `baseCurrencyCode` — it
 *  currently omits it for Italy, which left the unit dropdown reading
 *  "per kW/month" with no symbol. Only markets whose currency is unambiguous
 *  are listed; anything else still falls back to no symbol. */
const REGION_CURRENCY = {
	gbr: "gbp",
	deu: "eur",
	fra: "eur",
	ita: "eur",
	bel: "eur",
	nld: "eur",
	ibe: "eur",
	irx: "eur",
	nod: "eur",
	swe: "eur",
	dnk: "eur",
	fin: "eur",
	bal: "eur",
	est: "eur",
	ltu: "eur",
	grc: "eur",
	pol: "pln",
	hun: "huf",
	rou: "ron",
	bgr: "bgn",
	erc: "usd",
	cas: "usd",
	pjm: "usd",
	mis: "usd",
	spp: "usd",
	ny: "usd",
	ne: "usd",
	aies: "cad",
	chl: "clp",
	aus: "aud",
	waa: "aud",
	jpn: "jpy",
	kor: "krw",
	ind: "inr",
	phl: "php",
};

/** currencyForRegion - the market's currency when the API doesn't supply one */
export function currencyForRegion(region) {
	return REGION_CURRENCY[region] || null;
}

/** currencyLabel - "€", "$" or the uppercased code ("PLN") */
export function currencyLabel(currency) {
	if (!currency) return "";
	const code = String(currency).toLowerCase();
	return CURRENCY_SYMBOLS[code] || code.toUpperCase();
}

/** unitsFor - the unit dropdown for a currency. The API publishes monthly
 *  revenue per kW, so /MW is a x1000 restatement and the yearly option is an
 *  annualised rate (x12), labelled as such. */
export function unitsFor(currency) {
	const prefix = currencyLabel(currency);
	const per = (unit) => (prefix ? `${prefix}/${unit}` : `per ${unit}`);

	return [
		{ key: "kw-month", label: per("kW/month"), factor: 1, decimals: 2 },
		{ key: "mw-month", label: per("MW/month"), factor: 1000, decimals: 0 },
		{
			key: "kw-year",
			label: `${per("kW/year")} (annualised)`,
			factor: 12,
			decimals: 1,
		},
	];
}

/** buildChart - aligns the selected benchmarks' monthly series onto one axis.
 *  Series can cover different months, so the axis is the union of all of them
 *  and a series without a value for a month gets a null (gap in the line). */
export function buildChart(selection = [], seriesByUuid = {}, factor = 1) {
	const months = [
		...new Set(
			selection.flatMap((item) =>
				(seriesByUuid[item.uuid]?.points || []).map((point) => point.key),
			),
		),
	].sort();

	const xLabels = months.map((month) => {
		const [year, index] = month.split("-");
		return `${MONTH_SHORT[Number(index) - 1]} ${year.slice(2)}`;
	});

	const series = selection.map((item) => {
		const points = seriesByUuid[item.uuid]?.points || [];
		const byMonth = new Map(points.map((point) => [point.key, point.value]));
		return {
			key: item.duration,
			label: `${item.duration}-hour`,
			color: DURATION_COLORS[item.duration] || DEFAULT_DURATION_COLOR,
			uuid: item.uuid,
			data: months.map((month) =>
				byMonth.has(month)
					? Math.round(byMonth.get(month) * factor * 100) / 100
					: null,
			),
		};
	});

	const currency =
		selection
			.map((item) => seriesByUuid[item.uuid]?.currency)
			.find(Boolean) ||
		selection.map((item) => item.currency).find(Boolean) ||
		null;

	return { months, xLabels, series, currency };
}


/** Benchmark index types shown in the top toggle */
export const benchmarkTypes = [
	{
		key: "backcast",
		title: "Backcast Benchmark",
		short: "What a battery dispatched to simulate actual performance and imperfect foresight would have earned.",
		description:
			"The Backcast Benchmark models the revenue a reference battery, dispatched to simulate actual performance and imperfect foresight, would have captured against historical wholesale and balancing prices — a clean, like-for-like measure of how attractive each market <strong>could</strong> have been.",
	},
	{
		key: "real",
		title: "Real Performance Benchmark",
		short: "What operational battery fleets actually earned.",
		description:
			"The Real Performance Benchmark tracks the revenue operational battery fleets <strong>actually</strong> earned across each market — capturing real dispatch decisions, availability and imperfect foresight, for a ground-truth view of realised performance.",
	},
];

/** Units available in the dropdown */
export const units = [
	{ key: "kw-year", label: "€/kW/year", factor: 1 },
	{ key: "mw-year", label: "€/MW/year", factor: 1000 },
	{ key: "kw-month", label: "€/kW/month", factor: 1 / 12 },
];

/**
 * Returns the chart series for a given region / benchmark type.
 * The Real Performance benchmark runs a little below the Backcast
 * (realised revenue < idealised backcast).
 */
export function getChartSeries(regionKey, benchmarkType = "backcast") {
	const multiplier = REGION_MULTIPLIERS[regionKey] ?? DEFAULT_MULTIPLIER;
	const typeFactor = benchmarkType === "real" ? 0.78 : 1;

	return durations.map((d) => {
		const { base, peak } = DURATION_BASE[d.key];
		return {
			...d,
			data: generateSeries(base, peak, multiplier * typeFactor),
		};
	});
}
