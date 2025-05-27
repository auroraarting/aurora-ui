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
	console.log(events, "events");
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
								<a {...hrefObj} className={`${styles.ItemBox}`} key={item?.title}>
									<a href={item?.link} className={`${styles.insideBox}`} role="button">
										<div className={`${styles.banner} relative`}>
											<img
												src={item?.events?.banner?.desktop?.node?.mediaItemUrl}
												className={`${styles.case_img} width_100 b_r_10`}
												alt={item?.cat}
												height={360}
												width={640}
												loading="lazy"
											/>

											<img
												src={item?.events?.thumbnail?.logo?.node?.mediaItemUrl}
												className={`${styles.case_img_logo}`}
												alt={item?.cat}
												loading="lazy"
											/>
										</div>
										<div
											className={`${styles.categoryTxt} text_xs color_dark_gray font_primary text_uppercase m_t_20`}
										>
											{item?.eventscategories?.nodes?.map((item2) => item2?.name)}
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
												<span>{formatDate(item?.events?.thumbnail?.date)}</span>
											</p>
											{/* {isCategory(countries, item?.categories?.nodes) && ( */}
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
													loading="lazy"
												/>
												<span>
													{item?.events?.thumbnail?.country?.nodes?.map(
														(item2) => item2.title
													)}
												</span>
											</p>
											{/* )} */}
										</div>
									</a>
								</a>
							);
						})}
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
