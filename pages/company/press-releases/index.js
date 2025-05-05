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
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import TopMedia from "@/sections/company/press-releases/TopMedia";
import MediaListing from "@/sections/company/press-releases/MediaListing";
import MediaTeam from "@/sections/company/press-releases/MediaTeam";
import MediaKitInfo from "@/sections/company/press-releases/MediaKitInfo";
import Leaders from "@/sections/company/press-releases/Leaders";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/press-releases/PressReleases.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import {
	getPresses,
	getPressesCards,
	getPressesLanguages,
	getPressPage,
} from "@/services/Press.service";
import { getAllEventCountries } from "@/services/Events.service";

/** Fetch */
export async function getStaticProps() {
	const [data, filters, languages, page] = await Promise.all([
		getPressesCards(),
		getAllEventCountries(),
		getPressesLanguages(),
		getPressPage(),
	]);

	return {
		props: {
			data: data.data.presses.nodes,
			countries: filters.data.countries.nodes,
			products: filters.data.products.nodes,
			softwares: filters.data.softwares.nodes,
			services: filters.data.services.nodes,
			languages: languages.data.languages,
			page: page?.data?.page?.pressLanding,
		},
		revalidate: 10000,
	};
}

/** Press Releases Page */
export default function PressReleases({
	data,
	countries,
	products,
	softwares,
	services,
	languages,
	page,
}) {
	console.log("Press Releases Page", page);
	const [activeTab, setActiveTab] = useState("PressRoom");

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Media Center"}
				Desc={""}
				OgImg={""}
				Url={"/media-center"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.MediaCenterPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle={page?.banner?.title}
						bannerDescription={page?.banner?.desc}
						showContentOnly
					/>
				</div>
				<section className={`${styles.tabMain} pt_60`}>
					<div className={`${styles.category}`}>
						<div className={`${styles.switchBox}`}>
							<div
								className={`${styles.listTxt} ${
									activeTab === "PressRoom" ? styles.active : ""
								}`}
								onClick={() => handleTabClick("PressRoom")}
							>
								<p className="text_xs f_w_m font_primary ">Press Room</p>
							</div>
							<div
								className={`${styles.listTxt} ${
									activeTab === "MediaKit" ? styles.active : ""
								}`}
								onClick={() => handleTabClick("MediaKit")}
							>
								<p className="text_xs f_w_m font_primary ">Media Kit</p>
							</div>
						</div>
					</div>
					{activeTab === "PressRoom" && (
						<div className={`${styles.categoryContent} pt_60`}>
							<div className="pb_40">
								<TopMedia />
							</div>
							<div className="pb_100">
								<MediaListing
									data={data}
									years={Array(new Date().getFullYear() - 2000)
										.fill(null)
										.map((item, ind) => {
											return { title: 2001 + ind };
										})
										.reverse()}
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
									languages={languages}
								/>
							</div>
						</div>
					)}
					{activeTab === "MediaKit" && (
						<div className={`${styles.categoryContent} pt_60`}>
							<div className="pb_100">
								<MediaKitInfo data={page} />
							</div>
							<div className="pb_100">
								<Leaders data={page} />
							</div>
						</div>
					)}
				</section>
				{/* <div className={`${styles.mediaBottomBg} dark_bg ptb_100`}>
					<div className="pb_80">
						<MediaTeam />
					</div>
					<Insights isPowerBgVisible={true} />
					<EventSmarterEnergy />
				</div> */}
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
