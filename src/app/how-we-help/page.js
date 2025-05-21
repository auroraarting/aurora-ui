/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/how-we-help/HowWeHelp.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "How We Help | Aurora",
	description: "Aurora",
};

/** HowWeHelp Page */
export default function HowWeHelp() {
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"How We Help"} Desc={""} OgImg={""} Url={"/how-we-help"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.HowWeHelpPage}>
				<div className={styles.HowWeHelpBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										Intelligence behind every decision
									</h2>
									<p className="text_reg color_dark_gray">
										Specialised support across the asset lifecycle, from siting and
										valuation to strategy and PPAs, is designed to drive better investment
										outcomes in energy and infrastructure.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/how-we-help/transactions-support">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">
												Transaction Support
											</h4>
											<p className="text_reg color_dark_gray">
												Navigate acquisitions, investments, and mergers with confidence.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/how-we-help/portfolio-valuation">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">
												Portfolio Valuation
											</h4>
											<p className="text_reg color_dark_gray">
												Ensure every asset is accurately valued and strategically managed.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/how-we-help/asset-citing-optimisation">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">
												Asset Siting & Optimisation
											</h4>
											<p className="text_reg color_dark_gray">
												Pinpoint the right locations and maximise operational potential.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/how-we-help/ppas">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">
												PPAs (Power Purchase Agreements)
											</h4>
											<p className="text_reg color_dark_gray">
												Secure agreements that drive profitability and sustainability.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/how-we-help/strategy">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Strategy</h4>
											<p className="text_reg color_dark_gray">
												Build forward-thinking plans that define and achieve your goals.
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
								isPowerBgVisible={true}
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
