// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import Button from "@/components/Buttons/Button";

// SECTIONS //
import CareerFaq from "@/sections/careers/CareerFaq";
import GraduateProgramsFaq from "@/sections/careers/GraduateProgramsFaq";

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/Faq.module.scss";

// IMAGES //

// DATA //

// SERVICES //

/** Faq Page */
export default function Faq() {
	const [activeTab, setActiveTab] = useState("careers");

	/** */
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};
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
			<Header />

			{/* Page Content starts here */}
			<main className={styles.Faq}>
				<InnerBanner
					bannerTitle="WE'RE HAPPY TO ANSWER YOUR QUESTIONS"
					bannerDescription="Find below answers to the most frequently asked questions. This may help you decide if Aurora is the right place for you and clarify any doubts you may have during your journey."
					btnTxt="Connect Now"
					showContentOnly
				/>

				<section className={`${styles.tabMain} pb_100`}>
					<div className="container">
						<div className={`${styles.tabFlex} f_w_j`}>
							<div className={`${styles.category}`}>
								<div className={`${styles.switchBox}`}>
									<div
										className={`${styles.listTxt} ${
											activeTab === "careers" ? styles.active : ""
										}`}
										onClick={() => handleTabClick("careers")}
									>
										<p className="text_xs f_w_m font_primary ">Careers</p>
									</div>
									<div
										className={`${styles.listTxt} ${
											activeTab === "GraduatePrograms" ? styles.active : ""
										}`}
										onClick={() => handleTabClick("GraduatePrograms")}
									>
										<p className="text_xs f_w_m font_primary ">Graduate Programs</p>
									</div>
								</div>
							</div>
							<div className={`${styles.tabContent}`}>
								{activeTab === "careers" && (
									<div className={`${styles.categoryContent} `}>
										<CareerFaq />
									</div>
								)}
								{activeTab === "GraduatePrograms" && (
									<div className={`${styles.categoryContent} `}>
										<div className="pb_100">
											<GraduateProgramsFaq />
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
