"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/PublicWebinar.module.scss";

// IMAGES //
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import formatDate from "@/utils";

// DATA //

/** PublicWebinar Section */
export default function PublicWebinar({ events, webinars }) {
	return (
		<section
			className={`${styles.PublicWebinar}`}
			id="events-webinars"
			data-name="Events & Webinars"
		>
			<div className="container">
				<div className={`${styles.titleTxt} pb_30`}>
					<h2 className="text_xl font_primary f_w_m color_secondary">
						All voices all markets
					</h2>
				</div>
				<div className={`${styles.publicFlex} f_w_j`}>
					<div className={`${styles.publicRight}`}>
						{events?.map((item) => {
							let hrefObj = {};

							if (item?.events?.thumbnail?.externalUrl) {
								hrefObj.href = item?.events?.thumbnail?.externalUrl;
								hrefObj.target = "_blank";
								hrefObj.rel = "noreferrer";
							} else {
								hrefObj.href = `/events/${item?.slug}`;
							}

							return (
								<a {...hrefObj} className={`${styles.ItemBox}`} key={item?.id}>
									<div className={`${styles.contentBox}`}>
										<p
											className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
										>
											{item?.eventscategories?.nodes?.map((item2) => item2.name)}
											{/* {" Webinar"} */}
										</p>
										<h4 className={`${styles.descTxt} text_lg color_secondary pt_10`}>
											{item?.title}
										</h4>
										<div className={`${styles.dateFlex} f_j pt_30`}>
											<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
												<img
													src={calender.src}
													className={`${styles.calender}`}
													alt="calender"
												/>
												<span>{formatDate(item?.events?.thumbnail?.date)}</span>
											</p>
											{item?.events?.thumbnail?.country?.nodes.length > 0 && (
												<p className="text_xs f_w_m color_secondary text_uppercase f_r_a_center">
													<img
														src={location.src}
														className={`${styles.location}`}
														alt="location"
													/>
													<span>
														{item?.events?.thumbnail?.country?.nodes?.map(
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
						{/* <div className={`${styles.ItemBox}`}>
							<div className={`${styles.contentBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
								>
									Public Webinar
								</p>
								<h4 className={`${styles.descTxt} text_lg color_secondary pt_10`}>
									Analysing the financial roadmap to Net Zero by 2035. Analysing the
									financial roadmap to Net Zero by 2035
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
						<div className={`${styles.bookBtnOne} pt_40`}>
							<a href="/events">
								<Button color="primary" variant="filled" shape="rounded">
									View All Events
								</Button>
							</a>
						</div>
					</div>
					<div className={`${styles.publicleft}`}>
						<div className={`${styles.webinarBox}`}>
							<div className={`${styles.webinarItem}`}>
								{webinars?.map((item) => {
									return (
										<a href={`/resources/webinar/${item?.slug}`} key={item?.id}>
											<div className={`${styles.contentBox}`}>
												<p
													className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase`}
												>
													{item?.eventCategories?.nodes?.map((item) => item?.name)} Webinar
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
														/>
														<span>{formatDate(item?.webinarsFields?.startDateAndTime)}</span>
													</p>
													{item?.webinarsFields?.country?.nodes?.length > 0 && (
														<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
															<img
																src={location.src}
																className={`${styles.location}`}
																alt="location"
															/>
															{item?.webinarsFields?.country?.nodes?.map((item2) => (
																<span key={item?.title + item2?.title}>{item2?.title}</span>
															))}
														</p>
													)}
												</div>
											</div>
										</a>
									);
								})}
								{/* <div className={`${styles.contentBox}`}>
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
						<div className={`${styles.bookBtnOne} pt_40`}>
							<a href="/resources/webinar">
								<Button color="primary" variant="filled" shape="rounded">
									View All Webinars
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
