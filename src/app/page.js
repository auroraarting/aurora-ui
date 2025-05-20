// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
	const [regions, dataFetch, insightsFetch, eventsdata, voicesFetch] =
		await Promise.all([
			getRegions(),
			getHomePage(),
			getInsights(
				'first: 6, where: {categoryName: "commentary,public-webinar,webinar,webinar-recording,market-reports"}'
			),
			// eslint-disable-next-line quotes
			getAllEvents('first:3, where: { thumbnail: { status: "Upcoming" } }'),
			getHomePageVoices(),
		]);
	const mapJson = getMapJsonForAllRegions(regions);
	const data = dataFetch.data.page.homepage;
	const countries = dataFetch.data.countries.nodes;
	const insights = insightsFetch.data.posts.nodes;
	const events = eventsdata.data.events.nodes;
	const voices = voicesFetch;
	console.log(voices, "voices");

	return (
		<div>
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
				{mapJson && <GlobalMap locationJson={mapJson} />}
				{data?.stats && (
					<div>
						<Counter data={{ stats: { ...data.stats } }} />
					</div>
				)}
				<HomeWhoWeAre />
				<div className="ptb_100">
					<HomeResources data={insights} countries={countries} voices={voices} />
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
