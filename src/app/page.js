// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import IframeModal from "@/components/IframeModal";
import Counter from "@/sections/careers/Counter";

// SECTIONS //
import HomeBanner from "@/sections/home/HomeBanner";
import HomeOurOfferings from "@/sections/home/HomeOurOfferings";
import HomeWhoWeAre from "@/sections/home/HomeWhoWeAre";
import HomeResources from "@/sections/home/HomeResources";
import HomeEvents from "@/sections/home/HomeEvents";
import HomeTalentMeets from "@/sections/home/HomeTalentMeets";

// PLUGINS //

// UTILS //
import { getMapJsonForAllRegions } from "@/utils";

// STYLES //
import styles from "@/styles/pages/Home.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getRegions } from "@/services/GlobalPresence.service";
import { getHomePage, getHomePageVoices } from "@/services/Home.service";
import { getInsights } from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";

/** Meta Data */
export const metadata = {
	title: "Home | Aurora",
	description: "Aurora",
};

export const revalidate = 60; // Revalidates every 60 seconds

/** Home Page */
export default async function HomePage() {
	let mapJson;
	let data;
	let countries;
	let events;
	let voices;
	let errorMsg;

	try {
		// const [regions, dataFetch, eventsdata, voicesFetch] = await Promise.all([
		// 	getRegions(),
		// 	getHomePage(),
		// 	// eslint-disable-next-line quotes
		// 	getAllEvents('first:3, where: { thumbnail: { status: "Upcoming" } }'),
		// 	getHomePageVoices(),
		// ]);
		const regions = await getRegions();
		await new Promise((res) => setTimeout(res, 200));
		const dataFetch = await getHomePage();
		await new Promise((res) => setTimeout(res, 200));
		const eventsdata = await getAllEvents(
			'first:3, where: { thumbnail: { status: "Upcoming" } }'
		);
		await new Promise((res) => setTimeout(res, 200));
		const voicesFetch = await getHomePageVoices();

		mapJson = getMapJsonForAllRegions(regions);
		data = dataFetch.data.page.homepage;
		countries = dataFetch.data.countries.nodes;
		events = eventsdata.data.events.nodes;
		voices = voicesFetch;
	} catch (error) {
		errorMsg = error;
		console.log(error, "Error");
	}

	if (errorMsg) return <div>{errorMsg}</div>;

	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<HomeBanner />
				<HomeOurOfferings />
				{data?.ourClient?.selectLogos && (
					<div className="pt_40">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data?.ourClient?.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				{mapJson && <GlobalMap locationJson={mapJson} />}
				{data?.stats && (
					<div>
						<Counter data={{ stats: { ...data.stats } }} />
					</div>
				)}
				<HomeWhoWeAre />
				<div className="ptb_100">
					<HomeResources countries={countries} voices={voices} />
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
