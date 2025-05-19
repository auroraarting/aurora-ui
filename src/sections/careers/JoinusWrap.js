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
import JobOpenings from "@/sections/careers/JobOpenings";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/careers/JoinUs.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** JoinUs Page Wrap */
export default function JoinusWrap({ page, otherList, countries, jobs }) {
	const dataForBtn = { postFields: page.insights || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Join Us"} Desc={""} OgImg={""} Url={"/careers/join-us"} /> */}

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
							formSectionDesc={page?.insights?.sectionDesc}
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
