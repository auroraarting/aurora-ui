"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import TestimonialFeedback from "@/components/TestimonialFeedback";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import SoftwareCards from "@/components/SoftwareCards";
import AllVideos from "@/components/AllVideos";
import IframeModal from "@/components/IframeModal";
import Breadcrumbs from "@/components/Breadcrumbs";

// SECTIONS //
import WebinarListing from "@/sections/resources/webinar/WebinarListing";
import PastSpeakers from "@/sections/resources/webinar/PastSpeakers";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/resources/webinar/Webinar.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";

// SERVICES //

// DATA //

/** Webinar Page */
export default function WebinarTalksWrap({
	pagination,
	data,
	tags,
	categories,
	countries,
	products,
	softwares,
	services,
	pastSpeakers,
	webinarpage,
}) {
	const [original, setOriginal] = useState(data);

	const dataForBtnForInsights = {
		postFields: webinarpage || {},
	};

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Webinar"} Desc={""} OgImg={""} Url={"/webinar"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.WebinarPage}>
				<div className={`${styles.topBg}`}>
					{/* <Breadcrumbs /> */}
					<InnerBanner
						bannerTitle={webinarpage?.banner?.title}
						bannerDescription={webinarpage?.banner?.desc}
						showContentOnly
					/>
				</div>
				<div>
					<WebinarListing
						data={data}
						pagination={pagination}
						countries={countries}
						products={products}
						softwares={softwares}
						services={services}
						setOriginal={setOriginal}
						original={original}
						productService={[
							{
								category: "Product",
								options: products?.map((item) => item.title),
							},
							{
								category: "Software",
								options: softwares?.map((item) => item.title),
							},
							{
								category: "Service",
								options: services?.map((item) => item.title),
							},
						]}
					/>
				</div>
				{/* <div className="ptb_100">
					<PastSpeakers data={pastSpeakers} />
				</div> */}
				{webinarpage?.video?.sectionTitle && (
					<div className="ptb_100">
						<AllVideos
							sectionName="Latest Videos"
							title={webinarpage?.video?.sectionTitle}
							desc={webinarpage?.video?.sectionDesc}
							redirectLink={webinarpage?.video?.redirectLink}
							videoLink={webinarpage?.video?.videoLink}
							videoThumbnail={webinarpage?.video?.videoThumbnail?.node?.mediaItemUrl}
							iframe={webinarpage?.video?.iframe}
						/>
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							formSectionTitle={webinarpage?.insights?.sectionTitle}
							formSectionDesc={webinarpage?.insights?.sectionDesc}
							formSectionBtnText={
								dynamicInsightsBtnProps(dataForBtnForInsights, "insightsSectionButton")
									.btntext
							}
							formdata={dynamicInsightsBtnProps(
								dataForBtnForInsights,
								"insightsSectionButton"
							)}
						/>
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards
						dynamicData={[
							{
								desc: "In-depth insights from global energy leaders",
								btnText: "View all podcasts",
								btnLink: "/resources/energy-unplugged",
								img: "/img/contact/cardImg7.jpg",
								fontColor: "color_black",
							},
							{
								desc: "Expert analysis and case studies on energy markets",
								btnText: "View all resources",
								btnLink: "/resources/aurora-insights",
								img: "/img/contact/cardImg5.jpg",
								fontColor: "color_white",
							},
							{
								desc: "Join events shaping the future of energy",
								btnText: "View all events",
								btnLink: "/events",
								fontColor: "color_white",
								img: "/img/contact/cardImg4.jpg",
							},
						]}
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
