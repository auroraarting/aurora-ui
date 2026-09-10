// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import {
	getInsights,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getEarlyCareersListing } from "@/services/rest/EarlyCareers.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "life-at-aurora");
	const seo = meta?.seo;

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

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** LifeAtAurora Page */
export default async function LifeAtAurora() {
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it. getCountryList is the one call.
	const [data, jobs, offices, countries, otherList, careersList] =
		await Promise.all([
			getLifeAtAurora(),
			getFetchJobData(),
			getOffices(),
			getCountryList(),
			getInsights({ first: 3, categories: insightTeaserCategories }),
			getEarlyCareersListing({ first: 10 }),
		]);

	// The section reads the field group with the office list merged onto it.
	const obj = { data: { ...data, offices } };

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
				offices={offices}
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
