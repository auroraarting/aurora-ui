// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import Speedometer from "@/components/Speedometer";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/softwares/GloballyBankableInsights.module.scss";

// IMAGES //
import Bg from "/public/img/softwares/bankableInsightsBg.jpg";

// DATA //

/** GloballyBankableInsights Section */
export default function GloballyBankableInsights() {
	return (
		<section className={`${styles.GloballyBankableInsights}`} id="expertise">
			<img className={`${styles.bg}`} src={Bg.src} alt="Bg" />
			<div className="section_spacing">
				<div className="container">
					<div className={`${styles.wrap}`}>
						<div className={`${styles.head} f_r_aj_between`}>
							<h2 className="text_xl font_primary f_w_s_b color_secondary pb_20">
								Globally bankable <br /> insights
							</h2>

							<p>
								Trusted by experts, Aurora&apos;s analytics ensure accuracy,
								reliability, and <br /> strategic foresight. Our data helps sector
								leaders confidently navigate <br /> renewable energy transitions.
							</p>
						</div>

						<div className={`${styles.insightWrap} color_white`}>
							<Speedometer value={750} />
							<div className={`${styles.textData}`}>
								<p className={`${styles.insightTitle} text_lg`}>
									Data you can depend on
								</p>
								<p className={`${styles.insightsDesc}`}>
									Chronos leverages Aurora’s proprietary datasets and models, trusted by
									over 750 companies globally. When accuracy and reliability matter most,
									Chronos delivers.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
