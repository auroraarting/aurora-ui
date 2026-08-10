"use client";

// MODULES //
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkExplorer.module.scss";

// Width assumed for the very first (server) render, before the container is
// measured. Everything below is derived from the real measured width.
const FALLBACK_WIDTH = 900;

// useLayoutEffect measures before paint so the chart never flashes at the
// fallback size, but it must not run during SSR.
const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Geometry for a given rendered width. The viewBox is kept 1:1 with the
 *  on-screen pixel size so nothing is downscaled — at a fixed 900x420 viewBox
 *  a phone squeezed the chart to ~0.32 scale, which rendered the 12px axis
 *  labels at under 4px and the series strokes as hairlines. */
function geometryFor(width) {
	const compact = width < 560;
	return {
		width,
		// Portrait-ish on phones so the plot keeps usable height at narrow widths.
		height: compact ? Math.round(Math.max(200, width * 0.78)) : 420,
		compact,
		pad: compact
			? { top: 16, right: 14, bottom: 34, left: 40 }
			: { top: 24, right: 24, bottom: 44, left: 56 },
	};
}

/** A "nice" gridline step (1, 2, 2.5 or 5 x a power of ten) for a given max.
 *  The smallest one that keeps the axis to six intervals — picking off the
 *  rough max/5 instead let some units land on three coarse gridlines, so the
 *  same series looked differently spaced from one unit to the next. */
function niceStep(max) {
	const magnitude = Math.pow(10, Math.floor(Math.log10(max > 0 ? max : 1)));
	const steps = [0.1, 0.2, 0.25, 0.5, 1, 2, 2.5, 5, 10].map(
		(s) => s * magnitude,
	);
	return steps.find((step) => Math.ceil(max / step) <= 6) || max || 1;
}

/**
 * Lightweight, dependency-free SVG line chart.
 * @param {Array} series - [{ key, label, color, data: Array<number|null> }]
 * @param {string[]} xLabels - label for every data point
 * @param {number[]} activeKeys - which series keys are visible
 * @param {number} decimals - decimal places on the axis and tooltip
 */
export default function BenchmarkLineChart({
	series = [],
	xLabels = [],
	activeKeys,
	decimals = 1,
}) {
	const [hover, setHover] = useState(null);
	const wrapRef = useRef(null);
	const [measuredWidth, setMeasuredWidth] = useState(FALLBACK_WIDTH);

	// Track the container width so the SVG can be drawn at its true pixel size.
	useIsomorphicLayoutEffect(() => {
		const el = wrapRef.current;
		if (!el) return;
		const apply = (w) => {
			if (w > 0) setMeasuredWidth(Math.round(w));
		};
		apply(el.getBoundingClientRect().width);
		if (typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(([entry]) => apply(entry.contentRect.width));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const {
		width: WIDTH,
		height: HEIGHT,
		pad: PAD,
		compact,
	} = useMemo(() => geometryFor(Math.max(240, measuredWidth)), [measuredWidth]);

	const innerW = WIDTH - PAD.left - PAD.right;
	const innerH = HEIGHT - PAD.top - PAD.bottom;

	const visibleSeries = useMemo(
		() =>
			activeKeys ? series.filter((s) => activeKeys.includes(s.key)) : series,
		[series, activeKeys],
	);

	// Y axis: round the max up to a clean ceiling with 5 gridlines. The step is
	// derived from the data because values range from ~2 (€/kW/month) to
	// thousands (€/MW/month) depending on the selected unit.
	const { maxValue, step } = useMemo(() => {
		const all = visibleSeries
			.flatMap((s) => s.data)
			.filter((v) => v !== null && Number.isFinite(v));
		const raw = all.length ? Math.max(...all) : 1;
		const size = niceStep(raw);
		return { maxValue: Math.max(size, Math.ceil(raw / size) * size), step: size };
	}, [visibleSeries]);

	const yTicks = useMemo(() => {
		const ticks = [];
		for (let v = 0; v <= maxValue + step / 2; v += step) ticks.push(v);
		return ticks;
	}, [maxValue, step]);

	const pointCount = xLabels.length || 1;
	const xAt = (i) => PAD.left + (innerW * i) / Math.max(1, pointCount - 1);
	const yAt = (v) => PAD.top + innerH - (innerH * v) / maxValue;

	// Fit the x-axis labels to the space actually available (~52px each) instead
	// of always aiming for 10, which overlapped badly on narrow screens.
	const maxLabels = Math.max(2, Math.floor(innerW / 52));
	const labelStride = Math.max(1, Math.ceil(pointCount / maxLabels));

	/** Nearest data point to a clientX, for touch scrubbing. */
	const indexFromClientX = (clientX) => {
		const svg = wrapRef.current?.querySelector("svg");
		if (!svg) return null;
		const box = svg.getBoundingClientRect();
		if (!box.width) return null;
		const x = ((clientX - box.left) / box.width) * WIDTH;
		const ratio = (x - PAD.left) / Math.max(1, innerW);
		const i = Math.round(ratio * Math.max(1, pointCount - 1));
		return Math.min(pointCount - 1, Math.max(0, i));
	};

	const onTouch = (e) => {
		const touch = e.touches?.[0];
		if (!touch) return;
		const i = indexFromClientX(touch.clientX);
		if (i !== null) setHover(i);
	};

	return (
		<div className={styles.chartWrap} ref={wrapRef}>
			<svg
				className={`${styles.chartSvg} ${compact ? styles.chartCompact : ""}`}
				viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
				style={{ height: HEIGHT }}
				role="img"
				aria-label="Battery benchmark modelled revenue over time"
				preserveAspectRatio="xMidYMid meet"
				onTouchStart={onTouch}
				onTouchMove={onTouch}
				onTouchEnd={() => setHover(null)}
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
							{v.toFixed(decimals)}
						</text>
					</g>
				))}

				{/* X labels */}
				{xLabels.map((label, i) =>
					i % labelStride === 0 || i === pointCount - 1 ? (
						<text
							key={label + i}
							x={xAt(i)}
							y={HEIGHT - PAD.bottom + (compact ? 18 : 22)}
							className={styles.axisLabel}
							/* Anchor the end labels inward so they can't spill past the
							   plot area and widen the page on narrow screens. */
							textAnchor={
								i === 0 ? "start" : i === pointCount - 1 ? "end" : "middle"
							}
						>
							{label}
						</text>
					) : null,
				)}

				{/* Series lines + markers — months without a value are skipped so a
				    partial series draws as far as it goes instead of dropping to 0 */}
				{visibleSeries.map((s) => {
					const drawn = s.data
						.map((v, i) => ({ v, i }))
						.filter(({ v }) => v !== null && Number.isFinite(v));
					const points = drawn.map(({ v, i }) => `${xAt(i)},${yAt(v)}`).join(" ");
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
							{drawn.map(({ v, i }) => (
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
						// Clamped so the bubble stays inside the panel near the axis ends.
						left: `${Math.min(82, Math.max(18, (xAt(hover) / WIDTH) * 100))}%`,
					}}
				>
					<span className={styles.tooltipDate}>{xLabels[hover]}</span>
					{visibleSeries.map((s) => (
						<span key={s.key} className={styles.tooltipRow}>
							<i style={{ background: s.color }} />
							{s.label}
							<b>
								{s.data[hover] === null || s.data[hover] === undefined
									? "—"
									: s.data[hover].toFixed(decimals)}
							</b>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
