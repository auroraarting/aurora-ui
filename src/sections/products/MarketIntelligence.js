// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/products/MarketIntelligence.module.scss";

// IMAGES //
import market_intelligence from "../../../public/img/products/market_intelligence.png";

// DATA //

/** MarketIntelligence Section */
export default function MarketIntelligence() {
	return (
		<section className={`${styles.MarketIntelligence}`}>
			<div className="container">
				<div className={`${styles.flexBox} f_r_aj_between`}>
					<div className={`${styles.flexItemOne}`}>
						<h2 className="text_xxl font_primary f_w_s_b color_secondary pb_20">
							Market intelligence for flexible assets
						</h2>
						<p className="text_reg color_dark_gray">
							Flexible Energy Service delivers bankable forecasts and analytics,
							helping investors and operators optimise battery storage and gas peaker
							strategies.
						</p>
					</div>
					<div className={`${styles.flexItemTwo}`}>
						<img
							src={market_intelligence.src}
							className={`${styles.redefining} img`}
							alt="redefining"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
