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
import { getBundlesSection } from "@/services/rest/Bundles.service";
import {
	getCountryList,
	getRegions,
} from "@/services/rest/GlobalPresence.service";
import {
	getProductBySlug,
	getProductSlugs,
} from "@/services/rest/Products.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("products", params.slug);
	const seo = meta?.seo;

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
	// Was read off getProductPage, which fetched the whole product landing page
	// just to take the slug list from the side of it.
	const products = await getProductSlugs();
	return products.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	// `countries` used to ride along inside the product query; REST cannot
	// combine two collections in one request, so it is its own call.
	const [data, regions, bundles, countries] = await Promise.all([
		getProductBySlug(params.slug),
		getRegions(),
		getBundlesSection(),
		getCountryList(),
	]);
	const mapJson = getMapJsonForProducts(
		filterMarkersBySlug(regions, params.slug),
	);
	return {
		props: {
			// The REST services return the nodes already unwrapped; only
			// getRegions keeps its envelope, because the map helpers walk it.
			data,
			mapJson,
			bundles,
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
