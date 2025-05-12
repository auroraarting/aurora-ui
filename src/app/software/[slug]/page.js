// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
