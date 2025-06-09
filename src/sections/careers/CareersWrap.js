/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/Careers.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Meta Data */
export const metadata = {
	title: "Careers | Aurora",
	description: "Aurora",
};

/** Careers Page */
export default async function Careers() {
	const dataForBtn = {
		postFields: {
			insightsSectionButton: {
				url: "/company/contact/",
				buttonText: "Subscribe",
				file: null,
			},
		},
	};
	const [categoriesForSelect, list] = await Promise.all([
		getInsightsCategories(),
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
	]);
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Careers"} Desc={""} OgImg={""} Url={"/careers"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<main className={styles.CareersPage}>
				<div className={styles.CareersBg}>
					<section className={`${styles.listLinksBox} ptb_100`}>
						<div className="container">
							<div className={`${styles.common_queries_flex} f_w_j`}>
								<div className={`${styles.title_wrap}`}>
									<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
										Powering the future of energy
									</h2>
									<p className="text_reg color_dark_gray">
										Join a team influencing global energy decisions with rigour, clarity,
										and ambition. At Aurora, your work helps drive the world’s transition
										to a sustainable energy future.
									</p>
								</div>
								<div className={`${styles.common_queries_faq}`}>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/careers/life-at-aurora">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Life at Aurora</h4>
											<p className="text_reg color_dark_gray">
												Experience a supportive culture that values intellectual curiosity,
												collaboration, and well-being, fostering personal and professional
												growth.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/careers/early-careers">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Early Careers</h4>
											<p className="text_reg color_dark_gray">
												Launch your career with our graduate programmes, offering mentorship
												and hands-on experience in energy analytics and advisory.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/careers/our-team">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Our Teams</h4>
											<p className="text_reg color_dark_gray">
												Collaborate with diverse experts across modelling, technology, and
												more, all contributing to trusted insights in global energy markets.
											</p>
										</div>
									</div>
									<div className={`${styles.linksItem}`}>
										<div className={`${styles.arrowLinks}`}>
											<a href="/careers/join-us">
												<span>
													<img src={dropdown_arrow.src} alt="icon" />
												</span>
											</a>
										</div>
										<div className={`${styles.Desc}`}>
											<h4 className="text_md f_w_m font_primary pb_10">Join Us</h4>
											<p className="text_reg color_dark_gray">
												Be part of a vibrant, dynamic, and transformative organisation
												driving the global energy transition.
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
								defaultList={otherList}
								countries={countries}
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
