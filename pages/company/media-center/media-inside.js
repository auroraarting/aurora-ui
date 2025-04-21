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
import InsideTopSection from "@/sections/company/media-center/InsideTopSection";
import MediaMiddleDescription from "@/sections/company/media-center/MediaMiddleDescription";
import InsideMediaContact from "@/sections/company/media-center/InsideMediaContact";
import MediaAbout from "@/sections/company/media-center/MediaAbout";
import MediaMiddleRight from "@/sections/company/media-center/MediaMiddleRight";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/media-center/MediaInside.module.scss";

// IMAGES //

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
				Title={"Media Inside"}
				Desc={""}
				OgImg={""}
				Url={"/media-inside"}
			/>

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.mediaInsidePage}>
				<div className="pt_100 pb_40">
					<InsideTopSection />
				</div>
				<SectionsHeader data={headerArray} />
				<section className={`${styles.mediaMiddle} pt_80`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								<MediaMiddleDescription />
								<div className={`${styles.mediaFeedback} pt_40 pb_60`}>
									<TestimonialFeedback />
								</div>
								<div className={`${styles.mediaFeedback} pb_40`}>
									<InsideMediaContact />
								</div>
								<div className={`${styles.mediaFeedback} pt_60`}>
									<MediaAbout />
								</div>
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<MediaMiddleRight />
							</div>
						</div>
					</div>
				</section>

				<div className="ptb_100">
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
