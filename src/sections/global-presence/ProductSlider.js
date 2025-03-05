// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/ProductSlider.module.scss";

// IMAGES //
import chronos from "../../../public/img/global-presence/chronos.png";
import slider_arrow from "../../../public/img/icons/slider_arrow.svg";

// DATA //

/** ProductSlider Section */
export default function ProductSlider() {
	return (
		<section className={`${styles.ProductSlider}`}>
			<div className="containerLarge">
				<div className={`${styles.testimonialWhiteBox}`}>
					<Swiper
						modules={[Navigation, Autoplay]}
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
						className={styles.slider}
					>
						<SwiperSlide>
							<div className={`${styles.testimonialItem} f_w_j`}>
								<div className={`${styles.productLogoBox}`}>
									<img src={chronos.src} className="img b_r_10" alt="logo" />
								</div>
								<div className={`${styles.testimonialTxt}`}>
									<h3 className="text_lg color_secondary pb_10">
										Bankable battery valuations at your fingertips
									</h3>
									<p className="text_reg color_dark_gray">
										Our leading bankable battery valuation tool, Chronos, is now available
										in Australia. If you want to learn about how Chronos can help you with
										you next energy storage project, get in touch now!
									</p>
									<div className={`${styles.bookBtnOne} pt_20`}>
										<Button color="primary" variant="filled" shape="rounded">
											Read More
										</Button>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className={`${styles.testimonialItem} f_w_j`}>
								<div className={`${styles.productLogoBox}`}>
									<img src={chronos.src} className="img b_r_10" alt="logo" />
								</div>
								<div className={`${styles.testimonialTxt}`}>
									<h3 className="text_lg color_secondary pb_10">
										Bankable battery valuations at your fingertips
									</h3>
									<p className="text_reg color_dark_gray">
										Our leading bankable battery valuation tool, Chronos, is now available
										in Australia. If you want to learn about how Chronos can help you with
										you next energy storage project, get in touch now!
									</p>
									<div className={`${styles.bookBtnOne} pt_20`}>
										<Button color="primary" variant="filled" shape="rounded">
											Read More
										</Button>
									</div>
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
