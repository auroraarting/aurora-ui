// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeEvents.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import upcoming_img from "../../../public/img/events/upcoming_img.jpg";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import slider_arrow from "../../../public/img/icons/sliderArrow.svg";

// DATA //

/** HomeEvents Section */
export default function HomeEvents() {
	return (
		<section className={`${styles.HomeEvents}`}>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary f_w_m color_secondary">
						Join the leading <br className="hidden_md" />
						energy conversations
					</h2>
				</div>
				<div className={`${styles.sliderMain}`}>
					<Swiper
						modules={[Navigation]}
						slidesPerView={1}
						spaceBetween={15}
						grabCursor={true}
						autoHeight={true}
						speed={500}
						loop={true}
						navigation={{
							prevEl: "#customPrev",
							nextEl: "#customNext",
						}}
						className={styles.slider}
					>
						<SwiperSlide>
							<div className={`${styles.card} f_w_j`}>
								<div className={`${styles.content}`}>
									<img src={energy_transition.src} className="" alt="img" />
									<div
										className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
									>
										Upcoming Event
									</div>
									<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
										Aurora Energy Transition Summit Warsaw 2025
									</h2>
									<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
										<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
											<img
												src={calender.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>Feb 26, 2025</span>
										</p>
										<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>India</span>
										</p>
									</div>
								</div>
								<div className={`${styles.imageWrapper}`}>
									<img src={upcoming_img.src} className="width_100 b_r_20" alt="img" />
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={`${styles.card} f_w_j`}>
								<div className={`${styles.content}`}>
									<img src={energy_transition.src} className="" alt="img" />
									<div
										className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
									>
										Upcoming Event
									</div>
									<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
										Aurora Energy Transition Summit Warsaw 2025
									</h2>
									<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
										<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
											<img
												src={calender.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>Feb 26, 2025</span>
										</p>
										<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>India</span>
										</p>
									</div>
								</div>
								<div className={`${styles.imageWrapper}`}>
									<img src={upcoming_img.src} className="width_100 b_r_20" alt="img" />
								</div>
							</div>
						</SwiperSlide>
					</Swiper>
					<div className={`${styles.arrowSection} f_w_a_j_center`}>
						<button className={`${styles.customPrev}`} id="customPrev">
							<img src={slider_arrow.src} alt="icon" />
						</button>
						<button className={styles.customNext} id="customNext">
							<img src={slider_arrow.src} alt="icon" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
