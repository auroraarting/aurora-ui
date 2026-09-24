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
import { getEnergyTalksPageSocialLinks } from "@/services/rest/EnergyTalks.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";
// The episode data comes from GraphQL, which answers this page in far fewer
// requests than REST's relation fan-out (country, speakers, powered-by,
// testimonials and the featured-image alt each cost a batched call there).
// Both go through GraphqlDirect, so they are cached, tagged GETs.
import { getPodcastInside, getPodcasts } from "@/services/Podcast.service";
// SEO from GraphQL. Same signature and same `{ status, seo }` shape as the
// REST service, so this is an import swap; the endpoint and slug still
// become the cache tag (pages/faq -> page:faq).
import { getPageSeo } from "@/services/Seo.service";

// DATA //

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("podcast", params?.slug);
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
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
	// getPodcasts was called twice here for `events` and `list` — the same
	// list, so it is fetched once. getInsightsCategories fetched six option
	// lists for the `countries` value alone; getCountryList is the one call,
	// and the getInsights/getInsightsInside imports were never used.
	const [inside, all, countries, social] = await Promise.all([
		getPodcastInside(slug),
		getPodcasts(),
		getCountryList(),
		getEnergyTalksPageSocialLinks(),
	]);

	// GraphQL returns its envelope; the REST services above do not.
	const data = inside?.data?.podcastBy;
	const episodes = all?.data?.podcasts?.nodes || [];

	const otherList = episodes
		?.filter(
			(item) =>
				item?.slug !== data?.slug &&
				new Date(item?.podcastFields?.date) <
					new Date(data?.podcastFields?.date), // published before now
		)
		?.sort(
			(a, b) =>
				new Date(b?.podcastFields?.date) - new Date(a?.podcastFields?.date),
		)
		?.slice(0, 3);

	return {
		props: {
			data,
			events:
				episodes
					?.filter((item) => item?.slug !== data?.slug)
					?.sort(
						(a, b) =>
							new Date(b?.podcastFields?.date) - new Date(a?.podcastFields?.date),
					)
					.slice(0, 1) || [],
			countries,
			otherList: otherList?.map((item) => {
				return {
					...item,
					title: formatTitleForEpisode(item?.title),
					customHtmlForTitle: true,
				};
			}),
			socialLinks: social?.socialLinks,
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	// Only the first few are prerendered: the build calls these one at a time
	// through the p-limit queue, and Pressable throttles. Every other slug is
	// rendered on first request and cached from then on (dynamicParams defaults
	// to true here), so nothing is unreachable.
	// The GraphQL service takes the query's argument string, not an options
	// object; `first: 5` is the same cap either way.
	const podcasts =
		(await getPodcasts("first: 5"))?.data?.podcasts?.nodes || [];
	return podcasts.map((item) => ({
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
				Url={`https://auroraer.com/energy-unplugged/${data?.slug}`}
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
