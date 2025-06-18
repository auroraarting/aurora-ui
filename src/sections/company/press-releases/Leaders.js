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
import { Navigation, Autoplay } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //
import formatDate from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/press-releases/Learders.module.scss";

// IMAGES //
import management_img from "@/../public/img/events/management_img.jpg";
import hoverEffect from "@/../public/img/events/hoverEffect.png";
import profile_pic from "@/../public/img/events/profile_pic.png";
import slider_arrow from "@/../public/img/icons/slider_arrow.svg";
import popup_close from "@/../public/img/icons/popup_close.svg";
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import black_down_arrow from "@/../public/img/icons/black_down_arrow.svg";
import linkedin from "@/../public/img/icons/linkedin.svg";
import hoverBg from "@/../public/img/home/hoverBg.png";

// DATA //

/** Leaders Section */
export default function Leaders({ data }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [slideNo, setSlideNo] = useState(0);
	const [list, setList] = useState();
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

	const mediaLeadersData = data?.leaders?.leaders?.nodes?.map((item) => {
		return {
			name: item?.title,
			designation: item?.teams?.thumbnail?.designation,
			linkedinUrl: item?.teams?.thumbnail?.linkedinLink,
			downloadProfileUrl: item?.teams?.file?.node?.mediaItemUrl,
			desc: item?.content,
			thumbnail: item?.teams?.thumbnail?.image?.node?.mediaItemUrl,
			leaderBlogHeading: "Latest Articles by John Feddersen1",
			blogData: item?.teams?.articles?.articlesby?.nodes?.map((item2) => {
				let location = "";

				item2?.caseStudies?.selectLocation?.nodes?.map((item3, ind) => {
					if (ind == 0) {
						location = item3.title;
					} else {
						location += `, ${item3.title}`;
					}
				});
				return {
					tags: "Case Study",
					blogSlug: `/resources/aurora-insights/case-studies/${item2?.slug}`,
					blogDesc: item2?.title,
					blogDate: formatDate(item2?.date),
					blogLocation: location,
				};
			}),
		};
	});

	useEffect(() => {
		const tempData = data?.leaders?.leaders?.nodes?.map((item) => {
			return {
				...item,
				name: item?.title,
				designation: item?.teams?.thumbnail?.designation,
				linkedinUrl: item?.teams?.thumbnail?.linkedinLink,
				downloadProfileUrl: item?.teams?.file?.node?.mediaItemUrl,
				desc: item?.content,
				thumbnail: item?.teams?.thumbnail?.image?.node?.mediaItemUrl,
				leaderBlogHeading: "Latest Articles by John Feddersen1",
				blogData: item?.teams?.articles?.articlesby?.nodes?.map((item2) => {
					let location = "";

					item2?.caseStudies?.selectLocation?.nodes?.map((item3, ind) => {
						if (ind == 0) {
							location = item3.title;
						} else {
							location += `, ${item3.title}`;
						}
					});
					return {
						tags: "Case Study",
						blogSlug: `/resources/aurora-insights/case-studies/${item2?.slug}`,
						blogDesc: item2?.title,
						blogDate: formatDate(item2?.date),
						blogLocation: location,
					};
				}),
			};
		});
		let teams = [];
		let ceo = [];
		tempData?.map((item) => {
			if (item?.title.toLowerCase().includes("feddersen")) {
				ceo.push(item);
			} else {
				teams.push(item);
			}
		});
		teams.sort((a, b) =>
			a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
		);
		setList([...ceo, ...teams]);
	}, []);

	console.log(mediaLeadersData, "mediaLeadersData");

	return (
		<section className={`${styles.Leaders}`}>
			<div className="container">
				<div className={`${styles.titleWrapper}`}>
					<h2 className="text_xl font_primary color_secondary pb_10">
						{data?.leaders?.sectionTitle}
					</h2>
					<p className={`${styles.label} text_reg color_dark_gray`}>
						{data?.leaders?.sectionDesc}
					</p>
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
								prevEl: "#customPrevCollaboration",
								nextEl: "#customNextCollaboration",
							}}
							autoplay={{
								delay: 3000,
								disableOnInteraction: false,
							}}
							breakpoints={{
								768: {
									slidesPerView: 3,
								},
								992: {
									slidesPerView: 4,
								},
							}}
							className={styles.sliderLeaders}
						>
							{list?.map((item, ind) => {
								return (
									<SwiperSlide key={ind}>
										<div className={`${styles.box_item}`} data-slide={ind}>
											<div
												className={`${styles.thumbnailImg}`}
												onClick={(e) => handleSlideClick1(e, ind)}
											>
												<img src={item.thumbnail} className="b_r_20" alt="story img" />
											</div>
											<div className={`${styles.content} pt_20`}>
												<h5 className="text_reg f_w_m color_white font_secondary">
													{item.name}
												</h5>
												<p className="text_xs color_platinum_gray">{item.designation}</p>
												{item.downloadProfileUrl && (
													<a
														href={item.downloadProfileUrl}
														download
														target="_blank"
														rel="noreferrer"
														className={`${styles.downIcon}`}
													>
														<img src="/img/arr-down.svg" className="" alt="icons" />
													</a>
												)}
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
					<div className={`${styles.arrowSectionLeaders} f_w_a_j_center`}>
						<button className={`${styles.customPrev}`} id="customPrevCollaboration">
							<img src={slider_arrow.src} alt="icon" />
						</button>
						<button className={styles.customNext} id="customNextCollaboration">
							<img src={slider_arrow.src} alt="icon" />
						</button>
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
															<img src={item.thumbnail} className="b_r_20" alt="story img" />
															<div className={`${styles.popUp}`}>
																<img src={hoverEffect.src} className="b_r_20" alt=" img" />
															</div>
															{item.downloadProfileUrl && (
																<div className={`${styles.profileDownload}`}>
																	<a
																		className="d_f"
																		href={item.downloadProfileUrl}
																		download
																		target="_blank"
																		rel="noreferrer"
																	>
																		Download
																		<img src={black_down_arrow.src} alt="icon" />
																	</a>
																</div>
															)}
														</div>
														<div className={`${styles.Details}`}>
															<div className={`${styles.boxName}`}>
																<h5
																	className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
																>
																	{item.name}
																</h5>
																<p className="text_xs color_silver_gray">{item.designation}</p>
																<div className={`${styles.downloadProfile} pt_20 f_w_j`}>
																	<div className={`${styles.linkedin}`}>
																		<a
																			href={item.linkedinUrl}
																			className="d_f"
																			target="_blank"
																			rel="noreferrer"
																		>
																			<img src={linkedin.src} alt="icon" />
																		</a>
																	</div>
																</div>
															</div>
															{/* <p className={`${styles.Desc} text_xs color_silver_gray l_h_6`}>
																{parse(item?.desc || "")}
															</p> */}
															<div className={`${styles.DescWrap}`}>
																<div
																	className={`${styles.Desc} text_xs color_silver_gray l_h_6`}
																>
																	{parse(item?.desc || "")}
																</div>
															</div>
														</div>
													</div>
													{item?.blogData?.length > 0 && (
														<div className={`${styles.blogWapper}`}>
															<h3 className="text_lg color_white">{item.leaderBlogHeading}</h3>
															<div className={`${styles.insightsItemFlex} m_t_30`}>
																<Swiper
																	modules={[Navigation]}
																	slidesPerView={1.1}
																	grabCursor={true}
																	speed={500}
																	loop={true}
																	navigation={{
																		prevEl: "#blogsPrevCollaboration",
																		nextEl: "#blogsNextCollaboration",
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
																	{item?.blogData?.map((blogData, index) => (
																		<SwiperSlide key={index}>
																			<div className={`${styles.ItemBox} `}>
																				<a
																					href={blogData?.blogSlug}
																					className={`${styles.hoverBox}`}
																				>
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
																						{blogData.tags}
																					</p>
																					{/* <p
																						className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}
																					>
																						{blogData.blogDesc}
																					</p> */}
																					<div className={`${styles.DescWrap}`}>
																						<div
																							className={`${styles.Desc} text_xs color_silver_gray l_h_6`}
																						>
																							{parse(blogData?.blogDesc || "")}
																						</div>
																					</div>
																					<div className={`${styles.dateFlex} f_j pt_30`}>
																						<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																							<img
																								src={calender.src}
																								className={`${styles.clock}`}
																								alt="clock"
																							/>
																							<span>{blogData.blogDate}</span>
																						</p>
																						<p className="text_xs f_w_m color_medium_gray text_uppercase d_f">
																							<img
																								src={location.src}
																								className={`${styles.clock}`}
																								alt="clock"
																							/>
																							<span>{blogData.blogLocation}</span>
																						</p>
																					</div>
																				</a>
																			</div>
																		</SwiperSlide>
																	))}
																</Swiper>
															</div>
															<div className={`${styles.arrowBlogLeaders} `}>
																<button
																	className={`${styles.customPrev}`}
																	id="blogsPrevCollaboration"
																>
																	<img src={slider_arrow.src} alt="icon" />
																</button>
																<button
																	className={styles.customNext}
																	id="blogsNextCollaboration"
																>
																	<img src={slider_arrow.src} alt="icon" />
																</button>
															</div>
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
