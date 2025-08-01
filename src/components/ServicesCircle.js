"use client";
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
import { slugify } from "@/utils";

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
export default function ServicesCircle({
	data,
	customHtml,
	hideId,
	customBtn,
	customColor,
	centerLogo,
	sectionName,
	removeTopBottom,
	onlySectionName,
}) {
	let obj = {};

	/** sectionTitle  */
	const sectionTitle = () => {
		if (hideId) {
			return {};
		}
		if (sectionName === undefined) {
			return {
				id: "keyAdvantages",
				"data-name": onlySectionName || "Key Advantages",
			};
		} else if (sectionName === "") {
			return {};
		} else if (sectionName) {
			return {
				id: slugify(sectionName),
				"data-name": sectionName,
			};
		}
	};

	if (!data?.advantages || !data) {
		return <></>;
	}
	return (
		<section
			className={`${styles.ServicesCircleSection} ${
				removeTopBottom && styles.removeTopBottom
			} dark_bg`}
			{...sectionTitle()}
		>
			<div className="container">
				<div className={`${styles.CircleGrid}`}>
					<div className={`${styles.CircleInfo}`}>
						<h3 className="text_xl color_white pb_20">
							{data?.sectionTitle || data?.title}
						</h3>
						{(data?.descripition || data?.desciption || data?.description) && (
							<div className="text_reg color_platinum_gray">
								<ContentFromCms>
									{data?.descripition || data?.desciption || data?.description}
								</ContentFromCms>
							</div>
						)}
						{data?.buttonText && (
							<div className="pt_40">
								<a href={data?.buttonLink}>
									<Button color="primary" variant="filled" shape="rounded" mode="dark">
										{data?.buttonText}
									</Button>
								</a>
							</div>
						)}
						{customHtml}
					</div>
					<div className={`${styles.CircleInfo} ${styles.CircleBox}`}>
						{data?.advantages?.length > 0 && (
							<CircularMenu
								items={data?.advantages}
								iconDefault={IconStrategy}
								customColor={customColor}
								centerLogo={centerLogo}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
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
