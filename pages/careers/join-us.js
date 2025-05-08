/* eslint-disable quotes */
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import JobOpenings from "@/sections/careers/JobOpenings";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/JoinUs.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getJoinUsPage } from "@/services/JoinUs.service";

/** Fetch  */
export async function getServerSideProps() {
	//
	const [jobs, categoriesForSelect, list, page] = await Promise.all([
		getFetchJobData(),
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
		getJoinUsPage(),
	]);

	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;

	return {
		props: {
			jobs,
			otherList,
			countries,
			page: page.data.page.joinUs,
		},
	};
}

/** JoinUs Page */
export default function JoinUs({ jobs, otherList, countries, page }) {
	const dataForBtn = { postFields: page.insights || {} };

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Join Us"} Desc={""} OgImg={""} Url={"/careers/join-us"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.JoinUs}>
				<InnerBanner
					bannerTitle={page?.banner?.title}
					bannerDescription={page?.banner?.desc}
					btnTxt={page?.banner?.buttonText}
					btnLink={page?.banner?.buttonLink}
					showContentOnly
				/>
				<div>
					<JobOpenings data={jobs} hideFilters={false} hideRedirect={true} />
				</div>
				<div className={`${styles.containerCustom} ptb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							defaultList={otherList}
							countries={countries}
							formSectionTitle={page?.insights?.sectionTitle}
							formSectionDesc={page?.insights?.sectionTitle}
							formSectionBtnText={
								dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btnText
							}
							formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
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
