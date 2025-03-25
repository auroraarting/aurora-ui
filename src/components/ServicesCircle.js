// MODULES //

// COMPONENTS //
import CircularMenu from "./CircularMenu";
import ContentFromCms from "./ContentFromCms";
import Button from "./Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/ServicesCircle.module.scss";

// IMAGES //
import IconStrategy from "../../public/img/softwares/Icon-Strategy.svg";

// DATA //
const services = [
	{ id: 1, icon: IconStrategy, label: "Strategy" },
	{ id: 2, icon: IconStrategy, label: "Execution" },
	{ id: 3, icon: IconStrategy, label: "Innovation" },
	{ id: 4, icon: IconStrategy, label: "Growth" },
	{ id: 5, icon: IconStrategy, label: "Optimization" },
	{ id: 6, icon: IconStrategy, label: "Sustainability" },
];

/** ServicesCircle Component */
export default function ServicesCircle({ data }) {
	return (
		<div className={`${styles.ServicesCircleSection} dark_bg `}>
			<div className="container">
				<div className={`${styles.CircleGrid}`}>
					<div className={`${styles.CircleInfo}`}>
						<h3 className="text_xl color_white pb_20">
							{data?.sectionTitle || "Chronos Edge in Energy Storage Valuation"}
						</h3>
						<div className="text_reg color_platinum_gray">
							<ContentFromCms>
								{data?.descripition ||
									`Lorem ipsum dolor sit amet consectetur. Velit vel iaculis fames velit
// 							mauris morbi volutpat. Senectus purus est cursus ac. Amet tortor at ac a
// 							mi eu urna risus nulla.`}
							</ContentFromCms>
						</div>
						<div className="pt_40">
							<a href={data?.buttonLink || ""}>
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									{data?.buttonText || "View More"}
								</Button>
							</a>
						</div>
					</div>
					<div className={`${styles.CircleInfo} ${styles.CircleBox}`}>
						{/*<div className={`${styles.Quadrant} ${styles.TopLeft}`}>
							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
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
						<div className={`${styles.CenterBox}`}></div>*/}
						<CircularMenu
							items={data?.advantages || services}
							iconDefault={IconStrategy}
						/>
						<div className={`${styles.CenterBox}`}></div>
					</div>
				</div>
			</div>
		</div>
	);
}

// // MODULES //

// // COMPONENTS //
// import CircularMenu from "./CircularMenu";

// // SECTIONS //

// // PLUGINS //

// // UTILS //

// // STYLES //
// import styles from "@/styles/components/ServicesCircle.module.scss";

// // IMAGES //
// import IconStrategy from "../../public/img/softwares/Icon-Strategy.svg";

// // DATA //
// const services = [
// 	{ id: 1, icon: IconStrategy, label: "Strategy" },
// 	{ id: 2, icon: IconStrategy, label: "Execution" },
// 	{ id: 3, icon: IconStrategy, label: "Innovation" },
// 	{ id: 4, icon: IconStrategy, label: "Growth" },
// 	{ id: 5, icon: IconStrategy, label: "Optimization" },
// 	{ id: 6, icon: IconStrategy, label: "Sustainability" },
// ];

// /** ServicesCircle Component */
// export default function ServicesCircle({ data }) {
// 	return (
// 		<div className={`${styles.ServicesCircleSection} dark_bg `}>
// 			<div className="container">
// 				<div className={`${styles.CircleGrid}`}>
// 					<div className={`${styles.CircleInfo}`}>
// 						<h3 className="text_xl color_white pb_20">
// 							Chronos Edge in Energy Storage Valuation
// 						</h3>
// 						<p className="text_reg color_platinum_gray">
// 							Lorem ipsum dolor sit amet consectetur. Velit vel iaculis fames velit
// 							mauris morbi volutpat. Senectus purus est cursus ac. Amet tortor at ac a
// 							mi eu urna risus nulla.
// 						</p>
// 					</div>
// 					<div className={`${styles.CircleInfo} ${styles.CircleBox}`}>
// 						{/*<div className={`${styles.Quadrant} ${styles.TopLeft}`}>
// 							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
// 						</div>
// 						<div className={`${styles.Quadrant} ${styles.TopRight}`}>
// 							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
// 						</div>
// 						<div className={`${styles.Quadrant} ${styles.BottomLeft}`}>
// 							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
// 						</div>
// 						<div className={`${styles.Quadrant} ${styles.BottomRight}`}>
// 							<img src={IconStrategy.src} alt="Strategy" className={styles.Icon} />
// 						</div>
// 						<div className={`${styles.CenterBox}`}></div>*/}
// 						<CircularMenu items={services} />
// 						<div className={`${styles.CenterBox}`}></div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
