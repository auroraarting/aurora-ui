"use client";
// MODULES //
import { useEffect, useRef, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import CustomSelect from "@/components/CustomSelect";
import Map from "@/components/MapContainer";
import AccordianCommon from "@/components/AccordianCommon";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //
import formatDate, {
	allCategories,
	dynamicInsightsBtnProps,
	filterMarkersBySlug,
	getMapJsonForProducts,
	isCategory,
	slugify,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/softwares/SoftwareMarket.module.scss";

// IMAGES //
import AuthorPic from "/public/img/softwares/authorPic.svg";
import DrownDownArrow from "/public/img/softwares/arrow.svg";
import transaction from "/public/img/softwares/transaction.svg";
import portfolio from "/public/img/softwares/portfolio.svg";
import asset from "/public/img/softwares/asset.svg";
import strategy from "/public/img/softwares/strategy.svg";
import hoverEffect from "/public/img/events/hoverEffect.png";
import slider_arrow from "/public/img/icons/slider_arrow.svg";
import popup_close from "/public/img/icons/popup_close.svg";
import calender from "/public/img/icons/calender.svg";
import hoverBg from "/public/img/home/hoverBg.png";
import location from "/public/img/icons/location.svg";
import clock from "/public/img/icons/clock.svg";

// import Map from "/public/img/softwares/map.png";

// DATA //
import locationJson from "@/data/locations.json";

/** SoftwareBanner Section */
export default function SoftwareMarket({
	sectionTitle,
	mapJson,
	customHtml,
	data,
	mapThumb,
	teamTitle,
	tabTitle = "Available Regions",
	countries,
}) {
	const [selectedAuthor, setSelectedAuthor] = useState(undefined);
	const sliderRef = useRef(null);

	/** centerOfCountry  */
	let centerOfCountry = () => {
		if (mapJson) {
			return {
				lat: parseFloat(mapJson?.countryPin?.lat),
				lng: parseFloat(mapJson?.countryPin?.lng),
			};
		}
	};

	let customMapJson = {
		...mapJson,
		centerOfCountry: centerOfCountry(),
	};

	// console.log(customMapJson, "customMapJson");

	const [mapCenter, setMapCenter] = useState(centerOfCountry());
	const [map, setMap] = useState(null);
	const [valueOfSelect, setValueOfSelect] = useState(0);

	/** handleSlideClick Function */
	const handleAuthorClick = (slideNo) => {
		setSelectedAuthor(slideNo);

		setTimeout(() => {
			if (sliderRef.current?.swiper) {
				sliderRef.current.swiper.slideTo(slideNo);
			}
		}, 500);
	};

	/** handleClosePopup Function */
	const handleClosePopup = () => {
		setSelectedAuthor();
	};

	if (!sectionTitle) {
		return <></>;
	}

	return (
		<>
			<section
				className={`${styles.SoftwareMarket} `}
				id={"availableregions"}
				data-name={tabTitle}
			>
				<div className="container">
					<div className={`${styles.inner}`}>
						<div className={`${styles.left}`}>
							<p className={`${styles.title} text_xl text_600`}>{sectionTitle}</p>

							{data?.team?.nodes?.length > 0 && (
								<>
									<div className={`${styles.meetTitle} text_reg f_w_m`}>
										{teamTitle || "Meet the team"}
									</div>
									<div className={`${styles.dropdownWrap}`}>
										{data?.team?.nodes?.map((item, ind) => {
											return (
												<div
													className={`${styles.author}`}
													key={item?.id}
													onClick={() => {
														const indexOfSelectedAuthor = data?.team?.nodes.findIndex(
															(item3) => item3.title === item.title
														);
														handleAuthorClick(indexOfSelectedAuthor);
													}}
												>
													<div className={`${styles.authorInner}`}>
														<div className={`${styles.pic}`}>
															<img
																src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
																alt={item?.title}
															/>
														</div>
														<div className={`${styles.detail}`}>
															<p className={`${styles.name} text_500`}>{item?.title}</p>
															<p className={`${styles.position} text_xs text_300`}>
																{item?.teams?.thumbnail?.designation}
															</p>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</>
							)}
							<div className="m_t_30">{customHtml}</div>
						</div>
						{mapJson && (
							<div className={`${styles.right}`}>
								{mapThumb ? (
									<img className={`${styles.map}`} src={mapThumb} alt="Map" />
								) : (
									<Map
										mapCenter={mapCenter}
										setValueOfSelect={setValueOfSelect}
										valueOfSelect={valueOfSelect}
										map={map}
										setMap={setMap}
										defaultZoom={mapJson?.zoom || 4}
										locationJson={[customMapJson]}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			</section>
			{selectedAuthor != undefined && (
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
							{selectedAuthor != undefined && (
								<div data-lenis-prevent>
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
										ref={sliderRef}
										// autoplay={{
										// 	delay: 3000,
										// 	disableOnInteraction: false,
										// }}
									>
										{data?.team?.nodes?.map((item, ind) => {
											return (
												<SwiperSlide className={`${styles.item}`} key={ind}>
													<div className={`${styles.PopupItem}`}>
														<div className={`${styles.BoxFlex} f_w`}>
															{item?.teams?.thumbnail?.image?.node?.mediaItemUrl && (
																<div className={styles.Imgthumbnail}>
																	<img
																		src={item?.teams?.thumbnail?.image?.node?.mediaItemUrl}
																		className="b_r_20"
																		alt={item.title}
																	/>
																	<div className={`${styles.popUp}`}>
																		<img src={hoverEffect.src} className="b_r_20" alt=" img" />
																	</div>
																</div>
															)}
															<div className={`${styles.Details}`}>
																<div className={`${styles.boxName}`}>
																	<h5
																		className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
																	>
																		{item.title}
																	</h5>
																	<p className="text_xs color_silver_gray l_h_6">
																		{item?.teams?.thumbnail?.designation}
																	</p>
																</div>
																<p className={`${styles.Desc} text_xs color_silver_gray`}>
																	{parse(item?.content || "")}
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
														{item?.postAuthors?.articles?.articlesby?.nodes?.length > 0 && (
															<div className={`${styles.blogWapper}`}>
																<h3 className="text_lg color_white">
																	Latest Articles by {item?.title}
																</h3>
																<div className={`${styles.insightsItemFlex} m_t_30`}>
																	<Swiper
																		modules={[Navigation, Autoplay]}
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
																		// autoplay={{
																		// 	delay: 3000,
																		// 	disableOnInteraction: false,
																		// }}
																	>
																		{item?.postAuthors?.articles?.articlesby?.nodes?.map(
																			(blogData, index) => (
																				<SwiperSlide key={index}>
																					<div className={`${styles.ItemBox} `}>
																						<a
																							href={`/resources/aurora-insights/${slugify(
																								isCategory(
																									allCategories,
																									blogData?.categories?.nodes,
																									true
																								)
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
																								{isCategory(allCategories, blogData?.categories?.nodes)}
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
																{item?.postAuthors?.articles?.articlesby?.nodes?.length > 1 && (
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
											);
										})}
									</Swiper>
									<div className={`${styles.arrowSection} `}>
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
		</>
	);
}
