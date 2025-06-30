/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import ProductListingWrapper from "@/sections/products/ProductListingWrapper";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getMapJsonForProducts,
	removeDuplicatesByKeys,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/product/Products.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getProductPage } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "product", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch */
async function getData() {
	const [data, regions, bundles, categoriesForSelect, insightsFetch] =
		await Promise.all([
			await getProductPage(),
			await getRegions(),
			await getBundlesSection(),
			await getInsightsCategories(),
			await getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters"}'
			),
		]);
	const products = data.data.products;
	const mapJson = getMapJsonForProducts(regions);

	let testimonials = {
		testimonials: {
			nodes: [],
		},
	};
	let clientLogos = {
		selectLogos: {
			nodes: [],
		},
	};

	products?.nodes?.map((item) => {
		// testimonials
		testimonials.testimonials.nodes = removeDuplicatesByKeys(
			[
				...testimonials.testimonials.nodes,
				...(item.products.ourClient.testimonials?.nodes || []),
			],
			["id"]
		);
		clientLogos.selectLogos.nodes = removeDuplicatesByKeys(
			[
				...clientLogos.selectLogos.nodes,
				...(item.products.ourClient.selectLogos?.nodes || []),
			],
			["id"]
		);
	});
	// const clientLogos = getClientLogosForAllProducts(data.data?.clientsLogos);
	// const testimonials = getTestimonialsForAllProducts(data.data.testimonials);

	return {
		props: {
			data: {
				...data.data.page.productLanding,
			},
			products,
			testimonials,
			clientLogos,
			regions,
			mapJson,
			bundles: bundles.data.page.bundles,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			insights: insightsFetch?.data?.posts?.nodes || [],
		},
	};
}

/** Products Page */
export default async function Products() {
	const { props } = await getData();

	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<ProductListingWrapper {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
