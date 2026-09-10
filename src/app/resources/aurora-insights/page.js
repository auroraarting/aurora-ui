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
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getInsightsPage } from "@/services/rest/InsightsListing.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "insight-listing");
	const seo = meta?.seo;

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

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch  getStaticProps*/
async function getData() {
	// The two getInsights calls this replaces used the same filter and the same
	// (default, newest-first) order — one asking for 9999 and one for 3 — so
	// the teaser is the head of the full list rather than a second request over
	// 817 posts. getInsightsPath was imported here but never called.
	const [data, options, insightsPage] = await Promise.all([
		getInsights({ all: true, categories: insightTeaserCategories }),
		getInsightsCategories(),
		getInsightsPage(),
	]);

	return {
		props: {
			// `pagination` read a `posts.pageInfo` the query never selected, so it
			// has always been an empty object.
			pagination: {},
			data,
			tags: options.tags || [],
			categories: options.categories || [],
			countries: options.countries || [],
			products: options.products || [],
			softwares: options.softwares || [],
			services: options.services || [],
			otherList: data.slice(0, 3),
			insightsPage,
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
