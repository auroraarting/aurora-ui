"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, { allCategories, isCategory } from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarInsideTopSection.module.scss";

// IMAGES //
import calender from "@/../public/img/icons/calender.svg";
import share from "@/../public/img/resources/aurora_insights/share.svg";
import location from "@/../public/img/icons/location.svg";
import { formatWebinarDateTime } from "@/utils/Client";

// DATA //

/** WebinarInsideTopSection Section */
export default function WebinarInsideTopSection({
	data,
	countries,
	// isUpcoming,
}) {
	const { date, time, isUpcoming } = formatWebinarDateTime(
		data.webinarsFields.startDateAndTime,
		data.webinarsFields.endDateAndTime,
		data.webinarsFields.timezone
	);

	console.log(data, "data");
	return (
		<section className={`${styles.WebinarInsideTopSection} `}>
			<div className="container">
				<div className={`${styles.card}`}>
					<div className={`${styles.content}`}>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							{isUpcoming ? "Upcoming: " : "Completed: "}
							{data?.eventCategories?.nodes?.map((item) => item?.name)} Webinar
						</div>
						<h2 className="text_lg color_secondary text_uppercase f_w_m pt_30">
							{data?.title}
						</h2>
					</div>
					<div className={`${styles.dateFlex} f_r_a_center pt_20`}>
						<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
							<img
								src={calender.src}
								className={`${styles.calender}`}
								alt="calender"
							/>
							<span>
								{date} @ {time}
							</span>
						</p>
						{data?.webinarsFields?.country?.nodes?.length > 0 && (
							<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
								<img
									src={location.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								{data?.webinarsFields?.country?.nodes?.map((item) => (
									<span key={item?.title}>{item?.title}</span>
								))}
							</p>
						)}
						{data?.webinarsFields?.venue && (
							<p className="text_xs f_w_m color_dark_gray text_uppercase f_r_a_center">
								<img
									src={location.src}
									className={`${styles.calender}`}
									alt="calender"
								/>
								<span>{data?.webinarsFields?.venue}</span>
							</p>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
