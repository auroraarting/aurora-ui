"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsLocation.module.scss";

// IMAGES //
import map from "@/../public/img/events/map.jpg";
import ContentFromCms from "@/components/ContentFromCms";

// DATA //

/** EventsLocation Section */
export default function EventsLocation({ data }) {
	if (!data?.events?.location?.mapLink) return null;
	return (
		<section
			className={`${styles.EventsLocation} pb_50`}
			id="location"
			data-name="Location"
		>
			<div className="f_w_j">
				<div className={`${styles.locationLeft}`}>
					<h2 className="text_lg color_secondary pb_10">Location</h2>
					<p className="text_reg color_dark_gray f_w_b">
						{data?.events?.location?.address}
					</p>
				</div>
				<div className={`${styles.locationRight}`}>
					<ContentFromCms>{data?.events?.location?.mapLink}</ContentFromCms>
					{/* <img src={map.src} className="width_100" alt="map" /> */}
				</div>
			</div>
			{data?.events?.location?.desc && (
				<ContentFromCms>{data?.events?.location?.desc}</ContentFromCms>
			)}
		</section>
	);
}
