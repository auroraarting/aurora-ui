// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { useInView } from "react-intersection-observer";

// UTILS //

// STYLES //
import styles from "@/styles/components/SectionsHeader.module.scss";

// IMAGES //

// DATA //
const data = [
	{ name: "Expertise", id: "#expertise" },
	{ name: "Available Regions", id: "#availableregions" },
	{ name: "Why Aurora", id: "#whyaurora" },
	{ name: "Clients", id: "#clients" },
];

/** SectionsHeader Component */
export default function SectionsHeader() {
	const [activeTab, setActiveTab] = useState(0);

	useEffect(() => {
		/** Define the callback function to execute when the target enters the viewport */
		const callback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = data.findIndex((item) => item.id === `#${entry.target.id}`);
					if (index !== -1) {
						const diff = 100 / data.length;
						const percentage = `${diff * (index + 1)}%`;
						console.log(
							`${entry.target.id} has entered the viewport! ${percentage} ${diff}`
						);

						// Update CSS variable on the `.SectionsHeader` element
						document
							.querySelector(`.${styles.SectionsHeader}`)
							.style.setProperty("--progress", percentage);

						setActiveTab(index);
					}
					// Perform your desired action here
					// Example: setActiveTab based on the entry.target.id
				} else {
					console.log(`${entry.target.id} has left the viewport!`);
					// Optionally handle exit from viewport
				}
			});
		};

		/** Create an Intersection Observer instance */
		const observer = new IntersectionObserver(callback, {
			root: null,
			rootMargin: "0px",
			threshold: 0.5, // Trigger when 10% of the element is visible
		});

		data?.map((item, ind) => {
			if (typeof item.id != "string") {
				return;
			}

			const targetedHTML = document.querySelector(item.id);

			if (targetedHTML) {
				/** Start observing the target element */
				observer.observe(targetedHTML);
			}
		});

		/** Cleanup observer on component unmount */
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className={`${styles.SectionsHeader} pb_80`}>
			<div className={`${styles.boxWrap}`}>
				{data?.map((item, ind) => {
					return (
						<div
							key={item.name}
							className={`${styles.box} ${styles.onlyText} ${
								activeTab >= ind ? "color_medium_gray" : ""
							} `}
						>
							{item.name}
						</div>
					);
				})}
			</div>
			<div className={`${styles.progress}`}></div>
		</div>
	);
}
