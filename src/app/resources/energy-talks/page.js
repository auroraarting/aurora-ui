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
import { getEnergyTalksPage } from "@/services/EnergyTalks.service";
import { getPodcasts } from "@/services/Podcast.service";

/** Fetch getStaticProps */
async function getData() {
	const [data, categoriesForSelect, energyTalksPage] = await Promise.all([
		getPodcasts(),
		getInsightsCategories(),
		getEnergyTalksPage(),
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
