// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import SectionsHeader from "@/components/SectionsHeader";
import WhatWeLook from "@/sections/careers/WhatWeLook";
// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/careers/early_careers/desktop_banner.jpg";
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";

// DATA //

// SERVICES //

/** EarlyCareers Page */
export default function EarlyCareers() {
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
				Title={"Early Careers"}
				Desc={""}
				OgImg={""}
				Url={"/careers/early-careers"}
			/>

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<div className="pt_100">
					<EventsInsideBanner />
				</div>
				{/* <div>
					<SectionsHeader />
				</div> */}
				<div>
					<WhatWeLook />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
