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
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "insight-listing", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/resources/aurora-insights", // 👈 canonical URL
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


/** Fetch  getStaticProps*/
async function getData() {
	// Started together rather than one after the other: these four were 28.7s
	// in series against the CMS, which every visitor paid on the first request
	// after a revalidation. Outbound concurrency is still capped centrally by
	// the Bottleneck limiter in services/Graphql.service.js (4 at a time,
	// 300ms apart), so this cannot flood WordPress.
	const [data, categoriesForSelect, list, insightsPage] = await Promise.all([
		getInsights(
			'first: 9999, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
		),
		getInsightsCategories(),
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
		),
		getInsightsPage(),
	]);
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
