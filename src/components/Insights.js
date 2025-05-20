"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "./ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "../utils/EqualHeight";
import formatDate, {
	allCategories,
	dynamicInsightsBtnProps,
	isCategory,
} from "@/utils";

// STYLES //
import styles from "@/styles/components/Insights.module.scss";

// IMAGES //
import clock from "../../public/img/icons/clock.svg";
import white_calendar from "../../public/img/icons/white_calendar.svg";
import white_location from "../../public/img/icons/white_location.svg";
import close from "../../public/img/icons/close.png";
import form_img from "../../public/img/softwares/form_img.png";
import hoverBg from "../../public/img/home/hoverBg.png";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Insights Section */
export default function Insights({
	isFormVisible,
	setIsFormVisible,
	isPowerBgVisible,
	isInsightsBlogsVisible,
	defaultList,
	countries,
	insightsTitle = "Insights",
	formSectionTitle = "Let’s power the future, together",
	formSectionDesc = "",
	formSectionBtnText = "Sign up",
	formdata,
	insightsLink = "/resources/aurora-insights/",
	customHtml,
	hideall,
	allTag,
}) {
	const pathname = usePathname();
	const [data, setData] = useState({ data: defaultList, countries });

	/** handleOpenForm Section */
	const handleOpenForm = () => {
		setIsFormVisible(true);
		// setIsTitleVisible(false); // Hide title when opening form
	};

	/** handleCloseForm Section */
	const handleCloseForm = () => {
		setIsFormVisible(false);
		// setIsTitleVisible(true); // Show title when closing form
	};

	/** defaultPathname  */
	const defaultPathname = () => {
		if (insightsLink) {
			return insightsLink;
		}
		if (pathname?.split("[slug]")?.length > 1) {
			return pathname?.split("[slug]")[0];
		}
		return pathname;
	};

	/** fetchdata  */
	const fetchdata = async () => {
		const resdata = await fetch("/api/shortInsights");
		const resjson = await resdata.json();
		setData(resjson);
	};

	/** BtnProps  */
	function BtnProps() {
		if (formdata) {
			return {
				...formdata,
				// href: defaultPathname(),
			};
		} else {
			return dynamicInsightsBtnProps();
		}
	}

	useEffect(() => {
		if (!defaultList || defaultList.length === 0) {
			fetchdata();
		}
	}, []);

	let sectionId = {};
	// if (!hideall) {
	// 	sectionId.id = "insights";
	// 	sectionId["data-name"] = "Insights";
	// }

	return (
		<section className={`${styles.Insights} Insights`} {...sectionId}>
			<div className="containerLarge">
				<div className={`${styles.insightsBg} insightsBg dark_bg`}>
					{isPowerBgVisible && (
						<div className={`${styles.powerBg} powerBg`}>
							{!isFormVisible && (
								<div className={`${styles.contentFlex} contentFlex f_j`}>
									<div className={`${styles.title_wrap}`}>
										{/* <h2 className="text_lg font_primary f_w_s_b color_white m_b_15">
											{insightsTitle}
										</h2> */}
										<p className="text_lg font_primary f_w_s_b color_white">
											{formSectionTitle}
										</p>
										<div className={`${styles.desc} text_reg color_silver_gray`}>
											<ContentFromCms>{formSectionDesc}</ContentFromCms>
										</div>
									</div>
									{customHtml && customHtml}
									{!customHtml && (
										<a
											className={`${styles.bookBtn}`}
											onClick={() => handleOpenForm()}
											// {...formdata}
											// href={defaultPathname()}
											{...BtnProps()}
										>
											<Button color="primary" variant="filled" shape="rounded" mode="dark">
												{formSectionBtnText}
											</Button>
										</a>
									)}
								</div>
							)}

							{isFormVisible && (
								<div className={`${styles.formFlex} f_j`}>
									<div className={`${styles.close}`} onClick={handleCloseForm}>
										<img src={close.src} className={`${styles.closeIcon}`} alt="close" />
									</div>
									<div className={`${styles.form_title}`}>
										<h2 className="text_lg font_primary f_w_s_b color_white m_b_15">
											{insightsTitle}
										</h2>
										<p className="text_reg font_primary color_silver_gray">
											{formSectionTitle}
										</p>
										<div className={`${styles.desc} text_reg color_silver_gray`}>
											<ContentFromCms>{formSectionDesc}</ContentFromCms>
										</div>
									</div>
									<div className={`${styles.formBox}`}>
										{/* <img
										src={form_img.src}
										className={`${styles.form_img}`}
										alt="form_img"
									/> */}
										<iframe
											src="https://go.auroraer.com/l/885013/2025-01-30/p1g4m"
											className={`${styles.form_img}`}
											title="Form"
										></iframe>
									</div>
								</div>
							)}
						</div>
					)}
					{isInsightsBlogsVisible && (
						<div className={`${styles.insightsItemBox} insightsItemBox`}>
							<div className={`${styles.titleFlex} pb_20 f_j`}>
								<div className={`${styles.title} `}>
									<h2 className="text_xl font_primary f_w_s_b color_white ">
										{insightsTitle}
									</h2>
								</div>
								<a
									// onClick={() => handleOpenForm()}
									// {...formdata}
									href={defaultPathname()}
									// {...BtnProps()}
									className={`${styles.bookBtn}`}
								>
									<Button color="primary" variant="filled" shape="rounded" mode="dark">
										View All
									</Button>
								</a>
							</div>
							<div className={`${styles.insightsItemFlex} d_f m_t_30`}>
								{data?.data?.map((item, ind) => {
									return (
										<a
											href={`${defaultPathname()}${item?.slug}`}
											className={`${styles.ItemBox} boxH`}
											key={item?.title}
										>
											<div className={`${styles.hoverBox}`}>
												<img
													height={179}
													width={446}
													src={hoverBg.src}
													className={`${styles.hoverBg} width_100 b_r_10`}
													alt="img"
												/>
												{(isCategory(allCategories, item?.categories?.nodes) || allTag) && (
													<p
														className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
													>
														{allTag || isCategory(allCategories, item?.categories?.nodes)}
													</p>
												)}

												<p
													className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}
												>
													{item?.title}
												</p>
												<div className={`${styles.dateFlex} f_j pt_30`}>
													<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
														<img src={white_calendar.src} alt="calendar" />
														<span>
															{formatDate(item?.date || item?.presses?.banner?.date)}
														</span>
													</p>
													{isCategory(data?.countries, item?.categories?.nodes) && (
														<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
															<img src={white_location.src} alt="location" />
															<span>
																{isCategory(data?.countries, item?.categories?.nodes)}
															</span>
														</p>
													)}
													{item.podcastFields?.country?.nodes && (
														<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
															<img src={white_location.src} alt="location" />
															<span>
																{item.podcastFields?.country?.nodes?.map(
																	(item2) => item2.title
																)}
															</span>
														</p>
													)}
												</div>
											</div>
										</a>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
