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
import formatDate, { allCategories, isCategory } from "@/utils";
import Image from "next/image";

// DATA //

/** HomeResources Section */
export default function HomeResources({ data, countries, voices }) {
	return (
		<section className={`${styles.HomeResources}`}>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary f_w_m color_secondary">
						All voices all markets
					</h2>
				</div>
				<div className={`${styles.publicFlex} f_w_j`}>
					<div className={`${styles.publicRight}`}>
						{voices?.slice(0, 3)?.map((item) => {
							return (
								<div className={`${styles.ItemBox}`} key={item?.title}>
									<a href={item?.link} className={`${styles.insideBox}`}>
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
											Latest {item?.cat}
										</div>
										<h4
											className={`${styles.descTxt} text_md f_w_s_b color_secondary pt_10`}
										>
											{item?.title}
										</h4>
										<div className={`${styles.dateFlex} f_j pt_30`}>
											<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
												<img
													src={calender.src}
													className={`${styles.calender}`}
													alt="calender"
													loading="lazy"
												/>
												<span>{formatDate(item?.date)}</span>
											</p>
											{isCategory(countries, item?.categories?.nodes) && (
												<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
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
									</a>
								</div>
							);
						})}
					</div>
					<div className={`${styles.publicleft}`}>
						<div className={`${styles.webinarBox}`}>
							<div className={`${styles.webinarItem}`}>
								{voices?.slice(3, 6)?.map((item) => {
									return (
										<a href={item?.link} key={item?.title}>
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
													{item?.cat}
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
