// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import { getSingleSoftware } from "@/services/Softwares.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getSingleSoftware(params.slug);
	const post = data?.data?.softwareBy;

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
		getSingleSoftware(params.slug),
		getRegions(),
	]);
	const mapJson = getMapJsonForSoftware(
		filterMarkersBySlug(regions, params.slug)
	);
	const countries = data.data.countries.nodes;

	return {
		props: {
			data: data?.data?.softwareBy?.softwares || {},
			mapJson,
			regions,
			meta: data.data.softwareBy,
			countries,
		},
	};
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
