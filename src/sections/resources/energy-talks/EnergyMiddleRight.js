// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/EnergyMiddleRight.module.scss";

// IMAGES //
import author_logo from "@/../public/img/resources/aurora_insights/author_logo.png";
import social_icon from "@/../public/img/resources/aurora_insights/social_icon.svg";
import amun_logo from "@/../public/img/energy_talks/amun_logo.png";
import white_arrow from "@/../public/img/energy_talks/white_arrow.svg";
import amun_hover_logo from "@/../public/img/energy_talks/amun_hover_logo.png";
import spring_forum from "@/../public/img/events/spring_forum.png";
import grey_clock from "@/../public/img/icons/grey_clock.svg";
import grey_calendar from "@/../public/img/icons/grey_calendar.svg";

// DATA //

/** EnergyMiddleRight Section */
export default function EnergyMiddleRight({ data }) {
	return (
		<div className={`${styles.EnergyMiddleRightBox}`}>
			<div className={`${styles.whiteBox}`}>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Speaker</h5>
					<div className={`${styles.ClientFlex} ${styles.speakerFlex} f_r_a_center`}>
						<div className={`${styles.ClientLogo}`}>
							<img src={author_logo.src} alt="pic" />
						</div>
						<div className={`${styles.ClientDescription}`}>
							<h5 className="text_reg font_primary color_gray f_w_m font_primary">
								John Feddersen
							</h5>
							<p className="text_xs f_w_l">Founder and CEO</p>
							<div className={`${styles.social}`}>
								<img src={social_icon.src} alt="pic" />
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.itemBox}`}>
					<h5 className="text_reg color_gray f_w_b pb_10">Powered by</h5>
					<div className={`${styles.poweredBy}`}>
						<a href="">
							<div className={`${styles.poweredLogo}`}>
								<img
									src={amun_hover_logo.src}
									className={`${styles.amun_logo}`}
									alt="amun_logo"
								/>
								{/* <img
								src={amun_hover_logo.src}
								className={`${styles.amun_hover_logo}`}
								alt="amun_logo"
							/> */}

								<span className="f_r_aj_between text_xxs text_uppercase">
									Know More
									<img src={white_arrow.src} className="" alt="amun_logo" />
								</span>
							</div>
						</a>
					</div>
				</div>
			</div>
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
				<h5 className={`${styles.subTxt} text_reg color_gray f_w_b pb_10`}>
					Upcoming Podcast
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
							<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
								<img
									src={grey_clock.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>28 min 24 sec</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
