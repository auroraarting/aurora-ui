// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import TopEvents from "@/sections/events/TopEvents";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/events.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import EventsListing from "@/sections/events/EventsListing";

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
				<InnerBanner
					bannerTitle="Lorem ipsum dolor sit amet consectetur."
					bannerDescription="Each year, our landmark events bring together international industry leaders, government officials and academics to engage in addressing the hottest energy topics."
					showContentOnly
				/>
				<div>
					<TopEvents />
				</div>
				<div className="pt_60">
					<EventsListing />
				</div>
				<div className="pt_60"></div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
