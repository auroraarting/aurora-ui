// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import { getProductBySlug } from "@/services/Products.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getProductBySlug(params.slug);
	const post = data?.data?.productBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ params }) {
	const [data, regions] = await Promise.all([
		getProductBySlug(params.slug),
		getRegions(),
	]);
	const mapJson = getMapJsonForProducts(
		filterMarkersBySlug(regions, params.slug)
	);

	return {
		props: {
			data: data.data.productBy,
			mapJson,
		},
	};
}

/** ProductInside Page */
export default async function ProductInside({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/products/${data?.slug}`}
			/> */}

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
