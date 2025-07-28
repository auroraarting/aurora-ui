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
import {
	getSingleWhoAreYou,
	getWhoAreYous,
} from "@/services/WhoAreYou.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getBundlesSection } from "@/services/Bundles.service";
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 60; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`whoareyouBy(slug: "${params.slug}")`);
	const seo = meta?.data?.whoareyouBy?.seo;

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
	const [data, services, regions, bundles] = await Promise.all([
		await getSingleWhoAreYou(params.slug),
		await getWhoAreYous(),
		await getRegions(),
		await getBundlesSection(),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.whoareyouBy,
			services: services.data.howWeHelps.nodes,
			mapJson,
			regions,
			bundles: bundles.data.page.bundles,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const services = await getWhoAreYous();
	return services.data.howWeHelps.nodes.map((item) => ({
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
