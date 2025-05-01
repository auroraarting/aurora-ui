// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import EventsMiddleDescription from "@/sections/events/EventsMiddleDescription";
import EventsLocation from "@/sections/events/EventsLocation";
import Sponsors from "@/sections/events/Sponsors";
import EventInsideVideo from "@/sections/events/EventInsideVideo";
import Speakers from "@/sections/events/Speakers";
import EventsMiddleRight from "@/sections/events/EventsMiddleRight";
import EventsGallery from "@/sections/events/EventsGallery";
import AudienceBreakdown from "@/sections/events/AudienceBreakdown";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/EventsInside.module.scss";
import DownloadList from "@/sections/events/DownloadList";

// IMAGES //

// DATA //

// SERVICES //
import { getAllEvents, getEventsInside } from "@/services/Events.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { dynamicInsightsBtnProps } from "@/utils";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, events, categoriesForSelect] = await Promise.all([
		getEventsInside(params.slug),
		getAllEvents("first:3"),
		getInsightsCategories(),
	]);

	const countries = categoriesForSelect.data.countries.nodes;
	const dataForBtn = { postFields: data.data.eventBy.events };

	const eventList = [];
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

	return {
		props: {
			data: data.data.eventBy,
			countries,
			dataForBtn,
			events: eventList,
			eventsOriginal: events.data.events.nodes.filter(
				(item) => item.slug != params.slug
			),
		},
	};
}

/** EventsInside Page */
export default function EventsInside({
	data,
	events,
	countries,
	dataForBtn,
	eventsOriginal,
}) {
	console.log(eventsOriginal);
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

	/** scrollToSection */
	const scrollToSection = (id) => {
		scroller.scrollTo(id, {
			duration: 500,
			smooth: true,
			offset: -100,
			spy: true,
			onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});

		setTimeout(() => {
			setIsFormVisible(true);
			console.log("Scrolling finished!");
		}, 500);
	};

	const headerArray = [
		{ name: "Expertise", id: "#expertise" },
		{ name: "Available Regions", id: "#availableregions" },
		{ name: "Why Aurora", id: "#whyaurora" },
		{ name: "Clients", id: "#clients" },
		<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
			<Button color="primary" variant="filled" shape="rounded">
				Get Started
			</Button>
		</div>,
	];

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/events/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EventsInsidePage}>
				<div className="pt_100">
					<EventsInsideBanner data={data} />
				</div>
				<SectionsHeader
					data={headerArray}
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btnText && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btnText}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.eventsMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.eventsMiddleFlex} f_j`}>
							<div className={`${styles.eventsMiddleLeft}`}>
								<EventsMiddleDescription data={data} />
								<EventsLocation data={data} />
								{data?.events?.glimps?.gallery?.nodes && (
									<div className="pb_60">
										<EventsGallery data={data} />
									</div>
								)}
								<Sponsors data={data} />
								{data?.events?.glimps?.video && (
									<div className="">
										<EventInsideVideo data={data} />
									</div>
								)}
							</div>
							<div className={`${styles.eventsMiddleRight}`}>
								<EventsMiddleRight data={data} events={eventsOriginal} />
							</div>
						</div>
					</div>
				</section>
				<div className="pb_100">
					<AudienceBreakdown data={data} />
				</div>
				<div className="pb_40">
					<Speakers data={data} />
				</div>
				<div className="pb_60">
					<DownloadList data={data} />
				</div>
				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isInsightsBlogsVisible={true}
						defaultList={events}
						countries={countries}
						formSectionTitle="Sign up to receive our latest public insights straight to your inbox"
						formSectionDesc="Lorem ipsum dolor sit amet consectetur. Mattis fermentum proin erat pellentesque risus ac. Facilisis ullamcorper."
						insightsTitle="Previous Events from Aurora"
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btnText
						}
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
