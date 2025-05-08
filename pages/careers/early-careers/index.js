/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import SectionsHeader from "@/components/SectionsHeader";
import SmarterEnergy from "@/components/SmarterEnergy";
import ServicesCircle from "@/components/ServicesCircle";
import IframeModal from "@/components/IframeModal";
import ServicesCircleWhite from "@/components/ServicesCircleWhite";

// SECTIONS //
import CareerCountryCard from "@/sections/careers/CareerCountryCard";
import AllVideos from "@/components/AllVideos";
import TeamAurora from "@/sections/careers/TeamAurora";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/careers/early_careers/desktop_banner.jpg";

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import {
	getEarlyCareersListing,
	getEarlyCareersPage,
} from "@/services/EarlyCareers.service";
import { getInsightsCategories } from "@/services/Insights.service";

/** Fetch  */
export async function getServerSideProps() {
	const [data, page, categoriesForSelect] = await Promise.all([
		getEarlyCareersListing("first: 99999"),
		getEarlyCareersPage(),
		getInsightsCategories(),
	]);

	return {
		props: {
			data: data.data.earlyCareers.nodes,
			page: page.data.page.earlyCareersLanding,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			programs: page.data.programs.nodes,
		},
	};
}

/** EarlyCareers Page */
export default function EarlyCareers({ data, page, countries, programs }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Early Careers"}
				Desc={""}
				OgImg={""}
				Url={"/careers/early-careers"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<InnerBanner
					bannerTitle={page?.banner?.title}
					bannerDescription={page?.banner?.desc}
					desktopImage={page?.banner?.desktop?.node?.sourceUrl}
					mobileImage={page?.banner?.mobile?.node?.sourceUrl}
				/>
				{/* <div className="pt_60"> */}
				<SectionsHeader
					customHtml={
						<div key="btn" to="Insights">
							<a href="/careers/join-us">
								<Button color="primary" variant="filled" shape="rounded">
									Join Us
								</Button>
							</a>
						</div>
					}
				/>
				{/* </div> */}
				<div className="">
					<CareerCountryCard
						page={page}
						data={data}
						countries={countries}
						programs={programs}
					/>
				</div>
				<div>
					<SmarterEnergy data={page.expertise} />
				</div>
				<ServicesCircleWhite
					data={page.keyAdvantages}
					sectionName="Opportunities"
				/>
				<div className="ptb_100 dark_bg">
					<AllVideos
						title={page?.careerSeries?.title}
						desc={page?.careerSeries?.sectionDesc}
						redirectLink={page?.careerSeries?.buttonLink}
						iframe={page?.careerSeries?.iframe}
						sectionName="Aurora’s career series"
					/>
				</div>
				<div className="pt_80">
					<TeamAurora />
				</div>
				<div className="">
					<ConnectWithUs />
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}
		</div>
	);
}
