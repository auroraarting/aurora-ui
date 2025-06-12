"use client";

/* eslint-disable quotes */
// MODULES //

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

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/company/press-releases/PressInside.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** PressInside Page */
export default function PressReleasesInsideWrap({
	data,
	dataForBtn,
	moreRelated,
	page,
}) {
	const dataForBtn2 = { postFields: page || {} };
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/company/press-room/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.mediaInsidePage}>
				<div className="pt_50 pb_20">
					<InsideTopSection
						title={data?.title}
						date={data?.date}
						time={data?.postFields?.time}
						featuredImage={data?.featuredImage?.node?.mediaItemUrl}
						data={data}
						dataForBtn={dataForBtn}
					/>
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.mediaMiddle} pt_40`}>
					<div className="container">
						<div className={`${styles.mediaMiddleFlex} f_j`}>
							<div className={`${styles.mediaMiddleLeft}`}>
								<MediaMiddleDescription data={data} />
								{data?.postFields?.testimonials?.nodes?.length > 0 && (
									<div className={`${styles.mediaFeedback} pt_40 pb_60`}>
										<TestimonialFeedback data={data?.postFields} />
									</div>
								)}
								{data?.postFields?.mediaContact && (
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
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={moreRelated}
						formSectionTitle={page?.insights?.sectionTitle}
						formSectionDesc={page?.insights?.sectionDesc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn2, "insightsSectionButton")?.btntext
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(dataForBtn2, "insightsSectionButton")}
						insightsLink="/company/press-room/"
						allTag="Press Releases"
					/>
				</div>
			</main>
			<IframeModal hideLeft />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
