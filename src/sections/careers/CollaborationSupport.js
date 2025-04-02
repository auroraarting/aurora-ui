// MODULES //

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
import styles from "@/styles/sections/careers/CollaborationSupport.module.scss";

// IMAGES //
import strategy_img from "../../../public/img/careers/strategy_img.jpg";
import strategy_icon from "../../../public/img/careers/strategy_icon.svg";
import slider_arrow from "../../../public/img/icons/slider_arrow.svg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** CollaborationSupport Section */
export default function CollaborationSupport({ data }) {
	return (
		<section className={`${styles.CollaborationSupport} ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
						Collaboration & Support
					</h2>
				</div>
				<div className={`${styles.arrowSection} f_w_a_j_center`}>
					<button className={`${styles.customPrev}`} id="customPrevCollaboration">
						<img src={slider_arrow.src} alt="icon" />
					</button>
					<button className={styles.customNext} id="customNextCollaboration">
						<img src={slider_arrow.src} alt="icon" />
					</button>
				</div>
			</div>
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
					// 	delay: 3000,
					// 	disableOnInteraction: false,
					// }}
					breakpoints={{
						768: {
							slidesPerView: 1.3,
						},
					}}
					className={styles.slider}
				>
					{data.list?.map((item, ind) => {
						return (
							<SwiperSlide key={item.name + ind}>
								<div className={`${styles.cardItem} f_r_aj_between`}>
									<div className={`${styles.cardDesc}`}>
										<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
											<img
												src={item.icon.node.sourceUrl || strategy_icon.src}
												className={`${styles.strategy_icon}`}
												alt="strategy icon"
											/>
											<span>{item.name}</span>
										</h4>
										<div className="text_reg color_dark_gray font_secondary f_w_r pt_10">
											<ContentFromCms>{item.description}</ContentFromCms>
										</div>
									</div>
									<div className={`${styles.cardImg}`}>
										<img
											src={item.image.node.sourceUrl || strategy_img.src}
											className={`${styles.countryImg} width_100`}
										/>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
					{data.list?.length === 0 && (
						<>
							<SwiperSlide>
								<div className={`${styles.cardItem} f_r_aj_between`}>
									<div className={`${styles.cardDesc}`}>
										<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
											<img
												src={strategy_icon.src}
												className={`${styles.strategy_icon}`}
												alt="strategy icon"
											/>
											<span>Strategy Days</span>
										</h4>
										<p className="text_reg color_dark_gray font_secondary f_w_r pt_10">
											We host regular team strategy days, uniting members worldwide for
											face-to-face collaboration. These sessions are vital for exchanging
											ideas, strategising for the year ahead, and ensuring organisational
											alignment, encouraging teamwork toward a common objective.
										</p>
									</div>
									<div className={`${styles.cardImg}`}>
										<img
											src={strategy_img.src}
											className={`${styles.countryImg} width_100`}
										/>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.cardItem} f_r_aj_between`}>
									<div className={`${styles.cardDesc}`}>
										<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
											<img
												src={strategy_icon.src}
												className={`${styles.strategy_icon}`}
												alt="strategy icon"
											/>
											<span>Offsites</span>
										</h4>
										<p className="text_reg color_dark_gray font_secondary f_w_r pt_10">
											Teamwork is fundamental to our culture, evident both in and outside
											the office! Our Offsite events feature engaging team-building
											activities, from constructing bamboo rollercoasters to attending
											painting classes, and the opportunity to strengthen social bonds
											among colleagues.
										</p>
									</div>
									<div className={`${styles.cardImg}`}>
										<img
											src={strategy_img.src}
											className={`${styles.countryImg} width_100`}
										/>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`${styles.cardItem} f_r_aj_between`}>
									<div className={`${styles.cardDesc}`}>
										<h4 className="text_md color_secondary f_w_m font_primary pt_10 f_r_a_center">
											<img
												src={strategy_icon.src}
												className={`${styles.strategy_icon}`}
												alt="strategy icon"
											/>
											<span>Strategy Days</span>
										</h4>
										<p className="text_reg color_dark_gray font_secondary f_w_r pt_10">
											We host regular team strategy days, uniting members worldwide for
											face-to-face collaboration. These sessions are vital for exchanging
											ideas, strategising for the year ahead, and ensuring organisational
											alignment, encouraging teamwork toward a common objective.
										</p>
									</div>
									<div className={`${styles.cardImg}`}>
										<img
											src={strategy_img.src}
											className={`${styles.countryImg} width_100`}
										/>
									</div>
								</div>
							</SwiperSlide>
						</>
					)}
				</Swiper>
			</div>
		</section>
	);
}
