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
	getSingleSoftware,
	getSingleSoftwareByLanguage,
} from "@/services/Softwares.service";
import { getRegions } from "@/services/GlobalPresence.service";
import { getPageSeo } from "@/services/Seo.service";
import { getAllLanguages } from "@/services/GlobalPresenceLanguages.service";

// No time-based revalidation. NOTE: this page's data still comes from
// /graphql, and those requests are POSTs, which Next.js cannot cache or tag —
// so it no longer refreshes on a timer and will only regenerate on a deploy or
// when WordPress calls /api/revalidate?paths=<this route>. Converting its
// services to the REST layer puts it back on cache tags.

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`softwareBy(slug: "${params.slug}")`);
	const seo = meta?.data?.softwareBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		alternates: {
			canonical: `/software/${params.slug}`, // 👈 canonical URL
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
	const data = await getSingleSoftwareByLanguage(params.slug, params.language);
	const regions = await getRegions();
	const mapJson = getMapJsonForSoftware(
		filterMarkersBySlug(regions, params.slug)
	);
	let showMap = mapJson?.some((item) => item?.markers?.length > 0);
	const countries = data?.data?.countries?.nodes;

	const languages = await getAllLanguages();
	let selectedAllLanguages = [
		{
			title: "English",
			shortTitle: "",
			icon: "/img/en-flag.svg",
		},
	];

	languages?.data?.languages?.map((item) => {
		data?.data?.softwareBy.translations?.filter((item2) => {
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
			data: { ...data?.data?.softwareBy?.softwares, showTranslation: true } || {},
			mapJson,
			regions,
			showMap,
			meta: data?.data?.softwareBy,
			countries,
			selectedAllLanguages,
		},
	};
}

/** generateStaticParams
 *
 *  Deliberately empty: the translated pages are not prerendered.
 *
 *  Building them cost ~244 pages across the two language routes (5 languages ×
 *  5 softwares, and × 44 countries), each one the most expensive kind of render
 *  on the site — WPML gives every relation its own translated node, so a
 *  language page fans out far wider than its English counterpart. That volume
 *  against Pressable is what produced the 429s during `next build`.
 *
 *  `dynamicParams` is left at its default of true, so a language URL is
 *  rendered on first request and then served from the cache. Nothing is
 *  unreachable — the first visitor pays for the render, and only once.
 *
 *  The data underneath stays on GraphQL, which already caches: GraphQLAPI
 *  posts every query through ${REDIS_URL}/api/cache rather than straight to
 *  /graphql, so even that first render is usually answered from Redis.
 */
export async function generateStaticParams() {
	return [];
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
				Url={`/software/${meta?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<SoftwareInsideWrap {...props} language={params.language} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
