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

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getSingleWhoAreYou(params.slug);
	const post = data?.data?.whoareyouBy;

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
