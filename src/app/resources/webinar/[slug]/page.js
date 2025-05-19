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
import WebinarInsideWrap from "@/sections/resources/webinar/WebinarInsideWrap";

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
	console.log(data, "data");
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
			pastWebinars: pastWebinars.slice(0, 3),
		},
	};
}

/** WebinarInside Page */
export default async function WebinarInside({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/webinar/${data?.slug}`}
			/> */}

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
			<WebinarInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
