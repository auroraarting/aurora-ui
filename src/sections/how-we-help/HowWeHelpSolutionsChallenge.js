/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay, Controller } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/how-we-help/HowWeHelpSolutionsChallenge.module.scss";

// IMAGES //
import asset_citing from "@/../public/img/transactions/asset_citing.svg";
import ppas from "@/../public/img/transactions/ppas.svg";
import strategy from "@/../public/img/transactions/strategy.svg";
import portfolio_valuation from "@/../public/img/transactions/portfolio_valuation.svg";
import transaction_icon from "@/../public/img/transactions/transaction_icon.svg";
import hover_arrow from "@/../public/img/softwares/hover_arrow.svg";

// DATA //

/** HowWeHelpSolutionsChallenge Section */
export default function HowWeHelpSolutionsChallenge() {
	return (
		<section className={`${styles.HowWeHelpSolutionsChallenge}`}>
			<div className="container">
				<div className={`${styles.integratedSystemFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Solutions for every challenge
						</h2>
						<p className="text_reg color_dark_gray">
							We bring together precise analytics, expert insights, and tailored tools
							to empower your energy decisions. Explore our solutions in valuations,
							strategy, PPAs, and asset optimisation to drive success.
						</p>
					</div>
					<div className={`${styles.integratedImgMain}`}>
						<div className={`${styles.integratedImgBox} `}>
							<Swiper
								modules={[Navigation, Pagination, Autoplay]}
								slidesPerView={2}
								spaceBetween={0}
								grabCursor={true}
								speed={500}
								loop={true}
								navigation={{
									prevEl: "#customPrev",
									nextEl: "#customNext",
								}}
								// autoplay={{
								// 	delay: 3000,
								// 	disableOnInteraction: false,
								// }}
								pagination={{
									clickable: true, // Makes it interactive
								}}
								breakpoints={{
									767: {
										slidesPerView: 2,
									},
									768: {
										slidesPerView: 3,
									},
								}}
								className={styles.slider}
							>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap} ${styles.logoBox}`}>
											<img
												src={asset_citing.src}
												className={`${styles.imgOne} `}
												alt="Asset Citing & Optimisation"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<h4 className={`${styles.centerLogo} color_secondary f_w_s_b`}>
												Asset Citing & Optimisation
											</h4>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a
													href="/how-we-help/asset-citing-optimisation"
													className="text_xs text_uppercase f_w_m"
												>
													Know More
													<img src={hover_arrow.src} className="" alt="icon" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap} ${styles.logoBox}`}>
											<img src={ppas.src} className={`${styles.imgOne} `} alt="PPAs" />
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<h4 className={`${styles.centerLogo} color_secondary f_w_s_b`}>
												PPAs
											</h4>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a
													href="/how-we-help/ppas"
													className="text_xs text_uppercase f_w_m"
												>
													Know More
													<img src={hover_arrow.src} className="" alt="icon" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap} ${styles.logoBox}`}>
											<img
												src={strategy.src}
												className={`${styles.imgOne} `}
												alt="Strategy"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<h4 className={`${styles.centerLogo} color_secondary f_w_s_b`}>
												Strategy
											</h4>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a
													href="/how-we-help/strategy"
													className="text_xs text_uppercase f_w_m"
												>
													Know More
													<img src={hover_arrow.src} className="" alt="icon" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap} ${styles.logoBox}`}>
											<img
												src={portfolio_valuation.src}
												className={`${styles.imgOne} `}
												alt="Portfolio portfolio-valuationaluation"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<h4 className={`${styles.centerLogo} color_secondary f_w_s_b`}>
												Portfolio Valuation
											</h4>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a
													href="/how-we-help/portfolio-valuation"
													className="text_xs text_uppercase f_w_m"
												>
													Know More
													<img src={hover_arrow.src} className="" alt="icon" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap} ${styles.logoBox}`}>
											<img
												src={transaction_icon.src}
												className={`${styles.imgOne} `}
												alt="Transactions Support"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<h4 className={`${styles.centerLogo} color_secondary f_w_s_b`}>
												Transactions <br />
												Support
											</h4>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a
													href="/how-we-help/transactions-support"
													className="text_xs text_uppercase f_w_m"
												>
													Know More
													<img src={hover_arrow.src} className="" alt="icon" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
