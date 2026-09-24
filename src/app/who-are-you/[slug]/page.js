// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

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
import { getBundlesSection } from "@/services/rest/Bundles.service";
import { getRegions } from "@/services/rest/GlobalPresence.service";
import { getPageSeo } from "@/services/rest/Seo.service";
import {
	getSingleWhoAreYou,
	getWhoAreYous,
} from "@/services/rest/WhoAreYou.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("whoareyou", params.slug);
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/who-are-you/${params.slug}`, // 👈 canonical URL
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

/** Fetch  */
async function getData({ params }) {
	const [data, services, regions, bundles] = await Promise.all([
		getSingleWhoAreYou(params.slug),
		getWhoAreYous(),
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

/** generateStaticParams  */
export async function generateStaticParams() {
	// Unchanged from the GraphQL version, deliberately: getWhoAreYous returns
	// how-we-help entries, not who-are-you entries. See the note on that
	// service — the slip is pre-existing and fixing it here would change which
	// pages are pre-rendered.
	const services = await getWhoAreYous();
	return services.map((item) => ({
		slug: item.slug,
	}));
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
				Url={`https://auroraer.com/who-are-you/${data.slug}`}
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
