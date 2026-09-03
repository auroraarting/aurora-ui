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
import { getVideosLandingPage } from "@/services/rest/VideosLanding.service";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Videos | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/resources/videos",
	},
};

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** Videos Page */
export default async function Videos() {
	const [dataFetch, landingFetch] = await Promise.all([
		getAllVideos(),
		getVideosLandingPage(),
	]);
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
