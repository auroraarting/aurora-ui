// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/how-we-help/TransactionsBanner.module.scss";

// IMAGES //

// DATA //

/** TransactionsBanner Section */
export default function TransactionsBanner() {
	return (
		<section className={`${styles.TransactionsBanner}`}>
			<div className="container">
				{/* Banner Content */}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xl font_primary f_w_m color_white text_uppercase">
							Precision-driven transaction support
						</h2>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<p className={`${styles.label} text_reg color_white`}>
							Aurora’s transaction solutions simplify the complexities of energy deals.
							From asset valuation to financing support, we deliver precise analytics
							and bespoke expertise to help you make confident, impactful decisions.
						</p>
						<div className={`${styles.bookBtn} pt_30`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Get Started
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
