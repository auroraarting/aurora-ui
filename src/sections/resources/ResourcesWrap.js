"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/Resources.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Resources | Aurora",
	description: "Aurora",
};

/** Resources Page */
export default function Resources() {
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
			{/* <MetaTags Title={"Resources"} Desc={""} OgImg={""} Url={"/resources"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ResourcesPage}>
				<div className={styles.ResourcesBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										A curated library of energy intelligence
									</h2>
									<p className="text_reg color_dark_gray">
										Explore Aurora’s library of expert content, designed to inform,
										inspire, and support smarter energy decisions across every market.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/resources/aurora-insights">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Aurora Insights</h4>
											<p className="text_reg color_dark_gray">
												Timely analysis and market commentary from Aurora’s expert research
												teams.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/resources/energy-talks">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Energy Talks</h4>
											<p className="text_reg color_dark_gray">
												Podcasts featuring exclusive conversations with industry leaders
												shaping the future of energy.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/resources/webinar">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Webinars</h4>
											<p className="text_reg color_dark_gray">
												Live and on-demand sessions unpacking major energy market trends and
												policy shifts.
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
