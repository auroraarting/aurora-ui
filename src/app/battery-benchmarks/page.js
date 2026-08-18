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

	console.log(pageContent, "pageContent");

	// Every published benchmark is fetched here, not just the market the explorer
	// opens on. The upstream endpoint costs a flat ~2.8s per benchmark however
	// small the response (all 32 come to ~17 KB), so that latency is worth paying
	// once per revalidate window on the server rather than making every visitor
	// wait ~3s each time they change market. The explorer only requests uuids it
	// wasn't handed, so seeding them all means it never fetches on selection.
	const initialSeries = await getBenchmarkSeriesByUuid(
		(benchmarks || []).map((item) => item.uuid),
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
