// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import JoinusWrap from "@/sections/careers/JoinusWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getFetchJobData } from "@/services/JobOpenings.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import {
	getInsights,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getJoinUsPage } from "@/services/rest/JoinUs.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "join-us");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/careers/join-us", // 👈 canonical URL
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

/** JoinUs Page */
export default async function JoinUs() {
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it. getCountryList is the one call.
	const [jobs, countries, otherList, page] = await Promise.all([
		getFetchJobData(),
		getCountryList(),
		getInsights({ first: 3, categories: insightTeaserCategories }),
		getJoinUsPage(),
	]);

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Join Us"} Desc={""} OgImg={""} Url={"/careers/join-us"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<JoinusWrap
				jobs={jobs}
				page={page}
				otherList={otherList}
				countries={countries}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
