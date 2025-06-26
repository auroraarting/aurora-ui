// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import { getRegions } from "@/services/GlobalPresence.service";
import { getEosPage } from "@/services/Eos.service";
import { getBundlesSection } from "@/services/Bundles.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "eos", idType: URI)');
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

/** EOS Page */
export default async function EOSPage() {
	const [dataFetch, regions, bundlesFetch, categoriesForSelect, list] =
		await Promise.all([
			await getEosPage(),
			await getRegions(),
			await getBundlesSection(),
			await getInsightsCategories(),
			await getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
			),
		]);
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
