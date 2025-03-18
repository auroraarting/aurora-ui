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
import styles from "@/styles/sections/careers/ConnectWithUs.module.scss";

// IMAGES //
import connect_img from "../../../public/img/careers/connect_img.jpg";
import location from "../../../public/img/icons/location.svg";

// DATA //

/** ConnectWithUs Section */
export default function ConnectWithUs() {
	return (
		<section className={`${styles.ConnectWithUs}`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary">
						Connect with us
					</h2>
					<div className={`${styles.bookBtn}`}>
						<Button color="primary" variant="filled" shape="rounded">
							Follow us on Instagram
						</Button>
					</div>
				</div>
			</div>
			<div className={`${styles.SliderMain}`}>
				<Swiper
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
							slidesPerView: 2.1,
							spaceBetween: 20,
						},
						992: {
							slidesPerView: 3.2,
							spaceBetween: 20,
						},
					}}
					className={styles.slider}
				>
					<SwiperSlide>
						<div className={`${styles.cardItem}`}>
							<div className={`${styles.cardImg}`}>
								<img src={connect_img.src} className={`${styles.connectImg} b_r_10`} />
							</div>
							<div className={`${styles.cardDesc} pt_20`}>
								<h4 className="text_reg color_secondary f_w_m font_primary">Athens</h4>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.cardItem}`}>
							<div className={`${styles.cardImg}`}>
								<img src={connect_img.src} className={`${styles.connectImg} b_r_10`} />
							</div>
							<div className={`${styles.cardDesc} pt_20`}>
								<h4 className="text_reg color_secondary f_w_m font_primary">Athens</h4>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.cardItem}`}>
							<div className={`${styles.cardImg}`}>
								<img src={connect_img.src} className={`${styles.connectImg} b_r_10`} />
							</div>
							<div className={`${styles.cardDesc} pt_20`}>
								<h4 className="text_reg color_secondary f_w_m font_primary">Athens</h4>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.cardItem}`}>
							<div className={`${styles.cardImg}`}>
								<img src={connect_img.src} className={`${styles.connectImg} b_r_10`} />
							</div>
							<div className={`${styles.cardDesc} pt_20`}>
								<h4 className="text_reg color_secondary f_w_m font_primary">Athens</h4>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={`${styles.cardItem}`}>
							<div className={`${styles.cardImg}`}>
								<img src={connect_img.src} className={`${styles.connectImg} b_r_10`} />
							</div>
							<div className={`${styles.cardDesc} pt_20`}>
								<h4 className="text_reg color_secondary f_w_m font_primary">Athens</h4>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
			{/* <div className="container">
				
			</div> */}
		</section>
	);
}
