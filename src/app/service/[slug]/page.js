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
	getMapJsonForService,
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
import GlobalMap from "@/components/GlobalMap";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getServiceData(params.slug);
	const post = data?.data?.serviceBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ params }) {
	const [data, regions, bundles] = await Promise.all([
		getServiceData(params.slug),
		getRegions(),
		getBundlesSection(),
	]);
	const mapJson = getMapJsonForService(
		filterMarkersBySlug(regions, params.slug)
	);
	const countries = data.data.countries.nodes;

	return {
		props: {
			data: data.data.serviceBy,
			mapJson,
			bundles: bundles.data.page.bundles,
			countries,
		},
	};
}

/** Advisory Page */
export default async function Advisory({ params }) {
	const { props } = await getData({ params });
	const { data, mapJson, bundles, countries } = props;
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
						desktopImage={
							data?.services?.banner?.desktopThumbnail?.node?.mediaItemUrl
						}
						mobileImage={data?.services?.banner?.mobileThumbnail?.node?.mediaItemUrl}
						videoSrc={data?.services?.banner?.vimeoLink}
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
