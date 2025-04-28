// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Insights from "@/components/Insights";
import SectionsHeader from "@/components/SectionsHeader";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import WebinarInsideTopSection from "@/sections/resources/webinar/WebinarInsideTopSection";
import WebinarMiddleDescription from "@/sections/resources/webinar/WebinarMiddleDescription";
import WebinarMiddleRight from "@/sections/resources/webinar/WebinarMiddleRight";
import WebinarRecording from "@/sections/resources/webinar/WebinarRecording";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/webinar/WebinarInside.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import {
	getInsightsCategories,
	getInsightsInside,
} from "@/services/Insights.service";
import ContentFromCms from "@/components/ContentFromCms";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, categoriesForSelect] = await Promise.all([
		getInsightsInside(params.slug),
		getInsightsCategories(),
	]);

	return {
		props: {
			data: data.data.postBy,
			countries: categoriesForSelect.data.countries.nodes,
		},
	};
}

/** WebinarInside Page */
export default function WebinarInside({ data, countries }) {
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
				Url={`/webinar/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.WebinarInsidePage}>
				<div className={`${styles.topBg} pt_100 pb_60`}>
					<WebinarInsideTopSection data={data} countries={countries} />
				</div>
				<SectionsHeader data={headerArray} />
				<section className={`${styles.mediaMiddle} pt_80`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								{/* <WebinarMiddleDescription /> */}
								<ContentFromCms>{data?.content}</ContentFromCms>
								<div className="pt_60">
									<WebinarRecording data={data} />
								</div>
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<WebinarMiddleRight data={data} />
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
