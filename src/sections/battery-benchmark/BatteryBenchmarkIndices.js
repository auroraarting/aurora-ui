"use client";

// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// STYLES //
import styles from "@/styles/sections/battery-benchmark/BatteryBenchmarkIndices.module.scss";

// DATA //
import { benchmarkTypes } from "./benchmarkData";

/** BatteryBenchmarkIndices Section — the two complementary storage indices toggle */
export default function BatteryBenchmarkIndices({ selected, onSelect }) {
	const active =
		benchmarkTypes.find((t) => t.key === selected) || benchmarkTypes[0];

	return (
		<div className={`${styles.IndicesWrap}`}>
			<div className="container">
				<section className={`${styles.Indices} pt_60`}>
					<div className={styles.top}>
						<h2 className="text_md font_primary f_w_m color_secondary">
							Aurora publishes two complementary storage indices
						</h2>

						<div className={styles.cards} role="tablist" aria-label="Benchmark index">
							{benchmarkTypes.map((type) => (
								<button
									key={type.key}
									type="button"
									role="tab"
									aria-selected={type.key === active.key}
									onClick={() => onSelect?.(type.key)}
									className={`${styles.card} ${
										type.key === active.key ? styles.cardActive : ""
									}`}
								>
									<span className={styles.radio} aria-hidden="true" />
									<span className={styles.cardBody}>
										<span className={`${styles.cardTitle} text_xs text_600`}>
											{type.title}
										</span>
										<span className={`${styles.cardText} text_xs`}>{type.short}</span>
									</span>
								</button>
							))}
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
