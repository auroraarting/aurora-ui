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

// SECTIONS //
import TopEvents from "@/sections/events/TopEvents";
import EventsListing from "@/sections/events/EventsListing";
import Speakers from "@/sections/events/Speakers";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/events.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** events Page */
export default function events() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Events"} Desc={""} OgImg={""} Url={"/events"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.eventsPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="Lorem ipsum dolor sit amet consectetur."
						bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
						showContentOnly
					/>
				</div>
				<div>
					<TopEvents />
				</div>
				<div className="pt_60">
					<EventsListing />
				</div>
				<div className="ptb_100">
					<Speakers />
				</div>

				<div className={`${styles.bottomBg} pb_100`}>
					<div className="container">
						<h2 className="text_xl font_primary f_w_m color_secondary pb_20">
							Audience Speak
						</h2>
					</div>
					<TestimonialFeedback />
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
