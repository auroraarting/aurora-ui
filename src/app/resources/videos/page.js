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

// DATA //

/** Meta Data */
export const metadata = {
	title: "Videos | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/resources/videos",
	},
};

export const revalidate = 3600; // Revalidates every 1 hour

/** Videos Page */
export default async function Videos() {
	const [dataFetch, landingFetch] = await Promise.all([
		getAllVideos(),
		getVideosLandingPage(),
	]);
	const videosLanding = landingFetch?.data?.page?.videosLanding || {};
	console.log(videosLanding, "videosLanding");
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

	return (
		<div>
			<VideosWrap
				data={data}
				topics={topics}
				countries={countries}
				videosLanding={videosLanding}
			/>
		</div>
	);
}
