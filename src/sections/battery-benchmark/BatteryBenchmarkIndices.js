"use client";

// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkIndices.module.scss";

// DATA //
import { benchmarkTypes } from "./benchmarkData";

/** BatteryBenchmarkIndices Section — the two complementary storage indices toggle
 *
 * @param {Object} externalLinks - keyed by benchmark type; a type listed here
 *   renders as a link out to EOS instead of an on-page selector, because the
 *   index isn't published on this site.
 */
export default function BatteryBenchmarkIndices({
	selected,
	onSelect,
	externalLinks = {},
}) {
	const active =
		benchmarkTypes.find((t) => t.key === selected) || benchmarkTypes[0];

	const cardBody = (type) => (
		<>
			<span className={styles.radio} aria-hidden="true" />
			<span className={styles.cardBody}>
				<span className={`${styles.cardTitle} text_xs text_600`}>{type.title}</span>
				<span className={`${styles.cardText} text_xs`}>{type.short}</span>
			</span>
		</>
	);

	return (
		<div className={`${styles.IndicesWrap}`}>
			<div className="container">
				<section className={`${styles.Indices} pt_60`}>
					<div className={styles.top}>
						<h2 className="text_md font_primary f_w_m color_secondary">
							Aurora publishes two complementary storage indices
						</h2>

						<div className={styles.cards} aria-label="Benchmark index">
							{benchmarkTypes.map((type) => {
								const href = externalLinks[type.key];
								const className = `${styles.card} ${
									type.key === active.key ? styles.cardActive : ""
								}`;

								// Links out to EOS — never becomes the selected index, so it
								// carries no tab/pressed state.
								if (href) {
									return (
										<a
											key={type.key}
											href={href}
											target="_blank"
											rel="noreferrer"
											className={className}
										>
											{cardBody(type)}
										</a>
									);
								}

								return (
									<button
										key={type.key}
										type="button"
										aria-pressed={type.key === active.key}
										onClick={() => onSelect?.(type.key)}
										className={className}
									>
										{cardBody(type)}
									</button>
								);
							})}
						</div>
					</div>
					<div className={`${styles.description} text_xs color_dark_gray`}>
						<ContentFromCms>{active.description}</ContentFromCms>
					</div>
				</section>
			</div>
		</div>
	);
}
