"use client";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import Script from "next/script";
import IframeModal from "@/components/IframeModal";
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //
import WebinarInsideTopSection from "@/sections/resources/webinar/WebinarInsideTopSection";
import WebinarMiddleRight from "@/sections/resources/webinar/WebinarMiddleRight";
import WebinarRecording from "@/sections/resources/webinar/WebinarRecording";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/webinar/WebinarInside.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getWebinarInside, getWebinars } from "@/services/Webinar.service";
import Breadcrumbs from "@/components/Breadcrumbs";

/** WebinarInside Page */
export default function WebinarInsideWrap({
	data,
	countries,
	otherList,
	pastWebinars,
}) {
	const dataForBtn = { postFields: data?.webinarsFields || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/webinar/${data?.slug}`}
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
			<main className={styles.WebinarInsidePage}>
				<div className={`${styles.topBg}  ptb_60`}>
					{/* <Breadcrumbs /> */}
					<WebinarInsideTopSection data={data} countries={countries} />
				</div>
				<SectionsHeader
					// hideall={true}
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
							<a
								{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
								</Button>
							</a>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_40`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								{/* <WebinarMiddleDescription /> */}
								{data?.content && (
									<section id="overview" data-name="Overview">
										<ContentFromCms>{data?.content}</ContentFromCms>
									</section>
								)}
								{data?.webinarsFields?.sections?.map((item) => {
									return (
										<section
											key={item?.tabTitle}
											id={slugify(item?.tabTitle)}
											data-name={item?.tabTitle}
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

								{dynamicInsightsBtnProps(dataForBtn, "accessRecordingSectionButton")
									?.btntext && (
									<div className="pt_60">
										<WebinarRecording data={data} />
									</div>
								)}
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<WebinarMiddleRight data={data} />
							</div>
						</div>
					</div>
				</section>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={
							data?.webinarsFields?.insights?.sectionTitle ? true : false
						}
						isInsightsBlogsVisible={true}
						defaultList={pastWebinars}
						countries={countries}
						formSectionTitle={data?.webinarsFields?.insights?.sectionTitle}
						formSectionDesc={data?.webinarsFields?.insights?.sectionDesc}
						insightsLink="/resources/webinar/"
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
						allTag="Webinar"
					/>
				</div>

				<IframeModal hideLeft />
			</main>

			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
