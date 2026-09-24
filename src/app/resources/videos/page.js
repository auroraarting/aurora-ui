// MODULES //

// COMPONENTS //

// SECTIONS //
import VideosWrap from "@/sections/resources/videos/VideosWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// SERVICES //
import { getAllVideos } from "@/services/rest/Videos.service";
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

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Videos Page */
export default async function Videos() {
	// The REST services return the nodes and the field group directly.
	const [videos, landing] = await Promise.all([
		getAllVideos(),
		getVideosLandingPage(),
	]);
	const videosLanding = landing || {};
	const data = [...videos].sort(
		(a, b) => new Date(b?.videoFields?.date) - new Date(a?.videoFields?.date),
	);

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
