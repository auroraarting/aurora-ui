// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import GlobalMap from "@/components/GlobalMap";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";

// SECTIONS //
import EosBanner from "@/sections/eos/EosBanner";
import GloballyBankableInsights from "@/sections/softwares/GloballyBankableInsights";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/Eos.module.scss";

// IMAGES //

// DATA //
import locationJson from "@/data/globalMap.json";
import CuttingEdgeModels from "@/sections/eos/CuttingEdgeModels";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";

/** EOS Page */
export default function EOSPage() {
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
			<MetaTags Title={"EOS"} Desc={""} OgImg={""} Url={"/eos"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page eos starts here */}
			<main className={styles.EOSPage}>
				<div>
					<EosBanner />
				</div>
				<SectionsHeader data={headerArray} />
				<GlobalMap locationJson={locationJson} />
				{/* <div className="ptb_100">
					<SoftwareMarket />
				</div> */}
				<div>
					<SmarterEnergy />
				</div>

				<ServicesCircle />
				<div className="pt_100">
					<CuttingEdgeModels />
				</div>
				<div className="ptb_100">
					<TrustedLeaders />
				</div>
				<div className="pb_100">
					<TestimonialFeedback />
				</div>

				<div className={`${styles.insightBg} pt_30`}>
					<div>
						<div className="pb_100">
							<Insights
								isFormVisible={isFormVisible}
								setIsFormVisible={setIsFormVisible}
								isPowerBgVisible={true}
								isInsightsBlogsVisible={true}
							/>
						</div>
					</div>
					<div className={`${styles.boxBg} pb_100`}>
						<EventSmarterEnergy />
					</div>
				</div>
			</main>
			{/* Page eos ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
