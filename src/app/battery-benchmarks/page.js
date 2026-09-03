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
	getAllLeaderboardIndices,
	getAllRegions,
	getBenchmarkSeriesByUuid,
	getLeaderboardSeriesByIndices,
} from "@/services/rest/BatteryBenchmark.service";
import { getBatteryBenchmarkPage } from "@/services/rest/BatteryBenchmarkPage.service";

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

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
	const [regions, benchmarks, realBenchmarks, pageContent] = await Promise.all([
		getAllRegions(),
		getAllBenchmarks(),
		getAllLeaderboardIndices(),
		getBatteryBenchmarkPage(),
	]);

	// Pre-seed both Backcast and Real Performance series on the server
	const [initialSeries, initialRealSeries] = await Promise.all([
		getBenchmarkSeriesByUuid((benchmarks || []).map((item) => item.uuid)),
		getLeaderboardSeriesByIndices(realBenchmarks || []),
	]);

	return {
		props: {
			pageContent,
			regions,
			benchmarks,
			initialSeries,
			realBenchmarks,
			initialRealSeries,
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
