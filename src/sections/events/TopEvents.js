"use client";

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
import formatDate from "@/utils";

// DATA //

/** TopEvents Section */
export default function TopEvents({ data }) {
	return (
		<section className={`${styles.TopEvents}`}>
			<div className="container">
				<a href={`/events/${data?.slug}`} className={`${styles.card} f_w_j`}>
					<div className={`${styles.content}`}>
						<img
							src={data?.events?.thumbnail?.logo?.node?.sourceUrl}
							className=""
							alt="img"
						/>
						<div
							className={`${styles.tag} text_xxs font_primary text_uppercase color_white`}
						>
							{data?.events?.thumbnail?.status} Event
						</div>
						<p className="color_white text_lg text_uppercase m_t_30 font_primary f_w_m">
							{data?.title}
						</p>
						<div className={`${styles.dateFlex} f_r_a_center pt_10`}>
							{data?.events?.thumbnail?.date && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={calender.src}
										className={`${styles.calender}`}
										alt="calender"
									/>
									<span>{formatDate(data?.events?.thumbnail?.date)}</span>
								</p>
							)}
							{data?.events?.thumbnail?.country?.nodes && (
								<p className="text_xs f_w_m color_medium_gray text_uppercase f_r_a_center">
									<img
										src={location.src}
										className={`${styles.location}`}
										alt="location"
									/>
									<span>
										{data?.events?.thumbnail?.country?.nodes?.map((item) => item.title)}
									</span>
								</p>
							)}
						</div>
					</div>
					<div className={`${styles.imageWrapper}`}>
						<img
							src={data?.events?.banner?.desktop?.node?.sourceUrl}
							className="width_100 b_r_20"
							alt="img"
						/>
					</div>
				</a>
			</div>
		</section>
	);
}
