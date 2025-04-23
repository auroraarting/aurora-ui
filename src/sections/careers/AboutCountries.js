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
// DATA //

/** AboutCountries Section */
export default function AboutCountries() {
	const localData = {
		list: [
			{
				name: "Market Research",
				description:
					"We provide deep market insights to shape your business strategy.",
				icon: {
					node: {
						sourceUrl: aboutBerlinIcn.src,
					},
				},
				image: {
					node: {
						sourceUrl: aboutBerlin.src,
					},
				},
				bgColor: "#18B59B",
			},
			{
				name: "Business Strategy",
				description: "Tailored strategies for scalable growth.",
				icon: {
					node: {
						sourceUrl: aboutBerlinIcn.src,
					},
				},
				image: {
					node: {
						sourceUrl: aboutBerlin.src,
					},
				},
				bgColor: "#C0C11B",
			},
			{
				name: "Product Innovation",
				description: "Innovative product development aligned with user needs.",
				icon: {
					node: {
						sourceUrl: aboutBerlinIcn.src,
					},
				},
				image: {
					node: {
						sourceUrl: aboutBerlin.src,
					},
				},
				bgColor: "#ffcc00",
			},
		],
	};

	return (
		<section className={`${styles.aboutCountries} pt_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
						About Berlin
					</h2>
				</div>
			</div>
			<div>
				<div className={`${styles.SliderMain} pt_20`}>
					<Swiper
						modules={[Navigation, Autoplay]}
						slidesPerView={1.1}
						spaceBetween={20}
						grabCursor={true}
						speed={500}
						loop={true}
						navigation={{
							prevEl: "#customPrevCollaboration",
							nextEl: "#customNextCollaboration",
						}}
						// autoplay={{
						//   delay: 3000,
						//   disableOnInteraction: false,
						// }}
						breakpoints={{
							768: {
								slidesPerView: 1.3,
							},
						}}
						className={styles.slider}
					>
						{localData.list.map((item, ind) => (
							<SwiperSlide key={item?.name + ind}>
								<div
									className={`${styles.cardItem} f_r_aj_between`}
									style={{ backgroundColor: item.bgColor }}
								>
									<div className={`${styles.cardDesc}`}>
										<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
											<img
												src={item.icon.node.sourceUrl}
												className={`${styles.strategy_icon}`}
												alt="strategy icon"
											/>
											{/* <span>{item.name}</span> */}
										</h4>
										<div>
											<p className="text_reg m_b_10 color_dark_gray">
												Berlin is home to three UNESCO World <br />
												Heritage Sites:{" "}
											</p>
										</div>
										<div className={styles.points}>
											<ul>
												<li className="text_reg color_dark_gray font_secondary f_w_r">
													Berlin Modernism Housing Estates
												</li>
												<li className="text_reg color_dark_gray font_secondary f_w_r">
													Museumsinsel (Museum Island)
												</li>
												<li className="text_reg color_dark_gray font_secondary f_w_r">
													Palaces and Parks of Potsdam
												</li>
											</ul>
											{/* <ContentFromCms>{item.description}</ContentFromCms> */}
										</div>
									</div>
									<div className={`${styles.cardImg}`}>
										<img
											src={item.image.node.sourceUrl}
											className={`${styles.countryImg} width_100`}
										/>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}
