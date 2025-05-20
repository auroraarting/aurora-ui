"use client";
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import GlobalMap from "@/components/GlobalMap";
import EosIntegratedSystem from "@/components/EosIntegratedSystem";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";
import Button from "@/components/Buttons/Button";
import Breadcrumbs from "@/components/Breadcrumbs";
import SectionsHeader from "@/components/SectionsHeader";
import TrustedLeaders from "@/components/TrustedLeaders";
import TestimonialFeedback from "@/components/TestimonialFeedback";

// SECTIONS //
import OurHistory from "@/sections/company/about/OurHistory";
import OurEdge from "@/sections/company/about/OurEdge";
import AboutLeadership from "@/sections/company/about/AboutLeadership";
import Commitment from "@/sections/company/about/Commitment";
import Counter from "@/sections/careers/Counter";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/company/About.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** About Page */
export default function AboutWrap({ data, countries, mapJson }) {
	const dataForBtn = { postFields: data };

	console.log(data, "data");

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"About"} Desc={""} OgImg={""} Url={"/about"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.AboutPage}>
				{/* <Breadcrumbs /> */}
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle={data?.banner?.title}
						bannerDescription={data?.banner?.description}
						desktopImage={data?.banner?.dekstopimage?.node?.mediaItemUrl}
						mobileImage={data?.banner?.mobileimage?.node?.mediaItemUrl}
						vimeoid={data?.banner?.vimeoLink}
						btnTxt={data?.banner?.buttonText}
						btnLink={data?.banner?.buttonLink}
					/>
				</div>
				<SectionsHeader
					customHtml={
						dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
							<div
								{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
								key="btn"
								to="Insights"
							>
								<Button color="primary" variant="filled" shape="rounded">
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
								</Button>
							</div>
						)
					}
				/>
				{data?.history?.sectionTitle && (
					<div className="pt_100">
						<OurHistory data={data?.history} />
					</div>
				)}
				{data?.ourEdge?.sectionTitle && (
					<div className={`${styles.OurEdgeMain} pt_100`}>
						<OurEdge data={data?.ourEdge} />
					</div>
				)}
				{mapJson && (
					<div className="dark_bg">
						<GlobalMap
							locationJson={[mapJson]}
							marqueeText={data?.map?.marqueetext}
							sectionName="Global Presence"
						/>
					</div>
				)}
				<div>
					<Counter
						data={{ stats: { ...data.stats, offices: data.offices.length } }}
					/>
				</div>
				<div className={`${styles.EosMain} pt_100 pb_60`}>
					<EosIntegratedSystem />
				</div>
				<div className="ptb_100">
					<section id="Products-Service" data-name="Products & Service">
						<SoftwareCards />
					</section>
				</div>
				{data.ourClient.selectLogos && (
					<div className="ptb_100">
						<TrustedLeaders data={data.ourClient} />
					</div>
				)}
				{data.ourClient.testimonials && (
					<div className="pb_100">
						<TestimonialFeedback data={data.ourClient} />
					</div>
				)}
				{data?.leaders?.sectionTitle && (
					<div className="pb_100">
						<AboutLeadership data={data?.leaders} countries={countries} />
					</div>
				)}
				<div className="pb_100">
					<Insights
						isPowerBgVisible={true}
						formSectionTitle={data?.insights?.sectionTitle}
						formSectionDesc={data?.insights?.sectionDesc}
						formSectionBtnText={
							dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
						}
						formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
					/>
				</div>
				<div className="pb_100">
					<Commitment />
				</div>
			</main>
			<IframeModal hideLeft />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
