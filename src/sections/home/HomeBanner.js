/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

// MODULES //
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import LottieRenderer from "@/components/LottieRenderer";

// SECTIONS //

// PLUGINS //
// import Lottie from "lottie-web";
import { useInView } from "react-intersection-observer";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Vimeo from "@u-wave/react-vimeo";

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";
import EqualHeight from "../../utils/EqualHeight";

// STYLES //
import styles from "@/styles/sections/home/HomeBanner.module.scss";

// IMAGES //
import bannerGraph from "../../../public/img/home/banner-graph.png";

// DATA //

/** HomeBanner Section */
export default function HomeBanner() {
	const lottieAnimations = [
		{ id: "1", src: "/img/home/lottie/bannerRightSide.json" },
	];

	return (
		<div className={styles.HomeBanner} aria-label="banner" title="banner">
			<div className={`${styles.BannerContentSection}`}>
				<div className="container">
					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						slidesPerView={1}
						spaceBetween={15}
						grabCursor={true}
						speed={500}
						loop={true}
						pagination={{
							clickable: true,
						}}
						className={styles.slider}
					>
						<SwiperSlide>
							<div className={`${styles.BannerInfo} f_w_j`}>
								<div className={`${styles.BannerContent}`}>
									<h1 className="text_xl f_w_m color_white pb_10 text_uppercase">
										LUMUS <br />
										PPA pricing made transparent
									</h1>
									{/* <p className="text_xl f_w_m color_white pb_15 text_uppercase">
										
									</p> */}
									<p className="text_reg color_silver_gray">
										Our advanced valuation software for Power Purchase Agreements,
										delivers unparalleled pricing transparency powered by deep market
										intelligence.
									</p>
									<div className={`${styles.bookBtnOne} pt_40`}>
										<a href="/software/lumus" role="button">
											<Button color="primary" variant="filled" shape="rounded" mode="dark">
												Discover Lumus
											</Button>
										</a>
									</div>
								</div>
								<div className={`${styles.VimeoBanner}`}>
									<Vimeo video="1087755868" width="100%" autoplay={false} responsive />
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={`${styles.BannerInfo} f_w_j`}>
								<div className={`${styles.BannerContent}`}>
									<h2 className="text_xl f_w_m color_white pb_10 text_uppercase">
										Bankable energy analytics that power investment decisions
									</h2>
									<p className="text_reg color_silver_gray">
										From long-term forecasts to on-demand software and strategic advisory,
										Aurora equips you with the insight and tools to make smarter energy
										decisions across every stage of the asset lifecycle.
									</p>
									<div
										// {...dynamicInsightsBtnProps()}
										className={`${styles.bookBtnOne} pt_40`}
									>
										<a href="/software" role="button">
											<Button color="primary" variant="filled" shape="rounded" mode="dark">
												Explore Now
											</Button>
										</a>
									</div>
								</div>
								<div className={`${styles.BannerImg}`}>
									{/* <img
								src={bannerGraph.src}
								className={`${styles.BannerGraph} width_100`}
								alt="Banner Graph"
							/> */}
									<DotLottieReact
										src={lottieAnimations[0].src}
										autoplay={true}
										loop={true}
										renderer="svg"
										renderersettings={{
											preserveAspectRatio: "xMidYMid meet",
										}}
									/>
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</div>
	);
}
