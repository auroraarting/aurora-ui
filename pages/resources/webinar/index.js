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
import WebinarListing from "@/sections/resources/webinar/WebinarListing";
import PastSpeakers from "@/sections/resources/webinar/PastSpeakers";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/webinar/Webinar.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** Webinar Page */
export default function WebinarTalks() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Webinar"} Desc={""} OgImg={""} Url={"/webinar"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.WebinarPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="Lorem ipsum dolor sit amet consectetur."
						bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
						showContentOnly
					/>
				</div>
				<div>
					<WebinarListing />
				</div>
				<div className="ptb_100">
					<PastSpeakers />
				</div>
				<div className="pb_100">
					<AllVideos />
				</div>
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
