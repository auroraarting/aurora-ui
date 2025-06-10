"use client";
// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import ServicesCircle from "@/components/ServicesCircle";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import IntegratedSystem from "@/components/IntegratedSystem";
import GlobalMap from "@/components/GlobalMap";
import SectionsHeader from "@/components/SectionsHeader";
import SmarterEnergy from "@/components/SmarterEnergy";
import IframeModal from "@/components/IframeModal";
import CaseStudy from "@/components/CaseStudy";
import Bundles from "@/components/Bundles";

// SECTIONS //
import ProductBanner from "@/sections/products/ProductBanner";
import MarketIntelligence from "@/sections/products/MarketIntelligence";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import TrustOurExperts from "@/sections/softwares/TrustOurExperts";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/ProductInside.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** ProductInside Page */
export default function ProductInsideWrap({ data, mapJson, bundles }) {
	const dataForBtn = { postFields: data?.products || {} };

	console.log(data, "data");
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/products/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ProductInsidePage}>
				<div>
					<ProductBanner
						data={data?.products}
						bannerTitle={data?.products?.banner?.title}
						bannerDescription={data?.products?.banner?.description}
						// btnTxt={data?.products?.banner?.buttonText}
						btnLink={data?.products?.banner?.buttonLink}
						desktopImage={
							data?.products?.banner?.desktopThumbnail?.node?.mediaItemUrl
						}
						mobileImage={data?.products?.banner?.mobileThumbnail?.node?.mediaItemUrl}
						videoSrc={data?.products?.banner?.vimeoLink}
						vimeoid={data?.products?.banner?.vimeoLink}
						logo={data?.products?.banner?.logo?.node?.mediaItemUrl}
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
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				{data?.products?.introduction?.title && (
					<div className="ptb_100">
						<MarketIntelligence data={data?.products?.introduction} />
					</div>
				)}
				<GlobalMap
					locationJson={mapJson}
					marqueeText={data?.products?.map?.marquee}
				/>
				{data?.products?.caseStudy?.selectCaseStudies?.nodes && (
					<div className="pt_100">
						<CaseStudy data={data?.products?.caseStudy} />
					</div>
				)}
				{data?.products?.ourClient?.selectLogos && (
					<div className="pb_50 pt_100 ">
						<TrustedLeaders data={data?.products?.ourClient} />
					</div>
				)}
				{data?.products?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.products?.ourClient} />
					</div>
				)}
				{/* <div className={`${styles.whatsInclude}`}>
					<SmarterEnergy data={data?.products?.expertise} />
				</div> */}
				<ServicesCircle
					data={data?.products?.keyAdvantages}
					customColor={data?.products?.thumbnail?.primaryColor}
					centerLogo={data?.products?.map?.headerLogo?.node?.mediaItemUrl}
				/>
				<div>
					<GloballyBankableInsights data={data?.products?.whyAurora} />
				</div>
				<div>
					<SmarterEnergy data={data?.products?.expertise} />
				</div>
				{data?.products?.expertSupport?.list?.length > 0 && (
					<div className="pb_100">
						<TrustOurExperts data={data?.products?.expertSupport} />
					</div>
				)}
				{/* <div className="pt_100 dark_bg relative">
					<img
						className={`${styles.bgGradient} bgGradientEos`}
						src="/img/eos-bg-gradient.png"
					/>
					<div className="pb_100">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div> */}

				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								formSectionTitle={data?.products?.insights?.sectionTitle}
								formSectionDesc={data?.products?.insights?.sectionDesc}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<IntegratedSystem module="products" />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
