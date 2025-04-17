// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";

// SECTIONS //
import AdvisoryLeadership from "@/sections/company/team/AdvisoryLeadership";
import ResearchLeadership from "@/sections/company/team/ResearchLeadership";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/Team.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

/** Team Page */
export default function Team() {
	const [activeTab, setActiveTab] = useState("AdvisoryLeadership");

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Team"} Desc={""} OgImg={""} Url={"/team"} />

			{/* Header */}
			<Header />

			{/* Page Content starts here */}
			<main className={styles.TeamPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="latest press releases & media contacts"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
						showContentOnly
					/>
				</div>
				<section className={`${styles.tabMain} pt_60`}>
					<div className={`${styles.category}`}>
						<div className={`${styles.switchBox}`}>
							<div
								className={`${styles.listTxt} ${
									activeTab === "AdvisoryLeadership" ? styles.active : ""
								}`}
								onClick={() => handleTabClick("AdvisoryLeadership")}
							>
								<p className="text_xs f_w_m font_primary ">Advisory Leadership</p>
							</div>
							<div
								className={`${styles.listTxt} ${
									activeTab === "ResearchLeadership" ? styles.active : ""
								}`}
								onClick={() => handleTabClick("ResearchLeadership")}
							>
								<p className="text_xs f_w_m font_primary ">Research Leadership</p>
							</div>
						</div>
					</div>
					{activeTab === "AdvisoryLeadership" && (
						<div className={`${styles.categoryContent} `}>
							<div className="pb_100">
								<AdvisoryLeadership />
							</div>
						</div>
					)}
					{activeTab === "ResearchLeadership" && (
						<div className={`${styles.categoryContent} `}>
							<div className="pb_100">
								<ResearchLeadership />
							</div>
						</div>
					)}
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
