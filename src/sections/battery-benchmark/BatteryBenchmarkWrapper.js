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
import FlexplorerCta from "./FlexplorerCta";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";

// IMAGES //

// DATA //
import { buildRegions, firstAvailableRegion } from "./benchmarkData";

// SERVICES //

/** Battery Benchmarks Page */
export default function BatteryBenchmarkWrapper({
	pageContent,
	regions,
	benchmarks,
	initialSeries,
}) {
	// Banner copy and its button come from the Battery Benchmarks page in
	// WordPress (wp/v2/pages?slug=battery-benchmarks).
	const cmsButton = pageContent?.topSectionButton;
	const dataForBtn = { postFields: { topSectionButton: cmsButton } };
	const [benchmarkType, setBenchmarkType] = useState("backcast");

	// The selected market is held here so the explorer and the methodology
	// panel (whose CMS rows are per region) stay on the same one.
	const openingRegion = useMemo(
		() => firstAvailableRegion(buildRegions(regions, benchmarks)),
		[regions, benchmarks],
	);
	const [region, setRegion] = useState(openingRegion);

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
					/>
				</div>
				<div className="pt_40">
					<BatteryBenchmarkExplorer
						benchmarkType={benchmarkType}
						regionCodes={regions}
						benchmarks={benchmarks}
						initialSeries={initialSeries}
						region={region || openingRegion}
						onRegionChange={setRegion}
					/>
				</div>
				<div className="pt_40">
					<div className="container">
						<div className={styles.flexplorerLayout}>
							<FlexplorerCard />
							<MethodologyPanel
								sections={pageContent?.methodology}
								region={region || openingRegion}
								updated={pageContent?.updated}
							/>
						</div>
					</div>
				</div>
				<div className="pt_100">
					<FlexplorerCta />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}
		</div>
	);
}
