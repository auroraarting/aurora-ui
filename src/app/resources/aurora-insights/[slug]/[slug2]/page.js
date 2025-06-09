// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
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

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getInsightsInside(params.slug2);
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

/** generateStaticParams  */
export async function generateStaticParams() {
	const data = await getInsights(
		'first: 9999, where: {categoryName: "case-studies,commentary,market-reports"}'
	);
	return data?.data?.posts?.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const resourceCat = params.slug === "articles" ? "commentary" : params.slug;
	const [data, list, categoriesForSelect] = await Promise.all([
		await getInsightsInside(params.slug2),
		await getInsights(`first: 3, where: {categoryName: "${resourceCat}"}`),
		await getInsightsCategories(),
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

	/** insights */
	const insights = () => {
		if (params.slug2 === "article") {
			return {
				insights: {
					title: "Energy insights to your inbox",
					desc:
						"Subscribe to get our most recent energy insights delivered straight to your inbox.",
					iframe: "https://go.auroraer.com/mailinglist",
				},
				insightsSectionButton: {
					buttonText: "Subscribe",
					iframe: "https://go.auroraer.com/mailinglist",
				},
			};
		}
	};

	// data?.postFields?.insights?.title

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
			<InsightsInsideWrap {...props} {...insights()} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
