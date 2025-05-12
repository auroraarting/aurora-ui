"use client";
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
export default function AudienceBreakdown({ data }) {
	return (
		<div className="container">
			<div className={`${styles.titleWrapper}`}>
				<h2 className="text_xl font_primary f_w_m color_secondary pb_10">
					{data?.events?.breakdown?.sectionTitle}
				</h2>
				<p className={`${styles.label} text_reg color_dark_gray`}>
					{data?.events?.breakdown?.sectionDesc}
				</p>
			</div>
			<div className={`${styles.circle_graph} pt_20`}>
				<picture>
					<source
						srcSet={data?.events?.breakdown?.mobileImage?.node?.mediaItemUrl}
						media="(min-width:767px)"
					/>
					<img
						src={data?.events?.breakdown?.desktopImage?.node?.mediaItemUrl}
						alt="circle graph"
					/>
				</picture>
			</div>
		</div>
	);
}
