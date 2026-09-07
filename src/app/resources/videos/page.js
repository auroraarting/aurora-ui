// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/Graphql.service.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

// MODULES //

// COMPONENTS //

// SECTIONS //
import VideosWrap from "@/sections/resources/videos/VideosWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// SERVICES //
import { getAllVideos } from "@/services/Videos.service";
import { getVideosLandingPage } from "@/services/VideosLanding.service";

import { pause } from "@/utils/pace";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Videos | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/resources/videos",
	},
};


/** Videos Page */
export default async function Videos() {
	const dataFetch = await getAllVideos();
	await pause();
	const landingFetch = await getVideosLandingPage();
	const videosLanding = landingFetch?.data?.page?.videosLanding || {};
	const data =
		dataFetch?.data?.videos?.nodes?.sort(
			(a, b) => new Date(b?.videoFields?.date) - new Date(a?.videoFields?.date),
		) || [];

	// Extract unique topics from video data
	const topicsMap = {};
	data.forEach((item) => {
		item?.videoFields?.topic?.nodes?.forEach((t) => {
			if (t?.title && !topicsMap[t.title]) {
				topicsMap[t.title] = { title: t.title };
			}
		});
	});
	const topics = Object.values(topicsMap);

	// Extract unique countries from video data
	const countriesMap = {};
	data.forEach((item) => {
		item?.videoFields?.country?.nodes?.forEach((c) => {
			if (c?.title && !countriesMap[c.title]) {
				countriesMap[c.title] = { title: c.title };
			}
		});
	});
	const countries = Object.values(countriesMap);
	const socialLinks = videosLanding?.socialLinks;
	return (
		<div>
			<VideosWrap
				data={data}
				topics={topics}
				countries={countries}
				videosLanding={videosLanding}
				socialLinks={socialLinks}
			/>
		</div>
	);
}
