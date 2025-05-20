/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { LinkedinShareButton, TwitterShareButton } from "react-share";

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaMiddleRight.module.scss";

// IMAGES //
import client_logo from "@/../public/img/resources/aurora_insights/client_logo.svg";
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";
import linkedin from "@/../public/img/resources/aurora_insights/linkedin.svg";
import twitter from "@/../public/img/resources/aurora_insights/twitter.svg";
import tag_download_icon from "@/../public/img/resources/aurora_insights/tag_download_icon.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** MediaMiddleRight Section */
export default function MediaMiddleRight({ data, dataForBtn }) {
	return (
		<div className={`${styles.MediaMiddleRight}`}>
			<div className={`${styles.whiteBox} ${styles.bgGreyBox}`}>
				<div className={`${styles.InsideItem}`}>
					{data?.tags?.nodes.length > 0 && (
						<div className={`${styles.itemBox}`}>
							<h5 className="text_reg color_gray f_w_b pb_10">Tags</h5>
							<div className={`${styles.ClientFlex} f_w`}>
								{data?.tags?.nodes?.map((item, index) => {
									return (
										<a
											key={item?.text}
											className={`${styles.tagLinks} text_xxs f_w_m color_light_gray`}
											href={`/company/press-releases?search=${item?.text || item?.name}`}
										>
											{item?.text || item?.name}
										</a>
									);
								})}
							</div>
						</div>
					)}
					<div className={`${styles.itemBox}`}>
						<h5 className="text_reg color_gray f_w_b pb_10">Share</h5>
						<div className={`${styles.ClientFlex} f_r_a_center`}>
							<a className={`${styles.shareIcon}`}>
								<LinkedinShareButton url={window.location.href}>
									<img src={linkedin.src} alt="linkedin" />
								</LinkedinShareButton>
							</a>
							<a className={`${styles.shareIcon}`}>
								<TwitterShareButton url={window.location.href}>
									<img src={twitter.src} alt="twitter" />
								</TwitterShareButton>
							</a>
						</div>
					</div>
				</div>
				{dynamicInsightsBtnProps(dataForBtn, "bottomSectionButton").btntext && (
					<div className={`${styles.DownBtn} `}>
						<a
							{...dynamicInsightsBtnProps(dataForBtn, "bottomSectionButton")}
							className="text_sm f_w_m font_primary f_r_a_center"
						>
							<img src={tag_download_icon.src} alt="download" />
							<span>
								{dynamicInsightsBtnProps(dataForBtn, "bottomSectionButton").btntext}
							</span>
						</a>
					</div>
				)}
			</div>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={client_logo.src} alt="logo" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_reg font_primary">Shaping the energy discussion</p>
							<a href="/resources/webinar" className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View Webinar
								</Button>
							</a>
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
							<a href="/resources/energy-talks" className={`${styles.btn_box} `}>
								<Button color="secondary" variant="underline">
									View All Podcast
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
