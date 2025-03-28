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
import TopEnergy from "@/sections/resources/energy-talks/TopEnergy";
import EnergyListing from "@/sections/resources/energy-talks/EnergyListing";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyTalks.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** events Page */
export default function EnergyTalks() {
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
						bannerTitle="Lorem ipsum dolor sit amet consectetur."
						bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
						showContentOnly
					/>
				</div>
				<div>
					<TopEnergy />
				</div>
				<div className="pt_60 pb_100">
					<EnergyListing />
				</div>
				<div className={`${styles.eventBottomBg} dark_bg ptb_100`}>
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
