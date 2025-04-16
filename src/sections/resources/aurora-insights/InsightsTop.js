// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/InsightsTop.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";

// DATA //

/** InsightsTop Section */
export default function InsightsTop() {
	return (
		<section className={`${styles.InsightsTop}`}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Latest Case Study
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_30">
							Analysing the financial roadmap to Net Zero by 2035
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>mar 2025</span>
							</p>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={black_clock.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>28 min 24 sec</span>
							</p>
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<img src={plant_img.src} className="width_100 b_r_20" alt="img" />
					</div>
				</div>
			</div>
		</section>
	);
}
