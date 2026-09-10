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
import { getBundlesSection } from "@/services/rest/Bundles.service";
import { getRegions } from "@/services/rest/GlobalPresence.service";
import {
	getHowWeHelpListing,
	getSingleHowWeHelp,
} from "@/services/rest/HowWeHelp.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// DATA //

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("howwehelp", params.slug);
	const seo = meta?.seo;

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
	const services = await getHowWeHelpListing();
	return services.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const [data, services, regions, bundles] = await Promise.all([
		getSingleHowWeHelp(params.slug),
		getHowWeHelpListing(),
		getRegions(),
		getBundlesSection(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			// The REST services return the nodes already unwrapped; only
			// getRegions keeps its envelope, because the map helpers walk it.
			data,
			services,
			mapJson,
			regions,
			bundles,
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
