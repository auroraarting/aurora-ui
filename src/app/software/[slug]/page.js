// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

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
import {
	getCountryList,
	getRegions,
} from "@/services/rest/GlobalPresence.service";
import { getAllLanguages } from "@/services/rest/Languages.service";
import { getPageSeo } from "@/services/rest/Seo.service";
import {
	getSingleSoftware,
	getSoftwareSlugs,
} from "@/services/rest/Softwares.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("softwares", params.slug);
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/software/${params.slug}`, // 👈 canonical URL
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
	// const [data, regions] = await Promise.all([
	// 	getSingleSoftware(params.slug),
	// 	getRegions(),
	// ]);
	// getSingleSoftware now returns the node directly, and the `countries` list
	// the GraphQL query selected alongside it is its own call.
	const data = await getSingleSoftware(params.slug);
	const regions = await getRegions();
	const mapJson = getMapJsonForSoftware(
		filterMarkersBySlug(regions, params.slug),
	);
	let showMap = mapJson?.some((item) => item?.markers?.length > 0);
	const countries = await getCountryList();
	const languages = await getAllLanguages();
	let selectedAllLanguages = [
		{
			title: "English",
			shortTitle: "",
			icon: "/img/en-flag.svg",
		},
	];

	languages?.map((item) => {
		data?.translations?.filter((item2) => {
			if (item2.language.language_code === item?.language_code) {
				let title = item?.translated_name;
				if (item?.native_name) {
					title = `${title} (${item?.native_name})`;
				}
				selectedAllLanguages.push({
					...item,
					title: title,
					shortTitle: item?.language_code,
					icon: item?.country_flag_url || "/img/en-flag.svg",
				});
			}
		});
	});

	return {
		props: {
			data: data?.softwares || {},
			mapJson,
			regions,
			showMap,
			meta: data,
			countries,
			selectedAllLanguages,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	// Was read off getSoftwarePage, which also fetched the whole landing page
	// and every product's fields just to take the slug list from it.
	const softwares = await getSoftwareSlugs();
	return softwares.map((item) => ({
		slug: item.slug,
	}));
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
				Url={`https://auroraer.com/software/${meta?.slug}`}
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
