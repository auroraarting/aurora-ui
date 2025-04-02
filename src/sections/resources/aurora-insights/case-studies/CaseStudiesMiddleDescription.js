// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/case-studies/CaseStudiesMiddleDescription.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "@/../public/img/resources/aurora_insights/graph_img.png";

// DATA //

/** CaseStudiesMiddleDescription Section */
export default function CaseStudiesMiddleDescription() {
	return (
		<div className={`${styles.contentBox}`}>
			<div className="pb_60">
				<img
					src={plant_img.src}
					className={`${styles.plant_img} width_100 b_r_20`}
					alt="plant img"
				/>
			</div>
			<div className="pb_60">
				<h3 className="text_lg font_primary f_w_m color_secondary pb_20">
					Understanding Consumer Cost Implications
				</h3>
				<p className="text_reg color_dark_gray">
					The client required an in-depth evaluation of the cost impact on consumers
					under multiple energy scenarios. Aurora’s analysis explored cases such as
					gas CCUS replacing offshore wind, expanding offshore wind capacity to 50
					GW, and scenarios where alternative technologies filled the gap left by
					offshore wind. This breakdown was crucial for the client to assess energy
					system changes&apos; economic feasibility and implications.
				</p>
			</div>
			<div className="pb_60">
				<h3 className="text_lg font_primary f_w_m color_secondary pb_20">
					Modelling Scenarios with Financial Accuracy
				</h3>
				<p className="text_reg color_dark_gray">
					Aurora developed and analysed bespoke energy scenarios, ensuring all
					cost-related factors were included in the assessment. Financial models were
					built for each scenario to calculate costs across the forecast period. The
					approach involved:
				</p>
				<ul>
					<li className="text_reg color_dark_gray">
						Replacing offshore wind with gas CCUS and alternative renewable energy
						technologies.
					</li>
					<li className="text_reg color_dark_gray">
						Analysing cost implications for consumers under each replacement scenario.
					</li>
					<li className="text_reg color_dark_gray">
						Factoring in operational, capital, and carbon pricing variables to ensure
						financial precision.
					</li>
				</ul>
				<p className="text_reg color_dark_gray">
					This approach enabled a reliable comparison of costs and supported informed
					decision-making.
				</p>
			</div>
			<div className="pb_60">
				<h3 className="text_lg font_primary f_w_m color_secondary pb_20">
					Achieving Cost-Efficient Net-Zero Goals
				</h3>
				<p className="text_reg color_dark_gray pb_20">
					Aurora’s analysis provided the client with critical insights into various
					energy scenarios&apos; financial and environmental implications. The
					findings demonstrated that a market dominated by offshore wind offers the
					most cost-effective solution for achieving net-zero emissions targets set
					by the government. By transparently breaking down consumer costs, the
					analysis underscored the economic benefits of offshore wind, particularly
					when compared to alternatives like gas CCUS.
				</p>
				<p className="text_reg color_dark_gray pb_20">
					The study validated that offshore wind not only meets long-term
					sustainability goals but also minimises financial burden on consumers. This
					evidence-based approach enabled the client to make well-informed decisions
					regarding energy investments, ensuring alignment with economic and
					environmental priorities.
				</p>
				<p className="text_reg color_dark_gray pb_20">
					Aurora’s clear and methodical cost breakdown positioned offshore wind as a
					reliable pathway for achieving net-zero emissions while delivering the best
					economic value.
				</p>
			</div>
			<div>
				<img src={graph_img.src} className={`${styles.graph_img}`} alt="img" />
			</div>
		</div>
	);
}
