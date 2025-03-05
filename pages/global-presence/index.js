// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import SectionsHeader from "@/components/SectionsHeader";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";

// SECTIONS //
import ProductSlider from "@/sections/global-presence/ProductSlider";
import Introduction from "@/sections/global-presence/Introduction";
import WhichProducts from "@/sections/global-presence/WhichProducts";
import PublicWebinar from "@/sections/global-presence/PublicWebinar";
import EosIntegratedSystem from "@/sections/global-presence/EosIntegratedSystem";
import SoftwareMarket from "@/sections/softwares/SoftwareMarket";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/global-presence/GlobalPresence.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/global-presence/desktop_banner.jpg";

// DATA //

/** GlobalPresence Page */
export default function GlobalPresence() {
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
			<MetaTags
				Title={"Global Presence"}
				Desc={""}
				OgImg={""}
				Url={"/global-presence"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.GlobalPresencePage}>
				<InnerBanner
					bannerTitle="Lorem ipsum dolor sit amet consectetur."
					bannerDescription="Lorem ipsum dolor sit amet consectetur. Elementum ullamcorper nec sodales mi. Tellus imperdiet volutpat dui ipsum massa. In tincidunt tortor elit suspendisse arcu massa fusce. Urna lectus ullamcorper est eu quis lectus tortor nam."
					btnTxt="Get in Touch"
					desktopImage={desktop_banner.src}
					mobileImage={desktop_banner.src}
				/>
				<ProductSlider />
				<SectionsHeader data={headerArray} />
				<Introduction />
				<WhichProducts />
				<ServicesCircle />
				<SoftwareMarket />
				<TrustedLeaders />
				<TestimonialFeedback />
				<PublicWebinar />
				<div className={`${styles.insightBg} pb_100 pt_30`}>
					<div className={`${styles.boxBg}`}>
						<Insights
							isFormVisible={isFormVisible}
							setIsFormVisible={setIsFormVisible}
						/>
					</div>
					<EosIntegratedSystem />
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
