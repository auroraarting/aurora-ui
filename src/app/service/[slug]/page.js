/* eslint-disable quotes */
// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.
export const dynamic = "force-static";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import ServicesWrap from "@/sections/services/ServicesWrap";

// PLUGINS //

// UTILS //
import { filterMarkersBySlug, getMapJsonForService } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getBundlesSection } from "@/services/rest/Bundles.service";
import {
	getCountryList,
	getRegions,
} from "@/services/rest/GlobalPresence.service";
import { getPageSeo } from "@/services/rest/Seo.service";
import {
	getAllServiceData,
	getServiceData,
} from "@/services/rest/Service.service";

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("services", params.slug);
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/service/${params.slug}`, // 👈 canonical URL
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
	// `countries` used to ride along in the service query, and the insights
	// call that fed `otherList` is gone — ServicesWrap never read that prop, so
	// it was one upstream request per service page for nothing.
	const [data, regions, bundles, countries] = await Promise.all([
		getServiceData(params.slug),
		getRegions(),
		getBundlesSection(),
		getCountryList(),
	]);

	const mapJson = getMapJsonForService(
		filterMarkersBySlug(regions, params.slug),
	);

	return {
		props: {
			data,
			mapJson,
			bundles,
			countries,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const services = await getAllServiceData();
	return services.map((item) => ({
		slug: item.slug,
	}));
}

/** Advisory Page */
export default async function Advisory({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`https://auroraer.com/service/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<ServicesWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
