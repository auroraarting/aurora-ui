"use client";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Insights from "@/components/Insights";
import IntegratedSystem from "@/components/IntegratedSystem";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import DepartmentList from "@/sections/careers/DepartmentList";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/ourTeam.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";
import available_regions from "@/../public/img/global-presence/available_regions.jpg";

// DATA //
import locationJson from "@/data/globalMap.json";

// SERVICES //

/** LifeAtAurora Page */
export default function OurTeamWrap({
	data,
	jobs,
	otherList,
	countries,
	products,
	softwares,
	services,
	offices,
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
						departments={data.categories?.map((item) => item.categorytext)}
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
								dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
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
