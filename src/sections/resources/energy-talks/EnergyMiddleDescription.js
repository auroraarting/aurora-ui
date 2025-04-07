// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/energy-talks/EnergyMiddleDescription.module.scss";

// IMAGES //
import podcast_img from "@/../public/img/energy_talks/podcast_img.jpg";

// DATA //

/** EnergyMiddleDescription Section */
export default function EnergyMiddleDescription() {
	return (
		<div className={`${styles.contentBox}`}>
			<div className="pb_40">
				<img src={podcast_img.src} className="width_100 b_r_10" alt="img" />
			</div>
			<h2>Lorem ipsum dolor sit amet consectetur.</h2>
			<p>
				This week on Energy Unplugged, we’re excited to welcome Carolina Nester,
				Head of Operations for Iberia at Sonnedix. She joins Christina Rentell, our
				Research Lead for France & Iberia, to discuss the challenges of curtailment
				and its impact.
			</p>
			<p>
				With over 17 years of experience in the photovoltaic (PV) sector, Carolina
				has a broad background spanning solar module manufacturing, installation
				permitting, design, construction management, and the supervision and control
				of solar assets, as well as PV consulting. Since joining Sonnedix in 2017,
				she has been responsible for optimizing and overseeing the performance of a
				solar asset portfolio generating €400M in revenue.
			</p>
			<h2>What’s included in the podcast?</h2>
			<ul>
				<li>Negative prices and their impact on regulated assets</li>
				<li>Evolution of grid curtailment in Iberia</li>
				<li>
					Automatic Power Reduction System (SRAP) as a mitigant of curtailment
				</li>
			</ul>
		</div>
	);
}
