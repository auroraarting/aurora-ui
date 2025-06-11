/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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
import {
	getCountries,
	getCountryInside,
	getRegions,
} from "@/services/GlobalPresence.service";
import { getCountryInside as getCountryInsideWithLanguages } from "@/services/GlobalPresenceLanguages.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";
import { getWebinars } from "@/services/Webinar.service";

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const data = await getCountryInside(slug);
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

/** generateStaticParams  */
export async function generateStaticParams() {
	const countries = await getCountries();
	return countries?.data?.countries?.nodes?.map((item) => ({
		slug: item?.slug || "india",
	}));
}

/** Fetch  */
async function getData({ params, query }) {
	const { language } = query;
	const { slug } = params;

	// Run all API calls in parallel
	const [
		insights,
		categoriesForSelect,
		eventsFetch,
		webinarsFetch,
		countryData,
	] = await Promise.all([
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getInsightsCategories(),
		getAllEvents("first:9999"),
		getWebinars("first:9999"),
		language === "jp"
			? getCountryInsideWithLanguages(slug)
			: getCountryInside(slug),
	]);

	// Country info logic
	const countryBy =
		language === "jp"
			? {
					...countryData?.data?.countryBy?.translations?.[0],
					translations: countryData?.data?.countryBy?.translations,
			  }
			: countryData?.data?.countryBy;

	const mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	const insightsList = insights?.data?.posts?.nodes || [];

	const allEvents = eventsFetch?.data?.events?.nodes || [];
	const allWebinars = webinarsFetch?.data?.webinars?.nodes || [];

	/** Utility functions  */
	const isUpcoming = (date) => new Date() < new Date(date);
	/** Utility functions  */
	const sortByDate = (a, b, key) => new Date(a?.[key]) - new Date(b?.[key]);
	/** Utility functions  */
	const removeDuplicatesByTitle = (arr) =>
		arr.filter(
			(item, idx, self) => idx === self.findIndex((t) => t?.title === item?.title)
		);

	/** Utility functions  */
	const filterAndSort = (items, filterFn, dateKey) =>
		items
			.filter((item) => filterFn(item) && isUpcoming(item?.[dateKey]))
			.sort((a, b) => sortByDate(a, b, dateKey));

	/** Events  */
	const countryEventFilter = (item) =>
		item?.events?.thumbnail?.country?.nodes?.some((c) => c?.slug === slug);

	const events = filterAndSort(
		allEvents,
		countryEventFilter,
		"events.thumbnail.date"
	);
	const eventsAll = filterAndSort(
		allEvents,
		() => true,
		"events.thumbnail.date"
	);
	const eventsList = events.length > 0 ? events : eventsAll;

	/** Webinars  */
	const countryWebinarFilter = (item) =>
		item?.webinarsFields?.country?.nodes?.some((c) => c?.slug === slug);

	let webinars = filterAndSort(
		allWebinars,
		countryWebinarFilter,
		"webinarsFields.startDateAndTime"
	);
	const webinarsAllSorted = filterAndSort(
		allWebinars,
		() => true,
		"webinarsFields.startDateAndTime"
	);

	if (webinars.length < 3) {
		webinars = removeDuplicatesByTitle([...webinars, ...webinarsAllSorted]);
	}

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			events: eventsList.slice(0, 1),
			webinars: webinars.slice(0, 3),
		},
	};
}

/** Australia Page */
export default async function Australia({ params, searchParams }) {
	const { slug } = await params;
	const query = await searchParams;
	const { props } = await getData({ params: { slug }, query });

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
