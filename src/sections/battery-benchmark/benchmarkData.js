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

/** Markets shown in the region selector */
export const regions = [
	{ key: "great-britain", label: "Great Britain", multiplier: 1 },
	{ key: "germany", label: "Germany", multiplier: 0.82 },
	{ key: "france", label: "France", multiplier: 0.68 },
	{ key: "italy", label: "Italy", multiplier: 0.9, soon: true },
	{ key: "belgium", label: "Belgium", multiplier: 0.74 },
	{ key: "netherlands", label: "Netherlands", multiplier: 0.79 },
	{ key: "iberia", label: "Iberia", multiplier: 0.6 },
	{ key: "norway", label: "Norway", multiplier: 0.52 },
	{ key: "sweden", label: "Sweden", multiplier: 0.57 },
	{ key: "denmark", label: "Denmark", multiplier: 0.63 },
	{ key: "finland", label: "Finland", multiplier: 0.55 },
	{ key: "poland", label: "Poland", multiplier: 0.71 },
	{ key: "ercot", label: "ERCOT", multiplier: 1.12 },
	{ key: "caiso", label: "CAISO", multiplier: 1.05 },
	{ key: "australia-nem", label: "Australia NEM", multiplier: 0.95, soon: true },
];

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
	const region = regions.find((r) => r.key === regionKey) || regions[0];
	const typeFactor = benchmarkType === "real" ? 0.78 : 1;

	return durations.map((d) => {
		const { base, peak } = DURATION_BASE[d.key];
		return {
			...d,
			data: generateSeries(base, peak, region.multiplier * typeFactor),
		};
	});
}
