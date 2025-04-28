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
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Speaker</h5>
				</div>
				<div className={`${styles.BoxName}`}>
					<h5 className="text_reg color_gray f_w_m pb_10">John Feddersen</h5>
				</div>
				<div className={`${styles.BoxName}`}>
					<h5 className="text_reg color_gray f_w_m pb_10">Duncan Young</h5>
				</div>
				<div className={`${styles.itemBox} pt_20`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Service</h5>
					<div className={`${styles.ClientFlex} ${styles.speakerFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={author_logo.src} alt="pic" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<h5 className="text_xs font_primary color_gray f_w_b font_primary">
								Power & Renewables Service
							</h5>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
				<div className={`${styles.InsideItem}`}>
					{data?.tags?.nodes?.length > 0 && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
							<div className={`${styles.ClientFlex} f_w`}>
								{data?.tags?.nodes?.map((item) => {
									return (
										<a
											key={item?.title || item?.name || item}
											className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
											href={`/resources/aurora-insights&search=${
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
