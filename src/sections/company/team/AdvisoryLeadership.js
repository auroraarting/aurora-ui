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
import formatDate, { isCategory } from "@/utils";

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
import Pagination from "@/components/Pagination";
import EqualHeight from "@/utils/EqualHeight";

// DATA //

/** AdvisoryLeadership Section */
export default function AdvisoryLeadership({ data, countries }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [slideNo, setSlideNo] = useState(0);
	const [openPop1, setOpenPop1] = useState(false);
	const sliderRef = useRef(null);
	const [list, setList] = useState(data);
	const [paginationArr, setPaginationArr] = useState(data);

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

	useEffect(() => {
		// EqualHeight("box_item .thumbnailImg");
	}, [list]);

	return (
		<section className={`${styles.AdvisoryLeadership}`}>
			<div className="container">
				<div className={`${styles.content_main_wrap} pt_40`}>
					<div className={`${styles.box_wrap}`}>
						{list?.map((item, ind) => {
							return (
								<div
									className={`${styles.box_item} box_item`}
									onClick={(e) => handleSlideClick1(e, ind, item)}
									data-slide={ind}
									key={item?.title + ind}
								>
									<div className={`${styles.thumbnailImg} thumbnailImg b_r_20`}>
										<img
											src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
											className=""
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
					<div className="pt_20">
						<Pagination
							data={list}
							paginationArr={paginationArr}
							setCurrentItems={setList}
							isDark={true}
						/>
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
										autoplay={{
											delay: 3000,
											disableOnInteraction: false,
										}}
									>
										{list?.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img
																src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
																className="b_r_20"
																alt="story img"
															/>
															<div className={`${styles.popUp}`}>
																<img src={hoverEffect.src} className="b_r_20" alt=" img" />
															</div>
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
																	autoplay={{
																		delay: 3000,
																		disableOnInteraction: false,
																	}}
																>
																	{item?.teams?.articles?.articlesby?.nodes?.map(
																		(blogData, index) => (
																			<SwiperSlide key={index}>
																				<div className={`${styles.ItemBox} `}>
																					<div className={`${styles.hoverBox}`}>
																						<img
																							height={179}
																							width={446}
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
