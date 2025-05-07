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
import { getOurTeamsPage } from "@/services/OurTeams.service";
import { dynamicInsightsBtnProps } from "@/utils";

/** Fetch  */
export async function getServerSideProps() {
	const [data, jobs, page, categoriesForSelect, list] = await Promise.all([
		getLifeAtAurora(),
		getFetchJobData(),
		getOurTeamsPage(),
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
	]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;

	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	return {
		props: {
			...obj,
			jobs,
			otherList,
			countries,
			data: page.data.page.ourTeams,
			products: categoriesForSelect.data.products.nodes,
			softwares: categoriesForSelect.data.softwares.nodes,
			services: categoriesForSelect.data.services.nodes,
		},
	};
}

/** LifeAtAurora Page */
export default function LifeAtAurora({
	data,
	jobs,
	otherList,
	countries,
	products,
	softwares,
	services,
}) {
	const dataForBtn = { postFields: data.insights || {} };
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
					bannerTitle={data?.banner?.title}
					bannerDescription={data?.banner?.desc}
					showContentOnly
				/>
				<div>
					<DepartmentList
						jobs={jobs}
						data={data}
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
				<div className={`${styles.containerCustom} ptb_100`}>
					<div className="container">
						<Insights
							isPowerBgVisible={true}
							defaultList={otherList}
							countries={countries}
							formSectionTitle={data?.insights?.sectionTitle}
							formSectionDesc={data?.insights?.sectionDesc}
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
