// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getJoinUsPage } from "@/services/rest/JoinUs.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "join-us" });
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

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

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
