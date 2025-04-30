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
import ContentFromCms from "@/components/ContentFromCms";
import { useState } from "react";

// DATA //

/** EventsMiddleDescription Section */
export default function EventsMiddleDescription({ data }) {
	return (
		<div className={`${styles.contentBox}`}>
			<ContentFromCms>{data?.content}</ContentFromCms>
			{/* <p>
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
			</h5> */}

			<WhyAttend data={data?.events?.whyAttend} />
			<Hightlights data={data?.events?.hightlights} />
		</div>
	);
}

/** Hightlights  */
const Hightlights = ({ data }) => {
	const [endIndex, setEndIndex] = useState(3);
	return (
		<section id="hightlights" data-name="Hightlights">
			<h2>Hightlights</h2>
			<ul>
				{data?.hightlights?.slice(0, endIndex)?.map((item) => {
					return <li key={item?.text}>{item?.text}</li>;
				})}
			</ul>
			<div
				className={`${styles.btn_box}`}
				onClick={() => setEndIndex(data?.agenda?.length)}
			>
				<Button color="secondary" variant="filled" shape="rounded">
					View Full Hightlights
				</Button>
			</div>
		</section>
	);
};

/** WhyAttend  */
const WhyAttend = ({ data }) => {
	const [endIndex, setEndIndex] = useState(3);
	return (
		<section id="whyAttend" data-name="Why Attend" className="pb_50">
			<h2>Why attend?</h2>
			<ul>
				{data?.agenda?.slice(0, endIndex)?.map((item) => {
					return <li key={item?.text}>{item?.text}</li>;
				})}
			</ul>
			<div
				className={styles.btn_box}
				onClick={() => setEndIndex(data?.agenda?.length)}
			>
				<Button color="secondary" variant="filled" shape="rounded">
					View Full Agenda
				</Button>
			</div>
		</section>
	);
};
