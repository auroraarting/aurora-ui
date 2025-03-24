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

// DATA //

/** EventsLocation Section */
export default function EventsLocation() {
	return (
		<div className={`${styles.EventsLocation} f_w_j ptb_50`}>
			<div className={`${styles.locationLeft}`}>
				<h2 className="text_lg color_secondary pb_10">Location</h2>
				<p className="text_reg color_dark_gray f_w_b">
					InterContinental Hotel Warsaw
				</p>
				<p className="text_reg color_dark_gray">
					Emilii Plater Street 49, 00-125 Warszawa, Poland
				</p>
			</div>
			<div className={`${styles.locationRight}`}>
				<img src={map.src} className="width_100" alt="map" />
			</div>
		</div>
	);
}
