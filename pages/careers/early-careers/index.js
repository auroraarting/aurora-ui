// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import SectionsHeader from "@/components/SectionsHeader";

// SECTIONS //
import CareerCountryCard from "@/sections/careers/CareerCountryCard";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/careers/early_careers/desktop_banner.jpg";

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
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<InnerBanner
					bannerTitle="Launch your career at aurora"
					bannerDescription="Join our vibrant, respected, and transformative organisation to play an active role in the global energy transition."
					desktopImage={desktop_banner.src}
					mobileImage={desktop_banner.src}
				/>
				<div className="pt_60">
					<SectionsHeader data={headerArray} />
				</div>
				<div className="pt_60">
					<CareerCountryCard />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
