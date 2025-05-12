// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

// MODULES //

// COMPONENTS //

// SECTIONS //
import WhoAreYouInsideWrap from "@/sections/who-are-you/WhoAreYouInsideWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getSingleWhoAreYou,
	getWhoAreYous,
} from "@/services/WhoAreYou.service";
import { getRegions } from "@/services/GlobalPresence.service";

/** Fetch  */
async function getData({ params }) {
	const [data, services, regions] = await Promise.all([
		getSingleWhoAreYou(params.slug),
		getWhoAreYous(),
		getRegions(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.whoareyouBy,
			services: services.data.howWeHelps.nodes,
			mapJson,
			regions,
		},
	};
}

/** FinancialSector Page */
export default async function Advisory({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/who-are-you/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<WhoAreYouInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
