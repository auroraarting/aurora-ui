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

// SECTIONS //
import TopMedia from "@/sections/media-center/TopMedia";
import MediaListing from "@/sections/media-center/MediaListing";
import MediaTeam from "@/sections/media-center/MediaTeam";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/media-center/MediaCenter.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** MediaCenter Page */
export default function MediaCenter() {
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
						bannerTitle="latest press releases & media contacts"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
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
							<div>
								<MediaListing />
							</div>
						</div>
					)}
					{activeTab === "MediaKit" && (
						<div className={`${styles.categoryContent}`}>fgfhgfd</div>
					)}
				</section>
				<div className={`${styles.mediaBottomBg} dark_bg ptb_100`}>
					<div className="pb_80">
						<MediaTeam />
					</div>
					<Insights isPowerBgVisible={true} />
					<EventSmarterEnergy />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
