"use client";
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
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

/** ConnectWithUs Section */
export default function ConnectWithUs({ data }) {
	return (
		<section className={`${styles.ConnectWithUs}`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_w_a`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary">
						Connect with us
					</h2>
					<a
						className={`${styles.bookBtn}`}
						href="https://www.instagram.com/lifeataurora"
						target="_blank"
						rel="noreferrer"
					>
						<Button color="primary" variant="filled" shape="rounded">
							Follow us on Instagram
						</Button>
					</a>
					<div className={`${styles.arrowSection} f_w_a_j_center`}>
						<button className={`${styles.customPrev}`} id="customPrevConnect">
							<img src={slider_arrow.src} alt="icon" />
						</button>
						<button className={styles.customNext} id="customNextConnect">
							<img src={slider_arrow.src} alt="icon" />
						</button>
					</div>
				</div>
			</div>
			<div className={`${styles.SliderMain}`}>
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={1.2}
					spaceBetween={20}
					grabCursor={true}
					speed={500}
					loop={true}
					navigation={{
						prevEl: "#customPrevConnect",
						nextEl: "#customNextConnect",
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
							<SwiperSlide key={ind}>
								<div className={`${styles.cardItem}`}>
									{item?.offices?.thumbnail?.node?.mediaItemUrl && (
										<div className={`${styles.cardImg}`}>
											<img
												src={item?.offices?.thumbnail?.node?.mediaItemUrl}
												className={`${styles.connectImg} b_r_10`}
												alt={item?.title}
											/>
										</div>
									)}
									<div className={`${styles.cardDesc} pt_20`}>
										<h4 className="text_reg color_secondary f_w_m font_primary">
											{item?.title}
										</h4>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
					{/* <SwiperSlide>
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
					</SwiperSlide> */}
				</Swiper>
			</div>
			{/* <div className="container">

			</div> */}
		</section>
	);
}
