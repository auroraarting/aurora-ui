"use client";
import AllVideos from "@/components/AllVideos";
// MODULES //

// COMPONENTS //
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import VideosListing from "@/sections/resources/videos/VideosListing";
import TopVideo from "@/sections/resources/videos/TopVideo";

// PLUGINS //

// UTILS //

// STYLES //
// import styles from "@/styles/pages/events/events.module.scss";
import styles from "@/styles/pages/resources/videos/Videos.module.scss";

// IMAGES //

// SERVICES //

// DATA //

/** Videos Page */
export default function VideosWrap({
	data,
	topics,
	countries,
	videosLanding,
	socialLinks,
}) {
	return (
		<div>
			{/* Page Content starts here */}
			<main className={styles.eventsPage}>
				<div className={`${styles.gradient} gradient`}>
					<div className={`${styles.topBg}`}>
						<InnerBanner
							bannerTitle={videosLanding?.banner?.title || "Videos"}
							bannerDescription={
								videosLanding?.banner?.desc ||
								"Watch our latest videos on energy markets and insights."
							}
							showContentOnly
						/>
					</div>
					<div>
						<TopVideo data={data[0]} />
					</div>
				</div>
				<div className="pt_60">
					<VideosListing
						data={data}
						topics={topics}
						years={Array(new Date().getFullYear() - 2023)
							.fill(null)
							.map((_, ind) => {
								return { title: 2024 + ind };
							})
							.reverse()}
						countries={countries}
					/>
				</div>

				{videosLanding?.video?.sectionTitle && (
					<div className="ptb_100">
						<AllVideos
							title={videosLanding?.video?.sectionTitle}
							desc={videosLanding?.video?.sectionDesc}
							redirectLink={videosLanding?.video?.redirectLink}
							videoLink={videosLanding?.video?.videoLink}
							videoThumbnail={videosLanding?.video?.videoThumbnail?.node?.mediaItemUrl}
							iframe={videosLanding?.video?.iframe}
						/>
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							formSectionTitle="Stay up to date with Aurora's latest videos and expert insights"
							// isPowerBgVisible={true}
							customHtml={
								<div className={`${styles.downloadListen} downloadListen`}>
									<div className={`${styles.downloadBox} downloadBox f_r_a_center`}>
										{socialLinks?.map((item) => {
											return (
												<a key={item.url} href={item.url} target="_blank" rel="noreferrer">
													<img
														src={item?.logo?.node?.mediaItemUrl}
														alt={item?.logo?.node?.altText}
													/>
												</a>
											);
										})}
									</div>
								</div>
							}
						/>
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards
						dynamicData={[
							{
								desc: "Expert-led sessions on industry-defining topics",
								btnText: "View all webinars",
								btnLink: "/resources/webinar",
								img: "/img/contact/cardImg6.jpg",
								fontColor: "color_black",
							},
							{
								desc: "Expert analysis and case studies on energy markets",
								btnText: "View all resources",
								btnLink: "/resources/aurora-insights",
								img: "/img/contact/cardImg5.jpg",
								fontColor: "color_white",
							},
							{
								desc: "Join events shaping the future of energy",
								btnText: "View all events",
								btnLink: "/events",
								fontColor: "color_white",
								img: "/img/contact/cardImg4.jpg",
							},
						]}
					/>
				</div>
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
