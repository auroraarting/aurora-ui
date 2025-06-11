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
import { getAllEvents, getEventsInside } from "@/services/Events.service";
import { getInsightsCategories } from "@/services/Insights.service";

export const revalidate = 60; // Revalidates every 60 seconds

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

/** generateStaticParams  */
export async function generateStaticParams() {
	const dataFetch = await getAllEvents();
	return dataFetch.data.events.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ slug }) {
	const [data, events, categoriesForSelect, pastEvents] = await Promise.all([
		await getEventsInside(slug),
		// eslint-disable-next-line quotes
		await getAllEvents("first:9999"), //Upcoming
		await getInsightsCategories(),
		// eslint-disable-next-line quotes
		await getAllEvents("first:9999"), //Past
	]);

	let todaysDate = new Date();

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

		if (item?.slug != slug) eventList.push(tempObj);
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
		new Date(data?.data?.eventBy.events?.thumbnail?.date) >= todaysDate
			? "Upcoming"
			: "Past";

	const dataFromAPI = {
		...data?.data?.eventBy,
		events: {
			...data?.data?.eventBy.events,
			thumbnail: { ...data?.data?.eventBy.events.thumbnail, status: isUpcoming },
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
				events.data.events.nodes
					?.filter(
						(item) =>
							new Date() < new Date(item.events?.thumbnail?.date) && item.slug !== slug
					)
					?.sort(
						(a, b) =>
							new Date(a?.events?.thumbnail?.date) -
							new Date(b?.events?.thumbnail?.date)
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
