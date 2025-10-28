"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "./ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/CaseStudy.module.scss";

// IMAGES //
import plant_img from "../../public/img/services/advisory/plant_img.jpg";
import clock from "../../public/img/icons/grey_clock.svg";
import location from "../../public/img/icons/grey_location.svg";
import calender from "../../public/img/icons/grey_calendar.svg";
import formatDate, { allCategories, isCategory, slugify } from "@/utils";

// DATA //

/** CaseStudy Section */
export default function CaseStudy({
	data,
	countries = [],
	translatedSectionName,
}) {
	// if (!data || !data?.title) return <></>;

	const first = data?.selectCaseStudies?.nodes?.slice(0, 1);
	const restArr = data?.selectCaseStudies?.nodes?.slice(1, data.length);

	return (
		<section
			className={`${styles.CaseStudy}`}
			id="case-study"
			data-name={translatedSectionName || "Case Studies"}
		>
			<div className="container">
				<div className={`${styles.contentImgFlex} f_w_j`}>
					<div className={`${styles.contentBox}`}>
						<a
							href={`/resources/aurora-insights/case-studies/${first?.[0]?.slug}`}
							className={`${styles.hoverBox}`}
						>
							<p
								className={`${styles.categoryTxt} text_xs color_dark_gray text_uppercase`}
							>
								{data?.title}
							</p>
							<h3
								className={`${styles.descTxt} ${styles.descTxtNew} text_xl color_secondary pt_10`}
							>
								{first?.[0]?.title}
							</h3>
							{/* <div className="text_reg color_dark_gray font_secondary pt_10">
								<ContentFromCms>{first?.[0]?.content}</ContentFromCms>
							</div> */}
							<div className={`${styles.dateFlex} f_j pt_30`}>
								{first?.[0]?.date && (
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>{formatDate(first?.[0]?.date)}</span>
									</p>
								)}
								{first?.[0]?.postFields?.time && (
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img src={clock.src} className={`${styles.clock}`} alt="location" />
										<span>{first?.[0]?.postFields?.time}</span>
									</p>
								)}
							</div>
						</a>
					</div>
					<div className={`${styles.ImgBox}`}>
						<img
							src={first?.[0]?.featuredImage?.node?.mediaItemUrl}
							className={`${styles.plant_img} img width_100 b_r_20`}
							alt={data?.title}
						/>
					</div>
				</div>
				<div className={`${styles.CaseStudyFlex} d_f m_t_30`}>
					{restArr?.map((item, ind) => {
						return (
							<div className={`${styles.ItemBox} boxH`} key={ind}>
								<a
									href={`/resources/aurora-insights/case-studies/${item?.slug}`}
									className={`${styles.hoverBox}`}
								>
									<p
										className={`${styles.categoryTxt} text_xs color_dark_gray text_uppercase`}
									>
										{translatedSectionName || "Case Study"}
									</p>
									<p
										className={`${styles.descTxt} text_reg color_dark_gray font_primary pt_10`}
									>
										{item?.title}
									</p>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										{item?.date && (
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={calender?.src}
													className={`${styles.calender}`}
													alt="calender"
												/>
												{/* <span>Feb 26, 2025</span> */}
												<span>{item?.date && formatDate(item?.date)}</span>
											</p>
										)}
										{isCategory(countries, item?.categories?.nodes) && (
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
												/>
												{/* <span>WECC</span> */}
												<span>{isCategory(countries, item?.categories?.nodes)}</span>
											</p>
										)}
									</div>
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
