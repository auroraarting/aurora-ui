"use client";
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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
import ServicesCircle from "@/components/ServicesCircle";
import CaseStudy from "@/components/CaseStudy";
import IframeModal from "@/components/IframeModal";
import Bundles from "@/components/Bundles";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import GlobalMap from "@/components/GlobalMap";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/services/advisory.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Advisory Page */
export default function ServicesWrap({
	data,
	mapJson,
	bundles,
	countries,
	otherList,
}) {
	const dataForBtn = { postFields: data.services || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`https://auroraer.com/service/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AdvisoryPage}>
				<div className="">
					<InnerBanner
						bannerTitle={data?.services?.banner?.title}
						bannerDescription={data?.services?.banner?.description}
						btnLink={data?.services?.banner?.buttonLink}
						btnTxt={data?.services?.banner?.buttonText}
						desktopImage={
							data?.services?.banner?.desktopThumbnail?.node?.mediaItemUrl
						}
						mobileImage={data?.services?.banner?.mobileThumbnail?.node?.mediaItemUrl}
						vimeoid={data?.services?.banner?.vimeoLink}
						logo={data?.services?.banner?.logo?.node?.mediaItemUrl}
						dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
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
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<SmarterEnergy data={data?.services?.expertise} />
				<ServicesCircle
					data={data?.services?.keyAdvantages}
					customHtml={
						<>
							{dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionButton")
								?.btntext && (
								<div
									{...dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionButton")}
									className="pt_40"
								>
									<Button color="white" variant="filled" shape="rounded">
										{
											dynamicInsightsBtnProps(dataForBtn, "keyAdvantageSectionButton")
												?.btntext
										}
									</Button>
								</div>
							)}
						</>
					}
				/>
				{data?.services?.caseStudy?.title && (
					<div className="ptb_100">
						<CaseStudy data={data?.services?.caseStudy} countries={countries} />
					</div>
				)}
				{mapJson.length > 0 && (
					<GlobalMap
						locationJson={mapJson}
						marqueeText={data?.products?.map?.marquee}
					/>
				)}
				{data?.services?.ourClient?.selectLogos && (
					<div className="pb_50 pt_100 ">
						<TrustedLeaders data={data?.services?.ourClient} />
					</div>
				)}
				{data?.services?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.services?.ourClient} />
					</div>
				)}
				<div className="ptb_100 dark_bg relative">
					<img
						className={`${styles.bgGradient} bgGradientEos`}
						src="/img/eos-bg-gradient.png"
					/>
					<div className="">
						<EosIntegratedSystem name="" />
					</div>
					<Bundles data={bundles} name="" />
				</div>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						countries={countries}
						defaultList={data?.services?.insights?.list?.nodes}
						formSectionTitle={data?.services?.insights?.sectionTitle}
						formSectionDesc={data?.services?.insights?.sectionDesc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal hideLeft />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
