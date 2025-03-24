// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// STYLES //
import styles from "@/styles/sections/events/EventsInsideBanner.module.scss";

// PLUGINS //

// IMAGES //
import event_inside_banner from "@/../public/img/events/event_inside_banner.jpg";
import energy_transition from "@/../public/img/events/energy_transition.png";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import grey_calendar from "@/../public/img/icons/grey_calendar.svg";
import grey_location from "@/../public/img/icons/grey_location.svg";
import grey_clock from "@/../public/img/icons/grey_clock.svg";

// UTILS //

/** Events Inside Banner component */
function EventsInsideBanner() {
	return (
		<section className={`${styles.EventsInsideBanner}`}>
			<div className="container">
				{/* Banner Content */}
				<div
					className={`${styles.tag} text_xxs font_primary text_uppercase color_white pb_30`}
				>
					Upcoming Event
				</div>
				<div className={`${styles.bannerTxt} pb_40`}>
					<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
						Aurora Energy Transition Summit Warsaw 2025
					</h1>
				</div>
				<div className={`${styles.dateBox} pb_10`}>
					<ul>
						<li className="text_xs color_light_gray text_uppercase">
							<img src={grey_calendar.src} alt="grey_calendar" />
							<span>Feb 20, 2025</span>
						</li>
						<li className="text_xs color_light_gray text_uppercase">
							<img src={grey_location.src} alt="grey_calendar" />
							<span>InterContinental Hotel Warsaw</span>
						</li>
						<li className="text_xs color_light_gray text_uppercase">
							<img src={grey_clock.src} alt="grey_calendar" />
							<span>Doors open at 12:30 CET</span>
						</li>
						<li className="text_xs color_light_gray text_uppercase">
							<a href="" className="">
								<img src={share.src} alt="share" />
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="containerLarge">
				<div className={`${styles.inner_banner_wrap} `}>
					{/* Banner Image or Video */}
					<div className={`${styles.banner_image}`}>
						<picture>
							<source srcSet={event_inside_banner.src} media="(min-width:767px)" />
							<img src={event_inside_banner.src} alt="Banner Image" />
						</picture>
					</div>
					<div className={`${styles.banner_logo}`}>
						<img src={energy_transition.src} alt="energy transition" />
					</div>
				</div>
			</div>
		</section>
	);
}

export default EventsInsideBanner;
