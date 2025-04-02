// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/case-studies/CaseStudiesTop.module.scss";

// IMAGES //
import download from "@/../public/img/resources/aurora_insights/download.svg";
import play from "@/../public/img/resources/aurora_insights/play.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import copy from "@/../public/img/resources/aurora_insights/copy.svg";

// DATA //

/** CaseStudiesTop Section */
export default function CaseStudiesTop() {
	return (
		<section className={`${styles.CaseStudiesTop} pt_100`}>
			<div className="container">
				<div className={`${styles.titleTxt} pb_80`}>
					<h2 className="text_xl font_primary f_w_m color_secondary text_uppercase ">
						Analysing the financial roadmap to Net Zero by 2035
					</h2>
				</div>
				<div className={`${styles.dateBox}`}>
					<ul>
						<li className="text_xs color_dark_gray text_uppercase">December 2024</li>
						<li className="text_xs color_dark_gray text_uppercase">5 min Read</li>
					</ul>
					<div className={`${styles.downloadListenBox} f_w_j a_center`}>
						<div className={`${styles.downloadListen}`}>
							<div className={`${styles.downloadBox} f_r_a_center`}>
								<a href="" className="text_sm f_w_m font_primary f_r_a_center">
									<img src={download.src} alt="download" />
									<span>Download</span>
								</a>
								<a href="" className="text_sm f_w_m font_primary f_r_a_center">
									<img src={play.src} alt="play" />
									<span>Listen</span>
								</a>
							</div>
						</div>
						<div className={`${styles.downloadListenShare} f_r_a_center`}>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={share.src} alt="share" />
							</a>
							<a href="" className="text_sm f_w_m font_primary f_r_a_center">
								<img src={copy.src} alt="copy" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
