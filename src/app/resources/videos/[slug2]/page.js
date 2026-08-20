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
import { getInsightsCategories } from "@/services/Insights.service";
import {
	getAllVideos,
	getPreviousVideos,
	getVideosInside,
} from "@/services/Videos.service";
import { getEnergyTalksPageSocialLinks } from "@/services/EnergyTalks.service";

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
async function getData({ slug }) {
	const [data, previousVideos, categoriesForSelect] = await Promise.all([
		getVideosInside(slug),
		getPreviousVideos(slug),
		getInsightsCategories(),
	]);

	// 🚫 Redirect to 404 if data is null
	if (!data?.data?.videoBy) {
		notFound(); // shows Next.js 404 page
	}

	const socialLinksFetch = [
		{
			url:
				data?.data?.videoBy?.videoFields?.youtubeLink ||
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
			data: data?.data?.videoBy,
			videos: previousVideos?.slice(0, 1) || [],
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			otherList: previousVideos?.slice(0, 3) || [],
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
