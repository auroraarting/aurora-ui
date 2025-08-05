/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// export const dynamic = "force-static"; // Use when data is highly cacheable
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
	getInsightsTranslations,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";
import { getWebinars } from "@/services/Webinar.service";
import { getPageSeo } from "@/services/Seo.service";

export const revalidate = 30; // Revalidates every 60 seconds

/** generateMetadata  */
// export async function generateMetadata({ params }) {
// 	const { slug } = await params;
// 	const meta = await getPageSeo(`countryBy(slug: "${slug}")`);
// 	const seo = meta?.data?.countryBy?.seo;

// 	return {
// 		title: seo?.title || "Default Title",
// 		description: seo?.metaDesc || "Default description",
// 		keywords: seo?.metaKeywords || "Default description",
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
	const languages = await getAllLanguages();
	const staticParams = [];

	countries?.data?.countries?.nodes?.map((country) => {
		const slug = country?.slug || "india";

		languages?.data?.languages?.nodes?.forEach((lang) => {
			const language = lang?.code || "en";
			staticParams.push({ slug, language });
		});
	});

	return staticParams;
}

/** Fetch  */
async function getData({ params, query }) {
	const language = query.language;
	// const isJapanese = language === "jp";

	const [
		insightsRes,
		categoriesRes,
		//  eventsRes,
		//  webinarsRes,
		countryData,
		meta,
	] = await Promise.all([
		getInsightsTranslations(
			'first: 9999, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}'
		),
		getInsightsCategories(),
		// getAllEvents("first:9999"),
		// getWebinars("first:9999"),
		// isJapanese
		// 	? getCountryInsideWithLanguages(params.slug)
		// 	: getCountryInside(params.slug),
		// getCountryInside(params.slug),
		getCountryInsideWithLanguages(params.slug),
		getPageSeo(`countryBy(slug: "${params.slug}")`),
	]);

	// const countryBy = isJapanese
	// 	? {
	// 			...countryData?.data?.countryBy?.translations?.[0],
	// 			translations: [{ slug: "jp", title: "Japan" }],
	// 	  }
	// 	: countryData?.data?.countryBy;
	let countryBy =
		countryData?.data?.countryBy?.translations?.filter(
			(countryItem) => countryItem.languageCode === language
		)[0] || countryData?.data?.countryBy;

	// countryBy.countries = {
	// 	...countryBy.countries,
	// 	// ...countryData?.data?.countryBy.countries,
	// };

	countryBy.countries.availableRegions.team.nodes =
		countryData.data.countryBy.countries.availableRegions.team.nodes.map(
			(item) => {
				return {
					...item,
					...item?.translations?.filter(
						(item2) => item2?.languageCode === language
					)?.[0],
				};
			}
		);

	countryBy.countries.map.markers =
		countryData.data.countryBy.countries.map.markers.map((item) => {
			let category = {
				nodes: item?.category?.nodes?.map((item2) => {
					return {
						...item2,
						...item2?.translations?.filter(
							(item3) => item3?.languageCode === language
						)?.[0],
					};
				}),
			};
			return {
				...item,
				category,
			};
		});

	if (countryData?.data?.countryBy?.countries?.ourClients?.testimonials?.nodes) {
		countryBy.countries.ourClients.testimonials.nodes =
			countryData?.data?.countryBy.countries.ourClients.testimonials.nodes;
	}
	if (countryData?.data?.countryBy?.countries?.ourClients?.selectLogos?.nodes) {
		countryBy.countries.ourClients.selectLogos.nodes =
			countryData?.data?.countryBy.countries.ourClients.selectLogos.nodes?.map(
				(item) => {
					return {
						...item,
						featuredImage: {
							node: item?.featuredImage?.node?.translations?.filter(
								(item2) => item2?.languageCode === language
							)?.[0],
						},
					};
				}
			);
	}
	if (countryData?.data?.countryBy?.countries?.insights?.list?.nodes) {
		countryBy.countries.insights.list.nodes =
			countryData.data.countryBy.countries.insights.list.nodes?.map((item) => {
				let temp1 =
					item?.translations?.filter(
						(item2) => item2?.languageCode === language
					)?.[0] || [];
				return {
					...item,
					...temp1,
					categories: {
						nodes: item?.categories?.nodes?.map((item3) => ({
							...item3,
							// ...item2?.translations?.[0],
							alternateName: item3?.translations?.filter(
								(item4) => item4?.languageCode === language
							)?.[0]?.name,
						})),
					},
				};
			});
	}

	// countryBy.countries.map.markers = countryBy.countries.map.markers;

	// const countryBy = countryData?.data?.countryBy;
	const seo = meta?.data?.countryBy?.seo;
	// const mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	const mapJson = [];
	let insightsList = insightsRes.data.posts.nodes;
	if (insightsRes.data.posts.nodes.translations) {
		let insightsResData =
			insightsRes.data.posts.nodes.translations?.filter(
				(item2) => item2.languageCode === language
			)?.[0] || [];
		insightsList = [...insightsRes.data.posts.nodes, ...insightsResData] || [];
	}

	const countries = categoriesRes?.data?.countries?.nodes || [];
	// if (language === "ja") {
	// 	countryBy.countries.eventsWebinarSection.sectionHeading =
	// 		"あらゆる声、あらゆる市場";
	// 	countryBy.countries.eventsWebinarSection.eventButtonText =
	// 		"すべてのイベントを見る";
	// 	countryBy.countries.eventsWebinarSection.webinarButtonText =
	// 		"すべてのウェビナーを見る";
	// 	countryBy.countries.eventsWebinarSection.tabTitle = "イベントとウェビナー";
	// }

	countryBy.countries.showTranslation = true;

	// Optional: enable this if fallback 404 is desired
	// if (!countryBy) return { notFound: true };

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList: insightsList?.sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			),
			countries,
			seo,
			// events: eventsList.slice(0, 1),
			// webinars: webinarList.slice(0, 3),
		},
	};
}

/** Australia Page */
export default async function Australia({ params }) {
	const { slug, language } = await params;
	const query = { language };
	const { props } = await getData({ params: { slug }, query });

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={props?.seo?.title}
				Desc={props?.seo?.metaDesc}
				OgImg={"https://auroraer.com/img/og-image.jpg"}
				Url={`/global-presense/${slug}`}
				Keywords={props?.seo?.metaKeywords}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<GlobalPresenceInsideWrap {...props} slug={slug} language={language} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
