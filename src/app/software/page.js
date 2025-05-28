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
import SoftwaresLanding from "@/sections/softwares/SoftwareLanding";

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
	const softwares = data?.data?.softwares;
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

	softwares?.nodes?.map((item) => {
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
				...data?.data?.page?.softwareLanding,
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
			<SoftwaresLanding {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
