// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import CaseStudy from "@/components/CaseStudy";
import GlobalMap from "@/components/GlobalMap";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import SoftwareBanner from "@/sections/softwares/SoftwareBanner";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";
import Redefining from "@/sections/softwares/Redefining";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import IntuitiveStepProcess from "@/sections/softwares/IntuitiveStepProcess";
import TrustOurExperts from "@/sections/softwares/TrustOurExperts";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	filterMarkersBySlug,
	getMapJsonForProducts,
	getMapJsonForSoftware,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/softwares/SoftwareInside.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/banner/desktop_banner.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getSingleSoftware } from "@/services/Softwares.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch  */
async function getData({ params }) {
	const [data, regions] = await Promise.all([
		getSingleSoftware(params.slug),
		getRegions(),
	]);
	const mapJson = getMapJsonForSoftware(
		filterMarkersBySlug(regions, params.slug)
	);
	return {
		props: {
			data: data?.data?.softwareBy?.softwares || {},
			mapJson,
			regions,
			meta: data.data.softwareBy,
		},
	};
}

/** Chronos Page */
export default async function SoftwarePage({ params }) {
	const { props } = await getData({ params });
	const { data, mapJson, regions, meta } = props;
	const dataForBtn = { postFields: data || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={meta?.title}
				Desc={""}
				OgImg={""}
				Url={`/software/${meta?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.SoftwarePage}>
				{/* <InnerBanner
					bannerTitle="Energy solutions for those who see beyond the grid"
					bannerDescription="Aurora empowers industries with tailored energy intelligence, helping decision-makers drive impact, manage risks, and seize opportunities in a rapidly changing energy landscape."
					desktopImage={desktop_banner.src}
					mobileImage={desktop_banner.src}
					videoSrc="../../img/softwares/frame_video.mp4"
				/> */}

				<SoftwareBanner
					bannerTitle={data?.banner?.title}
					bannerDescription={data?.banner?.description}
					desktopImage={data?.banner?.desktopThumbnail?.node?.sourceUrl}
					mobileImage={data?.banner?.mobileThumbnail?.node?.sourceUrl}
					vimeoid={data?.banner?.vimeoLink}
					btnText={data?.banner?.buttonText}
					btnLink={data?.banner?.buttonLink}
					logo={data?.banner?.logo?.node?.sourceUrl}
					dynamicBtn={dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
				/>
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
				{data?.introduction?.title && (
					<div className="ptb_100">
						<Redefining
							title={data?.introduction?.title}
							description={data?.introduction?.description}
							image={data?.introduction?.image?.node?.sourceUrl}
							lottie={data?.introduction?.lottie?.node?.sourceUrl}
						/>
					</div>
				)}
				<GlobalMap locationJson={mapJson} />
				{data?.caseStudy?.title && (
					<div className="pt_100">
						<CaseStudy data={data?.caseStudy} />
					</div>
				)}
				{/* <div className="pb_100">
					<SoftwareMarket />
				</div> */}
				{data?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data?.ourClient} />
					</div>
				)}
				{data?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.ourClient} />
					</div>
				)}
				<ServicesCircle data={data?.keyAdvantages} />
				<div>
					<GloballyBankableInsights
						data={data?.whyAurora}
						isMultiple={data?.whyAurora?.list?.length > 1}
					/>
				</div>
				<IntuitiveStepProcess
					data={data?.fourStepProcess}
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "stepsSectionButton").btntext && (
							<div
								className={`${styles.bookBtn} pt_50`}
								{...dynamicInsightsBtnProps(dataForBtn, "stepsSectionButton")}
							>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									{dynamicInsightsBtnProps(dataForBtn, "stepsSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<SmarterEnergy data={data?.expertise} />
				{data?.expertSupport?.list?.length > 0 && (
					<div className="ptb_100">
						<TrustOurExperts data={data?.expertSupport} />
					</div>
				)}

				<div className="pb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
				<div className="pb_100">
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
