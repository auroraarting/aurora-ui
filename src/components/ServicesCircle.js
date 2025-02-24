// MODULES //

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/ServicesCircle.module.scss";

// IMAGES //
import IconStrategy from "../../public/img/softwares/Icon-Strategy.svg";

// DATA //
const services = [
	{ id: 1, icon: IconStrategy.src, label: "Strategy" },
	{ id: 2, icon: IconStrategy.src, label: "Execution" },
	{ id: 3, icon: IconStrategy.src, label: "Innovation" },
	{ id: 4, icon: IconStrategy.src, label: "Growth" },
	{ id: 5, icon: IconStrategy.src, label: "Optimization" },
	{ id: 6, icon: IconStrategy.src, label: "Sustainability" },
];

/** ServicesCircle Component */
export default function ServicesCircle() {
	return (
		<div className={`${styles.ServicesCircleSection} dark_bg `}>
			<div className="container">
				<div className={`${styles.CircleGrid}`}>
					<div className={`${styles.CircleInfo}`}>
						<h3 className="text_xl color_white pb_20">
							Chronos Edge in Energy Storage Valuation
						</h3>
						<p className="text_reg color_platinum_gray">
							Lorem ipsum dolor sit amet consectetur. Velit vel iaculis fames velit
							mauris morbi volutpat. Senectus purus est cursus ac. Amet tortor at ac a
							mi eu urna risus nulla.
						</p>
					</div>
					<div className={`${styles.CircleInfo} ${styles.CircleBox}`}>
						{/* Quadrants */}
						<div className={`${styles.Quadrant} ${styles.TopLeft}`}>
							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
							{/* <p className={`${styles.IconInfo}`}>
								Lorem ipsum dolor sit amet consectetur. Sed dolor purus elit.
							</p> */}
						</div>
						<div className={`${styles.Quadrant} ${styles.TopRight}`}>
							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
						</div>
						<div className={`${styles.Quadrant} ${styles.BottomLeft}`}>
							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
						</div>
						<div className={`${styles.Quadrant} ${styles.BottomRight}`}>
							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
						</div>
						{/* Inner Circle */}
						<div className={`${styles.CenterBox}`}></div>
					</div>
				</div>
			</div>
		</div>
	);
}
