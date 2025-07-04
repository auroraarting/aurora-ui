"use client";
/* eslint-disable quotes */
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
import PressCoverage from "@/sections/company/press-releases/PressCoverage";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/company/press-releases/PressReleases.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //

/** Press Releases Page */
export default function PressReleasesWrap({
	data,
	countries,
	products,
	softwares,
	services,
	languages,
	page,
	pressCoverage,
}) {
	const [activeTab, setActiveTab] = useState("PressRoom");
	const dataForBtn = {
		postFields: page,
	};

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Media Center"}
				Desc={""}
				OgImg={""}
				Url={"/media-center"}
			/> */}

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
								<p className="text_xs f_w_m font_primary ">Press Releases</p>
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
								<TopMedia data={page?.featured?.nodes} />
							</div>
							<div className="pb_100">
								<MediaListing
									data={data}
									years={Array(new Date().getFullYear() - 2023)
										.fill(null)
										.map((item, ind) => {
											return { title: 2024 + ind };
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
									countries={countries}
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
				{page?.pressCoverage && <PressCoverage data={page?.pressCoverage} />}
				<div className={`${styles.containerCustom} ptb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							formSectionTitle={page?.insights?.sectionTitle}
							formSectionDesc={page?.insights?.sectionDesc}
							formSectionBtnText={
								dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")?.btntext
							}
							insightsTitle="More from Aurora"
							formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
						/>
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			<IframeModal hideLeft />

			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
