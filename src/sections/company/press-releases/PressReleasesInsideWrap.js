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
}) {
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
				<section className={`${styles.mediaMiddle} pt_80`}>
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
						formSectionTitle="Sign up to our press list"
						formSectionDesc="Lorem ipsum dolor sit amet consectetur. Mattis fermentum proin erat pellentesque risus ac. Facilisis ullamcorper."
						formSectionBtnText={
							dynamicInsightsBtnProps(data, "insightsSectionButton").btntext
						}
						insightsLink="/company/press-releases/"
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
