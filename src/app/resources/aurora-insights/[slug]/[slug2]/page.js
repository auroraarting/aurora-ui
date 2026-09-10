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
import styles from "@/styles/pages/resources/aurora-insights/Articles.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import {
	getInsights,
	getInsightsInside,
	insightTeaserCategories,
} from "@/services/rest/Insights.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	// getInsightsInside now returns the node directly.
	const post = await getInsightsInside(params.slug2);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!post || post?.status === "draft") {
		notFound(); // shows Next.js 404 page
	}

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "",
		alternates: {
			canonical: `https://auroraer.com/resources/aurora-insights/${params.slug}/${params.slug2}`, // 👈 canonical URL
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
	// Same 20 insights and the same `{ slug }` shape as before. Note this fills
	// the *first* segment (the category, e.g. "articles") with a post slug and
	// leaves `slug2` unset — pre-existing, and left alone because changing it
	// changes which paths get pre-rendered. Next tolerates the partial params
	// and renders the rest on demand.
	const insights = await getInsights({
		first: 20,
		categories: insightTeaserCategories,
	});
	return insights.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ params }) {
	const resourceCat = params.slug === "articles" ? "commentary" : params.slug;
	// The teaser only ever showed the first three, so it asks for three rather
	// than paginating the whole category and slicing. getInsightsCategories
	// fetched six option lists for the `countries` value alone; getCountryList
	// is the one call.
	const [data, otherList, countries] = await Promise.all([
		getInsightsInside(params.slug2),
		getInsights({ first: 3, categories: [resourceCat] }),
		getCountryList(),
	]);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data || data?.status === "draft") {
		notFound(); // shows Next.js 404 page
	}

	return {
		props: {
			data: data || [],
			otherList,
			countries,
		},
	};
}

/** Articles Page */
export default async function Articles({ params }) {
	const { slug2, slug } = await params;
	const { props } = await getData({ params });

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
			insights: props.data.postFields.insights,
			insightsSectionButton: props.data.postFields.insightsSectionButton,
		};
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
