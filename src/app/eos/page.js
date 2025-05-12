// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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

/** Meta Data */
export const metadata = {
	title: "Eos | Aurora",
	description: "Aurora",
};

/** EOS Page */
export default async function EOSPage() {
	const [dataFetch, regions, bundlesFetch, categoriesForSelect, list] =
		await Promise.all([
			getEosPage(),
			getRegions(),
			getBundlesSection(),
			getInsightsCategories(),
			getInsights('first: 3, where: {categoryName: ""}'),
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
