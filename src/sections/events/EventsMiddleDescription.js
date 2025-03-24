// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsMiddleDescription.module.scss";

// IMAGES //
import plant_img from "@/../public/img/resources/aurora_insights/plant_img.jpg";
import graph_img from "@/../public/img/resources/aurora_insights/graph_img.png";

// DATA //

/** EventsMiddleDescription Section */
export default function EventsMiddleDescription() {
	return (
		<div className={`${styles.contentBox}`}>
			<p>
				As the European Union moves toward its 2050 Net Zero targets, Central and
				Eastern Europe (CEE) is emerging as a key focus area for the energy
				transition. Historically reliant on coal and natural gas, CEE’s energy
				landscape is undergoing a transformative shift, with dynamic growth, rising
				energy demand, and untapped potential positioning it as a hotspot for
				innovation and investment.
			</p>
			<p>
				As the European Union moves toward its 2050 Net Zero targets, Central and
				Eastern Europe (CEE) is emerging as a key focus area for the energy
				transition. Historically reliant on coal and natural gas, CEE’s energy
				landscape is undergoing a transformative shift, with dynamic growth, rising
				energy demand, and untapped potential positioning it as a hotspot for
				innovation and investment.
			</p>
			<p>
				As the European Union moves toward its 2050 Net Zero targets, Central and
				Eastern Europe (CEE) is emerging as a key focus area for the energy
				transition. Historically reliant on coal and natural gas, CEE’s energy
				landscape is undergoing a transformative shift, with dynamic growth, rising
				energy demand, and untapped potential positioning it as a hotspot for
				innovation and investment.
			</p>
			<p>
				As the European Union moves toward its 2050 Net Zero targets, Central and
				Eastern Europe (CEE) is emerging as a key focus area for the energy
				transition. Historically reliant on coal and natural gas, CEE’s energy
				landscape is undergoing a transformative shift, with dynamic growth, rising
				energy demand, and untapped potential positioning it as a hotspot for
				innovation and investment.
			</p>
			<h5>
				This summit is your chance to stay at the forefront of the CEE energy
				transition and contribute to shaping its future.
			</h5>

			<h2>Why attend?</h2>
			<ul>
				<li>Be Part of a Landmark Event</li>
				<li>Connect with Industry Leaders</li>
				<li>Gain Expert Insights</li>
				<li>Be Part of a Landmark Event</li>
				<li>Be Part of a Landmark Event</li>
				<li>Be Part of a Landmark Event</li>
			</ul>
			<div className={styles.btn_box}>
				<Button color="secondary" variant="filled" shape="rounded">
					View Full Agenda
				</Button>
			</div>
		</div>
	);
}
