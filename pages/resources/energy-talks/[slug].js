// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //
import EnergyInsideTopSection from "@/sections/resources/energy-talks/EnergyInsideTopSection";
import EnergyMiddleDescription from "@/sections/resources/energy-talks/EnergyMiddleDescription";
import EnergyMiddleRight from "@/sections/resources/energy-talks/EnergyMiddleRight";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/energy-talks/EnergyInside.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// SERVICES //
import { getInsightsInside } from "@/services/Insights.service";

// DATA //

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data] = await Promise.all([getInsightsInside(params.slug)]);

	return {
		props: {
			data: data.data.postBy,
		},
	};
}

/** EnergyInside Page */
export default function EnergyInside({ data }) {
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
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/energy-talks/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EnergyInsidePage}>
				<div className="pt_100 pb_40">
					<EnergyInsideTopSection data={data} />
				</div>
				<SectionsHeader data={headerArray} />
				<section className={`${styles.mediaMiddle} pt_80`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								{/* <EnergyMiddleDescription /> */}
								<ContentFromCms>{data?.content}</ContentFromCms>
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<EnergyMiddleRight data={data} />
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
