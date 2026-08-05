// UTILS / DATA for the Battery Benchmark module //

/** Months rendered on the X axis (Jan 2023 → Apr 2026) */
const START_YEAR = 2023;
const MONTHS_COUNT = 40; // Jan-23 .. Apr-26

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

/** Build the full list of monthly labels */
export const monthLabels = Array.from({ length: MONTHS_COUNT }, (_, i) => {
	const month = i % 12;
	const year = START_YEAR + Math.floor(i / 12);
	return `${MONTH_SHORT[month]} ${String(year).slice(2)}`;
});

/**
 * Deterministic bell-shaped revenue curve peaking mid-2024 with a
 * declining tail — mirrors the historical battery-revenue shape.
 */
function generateSeries(base, peak, multiplier = 1) {
	const peakIndex = 16; // ~May 2024
	return Array.from({ length: MONTHS_COUNT }, (_, i) => {
		const bump = Math.exp(-Math.pow((i - peakIndex) / 7, 2));
		const trend =
			i <= peakIndex ? 1 : 1 - ((i - peakIndex) / (MONTHS_COUNT - peakIndex)) * 0.6;
		const noise = Math.sin(i * 1.3) * base * 0.05;
		const value = (base + (peak - base) * bump) * trend + noise;
		return Math.max(0, Math.round(value * multiplier));
	});
}

/** The three duration series shown on the chart */
export const durations = [
	{ key: "4-hour", label: "4-hour", color: "#ffcc00" },
	{ key: "2-hour", label: "2-hour", color: "#7030a0" },
	{ key: "1-hour", label: "1-hour", color: "#1d1d1d" },
];

/** Base figures per duration (before per-region scaling) */
const DURATION_BASE = {
	"4-hour": { base: 380, peak: 1000 },
	"2-hour": { base: 350, peak: 880 },
	"1-hour": { base: 250, peak: 500 },
};

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

/** Markets announced in the selector but not yet selectable */
const REGION_SOON = ["ita"];

/** Per-region scaling for the placeholder chart series */
const REGION_MULTIPLIERS = {
	gbr: 1,
	deu: 0.82,
	fra: 0.68,
	ita: 0.9,
	bel: 0.74,
	nld: 0.79,
	ibe: 0.6,
	nod: 0.54,
	swe: 0.57,
	dnk: 0.63,
	fin: 0.55,
	pol: 0.71,
	erc: 1.12,
	cas: 1.05,
	aus: 0.95,
};
const DEFAULT_MULTIPLIER = 0.7;

/** regionLabel - display name for a code, falling back to the code itself */
export function regionLabel(code) {
	return REGION_LABELS[code] || String(code || "").toUpperCase();
}

/** buildRegions - turns the API's region codes into selector items, in display
 *  order. Called with nothing (or an empty list) it returns every known market,
 *  so the selector still renders if the API call fails. */
export function buildRegions(codes) {
	const list = codes?.length ? codes : REGION_ORDER;

	return [...new Set(list)]
		.map((code) => ({
			key: code,
			label: regionLabel(code),
			multiplier: REGION_MULTIPLIERS[code] ?? DEFAULT_MULTIPLIER,
			soon: REGION_SOON.includes(code),
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

/** Markets shown in the region selector when the API list is unavailable */
export const regions = buildRegions();

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
