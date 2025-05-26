// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/press-releases/InsideTopSection.module.scss";

// IMAGES //
import press_img from "@/../public/img/media-center/press_img.jpg";
import grey_clock from "@/../public/img/icons/grey_clock.svg";
import calender from "@/../public/img/icons/calender.svg";

import download from "@/../public/img/resources/aurora_insights/download.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import copy from "@/../public/img/resources/aurora_insights/copy.svg";

// DATA //

/** InsideTopSection Section */
export default function InsideTopSection({
	title,
	date,
	time,
	featuredImage,
	dataForBtn,
}) {
	return (
		<section className={`${styles.InsideTopSection} `}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<h1 className="text_lg color_secondary text_uppercase f_w_m pt_20">
							{title}
						</h1>
						<div className={`${styles.dateFlex} f_r_a_center pt_20`}>
							{date && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={calender.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{formatDate(date)}</span>
								</p>
							)}
							{time && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={grey_clock.src}
										className={`${styles.location}`}
										alt="location"
									/>
									<span>{time}</span>
								</p>
							)}
						</div>
					</div>
					{featuredImage && (
						<div className={`${styles.imageWrapper}`}>
							<img src={featuredImage} className="width_100 b_r_20" alt={title} />
						</div>
					)}
				</div>
				{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
					<div className={`${styles.dateBox}`}>
						<div className={`${styles.downloadListenBox} f_w_j a_center`}>
							<div className={`${styles.downloadListen}`}>
								<div className={`${styles.downloadBox} f_r_a_center ptb_10`}>
									{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext && (
										<a
											{...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}
											className="text_sm f_w_m font_primary f_r_a_center"
										>
											<img src={download.src} alt="download" />
											<span>
												{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
											</span>
										</a>
									)}
								</div>
							</div>

							{/* <div className={`${styles.downloadListenShare} f_r_a_center`}>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={share.src} alt="share" />
							</a>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={copy.src} alt="copy" />
							</a>
						</div> */}
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
