// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import LifeAtAuroraWrap from "@/sections/careers/LifeAtAuroraWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/rest/Careers.service";
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getEarlyCareersListing } from "@/services/EarlyCareers.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "life-at-aurora" });
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/careers/life-at-aurora", // 👈 canonical URL
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

/** LifeAtAurora Page */
export default async function LifeAtAurora() {
	const [data, jobs, offices, categoriesForSelect, list, careersListFetch] =
		await Promise.all([
			await getLifeAtAurora(),
			await getFetchJobData(),
			await getOffices(),
			await getInsightsCategories(),
			await getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
			),
			await getEarlyCareersListing("first: 10"),
		]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: offices.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	const careersList = careersListFetch.data.earlyCareers.nodes;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Life At Aurora"}
				Desc={""}
				OgImg={""}
				Url={"/life-at-aurora"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<LifeAtAuroraWrap
				data={obj.data}
				offices={offices?.data?.offices?.nodes}
				otherList={otherList}
				countries={countries}
				jobs={jobs}
				careersList={careersList}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
