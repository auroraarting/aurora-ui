"use client";
/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import SoftwareCards from "@/components/SoftwareCards";
import Bundles from "@/components/Bundles";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import EosBanner from "@/sections/eos/EosBanner";
import CuttingEdgeModels from "@/sections/eos/CuttingEdgeModels";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/Eos.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** EOS Page */
export default function EOSPageWrap({
	mapJson,
	otherList,
	countries,
	data,
	bundles,
	dataForBtn,
}) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"EOS"} Desc={""} OgImg={""} Url={"/eos"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page eos starts here */}
			<main className={styles.EOSPage}>
				<div>
					<EosBanner
						bannerTitle={data?.banner?.title}
						bannerDescription={data?.banner?.description}
						btnTxt={data?.banner?.buttonText}
						btnLink={data?.banner?.buttonLink}
						desktopImage={data?.banner?.desktopThumbnail?.node?.sourceUrl}
						mobileImage={data?.banner?.mobileThumbnail?.node?.sourceUrl}
						videoSrc={data?.banner?.vimeoLink}
						vimeoid={data?.banner?.vimeoLink}
						logo={data?.banner?.logo?.node?.sourceUrl}
						dataForBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
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
				<div className="ptb_100 ">
					<div className="container">
						<div className={`f_j ${styles.bundlesHeader} pb_40`}>
							<p className="text_xl f_w_s_b font_primary">{data?.bundles?.title}</p>
							<p className="font_secondary">{data?.bundles?.desc}</p>
						</div>
					</div>
					<Bundles data={bundles} />
				</div>
				<GlobalMap locationJson={mapJson} />
				{data.trustedModels.sectionTitle && (
					<div className="ptb_100">
						<CuttingEdgeModels data={data.trustedModels} />
					</div>
				)}
				<ServicesCircle data={data.keyAdvantages} />
				{data.ourClient.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data.ourClient.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				<div>
					<SmarterEnergy data={data.expertise} />
				</div>
				<div className={`${styles.insightBg} pt_30`}>
					<div>
						<div className="pb_100">
							<Insights
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={otherList}
								countries={countries}
								formSectionTitle="Expertise that powers progress"
								formSectionDesc="Our team provides tailored onboarding, in-depth feature training, and expert-led valuation reviews with Chronos specialists. Stay ahead with exclusive access to online and in-person community events."
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>
					{/* <div className={`${styles.boxBg} pb_100`}>
						<EventSmarterEnergy />
					</div> */}
				</div>
				<div className="ptb_100">
					<SoftwareCards />
				</div>
			</main>
			<IframeModal />
			{/* Page eos ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
