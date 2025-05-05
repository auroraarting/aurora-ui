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

// DATA //

/** HomeResources Section */
export default function HomeResources({ data, countries }) {
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
						{data?.slice(0, 3)?.map((item) => {
							/** href  */
							const href = () => {
								let cat = isCategory(allCategories, item?.categories?.nodes);
								if (cat.includes("Articles")) {
									return `/resources/aurora-insights/${item?.slug}`;
								} else if (cat.includes("Energy Talks")) {
									return `/resources/energy-talks/${item?.slug}`;
								} else {
									return `/resources/webinar/${item?.slug}`;
								}
							};
							return (
								<div className={`${styles.ItemBox}`} key={item?.title}>
									<a href={href()} className={`${styles.insideBox}`}>
										<img
											src={item?.featuredImage?.node?.sourceUrl}
											className={`${styles.case_img} width_100 b_r_10`}
											alt="case img"
										/>
										{isCategory(allCategories, item?.categories?.nodes) && (
											<div
												className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
											>
												{isCategory(allCategories, item?.categories?.nodes)}
												{/* Latest Case Study */}
											</div>
										)}
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
												/>
												<span>{formatDate(item?.date)}</span>
											</p>
											<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>{isCategory(countries, item?.categories?.nodes)}</span>
											</p>
										</div>
									</a>
								</div>
							);
						})}
						{/* <div className={`${styles.ItemBox}`}>
							<div className={`${styles.insideBox}`}>
								<img
									src={case_img.src}
									className={`${styles.case_img} width_100 b_r_10`}
									alt="case img"
								/>
								<div
									className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
								>
									Latest Case Study
								</div>
								<h4
									className={`${styles.descTxt} text_md f_w_s_b color_secondary pt_10`}
								>
									Analysing the financial roadmap to Net Zero by 2035.
								</h4>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.ItemBox} ${styles.webinarHome}`}>
							<div className={`${styles.insideBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
								>
									Public Webinar
								</p>
								<h4
									className={`${styles.descTxt} text_md f_w_s_b color_secondary pt_10`}
								>
									Analysing The Financial Roadmap To Net Zero By 2035
								</h4>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</div>
						<div className={`${styles.ItemBox}`}>
							<div className={`${styles.insideBox}`}>
								<img
									src={podcast_img.src}
									className={`${styles.case_img} width_100 b_r_10`}
									alt="podcast img"
								/>
								<div
									className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
								>
									Latest Podcast
								</div>
								<h4
									className={`${styles.descTxt} text_md f_w_s_b color_secondary pt_10`}
								>
									<span className="color_blue">Ep.234</span> Lucy yu & jon norman on the
									role of flexibility to enable a clean power grid
								</h4>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</div> */}
					</div>
					<div className={`${styles.publicleft}`}>
						<div className={`${styles.webinarBox}`}>
							<div className={`${styles.webinarItem}`}>
								{data?.slice(3, 6)?.map((item) => {
									/** href  */
									const href = () => {
										let cat = isCategory(allCategories, item?.categories?.nodes);
										if (cat.includes("Articles")) {
											return `/resources/aurora-insights/${item?.slug}`;
										} else if (cat.includes("Energy Talks")) {
											return `/resources/energy-talks/${item?.slug}`;
										} else {
											return `/resources/webinar/${item?.slug}`;
										}
									};
									return (
										<a href={href()} key={item?.title}>
											<div className={`${styles.contentBox}`}>
												<img
													src={hoverBg.src}
													className={`${styles.hoverBg} width_100 b_r_10`}
													alt="img"
												/>
												{isCategory(allCategories, item?.categories?.nodes) && (
													<p
														className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
													>
														{isCategory(allCategories, item?.categories?.nodes)}
													</p>
												)}
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
														/>
														<span>{formatDate(item?.date)}</span>
													</p>
													{isCategory(countries, item?.categories?.nodes) && (
														<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
															<img
																src={location.src}
																className={`${styles.location}`}
																alt="location"
															/>
															<span>{isCategory(countries, item?.categories?.nodes)}</span>
														</p>
													)}
												</div>
											</div>
										</a>
									);
								})}
								{/* <div className={`${styles.contentBox}`}>
									<img
										src={hoverBg.src}
										className={`${styles.hoverBg} width_100 b_r_10`}
										alt="img"
									/>
									<p
										className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
									>
										Public Webinar
									</p>
									<h4
										className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
									>
										Power Play: Unlocking Battery Storage Potential in NYISO
									</h4>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={calender.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>Feb 20, 2025</span>
										</p>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>WECC</span>
										</p>
									</div>
								</div>
								<div className={`${styles.contentBox}`}>
									<img
										src={hoverBg.src}
										className={`${styles.hoverBg} width_100 b_r_10`}
										alt="img"
									/>
									<p
										className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
									>
										Public Webinar
									</p>
									<h4
										className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
									>
										A Deep Dive into CAISO Load Growth
									</h4>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={calender.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>Feb 20, 2025</span>
										</p>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>WECC</span>
										</p>
									</div>
								</div>
								<div className={`${styles.contentBox}`}>
									<img
										src={hoverBg.src}
										className={`${styles.hoverBg} width_100 b_r_10`}
										alt="img"
									/>
									<p
										className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
									>
										Public Webinar
									</p>
									<h4
										className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
									>
										A Deep Dive into CAISO Load Growth
									</h4>
									<div className={`${styles.dateFlex} f_j pt_30`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={calender.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>Feb 20, 2025</span>
										</p>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>WECC</span>
										</p>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
