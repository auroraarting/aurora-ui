/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import GlobalPresenceInsideWrap from "@/sections/global-presence/GlobalPresenceInsideWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForCountries } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getCountries,
	getCountryInside,
	getRegions,
} from "@/services/GlobalPresence.service";
import {
	getAllLanguages,
	getCountryInside as getCountryInsideWithLanguages,
} from "@/services/GlobalPresenceLanguages.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";
import { getWebinars } from "@/services/Webinar.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** generateMetadata  */
// export async function generateMetadata({ params }) {
// 	const { slug } = await params;
// 	const meta = await getPageSeo({ postType: "country", slug: slug });
// 	const seo = meta?.data?.countryBy?.seo;

// 	return {
// 		title: seo?.title || "Default Title",
// 		description: seo?.metaDesc || "",
// 		keywords: seo?.metaKeywords || "",
// 		alternates: {
// 			canonical: `https://auroraer.com/global-presence/${slug}`, // 👈 canonical URL
// 		},
// 		openGraph: {
// 			images: [
// 				{
// 					url: "https://auroraer.com/img/og-image.jpg",
// 				},
// 			],
// 		},
// 	};
// }

/** generateStaticParams  */
export async function generateStaticParams() {
	// Every country is prebuilt, not just the newest few: there are only ~38 of
	// them, they change rarely, and four of this page's five fetches are shared
	// across all of them, so the build cache collapses them into two per page.
	const countries = await getCountries();
	return (countries?.data?.countries?.nodes || [])
		.map((item) => ({ slug: item?.slug }))
		.filter((params) => params.slug);
}

/** Fetch  */
async function getData({ params }) {
	const [
		insightsRes,
		categoriesRes,
		//  eventsRes,
		//  webinarsRes,
		countryData,
		meta,
		languages,
	] = await Promise.all([
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
		),
		getInsightsCategories(),
		// getAllEvents("first:9999"),
		// getWebinars("first:9999"),
		// isJapanese
		// 	? getCountryInsideWithLanguages(params.slug)
		// 	: getCountryInside(params.slug),
		getCountryInside(params.slug),
		getPageSeo({ postType: "country", slug: params.slug }),
		getAllLanguages(),
	]);

	// const countryBy = isJapanese
	// 	? {
	// 			...countryData?.data?.countryBy?.translations?.[0],
	// 			translations: [{ slug: "jp", title: "Japan" }],
	// 	  }
	// 	: countryData?.data?.countryBy;

	const countryBy = countryData?.data?.countryBy;
	const seo = meta?.data?.countryBy?.seo;
	// const mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	const mapJson = [];
	const insightsList = insightsRes?.data?.posts?.nodes || [];
	const countries = categoriesRes?.data?.countries?.nodes || [];
	const countryTranslations = countryBy?.translations || [];
	let selectedAllLanguages = [
		{
			title: "English",
			shortTitle: "",
			icon: "/img/en-flag.svg",
		},
	];
	languages?.data?.languages?.map((item) => {
		countryTranslations?.filter((item2) => {
			if (item?.language_code === "ko" && params.slug === "japan") return; // Skip Ko for Japan as it's already added

			if (item2.languageCode === item?.language_code) {
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

	// Optional: enable this if fallback 404 is desired
	// if (!countryBy) return { notFound: true };

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList,
			countries,
			seo,
			selectedAllLanguages,
			// events: eventsList.slice(0, 1),
			// webinars: webinarList.slice(0, 3),
		},
	};
}

/** Australia Page */
export default async function Australia({ params }) {
	const { slug } = await params;
	const { props } = await getData({ params: { slug } });

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={props?.seo?.title}
				Desc={props?.seo?.metaDesc}
				OgImg={"https://auroraer.com/img/og-image.jpg"}
				Url={`https://auroraer.com/global-presence/${slug}`}
				Keywords={props?.seo?.metaKeywords}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<GlobalPresenceInsideWrap {...props} slug={slug} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
