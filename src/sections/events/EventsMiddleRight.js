"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { dynamicInsightsBtnProps, OpenIframePopup } from "@/utils";

// STYLES //
import styles from "@/styles/sections/events/EventsMiddleRight.module.scss";

// IMAGES //
import spring_forum from "@/../public/img/events/spring_forum.png";
import grey_location from "../../../public/img/icons/grey_location.svg";
import grey_calendar from "../../../public/img/icons/grey_calendar.svg";

import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";

// DATA //

/** Client Section */
export default function EventsMiddleRight({ data, events }) {
	return (
		<div className={`${styles.EventsMiddleRightBox}`}>
			{data?.events?.interestedDesc && (
				<div className={`${styles.whiteBox} `}>
					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_m pb_10">
							Interested in partnering with us?
						</h5>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<div className={`${styles.ClientDescription}`}>
								<div className="text_xs color_dark_gray font_primary">
									{/* We&apos;re always looking for new and exciting opportunities to
								collaborate. For partnership enquiries, please contact{" "}
								<span className="f_w_b">
									<u>Priscilla Castro</u>
								</span> */}
									<ContentFromCms>{data?.events?.interestedDesc}</ContentFromCms>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{data?.events?.pricingDesc && (
				<div
					className={`${styles.whiteBox} ${styles.pricingDesc} ${styles.yellowBox}`}
				>
					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_b pb_10">Pricing</h5>
						<div className={`${styles.ClientFlex}  f_r_a_center  text_xs`}>
							<div className={`${styles.ClientDescription}`}>
								<div className="text_xs color_dark_gray font_primary">
									{/* The event is free of charge and tickets are limited - book yours today
								and don’t miss this chance to contribute to the conversations driving
								the energy transition forward. */}
									<ContentFromCms>{data?.events?.pricingDesc}</ContentFromCms>
									{dynamicInsightsBtnProps(
										{ postFields: data?.events },
										"middleSectionButton"
									).btntext && (
										<div
											{...dynamicInsightsBtnProps(
												{ postFields: data?.events },
												"middleSectionButton"
											)}
											key="btn"
											to="Insights"
										>
											<Button color="secondary" variant="underline" textlowercase>
												{
													dynamicInsightsBtnProps(
														{ postFields: data?.events },
														"middleSectionButton"
													).btntext
												}
											</Button>
										</div>
									)}
								</div>
								{/* <div className={`${styles.btn_box} pt_10`}>
								<Button color="secondary" variant="underline">
									Register Now
								</Button>
							</div> */}
							</div>
						</div>
					</div>
				</div>
			)}

			{events?.length > 0 && (
				<div className={`${styles.whiteBox}`}>
					<h5 className={`${styles.subTxt} text_reg color_gray f_w_b pb_10`}>
						UPCOMING EVENT
					</h5>
					{events?.map((item) => {
						let hrefObj = {};
						if (item?.events?.thumbnail?.externalUrl) {
							hrefObj.href = item?.events?.thumbnail?.externalUrl;
							hrefObj.onClick = (e) => {
								e?.preventDefault(); // Prevent navigation
								OpenIframePopup(
									"iframePopup",
									item?.events?.thumbnail?.externalUrl ||
										"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
								);
							};
							if (item?.events?.thumbnail?.openExternalInNewTab) {
								delete hrefObj.onClick;
								hrefObj.target = "_blank"; // Open in new tab
								hrefObj.rel = "noopener noreferrer"; // Security best practice
							}
						} else {
							hrefObj.href = `/events/${item?.slug}`;
						}

						return (
							<a
								// href={`/events/${item?.slug}`}
								{...hrefObj}
								className={`${styles.itemBox}`}
								key={item?.title}
							>
								<div className={`${styles.ClientFlex}`}>
									<div className={`${styles.ClientLogo}`}>
										<img
											src={item?.events?.thumbnail?.logo?.node?.mediaItemUrl}
											alt="Events Logo"
										/>
									</div>
									<div className={`${styles.dateFlex} pt_10`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center pb_10">
											<img
												src={grey_calendar.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>{formatDate(item?.events?.thumbnail?.date)}</span>
										</p>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
											<img
												src={grey_location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>
												{item?.events?.thumbnail?.country?.nodes?.map(
													(item) => item?.title
												) || "London"}
											</span>
										</p>
									</div>
								</div>
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
}
