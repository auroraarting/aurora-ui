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
import { Navigation } from "swiper/modules";
import parse from "html-react-parser";

// UTILS //

// STYLES //
import styles from "@/styles/sections/eos/CuttingEdgeModels.module.scss";

// IMAGES //
import management_img from "/public/img/events/management_img.jpg";
import slider_arrow from "/public/img/icons/slider_arrow.svg";
import popup_close from "/public/img/icons/popup_close.svg";
import black_right from "/public/img/icons/black_right.svg";
import hoverEffect from "/public/img/eos/hoverEffect.png";
import origin_logo from "/public/img/eos/origin_logo.png";
import AccordianCommon from "@/components/AccordianCommon";
import { removeHTML } from "@/utils";

// DATA //

/** CuttingEdgeModels Section */
export default function CuttingEdgeModels({ data }) {
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

	const eventSpeakersData2 = data?.list?.map((item) => {
		let obj = {};
		const related = item?.category;
		obj.tag = related;
		obj.title = item?.title;
		// if (item?.countries?.nodes?.length > 0) {
		obj.children = (
			<>
				<p className={`${styles.Desc} text_reg  pb_20`}>
					{parse(item.description)}
				</p>
			</>
		);
		// }
		return obj;
	});

	const eventSpeakersData = [
		{
			productName: "ORIGIN",
			title: "Energy Market Model",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			productLogo: origin_logo.src,
		},
		{
			productName: "AER-GAS",
			title: "Global Gas Market Model",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			productLogo: origin_logo.src,
		},
		{
			productName: "AER-GLO",
			title: "Global Commodities Model",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			productLogo: origin_logo.src,
		},
		{
			productName: "AER-GLO",
			title: "Global Commodities Model",
			desc:
				"Anna Clunes has served as His Majesty’s Ambassador to Poland since September 2020, bringing decades of diplomatic and leadership experience to the role.  Before her appointment, Anna held several senior positions in the UK government, including Acting Director General and Director at the Department for Exiting the European Union (2017–2020). Her expertise in economic diplomacy was honed as Director of Economic Diplomacy at the Foreign & Commonwealth Office (FCO) from 2015 to 2017.  Anna has also led strategic and protocol-focused departments, serving as Director of Protocol (2012–2014) and Head of Communications and Engagement (2010–2012) at the FCO, where she co-headed the Communications Directorate. <br /> Her experience extends to the Cabinet Office, where she was Deputy Director of the European and Global Issues Secretariat (2007–2009) and Private Secretary to the Prime Minister for Africa and Development at No. 10 Downing Street (2006–2007).  Her international assignments have included roles as Counsellor for External Relations at the UK Permanent Representation to the EU in Brussels (2003–2005), First Secretary for Counter-Terrorism at the UK Mission to the United Nations in New York (2000–2003), and Second Secretary for Development Assistance and Economic affairs at the Department for International Development in Warsaw (1996–2000).",
			productLogo: origin_logo.src,
		},
	];

	console.log(eventSpeakersData2, " data?.list");

	if (!data || !data.sectionTitle) return <></>;

	// console.log(eventSpeakersData);
	return (
		<section className={`${styles.CuttingEdgeModels}`}>
			<div className="container">
				<div className={`${styles.titleWrapper} pb_40`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary pb_10">
						{/* <ContentFromCms>{data?.sectionTitle}</ContentFromCms> */}
						{removeHTML(data?.sectionTitle)}
					</h2>
					<div className={`${styles.label} text_reg color_dark_gray`}>
						<ContentFromCms>{data?.sectionDescription}</ContentFromCms>
					</div>
				</div>
				<div className={`${styles.content_main_wrap} `}>
					{data?.list?.length > 0 && (
						<AccordianCommon
							fontStyle={"text_lg"}
							fontWeight={"f_w_s_b"}
							fontFamily={"font_primary"}
							fontColor={"color_secondary"}
							items={eventSpeakersData2}
						/>
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
										{data?.list.map((item, ind) => {
											const relatedLogo =
												item?.category?.nodes?.[0]?.[
													item?.category?.nodes?.[0].contentType?.node?.name
												]?.map?.logo?.node?.mediaItemUrl;

											return (
												<SwiperSlide className={`${styles.item}`} key={ind}>
													<div className={`${styles.PopupItem}`}>
														<div className={`${styles.BoxFlex} f_w`}>
															<div className={`${styles.Details}`}>
																<div className={`${styles.boxName}`}>
																	<h5
																		className={`${styles.Name} text_lg color_white font_primary`}
																	>
																		{item.title}
																	</h5>
																	<div className={`${styles.productLogo} pt_20`}>
																		<img src={relatedLogo} className="" alt=" img" />
																	</div>
																</div>
																<p
																	className={`${styles.Desc} text_reg color_platinum_gray pb_20`}
																>
																	{parse(item.description)}
																</p>
															</div>
														</div>
													</div>
												</SwiperSlide>
											);
										})}
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
