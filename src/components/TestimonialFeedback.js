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
import styles from "@/styles/components/TestimonialFeedback.module.scss";

// IMAGES //
import quate from "../../public/img/icons/quate.svg";
import slider_arrow from "../../public/img/icons/slider_arrow.svg";
import ContentFromCms from "./ContentFromCms";

// DATA //

/** TestimonialFeedback Section */
export default function TestimonialFeedback({ data }) {
	// const LogoData = [
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// 	{
	// 		logos: erste.src,
	// 	},
	// ];
	return (
		<section className={`${styles.TestimonialFeedback}`}>
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
							// autoplay={{
							// 	delay: 3000,
							// 	disableOnInteraction: false,
							// }}
							className={styles.slider}
						>
							{data.testimonials.nodes.map((item, ind) => {
								return (
									<SwiperSlide key={ind}>
										<div className={`${styles.testimonialItem}`}>
											<div className={`${styles.testimonialTxt}`}>
												<p className="text_md color_dark_gray f_w_i font_primary d_f">
													<img src={quate.src} className={`${styles.quate}`} alt="quate" />
													<ContentFromCms>{item.content}</ContentFromCms>
												</p>
											</div>
											<div className={`${styles.nameTxt}`}>
												<h5 className="text_lg ont_primary f_w_m color_secondary">
													{item.title}
												</h5>
												<p className="text_xs color_dark_gray f_w_m pt_10">
													{item.testimonials.designation}
												</p>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
							{/* <SwiperSlide>
								<div className={`${styles.testimonialItem}`}>
									<div className={`${styles.testimonialTxt}`}>
										<p className="text_md color_dark_gray f_w_i font_primary d_f">
											<img src={quate.src} className={`${styles.quate}`} alt="quate" />
											Lorem ipsum dolor sit amet consectetur. Mauris scelerisque pharetra a
											tellus imperdiet. Porttitor leo vel morbi diam pulvinar massa nunc
											habitasse egestas.
										</p>
									</div>
									<div className={`${styles.nameTxt}`}>
										<h5 className="text_lg ont_primary f_w_m color_secondary">
											EQT Ventures
										</h5>
										<p className="text_xs color_dark_gray f_w_m pt_10">
											Senior Vice President
										</p>
									</div>
								</div>
							</SwiperSlide> */}
							{/* <SwiperSlide>
								<div className={`${styles.testimonialItem}`}>
									<div className={`${styles.testimonialTxt}`}>
										<p className="text_md color_dark_gray f_w_i font_primary d_f">
											<img src={quate.src} className={`${styles.quate}`} alt="quate" />
											Lorem ipsum dolor sit amet consectetur. Mauris scelerisque pharetra a
											tellus imperdiet. Porttitor leo vel morbi diam pulvinar massa nunc
											habitasse egestas.
										</p>
									</div>
									<div className={`${styles.nameTxt}`}>
										<h5 className="text_lg ont_primary f_w_m color_secondary">
											EQT Ventures
										</h5>
										<p className="text_xs color_dark_gray f_w_m pt_10">
											Senior Vice President
										</p>
									</div>
								</div>
							</SwiperSlide> */}
						</Swiper>
						{data.testimonials.nodes.length > 1 && (
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
			</div>
		</section>
	);
}
