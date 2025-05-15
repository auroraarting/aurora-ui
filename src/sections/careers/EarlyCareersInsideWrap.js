"use client";
/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import ServicesCircle from "@/components/ServicesCircle";
import SmarterEnergy from "@/components/SmarterEnergy";
import IntegratedSystem from "@/components/IntegratedSystem";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";
import TheApplicationProcess from "@/components/TheApplicationProcess";

// SECTIONS //
import SectionsHeader from "@/components/SectionsHeader";
import WhatWeLook from "@/sections/careers/WhatWeLook";
import AboutCountries from "@/sections/careers/AboutCountries";
import AllVideos from "@/components/AllVideos";
import WorkingTeams from "@/sections/careers/WorkingTeams";
import ConnectWithUs from "@/sections/careers/ConnectWithUs";
import CareersInsideBanner from "@/sections/careers/CareersInsideBanner";
import EarlyCareersInside from "@/sections/careers/EarlyCareersInside";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/early-careers/EarlyCareers.module.scss";

// IMAGES //

// DATA //

// SERVICES //

// DATA //

/** EarlyCareers Page */
export default function EarlyCareersInsideWrap({
	countries,
	data,
	otherList,
	offices,
	dataForBtn,
}) {
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/careers/early-careers/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.EarlyCareers}>
				<div className="pt_100">
					<CareersInsideBanner data={data} />
				</div>
				{/* <div> */}
				<SectionsHeader />
				{/* </div> */}
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

				{data.earlyCareers?.careerSeries?.title && (
					<div className="ptb_100 dark_bg">
						<AllVideos
							title={data.earlyCareers?.careerSeries?.title}
							desc={data.earlyCareers?.careerSeries?.sectionDesc}
							redirectLink={data.earlyCareers?.careerSeries?.buttonLink}
							iframe={data.earlyCareers?.careerSeries?.iframe}
						/>
					</div>
				)}
				<div>
					<SmarterEnergy
						data={data?.earlyCareers?.expertise2}
						sectionName="Get to Know"
					/>
				</div>
				<div className={`${styles.EarlyMain} pt_100`}>
					<div className={`${styles.containerCustom}`}>
						<div className="container">
							<Insights
								isPowerBgVisible={true}
								formSectionTitle={data?.earlyCareers?.insights?.title}
								formSectionDesc={data?.earlyCareers?.insights?.desc}
								formSectionBtnText={
									dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton").btntext
								}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>

					{otherList.length > 0 && (
						<div className="pt_100">
							<EarlyCareersInside data={otherList} />
						</div>
					)}
				</div>
				<div className="pt_100">
					<ConnectWithUs data={offices} />
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
