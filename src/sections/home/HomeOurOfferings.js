// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeOurOfferings.module.scss";

// IMAGES //
import macEOS from "../../../public/img/home/mac-eos.png";

// DATA //

/** HomeOurOfferings Section */
export default function HomeOurOfferings() {
	return (
		<section className={`${styles.HomeOurOfferings} pt_100`}>
			<h3 className="text_lg color_secondary text_center">
				We provide our clients with data-driven intelligence for{" "}
				<br className="visible_lg" /> strategy, portfolio management and investment
				<br className="visible_lg" />
				decisions on the global energy transformation
			</h3>
			<div className={`${styles.OurOfferingSlider} pt_60`}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					spaceBetween={0}
					grabCursor={true}
					speed={500}
					loop={true}
					slidesPerView="auto"
					// autoplay={{
					// 	delay: 3000,
					// 	disableOnInteraction: false,
					// }}
					pagination={{
						clickable: true, // Makes it interactive
					}}
					breakpoints={{
						767: {},
						768: {},
					}}
					className={styles.slider}
				>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<h4 className="text_md f_w_m color_white pb_20">EOS Platform</h4>
							<p className="text_reg color_silver_gray pb_30">
								EOS centralizes Aurora’s data, software, forecasts, and insights,
								empowering energy professionals to make smarter, faster decisions.
							</p>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<h4 className="text_md f_w_m color_white pb_20">EOS Platform</h4>
							<p className="text_reg color_silver_gray pb_30">
								EOS centralizes Aurora’s data, software, forecasts, and insights,
								empowering energy professionals to make smarter, faster decisions.
							</p>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<h4 className="text_md f_w_m color_white pb_20">EOS Platform</h4>
							<p className="text_reg color_silver_gray pb_30">
								EOS centralizes Aurora’s data, software, forecasts, and insights,
								empowering energy professionals to make smarter, faster decisions.
							</p>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.itemBox}`}>
							<h4 className="text_md f_w_m color_white pb_20">EOS Platform</h4>
							<p className="text_reg color_silver_gray pb_30">
								EOS centralizes Aurora’s data, software, forecasts, and insights,
								empowering energy professionals to make smarter, faster decisions.
							</p>
							<img
								src={macEOS.src}
								alt="mac eos"
								className={`${styles.BoxImg} m_0_auto`}
							/>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</section>
	);
}
