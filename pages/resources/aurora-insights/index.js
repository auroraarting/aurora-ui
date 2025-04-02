// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";

// SECTIONS //
import InsightsTop from "@/sections/resources/aurora-insights/InsightsTop";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/AuroraInsights.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** AuroraInsights Page */
export default function AuroraInsights() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Aurora Insights"}
				Desc={""}
				OgImg={""}
				Url={"/aurora-insights"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AuroraInsightsPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="Lorem ipsum dolor sit amet consectetur."
						bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
						showContentOnly
					/>
				</div>
				<div>
					<InsightsTop />
				</div>
				{/* <div className="pt_60 pb_100">
					<EnergyListing />
				</div> */}
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
