/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import HomeBanner from "@/sections/home/HomeBanner";
import HomeOurOfferings from "@/sections/home/HomeOurOfferings";
import HomeWhoWeAre from "@/sections/home/HomeWhoWeAre";
import HomeResources from "@/sections/home/HomeResources";
import HomeEvents from "@/sections/home/HomeEvents";
import HomeTalentMeets from "@/sections/home/HomeTalentMeets";
import Counter from "@/sections/careers/Counter";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/Home.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getRegions } from "@/services/GlobalPresence.service";
import { getHomePage } from "@/services/Home.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";

/** Fetch  */
export async function getServerSideProps() {
	const [regions, data, insights, eventsdata] = await Promise.all([
		getRegions(),
		getHomePage(),
		getInsights(
			'first: 6, where: {categoryName: "commentary,renewable-energy,flexible-energy-storage,gb-flex-pu,global-energy-forecast,public-webinar,webinar,webinar-recording"}'
		),
		// eslint-disable-next-line quotes
		getAllEvents('first:3, where: { thumbnail: { status: "Upcoming" } }'),
	]);
	const mapJson = getMapJsonForAllRegions(regions);

	return {
		props: {
			data: data.data.page.homepage,
			countries: data.data.countries.nodes,
			mapJson,
			insights: insights.data.posts.nodes,
			events: eventsdata.data.events.nodes,
		},
	};
}

/** Home Page */
export default function HomePage({
	mapJson,
	data,
	countries,
	insights,
	events,
}) {
	console.log("insights", events);
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Home"} Desc={"Home Desc"} OgImg={""} Url={"/"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<HomeBanner />
				<HomeOurOfferings />
				{data?.ourClient?.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				<GlobalMap locationJson={mapJson} />
				{data.stats && (
					<div>
						<Counter
							data={{ stats: { ...data.stats, countries: countries.length } }}
						/>
					</div>
				)}
				<HomeWhoWeAre />
				<div className="ptb_100">
					<HomeResources data={insights} countries={countries} />
				</div>
				<div className="pb_100">
					<HomeEvents data={events} />
				</div>
				<div className="">
					<HomeTalentMeets />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
