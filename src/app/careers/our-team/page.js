// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import OurTeamWrap from "@/sections/careers/OurTeamWrap";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getOurTeamsPage } from "@/services/rest/OurTeams.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "our-team");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/careers/our-team", // 👈 canonical URL
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
	// The getLifeAtAurora call that used to sit here fed an `obj` this page
	// built and then never rendered, so it is gone. Only the four option lists
	// this page displays are fetched, rather than all six.
	const [jobs, data, categoriesForSelect, otherList, offices] =
		await Promise.all([
			getFetchJobData(),
			getOurTeamsPage(),
			getInsightsCategories({
				only: ["countries", "products", "softwares", "services"],
			}),
			getInsights({ first: 3, categories: insightTeaserCategories }),
			getOffices(),
		]);

	const { countries, products, softwares, services } = categoriesForSelect;
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Our Team"}
				Desc={""}
				OgImg={""}
				Url={"/careers/our-team"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<OurTeamWrap
				data={data}
				jobs={jobs}
				otherList={otherList}
				countries={countries}
				products={products}
				softwares={softwares}
				services={services}
				offices={offices}
			/>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
