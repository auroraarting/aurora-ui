// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/media-center/MediaMiddleRight.module.scss";

// IMAGES //
import client_logo from "@/../public/img/resources/aurora_insights/client_logo.svg";
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";
import linkedin from "@/../public/img/resources/aurora_insights/linkedin.svg";
import twitter from "@/../public/img/resources/aurora_insights/twitter.svg";
import tag_download_icon from "@/../public/img/resources/aurora_insights/tag_download_icon.svg";

// DATA //

/** MediaMiddleRight Section */
export default function MediaMiddleRight() {
	return (
		<div className={`${styles.MediaMiddleRight}`}>
			<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
				<div className={`${styles.InsideItem}`}>
					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
						<div className={`${styles.ClientFlex} f_w`}>
							<a
								className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
								href=""
							>
								NET ZERO
							</a>
							<a
								className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
								href=""
							>
								WIND
							</a>
							<a
								className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
								href=""
							>
								United Kingdom
							</a>
							<a
								className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
								href=""
							>
								ADVISORY
							</a>
						</div>
					</div>
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
				<div className={`${styles.DownBtn} `}>
					<a href="" className="text_sm f_w_m font_primary f_r_a_center">
						<img src={tag_download_icon.src} alt="download" />
						<span>Download</span>
					</a>
				</div>
			</div>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={client_logo.src} alt="logo" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_reg font_primary">Shaping the energy discussion</p>
							<div className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View Webinar
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={client_logo.src} alt="logo" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_reg font_primary">Energy unplugged by Aurora</p>
							<div className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View All Podcast
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
