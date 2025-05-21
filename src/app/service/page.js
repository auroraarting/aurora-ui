// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

// MODULES //
import Link from "next/link";

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
import styles from "@/styles/pages/services/Services.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Service | Aurora",
	description: "Aurora",
};

/** Services Page */
export default function Services() {
	return (
		<div>
			{/* Metatags */}
			<MetaTags Title={"Services"} Desc={""} OgImg={""} Url={"/service"} />

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.ServicesPage}>
				<div className={styles.ServicesBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										Bespoke services for every energy decisions
									</h2>
									<p className="text_reg color_dark_gray">
										Aurora provides data-driven insights, bespoke analytics and tailored
										services to support strategic decisions in the evolving energy
										landscape.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<Link href="/service/advisory" rel="noreferrer">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</Link>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Advisory</h4>
											<p className="text_reg color_dark_gray">
												Aurora’s services combine market-leading data, modelling, and
												analysis to guide complex decisions across the global energy value
												chain.
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
