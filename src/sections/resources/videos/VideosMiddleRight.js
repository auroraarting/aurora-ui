// MODULES //

// COMPONENTS //
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/videos/VideosMiddleRight.module.scss";

// IMAGES //
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import white_arrow from "@/../public/img/energy_talks/white_arrow.svg";
import grey_clock from "@/../public/img/icons/grey_clock.svg";
import grey_calendar from "@/../public/img/icons/grey_calendar.svg";

// DATA //

/** VideosMiddleRight Section */
export default function VideosMiddleRight({ data, videos }) {
	return (
		<div className={`${styles.VideosMiddleRightBox}`}>
			{(data?.videoFields?.speakers?.nodes ||
				data?.videoFields?.poweredBy?.nodes) && (
				<div className={`${styles.whiteBox} ${styles.speaker}`}>
					{data?.videoFields?.speakers?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Guests</h5>
							{data?.videoFields?.speakers?.nodes?.map((item) => {
								return (
									<div
										className={`${styles.ClientFlex} ${styles.speakerFlex}  f_r_a_center`}
										key={item?.title}
									>
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
					{data?.videoFields?.poweredBy?.nodes && (
						<div className={`${styles.itemBox} ${styles.power}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
							{data?.videoFields?.poweredBy?.nodes?.map((item) => {
								/**keyModule  */
								const keyModule = () => {
									if (item?.contentType?.node?.name === "softwares") {
										return "software";
									}
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

												<span className="f_r_aj_between text_xxs text_uppercase">
													Know more
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
					<h5 className="text_reg color_gray f_w_m pb_10 font_primary">
						Interested in featuring in a video?
					</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientDescription}`}>
							<div className="text_xs color_dark_gray font_primary">
								<ContentFromCms>
									{data?.videoFields?.interested
										? data?.videoFields?.interested
										: `We’re always looking for new and exciting thought leadership.
                                           For enquiries, please contact <span className="f_w_b">
                                           <a href="mailto:steve.downing@aurora.com"><strong>Steve Downing</strong></a>
                                           </span>`}
								</ContentFromCms>
							</div>
						</div>
					</div>
				</div>
			</div>

			{videos?.length > 0 && (
				<div className={`${styles.whiteBox} ${styles.podcast}`}>
					<h5
						className={`${styles.subTxt} text_reg color_gray f_w_b pb_10 font_primary`}
					>
						Latest Video
					</h5>
					<div className={`${styles.itemBox}`}>
						{videos?.map((item) => {
							return (
								<a
									href={`/resources/videos/${item.slug}`}
									className={`${styles.ClientFlex}`}
									key={item?.title}
								>
									<div className={`${styles.ClientLogo}`}>
										<ContentFromCms>{item?.title}</ContentFromCms>
									</div>
									<div className={`${styles.dateFlex} pt_10`}>
										<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center pb_10">
											<img
												src={grey_calendar.src}
												className={`${styles.calender}`}
												alt="calender"
											/>
											<span>{formatDate(item?.videoFields?.date)}</span>
										</p>
										{item?.videoFields?.time && (
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={grey_clock.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>{item?.videoFields?.time}</span>
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
