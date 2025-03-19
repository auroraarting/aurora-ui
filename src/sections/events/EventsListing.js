// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsListing.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";

// DATA //

/** EventsListing Section */
export default function EventsListing() {
	return (
		<section className={`${styles.EventsListing}`}>
			<div className="container">
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
				</div>
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
