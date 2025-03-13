// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/how-we-help/TransactionSolutions.module.scss";

// IMAGES //
import solar_plant from "@/../public/img/transactions/solar_plant.jpg";
import lumus_logo from "@/../public/img/transactions/lumus_logo.png";

// DATA //

/** TransactionSolutions Section */
export default function TransactionSolutions() {
	return (
		<section className={`${styles.TransactionSolutions}`}>
			<div className={`${styles.flexBox} f_j`}>
				<div className={`${styles.flexItemOne}`}>
					<div className={`${styles.SpaceLeft}`}>
						<img src={lumus_logo.src} alt="solar plant" />
						<h2 className="text_xl font_primary f_w_m color_white pt_40">
							Transaction solutions powered by Lumus PPA
						</h2>
						<p className={`${styles.label} text_reg color_platinum_gray`}>
							Lorem ipsum dolor sit amet consectetur. Mauris scelerisque pharetra a
							tellus imperdiet.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="secondary" variant="underline" mode="dark">
								Know more
							</Button>
						</div>
					</div>
				</div>
				<div className={`${styles.flexItemTwo}`}>
					<img src={solar_plant.src} alt="solar plant" />
				</div>
			</div>
		</section>
	);
}
