// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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
import { getPageSeo } from "@/services/Seo.service";

// DATA //

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`howwehelpBy(slug: "${params.slug}")`);
	const seo = meta?.data?.howwehelpBy?.seo;

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
