"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/about/OurHistory.module.scss";

// IMAGES //
import history_img from "../../../../public/img/company/about/history_img.jpg";

// DATA //

/** OurHistory Section */
export default function OurHistory({ data }) {
	if (!data?.sectionTitle) return <></>;

	return (
		<section className={`${styles.OurHistory}`}>
			<div className="container">
				<div className={`${styles.integratedSystemFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							{data?.sectionTitle}
						</h2>
						<div className="text_reg color_dark_gray pb_20">
							<ContentFromCms>{data?.description}</ContentFromCms>
						</div>
						{/* <p className="text_reg color_dark_gray pb_20">
							Founded by University of Oxford professors and economists who saw the
							need for a deeper focus on quality analysis, Aurora has grown to become
							the largest dedicated power analytics provider in Europe.
						</p>
						<p className="text_reg color_dark_gray">
							We are a diverse team of over 800 experts with vast energy, financial and
							consulting backgrounds, working towards the common goal to help you make
							sensible long-term strategic decisions.
						</p> */}
					</div>
					<div className={`${styles.integratedImgMain}`}>
						<div className={`${styles.integratedImgBox} `}>
							<Swiper
								modules={[Navigation, Pagination, Autoplay]}
								slidesPerView={1}
								spaceBetween={15}
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
								className={styles.slider}
							>
								{data?.gallery?.nodes?.map((item, ind) => {
									return (
										<SwiperSlide key={ind}>
											<div className={`${styles.itemBox}`}>
												<img
													src={item?.mediaItemUrl}
													className={`${styles.imgOne} widht_100 b_r_20`}
													alt="img"
												/>
											</div>
										</SwiperSlide>
									);
								})}
								{/* <SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<img
											src={history_img.src}
											className={`${styles.imgOne} widht_100 b_r_20`}
											alt="img"
										/>
									</div>
								</SwiperSlide> */}
								{/*<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<img
											src={history_img.src}
											className={`${styles.imgOne} widht_100 b_r_20`}
											alt="img"
										/>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<img
											src={history_img.src}
											className={`${styles.imgOne} widht_100 b_r_20`}
											alt="img"
										/>
									</div>
								</SwiperSlide> */}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
