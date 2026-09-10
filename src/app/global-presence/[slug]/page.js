/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
} from "@/services/rest/GlobalPresence.service";
import {
	getAllLanguages,
} from "@/services/rest/Languages.service";
import {
	getInsights,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getAllEvents } from "@/services/rest/Events.service";
import { getWebinars } from "@/services/rest/Webinar.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** generateMetadata  */
// export async function generateMetadata({ params }) {
// 	const { slug } = await params;
// 	const meta = await getPageSeo(`countryBy(slug: "${slug}")`);
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
	const countries = await getCountries();
	return countries.map((item) => ({
		slug: item?.slug || "india",
	}));
}

/** Fetch  */
async function getData({ params }) {
	// const language = query.language;
	// const isJapanese = language === "jp";

	const [
		insightsRes,
		categoriesRes,
		//  eventsRes,
		//  webinarsRes,
		countryData,
		meta,
		languages,
	] = await Promise.all([
		getInsights({ first: 3, categories: insightTeaserCategories }),
		// This page only ever read `countries` off getInsightsCategories, which
		// fetched six option lists to get it.
		getCountries(),
		// getAllEvents("first:9999"),
		// getWebinars("first:9999"),
		// isJapanese
		// 	? getCountryInsideWithLanguages(params.slug)
		// 	: getCountryInside(params.slug),
		getCountryInside(params.slug),
		getPageSeo("country", params.slug),
		getAllLanguages(),
	]);

	// const countryBy = isJapanese
	// 	? {
	// 			...countryData?.data?.countryBy?.translations?.[0],
	// 			translations: [{ slug: "jp", title: "Japan" }],
	// 	  }
	// 	: countryData?.data?.countryBy;

	// The REST services return the node and the seo object directly.
	const countryBy = countryData;
	const seo = meta?.seo;
	// const mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	const mapJson = [];
	const insightsList = insightsRes || [];
	const countries = categoriesRes || [];
	const countryTranslations = countryBy?.translations || [];
	let selectedAllLanguages = [
		{
			title: "English",
			shortTitle: "",
			icon: "/img/en-flag.svg",
		},
	];
	languages?.map((item) => {
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
