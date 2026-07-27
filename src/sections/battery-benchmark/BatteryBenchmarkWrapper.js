"use client";

// MODULES //
import { useState } from "react";

// COMPONENTS //
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IntegratedSystem from "@/components/IntegratedSystem";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";
import IframeModal from "@/components/IframeModal";
import Bundles from "@/components/Bundles";

// SECTIONS //
import BatteryBenchmarkBanner from "./BatteryBenchmarkBanner";
import BatteryBenchmarkIndices from "./BatteryBenchmarkIndices";
import BatteryBenchmarkExplorer from "./BatteryBenchmarkExplorer";
import FlexplorerCard from "./FlexplorerCard";
import MethodologyPanel from "./MethodologyPanel";
import FlexplorerCta from "./FlexplorerCta";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForProducts,
	removeDuplicatesByKeys,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import GlobalMap from "@/components/GlobalMap";

// IMAGES //

// DATA //

// SERVICES //

/** Meta Data */
export const metadata = {
	title: "Products | Aurora",
	description: "Aurora",
};

/** Products Page */
export default function BatteryBenchmarkWrapper({ data }) {
	const dataForBtn = { postFields: data?.products || {} };
	const [benchmarkType, setBenchmarkType] = useState("backcast");

	return (
		<div>
			{/* Page Content starts here */}
			<main className={styles.ProductsPage}>
				{/* <ProductListingWrapper /> */}
				<BatteryBenchmarkBanner
					data={data?.products}
					bannerTitle={data?.products?.banner?.title}
					bannerDescription={data?.products?.banner?.description}
					// btnTxt={data?.products?.banner?.buttonText}
					btnLink={data?.products?.banner?.buttonLink}
					desktopImage={data?.products?.banner?.desktopThumbnail?.node?.mediaItemUrl}
					mobileImage={data?.products?.banner?.mobileThumbnail?.node?.mediaItemUrl}
					videoSrc={data?.products?.banner?.vimeoLink}
					vimeoid={data?.products?.banner?.vimeoLink}
					videos={data?.products?.banner?.videos}
					logo={data?.products?.banner?.logo?.node?.mediaItemUrl}
					dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
				/>

				<div className="pt_100">
					<BatteryBenchmarkIndices
						selected={benchmarkType}
						onSelect={setBenchmarkType}
					/>
				</div>
				<div className="pt_40">
					<BatteryBenchmarkExplorer benchmarkType={benchmarkType} />
				</div>
				<div className="pt_40">
					<div className="container">
						<div className={styles.flexplorerLayout}>
							<FlexplorerCard />
							<MethodologyPanel />
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
