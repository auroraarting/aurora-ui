/* eslint-disable @next/next/no-img-element */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import AccordianCommon from "@/components/AccordianCommon";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/components/IntegratedSystem.module.scss";

// IMAGES //
import system_one from "../../public/img/softwares/system_one.jpg";
import turbine_img from "../../public/img/softwares/turbine_img.jpg";
import solar_img from "../../public/img/softwares/solar_img.jpg";
import amun_logo from "../../public/img/softwares/amun_logo.png";
import origin_logo from "../../public/img/softwares/origin_logo.png";
import lumus_logo from "../../public/img/softwares/lumus_logo.png";
import hover_arrow from "../../public/img/softwares/hover_arrow.svg";

// DATA //

/** IntegratedSystem Section */
export default function IntegratedSystem() {
	return (
		<section className={`${styles.IntegratedSystem} pb_100`}>
			<div className="container">
				<div className={`${styles.integratedSystemFlex} f_w_j`}>
					<div className={`${styles.title_wrap}`}>
						<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
							Integrated system, endless possibilities
						</h2>
						<p className="text_reg color_dark_gray">
							Chronos is just one part of Aurora’s EOS Platform, a software designed to
							tackle every energy challenge. From scenario modelling to bespoke
							advisory services, we’re your partner in progress.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="secondary" variant="filled" shape="rounded">
								Explore More
							</Button>
						</div>
					</div>
					<div className={`${styles.integratedImgMain}`}>
						<div className={`${styles.integratedImgBox} `}>
							<Swiper
								modules={[Navigation, Pagination, Autoplay]}
								slidesPerView={2}
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
								pagination={{
									clickable: true, // Makes it interactive
								}}
								breakpoints={{
									767: {
										slidesPerView: 2,
									},
									768: {
										slidesPerView: 3,
									},
								}}
								className={styles.slider}
							>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={system_one.src}
												className={`${styles.imgOne} `}
												alt="img"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={origin_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxOne}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={turbine_img.src}
												className={`${styles.imgOne} `}
												alt="img"
											/>
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={amun_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxTwo}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img src={solar_img.src} className={`${styles.imgOne} `} alt="img" />
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={lumus_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxThree}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide>
									<div className={`${styles.itemBox}`}>
										<div className={`${styles.itemBoxWrap}`}>
											<img src={solar_img.src} className={`${styles.imgOne} `} alt="img" />
										</div>
										<div className={`${styles.itemBoxWrap}`}>
											<img
												src={lumus_logo.src}
												className={`${styles.centerLogo}`}
												alt="img"
											/>
											<div className={`${styles.hoverBox} ${styles.hoverBoxThree}`}>
												<a href="#" className="text_xs text_uppercase f_w_m">
													Know More
													<img src={hover_arrow.src} className="" alt="img" />
												</a>
											</div>
										</div>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
