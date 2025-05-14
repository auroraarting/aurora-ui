// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
import { getAllEvents, getEventsInside } from "@/services/Events.service";
import { getInsightsCategories } from "@/services/Insights.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getEventsInside(params.slug);
	const post = data?.data?.eventBy;

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
async function getData({ params }) {
	const [data, events, categoriesForSelect, pastEvents] = await Promise.all([
		getEventsInside(params.slug),
		// eslint-disable-next-line quotes
		getAllEvents('first:3, where: { thumbnail: { status: "Upcoming" } }'),
		getInsightsCategories(),
		// eslint-disable-next-line quotes
		getAllEvents('first:3, where: { thumbnail: { status: "Past" } }'),
	]);

	const countries = categoriesForSelect?.data?.countries?.nodes;
	const dataForBtn = { postFields: data?.data?.eventBy?.events || {} };

	const eventList = [];
	const pastEventList = [];

	events.data.events.nodes?.map((item) => {
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

		if (item?.slug != params.slug) eventList.push(tempObj);
	});
	pastEvents.data.events.nodes?.map((item) => {
		let categories = [
			{
				slug: "event",
				name: "Event",
			},
		];

		item?.events?.thumbnail?.country.nodes?.map((item) => {
			categories.push({ ...item, name: item.title });
		});
		const tempObj = {
			title: item?.title,
			slug: item?.slug,
			date: item?.events?.thumbnail?.date,
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

		if (item?.slug != params.slug) pastEventList.push(tempObj);
	});

	return {
		props: {
			data: data?.data?.eventBy || {},
			countries,
			dataForBtn,
			events: eventList,
			pastEvents: pastEventList,
			eventsOriginal: events.data.events.nodes.filter(
				(item) => item.slug != params.slug
			),
		},
	};
}

/** EventsInside Page */
export default async function EventsInside({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/events/${data?.slug}`}
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
