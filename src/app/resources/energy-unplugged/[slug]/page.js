// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import Script from "next/script";
import { notFound } from "next/navigation";

// SECTIONS //
import EnergyTalkInsideWrap from "@/sections/resources/energy-talks/EnergyTalkInsideWrap";

// PLUGINS //

// UTILS //
import {
	dynamicInsightsBtnProps,
	formatTitleForEpisode,
	slugify,
} from "@/utils";

// STYLES //

// IMAGES //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import { getPodcastInside, getPodcasts } from "@/services/Podcast.service";
import { getEnergyTalksPageSocialLinks } from "@/services/EnergyTalks.service";
import { getPageSeo } from "@/services/Seo.service";

// DATA //

export const revalidate = 30; // Revalidates every 60 seconds

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const meta = await getPageSeo(`podcastBy(slug: "${params?.slug}")`);
	const seo = meta?.data?.podcastBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		alternates: {
			canonical: `https://auroraer.com/resources/energy-unplugged/${params.slug}`, // 👈 canonical URL
		},
		openGraph: {
			title: seo?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						seo?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: seo?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ slug }) {
	const [data, events, categoriesForSelect, list, socialLinksFetch] =
		await Promise.all([
			getPodcastInside(slug),
			getPodcasts(),
			getInsightsCategories(),
			getPodcasts(),
			getEnergyTalksPageSocialLinks(),
		]);

	const otherList = list?.data?.podcasts?.nodes
		?.filter(
			(item) =>
				item?.slug !== data?.data?.podcastBy?.slug &&
				new Date(item?.podcastFields?.date) <
					new Date(data.data.podcastBy.podcastFields.date) // published before now
		)
		?.sort(
			(a, b) => new Date(b?.podcastFields?.date) - new Date(a?.podcastFields?.date)
		)
		?.slice(0, 3);

	return {
		props: {
			data: data.data.podcastBy,
			events:
				events?.data?.podcasts?.nodes
					?.filter((item) => item?.slug !== data?.data?.podcastBy?.slug)
					?.sort(
						(a, b) =>
							new Date(b?.podcastFields?.date) - new Date(a?.podcastFields?.date)
					)
					.slice(0, 1) || [],
			countries: categoriesForSelect.data.countries.nodes,
			otherList: otherList?.map((item) => {
				return {
					...item,
					title: formatTitleForEpisode(item?.title),
					customHtmlForTitle: true,
				};
			}),
			socialLinks: socialLinksFetch.data.page.energyTalksListing?.socialLinks,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const podcasts = await getPodcasts();
	return podcasts?.data?.podcasts?.nodes.map((item) => ({
		slug: item.slug,
	}));
}

/** EnergyInside Page */
export default async function EnergyInside({ params }) {
	const { slug } = await params;
	const { props } = await getData({ slug });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/energy-unplugged/${data?.slug}`}
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
			<EnergyTalkInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
