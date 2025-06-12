/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useRef, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { LinkedinShareButton, TwitterShareButton } from "react-share";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //
import formatDate, {
	allCategories,
	dynamicInsightsBtnProps,
	isCategory,
	slugify,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/Client.module.scss";

// IMAGES //
import webinar_logo from "@/../public/img/icons/webinarIcon.png";
import podcast_logo from "@/../public/img/icons/podcastIcon.png";

import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";
import linkedin from "@/../public/img/resources/aurora_insights/linkedin.svg";
import twitter from "@/../public/img/resources/aurora_insights/twitter.svg";
import tag_download_icon from "@/../public/img/resources/aurora_insights/tag_download_icon.svg";
import amun_hover_logo from "@/../public/img/energy_talks/amun_hover_logo.png";
import white_arrow from "@/../public/img/energy_talks/white_arrow.svg";

import hoverEffect from "/public/img/events/hoverEffect.png";
import slider_arrow from "/public/img/icons/slider_arrow.svg";
import popup_close from "/public/img/icons/popup_close.svg";
import location from "/public/img/icons/location.svg";
import clock from "/public/img/icons/clock.svg";

import calender from "/public/img/icons/calender.svg";
import hoverBg from "/public/img/home/hoverBg.png";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** Client Section */
export default function Client({ data, countries }) {
	const [selectedAuthor, setSelectedAuthor] = useState(undefined);
	const sliderRef = useRef(null);

	/** handleSlideClick Function */
	const handleAuthorClick = (slideNo) => {
		setSelectedAuthor(slideNo);

		if (sliderRef.current?.swiper) {
			sliderRef.current.swiper.slideTo(slideNo);
		}
	};

	/** handleClosePopup Function */
	const handleClosePopup = () => {
		setSelectedAuthor();
	};

	return (
		<>
			<div className={`${styles.ClientBox}`}>
				{(data?.postFields?.client ||
					data?.postFields?.authors?.nodes ||
					data?.postFields?.poweredBy?.nodes) && (
					<div className={`${styles.whiteBox}`}>
						{data?.postFields?.client && (
							<div className={`${styles.itemBox}`}>
								<h5 className="text_reg color_gray f_w_b pb_10">Client</h5>
								{data?.postFields?.client?.map((item, ind) => {
									return (
										<div
											className={`${styles.ClientFlex} f_r_a_center`}
											key={item?.title}
										>
											{item?.image?.node?.mediaItemUrl && (
												<div className={`${styles.ClientLogo}`}>
													<img src={item?.image?.node?.mediaItemUrl} alt={item?.title} />
												</div>
											)}
											<div className={`${styles.ClientDescription}`}>
												<p className="text_xs font_primary">{item?.title}</p>
											</div>
										</div>
									);
								})}
							</div>
						)}
						{data?.postFields?.authors?.nodes && (
							<div className={`${styles.itemBox}`}>
								<h5 className="text_reg color_gray f_w_b pb_10">
									{data?.postFields?.authors?.nodes?.length > 1 ? "Authors" : "Author"}
								</h5>
								{data?.postFields?.authors?.nodes?.map((item, ind) => {
									return (
										<div
											className={`${styles.ClientFlex} f_r_a_center ${
												!item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl &&
												styles.hideCursor
											}`}
											key={item?.title}
											onClick={() => {
												if (!item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl)
													return;
												handleAuthorClick(ind);
											}}
										>
											{item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl && (
												<div className={`${styles.ClientLogo}`}>
													<img
														src={item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl}
														alt="Authors image"
													/>
												</div>
											)}
											<div className={`${styles.ClientDescription}`}>
												<h5 className="text_reg font_primary color_gray f_w_m font_primary">
													{item?.title}
												</h5>
												<p className="text_xs f_w_l">
													{item?.postAuthors?.thumbnail?.designation}
												</p>
												{item?.postAuthors?.thumbnail?.linkedinLink && (
													<a
														href={item?.postAuthors?.thumbnail?.linkedinLink}
														target="_blank"
														rel="noreferrer"
														className={`${styles.social}`}
													>
														<img src={social_icon.src} alt="social icon" />
													</a>
												)}
											</div>
										</div>
									);
								})}
							</div>
						)}
						{data?.postFields?.poweredBy?.nodes && (
							<div className={`${styles.itemBox}`}>
								<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
								{data?.postFields?.poweredBy?.nodes?.map((item, ind) => {
									/**keyModule  */
									const keyModule = () => {
										if (item?.contentType?.node?.name === "softwares") {
											return "software";
										}
										if (item?.contentType?.node?.name === "services") {
											return "service";
										}
										return item?.contentType?.node?.name;
									};
									return (
										<div className={`${styles.poweredBy}`} key={item?.title}>
											<a
												href={`/${keyModule()}/${item?.slug}`}
												target="_blank"
												rel="noreferrer"
											>
												<div
													className={`${styles.poweredLogo}`}
													style={{
														background:
															item?.[item?.contentType?.node?.name]?.thumbnail?.primaryColor,
													}}
												>
													<img
														src={
															item?.[item?.contentType?.node?.name]?.banner?.logo?.node
																?.mediaItemUrl
														}
														className={`${styles.amun_logo}`}
														alt="software logo"
													/>
													{/* <img
                                    src={amun_hover_logo.src}
                                    className={`${styles.amun_hover_logo}`}
                                    alt="amun_logo"
                                /> */}

													<span className="f_r_aj_between text_xxs text_uppercase">
														Know More
														<img src={white_arrow.src} className="" alt="amun_logo" />
													</span>
												</div>
											</a>
										</div>
									);
								})}
							</div>
						)}
					</div>
				)}
				<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
					<div className={`${styles.InsideItem}`}>
						{data?.tags?.nodes?.length > 0 && (
							<div className={`${styles.itemBox}`}>
								<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
								<div className={`${styles.ClientFlex} f_w`}>
									{data?.tags?.nodes?.map((item) => {
										return (
											<a
												key={item?.title || item?.name || item}
												className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
												href={`/resources/aurora-insights?search=${
													item?.title || item?.name || item
												}`}
											>
												{item?.title || item?.name || item}
											</a>
										);
									})}
								</div>
							</div>
						)}

						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Share</h5>
							<div className={`${styles.ClientFlex} f_r_a_center`}>
								<a className={`${styles.shareIcon}`}>
									<LinkedinShareButton url={window && window.location.href}>
										<img src={linkedin.src} alt="linkedin" />
									</LinkedinShareButton>
								</a>

								<a className={`${styles.shareIcon}`}>
									<TwitterShareButton url={window && window.location.href}>
										<img src={twitter.src} alt="twitter" />
									</TwitterShareButton>
								</a>
							</div>
						</div>
					</div>
					{dynamicInsightsBtnProps(data, "bottomSectionButton").btntext && (
						<div className={`${styles.DownBtn} `}>
							<a
								{...dynamicInsightsBtnProps(data, "bottomSectionButton")}
								className="text_sm f_w_m font_primary f_r_a_center"
							>
								<img src={tag_download_icon.src} alt="download" />
								<span>
									{dynamicInsightsBtnProps(data, "bottomSectionButton").btntext}
								</span>
							</a>
						</div>
					)}
				</div>
				<div className={`${styles.whiteBox}`}>
					<div className={`${styles.itemBox}`}>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<div className={`${styles.ClientLogo}`}>
								<img src={webinar_logo.src} alt="Shaping the energy discussion" />
							</div>
							<div className={`${styles.ClientDescription}`}>
								<p className="text_reg font_primary">Shaping the energy discussion</p>
								<a href="/resources/webinar" className={`${styles.btn_box} `}>
									<Button color="secondary" variant="underline">
										View webinars
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.whiteBox}`}>
					<div className={`${styles.itemBox}`}>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<div className={`${styles.ClientLogo}`}>
								<img src={podcast_logo.src} alt="Energy Unplugged by Aurora" />
							</div>
							<div className={`${styles.ClientDescription}`}>
								<p className="text_reg font_primary">Energy Unplugged by Aurora</p>
								<a href="/resources/energy-talks" className={`${styles.btn_box} `}>
									<Button color="secondary" variant="underline">
										View all podcasts
									</Button>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
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
										{data?.postFields?.authors?.nodes?.map((item, ind) => (
											<SwiperSlide className={`${styles.item}`} key={ind}>
												<div className={`${styles.PopupItem}`}>
													<div className={`${styles.BoxFlex} f_w`}>
														<div className={styles.Imgthumbnail}>
															<img
																src={item?.postAuthors?.thumbnail?.image?.node?.mediaItemUrl}
																className="b_r_20"
																alt={item.title}
															/>
															<div className={`${styles.popUp}`}>
																<img src={hoverEffect.src} className="b_r_20" alt=" img" />
															</div>
														</div>
														<div className={`${styles.Details}`}>
															<div className={`${styles.boxName}`}>
																<h5
																	className={`${styles.Name} text_reg f_w_m color_white font_secondary`}
																>
																	{item.title}
																</h5>
																<p className="text_xs color_silver_gray l_h_6">
																	{item?.postAuthors?.thumbnail?.designation}
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
		</>
	);
}
