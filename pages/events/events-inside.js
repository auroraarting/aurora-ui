// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import EventsMiddleDescription from "@/sections/events/EventsMiddleDescription";
import EventsLocation from "@/sections/events/EventsLocation";
import Sponsors from "@/sections/events/Sponsors";
import EventInsideVideo from "@/sections/events/EventInsideVideo";
import Speakers from "@/sections/events/Speakers";
import EventsMiddleRight from "@/sections/events/EventsMiddleRight";
import EventsGallery from "@/sections/events/EventsGallery";
import AudienceBreakdown from "@/sections/events/AudienceBreakdown";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/events/EventsInside.module.scss";
import DownloadList from "@/sections/events/DownloadList";

// IMAGES //

// DATA //

/** EventsInside Page */
export default function EventsInside() {
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

	/** scrollToSection */
	const scrollToSection = (id) => {
		scroller.scrollTo(id, {
			duration: 500,
			smooth: true,
			offset: -100,
			spy: true,
			onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});

		setTimeout(() => {
			setIsFormVisible(true);
			console.log("Scrolling finished!");
		}, 500);
	};

	const headerArray = [
		{ name: "Expertise", id: "#expertise" },
		{ name: "Available Regions", id: "#availableregions" },
		{ name: "Why Aurora", id: "#whyaurora" },
		{ name: "Clients", id: "#clients" },
		<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
			<Button color="primary" variant="filled" shape="rounded">
				Get Started
			</Button>
		</div>,
	];
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Events Inside"}
				Desc={""}
				OgImg={""}
				Url={"/events-inside"}
			/>

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.EventsInsidePage}>
				<div className="pt_100">
					<EventsInsideBanner />
				</div>
				<SectionsHeader data={headerArray} />
				<section className={`${styles.eventsMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.eventsMiddleFlex} f_j`}>
							<div className={`${styles.eventsMiddleLeft}`}>
								<EventsMiddleDescription />
								<EventsLocation />
								<div className="pb_60">
									<EventsGallery />
								</div>
								<Sponsors />
								<div className="">
									<EventInsideVideo />
								</div>
							</div>
							<div className={`${styles.eventsMiddleRight}`}>
								<EventsMiddleRight />
							</div>
						</div>
					</div>
				</section>
				<div className="pb_100">
					<AudienceBreakdown />
				</div>
				<div className="pb_40">
					<Speakers />
				</div>
				<div className="pb_60">
					<DownloadList />
				</div>
				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isInsightsBlogsVisible={true}
					/>
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
