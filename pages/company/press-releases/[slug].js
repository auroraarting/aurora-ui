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
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import InsideTopSection from "@/sections/company/press-releases/InsideTopSection";
import MediaMiddleDescription from "@/sections/company/press-releases/MediaMiddleDescription";
import InsideMediaContact from "@/sections/company/press-releases/InsideMediaContact";
import MediaAbout from "@/sections/company/press-releases/MediaAbout";
import MediaMiddleRight from "@/sections/company/press-releases/MediaMiddleRight";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/company/press-releases/PressInside.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getPressesCards, getSinglePress } from "@/services/Press.service";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, moreRelated] = await Promise.all([
		getSinglePress(params.slug),
		getPressesCards("first:4"),
	]);
	const dataForBtn = { postFields: data?.data?.pressBy?.presses || {} };

	return {
		props: {
			data: data?.data?.pressBy || {},
			moreRelated: moreRelated.data.presses.nodes,
			dataForBtn,
		},
	};
}

/** PressInside Page */
export default function PressInside({ data, dataForBtn, moreRelated }) {
	console.log(dataForBtn, "dataForBtn");
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
				Url={`/company/press-releases/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.mediaInsidePage}>
				<div className="pt_100 pb_40">
					<InsideTopSection
						title={data?.title}
						date={data?.presses?.banner?.date}
						time={data?.presses?.banner?.time}
						featuredImage={data?.featuredImage?.node?.sourceUrl}
						data={data}
						dataForBtn={dataForBtn}
					/>
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btnText && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btnText}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_80`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								<MediaMiddleDescription data={data} />
								<div className={`${styles.mediaFeedback} pt_40 pb_60`}>
									<TestimonialFeedback
										data={{ testimonials: { nodes: [...data.presses.highlights] } }}
									/>
								</div>
								<div className={`${styles.mediaFeedback} pb_40`}>
									<InsideMediaContact data={data} />
								</div>
								<div className={`${styles.mediaFeedback} pt_60`}>
									<MediaAbout data={data} />
								</div>
							</div>
							<div className={`${styles.mediaMiddleRight}`}>
								<MediaMiddleRight data={data} dataForBtn={dataForBtn} />
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
						defaultList={moreRelated}
						formSectionTitle={data?.presses?.insights?.sectionTitle}
						formSectionDesc={data?.presses?.insights?.sectionDesc}
						insightsTitle={data?.presses?.insights?.insightsTitle}
						formSectionBtnText="View All"
					/>
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
