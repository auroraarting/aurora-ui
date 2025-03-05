// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/global-presence/EosIntegratedSystem.module.scss";

// IMAGES //
import IMac from "../../../public/img/global-presence/IMac.png";

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
						<h2 className="text_xl font_primary f_w_m color_white pb_10">
							EOS - Integrated system, endless possibilities
						</h2>
						<p className={`${styles.label} text_reg color_platinum_gray pb_10`}>
							Subscribe for comprehensive market analytics powered by our fundamental
							model—credible, reliable, and bankable forecasts. Access everything in
							one place with EOS, your energy market hub. Enjoy workshops, analyst
							support, and webinars on forecasts, policy changes, and market
							opportunities.
						</p>
						<div className={`${styles.bookBtnOne} pt_20`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Subscribe Now
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
