"use client";
// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// STYLES //
import styles from "@/styles/sections/careers/CareersInsideBanner.module.scss";

// PLUGINS //

// IMAGES //
import event_inside_banner from "@/../public/img/events/event_inside_banner.jpg";
import energy_transition from "@/../public/img/events/energy_transition.png";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import grey_calendar from "@/../public/img/icons/grey_calendar.svg";
import grey_location from "@/../public/img/icons/grey_location.svg";
import grey_clock from "@/../public/img/icons/grey_clock.svg";

// UTILS //
import formatDate from "@/utils";

/** Events Inside Banner component */
function CareersInsideBanner({ data }) {
	return (
		<section className={`${styles.EventsInsideBanner}`}>
			<div className="container">
				{/* Banner Content */}
				<div className={`f_w ${styles.country}`}>
					{data?.earlyCareers?.thumbnail?.country?.node?.title && (
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white pb_30`}
						>
							{data?.earlyCareers?.thumbnail?.country?.node?.title}
						</div>
					)}
					{data?.earlyCareers?.banner?.city && (
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white pb_30`}
						>
							{data?.earlyCareers?.banner?.city}
						</div>
					)}
					{data?.earlyCareers?.thumbnail?.islive && (
						<div
							className={`${styles.tag} ${styles.isLive} text_xxs font_primary text_uppercase f_w_s_b pb_30`}
						>
							Live
						</div>
					)}
				</div>

				<div className={`${styles.bannerTxt} pb_40`}>
					<h1 className="text_xl font_primary f_w_m color_secondary text_uppercase">
						{data?.title}
					</h1>
				</div>
				<div className={`${styles.dateBox} pb_10`}>
					<ul>
						<li className="text_xs color_light_gray text_uppercase">
							{/* <img src={grey_calendar.src} alt="grey_calendar" /> */}
							<span>Application window:</span>
							<span>{data?.earlyCareers?.banner?.applicationWindow}</span>
						</li>
						<li className="text_xs color_light_gray text_uppercase">
							{/* <img src={grey_location.src} alt="grey_calendar" /> */}
							<span>Commencing in:</span>
							<span>{data?.earlyCareers?.banner?.commencingIn}</span>
						</li>
						<li className="text_xs color_light_gray text_uppercase">
							{/* <img src={grey_clock.src} alt="grey_calendar" /> */}
							<span>Programme Duration: </span>
							<span>{data?.earlyCareers?.banner?.programmeDuration}</span>
						</li>
						{/* <li className="text_xs color_light_gray text_uppercase">
							<a href="" className="">
								<img src={share.src} alt="share" />
							</a>
						</li> */}
					</ul>
				</div>
			</div>
			<div className="containerLarge">
				<div className={`${styles.inner_banner_wrap} `}>
					{/* Banner Image or Video */}
					<div className={`${styles.banner_image}`}>
						<picture>
							<source
								srcSet={data?.earlyCareers?.banner?.mobile?.node?.mediaItemUrl}
								media="(min-width:767px)"
							/>
							<img
								src={data?.earlyCareers?.banner?.desktop?.node?.mediaItemUrl}
								alt="Banner Image"
							/>
						</picture>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CareersInsideBanner;
