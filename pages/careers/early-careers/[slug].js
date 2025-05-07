/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import Button from "@/components/Buttons/Button";
import InnerBanner from "@/components/InnerBanner";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import IntegratedSystem from "@/components/IntegratedSystem";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";
import TheApplicationProcess from "@/components/TheApplicationProcess";

// SECTIONS //
import SectionsHeader from "@/components/SectionsHeader";
import WhatWeLook from "@/sections/careers/WhatWeLook";
import EventsInsideBanner from "@/sections/events/EventsInsideBanner";
import AboutCountries from "@/sections/careers/AboutCountries";
import AllVideos from "@/components/AllVideos";
import WorkingTeams from "@/sections/careers/WorkingTeams";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import CareersInsideBanner from "@/sections/careers/CareersInsideBanner";
import EarlyCareersInside from "@/sections/careers/EarlyCareersInside";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import {
	dynamicInsightsBtnProps,
	filterMarkersBySlug,
	getMapJsonForAllRegions,
	getMapJsonForCountries,
	getMapJsonForProducts,
} from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //
import desktop_banner from "@/../public/img/careers/early_careers/desktop_banner.jpg";
import IconStrategy from "@/../public/img/softwares/Icon-Strategy.svg";

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import {
	getEarlyCareersInside,
	getEarlyCareersListing,
} from "@/services/EarlyCareers.service";

// DATA //

/** Fetch  */
export async function getServerSideProps({ params }) {
	const [data, categoriesForSelect, list] = await Promise.all([
		getEarlyCareersInside(params.slug),
		getInsightsCategories(),
		getEarlyCareersListing("first: 10"),
	]);

	const countries = categoriesForSelect.data.countries.nodes;

	return {
		props: {
			data: data.data.earlyCareerBy,
			otherList: list.data.earlyCareers.nodes?.filter(
				(item) => item.slug !== params.slug
			),
			countries,
		},
	};
}

/** EarlyCareers Page */
export default function EarlyCareers({ data, otherList, countries }) {
	console.log(data, " datadata");
	const dataForBtn = { postFields: data?.earlyCareers?.insights || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/careers/early-careers/${data?.slug}`}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<div className="pt_100">
					<CareersInsideBanner data={data} />
				</div>
				<div>
					<SectionsHeader />
				</div>
				<div>
					<WhatWeLook data={data} />
				</div>
				<div>
					<ServicesCircle data={data?.earlyCareers?.keyAdvantages} />
				</div>
				<div>
					<WorkingTeams data={data} />
				</div>
				<div>
					<AboutCountries data={data} />
				</div>
				<div>
					<TheApplicationProcess data={data.earlyCareers?.theApplicationProcess} />
				</div>

				<div className="ptb_100 dark_bg">
					<AllVideos
						title={data.earlyCareers?.careerSeries?.title}
						desc={data.earlyCareers?.careerSeries?.sectionDesc}
						redirectLink={data.earlyCareers?.careerSeries?.buttonLink}
						iframe={data.earlyCareers?.careerSeries?.iframe}
					/>
				</div>
				<div>
					<SmarterEnergy data={data?.earlyCareers?.expertise2} />
				</div>
				<div className={`${styles.EarlyMain} pt_100`}>
					<div className={`${styles.containerCustom}`}>
						<div className="container">
							<Insights
								isPowerBgVisible={true}
								formSectionTitle={data?.earlyCareers?.insights?.title}
								formSectionDesc={data?.earlyCareers?.insights?.desc}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btnText
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>

					<div className="pt_100">
						{otherList.length > 0 && <EarlyCareersInside data={otherList} />}
					</div>
				</div>
				<div className="pt_100">
					<ConnectWithUs />
				</div>
				<div className="pb_100">
					<IntegratedSystem />
				</div>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
