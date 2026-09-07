// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getJoinUsPage } from "@/services/JoinUs.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "join-us", idType: URI)');
	const seo = meta?.data?.page?.seo;

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


/** JoinUs Page */
export default async function JoinUs() {
	const [jobs, categoriesForSelect, list, pageFetch] = await Promise.all([
		await getFetchJobData(),
		await getInsightsCategories(),
		await getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
		),
		await getJoinUsPage(),
	]);

	const page = pageFetch?.data?.page?.joinUs;
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect?.data?.countries?.nodes;

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
