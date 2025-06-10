// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";

// SECTIONS //
import ProductInsideWrap from "@/sections/products/ProductsInsideWrap";

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
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 60; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`productBy(slug: "${params.slug}")`);
	const seo = meta?.data?.productBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://www-staging.auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

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
		filterMarkersBySlug(regions, params.slug)
	);

	return {
		props: {
			data: data.data.productBy,
			mapJson,
			bundles: bundles.data.page.bundles,
		},
	};
}

/** ProductInside Page */
export default async function ProductInside({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<ProductInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
