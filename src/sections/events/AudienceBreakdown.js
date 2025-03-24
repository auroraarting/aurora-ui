// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/AudienceBreakdown.module.scss";

// IMAGES //
import circle_graph from "@/../public/img/events/circle_graph.png";

// DATA //

/** AudienceBreakdown Section */
export default function AudienceBreakdown() {
	return (
		<div className="container">
			<div className={`${styles.titleWrapper}`}>
				<h2 className="text_xl font_primary f_w_m color_secondary pb_10">
					Audience Breakdown
				</h2>
				<p className={`${styles.label} text_reg color_dark_gray`}>
					Lorem ipsum dolor sit amet consectetur. Massa elementum elementum sed purus
					pulvinar volutpat. Habitant nec in aliquam nisl ullamcorper. Aliquam
					euismod fringilla pharetra turpis et.
				</p>
			</div>
			<div className={`${styles.circle_graph} pt_20`}>
				<picture>
					<source srcSet={circle_graph.src} media="(min-width:767px)" />
					<img src={circle_graph.src} alt="circle graph" />
				</picture>
			</div>
		</div>
	);
}
