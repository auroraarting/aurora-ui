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

// SECTIONS //
import WebinarListing from "@/sections/resources/webinar/WebinarListing";
import PastSpeakers from "@/sections/resources/webinar/PastSpeakers";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/webinar/Webinar.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getWebinarPage } from "@/services/Webinar.service";

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

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Webinar"} Desc={""} OgImg={""} Url={"/webinar"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.WebinarPage}>
				<div className={`${styles.topBg}`}>
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
				<div className="ptb_100">
					<PastSpeakers data={pastSpeakers} />
				</div>
				{webinarpage?.video?.sectionTitle && (
					<div className="pb_100">
						<AllVideos
							title={webinarpage?.video?.sectionTitle}
							desc={webinarpage?.video?.sectionDesc}
							redirectLink={webinarpage?.video?.redirectLink}
							videoLink={webinarpage?.video?.videoLink}
							videoThumbnail={webinarpage?.video?.videoThumbnail?.node?.sourceUrl}
						/>
					</div>
				)}
				<div className={`${styles.containerCustom} pb_100`}>
					<div className="container">
						<Insights isPowerBgVisible={true} />
					</div>
				</div>
				<div className="pb_100">
					<SoftwareCards />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
