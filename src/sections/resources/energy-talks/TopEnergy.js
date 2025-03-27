// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/TopEnergy.module.scss";

// IMAGES //
import energy_logo from "@/../public/img/energy_talks/energy_logo.jpg";
import upcoming_img from "@/../public/img/events/upcoming_img.jpg";
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import black_clock from "@/../public/img/icons/black_clock.svg";

// DATA //

/** TopEnergy Section */
export default function TopEnergy() {
	return (
		<section className={`${styles.TopEnergy}`}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Latest Podcast
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_30">
							ep.234 Lucy yu & jon norman on the role of flexibility to enable a clean
							power grid
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
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>country</span>
							</p>
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<img src={energy_logo.src} className="width_100 b_r_20" alt="img" />
					</div>
				</div>
			</div>
		</section>
	);
}
