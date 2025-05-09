/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

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

// SECTIONS //
import EnergyInsideTopSection from "@/sections/resources/energy-talks/EnergyInsideTopSection";
import EnergyMiddleDescription from "@/sections/resources/energy-talks/EnergyMiddleDescription";
import EnergyMiddleRight from "@/sections/resources/energy-talks/EnergyMiddleRight";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyInside.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";
import other_logo from "/public/img/energy_talks/other.png";
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

// DATA //

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, events, categoriesForSelect, list] = await Promise.all([
		getPodcastInside(params.slug),
		getPodcasts("first: 1"),
		getInsightsCategories(),
		getPodcasts("first: 5"),
	]);
	const otherList = list?.data?.podcasts?.nodes;
	return {
		props: {
			data: data.data.podcastBy,
			events:
				events?.data?.podcasts?.nodes?.filter(
					(item) => item?.slug !== data?.data?.podcastBy?.slug
				) || [],
			countries: categoriesForSelect.data.countries.nodes,
			otherList,
		},
	};
}

/** EnergyInside Page */
export default function EnergyInside({ data, events, countries, otherList }) {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default
	const dataForBtn = { postFields: data || {} };

	console.log("data", data);

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/energy-talks/${data?.slug}`}
			/>

			<Script id="show-banner" strategy="afterInteractive">
				{`
    let speechifyWidgetInstance;

    import("https://storage.googleapis.com/speechify-api-cdn/speechifyapi.min.mjs")
      .then(async (speechifyWidget) => {
        const articleRootElement = document.querySelector(".dynamic_content");
        const articleHeading = document.querySelector(".speechify_wrap");

        const widget = speechifyWidget.makeSpeechifyExperience({
          rootElement: articleRootElement,
          inlinePlayerElement: articleHeading,
          visibility: {
            showWidget: false,
            showWidgetOnPlay: false,
          },
        });

        await widget.mount();
        speechifyWidgetInstance = widget;
      });

    // Optional: Expose functions to window for easy button binding
    window.speechifyPlay = function() {
      if (speechifyWidgetInstance) {
        speechifyWidgetInstance.play();
      }
    };
    window.speechifyPause = function() {
      if (speechifyWidgetInstance) {
        speechifyWidgetInstance.pause();
      }
    };
  `}
			</Script>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EnergyInsidePage}>
				<div className="pt_100 pb_40">
					<EnergyInsideTopSection data={data} />
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btnText && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btnText}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_80`}>
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
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formSectionTitle="Subscribe to our podcast on your favourite streaming platform and never miss an episode!"
						insightsTitle="Previous Podcast"
						insightsLink="/resources/energy-talks/"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
						customHtml={
							<div className={`${styles.downloadListen}`}>
								<div className={`${styles.downloadBox} f_r_a_center`}>
									{data?.podcastFields?.spotifyLink && (
										<a href={data?.podcastFields?.spotifyLink}>
											<img src={spotify.src} alt="spotify" />
										</a>
									)}
									{data?.podcastFields?.appleLink && (
										<a href={data?.podcastFields?.appleLink}>
											<img src={apple.src} alt="apple" />
										</a>
									)}
									{data?.podcastFields?.youtubeLink && (
										<a href={data?.podcastFields?.youtubeLink}>
											<img src={google.src} alt="google" />
										</a>
									)}
									{data?.podcastFields?.googleLink && (
										<a href={data?.podcastFields?.googleLink}>
											<img src={googleVoice.src} alt="google" />
										</a>
									)}
									{data?.podcastFields?.otherLink && (
										<a href={data?.podcastFields?.otherLink}>
											<img src={other_logo.src} alt="google" />
										</a>
									)}
								</div>
							</div>
						}
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
