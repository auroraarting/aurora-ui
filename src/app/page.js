// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
import { getRegions } from "@/services/rest/GlobalPresence.service";
import { getHomePage, getHomePageVoices } from "@/services/rest/Home.service";
import { getAllEvents } from "@/services/rest/Events.service";
// SEO from GraphQL. Same signature and same `{ status, seo }` shape as the
// REST service, so this is an import swap; the endpoint and slug still
// become the cache tag (pages/faq -> page:faq).
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// selector, and returns the seo block directly.
	const meta = await getPageSeo("pages", "homepage");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

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
		// These were four sequential awaits, which on the REST layer means four
		// round trips the page waits through in series for no reason — none of
		// them depends on another. The limiter still decides how many actually
		// run at once.
		const [regions, home, allEvents, voicesFetch] = await Promise.all([
			getRegions(),
			getHomePage(),
			getAllEvents(),
			getHomePageVoices(),
		]);

		mapJson = getMapJsonForAllRegions(regions);
		// The REST services return the nodes unwrapped; getRegions keeps its
		// envelope because the map helpers walk it.
		data = home.data;
		countries = home.countries;
		events = allEvents
			?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
			?.sort(
				(a, b) =>
					new Date(a?.events?.thumbnail?.date) -
					new Date(b?.events?.thumbnail?.date),
			)
			.slice(0, 1);
		voices = voicesFetch;
	} catch (error) {
		errorMsg = error;
		console.log(error, "Error");
	}

	// if (errorMsg) return <div>{errorMsg}</div>;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags /> */}
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={`${styles.HomePage}`}>
				<HomeBanner />
				<HomeOurOfferings />
				{data?.ourClient?.selectLogos && (
					<div className="pt_100 pb_50">
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
