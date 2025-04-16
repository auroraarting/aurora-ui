// MODULES //
import { useEffect, useState, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/how-we-help/TransactionsBanner.module.scss";
import ContentFromCms from "@/components/ContentFromCms";

// IMAGES //

// DATA //

/** TransactionsBanner Section */
export default function TransactionsBanner({ data }) {
	if (!data) return <></>;
	return (
		<section className={`${styles.TransactionsBanner}`}>
			<div className="container">
				{/* Banner Content */}
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xl font_primary f_w_m color_white text_uppercase">
							<ContentFromCms>{data.title}</ContentFromCms>
						</h2>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<div className={`${styles.label} text_reg color_white`}>
							<ContentFromCms>{data.description}</ContentFromCms>
						</div>
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
