// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/Graphql.service.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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
import { getRegions } from "@/services/GlobalPresence.service";
import { getEosPage } from "@/services/Eos.service";
import { getBundlesSection } from "@/services/Bundles.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";

import { pause } from "@/utils/pace";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "eos", idType: URI)');
	const seo = meta?.data?.page?.seo;

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


/** EOS Page */
export default async function EOSPage() {
	const dataFetch = await getEosPage();
	await pause();
	const regions = await getRegions();
	await pause();
	const bundlesFetch = await getBundlesSection();
	await pause();
	const categoriesForSelect = await getInsightsCategories();
	await pause();
	const list = await getInsights(
		'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
	);
	const mapJson = getMapJsonForAllRegions(regions);
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	const data = dataFetch.data.page.eos;
	const bundles = bundlesFetch.data.page.bundles;
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
