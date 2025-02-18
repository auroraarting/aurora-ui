// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "../utils/EqualHeight";

// STYLES //
import styles from "@/styles/components/Insights.module.scss";

// IMAGES //
import clock from "../../public/img/icons/clock.svg";

// DATA //

/** Insights Section */
export default function Insights() {
	// useEffect(() => {
	// 	setInterval(() => {
	// 		EqualHeight("boxH");
	// 	}, 500);
	// }, []);
	return (
		<section className={`${styles.Insights} pb_100`}>
			<div className="container">
				<div className={`${styles.insightsBg} dark_bg`}>
					<div className={`${styles.contentFlex} f_j`}>
						<div className={`${styles.title_wrap}`}>
							<h2 className="text_lg font_primary f_w_s_b color_white pb_20">
								Let’s power the future, together
							</h2>
							<p className="text_reg color_silver_gray">
								Our team is here to help you navigate the complexities of energy
								storage. Reach out to discover how Chronos can work for you.
							</p>
						</div>
						<div className={`${styles.bookBtn}`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Speak To Our Experts
							</Button>
						</div>
					</div>
					<div className={`${styles.insightsItemBox}`}>
						<div className={`${styles.titleFlex} f_j`}>
							<div className={`${styles.title}`}>
								<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
									Insights
								</h2>
							</div>
							<div className={`${styles.bookBtn}`}>
								<Button color="secondary" variant="filled" shape="rounded" mode="dark">
									View All
								</Button>
							</div>
						</div>
						<div className={`${styles.insightsItemFlex} d_f m_t_30`}>
							<div className={`${styles.ItemBox} boxH`}>
								<div className={`${styles.hoverBox}`}>
									<p
										className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
									>
										Case Study
									</p>
									<p className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}>
										Analysing the financial roadmap to Net Zero by 2035. Analysing the
										financial roadmap to Net Zero by 2035
									</p>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_medium_gray text_uppercase">
											November 2024
										</p>
										<p className="text_xs f_w_m color_medium_gray d_f">
											<img src={clock.src} className={`${styles.clock}`} alt="clock" />
											5min
										</p>
									</div>
								</div>
							</div>
							<div className={`${styles.ItemBox} boxH`}>
								<div className={`${styles.hoverBox}`}>
									<p
										className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
									>
										Case Study
									</p>
									<p className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}>
										Analysing the financial roadmap to Net Zero by 2035. Analysing the
										financial roadmap to Net Zero by 2035
									</p>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_medium_gray text_uppercase">
											November 2024
										</p>
										<p className="text_xs f_w_m color_medium_gray d_f">
											<img src={clock.src} className={`${styles.clock}`} alt="clock" />
											5min
										</p>
									</div>
								</div>
							</div>
							<div className={`${styles.ItemBox} boxH`}>
								<div className={`${styles.hoverBox}`}>
									<p
										className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
									>
										Case Study
									</p>
									<p className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}>
										Analysing the financial roadmap to Net Zero by 2035. Analysing the
										financial roadmap to Net Zero by 2035
									</p>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_medium_gray text_uppercase">
											November 2024
										</p>
										<p className="text_xs f_w_m color_medium_gray d_f">
											<img src={clock.src} className={`${styles.clock}`} alt="clock" />
											5min
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
