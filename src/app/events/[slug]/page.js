// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";

// SECTIONS //
import EventsInsideWrap from "@/sections/events/EventsInsideWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/EventsInside.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getAllEvents } from "@/services/Events.service";
import { getEventsInside } from "@/services/rest/Events.service";
import { getInsightsCategories } from "@/services/Insights.service";

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getEventsInside(params.slug);
	const post = data?.data?.eventBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "",
		alternates: {
			canonical: `https://auroraer.com/events/${params.slug}`, // 👈 canonical URL
		},
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
	const dataFetch = await getAllEvents();
	return (dataFetch?.data?.events?.nodes || []).map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ slug }) {
	const [data, events, categoriesForSelect] = await Promise.all([
		await getEventsInside(slug),
		// eslint-disable-next-line quotes
		await getAllEvents("first:9999"),
		await getInsightsCategories(),
	]);

	let todaysDate = new Date();

	const countries = categoriesForSelect?.data?.countries?.nodes;
	const dataForBtn = { postFields: data?.data?.eventBy?.events || {} };

	const eventList = [];

	events?.data?.events?.nodes?.map((item) => {
		const tempObj = {
			title: item?.title,
			slug: item?.slug,
			date: item?.events?.thumbnail?.date,
			featuredImage: null,
			categories: {
				nodes: [
					{
						slug: "event",
						name: "Event",
					},
				],
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: {
				nodes: [],
			},
		};

		if (item?.slug != slug) eventList.push(tempObj);
	});
	let isUpcoming =
		new Date(data?.data?.eventBy?.events?.thumbnail?.date) >= todaysDate
			? "Upcoming"
			: "Past";

	// The sidebar shows a single upcoming event, picked for relevance to the one
	// being viewed. The full listing already includes this event, so its category
	// terms come from there rather than a second request.
	const allEvents = events?.data?.events?.nodes || [];
	const currentCategorySlugs = new Set(
		allEvents
			.find((item) => item?.slug === slug)
			?.eventscategories?.nodes?.map((item) => item?.slug)
			?.filter(Boolean) || [],
	);
	const upcomingEvents = allEvents
		.filter(
			(item) =>
				item?.slug !== slug &&
				new Date(item?.events?.thumbnail?.date) > todaysDate,
		)
		.sort(
			(a, b) =>
				new Date(a?.events?.thumbnail?.date) - new Date(b?.events?.thumbnail?.date),
		);
	// Soonest event sharing a category with this one. Falls back to the soonest
	// upcoming event overall — without it the card would usually be empty, since
	// only a handful of events are ever upcoming at once.
	const nearestUpcoming =
		(currentCategorySlugs.size > 0 &&
			upcomingEvents.find((item) =>
				item?.eventscategories?.nodes?.some((cat) =>
					currentCategorySlugs.has(cat?.slug),
				),
			)) ||
		upcomingEvents[0];

	const dataFromAPI = {
		...data?.data?.eventBy,
		events: {
			...data?.data?.eventBy?.events,
			thumbnail: { ...data?.data?.eventBy?.events?.thumbnail, status: isUpcoming },
		},
	};

	return {
		props: {
			data: dataFromAPI,
			countries,
			dataForBtn,
			events: eventList,
			eventsOriginal: nearestUpcoming ? [nearestUpcoming] : [],
		},
	};
}

/** EventsInside Page */
export default async function EventsInside({ params }) {
	const { slug } = await params;
	const { props } = await getData({ slug });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`https://auroraer.com/events/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EventsInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
