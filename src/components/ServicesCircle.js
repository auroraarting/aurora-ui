// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/ServicesCircle.module.scss";

// IMAGES //

// DATA //

/** ServicesCircle Component */
export default function ServicesCircle() {
	return (
		<div className={`${styles.ServicesCircleSection} dark_bg `}>
			<div className="container">
				<div className={`${styles.CircleGrid}`}>
					<div className={`${styles.CircleInfo}`}>
						<h3 className="text_xl color_white pb_20">
							Chronos Edge in energy storage valuation
						</h3>
						<p className="text_reg color_platinum_gray">
							Lorem ipsum dolor sit amet consectetur. Velit vel iaculis fames velit
							mauris morbi volutpat. Senectus purus est cursus ac. Amet tortor at ac a
							mi eu urna risus nulla.
						</p>
					</div>
					<div className={`${styles.CircleInfo} ${styles.CircleBox}`}></div>
				</div>
			</div>
		</div>
	);
}
