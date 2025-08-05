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
} from "@/services/EnergyTalks.service";
import { getPodcasts } from "@/services/Podcast.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "energy-talks-listing", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

export const revalidate = 30; // Revalidates every 60 seconds

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
					(a, b) => new Date(b.podcastFields.date) - new Date(a.podcastFields.date)
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
