"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import AdvisoryLeadership from "@/sections/company/team/AdvisoryLeadership";
import ResearchLeadership from "@/sections/company/team/ResearchLeadership";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/Team.module.scss";

// IMAGES //
import country_thumb from "/public/img/global-presence/country_thumb.jpg";

// DATA //

// SECTORS //

/** Team Page */
export default function TeamWrap({ data, countries }) {
	const [activeTab, setActiveTab] = useState("advisory-leadership");
	const [teams, setTeams] = useState(data);

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab?.slug);
		setTeams(tab?.teams?.nodes);
	};

	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Team"} Desc={""} OgImg={""} Url={"/team"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.TeamPage}>
				<div className={`${styles.topBg}`}>
					<InnerBanner
						bannerTitle="The people who shape Aurora"
						bannerDescription="Drawn from industry, academia, and finance, our leadership team drives innovation, steers strategy, and ensures we stay focused on what matters most, delivering clarity in a changing energy world."
						showContentOnly
					/>
				</div>
				<section className={`${styles.tabMain} pt_60`}>
					<div className={`${styles.categoryContent} `}>
						<div className="pb_100">
							<AdvisoryLeadership data={teams} countries={countries} />
						</div>
					</div>
					{/* <div className={`${styles.category}`}>
						<div className={`${styles.switchBox}`}>
							{data?.map((item, ind) => {
								return (
									<div
										key={ind}
										className={`${styles.listTxt} ${
											activeTab === item?.slug ? styles.active : ""
										}`}
										onClick={() => handleTabClick(item)}
									>
										<p className="text_xs f_w_m font_primary ">{item?.name}</p>
									</div>
								);
							})}
						</div>
					</div> */}
					{/* {teams && (
						<div className={`${styles.categoryContent} `}>
							<div className="pb_100">
								<AdvisoryLeadership data={teams} countries={countries} />
							</div>
						</div>
					)} */}
				</section>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
