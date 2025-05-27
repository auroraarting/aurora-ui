/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import GlobalPresenceInsideWrap from "@/sections/global-presence/GlobalPresenceInsideWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForCountries } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getCountryInside } from "@/services/GlobalPresence.service";
import { getCountryInside as getCountryInsideWithLanguages } from "@/services/GlobalPresenceLanguages.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";
import { getWebinars } from "@/services/Webinar.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getCountryInside(params.slug);
	const post = data?.data?.countryBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ params, query }) {
	const language = query.language;
	let data, countryBy, mapJson;

	if (language && language === "jp") {
		// Fetch Japanese data
		[data] = await Promise.all([getCountryInsideWithLanguages(params.slug)]);
		countryBy = data?.data?.countryBy?.translations?.[0];
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	} else {
		// Default fetch
		[data] = await Promise.all([getCountryInside(params.slug)]);
		countryBy = data?.data?.countryBy;
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	}
	const [insights, categoriesForSelect, eventsFetch, webinarsFetch] =
		await Promise.all([
			getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
			),
			getInsightsCategories(),
			getAllEvents("first:9999"),
			getWebinars("first:9999"),
		]);
	const insightsList = insights?.data?.posts?.nodes;
	const webinars = webinarsFetch?.data?.webinars?.nodes
		?.filter((item) =>
			item?.webinarsFields?.country?.nodes?.some(
				(item2) => item2?.slug === params.slug
			)
		)
		?.filter(
			(item) => new Date() < new Date(item.webinarsFields?.startDateAndTime)
		);
	const events = eventsFetch?.data?.events?.nodes
		?.filter((item) =>
			item?.events?.thumbnail?.country?.nodes?.some(
				(item2) => item2?.slug === params.slug
			)
		)
		?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date));

	let sortedAllWebinars = webinarsFetch?.data?.webinars?.nodes
		?.filter(
			(item) => new Date() < new Date(item.webinarsFields?.startDateAndTime)
		)
		.sort(
			(a, b) =>
				new Date(b?.webinarsFields?.startDateAndTime) -
				new Date(a?.webinarsFields?.startDateAndTime)
		);

	let webinarList =
		webinars?.length > 0
			? webinars
					?.filter(
						(item) => new Date() < new Date(item.webinarsFields?.startDateAndTime)
					)
					?.sort(
						(a, b) =>
							new Date(b?.webinarsFields?.startDateAndTime) -
							new Date(a?.webinarsFields?.startDateAndTime)
					)
			: sortedAllWebinars;

	if (webinarList.length < 3) {
		let remainingSoted = sortedAllWebinars.slice(0, 3 - webinarList.length);
		webinarList = [...webinarList, ...remainingSoted].sort(
			(a, b) =>
				new Date(b?.webinarsFields?.startDateAndTime) -
				new Date(a?.webinarsFields?.startDateAndTime)
		);
	}

	const eventsList =
		events?.length > 0
			? events
					?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
					?.sort(
						(a, b) =>
							new Date(b?.events?.thumbnail?.date) -
							new Date(a?.events?.thumbnail?.date)
					)
			: eventsFetch?.data?.events?.nodes
					?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
					?.sort(
						(a, b) =>
							new Date(b?.events?.thumbnail?.date) -
							new Date(a?.events?.thumbnail?.date)
					);

	// Return 404 if no valid data
	if (!countryBy) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			events: eventsList.slice(0, 1) || [],
			webinars: webinarList?.slice(0, 3) || [],
		},
	};
}

/** Australia Page */
export default async function Australia({ params, searchParams }) {
	const query = await searchParams;
	const { props } = await getData({ params, query });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/global-presense/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<GlobalPresenceInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
