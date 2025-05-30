"use client";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import Script from "next/script";
import IframeModal from "@/components/IframeModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //
import EnergyInsideTopSection from "@/sections/resources/energy-talks/EnergyInsideTopSection";
import EnergyMiddleDescription from "@/sections/resources/energy-talks/EnergyMiddleDescription";
import EnergyMiddleRight from "@/sections/resources/energy-talks/EnergyMiddleRight";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyInside.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";
import other_logo from "/public/img/icons/amazon-music-icon.svg";
import googleVoice from "/public/img/energy_talks/google_voice.png";
import spotify from "/public/img/energy_talks/spotify.svg";
import apple from "/public/img/energy_talks/apple.svg";
import google from "/public/img/energy_talks/google.svg";
import calender from "/public/img/icons/calender.svg";

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import { getPodcastInside, getPodcasts } from "@/services/Podcast.service";
import Breadcrumbs from "@/components/Breadcrumbs";

// DATA //

/** EnergyInside Page */
export default function EnergyTalkInsideWrap({
	data,
	events,
	countries,
	otherList,
	socialLinks,
}) {
	const dataForBtn = { postFields: data.podcastFields || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/energy-talks/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EnergyInsidePage}>
				{/* <Breadcrumbs /> */}
				<div className="pt_50 pb_40">
					<EnergyInsideTopSection data={data} socialLinks={socialLinks} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
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
								{data?.podcastFields?.podcast && (
									<ContentFromCms>{data?.podcastFields?.podcast}</ContentFromCms>
								)}
								{/* <EnergyMiddleDescription /> */}
								{data?.content && (
									<section id="overview" data-name="Overview">
										<ContentFromCms>{data?.content}</ContentFromCms>
									</section>
								)}
								{data?.podcastFields?.sections?.map((item) => {
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
												{item?.buttons?.map((btnItem) => {
													const dataForBtn = {
														postFields: { btnItem: btnItem } || {},
													};

													return (
														<div
															{...dynamicInsightsBtnProps(dataForBtn, "btnItem")}
															key="btn"
															to="Insights"
															className="cmsbuttons"
														>
															<Button color="primary" variant="filled" shape="rounded">
																{dynamicInsightsBtnProps(dataForBtn, "btnItem").btntext}
															</Button>
														</div>
													);
												})}
											</div>
										</section>
									);
								})}
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<EnergyMiddleRight data={data} events={events} />
							</div>
						</div>
					</div>
				</section>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formSectionTitle="Subscribe to our podcast on your favourite streaming platform and never miss an episode!"
						insightsTitle="Previous Podcast"
						insightsLink="/resources/energy-talks/"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
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
						allTag="Energy Talks"
					/>
				</div>
				<IframeModal />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
