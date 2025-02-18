// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import TestimonialFeedback from "@/components/TestimonialFeedback";

// SECTIONS //
import SoftwareBanner from "@/sections/softwares/SoftwareBanner";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";
import Redefining from "@/sections/softwares/Redefining";
import TrustedLeaders from "@/components/TrustedLeaders";
import ServicesCircle from "@/components/ServicesCircle";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/softwares/Software.module.scss";

// IMAGES //

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
				<SoftwareBanner />
				{/* <Redefining />
				<SoftwareMarket />
				<TrustedLeaders />
				<TestimonialFeedback /> */}
				<ServicesCircle />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
