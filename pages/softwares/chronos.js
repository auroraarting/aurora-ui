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
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import CaseStudy from "@/components/CaseStudy";

// SECTIONS //
import SoftwareBanner from "@/sections/softwares/SoftwareBanner";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";
import Redefining from "@/sections/softwares/Redefining";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";
import IntuitiveStepProcess from "@/sections/softwares/IntuitiveStepProcess";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/softwares/SoftwareInside.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/banner/desktop_banner.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";

// DATA //

/** Chronos Page */
export default function SoftwarePage() {
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
				Book a Demo
			</Button>
		</div>,
	];

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Chronos"} Desc={""} OgImg={""} Url={"/chronos"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.SoftwarePage}>
				{/* <InnerBanner
					bannerTitle="Energy solutions for those who see beyond the grid"
					bannerDescription="Aurora empowers industries with tailored energy intelligence, helping decision-makers drive impact, manage risks, and seize opportunities in a rapidly changing energy landscape."
					desktopImage={desktop_banner.src}
					mobileImage={desktop_banner.src}
					videoSrc="../../img/softwares/frame_video.mp4"
				/> */}

				<SoftwareBanner />
				<SectionsHeader data={headerArray} />
				<div className="ptb_100">
					<Redefining />
				</div>
				<section>
					<img src={available_regions.src} className="width_100" alt="img" />
				</section>
				<div className="pt_100">
					<CaseStudy />
				</div>
				{/* <div className="pb_100">
					<SoftwareMarket />
				</div> */}
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
				</div>
				<ServicesCircle />
				<div>
					<GloballyBankableInsights />
				</div>
				<IntuitiveStepProcess />
				<SmarterEnergy />

				<div className="pb_100">
					<Insights
						isFormVisible={isFormVisible}
						setIsFormVisible={setIsFormVisible}
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
