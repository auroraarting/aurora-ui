"use client";

// MODULES //
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// COMPONENTS //
import BenchmarkLineChart from "./BenchmarkLineChart";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkExplorer.module.scss";

// IMAGES //
import flexplorerIcon from "../../../public/img/battery-benchmark/flexplorer.svg";
import downloadIcon from "../../../public/img/battery-benchmark/download-svg.svg";

// DATA //
import {
	benchmarksFor,
	buildChart,
	buildRegions,
	durationsFor,
	firstAvailableRegion,
	regionLabel,
	unitsFor,
	zonesFor,
} from "./benchmarkData";

/** BatteryBenchmarkExplorer Section — region selector + benchmark chart */
export default function BatteryBenchmarkExplorer({
	benchmarkType = "backcast",
	regionCodes,
	benchmarks = [],
	initialSeries = {},
}) {
	// The API returns codes only ("gbr", "deu", …) - labelled and ordered here,
	// with markets that have nothing published yet flagged as "soon"
	const regions = useMemo(
		() => buildRegions(regionCodes, benchmarks),
		[regionCodes, benchmarks],
	);

	const [region, setRegion] = useState(() => firstAvailableRegion(regions));
	const [zone, setZone] = useState(null);
	const [unitKey, setUnitKey] = useState("kw-month");
	const [hiddenDurations, setHiddenDurations] = useState([]);
	const [seriesByUuid, setSeriesByUuid] = useState(initialSeries);
	const [loading, setLoading] = useState(false);

	// uuids already fetched (or in flight) so a re-selection doesn't refetch
	const requested = useRef(new Set(Object.keys(initialSeries)));

	const zones = useMemo(() => zonesFor(benchmarks, region), [benchmarks, region]);
	const activeZone = zone && zones.includes(zone) ? zone : zones[0] || null;

	const selection = useMemo(
		() => benchmarksFor(benchmarks, region, activeZone),
		[benchmarks, region, activeZone],
	);

	const durations = useMemo(
		() => durationsFor(benchmarks, region, activeZone),
		[benchmarks, region, activeZone],
	);

	const isBackcast = benchmarkType === "backcast";

	/** Pull any series for the current selection we don't hold yet */
	const fetchSeries = useCallback(async (items) => {
		const missing = items
			.map((item) => item.uuid)
			.filter((uuid) => !requested.current.has(uuid));
		if (!missing.length) return;

		missing.forEach((uuid) => requested.current.add(uuid));
		setLoading(true);
		try {
			const res = await fetch(
				`/api/battery-benchmarks?uuids=${missing.join(",")}`,
			);
			const json = await res.json();
			if (json?.series) {
				setSeriesByUuid((prev) => ({ ...prev, ...json.series }));
			} else {
				// let a later selection retry a failed fetch
				missing.forEach((uuid) => requested.current.delete(uuid));
			}
		} catch (error) {
			missing.forEach((uuid) => requested.current.delete(uuid));
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (isBackcast && selection.length) fetchSeries(selection);
	}, [isBackcast, selection, fetchSeries]);

	const chart = useMemo(
		() => buildChart(selection, seriesByUuid, 1),
		[selection, seriesByUuid],
	);

	const units = useMemo(() => unitsFor(chart.currency), [chart.currency]);
	const unit = units.find((item) => item.key === unitKey) || units[0];

	// Scaled to the selected unit
	const series = useMemo(
		() => buildChart(selection, seriesByUuid, unit.factor).series,
		[selection, seriesByUuid, unit],
	);

	const activeKeys = useMemo(
		() =>
			durations
				.map((item) => item.key)
				.filter((key) => !hiddenDurations.includes(key)),
		[durations, hiddenDurations],
	);

	const toggleDuration = (key) => {
		setHiddenDurations((prev) => {
			if (!prev.includes(key)) {
				// keep at least one duration on the chart
				return activeKeys.length > 1 ? [...prev, key] : prev;
			}
			return prev.filter((item) => item !== key);
		});
	};

	const hasData = series.some((item) =>
		item.data.some((value) => value !== null),
	);
	const range =
		chart.xLabels.length > 1
			? `${chart.xLabels[0]} – ${chart.xLabels[chart.xLabels.length - 1]}`
			: chart.xLabels[0] || "";

	/** Download the visible series as CSV */
	const downloadCsv = () => {
		const visible = series.filter((item) => activeKeys.includes(item.key));
		const header = ["Month", ...visible.map((item) => `${item.label} (${unit.label})`)];
		const rows = chart.xLabels.map((label, index) => [
			label,
			...visible.map((item) => item.data[index] ?? ""),
		]);
		const csv = [header, ...rows].map((row) => row.join(",")).join("\n");

		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const link = document.createElement("a");
		link.href = url;
		const zoneSlug = activeZone
			? `-${activeZone.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
			: "";
		link.download = `${region}${zoneSlug}-battery-benchmark.csv`;
		link.click();
		URL.revokeObjectURL(url);
	};

	return (
		<section className={`${styles.Explorer}`}>
			<div className="container">
				<div className={styles.layout}>
					{/* ── Region selector ───────────────────────── */}
					<aside className={styles.sidebar}>
						<div className={styles.sidebarInner} data-lenis-prevent>
							<div className={styles.sidebarHead}>
								<span className={`${styles.eyebrow} text_xxs color_light_gray text_600`}>
									Regions
								</span>
								<span className={styles.hint}>Select a market</span>
							</div>

							<ul className={styles.regionList}>
								{regions.map((r) => (
									<li key={r.key}>
										<button
											type="button"
											disabled={r.soon}
											onClick={() => {
												if (r.soon) return;
												setRegion(r.key);
												setZone(null);
												setHiddenDurations([]);
											}}
											className={`${styles.regionBtn} ${
												r.key === region ? `${styles.regionActive} text_600` : ""
											} ${r.soon ? styles.regionSoon : ""} text_xxs text_400`}
										>
											<span>{r.label}</span>
											{r.soon && <span className={styles.soonBadge}>Soon</span>}
										</button>
									</li>
								))}
							</ul>
						</div>
					</aside>

					{/* ── Chart panel ──────────────────────────── */}
					<div className={styles.panel}>
						<div className={styles.panelHead}>
							<div>
								<h3 className={`${styles.panelTitle} text_md text_600`}>
									{regionLabel(region)} Battery Benchmark
								</h3>
								<p className={`${styles.panelSub} text_xxs`}>
									{isBackcast ? "Modelled revenue" : "Realised revenue"} ·{" "}
									{unit.label}
								</p>
							</div>

							<div className={styles.panelControls}>
								{zones.length > 1 && (
									<label className={styles.unitSelect}>
										<span>Price zone</span>
										<select
											value={activeZone || ""}
											onChange={(e) => setZone(e.target.value)}
										>
											{zones.map((item) => (
												<option key={item} value={item}>
													{item}
												</option>
											))}
										</select>
									</label>
								)}

								<label className={styles.unitSelect}>
									<span>Units</span>
									<select value={unit.key} onChange={(e) => setUnitKey(e.target.value)}>
										{units.map((u) => (
											<option key={u.key} value={u.key}>
												{u.label}
											</option>
										))}
									</select>
								</label>
							</div>
						</div>

						{!isBackcast ? (
							<div className={styles.emptyState}>
								<p className="text_reg text_600">
									Real Performance benchmarks are not published yet
								</p>
								<p className="text_xxs">
									Aurora has no published Real Performance index for this market so far
									— switch to the Backcast Benchmark to explore modelled revenue.
								</p>
							</div>
						) : (
							<>
								<div className={styles.durationToggles}>
									{durations.map((d) => {
										const on = activeKeys.includes(d.key);
										return (
											<button
												key={d.key}
												type="button"
												onClick={() => toggleDuration(d.key)}
												className={`${styles.durationChip} ${
													on ? styles.durationOn : styles.durationOff
												}`}
												aria-pressed={on}
											>
												<i
													style={{
														background: on ? d.color : "transparent",
														borderColor: d.color,
													}}
												/>
												{d.label}
											</button>
										);
									})}
								</div>

								{hasData ? (
									<BenchmarkLineChart
										series={series}
										xLabels={chart.xLabels}
										activeKeys={activeKeys}
										decimals={unit.decimals}
									/>
								) : (
									<div className={styles.emptyState}>
										<p className="text_reg text_600">
											{loading
												? "Loading benchmark data…"
												: "No published data for this market yet"}
										</p>
										{!loading && (
											<p className="text_xxs">
												{regionLabel(region)} has a benchmark in the catalogue, but Aurora
												has not released monthly figures for it yet.
											</p>
										)}
									</div>
								)}
							</>
						)}

						<div className={styles.panelFoot}>
							<p className={styles.footNote}>
								{isBackcast && range
									? `Monthly granularity · ${range}`
									: "Monthly granularity"}
							</p>
							<div className={styles.footActions}>
								<a href="#flexplorer" className={styles.flexBtn}>
									<img
										src={flexplorerIcon.src}
										className={styles.flexIcon}
										alt=""
										aria-hidden="true"
									/>
									Open this chart in Flexplorer
									<img
										src="/img/battery-benchmark/right.svg"
										className={styles.rightSvg}
									/>
								</a>
								<span className={styles.footDivider} aria-hidden="true" />
								<button
									type="button"
									className={styles.downloadBtn}
									onClick={downloadCsv}
									disabled={!hasData}
								>
									<img
										src={downloadIcon.src}
										className={styles.downloadIcon}
										alt=""
										aria-hidden="true"
									/>
									<span>Download data</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
