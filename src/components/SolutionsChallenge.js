"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/SolutionsChallenge.module.scss";

// IMAGES //
import portfolio from "@/../public/img/transactions/portfolio.png";
import asset from "@/../public/img/transactions/asset.png";
import strategy from "@/../public/img/transactions/strategy.png";
import ppa from "@/../public/img/transactions/ppa.png";

// DATA //

/** SolutionsChallenge Section */
export default function SolutionsChallenge() {
	return (
		<section className={`${styles.SolutionsChallenge}`}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_lg font_primary f_w_m color_secondary pb_10">
							Solutions for every challenge
						</h2>
						<p className={`${styles.label} text_reg color_dark_gray`}>
							We bring together precise analytics, expert insights, and tailored tools
							to enable your energy decisions. Explore our solutions in valuations,
							strategy, PPAs, and asset optimisation to drive success.
						</p>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.whiteBox}`}>
							<div className={`${styles.logo}`}>
								<img src={portfolio.src} alt="portfolio" />
							</div>
							<div className={`${styles.content}`}>
								<h5 className="text_reg font_primary f_w_s_b color_secondary">
									Portfolio <br />
									Valuation
								</h5>
							</div>
						</div>
						<div className={`${styles.whiteBox}`}>
							<div className={`${styles.logo}`}>
								<img src={asset.src} alt="asset" />
							</div>
							<div className={`${styles.content}`}>
								<h5 className="text_reg font_primary f_w_s_b color_secondary">
									Asset Siting & <br />
									Optimisation
								</h5>
							</div>
						</div>
						<div className={`${styles.whiteBox}`}>
							<div className={`${styles.logo}`}>
								<img src={ppa.src} alt="ppa" />
							</div>
							<div className={`${styles.content}`}>
								<h5 className="text_reg font_primary f_w_s_b color_secondary">PPAs</h5>
							</div>
						</div>
						<div className={`${styles.whiteBox}`}>
							<div className={`${styles.logo}`}>
								<img src={strategy.src} alt="strategy" />
							</div>
							<div className={`${styles.content}`}>
								<h5 className="text_reg font_primary f_w_s_b color_secondary">
									Strategy
								</h5>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
