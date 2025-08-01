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
import formatDate, { OpenIframePopup } from "@/utils";

// STYLES //
import styles from "@/styles/sections/events/TopEvents.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import upcoming_img from "../../../public/img/events/upcoming_img.jpg";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import slider_arrow from "/public/img/icons/slider_arrow.svg";

// DATA //

/** TopEvents Section */
export default function TopEvents({ list }) {
	return (
		<section className={`${styles.TopEvents}`}>
			<div className="container">
				<Swiper
					modules={[Navigation, Pagination, Autoplay]}
					slidesPerView={1}
					spaceBetween={0}
					grabCursor={true}
					speed={500}
					loop={false}
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
					{list?.map((data) => {
						let hrefObj = {};

						if (data?.events?.thumbnail?.externalUrl) {
							hrefObj.href = data?.events?.thumbnail?.externalUrl;
							hrefObj.onClick = (e) => {
								e?.preventDefault(); // Prevent navigation
								OpenIframePopup(
									"iframePopup",
									data?.events?.thumbnail?.externalUrl ||
										"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
								);
							};
							if (data?.events?.thumbnail?.openExternalInNewTab) {
								delete hrefObj.onClick;
								hrefObj.target = "_blank"; // Open in new tab
								hrefObj.rel = "noopener noreferrer"; // Security best practice
							}
						} else {
							hrefObj.href = `/events/${data?.slug}`;
						}

						return (
							<SwiperSlide key={data?.id}>
								<a
									// href={`/events/${data?.slug}`}
									{...hrefObj}
									className={`${styles.card} f_w_j`}
									key={data?.id}
								>
									<div className={`${styles.content}`}>
										<img
											src={data?.events?.thumbnail?.logo?.node?.mediaItemUrl}
											className={`${styles.Eventlogo} b_r_8`}
											alt="Event logo"
										/>
										<div
											className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
										>
											{data?.events?.thumbnail?.status} UPCOMING EVENT
										</div>
										<h2 className="color_white text_lg text_uppercase m_t_30 font_primary f_w_m">
											{data?.title}
										</h2>
										<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
											{data?.events?.thumbnail?.date && (
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={calender.src}
														className={`${styles.calender}`}
														alt="calender"
													/>
													<span>{formatDate(data?.events?.thumbnail?.date)}</span>
												</p>
											)}
											{data?.events?.thumbnail?.country?.nodes && (
												<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
													<img
														src={location.src}
														className={`${styles.location}`}
														alt="location"
													/>
													<span>
														{data?.events?.thumbnail?.country?.nodes?.map(
															(item) => item.title
														)}
													</span>
												</p>
											)}
										</div>
									</div>
									<div className={`${styles.imageWrapper}`}>
										<img
											src={data?.events?.banner?.desktop?.node?.mediaItemUrl}
											className="width_100 b_r_20"
											alt={data?.events?.thumbnail?.status}
										/>
									</div>
								</a>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
			{list.length > 1 && (
				<div className={`${styles.arrowSection} f_w_a_j_center`}>
					<button className={`${styles.customPrev}`} id="customPrev">
						<img src={slider_arrow.src} alt="icon" />
					</button>
					<button className={styles.customNext} id="customNext">
						<img src={slider_arrow.src} alt="icon" />
					</button>
				</div>
			)}
		</section>
	);
}
