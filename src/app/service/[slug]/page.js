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
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import ServicesCircle from "@/components/ServicesCircle";
import CaseStudy from "@/components/CaseStudy";
import IframeModal from "@/components/IframeModal";
import Bundles from "@/components/Bundles";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";

// SECTIONS //

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	filterMarkersBySlug,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/services/advisory.module.scss";

// IMAGES //
import desktop_banner from "/public/img/services/advisory/desktop_banner.jpg";

// DATA //

// SERVICES //
import { getServiceData } from "@/services/Service.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";

/** Fetch  */
async function getData({ params }) {
	const [data, regions, bundles] = await Promise.all([
		getServiceData(params.slug),
		getRegions(),
		getBundlesSection(),
	]);
	const mapJson = getMapJsonForProducts(
		filterMarkersBySlug(regions, data.data.serviceBy.slug)
	);
	return {
		props: {
			data: data.data.serviceBy,
			mapJson,
			bundles: bundles.data.page.bundles,
		},
	};
}

/** Advisory Page */
export default async function Advisory({ params }) {
	const { props } = await getData({ params });
	const { data, mapJson, bundles } = props;
	const dataForBtn = { postFields: data || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/service/${data.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AdvisoryPage}>
				<div className="pb_60">
					<InnerBanner
						bannerTitle={data?.services?.banner?.title}
						bannerDescription={data?.services?.banner?.description}
						btnLink={data?.services?.banner?.buttonLink}
						btnTxt={data?.services?.banner?.buttonText}
						desktopImage={data?.services?.banner?.desktopThumbnail?.node?.sourceUrl}
						mobileImage={data?.services?.banner?.mobileThumbnail?.node?.sourceUrl}
						videoSrc={data?.services?.banner?.vimeoLink}
						logo={data?.services?.banner?.logo?.node?.sourceUrl}
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
				<SmarterEnergy data={data?.services?.expertise} />
				<ServicesCircle data={data?.services?.keyAdvantages} />
				{data?.services?.caseStudy?.title && (
					<div className="pt_100">
						<CaseStudy data={data?.services?.caseStudy} />
					</div>
				)}
				{data?.services?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data?.services?.ourClient} />
					</div>
				)}
				{data?.services?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data?.services?.ourClient} />
					</div>
				)}
				<div className="ptb_100 dark_bg">
					<div className="pb_100">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div>
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
