/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import EnergyTalksWrap from "@/sections/resources/energy-talks/EnergyTalksWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import {
	getEnergyTalksPage,
	getEnergyTalksPageSocialLinks,
} from "@/services/rest/EnergyTalks.service";
import { getPodcasts } from "@/services/Podcast.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "energy-talks-listing" });
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/resources/energy-unplugged", // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** Fetch getStaticProps */
async function getData() {
	const [data, categoriesForSelect, energyTalksPage, socialLinksFetch] =
		await Promise.all([
			getPodcasts(),
			getInsightsCategories(),
			getEnergyTalksPage(),
			getEnergyTalksPageSocialLinks(),
		]);

	return {
		props: {
			pagination: data.data?.posts?.pageInfo || {},
			data:
				data?.data?.podcasts?.nodes?.sort(
					(a, b) =>
						new Date(b?.podcastFields.date) - new Date(a?.podcastFields.date),
				) || [],
			tags: categoriesForSelect.data.tags.nodes,
			categories: categoriesForSelect.data.categories.nodes,
			countries: categoriesForSelect.data.countries.nodes,
			products: categoriesForSelect.data.products.nodes,
			softwares: categoriesForSelect.data.softwares.nodes,
			services: categoriesForSelect.data.services.nodes,
			energyTalksPage: energyTalksPage.data.page.energyTalksListing,
			socialLinks: socialLinksFetch.data.page.energyTalksListing?.socialLinks,
		},
	};
}

/** Energy Page */
export default async function EnergyTalks() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Energy Unplugged"}
				Desc={""}
				OgImg={""}
				Url={"/energy-unplugged"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EnergyTalksWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
