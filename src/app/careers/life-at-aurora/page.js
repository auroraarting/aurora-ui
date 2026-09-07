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
import LifeAtAuroraWrap from "@/sections/careers/LifeAtAuroraWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getOffices } from "@/services/Offices.service";
import { getEarlyCareersListing } from "@/services/EarlyCareers.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "life-at-aurora", idType: URI)');
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
