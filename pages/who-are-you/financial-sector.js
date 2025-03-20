// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import TrustedLeaders from "@/components/TrustedLeaders";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";

// SECTIONS //
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/who-are-you/FinancialSector.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/financial-sector/desktop_banner.jpg";

// DATA //

/** FinancialSector Page */
export default function Advisory() {
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
				Title={"Financial Sector"}
				Desc={""}
				OgImg={""}
				Url={"/financial-sector"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.FinancialSectorPage}>
				<div className="pb_60">
					<InnerBanner
						bannerTitle="Energy solutions for those who see beyond the grid"
						bannerDescription="Aurora empowers industries with tailored energy intelligence, helping decision-makers drive impact, manage risks, and seize opportunities in a rapidly changing energy landscape."
						btnTxt="Connect Now"
						desktopImage={desktop_banner.src}
						mobileImage={desktop_banner.src}
						// videoSrc="../../img/softwares/frame_video.mp4"
					/>
				</div>
				<SectionsHeader data={headerArray} />
				<SmarterEnergy />
				<div className="pt_100">
					<SoftwareMarket />
				</div>
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
				</div>
				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
					/>
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
