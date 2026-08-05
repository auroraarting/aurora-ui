// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";

// SECTIONS //
import BatteryBenchmarkWrapper from "@/sections/battery-benchmark/BatteryBenchmarkWrapper";

// PLUGINS //

// UTILS //
import { filterMarkersBySlug, getMapJsonForProducts } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getProductBySlug, getProductPage } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";
import {
	getAllBenchmarks,
	getAllRegions,
	getBenchmarkSeriesByUuid,
} from "@/services/rest/BatteryBenchmark.service";
import {
	benchmarksFor,
	buildRegions,
	firstAvailableRegion,
	zonesFor,
} from "@/sections/battery-benchmark/benchmarkData";

export const revalidate = 3600; // Revalidates every 1 hour

/** generateStaticParams  */
export async function generateStaticParams() {
	const data = await getProductPage();
	return data?.data?.products?.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const [data, bundles, regions, benchmarks] = await Promise.all([
		getProductBySlug(params.slug),
		getBundlesSection(),
		getAllRegions(),
		getAllBenchmarks(),
	]);
	const countries = data?.data?.countries?.nodes;

	// The benchmark data endpoints take ~3s each, so only the market the explorer
	// opens on is fetched here — the rest load client-side on selection.
	const openingRegion = firstAvailableRegion(buildRegions(regions, benchmarks));
	const openingZone = zonesFor(benchmarks, openingRegion)[0] || null;
	const initialSeries = await getBenchmarkSeriesByUuid(
		benchmarksFor(benchmarks, openingRegion, openingZone).map((item) => item.uuid),
	);

	return {
		props: {
			data: data.data.productBy,
			regions,
			benchmarks,
			initialSeries,
			bundles: bundles.data.page.bundles,
			countries,
		},
	};
}

/** Products Page */
export default async function Products() {
	const { props } = await getData({ params: { slug: "grid" } });

	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<BatteryBenchmarkWrapper {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
