"use client";

// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "./ContentFromCms";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/components/TestimonialFeedback.module.scss";

// IMAGES //
import quate from "/public/img/icons/quate.svg";
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

/** TestimonialFeedback Section */
export default function TestimonialFeedback({ data, hideId }) {
	let obj = {};
	// if (!hideId) {
	// 	obj.id = "testimonial";
	// 	obj["data-name"] = "Testimonial";
	// }

	if (!data || !data?.testimonials) {
		return <></>;
	}
	return (
		<section
			className={`${styles.TestimonialFeedback}`}
			{...obj}
			aria-label="testimonial"
			title="testimonial"
		>
			<div className="container">
				<div className={`${styles.testimonialBox}`}>
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
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							className={styles.slider}
						>
							{data?.testimonials?.nodes?.map((item, ind) => {
								return (
									<SwiperSlide key={ind}>
										<div className={`${styles.testimonialItem}`}>
											<div className={`${styles.testimonialTxt}`}>
												<div className="text_reg color_dark_gray f_w_i font_primary d_f">
													<img
														src={quate.src}
														className={`${styles.quate}`}
														alt="quate"
														loading="lazy"
													/>
													<ContentFromCms>{item?.content}</ContentFromCms>
												</div>
											</div>
											<div className={`d_f relative ${styles.nameTxtWrap}`}>
												<div className={`${styles.nameTxt}`}>
													<h5 className="text_md ont_primary f_w_m color_secondary">
														{item?.title}
													</h5>
													<p className="text_xs color_dark_gray f_w_m ">
														{item?.testimonials?.designation || item?.designation}
													</p>
												</div>
												{data?.testimonials?.nodes?.length > 1 && (
													<div className={`${styles.arrowSection} f_w_a_j_center`}>
														<button
															className={`${styles.customPrev}`}
															id="customPrev"
															role="button"
														>
															<img src={slider_arrow.src} alt="icon" loading="lazy" />
														</button>
														<button
															className={styles.customNext}
															id="customNext"
															role="button"
														>
															<img src={slider_arrow.src} alt="icon" loading="lazy" />
														</button>
													</div>
												)}
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
}
