"use client";
// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import GlobalMap from "@/components/GlobalMap";
import Bundles from "@/components/Bundles";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForSoftware,
	removeDuplicatesByKeys,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/softwares/SoftwareLanding.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/banner/desktop_banner.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //

/** Chronos Page */
export default function SoftwaresLanding({
	mapJson,
	data,
	clientLogos,
	testimonials,
	softwares,
	insights,
	countries,
	bundles,
}) {
	const dataForBtn = {
		postFields: data,
	};

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Softwares"} Desc={""} OgImg={""} Url={"/software"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.SoftwareLanding}>
				<InnerBanner
					bannerTitle={data.banner.title}
					bannerDescription={data.banner.description}
					showContentOnly
				/>
				<div>
					<TransactionSolutions
						data={softwares.nodes}
						keyValue={"softwares"}
						slugPage="software"
					/>
				</div>
				<div>
					<GloballyBankableInsights data={data.whyAurora} />
				</div>
				<GlobalMap locationJson={mapJson} />
				{clientLogos?.selectLogos?.nodes?.length > 0 && (
					<div className="pb_50 pt_100 ">
						<TrustedLeaders data={clientLogos} />
					</div>
				)}
				{testimonials?.testimonials?.nodes?.length > 0 && (
					<div className="pb_100">
						<TestimonialFeedback data={testimonials} />
					</div>
				)}
				<div className="pt_100 dark_bg relative">
					<img
						className={`${styles.bgGradient} bgGradientEos`}
						src="/img/eos-bg-gradient.png"
					/>
					<div className="pb_100">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div>
				<div className={`${styles.insightBg}  pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								formSectionTitle={data?.insights?.sectionTitle}
								formSectionDesc={data?.insights?.sectionDesc}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={insights}
								countries={countries}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "inisghtsSectionButton").btntext
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "inisghtsSectionButton")}
							/>
						</div>
					</div>
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
