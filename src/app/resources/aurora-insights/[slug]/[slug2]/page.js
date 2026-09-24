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
// The post data comes from GraphQL, which answers this page in two requests
// where REST needed nineteen — the relation fan-out (authors, speakers,
// powered-by, testimonials, terms, media) is inline in one query rather than a
// batched call each. Both go through GraphqlDirect, so they are cached, tagged
// GETs and still reachable by /api/revalidate.
//
// getCountryList stays on REST: one cheap tagged call, where the GraphQL
// equivalent (getInsightsCategories) fetched six option lists to produce it.
// insightTeaserCategories is the shared category list, kept as the single
// source of truth for which six categories the teasers cover.
import { getInsights, getInsightsInside } from "@/services/Insights.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import { insightTeaserCategories } from "@/services/rest/Insights.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const meta = await getInsightsInside(params.slug2);
	const post = meta?.data?.postBy;

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
	// The GraphQL service takes the query's argument string rather than an
	// options object; the cap and the category list are the same either way.
	const insights = await getInsights(
		`first: 5, where: {categoryName: "${insightTeaserCategories.join(",")}"}`,
	);
	return (insights?.data?.posts?.nodes || []).map((item) => ({
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
	const [inside, list, countries] = await Promise.all([
		getInsightsInside(params.slug2),
		// Three, not the `first: 9999` this query used to ask for before slicing
		// to three in JavaScript.
		getInsights(`first: 3, where: {categoryName: "${resourceCat}"}`),
		getCountryList(),
	]);

	const data = inside?.data?.postBy;
	const otherList = list?.data?.posts?.nodes || [];

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
