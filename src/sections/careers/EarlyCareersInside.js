"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useEffect, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/EarlyCareersInside.module.scss";

// IMAGES //
import country_img from "../../../public/img/careers/country_img.png";
import location from "../../../public/img/icons/location.svg";
import slider_arrow_black from "../../../public/img/icons/slider_arrow_black.svg";

// DATA //

/** EarlyCareers Section */
export default function EarlyCareersInside({ data }) {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);

	useEffect(() => {
		if (
			swiperRef.current &&
			prevRef.current &&
			nextRef.current &&
			swiperRef.current.swiper
		) {
			swiperRef.current.swiper.params.navigation.prevEl = prevRef.current;
			swiperRef.current.swiper.params.navigation.nextEl = nextRef.current;
			swiperRef.current.swiper.navigation.destroy();
			swiperRef.current.swiper.navigation.init();
			swiperRef.current.swiper.navigation.update();
		}
	}, []);

	return (
		<section className={`${styles.EarlyCareers} pb_50`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white">Early Careers</h2>
					<a href="/careers/early-careers" className={`${styles.bookBtn}`}>
						<Button color="primary" variant="filled" shape="rounded" mode="dark">
							Explore
						</Button>
					</a>
				</div>
				<div className={`${styles.arrowSection} f_w_a_j_center`}>
					<button ref={prevRef} className={styles.customPrev}>
						<img src={slider_arrow_black.src} alt="icon" />
					</button>
					<button ref={nextRef} className={styles.customNext}>
						<img src={slider_arrow_black.src} alt="icon" />
					</button>
				</div>
			</div>
			<div className={`${styles.SliderMain} pt_20`}>
				<Swiper
					ref={swiperRef}
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={1.1}
					spaceBetween={20}
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
					// pagination={{
					// 	el: ".other-slider", // Attach to a pagination container
					// 	type: "progressbar", // Choose 'progressbar' type
					// 	clickable: true, // Makes it interactive
					// }}
					breakpoints={{
						768: {
							slidesPerView: 2.2,
							spaceBetween: 20,
						},
						992: {
							slidesPerView: 3.2,
							spaceBetween: 20,
						},
					}}
					className={styles.slider}
				>
					{data?.map((item, ind) => {
						return (
							<SwiperSlide key={item?.title + ind}>
								<div className={`${styles.cardItem}`} key={item?.slug}>
									<a href={`/careers/early-careers/${item?.slug}`}>
										<div className={`${styles.cardImg}`}>
											<img
												src={item?.earlyCareers?.thumbnail?.thumb?.node?.mediaItemUrl}
												className={`${styles.countryImg} b_r_10`}
												alt={
													item?.earlyCareers?.thumbnail?.country?.node?.title ||
													item?.earlyCareers?.banner?.city
												}
											/>
											{item?.earlyCareers?.thumbnail?.islive && (
												<p
													className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
												>
													Live
												</p>
											)}
										</div>
										<div className={`${styles.cardDesc} pt_30`}>
											<p className="text_xs color_white color_platinum_gray f_r_a_center text_uppercase">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>
													{item?.earlyCareers?.thumbnail?.country?.node?.title ||
														item?.earlyCareers?.banner?.city}
												</span>
											</p>
											<h4 className="text_md color_white f_w_m font_primary pt_10">
												{item?.title}
											</h4>
											<div className={`${styles.btn_box} pt_30`}>
												<Button color="secondary" variant="underline" mode="dark">
													Read More
												</Button>
												{/* <a href={`/careers/early-careers/${item?.slug}`}>
													
												</a> */}
											</div>
										</div>
									</a>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{/* <div className="container">

			</div> */}
		</section>
	);
}
