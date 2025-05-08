/* eslint-disable quotes */
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
import { getInsights, getInsightsInside } from "@/services/Insights.service";

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, moreRelated] = await Promise.all([
		getInsightsInside(params.slug),
		getInsights('first: 3, where: {categoryName: "commentary"}'),
	]);
	const dataForBtn = { postFields: data?.data?.postBy?.postFields || {} };

	return {
		props: {
			data: data?.data?.postBy || {},
			moreRelated: moreRelated?.data?.posts?.nodes,
			dataForBtn,
		},
	};
}

/** PressInside Page */
export default function PressInside({ data, dataForBtn, moreRelated }) {
	console.log(data, "data");
	const [isFormVisible, setIsFormVisible] = useState(false); // Form hidden by default

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
						date={data?.date}
						time={data?.postFields?.time}
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
									<TestimonialFeedback data={data?.postFields} />
								</div>
								{data?.postFields?.mediaContact?.name && (
									<div className={`${styles.mediaFeedback} pb_40`}>
										<InsideMediaContact data={data} />
									</div>
								)}
								{data?.postFields?.about?.sectionTitle && (
									<div className={`${styles.mediaFeedback} pt_60`}>
										<MediaAbout data={data} />
									</div>
								)}
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
						formSectionTitle="Sign up to our press list"
						formSectionDesc="Lorem ipsum dolor sit amet consectetur. Mattis fermentum proin erat pellentesque risus ac. Facilisis ullamcorper."
						// insightsTitle={data?.presses?.insights?.insightsTitle}
						// formSectionBtnText="View All"
						formSectionBtnText={
							dynamicInsightsBtnProps(data, "insightsSectionButton").btnText
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(data, "insightsSectionButton")}
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
