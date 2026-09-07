// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "homepage", idType: URI)');
	const seo = meta?.data?.page?.seo;

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


/** Home Page */
export default async function HomePage() {
	let mapJson;
	let data;
	let countries;
	let events;
	let voices;
	let errorMsg;

	try {
		// In parallel, not one after another. These four are independent, and
		// serially they cost the sum of four WPGraphQL round trips (~19s, the
		// events query alone is ~11s) on top of what the layout already spends —
		// which is what pushed an ISR regeneration past its function budget.
		const [regions, dataFetch, eventsdata, voicesFetch] = await Promise.all([
			getRegions(),
			getHomePage(),
			getAllEvents("first:9999"),
			getHomePageVoices(),
		]);

		mapJson = getMapJsonForAllRegions(regions);
		data = dataFetch.data.page.homepage;
		countries = dataFetch.data.countries.nodes;
		events = eventsdata?.data?.events?.nodes
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
