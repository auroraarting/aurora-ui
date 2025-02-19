// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import SoftwareBanner from "@/sections/softwares/SoftwareBanner";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";
import Redefining from "@/sections/softwares/Redefining";
import TrustedLeaders from "@/components/TrustedLeaders";
import ServicesCircle from "@/components/ServicesCircle";
import IntuitiveStepProcess from "@/sections/softwares/IntuitiveStepProcess";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/softwares/Software.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/banner/desktop_banner.jpg";

// DATA //

/** Chronos Page */
export default function SoftwarePage() {
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
				<SectionsHeader />
				<SoftwareBanner />
				<Redefining />
				<SoftwareMarket />
				<TrustedLeaders />
				<TestimonialFeedback />
				<ServicesCircle />
				<IntuitiveStepProcess />
				<SmarterEnergy />
				<Insights />
				<IntegratedSystem />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
