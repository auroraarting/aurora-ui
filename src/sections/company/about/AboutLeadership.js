"use client";
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
import formatDate, { allCategories, isCategory, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/about/AboutLeadership.module.scss";

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

/** AboutLeadership Section */
export default function AboutLeadership({ data, countries }) {
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

	return (
		<section
			className={`${styles.AboutLeadership}`}
			id="Leadership"
			data-name="Leadership"
		>
			<div className="container">
				<div className={`${styles.titleWrapper}`}>
					<h2 className="text_xl font_primary f_w_m color_secondary pb_10">
						{data?.sectionTitle}
					</h2>
					<div className={`${styles.label} text_reg color_dark_gray`}>
						<ContentFromCms>{data?.sectionDescription}</ContentFromCms>
					</div>
				</div>
				<div className={`${styles.content_main_wrap} pt_40`}>
					<div className={`${styles.box_wrap}`}>
						<Swiper
							modules={[Navigation, Autoplay]}
							slidesPerView={1.2}
							spaceBetween={20}
							grabCursor={true}
							speed={500}
							loop={true}
							navigation={{
								prevEl: "#aboutsCustomPrevCollaboration",
								nextEl: "#aboutsCustomNextCollaboration",
							}}
							// autoplay={{
							// 	delay: 3000,
							// 	disableOnInteraction: false,
							// }}
							breakpoints={{
								768: {
									slidesPerView: 3,
								},
								992: {
									slidesPerView: 4,
								},
							}}
							className={styles.aboutsliderLeaders}
						>
							{data?.leaders?.nodes?.map((item, ind) => {
								return (
									<SwiperSlide key={ind}>
										<div
											className={`${styles.box_item}`}
											onClick={(e) => handleSlideClick1(e, ind)}
											data-slide={ind}
										>
											<div className={`${styles.thumbnailImg}`}>
												<img
													src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
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
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
					{data?.leaders?.nodes?.length > 1 && (
						<div className={`${styles.aboutArrowSectionLeaders} f_w_a_j_center`}>
							<button
								className={`${styles.customPrev}`}
								id="aboutsCustomPrevCollaboration"
							>
								<img src={slider_arrow.src} alt="icon" />
							</button>
							<button className={styles.customNext} id="aboutsCustomNextCollaboration">
								<img src={slider_arrow.src} alt="icon" />
							</button>
						</div>
					)}

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
										{data?.leaders?.nodes?.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img
																src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
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
																{item?.linkedinLink && (
																	<div className={`${styles.downloadProfile} pt_20 f_w_j`}>
																		<div className={`${styles.linkedin}`}>
																			<a href={item?.linkedinLink} className="d_f">
																				<img src={linkedin.src} alt="icon" />
																			</a>
																		</div>
																	</div>
																)}
															</div>
															<div className={`${styles.DescWrap}`}>
																<div
																	className={`${styles.Desc} text_xs color_silver_gray l_h_6`}
																>
																	{parse(item?.content || "")}
																</div>
															</div>
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
																					<a
																						href={`/resources/aurora-insights/${slugify(
																							isCategory(allCategories, blogData?.categories?.nodes)
																						)}/${blogData?.slug}`}
																						className={`${styles.hoverBox}`}
																					>
																						<img
																							src={hoverBg.src}
																							height={179}
																							width={446}
																							className={`${styles.hoverBg} width_100 b_r_10`}
																							alt="img"
																						/>
																						<p
																							className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
																						>
																							{/* {blogData.tags} */}
																							Case Study
																						</p>
																						<div
																							className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}
																						>
																							<ContentFromCms>{blogData?.title}</ContentFromCms>
																						</div>
																						<div className={`${styles.dateFlex} f_j pt_30`}>
																							<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																								<img
																									src={calender.src}
																									className={`${styles.clock}`}
																									alt="clock"
																								/>
																								<span>{formatDate(blogData?.date)}</span>
																							</p>
																							{isCategory(countries, blogData?.categories?.nodes) && (
																								<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																									<img
																										src={location.src}
																										className={`${styles.clock}`}
																										alt="clock"
																									/>

																									<span>
																										{isCategory(countries, blogData?.categories?.nodes)}
																									</span>
																								</p>
																							)}
																						</div>
																					</a>
																				</div>
																			</SwiperSlide>
																		)
																	)}
																</Swiper>
															</div>
															{item?.teams?.articles?.articlesby?.nodes?.length > 1 && (
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
