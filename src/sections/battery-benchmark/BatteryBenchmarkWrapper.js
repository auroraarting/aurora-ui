"use client";

// MODULES //
import { useMemo, useState } from "react";

// COMPONENTS //
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import BatteryBenchmarkBanner from "./BatteryBenchmarkBanner";
import BatteryBenchmarkIndices from "./BatteryBenchmarkIndices";
import BatteryBenchmarkExplorer from "./BatteryBenchmarkExplorer";
import FlexplorerCard from "./FlexplorerCard";
import MethodologyPanel from "./MethodologyPanel";
import MethodologyPanelV2 from "./MethodologyPanelV2";
import FlexplorerCta from "./FlexplorerCta";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";

// IMAGES //

// DATA //
import { buildRegions, firstAvailableRegion } from "./benchmarkData";
import { flexplorerChartUrl } from "./eosLinks";

// SERVICES //

/** Battery Benchmarks Page */
export default function BatteryBenchmarkWrapper({
	pageContent,
	regions,
	benchmarks,
	initialSeries,
	realBenchmarks = [],
	initialRealSeries = {},
}) {
	// Banner copy and its button come from the Battery Benchmarks page in
	// WordPress (wp/v2/pages?slug=battery-benchmarks).
	const cmsButton = pageContent?.topSectionButton;
	const dataForBtn = { postFields: { topSectionButton: cmsButton } };
	const [benchmarkType, setBenchmarkType] = useState("backcast");

	// Active benchmark catalogue and initial series based on benchmark type
	const activeBenchmarks =
		benchmarkType === "real" && realBenchmarks.length > 0
			? realBenchmarks
			: benchmarks;
	const activeInitialSeries =
		benchmarkType === "real" && Object.keys(initialRealSeries).length > 0
			? initialRealSeries
			: initialSeries;

	// The selected market is held here so the explorer and the methodology
	// panel (whose CMS rows are per region) stay on the same one.
	const openingRegion = useMemo(
		() => firstAvailableRegion(buildRegions(regions, activeBenchmarks)),
		[regions, activeBenchmarks],
	);
	const [region, setRegion] = useState(openingRegion);
	const activeRegion = region || openingRegion;

	// Which methodology model to render. Any published v2 row wins; with the v2
	// field empty this is false and the page behaves exactly as it does today.
	const hasMethodologyV2 = useMemo(
		() =>
			(pageContent?.methodologyV2 || []).some(
				(row) =>
					row?.regionCode &&
					row.status !== "draft" &&
					(row.description || row.sections?.length),
			),
		[pageContent],
	);

	// Real Performance isn't published on this site, so its card is a link out
	// to the EOS leaderboards for the market currently in view — it does not
	// switch the on-page index.
	const indexLinks = useMemo(
		() => ({ real: flexplorerChartUrl(activeRegion, "real") }),
		[activeRegion],
	);

	return (
		<div>
			{/* Page Content starts here */}
			<main className={styles.ProductsPage}>
				<BatteryBenchmarkBanner
					bannerTitle={pageContent?.banner?.title}
					bannerDescription={pageContent?.banner?.description}
					btnLink={cmsButton?.url}
					dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
				/>

				<div className="pt_100">
					<BatteryBenchmarkIndices
						selected={benchmarkType}
						onSelect={setBenchmarkType}
						// externalLinks={indexLinks}
					/>
				</div>
				<div className="pt_40">
					<BatteryBenchmarkExplorer
						benchmarkType={benchmarkType}
						regionCodes={regions}
						benchmarks={activeBenchmarks}
						initialSeries={activeInitialSeries}
						region={activeRegion}
						onRegionChange={setRegion}
					/>
				</div>
				<div className="pt_40">
					<div className="container">
						<div className={styles.flexplorerLayout}>
							<FlexplorerCard />
							{/* The v2 methodology model takes over as soon as it has a
							    published row, otherwise the original panel renders exactly as
							    before — so filling in the v2 field is the whole switch, and
							    emptying it is the whole way back. */}
							{hasMethodologyV2 ? (
								<MethodologyPanelV2
									sections={
										benchmarkType === "backcast"
											? pageContent?.methodologyV2
											: pageContent?.realPMethodologyV2
									}
									region={activeRegion}
								/>
							) : (
								<MethodologyPanel
									sections={pageContent?.methodology}
									region={activeRegion}
									updated={pageContent?.updated}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="pt_100">
					<FlexplorerCta />
				</div>
			</main>
			<IframeModal centred />
			{/* Page Content ends here */}
		</div>
	);
}
