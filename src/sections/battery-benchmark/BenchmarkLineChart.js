"use client";

// MODULES //
import { useMemo, useState } from "react";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkExplorer.module.scss";

// Chart geometry (SVG user units — scaled responsively via viewBox)
const WIDTH = 900;
const HEIGHT = 420;
const PAD = { top: 24, right: 24, bottom: 44, left: 56 };

/**
 * Lightweight, dependency-free SVG line chart.
 * @param {Array} series - [{ key, label, color, data: number[] }]
 * @param {string[]} xLabels - label for every data point
 * @param {number[]} activeKeys - which series keys are visible
 */
export default function BenchmarkLineChart({ series = [], xLabels = [], activeKeys }) {
	const [hover, setHover] = useState(null);

	const innerW = WIDTH - PAD.left - PAD.right;
	const innerH = HEIGHT - PAD.top - PAD.bottom;

	const visibleSeries = useMemo(
		() =>
			activeKeys ? series.filter((s) => activeKeys.includes(s.key)) : series,
		[series, activeKeys],
	);

	// Y axis: round the max up to a clean ceiling with 5 gridlines
	const maxValue = useMemo(() => {
		const all = visibleSeries.flatMap((s) => s.data);
		const raw = all.length ? Math.max(...all) : 1000;
		const step = 400;
		return Math.max(step, Math.ceil(raw / step) * step);
	}, [visibleSeries]);

	const yTicks = useMemo(() => {
		const ticks = [];
		const step = maxValue / 5;
		for (let v = 0; v <= maxValue; v += step) ticks.push(v);
		return ticks;
	}, [maxValue]);

	const pointCount = xLabels.length || 1;
	const xAt = (i) => PAD.left + (innerW * i) / Math.max(1, pointCount - 1);
	const yAt = (v) => PAD.top + innerH - (innerH * v) / maxValue;

	// Show ~10 x-axis labels so they don't collide
	const labelStride = Math.max(1, Math.round(pointCount / 10));

	return (
		<div className={styles.chartWrap}>
			<svg
				className={styles.chartSvg}
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				role="img"
				aria-label="Battery benchmark modelled revenue over time"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Horizontal gridlines + Y labels */}
				{yTicks.map((v) => (
					<g key={v}>
						<line
							x1={PAD.left}
							x2={WIDTH - PAD.right}
							y1={yAt(v)}
							y2={yAt(v)}
							className={styles.gridLine}
						/>
						<text
							x={PAD.left - 12}
							y={yAt(v)}
							className={styles.axisLabel}
							textAnchor="end"
							dominantBaseline="middle"
						>
							{v.toFixed(1)}
						</text>
					</g>
				))}

				{/* X labels */}
				{xLabels.map((label, i) =>
					i % labelStride === 0 || i === pointCount - 1 ? (
						<text
							key={label + i}
							x={xAt(i)}
							y={HEIGHT - PAD.bottom + 22}
							className={styles.axisLabel}
							textAnchor="middle"
						>
							{label}
						</text>
					) : null,
				)}

				{/* Series lines + markers */}
				{visibleSeries.map((s) => {
					const points = s.data
						.map((v, i) => `${xAt(i)},${yAt(v)}`)
						.join(" ");
					return (
						<g key={s.key}>
							<polyline
								points={points}
								fill="none"
								stroke={s.color}
								strokeWidth="2.5"
								strokeLinejoin="round"
								strokeLinecap="round"
							/>
							{s.data.map((v, i) => (
								<circle
									key={i}
									cx={xAt(i)}
									cy={yAt(v)}
									r={hover === i ? 4 : 2.5}
									fill={s.color}
								/>
							))}
						</g>
					);
				})}

				{/* Hover interaction layer */}
				{hover !== null && (
					<line
						x1={xAt(hover)}
						x2={xAt(hover)}
						y1={PAD.top}
						y2={PAD.top + innerH}
						className={styles.hoverLine}
					/>
				)}
				{xLabels.map((label, i) => (
					<rect
						key={"hit" + i}
						x={xAt(i) - innerW / pointCount / 2}
						y={PAD.top}
						width={innerW / pointCount}
						height={innerH}
						fill="transparent"
						onMouseEnter={() => setHover(i)}
						onMouseLeave={() => setHover(null)}
					/>
				))}
			</svg>

			{/* Tooltip */}
			{hover !== null && (
				<div
					className={styles.tooltip}
					style={{
						left: `${(xAt(hover) / WIDTH) * 100}%`,
					}}
				>
					<span className={styles.tooltipDate}>{xLabels[hover]}</span>
					{visibleSeries.map((s) => (
						<span key={s.key} className={styles.tooltipRow}>
							<i style={{ background: s.color }} />
							{s.label}
							<b>{s.data[hover]}</b>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
