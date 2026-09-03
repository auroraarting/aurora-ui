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
import {
	dynamicInsightsBtnProps,
	isCategory,
	OpenIframePopup,
	slugify,
} from "@/utils";

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
import { getPageSeo } from "@/services/rest/Seo.service";

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getInsightsInside(params.slug2);
	const post = data?.data?.postBy;

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data?.data?.postBy || data?.data?.postBy?.status === "draft") {
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

// The `[slug]` segment is a *category*, not the post slug — the same list
// InsightsListing's `optionsData.categoryType` builds its links from, so the two
// must stay in step. `alternate` is the WordPress category name and `title` is
// what the URL uses, which is why the Commentary category lives at /articles/.
const URL_CATEGORIES = [
	{ title: "New Launches", alternate: "New Launches" },
	{ title: "Articles", alternate: "Commentary" },
	{ title: "Case studies", alternate: "Case studies" },
	{ title: "Market reports", alternate: "Market reports" },
	{ title: "Policy Notes", alternate: "Policy Notes" },
	{ title: "Newsletters", alternate: "Newsletters" },
];

/** generateStaticParams  */
export async function generateStaticParams() {
	const data = await getInsights(
		'first: 9999, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}',
	);

	// Both segments are required. Returning only `slug` made Next.js silently
	// prebuild nothing, which is why every insight page used to render on demand.
	// The category segment is derived with the same two helpers the listing links
	// use, so a prebuilt path is always a path something actually links to.
	return (data?.data?.posts?.nodes || [])
		.map((item) => ({
			slug: slugify(
				isCategory(
					// `isCategory` rewrites `title` on the rows it is given, so it gets
					// copies rather than the shared list.
					URL_CATEGORIES.map((category) => ({ ...category })),
					item?.categories?.nodes,
					true,
				),
			),
			slug2: item?.slug,
		}))
		.filter((params) => params.slug && params.slug2);
}

/** Fetch  */
async function getData({ params }) {
	const resourceCat = params.slug === "articles" ? "commentary" : params.slug;
	const [data, list, categoriesForSelect] = await Promise.all([
		await getInsightsInside(params.slug2),
		await getInsights(`first: 9999, where: {categoryName: "${resourceCat}"}`),
		await getInsightsCategories(),
	]);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!data?.data?.postBy || data?.data?.postBy?.status === "draft") {
		notFound(); // shows Next.js 404 page
	}

	const otherList = list?.data?.posts?.nodes?.slice(0, 3) || [];
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
