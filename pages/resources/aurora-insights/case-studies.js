// MODULES //
import { useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import SectionsHeader from "@/components/SectionsHeader";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import Insights from "@/components/Insights";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import CaseStudiesTop from "@/sections/resources/aurora-insights/CaseStudiesTop";
import CaseStudiesMiddleDescription from "@/sections/resources/aurora-insights/CaseStudiesMiddleDescription";
import Client from "@/sections/resources/aurora-insights/Client";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/CaseStudies.module.scss";

// IMAGES //
//import desktop_banner from "@/../public/img/resources/aurora-insights/desktop_banner.jpg";

// DATA //

/** CaseStudies Page */
export default function CaseStudies() {
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
				Title={"Case Studies"}
				Desc={""}
				OgImg={""}
				Url={"/case-studies"}
			/>

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.CaseStudiesPage}>
				<div className="pb_60">
					<CaseStudiesTop />
				</div>
				<SectionsHeader data={headerArray} />
				<section className={`${styles.CaseStudiesMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.CaseStudiesMiddleFlex} f_j`}>
							<div className={`${styles.CaseStudiesMiddleLeft}`}>
								<CaseStudiesMiddleDescription />
							</div>
							<div className={`${styles.CaseStudiesMiddleRight}`}>
								<Client />
							</div>
						</div>
					</div>
				</section>
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
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
