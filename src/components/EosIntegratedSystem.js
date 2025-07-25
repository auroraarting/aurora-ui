/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps, slugify } from "@/utils";

// STYLES //
import styles from "@/styles/components/EosIntegratedSystem.module.scss";

// IMAGES //
import IMac from "../../public/img/global-presence/IMac.png";
import ContentFromCms from "./ContentFromCms";

// DATA //

/** EosIntegratedSystem Section */
export default function EosIntegratedSystem({ name, data, buttonText }) {
	/** sectionTitle  */
	const sectionTitle = () => {
		if (name === undefined) {
			return {
				id: "eos",
				"data-name": "Eos",
			};
		} else if (name === "") {
			return {};
		} else if (name) {
			return {
				id: slugify(name),
				"data-name": name,
			};
		}
	};
	return (
		<section className={`${styles.EosIntegratedSystem}`} {...sectionTitle()}>
			<div className="container">
				<div className={`${styles.flexBox} f_j`}>
					<div className={`${styles.flexItemOne}`}>
						<img src={IMac.src} className="img" alt="EOS Mac" />
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<h2 className="text_xl font_primary color_white pb_20">
							{data?.sectionTitle || "Integrated energy intelligence with EOS"}
						</h2>
						{data?.content ? (
							<div className={`${styles.label} text_reg color_platinum_gray pb_10`}>
								<ContentFromCms>{data?.content}</ContentFromCms>
							</div>
						) : (
							<>
								<p className={`${styles.label} text_reg color_platinum_gray pb_10`}>
									EOS is Aurora&apos;s unique, interactive energy intelligence platform,
									providing clients with seamless access to software, data, forecast
									reports, and insights essential for strategic decision-making.
								</p>
								<p className={`${styles.label} text_reg color_platinum_gray pb_10`}>
									Used by thousands of energy market professionals each week globally,
									EOS serves as the central hub for all our software and research
									subscription services, enabling users to efficiently access our
									intelligence, whatever their use case.
								</p>
							</>
						)}

						<div className={`${styles.bookBtnOne} pt_60`}>
							<a href="/eos">
								<Button color="primary" variant="filled" shape="rounded" mode="dark">
									{buttonText || "Explore now"}
								</Button>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
