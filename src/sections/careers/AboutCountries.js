"use client";
// MODULES //
import { useRef, useEffect, useState } from "react";
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
import styles from "@/styles/sections/careers/AboutCountries.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import teamsIcn01 from "../../../public/img/careers/teamsIcn01.svg";
import teamsIcn02 from "../../../public/img/careers/teamsIcn02.svg";
import teamsIcn03 from "../../../public/img/careers/teamsIcn03.svg";
import aboutBerlin from "../../../public/img/careers/aboutBerlin.jpg";
import aboutBerlinIcn from "../../../public/img/careers/aboutBerlinIcn.svg";
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

/** AboutCountries Section */
export default function AboutCountries({ data }) {
	if (!data?.earlyCareers?.collaborationSupport?.sectionTitle) {
		return null;
	}
	return (
		<section className={`${styles.aboutCountries} pt_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
						{data?.earlyCareers?.collaborationSupport?.sectionTitle}
					</h2>
					{data?.earlyCareers?.collaborationSupport?.list?.length > 0 && (
						<div className={`${styles.arrowSection} f_w_a_j_center`}>
							<button className={`${styles.customPrev}`} id="customPrevCountry">
								<img src={slider_arrow.src} alt="icon" />
							</button>
							<button className={styles.customNext} id="customNextCountry">
								<img src={slider_arrow.src} alt="icon" />
							</button>
						</div>
					)}
				</div>
			</div>
			{data?.earlyCareers?.collaborationSupport?.list?.length > 0 && (
				<div>
					<div className={`${styles.SliderMain} pt_20`}>
						<Swiper
							modules={[Navigation, Autoplay]}
							slidesPerView={1.6}
							spaceBetween={20}
							grabCursor={true}
							speed={500}
							loop={true}
							navigation={{
								prevEl: "#customPrevCountry",
								nextEl: "#customNextCountry",
							}}
							// autoplay={{
							//   delay: 3000,
							//   disableOnInteraction: false,
							// }}
							breakpoints={{
								768: {
									// slidesPerView: 1.3,
								},
							}}
							className={styles.slider}
						>
							{data?.earlyCareers?.collaborationSupport?.list.map((item, ind) => (
								<SwiperSlide key={(item?.name || "") + ind}>
									<div
										className={`${styles.cardItem} f_r_aj_between`}
										style={{ backgroundColor: item.bgcolor }}
									>
										<div className={`${styles.cardDesc}`}>
											{item.icon.node.mediaItemUrl && (
												<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
													<img
														src={item.icon.node.mediaItemUrl}
														className={`${styles.strategy_icon}`}
														alt="strategy icon"
													/>
												</h4>
											)}

											<div className={styles.points}>
												<div className="text_reg m_b_10 color_dark_gray">
													<ContentFromCms>{item?.desc}</ContentFromCms>
												</div>
											</div>
										</div>
										{item?.featuredImg?.node?.mediaItemUrl && (
											<div className={`${styles.cardImg}`}>
												<img
													src={item?.featuredImg?.node?.mediaItemUrl}
													className={`${styles.countryImg} width_100`}
												/>
											</div>
										)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			)}
		</section>
	);
}
