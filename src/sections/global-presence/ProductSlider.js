"use client";
/* eslint-disable @next/next/no-img-element */
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

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/ProductSlider.module.scss";

// IMAGES //
import chronos from "../../../public/img/global-presence/chronos.png";
import slider_arrow from "../../../public/img/icons/slider_arrow.svg";
import play from "@/../public/img/resources/aurora_insights/play.svg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** ProductSlider Section */
export default function ProductSlider({ data }) {
	if (!data) {
		return <></>;
	}
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
						className={styles.slider}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
					>
						{data?.map((slide, index) => (
							<SwiperSlide key={index}>
								<div className={`${styles.testimonialItem} f_w_j`}>
									<div className={`${styles.productLogoBox}`}>
										{!slide.videoLink ? (
											<div className={`${styles.LogoBox}`}>
												<img
													src={slide?.thumbnailImage?.node?.mediaItemUrl}
													className="img b_r_10"
													alt="software logo"
												/>
											</div>
										) : (
											<div className={`${styles.videoBox}`}>
												<LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
													<div data-src={slide.videoLink}>
														<img
															src={slide?.thumbnailImage?.node?.mediaItemUrl}
															className={`${styles.videoThumbnail} img b_r_10`}
															alt="video thumbnail"
														/>
														<img
															src={play.src}
															className={`${styles.playIcon} `}
															alt="play"
														/>
													</div>
												</LightGallery>
											</div>
										)}
									</div>
									<div className={`${styles.testimonialTxt}`}>
										<h3 className="text_lg color_secondary pb_10">{slide.heading}</h3>
										{slide?.description && (
											<div className={`${styles.content} text_reg color_dark_gray`}>
												<ContentFromCms>{slide?.description}</ContentFromCms>
											</div>
										)}
										{slide?.buttonLink && (
											<div className={`${styles.bookBtnOne} pt_20`}>
												<a href={slide?.buttonLink} target="_blank" rel="noreferrer">
													<Button color="primary" variant="filled" shape="rounded">
														{slide?.buttonText}
													</Button>
												</a>
											</div>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					{data?.length > 1 && (
						<div className={`${styles.arrowSection} f_w_a_j_center`}>
							<button className={`${styles.customPrev}`} id="customPrev">
								<img src={slider_arrow.src} alt="icon" />
							</button>
							<button className={styles.customNext} id="customNext">
								<img src={slider_arrow.src} alt="icon" />
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
