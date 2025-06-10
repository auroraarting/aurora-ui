"use client";
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
import IframeModal from "@/components/IframeModal";
import Breadcrumbs from "@/components/Breadcrumbs";

// SECTIONS //
import TopEnergy from "@/sections/resources/energy-talks/TopEnergy";
import EnergyListing from "@/sections/resources/energy-talks/EnergyListing";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyTalks.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";
import other_logo from "/public/img/icons/amazon-music-icon.svg";
import googleVoice from "/public/img/energy_talks/google_voice.png";
import spotify from "/public/img/energy_talks/spotify.svg";
import apple from "/public/img/energy_talks/apple.svg";
import google from "/public/img/energy_talks/google.svg";
import calender from "/public/img/icons/calender.svg";

// DATA //

// SERVICES //

/** Energy Page */
export default function EnergyTalksWrap({
	pagination,
	data,
	tags,
	categories,
	countries,
	products,
	softwares,
	services,
	energyTalksPage,
	socialLinks,
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
				{/* <Breadcrumbs /> */}
				<div className={`${styles.gradient} gradient`}>
					<div className={`${styles.topBg}`}>
						<InnerBanner
							bannerTitle={energyTalksPage?.banner?.title}
							bannerDescription={energyTalksPage.banner?.desc}
							showContentOnly
						/>
					</div>
					<div>
						<TopEnergy data={data[0]} />
					</div>
				</div>
				<div className="pt_60 pb_100">
					<EnergyListing
						data={data}
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
							videoThumbnail={
								energyTalksPage?.video?.videoThumbnail?.node?.mediaItemUrl
							}
							iframe={energyTalksPage?.video?.iframe}
						/>
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							formSectionTitle="Subscribe to our podcast on your favourite streaming platform and never miss an episode!"
							customHtml={
								<div className={`${styles.downloadListen} downloadListen`}>
									<div className={`${styles.downloadBox} downloadBox f_r_a_center`}>
										{socialLinks?.map((item) => {
											return (
												<a key={item.url} href={item.url} target="_blank" rel="noreferrer">
													<img
														src={item?.logo?.node?.mediaItemUrl}
														alt={item?.logo?.node?.altText}
													/>
												</a>
											);
										})}
									</div>
								</div>
							}
						/>
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards
						dynamicData={[
							{
								desc: "Expert-led sessions on industry-defining topics",
								btnText: "View all Webinar",
								btnLink: "/resources/webinar",
								img: "/img/contact/cardImg6.jpg",
								fontColor: "color_black",
							},
							{
								desc: "Expert analysis and case studies on energy markets",
								btnText: "View all Resources",
								btnLink: "/resources/aurora-insights",
								img: "/img/contact/cardImg5.jpg",
								fontColor: "color_white",
							},
							{
								desc: "Join events shaping the future of energy",
								btnText: "View all events",
								btnLink: "/events",
								fontColor: "color_white",
								img: "/img/contact/cardImg4.jpg",
							},
						]}
					/>
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
