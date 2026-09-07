/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/Graphql.service.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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

import { pause } from "@/utils/pace";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "product", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/products", // 👈 canonical URL
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


/** Fetch */
async function getData() {
	const data = await getProductPage();
	await pause();
	const regions = await getRegions();
	await pause();
	const bundles = await getBundlesSection();
	await pause();
	const categoriesForSelect = await getInsightsCategories();
	await pause();
	const insightsFetch = await getInsights(
		'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
	);
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
			["id"],
		);
		clientLogos.selectLogos.nodes = removeDuplicatesByKeys(
			[
				...clientLogos.selectLogos.nodes,
				...(item.products.ourClient.selectLogos?.nodes || []),
			],
			["id"],
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
