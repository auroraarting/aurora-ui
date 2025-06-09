// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import AuroraInsightsWrap from "@/sections/resources/aurora-insights/AuroraInsightsWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsPath,
} from "@/services/Insights.service";
import { getInsightsPage } from "@/services/InsightsListing.service";

/** Meta Data */
export const metadata = {
	title: "Aurora Insights | Aurora",
	description: "Aurora",
};

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch  getStaticProps*/
async function getData() {
	// const [data, categoriesForSelect, list, insightsPage] = await Promise.all([
	// 	getInsights(
	// 		'first: 9999, where: {categoryName: "case-studies,commentary,market-reports"}'
	// 	),
	// 	getInsightsCategories(),
	// 	getInsights(
	// 		'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
	// 	),
	// 	getInsightsPage(),
	// ]);
	const data = await getInsights(
		'first: 9999, where: {categoryName: "case-studies,commentary,market-reports"}'
	);
	const categoriesForSelect = await getInsightsCategories();
	const list = await getInsights(
		'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
	);
	const insightsPage = await getInsightsPage();
	const otherList = list?.data?.posts?.nodes;

	return {
		props: {
			pagination: data.data?.posts?.pageInfo || {},
			data: data?.data?.posts?.nodes || [],
			tags: categoriesForSelect.data.tags?.nodes || [],
			categories: categoriesForSelect?.data?.categories?.nodes || [],
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			products: categoriesForSelect?.data?.products?.nodes || [],
			softwares: categoriesForSelect?.data?.softwares?.nodes || [],
			services: categoriesForSelect?.data?.services?.nodes || [],
			otherList,
			insightsPage: insightsPage.data.page.insightsListing,
		},
	};
}

/** AuroraInsights Page */
export default async function AuroraInsights() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Aurora Insights"} Url={"/resources/aurora-insights"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<AuroraInsightsWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
