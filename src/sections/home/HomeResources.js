"use client";

// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/home/HomeResources.module.scss";

// IMAGES //
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import case_img from "../../../public/img/home/case_img.jpg";
import podcast_img from "../../../public/img/home/podcast_img.jpg";
import hoverBg from "../../../public/img/home/hoverBg.png";
import formatDate, {
	allCategories,
	isCategory,
	OpenIframePopup,
} from "@/utils";
import Image from "next/image";

// DATA //

/** HomeResources Section */
export default function HomeResources({ data, countries, voices }) {
	/** Map WP/Strapi category names → the label you want to surface */
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const CATEGORY_DISPLAY = {
		"Case Studies": "LATEST CASE STUDY",
		"Energy Talks": "LATEST PODCAST",
		Events: "UPcoming EVENT",
	};

	// eslint-disable-next-line require-jsdoc
	const getDisplayCategory = (cat) =>
		CATEGORY_DISPLAY[cat] || cat?.toUpperCase(); // fallback keeps everything else nice

	return (
		<section
			className={`${styles.HomeResources}`}
			aria-label="resources section"
			title="resources section"
		>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary f_w_s_b color_secondary">
						All voices, all markets
					</h2>
				</div>
				<div className={`${styles.publicFlex} f_w_j`}>
					<div className={`${styles.publicRight}`}>
						{voices
							.slice(0, 3)
							.reverse()
							.map((item) => {
								let hrefObj = {};

								if (item?.externalUrl) {
									// hrefObj.href = item?.events?.thumbnail?.externalUrl;
									// hrefObj.target = "_blank";
									// hrefObj.rel = "noreferrer";
									hrefObj.onClick = () =>
										OpenIframePopup(
											"iframePopup",
											item?.externalUrl ||
												"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
										);
									if (item?.openExternalInNewTab) {
										delete hrefObj.onClick;
										hrefObj.target = "_blank"; // Open in new tab
										hrefObj.rel = "noopener noreferrer"; // Security best practice
									}
								} else {
									hrefObj.href = item?.link;
								}

								const webinarCats = item?.eventCategories?.nodes?.[0]?.name;

								return (
									<div className={`${styles.ItemBox}`} key={item?.title}>
										<a {...hrefObj} className={`${styles.insideBox}`} role="button">
											<img
												src={item?.thumb}
												className={`${styles.case_img} width_100 b_r_10`}
												alt={item?.cat}
												height={360}
												width={640}
												loading="lazy"
											/>
											<div
												className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
											>
												{webinarCats} {getDisplayCategory(item?.cat)}
											</div>
											<h4
												className={`${styles.descTxt} text_md f_w_m color_secondary font_primary pt_10`}
											>
												{item?.title}
											</h4>
											<div className={`${styles.dateFlex} f_j pt_30`}>
												<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
													<img
														src={calender.src}
														className={`${styles.calender}`}
														alt="calender"
														loading="lazy"
													/>
													<span>{formatDate(item?.date)}</span>
												</p>
												{isCategory(countries, item?.categories?.nodes) && (
													<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
														<img
															src={location.src}
															className={`${styles.location}`}
															alt="location"
															loading="lazy"
														/>
														<span>
															{item?.events
																? item?.categories?.nodes?.map((item) => item.name)
																: isCategory(countries, item?.categories?.nodes)}
														</span>
													</p>
												)}
											</div>
										</a>
									</div>
								);
							})}
					</div>
					<div className={`${styles.publicleft}`}>
						<div className={`${styles.webinarBox}`}>
							<div className={`${styles.webinarItem}`}>
								{voices?.slice(5, 8)?.map((item) => {
									const webinarCats = item?.eventCategories?.nodes?.[0]?.name;

									let hrefObj = {};

									if (item?.externalUrl) {
										// hrefObj.href = item?.events?.thumbnail?.externalUrl;
										// hrefObj.target = "_blank";
										// hrefObj.rel = "noreferrer";
										hrefObj.onClick = () =>
											OpenIframePopup(
												"iframePopup",
												item?.externalUrl ||
													"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
											);
										if (item?.openExternalInNewTab) {
											delete hrefObj.onClick;
											hrefObj.target = "_blank"; // Open in new tab
											hrefObj.rel = "noopener noreferrer"; // Security best practice
										}
									} else {
										hrefObj.href = item?.link;
									}

									return (
										<a {...hrefObj} key={item?.title} role="button">
											<div className={`${styles.contentBox}`}>
												<img
													height={179}
													width={446}
													src={hoverBg.src}
													className={`${styles.hoverBg} width_100 b_r_10`}
													alt="img"
													loading="lazy"
												/>
												<p
													className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
												>
													{webinarCats} {item?.cat}
												</p>
												<h4
													className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
												>
													{item?.title}
												</h4>
												<div className={`${styles.dateFlex} f_j pt_30`}>
													<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
														<img
															src={calender.src}
															className={`${styles.calender}`}
															alt="calender"
															loading="lazy"
														/>
														<span>{formatDate(item?.date)}</span>
													</p>
													{isCategory(countries, item?.categories?.nodes) && (
														<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
															<img
																src={location.src}
																className={`${styles.location}`}
																alt="location"
																loading="lazy"
															/>
															<span>{isCategory(countries, item?.categories?.nodes)}</span>
														</p>
													)}
												</div>
											</div>
										</a>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
