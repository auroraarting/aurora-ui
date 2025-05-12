"use client";
// MODULES //
import { useEffect } from "react";

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
import formatDate from "@/utils";
import EqualHeight from "@/utils/EqualHeight";

// STYLES //
import styles from "@/styles/sections/company/press-releases/TopMedia.module.scss";

// IMAGES //
import press_img from "/public/img/media-center/press_img.jpg";
import clock from "/public/img/icons/clock.svg";
import white_calendar from "/public/img/icons/white_calendar.svg";
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

/** TopMedia Section */
export default function TopMedia({ data }) {
	useEffect(() => {
		EqualHeight("topMedia");
	}, []);

	return (
		<section className={`${styles.TopMedia}`}>
			<div className="container">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={1}
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
					// pagination={{
					// 	clickable: true, // Makes it interactive
					// }}
					className={styles.slider}
				>
					{data?.map((item) => {
						return (
							<SwiperSlide key={item?.title}>
								<div className={`${styles.card} topMedia f_w_j`} key={item.title}>
									<a
										href={`/company/press-releases/${item?.slug}`}
										className={`${styles.content}`}
									>
										<div
											className={`${styles.categoryTxt} text_xs font_primary text_uppercase color_medium_gray`}
										>
											Press Release
										</div>
										<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
											{item?.title}
										</h2>
										<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
											{item?.date && (
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={white_calendar.src}
														className={`${styles.calender}`}
														alt="calender"
													/>
													<span>{formatDate(item?.date)}</span>
												</p>
											)}
											{item?.postFields?.time && (
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={clock.src}
														className={`${styles.location}`}
														alt="location"
													/>
													<span>{item?.postFields?.time}</span>
												</p>
											)}
										</div>
									</a>
									{item?.featuredImage?.node?.mediaItemUrl && (
										<div className={`${styles.imageWrapper}`}>
											<img
												src={item?.featuredImage?.node?.mediaItemUrl}
												className="width_100 b_r_20"
												alt="img"
											/>
										</div>
									)}
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
				{data.length > 1 && (
					<div className={`${styles.arrowSection} f_w_a_j_center`}>
						<button className={`${styles.customPrev}`} id="customPrev">
							<img src={slider_arrow.src} alt="icon" />
						</button>
						<button className={styles.customNext} id="customNext">
							<img src={slider_arrow.src} alt="icon" />
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
