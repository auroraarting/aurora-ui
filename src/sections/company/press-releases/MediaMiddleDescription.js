// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaMiddleDescription.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "@/../public/img/resources/aurora_insights/graph_img.png";

// DATA //

/** MediaMiddleDescription Section */
export default function MediaMiddleDescription() {
	return (
		<div className={`${styles.contentBox}`}>
			<h2>
				Battery operators could see major profitability boosts in 2025, thanks to
				shifting grid incentives.
			</h2>
			<p>
				PARIS (AURORA ENERGY RESEARCH) —New analysis by Aurora Energy Research
				highlights how high production zones in France, where reduced grid charges
				encourage peak-hour charging, present opportunities for operators. The
				global energy markets analytics provider projects that batteries entering
				the market next year could achieve an IRR of 13.0%. The TURPE 7 optional
				tariff for batteries could push returns even higher—up to 14.9%—by slashing
				grid charges by 32.6 €/MWh during peak injection hours.
			</p>
			<p>
				Aurora’s findings highlight that in areas with significant renewable energy
				production and low demand, the optional tariff provides incentives to
				consume electricity during periods of low demand. Conversely, in
				high-consumption areas, the optional tariff provides incentives to produce
				electricity during periods of high demand.
			</p>
			<p>
				In high-production areas, batteries strategically located in injection zones
				and leveraging TURPE 7 could see an additional increase of 1.9% in IRR,
				transforming grid charges into a revenue source instead of a cost. In
				consumption areas, Aurora sees limited upside, as peak-hour revenues are not
				expected to offset higher import tariffs compared to the regular tariff
				structure.
			</p>
			<p>
				CRE ‘s new TURPE 7 grid tariff structure will be in effect from 2025 to
				2028. TURPE is the fee charged in France for utilising the electricity grid,
				and the new version introduces an optional tariff “injection soutirage”
				designed to incentivize standalone storage assets, such as batteries.
			</p>
		</div>
	);
}
