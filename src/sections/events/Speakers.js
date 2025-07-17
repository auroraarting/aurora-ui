"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/Speakers.module.scss";

// IMAGES //
import management_img from "../../../public/img/events/management_img.jpg";
import hoverEffect from "../../../public/img/events/hoverEffect.png";
import profile_pic from "../../../public/img/events/profile_pic.png";
import slider_arrow from "../../../public/img/icons/slider_arrow.svg";
import popup_close from "../../../public/img/icons/popup_close.svg";
import location from "../../../public/img/icons/location.svg";
import clock from "../../../public/img/icons/clock.svg";

// DATA //

/** Speakers Section */
export default function Speakers({ data, title, desc }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [slideNo, setSlideNo] = useState(0);
	const [openPop1, setOpenPop1] = useState(false);
	const sliderRef = useRef(null);

	/** handleSlideClick Function */
	const handleSlideClick1 = (e, index) => {
		e.preventDefault();
		setSlideNo(index);
		setIsPopupOpen(true);
		setOpenPop1(true);
	};

	/** handleClosePopup Function */
	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setSlideNo(0);
	};

	useEffect(() => {
		if (sliderRef.current?.swiper) {
			sliderRef.current.swiper.slideTo(slideNo);
		}
	}, [slideNo]);

	const eventSpeakersData = [];
	data?.map((item) => {
		item?.speakers?.nodes?.map((item2) => {
			eventSpeakersData.push({
				name: item2?.title,
				designation: item2?.postSpeakers?.thumbnail?.designation,
				desc: item2?.content || "",
				thumbnail: item2?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl,
				sessions: item?.sessions?.map((item3) => {
					return {
						time: item3?.time,
						topicName: item3?.title,
						timeDateSession: item3?.timeSlot,
						locationSession: item3?.address,
					};
				}),
			});
		});
	});

	return (
		<section className={`${styles.Speakers}`} id="speakers" data-name="Speakers">
			<div className="container">
				<div className={`${styles.titleWrapper}`}>
					<h2 className="text_xl font_primary color_secondary pb_10">{title}</h2>
					<p className={`${styles.label} text_reg color_dark_gray`}>{desc}</p>
				</div>
				<div className={`${styles.content_main_wrap} pt_20`}>
					<div className={`${styles.box_wrap}`}>
						{eventSpeakersData?.map((item, ind) => {
							return (
								<div
									className={`${styles.box_item}`}
									key={ind}
									onClick={(e) => handleSlideClick1(e, ind)}
									data-slide={ind}
								>
									<div className={`${styles.thumbnailImg}`}>
										<img src={item?.thumbnail} className="b_r_20" alt={item?.name} />
									</div>
									<div className={`${styles.content} pt_20`}>
										<h5 className="text_reg f_w_m color_white font_secondary">
											{item?.name}
										</h5>
										<p className="text_xs color_platinum_gray">{item?.designation}</p>
									</div>
									<div className={`${styles.hoverEffect} pt_20`}>
										<img src={hoverEffect.src} className="" alt=" img" />
									</div>
								</div>
							);
						})}
					</div>
					{/*  */}
				</div>
			</div>

			{isPopupOpen && (
				<div className={styles.popup}>
					<div className={`${styles.Overlay}`} onClick={handleClosePopup}></div>
					<div
						className={`${styles.popup_content} popup_content`}
						onClick={(e) => e.stopPropagation()}
					>
						<button className={styles.close_btn} onClick={handleClosePopup}>
							<img src={popup_close.src} alt="" />
						</button>
						<div>
							{openPop1 && (
								<div data-lenis-prevent>
									<Swiper
										modules={[
											Navigation,
											// Autoplay
										]}
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
										ref={sliderRef}
										// autoplay={{
										// 	delay: 3000,
										// 	disableOnInteraction: false,
										// }}
									>
										{eventSpeakersData?.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img src={item.thumbnail} className="b_r_20" alt={item.name} />
															<div className={`${styles.popUp}`}>
																<img src={hoverEffect.src} className="b_r_20" alt=" img" />
															</div>
														</div>
														<div className={`${styles.Details}`}>
															<div className={`${styles.boxName}`}>
																<h5
																	className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
																>
																	{item.name}
																</h5>
																<p className="text_xs color_silver_gray l_h_6">
																	{item.designation}
																</p>
															</div>
															<p className={`${styles.Desc} text_xs color_silver_gray`}>
																{parse(item?.desc || "")}
															</p>
														</div>
													</div>
													{item?.sessions?.length > 0 && (
														<div className={`${styles.sessionWapper}`}>
															<h3 className="text_lg color_white">Session</h3>
															{item?.sessions?.map((session, index) => (
																<div className={`${styles.sessionBox} f_w`} key={index}>
																	<div className={`${styles.sessionTime}`}>
																		<p
																			className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
																		>
																			{session.time}
																		</p>
																	</div>
																	<div className={`${styles.sessionDescription}`}>
																		<h4 className="text_xs font_primary color_white f_w_s_b">
																			{session.topicName}
																		</h4>
																		<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
																			<p className="text_xs f_w_m color_silver_gray text_uppercase f_r_a_center">
																				<img
																					src={clock.src}
																					className={`${styles.clock}`}
																					alt="clock"
																				/>
																				<span>{session.timeDateSession}</span>
																			</p>
																			<p className="text_xs f_w_m color_silver_gray  f_r_a_center">
																				<img
																					src={location.src}
																					className={`${styles.location}`}
																					alt="location"
																				/>
																				<span>{session.locationSession}</span>
																			</p>
																		</div>
																		<div className={`${styles.ClientFlex} f_r_a_center`}>
																			<div className={`${styles.ClientLogo}`}>
																				<img src={item.thumbnail} alt={item.name} />
																			</div>
																			<div className={`${styles.ClientDescription}`}>
																				<h5 className="text_xs font_primary color_white f_w_m">
																					{item.name}
																				</h5>
																				<p className="text_xxs color_silver_gray f_w_l">
																					{item.designation}
																				</p>
																			</div>
																		</div>
																	</div>
																</div>
															))}
														</div>
													)}
												</div>
											</SwiperSlide>
										))}
									</Swiper>
									<div className={`${styles.arrowSection} pt_20 f_w_a_j_center`}>
										<button className={`${styles.customPrev}`} id="customPrev">
											<img src={slider_arrow.src} alt="icon" />
										</button>
										<button className={styles.customNext} id="customNext">
											<img src={slider_arrow.src} alt="icon" />
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
