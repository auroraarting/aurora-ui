// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
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
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/how-we-help/${params.slug}`, // 👈 canonical URL
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

/** generateStaticParams  */
export async function generateStaticParams() {
	const services = await getHowWeHelps();
	return services?.data?.howWeHelps?.nodes?.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const [data, services, regions, bundles] = await Promise.all([
		await getSingleHowWeHelp(params.slug),
		await getHowWeHelps(),
		await getRegions(),
		await getBundlesSection(),
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
