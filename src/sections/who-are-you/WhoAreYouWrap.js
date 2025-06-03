"use client";
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import Insights from "@/components/Insights";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/who-are-you/WhoAreYou.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Who Are You | Aurora",
	description: "Aurora",
};

/** WhoAreYou Page */
export default function WhoAreYou() {
	const dataForBtn = {
		postFields: {
			insightsSectionButton: {
				url: "/company/contact/",
				buttonText: "Subscribe",
				file: null,
			},
		},
	};
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Who Are You"} Desc={""} OgImg={""} Url={"/who-are-you"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.WhoAreYouPage}>
				<div className={styles.WhoAreYouBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										Trusted by energy’s key decision-makers
									</h2>
									<p className="text_reg color_dark_gray">
										Aurora equips developers, utilities, consumers, and financial
										institutions with the data, tools, and insights needed to lead in
										complex energy markets.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/who-are-you/developers"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Developer</h4>
											<p className="text_reg color_dark_gray">
												Identify sites, assess feasibility, and secure financing with
												trusted data.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/who-are-you/utilities"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Utilities</h4>
											<p className="text_reg color_dark_gray">
												Plan generation, manage portfolios, and navigate policy with expert
												insight.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/who-are-you/energy-consumers"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Energy Consumer</h4>
											<p className="text_reg color_dark_gray">
												Optimise procurement, forecast costs, and decarbonise using market
												intelligence.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/who-are-you/financial-sector"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">
												Financial Sector
											</h4>
											<p className="text_reg color_dark_gray">
												Support valuations, M&A, and funding decisions with defensible
												energy analytics.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className={`${styles.containerCustom} pb_100`}>
						<div className="container">
							<Insights
								formSectionTitle="Connect with trusted energy advisors"
								formSectionBtnText="Speak to our experts"
								insightsLink="/company/contact/"
								isPowerBgVisible={true}
								formdata={dynamicInsightsBtnProps(dataForBtn, "insightsSectionButton")}
							/>
						</div>
					</div>
					<div className="pb_100">
						<SoftwareCards />
					</div>
				</div>
			</main>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
