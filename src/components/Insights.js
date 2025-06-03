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
	slugify,
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
const tempdata = {
	data: [
		{
			title:
				"Upside forecast from participating in ancillary services in Iberia for a range of renewable-generation technologies",
			slug:
				"upside-forecast-from-participating-in-ancillary-services-in-iberia-for-a-range-of-renewable-generation-technologies",
			date: "2025-05-14T14:56:52",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Frame-8.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
					},
				],
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: {
				nodes: [],
			},
			postFields: {
				time: "5 MIN READ",
				speakers: null,
			},
		},
		{
			title:
				"Grid curtailment estimation at a specific node in the context of a solar PV financing in Spain",
			slug:
				"grid-curtailment-estimation-at-a-specific-node-in-the-context-of-a-solar-pv-financing-in-spain",
			date: "2025-05-14T14:53:11",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Grid-curtailment-estimation-Image.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
					},
				],
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: {
				nodes: [],
			},
			postFields: {
				time: "5 MIN READ",
				speakers: null,
			},
		},
		{
			title:
				"Optimal size determination of an electrolyser project co-located with solar PV and BESS for a developer in Spain",
			slug:
				"optimal-size-determination-of-an-electrolyser-project-co-located-with-solar-pv-and-bess-for-a-developer-in-spain",
			date: "2025-05-14T14:48:43",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Frame-3-1.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
					},
				],
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: {
				nodes: [],
			},
			postFields: {
				time: "5 MIN READ",
				speakers: null,
			},
		},
	],
	countries: [
		{
			title: "Australia",
			slug: "australia",
		},
		{
			title: "Austria",
			slug: "austria",
		},
		{
			title: "Baltics",
			slug: "baltics",
		},
		{
			title: "Belgium",
			slug: "belgium",
		},
		{
			title: "Brazil",
			slug: "brazil",
		},
		{
			title: "Bulgaria",
			slug: "bulgaria",
		},
		{
			title: "Chile",
			slug: "chile",
		},
		{
			title: "Croatia",
			slug: "croatia",
		},
		{
			title: "Czechia",
			slug: "czechia",
		},
		{
			title: "Europe",
			slug: "europe",
		},
		{
			title: "France",
			slug: "france",
		},
		{
			title: "Germany",
			slug: "germany",
		},
		{
			title: "Great Britain",
			slug: "great-britain",
		},
		{
			title: "Greece",
			slug: "greece",
		},
		{
			title: "Hungary",
			slug: "hungary",
		},
		{
			title: "Iberia",
			slug: "iberia",
		},
		{
			title: "India",
			slug: "india",
		},
		{
			title: "Ireland",
			slug: "ireland",
		},
		{
			title: "Italy",
			slug: "italy",
		},
		{
			title: "Japan",
			slug: "japan",
		},
		{
			title: "Korea",
			slug: "korea",
		},
		{
			title: "London",
			slug: "london",
		},
		{
			title: "Malaysia",
			slug: "malaysia",
		},
		{
			title: "Netherlands",
			slug: "netherlands",
		},
		{
			title: "New Zealand",
			slug: "new-zealand",
		},
		{
			title: "Noram",
			slug: "noram",
		},
		{
			title: "Nordics",
			slug: "nordics",
		},
		{
			title: "Philippines",
			slug: "philippines",
		},
		{
			title: "Poland",
			slug: "poland",
		},
		{
			title: "Romania",
			slug: "romania",
		},
		{
			title: "Serbia",
			slug: "serbia",
		},
		{
			title: "Singapore",
			slug: "singapore",
		},
		{
			title: "Slovakia",
			slug: "slovakia",
		},
		{
			title: "Slovenia",
			slug: "slovenia",
		},
		{
			title: "Spain",
			slug: "spain",
		},
		{
			title: "Sweden",
			slug: "sweden",
		},
		{
			title: "Switzerland",
			slug: "switzerland",
		},
		{
			title: "UK",
			slug: "uk",
		},
	],
};

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
	const defaultPathname = (categories) => {
		if (categories && insightsLink.includes("/resources/aurora-insights/")) {
			return `${insightsLink}${slugify(isCategory(allCategories, categories))}/`;
		}
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
			setData(tempdata);
			fetchdata();
		}
	}, []);

	let sectionId = {};
	// if (!hideall) {
	// 	sectionId.id = "insights";
	// 	sectionId["data-name"] = "Insights";
	// }

	useEffect(() => {
		EqualHeight(`${styles.ItemBox}`);
	}, [data]);

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
										<p className="text_lg font_primary f_w_s_b color_white pb_10">
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
										View all
									</Button>
								</a>
							</div>
							<div className={`${styles.insightsItemFlex} d_f m_t_30`}>
								{data?.data?.map((item, ind) => {
									return (
										<a
											href={`${defaultPathname(item?.categories?.nodes)}${item?.slug}`}
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
													{item?.customHtmlForTitle ? (
														<ContentFromCms>{item?.title}</ContentFromCms>
													) : (
														item?.title
													)}
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
