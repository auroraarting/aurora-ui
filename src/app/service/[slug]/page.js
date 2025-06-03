/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import ServicesWrap from "@/sections/services/ServicesWrap";

// PLUGINS //

// UTILS //
import { filterMarkersBySlug, getMapJsonForService } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getServiceData } from "@/services/Service.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";
import { getInsights } from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`serviceBy(slug: "${params.slug}")`);
	const seo = meta?.data?.serviceBy?.seo;

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

/** Fetch  */
async function getData({ params }) {
	const [data, regions, bundles, list] = await Promise.all([
		getServiceData(params.slug),
		getRegions(),
		getBundlesSection(),
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
	]);
	const mapJson = getMapJsonForService(
		filterMarkersBySlug(regions, params.slug)
	);
	const countries = data.data.countries.nodes;
	const otherList = list?.data?.posts?.nodes || [];

	return {
		props: {
			data: data.data.serviceBy,
			mapJson,
			bundles: bundles.data.page.bundles,
			countries,
			otherList,
		},
	};
}

/** Advisory Page */
export default async function Advisory({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/service/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<ServicesWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
