/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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

// SECTIONS //
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import TransactionSolutions from "@/sections/how-we-help/TransactionSolutions";

// PLUGINS //

// UTILS //
import { getMapJsonForSoftware, removeDuplicatesByKeys } from "@/utils";

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
import { getRegions } from "@/services/GlobalPresence.service";
import { getSoftwarePage } from "@/services/Softwares.service";
import IframeModal from "@/components/IframeModal";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getBundlesSection } from "@/services/Bundles.service";

/** Fetch */
async function getData() {
	const [data, regions, insightsFetch, categoriesForSelect, bundles] =
		await Promise.all([
			getSoftwarePage(),
			getRegions(),
			getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
			),
			getInsightsCategories(),
			getBundlesSection(),
		]);
	const softwares = data.data.softwares;
	const mapJson = getMapJsonForSoftware(regions);

	let testimonials = {
		testimonials: {
			nodes: [],
		},
	};
	let clientLogos = {
		selectLogos: {
			nodes: [],
		},
	};

	softwares.nodes.map((item) => {
		// testimonials
		testimonials.testimonials.nodes = removeDuplicatesByKeys(
			[
				...testimonials.testimonials.nodes,
				...(item.softwares.ourClient.testimonials?.nodes || []),
			],
			["id"]
		);
		clientLogos.selectLogos.nodes = removeDuplicatesByKeys(
			[
				...clientLogos.selectLogos.nodes,
				...(item.softwares.ourClient.selectLogos?.nodes || []),
			],
			["id"]
		);
	});

	return {
		props: {
			data: {
				...data.data.page.softwareLanding,
			},
			insights: insightsFetch?.data?.posts?.nodes || [],
			softwares,
			testimonials,
			clientLogos,
			regions,
			mapJson,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			bundles: bundles.data.page.bundles,
		},
	};
}

/** Meta Data */
export const metadata = {
	title: "Software | Aurora",
	description: "Aurora",
};

/** Chronos Page */
export default async function Softwares() {
	const { props } = await getData();
	const {
		mapJson,
		data,
		clientLogos,
		testimonials,
		softwares,
		insights,
		countries,
		bundles,
	} = props;

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
					<GloballyBankableInsights data={data.keyAdvantages} />
				</div>
				<GlobalMap locationJson={mapJson} />
				{clientLogos?.selectLogos?.nodes?.length > 0 && (
					<div className="ptb_100">
						<TrustedLeaders data={clientLogos} />
					</div>
				)}
				{testimonials?.testimonials?.nodes?.length > 0 && (
					<div className="pb_100">
						<TestimonialFeedback data={testimonials} />
					</div>
				)}
				<div className="pt_100 dark_bg">
					<div className="pb_100">
						<EosIntegratedSystem />
					</div>
					<Bundles data={bundles} />
				</div>
				<div className={`${styles.insightBg}  pt_30`}>
					<div className={`${styles.boxBg}`}>
						<div className="pb_100">
							<Insights
								formSectionTitle="Expertise that powers progress"
								formSectionDesc="Our team provides tailored onboarding, in-depth feature training, and expert-led valuation reviews with Chronos specialists. Stay ahead with exclusive access to online and in-person community events."
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
								defaultList={insights}
								countries={countries}
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
