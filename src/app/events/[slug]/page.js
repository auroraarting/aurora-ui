// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import {
	getAllEvents,
	getEventsInside,
} from "@/services/rest/Events.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	// getEventsInside now returns the node directly.
	const post = await getEventsInside(params.slug);

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
	const events = await getAllEvents();
	return events.map((item) => ({ slug: item.slug }));
}

/** Fetch  */
async function getData({ slug }) {
	// getAllEvents was called twice here, for the upcoming and the past lists —
	// the same query both times, so it is fetched once. getInsightsCategories
	// fetched six option lists for the `countries` value alone; getCountryList
	// is the one call.
	const [data, allEvents, countries] = await Promise.all([
		getEventsInside(slug),
		getAllEvents(),
		getCountryList(),
	]);
	const events = allEvents;
	const pastEvents = allEvents;

	let todaysDate = new Date();

	const dataForBtn = { postFields: data?.events || {} };

	const eventList = [];
	const pastEventList = [];

	events?.map((item) => {
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
	pastEvents?.map((item) => {
		// A fresh array per row: the loop appends the countries, and reusing the
		// service's own arrays would corrupt a cached response.
		const categories = [
			{
				slug: "event",
				name: "Event",
			},
		];

		item?.events?.thumbnail?.country?.nodes?.map((item) => {
			categories.push({ ...item, name: item.title });
		});
		const tempObj = {
			title: item?.title,
			slug: item?.slug,
			date: item?.events?.thumbnail?.date,
			externalUrl: item?.events?.thumbnail?.externalUrl,
			featuredImage: null,
			categories: {
				nodes: categories,
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

		if (item?.slug != slug) pastEventList.push(tempObj);
	});

	let isUpcoming =
		new Date(data?.events?.thumbnail?.date) >= todaysDate ? "Upcoming" : "Past";

	const dataFromAPI = {
		...data,
		events: {
			...data?.events,
			thumbnail: { ...data?.events?.thumbnail, status: isUpcoming },
		},
	};

	return {
		props: {
			data: dataFromAPI,
			countries,
			dataForBtn,
			events: eventList,
			pastEvents: pastEventList
				?.filter((item) => new Date() > new Date(item?.date))
				?.sort((a, b) => new Date(b?.date) - new Date(a?.date))
				.slice(0, 3),
			eventsOriginal:
				events
					?.filter(
						(item) =>
							new Date() < new Date(item?.events?.thumbnail?.date) &&
							item.slug !== slug,
					)
					?.sort(
						(a, b) =>
							new Date(a?.events?.thumbnail?.date) -
							new Date(b?.events?.thumbnail?.date),
					)
					.slice(0, 2) || [],
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
