// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarMiddleRight.module.scss";

// IMAGES //
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import linkedin from "@/../public/img/resources/aurora_insights/linkedin.svg";
import twitter from "@/../public/img/resources/aurora_insights/twitter.svg";

// DATA //

/** WebinarMiddleRight Section */
export default function WebinarMiddleRight({ data }) {
	return (
		<div className={`${styles.WebinarMiddleRightBox}`}>
			{(data?.webinarsFields?.speakers?.nodes ||
				data?.webinarsFields?.poweredBy?.nodes) && (
				<div className={`${styles.whiteBox}`}>
					{data?.webinarsFields?.speakers?.nodes && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Speaker</h5>
						</div>
					)}
					{data?.webinarsFields?.speakers?.nodes?.map((item, ind) => {
						return (
							<div className={`${styles.BoxName}`} key={item?.title}>
								<h5 className="text_reg color_gray f_w_m pb_10">{item?.title}</h5>
							</div>
						);
					})}
					{data?.webinarsFields?.poweredBy?.nodes && (
						<div className={`${styles.itemBox} pt_20`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Service</h5>
							{data?.webinarsFields?.poweredBy?.nodes?.map((item, ind) => {
								/**keyModule  */
								const keyModule = () => {
									if (item?.contentType?.node?.name === "softwares") {
										return "software";
									}
									return item?.contentType?.node?.name;
								};
								return (
									<a
										href={`/${keyModule()}/${item?.slug}`}
										target="_blank"
										rel="noreferrer"
										key={item?.title}
										className={`${styles.ClientFlex} ${styles.speakerFlex} f_r_a_center`}
									>
										<div className={`${styles.ClientLogo}`}>
											<img
												src={
													item?.[item?.contentType?.node?.name]?.banner?.logo?.node
														?.mediaItemUrl
												}
												alt="pic"
											/>
										</div>
										{/* <div className={`${styles.ClientDescription}`}>
									<h5 className="text_xs font_primary color_gray f_w_b font_primary">
										Power & Renewables Service
									</h5>
								</div> */}
									</a>
								);
							})}
						</div>
					)}
				</div>
			)}
			<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
				<div className={`${styles.InsideItem}`}>
					{data?.webinarTags?.nodes?.length > 0 && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
							<div className={`${styles.ClientFlex} f_w`}>
								{data?.webinarTags?.nodes?.map((item) => {
									return (
										<a
											key={item?.title || item?.name || item}
											className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
											href={`/resources/webinar?search=${
												item?.title || item?.name || item
											}`}
										>
											{item?.title || item?.name || item}
										</a>
									);
								})}
							</div>
						</div>
					)}
					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_b pb_10">Share</h5>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<a href="" className={`${styles.shareIcon}`}>
								<img src={linkedin.src} alt="linkedin" />
							</a>
							<a href="" className={`${styles.shareIcon}`}>
								<img src={twitter.src} alt="twitter" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
