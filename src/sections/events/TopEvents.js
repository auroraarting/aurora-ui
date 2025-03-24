// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/TopEvents.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import upcoming_img from "../../../public/img/events/upcoming_img.jpg";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";

// DATA //

/** TopEvents Section */
export default function TopEvents() {
	return (
		<section className={`${styles.TopEvents}`}>
			<div className="container">
				<div className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<img src={energy_transition.src} className="" alt="img" />
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							Upcoming Event
						</div>
						<h2 className="text_lg color_white text_uppercase f_w_m pt_20">
							Aurora Energy Transition Summit Warsaw 2025
						</h2>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={calender.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>Feb 26, 2025</span>
							</p>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>India</span>
							</p>
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<img src={upcoming_img.src} className="width_100 b_r_20" alt="img" />
					</div>
				</div>
			</div>
		</section>
	);
}
