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
import { Autoplay, Navigation } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeEvents.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import upcoming_img from "../../../public/img/events/upcoming_img.jpg";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import slider_arrow from "../../../public/img/icons/sliderArrow.svg";
import formatDate, { OpenIframePopup } from "@/utils";

// DATA //

/** HomeEvents Section */
export default function HomeEvents({ data }) {
	// console.log(data);
	return (
		<section
			className={`${styles.HomeEvents}`}
			aria-label="events section"
			title="events section"
		>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary color_secondary">
						Join the leading <br className="hidden_md" />
						energy conversations
					</h2>
				</div>
				<div className={`${styles.sliderMain}`}>
					<Swiper
						modules={[Navigation, Autoplay]}
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
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
					>
						{data?.map((item) => {
							let hrefObj = {};

							if (item?.events?.thumbnail?.externalUrl) {
								// hrefObj.href = item?.events?.thumbnail?.externalUrl;
								// hrefObj.target = "_blank";
								// hrefObj.rel = "noreferrer";
								hrefObj.onClick = () =>
									OpenIframePopup(
										"iframePopup",
										item?.events?.thumbnail?.externalUrl ||
											"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
									);
								if (item?.events?.thumbnail?.openExternalInNewTab) {
									delete hrefObj.onClick;
									hrefObj.target = "_blank"; // Open in new tab
									hrefObj.rel = "noopener noreferrer"; // Security best practice
								}
							} else {
								hrefObj.href = `/events/${item?.slug}`;
							}

							return (
								<SwiperSlide key={item?.title} className="pb_20">
									<a
										// href={`/events/${item?.slug}`}
										{...hrefObj}
										className={`${styles.card} f_w_j`}
										role="button"
									>
										<div className={`${styles.content}`}>
											<img
												src={item?.events?.thumbnail?.logo?.node?.mediaItemUrl}
												className={`${styles.Eventlogo}`}
												alt="logo img"
												loading="lazy"
											/>
											<div
												className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
											>
												{item?.events?.thumbnail?.status} UPCOMING EVENT
											</div>

											<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
												{item?.title}
											</h2>
											<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={calender.src}
														className={`${styles.calender}`}
														alt="calender"
														loading="lazy"
													/>
													<span>{formatDate(item?.events?.thumbnail?.date)}</span>
												</p>
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={location.src}
														className={`${styles.location}`}
														alt="location"
														loading="lazy"
													/>
													<span>
														{item?.events?.thumbnail?.country?.nodes?.map(
															(item2) => item2?.title
														)}
													</span>
												</p>
											</div>
										</div>
										{item?.events?.banner?.desktop?.node?.mediaItemUrl && (
											<div className={`${styles.imageWrapper}`}>
												<img
													src={item?.events?.banner?.desktop?.node?.mediaItemUrl}
													className="width_100 b_r_20"
													alt={item?.events?.thumbnail?.status}
													loading="lazy"
												/>
											</div>
										)}
									</a>
								</SwiperSlide>
							);
						})}
					</Swiper>
					{data?.length > 1 && (
						<div className={`${styles.arrowSection} f_w_a_j_center`}>
							<button className={`${styles.customPrev}`} id="customPrev" role="button">
								<img src={slider_arrow.src} alt="icon" loading="lazy" />
							</button>
							<button className={styles.customNext} id="customNext" role="button">
								<img src={slider_arrow.src} alt="icon" loading="lazy" />
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
