// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsMiddleRight.module.scss";

// IMAGES //
import spring_forum from "@/../public/img/events/spring_forum.png";
import grey_location from "../../../public/img/icons/grey_location.svg";
import grey_calendar from "../../../public/img/icons/grey_calendar.svg";

import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import origin from "@/../public/img/resources/aurora_insights/origin.png";

// DATA //

/** Client Section */
export default function EventsMiddleRight() {
	return (
		<div className={`${styles.EventsMiddleRightBox}`}>
			<div className={`${styles.whiteBox} ${styles.yellowBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_m pb_10">
						Interested in partnering with us?
					</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_xs color_dark_gray font_primary">
								We&apos;re always looking for new and exciting opportunities to
								collaborate. For partnership enquiries, please contact{" "}
								<span className="f_w_b">
									<u>Priscilla Castro</u>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Pricing</h5>
					<div className={`${styles.ClientFlex} f_r_a_center`}>
						<div className={`${styles.ClientDescription}`}>
							<p className="text_xs color_dark_gray font_primary">
								The event is free of charge and tickets are limited - book yours today
								and don’t miss this chance to contribute to the conversations driving
								the energy transition forward.
							</p>
							<div className={`${styles.btn_box} pt_10`}>
								<Button color="secondary" variant="underline">
									Register Now
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={`${styles.whiteBox}`}>
				<h5 className={`${styles.subTxt} text_reg color_gray f_w_b pb_10`}>
					Upcoming Events
				</h5>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex}`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={spring_forum.src} alt="logo" />
						</div>
						<div className={`${styles.dateFlex} pt_10`}>
							<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center pb_10">
								<img
									src={grey_calendar.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>May 2025</span>
							</p>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={grey_location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>London</span>
							</p>
						</div>
					</div>
				</div>
				<div className={`${styles.itemBox}`}>
					<div className={`${styles.ClientFlex}`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={spring_forum.src} alt="logo" />
						</div>
						<div className={`${styles.dateFlex} pt_10`}>
							<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center pb_10">
								<img
									src={grey_calendar.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>May 2025</span>
							</p>
							<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
								<img
									src={grey_location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>London</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
