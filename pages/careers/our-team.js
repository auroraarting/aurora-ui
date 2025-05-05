/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";

// SECTIONS //
import DepartmentList from "@/sections/careers/DepartmentList";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/ourTeam.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import IframeModal from "@/components/IframeModal";

/** Fetch  */
export async function getServerSideProps() {
	const [data, jobs] = await Promise.all([getLifeAtAurora(), getFetchJobData()]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	const [categoriesForSelect, list] = await Promise.all([
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
	]);
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	return { props: { ...obj, jobs, otherList, countries } };
}

/** LifeAtAurora Page */
export default function LifeAtAurora({ jobs, otherList, countries }) {
	return (
		<div>
			{/* Metatags */}
			<MetaTags
				Title={"Our Team"}
				Desc={""}
				OgImg={""}
				Url={"/careers/our-team"}
			/>

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ourTeamPage}>
				<InnerBanner
					bannerTitle={"Lorem ipsum dolor sit amet consectetur."}
					bannerDescription={
						"Lorem ipsum dolor sit amet consectetur. Elementum ullamcorper nec sodales mi. Tellus imperdiet volutpat dui ipsum massa. In tincidunt tortor elit suspendisse arcu massa fusce. Urna lectus ullamcorper est eu quis lectus tortor nam."
					}
					showContentOnly
				/>
				<div>
					<DepartmentList data={jobs} />
				</div>
				<div className={`${styles.containerCustom} ptb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							defaultList={otherList}
							countries={countries}
						/>
					</div>
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
