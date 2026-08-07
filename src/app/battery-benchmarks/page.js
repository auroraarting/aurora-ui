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

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getAllBenchmarks,
	getAllRegions,
	getBenchmarkSeriesByUuid,
} from "@/services/rest/BatteryBenchmark.service";
import { getBatteryBenchmarkPage } from "@/services/rest/BatteryBenchmarkPage.service";
import {
	benchmarksFor,
	buildRegions,
	firstAvailableRegion,
	zonesFor,
} from "@/sections/battery-benchmark/benchmarkData";

export const revalidate = 3600; // Revalidates every 1 hour

/** generateMetadata */
export async function generateMetadata() {
	const page = await getBatteryBenchmarkPage();
	const seo = page?.seo;

	return {
		title: seo?.title || "Battery Benchmarks | Aurora",
		description: seo?.description || "",
		alternates: {
			canonical: "https://auroraer.com/battery-benchmarks",
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

/** Fetch  */
async function getData() {
	const [regions, benchmarks, pageContent] = await Promise.all([
		getAllRegions(),
		getAllBenchmarks(),
		getBatteryBenchmarkPage(),
	]);

	// The benchmark data endpoints take ~3s each, so only the market the explorer
	// opens on is fetched here — the rest load client-side on selection.
	const openingRegion = firstAvailableRegion(buildRegions(regions, benchmarks));
	const openingZone = zonesFor(benchmarks, openingRegion)[0] || null;
	const initialSeries = await getBenchmarkSeriesByUuid(
		benchmarksFor(benchmarks, openingRegion, openingZone).map(
			(item) => item.uuid,
		),
	);

	return {
		props: {
			pageContent,
			regions,
			benchmarks,
			initialSeries,
		},
	};
}

/** Battery Benchmarks Page */
export default async function BatteryBenchmarks() {
	const { props } = await getData();

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
