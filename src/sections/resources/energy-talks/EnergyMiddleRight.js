// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/EnergyMiddleRight.module.scss";

// IMAGES //
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import amun_logo from "@/../public/img/energy_talks/amun_logo.png";
import white_arrow from "@/../public/img/energy_talks/white_arrow.svg";
import amun_hover_logo from "@/../public/img/energy_talks/amun_hover_logo.png";
import spring_forum from "@/../public/img/events/spring_forum.png";
import grey_clock from "@/../public/img/icons/grey_clock.svg";
import grey_calendar from "@/../public/img/icons/grey_calendar.svg";
import formatDate from "@/utils";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** EnergyMiddleRight Section */
export default function EnergyMiddleRight({ data, events }) {
	return (
		<div className={`${styles.EnergyMiddleRightBox}`}>
			{(data?.podcastFields?.speakers ||
				data?.podcastFields?.poweredBy?.nodes) && (
				<div className={`${styles.whiteBox}`}>
					{data?.podcastFields?.speakers?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Speaker</h5>
							{data?.podcastFields?.speakers?.nodes?.map((item, ind) => {
								return (
									<div
										className={`${styles.ClientFlex} ${styles.speakerFlex}  f_r_a_center`}
										key={item?.title}
									>
										{item?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl && (
											<div className={`${styles.ClientLogo}`}>
												<img
													src={item?.postSpeakers?.thumbnail?.image?.node?.mediaItemUrl}
													alt="pic"
												/>
											</div>
										)}
										<div className={`${styles.ClientDescription}`}>
											<h5 className="text_reg font_primary color_gray f_w_m font_primary">
												{item?.title}
											</h5>
											<p className="text_xs f_w_l">
												{item?.postSpeakers?.thumbnail?.designation}
											</p>
											{item?.postSpeakers?.thumbnail?.linkedinLink && (
												<a
													href={item?.postSpeakers?.thumbnail?.linkedinLink}
													target="_blank"
													rel="noreferrer"
													className={`${styles.social}`}
												>
													<img src={social_icon.src} alt="pic" />
												</a>
											)}
										</div>
									</div>
								);
							})}
						</div>
					)}
					{data?.podcastFields?.poweredBy?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
							{data?.podcastFields?.poweredBy?.nodes?.map((item, ind) => {
								/**keyModule  */
								const keyModule = () => {
									if (item?.contentType?.node?.name === "softwares") {
										return "software";
									}
									return item?.contentType?.node?.name;
								};
								/** hregModule  */
								const hrefModule = () => {
									if (item?.contentType?.node?.name === "services") {
										return "service";
									}
									return item?.contentType?.node?.name;
								};
								return (
									<div className={`${styles.poweredBy}`} key={item?.title}>
										<a
											href={`/${keyModule()}/${item?.slug}`}
											target="_blank"
											rel="noreferrer"
										>
											<div className={`${styles.poweredLogo}`}>
												<img
													src={
														item?.[item?.contentType?.node?.name]?.banner?.logo?.node
															?.mediaItemUrl
													}
													className={`${styles.amun_logo}`}
													alt={`${item?.contentType?.node?.name}_logo`}
												/>
												{/* <img
                                    src={amun_hover_logo.src}
                                    className={`${styles.amun_hover_logo}`}
                                    alt="amun_logo"
                                /> */}

												<span className="f_r_aj_between text_xxs text_uppercase">
													Know More
													<img src={white_arrow.src} className="" alt="amun_logo" />
												</span>
											</div>
										</a>
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
			<div className={`${styles.whiteBox} ${styles.yellowBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_m pb_10">
						Interested in partnering with us?
					</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientDescription}`}>
							<div className="text_xs color_dark_gray font_primary">
								<ContentFromCms>
									{data?.podcastFields?.interested
										? data?.podcastFields?.interested
										: `We&apos;re always looking for new and exciting opportunities to
									collaborate. For partnership enquiries, please contact
									<span className="f_w_b">
										<u>Priscilla Castro</u>
									</span>`}
								</ContentFromCms>
							</div>
						</div>
					</div>
				</div>
			</div>

			{events.length > 0 && (
				<div className={`${styles.whiteBox}`}>
					<h5 className={`${styles.subTxt} text_reg color_gray f_w_b pb_10`}>
						Upcoming Podcast
					</h5>
					<div className={`${styles.itemBox}`}>
						{events?.map((item, ind) => {
							return (
								<a
									href={`/resources/energy-talks/${item.slug}`}
									className={`${styles.ClientFlex}`}
									key={item?.title}
								>
									<div className={`${styles.ClientLogo}`}>
										{/* <img src={spring_forum.src} alt="logo" /> */}
										<p>{item?.title}</p>
									</div>
									<div className={`${styles.dateFlex} pt_10`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center pb_10">
											<img
												src={grey_calendar.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>{formatDate(item?.date)}</span>
										</p>
										{item?.time && (
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={grey_clock.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>{item?.time}</span>
											</p>
										)}
									</div>
								</a>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}
