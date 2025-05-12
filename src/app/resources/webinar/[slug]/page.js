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

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getInsightsInside(params.slug);
	const post = data?.data?.postBy;

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
		getInsightsInside(params.slug),
		getInsightsCategories(),
		getInsights(
			'first: 3, where: {categoryName: "public-webinar,webinar,webinar-recording"}'
		),
	]);
	const otherList = list?.data?.posts?.nodes;

	return {
		props: {
			data: data.data.postBy,
			countries: categoriesForSelect.data.countries.nodes,
			otherList,
		},
	};
}

/** WebinarInside Page */
export default async function WebinarInside({ params }) {
	const { props } = await getData({ params });
	const { data, countries, otherList } = props;
	const isUpcoming = !data?.categories?.nodes?.some(
		(item) => item.slug === "webinar-recording"
	);

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
				<div className={`${styles.topBg} pt_100 pb_60`}>
					<WebinarInsideTopSection
						data={data}
						countries={countries}
						isUpcoming={isUpcoming}
					/>
				</div>
				<SectionsHeader
					hideall={true}
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
								{data?.postFields?.sections?.map((item) => {
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
								{!isUpcoming && (
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
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formSectionTitle="Lorem ipsum dolor sit amet consectetur."
						formSectionDesc='Please contact Duncan Young <a href="mailto:duncan.young@auroraer.com">duncan.young@auroraer.com</a>  for any queries.'
						formSectionBtnText={
							dynamicInsightsBtnProps(data, "insightsSectionButton").btntext
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
					/>
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
