// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Script from "next/script";

// SECTIONS //
import InsightsInsideWrap from "@/sections/resources/aurora-insights/InsightsInsideWrap";

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
	const [data, list, categoriesForSelect] = await Promise.all([
		getInsightsInside(params.slug),
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getInsightsCategories(),
	]);

	const otherList = list?.data?.posts?.nodes || [];
	const countries = categoriesForSelect?.data?.countries?.nodes || [];
	return {
		props: {
			data: data?.data?.postBy || [],
			otherList,
			countries,
		},
	};
}

/** Articles Page */
export default async function Articles({ params }) {
	const { props } = await getData({ params });

	return (
		<div>
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
			<InsightsInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
