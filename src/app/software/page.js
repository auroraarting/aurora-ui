/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import { getBundlesSection } from "@/services/rest/Bundles.service";
import {
	getCountryList,
	getRegions,
} from "@/services/rest/GlobalPresence.service";
import {
	getInsights,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getPageSeo } from "@/services/rest/Seo.service";
import { getSoftwarePage } from "@/services/rest/Softwares.service";

/** Fetch */
async function getData() {
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it. getCountryList is the one call.
	const [page, regions, insights, countries, bundles] = await Promise.all([
		getSoftwarePage(),
		getRegions(),
		getInsights({ first: 3, categories: insightTeaserCategories }),
		getCountryList(),
		getBundlesSection(),
	]);
	// getSoftwarePage returns the landing group and the list unwrapped; the
	// sections still read the products as a { nodes } connection.
	const softwares = { nodes: page.softwares };
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
				...page.landing,
			},
			insights: insights || [],
			softwares,
			testimonials,
			clientLogos,
			regions,
			mapJson,
			countries: countries || [],
			bundles,
		},
	};
}

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "software");
	const seo = meta?.seo;

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

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

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
