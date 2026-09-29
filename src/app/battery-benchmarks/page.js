// ISR: statically generated, then revalidated in the background. 1800s matches
// the shortest-lived data on the page (the Real Performance methodology API's
// pre-signed media URLs expire after an hour — see Methodology.service.js).
// WordPress content and benchmark series are cached separately (tag-flushed or
// on a longer timer) and are unaffected by this.
export const revalidate = 1800;

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
} from "@/services/rest/BatteryBenchmark.service";
import { getBatteryBenchmarkPage } from "@/services/rest/BatteryBenchmarkPage.service";
import {
	getBackcastMethodology,
	getRealPerformanceMethodology,
} from "@/services/rest/Methodology.service";

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
	const [
		regions,
		benchmarks,
		realBenchmarks,
		pageContent,
		realMethodology,
		backcastMethodology,
	] = await Promise.all([
		getAllRegions(),
		getAllBenchmarks(),
		getAllLeaderboardIndices(),
		getBatteryBenchmarkPage(),
		// Both tabs' methodology comes from the Methodologies API first, each
		// filtered to its own document family (see Methodology.service.js); the
		// ACF fields in pageContent are only the fallback for when the API has
		// nothing for a tab.
		getRealPerformanceMethodology(),
		getBackcastMethodology(),
	]);

	// Pre-seed Backcast series on the server; Backcast changes monthly, so a
	// server-rendered snapshot is never meaningfully stale.
	//
	// Real Performance is intentionally NOT pre-seeded here: it is a live daily
	// feed, and a value baked into the ISR page could be sitting in the CDN cache
	// for up to `revalidate` seconds. BatteryBenchmarkExplorer fetches it fresh
	// from the client instead (`cache: "no-store"`, see fetchSeries there), so a
	// visitor always sees the latest data rather than whatever was current the
	// last time this page revalidated.
	const initialSeries = await getBenchmarkSeriesByUuid(
		(benchmarks || []).map((item) => item.uuid),
	);

	return {
		props: {
			pageContent,
			regions,
			benchmarks,
			initialSeries,
			realBenchmarks,
			realMethodology,
			backcastMethodology,
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
