// MODULES //
import { useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/CaseStudiesTop.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import download from "@/../public/img/resources/aurora_insights/download.svg";
import play from "@/../public/img/resources/aurora_insights/play.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import copy from "@/../public/img/resources/aurora_insights/copy.svg";
import calender from "@/../public/img/icons/calender.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";
import formatDate, { dynamicInsightsBtnProps, OpenIframePopup } from "@/utils";

// DATA //

/** CaseStudiesTop Section */
export default function CaseStudiesTop({ data }) {
	const [isPlaying, setIsPlaying] = useState(false);

	/** Speechify  */
	const Speechify = () => {
		if (!isPlaying) {
			window.speechifyPlay();
			setIsPlaying(true);
		} else {
			window.speechifyPause();
			setIsPlaying(false);
		}
	};

	return (
		<section className={`${styles.CaseStudiesTop} pt_100`}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<h2 className="text_lg color_secondary text_uppercase f_w_m pt_30">
							{data?.title}
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_20`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								{/* <span>mar 2025</span> */}
								<span>{formatDate(data?.date)}</span>
							</p>
							{/* <p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={black_clock.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>28 min 24 sec</span>
							</p> */}
						</div>
					</div>
					{data?.featuredImage?.node?.sourceUrl && (
						<div className={`${styles.imageWrapper}`}>
							<img
								src={data?.featuredImage?.node?.sourceUrl}
								className="width_100 b_r_20"
								alt="img"
							/>
						</div>
					)}
				</div>
				<div className={`${styles.dateBox}`}>
					{/* <ul>
						<li className="text_xs color_dark_gray text_uppercase">December 2024</li>
						<li className="text_xs color_dark_gray text_uppercase">5 min Read</li>
					</ul> */}
					<div className={`${styles.downloadListenBox} f_w_j a_center`}>
						<div className={`${styles.downloadListen}`}>
							<div className={`${styles.downloadBox} f_r_a_center`}>
								{dynamicInsightsBtnProps(data, "topSectionButton").btnText && (
									<a
										{...dynamicInsightsBtnProps(data, "topSectionButton")}
										className="text_sm f_w_m font_primary f_r_a_center"
									>
										<img src={download.src} alt="download" />
										<span>
											{dynamicInsightsBtnProps(data, "topSectionButton").btnText}
										</span>
									</a>
								)}

								<a
									onClick={Speechify}
									className="text_sm f_w_m font_primary f_r_a_center speechify_wrap"
								>
									<img src={play.src} alt="play" />
									<span>{isPlaying ? "Pause" : "Listen"}</span>
								</a>
							</div>
						</div>
						<div className={`${styles.downloadListenShare} f_r_a_center`}>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={share.src} alt="share" />
							</a>
							{/* <a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={copy.src} alt="copy" />
							</a> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
