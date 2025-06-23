// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import SoftwareInsideWrap from "@/sections/softwares/SoftwareInsideWrap";

// PLUGINS //

// UTILS //
import { filterMarkersBySlug, getMapJsonForSoftware } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getSingleSoftware,
	getSoftwarePage,
} from "@/services/Softwares.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 60; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`softwareBy(slug: "${params.slug}")`);
	const seo = meta?.data?.softwareBy?.seo;

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

/** Fetch  */
async function getData({ params }) {
	// const [data, regions] = await Promise.all([
	// 	getSingleSoftware(params.slug),
	// 	getRegions(),
	// ]);
	const data = await getSingleSoftware(params.slug);
	const regions = await getRegions();
	const mapJson = getMapJsonForSoftware(
		filterMarkersBySlug(regions, params.slug)
	);
	let showMap = mapJson?.some((item) => item?.markers?.length > 0);
	const countries = data?.data?.countries?.nodes;

	return {
		props: {
			data: data?.data?.softwareBy?.softwares || {},
			mapJson,
			regions,
			showMap,
			meta: data?.data?.softwareBy,
			countries,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const data = await getSoftwarePage();
	return data?.data?.softwares?.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Chronos Page */
export default async function SoftwarePage({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={meta?.title}
				Desc={""}
				OgImg={""}
				Url={`/software/${meta?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<SoftwareInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
