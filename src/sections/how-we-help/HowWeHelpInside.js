"use client";
// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import Insights from "@/components/Insights";
import ServicesCircle from "@/components/ServicesCircle";
import SolutionsChallenge from "@/components/SolutionsChallenge";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import Bundles from "@/components/Bundles";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import TransactionsBanner from "@/sections/how-we-help/TransactionsBanner";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";
import HowWeHelpSolutionsChallenge from "@/sections/how-we-help/HowWeHelpSolutionsChallenge";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import CounterDynamic from "@/sections/careers/CounterDynamic";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForAllRegions,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/how-we-help/Transactions.module.scss";

// IMAGES //
import desktop_banner from "/public/img/financial-sector/desktop_banner.jpg";

// SERVICES //

// DATA //

/** Transactions Page */
export default function HowWeHelpInside({ data, services, mapJson, bundles }) {
	const dataForBtn = { postFields: data?.howWeHelpInside || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/how-we-help/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TransactionsPage}>
				<TransactionsBanner
					data={data?.howWeHelpInside?.banner}
					dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
					btnTxt="Get Started"
				/>
				<SectionsHeader
					// customHtml={
					// 	<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
					// 		<Button color="primary" variant="filled" shape="rounded">
					// 			Get Transaction Support
					// 		</Button>
					// 	</div>
					// }
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>

				<div>
					<GloballyBankableInsights
						data={data?.howWeHelpInside?.whyAurora}
						isMultiple={data?.howWeHelpInside?.whyAurora?.list?.length > 1}
					/>
				</div>

				{data?.howWeHelpInside?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders
							data={data?.howWeHelpInside?.ourClient}
							sectionTitle={data?.howWeHelpInside?.ourClient?.title}
						/>
					</div>
				)}
				{data?.howWeHelpInside?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.howWeHelpInside?.ourClient} />
					</div>
				)}
				<div>
					<ServicesCircle data={data?.howWeHelpInside?.keyAdvantages} />
				</div>
				<div>
					<GlobalMap
						className="dark_bg"
						locationJson={mapJson}
						marqueeText={data?.howWeHelpInside?.availableRegions?.marqueeText}
					/>
				</div>
				{data?.howWeHelpInside?.stats && (
					<div className="pb_100 dark_bg">
						<CounterDynamic className="dark_bg" data={data?.howWeHelpInside?.stats} />
					</div>
				)}
				<div className="">
					<TransactionSolutions
						slugPage="how-we-help"
						data={services}
						// data={data?.howWeHelpInside?.spotlights?.selected?.nodes}
						keyValue="howWeHelpInside"
						isSlider={true}
						useSpotlight
					/>
				</div>
				<div className="ptb_100 dark_bg relative">
					<img
						className={`${styles.bgGradient} bgGradientEos`}
						src="/img/eos-bg-gradient.png"
					/>
					<div className="">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						formSectionTitle={data?.howWeHelpInside?.insights?.sectionTitle}
						formSectionDesc={data?.howWeHelpInside?.insights?.sectionDesc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
				<div className="pb_100">
					{/* <SolutionsChallenge /> */}
					<HowWeHelpSolutionsChallenge />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
