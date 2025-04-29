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
import Modal, { openModal } from "@/components/Modal";

// SECTIONS //
import WebinarInsideTopSection from "@/sections/resources/webinar/WebinarInsideTopSection";
import WebinarMiddleDescription from "@/sections/resources/webinar/WebinarMiddleDescription";
import WebinarMiddleRight from "@/sections/resources/webinar/WebinarMiddleRight";
import WebinarRecording from "@/sections/resources/webinar/WebinarRecording";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { OpenIframePopup } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/webinar/WebinarInside.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import IframeModal from "@/components/IframeModal";

/** Fetch  */
export async function getServerSideProps({ params }) {
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
export default function WebinarInside({ data, countries, otherList }) {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default
	const isUpcoming = !data?.categories?.nodes?.some(
		(item) => item.slug === "webinar-recording"
	);

	/** scrollToSection */
	const scrollToSection = (id) => {
		scroller.scrollTo(id, {
			duration: 500,
			smooth: true,
			offset: -100,
			spy: true,
			onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});

		setTimeout(() => {
			setIsFormVisible(true);
			console.log("Scrolling finished!");
		}, 500);
	};

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
						<div
							key="btn"
							to="Insights"
							onClick={() => {
								// scrollToSection("Insights");
								if (isUpcoming) {
									OpenIframePopup("iframePopup", data?.webinarIntelligenceDeck);
								} else {
									window.open(data?.registerLink, "_blank", "noopener,noreferrer");
								}
							}}
						>
							<Button color="primary" variant="filled" shape="rounded">
								{isUpcoming ? "Register" : "Intelligence Deck"}
							</Button>
						</div>
					}
				/>
				<section className={`${styles.mediaMiddle} pt_80`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								{/* <WebinarMiddleDescription /> */}
								<ContentFromCms>{data?.content}</ContentFromCms>
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
						formSectionTitle="Lorem ipsum dolor sit amet consectetur."
						formSectionDesc='Please contact Duncan Young <a href="mailto:duncan.young@auroraer.com">duncan.young@auroraer.com</a>  for any queries.'
						formSectionBtnText={isUpcoming ? "Register" : "Intelligence Deck"}
						insightsTitle="More from Aurora"
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formdata={() => {
							if (isUpcoming) {
								OpenIframePopup("iframePopup", data?.webinarIntelligenceDeck);
							} else {
								window.open(data?.registerLink, "_blank", "noopener,noreferrer");
							}
						}}
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
