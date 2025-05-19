/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

// STYLES //
import styles from "@/styles/components/EosIntegratedSystem.module.scss";

// IMAGES //
import IMac from "../../public/img/global-presence/IMac.png";

// DATA //

/** EosIntegratedSystem Section */
export default function EosIntegratedSystem() {
	return (
		<section className={`${styles.EosIntegratedSystem}`}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<img src={IMac.src} className="img" alt="imac" />
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<h2 className="text_xl font_primary f_w_m color_white m_b_15">
							Integrated energy intelligence with EOS
						</h2>
						<p className={`${styles.label} text_reg color_platinum_gray pb_10`}>
							EOS is Aurora&apos;s unique, interactive energy intelligence platform,
							providing clients with seamless access to software, data, forecast
							reports, and insights essential for strategic decision-making.
						</p>
						<p className={`${styles.label} text_reg color_platinum_gray pb_10`}>
							Used by thousands of energy market professionals each week globally, EOS
							serves as the central hub for all our software and research subscription
							services, enabling users to efficiently access our intelligence, whatever
							their use case.
						</p>
						<div className={`${styles.bookBtnOne} pt_20`}>
							<a href="/software">
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									Explore Now
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
