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
	const [data, regions, bundles] = await Promise.all([
		await getProductBySlug(params.slug),
		await getRegions(),
		await getBundlesSection(),
	]);
	const mapJson = getMapJsonForProducts(
		filterMarkersBySlug(regions, params.slug),
	);
	const countries = data?.data?.countries?.nodes;

	return {
		props: {
			data: data.data.productBy,
			mapJson,
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
