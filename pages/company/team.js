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

// SECTORS //
import { getTeamSectors } from "@/services/Teams.service";
import IframeModal from "@/components/IframeModal";

/** Fetch */
export async function getServerSideProps() {
	const [data] = await Promise.all([getTeamSectors()]);

	return {
		props: {
			data: data.data.teamsectors.nodes,
		},
	};
}

/** Team Page */
export default function Team({ data }) {
	const [activeTab, setActiveTab] = useState("advisory-leadership");
	const [teams, setTeams] = useState(data?.[0]?.teams?.nodes);

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
						bannerTitle="latest press releases & media contacts"
						bannerDescription="Lorem ipsum dolor sit amet consectetur. Elit massa a ut malesuada. Tincidunt pellentesque euismod morbi elit in tempor in. Ut elit in diam ut a mattis."
						showContentOnly
					/>
				</div>
				<section className={`${styles.tabMain} pt_60`}>
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
					{teams && (
						<div className={`${styles.categoryContent} `}>
							<div className="pb_100">
								<AdvisoryLeadership data={teams} />
							</div>
						</div>
					)}
				</section>
			</main>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
