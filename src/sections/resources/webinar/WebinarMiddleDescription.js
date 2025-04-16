// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/webinar/WebinarMiddleDescription.module.scss";

// IMAGES //
import podcast_img from "@/../public/img/energy_talks/podcast_img.jpg";

// DATA //

/** WebinarMiddleDescription Section */
export default function WebinarMiddleDescription() {
	return (
		<div className={`${styles.contentBox}`}>
			<p>
				This week on Energy Unplugged, we’re excited to welcome Carolina Nester,
				Head of Operations for Iberia at Sonnedix. She joins Christina Rentell, our
				Research Lead for France & Iberia, to discuss the challenges of curtailment
				and its impact.
			</p>
			<h2>What’s included in the podcast?</h2>
			<ul>
				<li>Negative prices and their impact on regulated assets</li>
				<li>
					Drivers of future procurement including network changes, thermal
					retirements, load growth, and the regulatory environment
				</li>
				<li>
					Results of historical procurement processes and the competitive landscape
					in Tucson Electric’s service territory
				</li>
				<li>
					An overview of UniSource Energy Services, including load growth
					expectations, past procurement activities, and planned resource additions
					through 2038
				</li>
			</ul>
			<h2>What’s included in the podcast?</h2>
			<ul>
				<li>Negative prices and their impact on regulated assets</li>
				<li>
					Drivers of future procurement including network changes, thermal
					retirements, load growth, and the regulatory environment
				</li>
				<li>
					Results of historical procurement processes and the competitive landscape
					in Tucson Electric’s service territory
				</li>
				<li>
					An overview of UniSource Energy Services, including load growth
					expectations, past procurement activities, and planned resource additions
					through 2038
				</li>
			</ul>
		</div>
	);
}
