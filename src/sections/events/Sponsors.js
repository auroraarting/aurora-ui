// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/Sponsors.module.scss";

// IMAGES //
import national_grid from "@/../public/img/events/national_grid.png";

// DATA //

/** Sponsors Section */
export default function Sponsors() {
	return (
		<div className={`${styles.Sponsors} pb_50`}>
			<h2 className="text_lg color_secondary pb_10">Sponsors</h2>
			<div className={`${styles.SponsorsFlex} d_f`}>
				<div className={`${styles.SponsorsItem}`}>
					<h4 className="text_reg color_dark_gray f_w_b">Partner</h4>
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
			</div>
			<div className={`${styles.SponsorsFlex} d_f`}>
				<div className={`${styles.SponsorsItem}`}>
					<h4 className="text_reg color_dark_gray f_w_b">Media Partner</h4>
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
				<div className={`${styles.SponsorsItem}`}>
					<img src={national_grid.src} alt="map" />
				</div>
			</div>
		</div>
	);
}
