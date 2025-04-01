// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarInsideTopSection.module.scss";

// IMAGES //
import energy_logo from "@/../public/img/energy_talks/energy_logo.jpg";
import spotify from "@/../public/img/energy_talks/spotify.svg";
import apple from "@/../public/img/energy_talks/apple.svg";
import google from "@/../public/img/energy_talks/google.svg";
import calender from "@/../public/img/icons/calender.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import location from "@/../public/img/icons/location.svg";

// DATA //

/** WebinarInsideTopSection Section */
export default function WebinarInsideTopSection() {
	return (
		<section className={`${styles.WebinarInsideTopSection} `}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Upcoming: Public Webinar
						</div>
						<h2 className="text_lg color_secondary text_uppercase f_w_m pt_30">
							Overview of the Tucson Electric Power Resource Plan and Procurement
							Activities
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_20`}>
							<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>Mar 26, 2025 @ 12:00 pm - 1:00 pm CST</span>
							</p>
							<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
								<img
									src={location.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>India</span>
							</p>
							<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
								<img src={share.src} className={`${styles.calender}`} alt="calender" />
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
