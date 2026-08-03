// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Script from "next/script";
import { notFound } from "next/navigation";

// SECTIONS //
import InsightsInsideWrap from "@/sections/resources/aurora-insights/InsightsInsideWrap";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, OpenIframePopup, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/video/video.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";
import { getAllVideos, getVideosInside } from "@/services/Videos.service";

export const revalidate = 3600; // Revalidates every 1 hour

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const { slug2 } = params;
	const data = await getVideosInside(slug2);
	const post = data?.data?.videoBy;

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data?.data?.videoBy || data?.data?.videoBy?.status === "draft") {
		notFound(); // shows Next.js 404 page
	}

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "",
		alternates: {
			canonical: `https://auroraer.com/resources/videos/${params.slug2}`, // 👈 canonical URL
		},
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
	const data = await getAllVideos();
	return data?.data?.videos?.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const resourceCat = params.slug === "articles" ? "commentary" : params.slug;
	const [data, list, categoriesForSelect] = await Promise.all([
		await getVideosInside(params.slug2),
		await getInsights(`first: 9999, where: {categoryName: "${resourceCat}"}`),
		await getInsightsCategories(),
	]);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data?.data?.videoBy || data?.data?.videoBy?.status === "draft") {
		notFound(); // shows Next.js 404 page
	}

	const otherList = list?.data?.posts?.nodes?.slice(0, 3) || [];
	const countries = categoriesForSelect?.data?.countries?.nodes || [];
	return {
		props: {
			data: data?.data?.videoBy || [],
			otherList,
			countries,
		},
	};
}

/** Articles Page */
export default async function Articles({ params }) {
	const { props } = await getData({ params });
	console.log(props, "props");

	/** insights */
	const insights = () => {
		if (params.slug === "article" || params.slug === "articles") {
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
		return {
			insights: props.data.videoFields.insights,
			insightsSectionButton: props.data.videoFields.insightsSectionButton,
		};
	};

	// data?.videoFields?.insights?.title

	return (
		<div className={styles.page}>
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
			<InsightsInsideWrap {...props} {...insights()} keyName="videoFields" />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
