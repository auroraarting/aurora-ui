/* eslint-disable require-jsdoc */
"use client";
// MODULES //
import { useState, useEffect } from "react";

// COMPONENTS //

// SECTIONS //
import Map from "@/components/MapContainer";

// PLUGINS //
import Marquee from "react-fast-marquee";

// UTILS //
import { slugify } from "@/utils";

// STYLES //
import styles from "@/styles/components/MapContainer.module.scss";

// IMAGES //

// DATA //

/** GlobalMap Component */
export default function GlobalMap({
	locationJson,
	marqueeText = "Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market Energy intelligence across every key market",
	className,
	sectionName = "Available Regions",
	hideOnHover,
	marqueeData,
	defaultZoom,
}) {
	const [mapCenter, setMapCenter] = useState(locationJson[0]?.centerOfCountry);
	const [valueOfSelect, setValueOfSelect] = useState(0);
	const [map, setMap] = useState(null);

	const [marqueeSpeed, setMarqueeSpeed] = useState(200);

	// Set marquee speed based on screen size
	useEffect(() => {
		const updateMarqueeSpeed = () => {
			const width = window.innerWidth;
			if (width < 480) {
				setMarqueeSpeed(100); // Mobile
			} else if (width < 768) {
				setMarqueeSpeed(100); // Tablet
			} else {
				setMarqueeSpeed(200); // Desktop
			}
		};

		updateMarqueeSpeed(); // Initial check
		window.addEventListener("resize", updateMarqueeSpeed);
		return () => window.removeEventListener("resize", updateMarqueeSpeed);
	}, []);

	if (locationJson.length === 0) {
		return <></>;
	}

	return (
		<section
			className={`${styles.globalMap} section_spacing ${className}`}
			id={slugify(sectionName)}
			data-name={sectionName}
			aria-label="map"
			title="map"
		>
			{/* <img src={available_regions.src} className="width_100" alt="img" /> */}
			{/* <div className="container"> */}

			<Marquee className="pb_40 reactFastMarquee" speed={marqueeSpeed} autoFill>
				<span className={`${styles.title} color_white text_xxl`}>
					{marqueeText}
				</span>
			</Marquee>

			<div className="">
				<Map
					mapCenter={mapCenter}
					setValueOfSelect={setValueOfSelect}
					valueOfSelect={valueOfSelect}
					map={map}
					setMap={setMap}
					defaultZoom={defaultZoom || 2.5}
					locationJson={locationJson}
					hideOnHover={hideOnHover}
				/>
			</div>
			{/* </div> */}
		</section>
	);
}
