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
import ContentFromCms from "@/components/ContentFromCms";
import Script from "next/script";
import IframeModal from "@/components/IframeModal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //
import CaseStudiesTop from "@/sections/resources/aurora-insights/CaseStudiesTop";
import CaseStudiesMiddleDescription from "@/sections/resources/aurora-insights/CaseStudiesMiddleDescription";
import Client from "@/sections/resources/aurora-insights/Client";

// PLUGINS //
import Lottie from "lottie-react";

// UTILS //
import { dynamicInsightsBtnProps, OpenIframePopup, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/aurora-insights/Articles.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Articles Page */
export default function InsightsInsideWrap({
	data,
	otherList,
	countries,
	insights,
	insightsSectionButton,
}) {
	const isArticle = data?.categories?.nodes?.some(
		(item) => item.slug === "commentary"
	);
	const isCaseStudy = data?.categories?.nodes?.some(
		(item) => item.slug === "case-study"
	);
	const isReports = data?.categories?.nodes?.some((item) =>
		item.slug.includes("report")
	);
	const dataForBtn = {
		postFields: { insightsSectionButton: { ...insightsSectionButton } } || {},
	};

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/resources/aurora-insights/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.articlesPage}>
				{/* <Breadcrumbs /> */}
				<div className="pb_60">
					<CaseStudiesTop
						data={data}
						isArticle={isArticle}
						isCaseStudy={isCaseStudy}
						isReports={isReports}
					/>
				</div>
				<SectionsHeader
					// hideall
					customHtml={
						dynamicInsightsBtnProps(data, "middleSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(data, "middleSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded" textlowercase>
									{dynamicInsightsBtnProps(data, "middleSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				<section className={`${styles.CaseStudiesMiddle} pb_80 pt_40`}>
					<div className="container">
						<div className={`${styles.CaseStudiesMiddleFlex} f_j`}>
							<div className={`${styles.CaseStudiesMiddleLeft} dynamic_content`}>
								{/* <CaseStudiesMiddleDescription /> */}
								{data?.content && (
									<section id="overview" data-name="Overview">
										<ContentFromCms>{data?.content}</ContentFromCms>
									</section>
								)}
								{data?.postFields?.sections?.map((item) => {
									return (
										<section
											key={item?.sectionTitle}
											id={slugify(item?.sectionTitle)}
											data-name={item?.sectionTitle}
										>
											<ContentFromCms>{item?.content}</ContentFromCms>
											{item?.lottie?.node?.mediaItemUrl && (
												<LottieRenderer
													src={item?.lottie?.node?.mediaItemUrl}
													autoplay={true}
													loop={true}
													className="lottieDyanmic"
													renderer="svg"
													// height="400px"
													width="100%"
													// renderersettings={{
													// 	preserveAspectRatio: "xMidYMid meet",
													// }}
												/>
											)}
											<div className="cmsButtonsWrap">
												{item?.buttons?.map((btnItem) => {
													const dataForBtn = {
														postFields: { btnItem: btnItem } || {},
													};

													return (
														<div
															{...dynamicInsightsBtnProps(dataForBtn, "btnItem")}
															key="btn"
															to="Insights"
															className="cmsbuttons"
														>
															<Button color="primary" variant="filled" shape="rounded">
																{dynamicInsightsBtnProps(dataForBtn, "btnItem").btntext}
															</Button>
														</div>
													);
												})}
											</div>
										</section>
									);
								})}
								<div className="pb_100 pt_50">
									<TestimonialFeedback data={data?.postFields} hideContainer />
								</div>
							</div>
							<div className={`${styles.CaseStudiesMiddleRight}`}>
								<Client data={data} countries={countries} />
							</div>
						</div>
					</div>
				</section>

				<div className="pb_100">
					<Insights
						isPowerBgVisible={true}
						isInsightsBlogsVisible={true}
						defaultList={otherList}
						countries={countries}
						formSectionTitle={insights?.title}
						formSectionDesc={insights?.desc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						insightsTitle="More from Aurora"
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>

				<IframeModal hideLeft />
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
