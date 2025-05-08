// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import SoftwareCards from "@/components/SoftwareCards";
import AllVideos from "@/components/AllVideos";

// SECTIONS //
import TopEnergy from "@/sections/resources/energy-talks/TopEnergy";
import EnergyListing from "@/sections/resources/energy-talks/EnergyListing";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyTalks.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getEnergyTalksPage } from "@/services/EnergyTalks.service";
import IframeModal from "@/components/IframeModal";
import { getPodcasts } from "@/services/Podcast.service";

/** Fetch getStaticProps */
export async function getServerSideProps() {
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
export default function EnergyTalks({
	pagination,
	data,
	tags,
	categories,
	countries,
	products,
	softwares,
	services,
	energyTalksPage,
}) {
	const [original, setOriginal] = useState(data);

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Energy Talks"}
				Desc={""}
				OgImg={""}
				Url={"/energy-talks"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EnergyPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle={energyTalksPage?.banner?.title}
						bannerDescription={energyTalksPage.banner?.desc}
						showContentOnly
					/>
				</div>
				<div>
					<TopEnergy data={data?.[0]} />
				</div>
				<div className="pt_60 pb_100">
					<EnergyListing
						data={data?.slice(1, data.length)}
						pagination={pagination}
						countries={countries}
						products={products}
						softwares={softwares}
						services={services}
						setOriginal={setOriginal}
						original={original}
						productService={[
							{
								category: "Product",
								options: products?.map((item) => item.title),
							},
							{
								category: "Software",
								options: softwares?.map((item) => item.title),
							},
							{
								category: "Service",
								options: services?.map((item) => item.title),
							},
						]}
					/>
				</div>
				{energyTalksPage?.video?.sectionTitle && (
					<div className="pb_100">
						<AllVideos
							title={energyTalksPage?.video?.sectionTitle}
							desc={energyTalksPage?.video?.sectionDesc}
							redirectLink={energyTalksPage?.video?.redirectLink}
							videoLink={energyTalksPage?.video?.videoLink}
							videoThumbnail={energyTalksPage?.video?.videoThumbnail?.node?.sourceUrl}
						/>
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
