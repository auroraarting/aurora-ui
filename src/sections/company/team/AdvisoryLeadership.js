// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //
import formatDate from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/team/AdvisoryLeadership.module.scss";

// IMAGES //
import management_img from "../../../../public/img/events/management_img.jpg";
import hoverEffect from "../../../../public/img/events/hoverEffect.png";
import profile_pic from "../../../../public/img/events/profile_pic.png";
import slider_arrow from "../../../../public/img/icons/slider_arrow.svg";
import popup_close from "../../../../public/img/icons/popup_close.svg";
import location from "../../../../public/img/icons/location.svg";
import calender from "../../../../public/img/icons/calender.svg";
import black_down_arrow from "../../../../public/img/icons/black_down_arrow.svg";
import linkedin from "../../../../public/img/icons/linkedin.svg";
import hoverBg from "@/../public/img/home/hoverBg.png";

// DATA //

/** AdvisoryLeadership Section */
export default function AdvisoryLeadership({ data }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [slideNo, setSlideNo] = useState(0);
	const [openPop1, setOpenPop1] = useState(false);
	const sliderRef = useRef(null);

	/** handleSlideClick Function */
	const handleSlideClick1 = (e, index, data) => {
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

	const mediaLeadersData = [
		{
			name: "Anna Clunes1",
			designation: "British Ambassador, Poland1",
			linkedinUrl: "http:linkedin/test",
			downloadProfileUrl: "http:testdownloadProfile",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			leaderBlogHeading: "Latest Articles by John Feddersen1",
			blogData: [
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
			],
		},
		{
			name: "Anna Clunes2",
			designation: "British Ambassador, Poland2",
			linkedinUrl: "http:linkedin/test",
			downloadProfileUrl: "http:testdownloadProfile",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			leaderBlogHeading: "Latest Articles by John Feddersen2",
			blogData: [
				{
					tags: "Case Study2",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
				{
					tags: "Case Study2",
					blogDesc:
						"Energy Transition in Central and Eastern Europe: Challenges and Investment Opportunities",
					blogDate: "Feb 20, 2025",
					blogLocation: "Australia",
				},
			],
		},
		{
			name: "Anna Clunes3",
			designation: "British Ambassador, Poland3",
			linkedinUrl: "http:linkedin/test",
			downloadProfileUrl: "http:testdownloadProfile",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			// leaderBlogHeading: [],
			blogData: [],
		},
		{
			name: "Anna Clunes3",
			designation: "British Ambassador, Poland3",
			linkedinUrl: "http:linkedin/test",
			downloadProfileUrl: "http:testdownloadProfile",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			blogData: [],
		},
		{
			name: "Anna Clunes3",
			designation: "British Ambassador, Poland3",
			linkedinUrl: "http:linkedin/test",
			downloadProfileUrl: "http:testdownloadProfile",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			thumbnail: management_img.src,
			blogData: [],
		},
	];

	return (
		<section className={`${styles.AdvisoryLeadership}`}>
			<div className="container">
				<div className={`${styles.content_main_wrap} pt_40`}>
					<div className={`${styles.box_wrap}`}>
						{data?.map((item, ind) => {
							return (
								<div
									className={`${styles.box_item}`}
									onClick={(e) => handleSlideClick1(e, ind, item)}
									data-slide={ind}
									key={ind}
								>
									<div className={`${styles.thumbnailImg}`}>
										<img
											src={item?.teams?.thumbnail?.image?.node?.sourceUrl}
											className="b_r_20"
											alt="story img"
										/>
									</div>
									<div className={`${styles.content} pt_20`}>
										<h5 className="text_reg f_w_m color_white font_secondary">
											{item?.title}
										</h5>
										<p className="text_xs color_platinum_gray">
											{item?.teams?.thumbnail?.designation}
										</p>
									</div>
									<div className={`${styles.hoverEffect} pt_20`}>
										<img src={hoverEffect.src} className="" alt=" img" />
									</div>
								</div>
							);
						})}
					</div>
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
										{data?.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img
																src={item?.teams?.thumbnail?.image?.node?.sourceUrl}
																className="b_r_20"
																alt="story img"
															/>
															{/* <div className={`${styles.profileDownload}`}>
																<a
																	href={item.downloadProfileUrl}
																	className="d_f"
																	download
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	Download Profile
																	<img src={black_down_arrow.src} alt="icon" />
																</a>
															</div> */}
														</div>
														<div className={`${styles.Details}`}>
															<div className={`${styles.boxName}`}>
																<h5
																	className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
																>
																	{item?.title}
																</h5>
																<p className="text_xs color_silver_gray">
																	{item?.teams?.thumbnail?.designation}
																</p>
																{item?.teams?.thumbnail?.linkedinLink && (
																	<div className={`${styles.downloadProfile} pt_20 f_w_j`}>
																		<div className={`${styles.linkedin}`}>
																			<a
																				href={item?.teams?.thumbnail?.linkedinLink}
																				className="d_f"
																			>
																				<img src={linkedin.src} alt="icon" />
																			</a>
																		</div>
																	</div>
																)}
															</div>
															<p className={`${styles.Desc} text_xs color_silver_gray l_h_6`}>
																{parse(item?.content || "")}
															</p>
														</div>
													</div>
													{item?.teams?.articles?.articlesby?.nodes?.length > 0 && (
														<div className={`${styles.blogWapper}`}>
															<h3 className="text_lg color_white">
																Latest Articles by {item?.title}
															</h3>
															<div className={`${styles.insightsItemFlex} m_t_30`}>
																<Swiper
																	modules={[Navigation]}
																	slidesPerView={1.1}
																	grabCursor={true}
																	speed={500}
																	loop={true}
																	navigation={{
																		prevEl: "#customPrevCollaboration",
																		nextEl: "#customNextCollaboration",
																	}}
																	breakpoints={{
																		768: {
																			slidesPerView: 3,
																		},
																	}}
																	className={styles.sliderLeaders}
																>
																	{item?.teams?.articles?.articlesby?.nodes?.map(
																		(blogData, index) => (
																			<SwiperSlide key={index}>
																				<div className={`${styles.ItemBox} `}>
																					<div className={`${styles.hoverBox}`}>
																						<img
																							src={hoverBg.src}
																							className={`${styles.hoverBg} width_100 b_r_10`}
																							alt="img"
																						/>
																						<p
																							className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
																						>
																							{/* {blogData.tags} */}
																							Case Study
																						</p>
																						<p
																							className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}
																						>
																							<ContentFromCms>{blogData?.title}</ContentFromCms>
																						</p>
																						<div className={`${styles.dateFlex} f_j pt_30`}>
																							<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																								<img
																									src={calender.src}
																									className={`${styles.clock}`}
																									alt="clock"
																								/>
																								<span>{formatDate(blogData?.date)}</span>
																							</p>
																							<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																								<img
																									src={location.src}
																									className={`${styles.clock}`}
																									alt="clock"
																								/>
																								<span>
																									{blogData?.caseStudies?.selectLocation?.nodes?.map(
																										(item2) => `${item2?.title} `
																									)}
																								</span>
																							</p>
																						</div>
																					</div>
																				</div>
																			</SwiperSlide>
																		)
																	)}
																</Swiper>
															</div>
															{item?.teams?.articles?.articlesby?.nodes?.length > 3 && (
																<div className={`${styles.arrowSectionLeaders} `}>
																	<button
																		className={`${styles.customPrev}`}
																		id="customPrevCollaboration"
																	>
																		<img src={slider_arrow.src} alt="icon" />
																	</button>
																	<button
																		className={styles.customNext}
																		id="customNextCollaboration"
																	>
																		<img src={slider_arrow.src} alt="icon" />
																	</button>
																</div>
															)}
														</div>
													)}
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
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
