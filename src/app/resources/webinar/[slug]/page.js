// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
	getWebinarInside,
	getWebinars,
} from "@/services/rest/Webinar.service";
import Breadcrumbs from "@/components/Breadcrumbs";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	// getWebinarInside now returns the node directly.
	const post = await getWebinarInside(params.slug);

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			alternates: {
				canonical: `https://auroraer.com/resources/webinar/${params.slug}`, // 👈 canonical URL
			},
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

/** generateStaticParams  */
export async function generateStaticParams() {
	const webinars = await getWebinars({ first: 20 });
	return webinars.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	// getInsightsCategories fetched six option lists for the `countries` value
	// alone; getCountryList is the one call, and the getInsights/
	// getInsightsInside imports were never used.
	const [data, countries, otherList] = await Promise.all([
		getWebinarInside(params.slug),
		getCountryList(),
		getWebinars({ first: 4 }),
	]);
	const pastWebinars = [];
	otherList?.map((item) => {
		// Copied, not aliased: this loop appends the countries to the category
		// list, and mutating the array the service returned would corrupt it for
		// every later reader of the same cached response.
		const categories = [...(item?.eventCategories?.nodes || [])];

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
			data,
			countries,
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
				Url={`https://auroraer.com/webinar/${data?.slug}`}
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
