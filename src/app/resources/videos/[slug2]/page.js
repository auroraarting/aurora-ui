// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Script from "next/script";
import { notFound } from "next/navigation";

// SECTIONS //
import VideosInsideWrap from "@/sections/resources/videos/VideosInsideWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/video/video.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import {
	getAllVideos,
	getLatestVideos,
	getVideosInside,
} from "@/services/rest/Videos.service";

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const { slug2 } = params;
	// getVideosInside now returns the node directly. The `status` check below is
	// kept as-is: the GraphQL query never selected `status` either, so it has
	// always been the null check doing the work.
	const post = await getVideosInside(slug2);

	// 🚫 Redirect to 404 if status is DRAFT or data is null
	if (!post || post?.status === "draft") {
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
	const videos = await getAllVideos();
	return videos.map((item) => ({
		slug: item.slug,
	}));
}

/** Fetch  */
async function getData({ slug }) {
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it. getCountryList is the one call. The
	// getEnergyTalksPageSocialLinks import alongside it was never called —
	// socialLinksFetch below is built by hand.
	const [data, latestVideos, countries] = await Promise.all([
		getVideosInside(slug),
		getLatestVideos(slug),
		getCountryList(),
	]);

	// 🚫 Redirect to 404 if data is null
	if (!data) {
		notFound(); // shows Next.js 404 page
	}

	const socialLinksFetch = [
		{
			url:
				data?.videoFields?.youtubeLink ||
				"https://youtube.com/playlist?list=PLVL1WPkN_GwmntaUW4VIKds14K1PGJKgl",
			logo: {
				node: {
					altText: "",
					mediaItemUrl: "/cms-assets/staging/2025/05/youtube-icon.svg",
				},
			},
		},
	];

	return {
		props: {
			data,
			videos: latestVideos?.slice(0, 1) || [],
			countries: countries || [],
			otherList: latestVideos?.slice(0, 3) || [],
			socialLinks: socialLinksFetch,
		},
	};
}

/** VideosInside Page */
export default async function VideosInside({ params }) {
	const { slug2 } = await params;
	const { props } = await getData({ slug: slug2 });

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
			<VideosInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
