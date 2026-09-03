/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import IframeModal from "@/components/IframeModal";

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
import { getRegions } from "@/services/rest/GlobalPresence.service";
import { getSoftwarePage } from "@/services/rest/Softwares.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/rest/Insights.service";
import { getBundlesSection } from "@/services/rest/Bundles.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** Fetch */
async function getData() {
	const [data, regions, insightsFetch, categoriesForSelect, bundles] =
		await Promise.all([
			await getSoftwarePage(),
			await getRegions(),
			await getInsights({
				first: 3,
				categories: [
					"case-studies",
					"commentary",
					"market-reports",
					"policy-notes",
					"newsletters",
					"new-launches",
				],
			}),
			await getInsightsCategories(),
			await getBundlesSection(),
		]);
	// const [data, regions, insightsFetch, categoriesForSelect, bundles] =
	// 	await Promise.all([
	// 		await getSoftwarePage(),
	// 		await getRegions(),
	// 		await getInsights({
	// 			first: 3,
	// 			categories: [
	// 				"case-studies",
	// 				"commentary",
	// 				"market-reports",
	// 				"policy-notes",
	// 				"newsletters",
	// 				"new-launches",
	// 			],
	// 		}),
	// 		await getInsightsCategories(),
	// 		await getBundlesSection(),
	// 	]);
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
			["id"],
		);
		clientLogos.selectLogos.nodes = removeDuplicatesByKeys(
			[
				...clientLogos.selectLogos.nodes,
				...(item.softwares.ourClient.selectLogos?.nodes || []),
			],
			["id"],
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

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "software" });
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/software`, // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

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
