// MODULES //
import { useState } from "react";

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
export default function ServicesCircleWhite({ data }) {
	return (
		<div className={`${styles.ServicesCircleSection} white_bg `}>
			<div className="container">
				<div className={`${styles.CircleGrid}`}>
					<div className={`${styles.CircleInfo}`}>
						<h3 className="text_xl  pb_20">
							{data?.sectionTitle || "Chronos Edge in Energy Storage Valuation"}
						</h3>
						<div className="text_reg color_dark_gray">
							<ContentFromCms>
								{data?.descripition ||
									`Lorem ipsum dolor sit amet consectetur. Velit vel iaculis fames velit
                                    mauris morbi volutpat. Senectus purus est cursus ac. Amet tortor at ac a mi eu urna risus nulla.`}
							</ContentFromCms>
						</div>
						<div className="pt_40">
							<a href={data?.buttonLink || ""}>
								<Button color="primary" variant="filled" shape="rounded" mode="light">
									{data?.buttonText || "View More"}
								</Button>
							</a>
						</div>
					</div>

					<div>
						<CircularMenu
							items={data?.advantages || services}
							iconDefault={IconStrategy}
							mode="light"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
