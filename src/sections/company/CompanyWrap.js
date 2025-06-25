"use client";
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/pages/company/company.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Company | Aurora",
	description: "Aurora",
};

/** company Page */
export default function Company() {
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
			{/* <MetaTags Title={"Company"} Desc={""} OgImg={""} Url={"/company"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.companyPage}>
				<div className={styles.companyBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										Behind the insights, a global team
									</h2>
									<p className="text_reg color_dark_gray">
										Discover the people, principles, and global reach powering Aurora’s
										market-leading energy intelligence.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/company/about">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">About Us</h4>
											<p className="text_reg color_dark_gray">
												Learn how Aurora came to be, what drives us, and who we serve.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/global-presence"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Global Presence</h4>
											<p className="text_reg color_dark_gray">
												Explore where we operate and how our insights support clients
												worldwide.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href={"/company/press-releases"}>
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Press</h4>
											<p className="text_reg color_dark_gray">
												Read our latest media features, announcements, and expert
												commentary.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/company/contact">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Contact us</h4>
											<p className="text_reg color_dark_gray">
												Get in touch with our experts to explore how our data-driven
												analysis can support your strategic decisions.
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
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
