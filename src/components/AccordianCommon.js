// MODULES //
import React, { useState, useRef, useEffect } from "react";
// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/AccordianCommon.module.scss";

// IMAGES //
import plus_arrow from "@/../public/img/icons/plus_arrow.svg";
import minus_icon from "@/../public/img/icons/minus_icon.svg";

// DATA //

/** AccordianCommon Component */
export default function AccordianCommon({
	items,
	fontStyle,
	fontWeight,
	fontFamily,
	fontColor,
	defaultActiveId = 0,
}) {
	// const [activeIndex, setActiveIndex] = useState(null);
	const [activeIndex, setActiveIndex] = useState(defaultActiveId);
	const [heights, setHeights] = useState([]);
	const contentRefs = useRef([]);
	useEffect(() => {
		/** handleAccordionClick function */
		const calculateHeights = () => {
			const calculatedHeights = contentRefs.current.map(
				(el) => el?.scrollHeight || 0
			);
			setHeights(calculatedHeights);
		};

		calculateHeights();
		window.addEventListener("resize", calculateHeights); // Recalculate heights on window resize

		return () => {
			window.removeEventListener("resize", calculateHeights);
		};
	}, [activeIndex]);
	/** handleAccordionClick function */
	const handleAccordionClick = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};
	/** toggleAccordion */
	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<div className={styles.accordion}>
			{items.map((item, index) => (
				<div key={index} className={`${styles.accordionItem} b_r_12`}>
					{/* Accordion Header */}
					<div
						className={`${styles.accordionHeader} `}
						// onClick={() => handleAccordionClick(index)}
						onClick={() => toggleAccordion(index)}
					>
						<div
							className={`${fontStyle} ${fontWeight} ${fontFamily} ${fontColor} ${fontColor} headerF`}
						>
							<img
								src={item.imgIcons}
								className={`${styles.imgIcons} imgIcons`}
								alt=""
							/>

							{item.title}
						</div>
						<span>
							{activeIndex === index ? (
								<img src={minus_icon.src} className={`${styles.AccImgMinus}`} alt="" />
							) : (
								<img src={plus_arrow.src} className={`${styles.AccImg} `} alt="" />
							)}
						</span>
					</div>

					{/* Accordion Content */}
					<div
						className={`${styles.accordionContent} ${
							activeIndex === index ? styles.active : ""
						}`}
						ref={(el) => (contentRefs.current[index] = el)}
						style={{
							height: activeIndex === index ? `${heights[index]}px` : "0px",
							overflow: "hidden",
							transition: "height 0.3s ease",
						}}
					>
						<div
							className={`${
								activeIndex === index ? styles.activeInner : ""
							} activeSpace`}
						>
							{item.children}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
