"use client";

// MODULES //
import { useMemo, useState } from "react";

// COMPONENTS //
import BenchmarkLineChart from "./BenchmarkLineChart";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkExplorer.module.scss";

// IMAGES //
import flexplorerIcon from "../../../public/img/battery-benchmark/flexplorer.svg";
import downloadIcon from "../../../public/img/battery-benchmark/download-svg.svg";

// DATA //
import {
	buildRegions,
	durations,
	getChartSeries,
	monthLabels,
	units,
} from "./benchmarkData";

/** BatteryBenchmarkExplorer Section — region selector + benchmark chart */
export default function BatteryBenchmarkExplorer({
	benchmarkType = "backcast",
	regionCodes,
}) {
	const [mode, setMode] = useState("single"); // "single" | "compare"
	const [region, setRegion] = useState("gbr");
	const [unitKey, setUnitKey] = useState(units[0].key);
	const [activeKeys, setActiveKeys] = useState(durations.map((d) => d.key));

	// The API returns codes only ("gbr", "deu", …) - labelled and ordered here
	const regions = useMemo(() => buildRegions(regionCodes), [regionCodes]);

	const activeRegion = regions.find((r) => r.key === region) || regions[0];

	const unit = units.find((u) => u.key === unitKey) || units[0];

	// Series scaled to the selected unit
	const series = useMemo(() => {
		const base = getChartSeries(activeRegion?.key, benchmarkType);
		if (unit.factor === 1) return base;
		return base.map((s) => ({
			...s,
			data: s.data.map((v) => Math.round(v * unit.factor * 100) / 100),
		}));
	}, [activeRegion, benchmarkType, unit]);

	const toggleDuration = (key) => {
		setActiveKeys((prev) =>
			prev.includes(key)
				? prev.length > 1
					? prev.filter((k) => k !== key)
					: prev
				: [...prev, key],
		);
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

						{/* <div className={styles.modeToggle}>
							<button
								type="button"
								className={mode === "single" ? styles.modeActive : ""}
								onClick={() => setMode("single")}
							>
								Single market
							</button>
							<button
								type="button"
								className={mode === "compare" ? styles.modeActive : ""}
								onClick={() => setMode("compare")}
							>
								Compare markets
							</button>
						</div> */}

							<ul className={styles.regionList}>
								{regions.map((r) => (
									<li key={r.key}>
										<button
											type="button"
											disabled={r.soon}
											onClick={() => !r.soon && setRegion(r.key)}
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
									{activeRegion?.label} Battery Benchmark
								</h3>
								<p className={`${styles.panelSub} text_xxs`}>
									Modelled revenue · {unit.label}
								</p>
							</div>

							<label className={styles.unitSelect}>
								<span>Units</span>
								<select value={unitKey} onChange={(e) => setUnitKey(e.target.value)}>
									{units.map((u) => (
										<option key={u.key} value={u.key}>
											{u.label}
										</option>
									))}
								</select>
							</label>
						</div>

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

						<BenchmarkLineChart
							series={series}
							xLabels={monthLabels}
							activeKeys={activeKeys}
						/>

						<div className={styles.panelFoot}>
							<p className={styles.footNote}>
								Monthly granularity · full history shown — no timeframe selector.
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
								<button type="button" className={styles.downloadBtn}>
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
