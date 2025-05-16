// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getWebinarInside(params.slug);
	const post = data?.data?.webinar;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ params }) {
	const [data, categoriesForSelect, list] = await Promise.all([
		getWebinarInside(params.slug),
		getInsightsCategories(),
		getWebinars("first: 4"),
	]);
	const pastWebinars = [];
	const otherList = list?.data?.webinars?.nodes;
	otherList?.map((item) => {
		let categories = item?.eventCategories?.nodes;

		item?.webinarsFields?.country?.nodes?.map((item) => {
			categories.push({ ...item, name: item.title });
		});
		const tempObj = {
			title: item?.title,
			slug: item?.slug,
			date: item?.webinarsFields?.startDateAndTime,
			featuredImage: item?.featuredImage,
			categories: {
				nodes: categories,
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: item?.webinarTags,
		};

		if (item?.slug != params.slug) pastWebinars.push(tempObj);
	});

	return {
		props: {
			data: data.data.webinar,
			countries: categoriesForSelect.data.countries.nodes,
			otherList,
			pastWebinars,
		},
	};
}

/** WebinarInside Page */
export default async function WebinarInside({ params }) {
	const { props } = await getData({ params });
	const { data, countries, otherList, pastWebinars } = props;
	const dataForBtn = { postFields: data.webinarsFields || {} };

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
				<div className={`${styles.topBg}  pb_60`}>
					{/* <Breadcrumbs /> */}
					<WebinarInsideTopSection data={data} countries={countries} />
				</div>
				<SectionsHeader
					// hideall={true}
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_80`}>
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
											<div className="cmsButtonsWrap">
												{item?.buttons?.map((btnItem) => {
													const dataForBtn = {
														postFields: { btnItem: btnItem } || {},
													};
													console.log(
														dynamicInsightsBtnProps(dataForBtn, "btnItem"),
														"dataForBtn"
													);

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
								{/* {!isUpcoming && ( */}
								<div className="pt_60">
									<WebinarRecording data={data} />
								</div>
								{/* )} */}
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<WebinarMiddleRight data={data} />
							</div>
						</div>
					</div>
				</section>
				<div className="ptb_100">
					<Insights
						isPowerBgVisible={true}
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
					/>
					{/* <Insights
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
						allTag="Energy Talks"
					/> */}
				</div>

				<IframeModal />
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
