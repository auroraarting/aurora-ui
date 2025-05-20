"use client";
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/who-are-you/FinancialSector.module.scss";
import CounterDynamic from "../careers/CounterDynamic";

// IMAGES //

// DATA //

// SERVICES //

/** FinancialSector Page */
export default function WhoAreYouInsideWrap({
	data,
	services,
	mapJson,
	regions,
}) {
	const dataForBtn = { postFields: data?.whoAreYous || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/who-are-you/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.FinancialSectorPage}>
				<div className="pb_60">
					<InnerBanner
						// bannerTitle="Energy solutions for those who see beyond the grid"
						// bannerDescription="Aurora empowers industries with tailored energy intelligence, helping decision-makers drive impact, manage risks, and seize opportunities in a rapidly changing energy landscape."
						// btnTxt="Connect Now"
						// desktopImage={desktop_banner.src}
						// mobileImage={desktop_banner.src}

						bannerTitle={data?.whoAreYous?.banner?.title}
						bannerDescription={data?.whoAreYous?.banner?.description}
						desktopImage={
							data?.whoAreYous?.banner?.desktopThumbnail?.node?.mediaItemUrl
						}
						mobileImage={
							data?.whoAreYous?.banner?.mobileThumbnail?.node?.mediaItemUrl
						}
						vimeoid={data?.whoAreYous?.banner?.videoLink}
						dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
						// btnTxt="Connect Now"
					/>
				</div>
				<SectionsHeader
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
				<SmarterEnergy data={data?.whoAreYous?.expertise} />
				<div>
					<GlobalMap
						className="black_bg"
						locationJson={mapJson}
						marqueeText={data?.whoAreYous?.availableRegions?.marqueeText}
					/>
				</div>
				{data?.whoAreYous?.stats && (
					<div className="">
						<CounterDynamic data={data?.whoAreYous?.stats} />
					</div>
				)}
				<div>
					<GloballyBankableInsights
						isMultiple={data?.whoAreYous?.whyAurora?.list?.length > 1}
						data={data?.whoAreYous?.whyAurora}
					/>
				</div>

				{data?.whoAreYous?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data?.whoAreYous?.ourClient} />
					</div>
				)}
				{data?.whoAreYous?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.whoAreYous?.ourClient} />
					</div>
				)}
				<div className="ptb_100 dark_bg">
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						formSectionBtnText="Start the Conversation"
					/>
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
