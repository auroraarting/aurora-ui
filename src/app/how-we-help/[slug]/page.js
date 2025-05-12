// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

// MODULES //

// COMPONENTS //

// SECTIONS //
import HowWeHelpInside from "@/sections/how-we-help/HowWeHelpInside";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	getLinkAndTitle,
	getMapJsonForAllRegions,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //

// IMAGES //

// SERVICES //
import {
	getHowWeHelps,
	getSingleHowWeHelp,
} from "@/services/HowWeHelp.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";

// DATA //

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getSingleHowWeHelp(params.slug);
	const post = data?.data?.howwehelpBy;

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
	const [data, services, regions, bundles] = await Promise.all([
		getSingleHowWeHelp(params.slug),
		getHowWeHelps(),
		getRegions(),
		getBundlesSection(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.howwehelpBy,
			services: services.data.howWeHelps.nodes,
			mapJson,
			regions,
			bundles: bundles.data.page.bundles,
		},
	};
}

/** Transactions Page */
export default async function Transactions({ params }) {
	const { props } = await getData({ params });
	const services =
		props?.data?.howWeHelpInside?.spotlights?.selected?.nodes?.map((item) => {
			const { link, title } = getLinkAndTitle(item.contentType.node.name, item);
			return { ...item, link };
		});

	// const { link, title } = getLinkAndTitle(key, item);
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/how-we-help/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<HowWeHelpInside {...props} services={services} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
