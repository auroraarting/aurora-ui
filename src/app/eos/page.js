// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import EOSPageWrap from "@/sections/eos/EosWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getCountryList,
	getRegions,
} from "@/services/rest/GlobalPresence.service";
import { getEosPage } from "@/services/rest/Eos.service";
import { getBundlesSection } from "@/services/rest/Bundles.service";
import {
	getInsights,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "eos");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/eos", // 👈 canonical URL
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

/** EOS Page */
export default async function EOSPage() {
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it. getCountryList is the one call.
	const [data, regions, bundles, countries, otherList] = await Promise.all([
		getEosPage(),
		getRegions(),
		getBundlesSection(),
		getCountryList(),
		getInsights({ first: 3, categories: insightTeaserCategories }),
	]);
	const mapJson = getMapJsonForAllRegions(regions);
	const dataForBtn = { postFields: data || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"EOS"} Desc={""} OgImg={""} Url={"/eos"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page eos starts here */}
			<EOSPageWrap
				mapJson={mapJson}
				otherList={otherList}
				countries={countries}
				data={data}
				bundles={bundles}
				dataForBtn={dataForBtn}
			/>
			{/* Page eos ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
