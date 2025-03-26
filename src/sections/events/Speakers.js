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
import { Navigation } from "swiper/modules";
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
export default function Speakers() {
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

	const eventSpeakersData = [
		{
			name: "Anna Clunes1",
			designation: "British Ambassador, Poland1",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			sessions: [
				{
					time: "1:30 PM1",
					topicName: "Welcome and Opening Remarks1",
					timeDateSession: "1:30 PM - 1:40 PM CET1",
					locationSession: "InterContinental Warsaw, Conference Room1",
				},
				{
					time: "1:30 PM1",
					topicName: "Welcome and Opening Remarks1",
					timeDateSession: "1:30 PM - 1:40 PM CET1",
					locationSession: "InterContinental Warsaw, Conference Room1",
				},
			],
		},
		{
			name: "Anna Clunes2",
			designation: "British Ambassador, Poland2",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			sessions: [
				{
					time: "1:30 PM2",
					topicName: "Welcome and Opening Remarks2",
					timeDateSession: "1:30 PM - 1:40 PM CET2",
					locationSession: "InterContinental Warsaw, Conference Room2",
				},
			],
		},
		{
			name: "Anna Clunes3",
			designation: "British Ambassador, Poland3",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			sessions: [],
		},
	];
	// console.log(eventSpeakersData);
	return (
		<section className={`${styles.Speakers}`}>
			<div className="container">
				<div className={`${styles.titleWrapper}`}>
					<h2 className="text_xl font_primary f_w_m color_secondary pb_10">
						Past Speakers
					</h2>
					<p className={`${styles.label} text_reg color_dark_gray`}>
						Aurora’s events bring together industry leaders, policymakers, and experts
						for insightful discussions and data-driven analysis, shaping the future of
						energy.
					</p>
				</div>
				<div className={`${styles.content_main_wrap} pt_40`}>
					<div className={`${styles.box_wrap}`}>
						{eventSpeakersData.map((item, ind) => {
							return (
								<div
									className={`${styles.box_item}`}
									key={ind}
									onClick={(e) => handleSlideClick1(e, ind)}
									data-slide={ind}
								>
									<div className={`${styles.thumbnailImg}`}>
										<img src={item.thumbnail} className="b_r_20" alt="story img" />
									</div>
									<div className={`${styles.content} pt_20`}>
										<h5 className="text_reg f_w_m color_white font_secondary">
											{item.name}
										</h5>
										<p className="text_xs color_platinum_gray">{item.designation}</p>
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
										modules={[Navigation]}
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
									>
										{eventSpeakersData.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img src={item.thumbnail} className="b_r_20" alt="story img" />
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
																{parse(item.desc)}
															</p>
														</div>
													</div>
													{item.sessions.length > 0 && (
														<div className={`${styles.sessionWapper}`}>
															<h3 className="text_lg color_white">Session</h3>
															{item.sessions.map((session, index) => (
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
																				<img src={item.thumbnail} alt="pic" />
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
															{/* <div className={`${styles.sessionBox} f_w`}>
															<div className={`${styles.sessionTime}`}>
																<p
																	className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
																>
																	1:30 PM
																</p>
															</div>
															<div className={`${styles.sessionDescription}`}>
																<h4 className="text_xs font_primary color_white f_w_s_b">
																	Welcome and Opening Remarks
																</h4>
																<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
																	<p className="text_xs f_w_m color_silver_gray text_uppercase f_r_a_center">
																		<img
																			src={clock.src}
																			className={`${styles.clock}`}
																			alt="clock"
																		/>
																		<span>1:30 PM - 1:40 PM CET</span>
																	</p>
																	<p className="text_xs f_w_m color_silver_gray  f_r_a_center">
																		<img
																			src={location.src}
																			className={`${styles.location}`}
																			alt="location"
																		/>
																		<span>InterContinental Warsaw, Conference Room</span>
																	</p>
																</div>
																<div className={`${styles.ClientFlex} f_r_a_center`}>
																	<div className={`${styles.ClientLogo}`}>
																		<img src={profile_pic.src} alt="pic" />
																	</div>
																	<div className={`${styles.ClientDescription}`}>
																		<h5 className="text_xs font_primary color_white f_w_m">
																			John Feddersen
																		</h5>
																		<p className="text_xxs color_silver_gray f_w_l">
																			British Ambassador, Poland
																		</p>
																	</div>
																</div>
															</div>
														</div> */}
														</div>
													)}
												</div>
											</SwiperSlide>
										))}
									</Swiper>
									<div className={`${styles.arrowSection} f_w_a_j_center`}>
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
