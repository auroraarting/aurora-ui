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
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

export const revalidate = 60; // Revalidates every 60 seconds

/** JoinUs Page */
export default async function JoinUs() {
	const [jobs, categoriesForSelect, list, pageFetch] = await Promise.all([
		await getFetchJobData(),
		await getInsightsCategories(),
		await getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters"}'
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
