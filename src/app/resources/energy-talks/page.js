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

/** Meta Data */
export const metadata = {
	title: "Energy Talks | Aurora",
	description: "Aurora",
};

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
			data: data?.data?.podcasts?.nodes || [],
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
				Title={"Energy Talks"}
				Desc={""}
				OgImg={""}
				Url={"/energy-talks"}
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
