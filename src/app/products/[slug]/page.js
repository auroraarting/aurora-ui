// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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


/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`productBy(slug: "${params.slug}")`);
	const seo = meta?.data?.productBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/products/${params.slug}`, // 👈 canonical URL
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
