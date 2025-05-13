"use client";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import SectionsHeader from "@/components/SectionsHeader";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";
import Script from "next/script";
import IframeModal from "@/components/IframeModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// SECTIONS //
import CaseStudiesTop from "@/sections/resources/aurora-insights/CaseStudiesTop";
import CaseStudiesMiddleDescription from "@/sections/resources/aurora-insights/CaseStudiesMiddleDescription";
import Client from "@/sections/resources/aurora-insights/Client";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, OpenIframePopup, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/Articles.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";

/** Articles Page */
export default async function InsightsInsideWrap({
	data,
	otherList,
	countries,
}) {
	const isArticle = data?.categories?.nodes?.some(
		(item) => item.slug === "commentary"
	);
	const isCaseStudy = data?.categories?.nodes?.some(
		(item) => item.slug === "case-study"
	);
	const isReports = data?.categories?.nodes?.some((item) =>
		item.slug.includes("report")
	);

	/** headerArrayBtnFunc  */
	const headerArrayBtnFunc = () => {
		if (isArticle || isCaseStudy) {
			OpenIframePopup("iframePopup", data?.postFields?.subscribeIframe);
		} else if (isReports) {
			OpenIframePopup("iframePopup", data?.postFields?.redactedReportIframe);
		} else {
			window.open(data?.postFields?.registerLink, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/resources/aurora-insights/${data?.slug}`}
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
			<main className={styles.articlesPage}>
				<div className="pb_60">
					<CaseStudiesTop
						data={data}
						isArticle={isArticle}
						isCaseStudy={isCaseStudy}
						isReports={isReports}
					/>
				</div>
				<SectionsHeader
					// hideall
					customHtml={
						dynamicInsightsBtnProps(data, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(data, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(data, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.CaseStudiesMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.CaseStudiesMiddleFlex} f_j`}>
							<div className={`${styles.CaseStudiesMiddleLeft} dynamic_content`}>
								{/* <CaseStudiesMiddleDescription /> */}
								{data?.content && (
									<section id="overview" data-name="Overview">
										<ContentFromCms>{data?.content}</ContentFromCms>
									</section>
								)}
								{data?.postFields?.sections?.map((item) => {
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
										>
											<ContentFromCms>{item?.content}</ContentFromCms>
											{item?.lottie?.node?.mediaItemUrl && (
												<DotLottieReact
													src={item?.lottie?.node?.mediaItemUrl}
													autoplay={true}
													loop={true}
													renderer="svg"
													renderersettings={{
														preserveAspectRatio: "xMidYMid meet",
													}}
												/>
											)}
										</section>
									);
								})}
							</div>
							<div className={`${styles.CaseStudiesMiddleRight}`}>
								<Client data={data} />
							</div>
						</div>
					</div>
				</section>
				<div className="pb_100">
					<TestimonialFeedback data={data?.postFields} />
				</div>
				<div className="pb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formSectionTitle="Sign up to receive our latest public insights straight to your inbox"
						formSectionDesc="Lorem ipsum dolor sit amet consectetur. Mattis fermentum proin erat pellentesque risus ac. Facilisis ullamcorper."
						formSectionBtnText={
							dynamicInsightsBtnProps(data, "insightsSectionButton").btntext
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
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
