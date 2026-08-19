"use client";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import IframeModal from "@/components/IframeModal";
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //
import VideosInsideTopSection from "@/sections/resources/videos/VideosInsideTopSection";
import VideosMiddleRight from "@/sections/resources/videos/VideosMiddleRight";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/videos/VideosInside.module.scss";

// IMAGES //

// SERVICES //

// DATA //

/** VideosInside Page */
export default function VideosInsideWrap({
	data,
	videos,
	countries,
	otherList,
	socialLinks,
}) {
	const dataForBtn = { postFields: data?.videoFields || {} };

	return (
		<div>
			{/* Page Content starts here */}
			<main className={styles.VideosInsidePage}>
				<div className="pt_50 pb_40">
					<VideosInsideTopSection data={data} socialLinks={socialLinks} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_40`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								{data?.videoFields?.podcast && (
									<div className={`${styles.video}`}>
										<ContentFromCms>{data?.videoFields?.podcast}</ContentFromCms>
									</div>
								)}
								{data?.content && (
									<section id="overview" data-name="Overview">
										<ContentFromCms>{data?.content}</ContentFromCms>
									</section>
								)}
								{data?.videoFields?.sectionsCopy?.map((item) => {
									const dataForBtn = {
										postFields: { btnItem: item?.button2 } || {},
									};
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
										>
											<ContentFromCms>{item?.content}</ContentFromCms>
											{item?.lottie?.node?.mediaItemUrl && (
												<LottieRenderer
													src={item?.lottie?.node?.mediaItemUrl}
													autoplay={true}
													loop={true}
													renderer="svg"
													renderersettings={{
														preserveAspectRatio: "xMidYMid meet",
													}}
												/>
											)}
											<div className="cmsButtonsWrap">
												<div
													{...dynamicInsightsBtnProps(dataForBtn, "btnItem")}
													key="btn"
													to="Insights"
													className="cmsbuttons pt_20"
												>
													<Button color="primary" variant="filled" shape="rounded">
														{dynamicInsightsBtnProps(dataForBtn, "btnItem").btntext}
													</Button>
												</div>
											</div>
										</section>
									);
								})}
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<VideosMiddleRight data={data} videos={videos} />
							</div>
						</div>
					</div>
				</section>
				<div className="ptb_100">
					<Insights
						// isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						// formSectionTitle="Watch our latest videos and never miss an update from Aurora!"
						insightsTitle="Previous Videos"
						insightsLink="/resources/videos/"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
						// customHtml={
						// 	<div className={`${styles.downloadListen} downloadListen`}>
						// 		<div className={`${styles.downloadBox} downloadBox f_r_a_center`}>
						// 			{socialLinks?.map((item) => {
						// 				return (
						// 					<a key={item.url} href={item.url} target="_blank" rel="noreferrer">
						// 						<img
						// 							src={item?.logo?.node?.mediaItemUrl}
						// 							alt={item?.logo?.node?.altText}
						// 						/>
						// 					</a>
						// 				);
						// 			})}
						// 		</div>
						// 	</div>
						// }
						allTag="Video"
					/>
				</div>
				<IframeModal />
			</main>
			{/* Page Content ends here */}
		</div>
	);
}
