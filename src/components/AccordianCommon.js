"use client";
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
import location from "@/../public/img/icons/location.svg";

// DATA //

/** AccordianCommon Component */
export default function AccordianCommon({
	items,
	fontStyle,
	fontWeight,
	fontFamily,
	fontColor,
	locationData,
	defaultActiveId = 0,
}) {
	// const [activeIndex, setActiveIndex] = useState(null);
	const [activeIndex, setActiveIndex] = useState(defaultActiveId);
	const [heights, setHeights] = useState([]);
	const [widthOfImg, setWidthOfImg] = useState(0);
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

	useEffect(() => {
		const widthOfImgIcon = document
			.querySelector(".imgIcons")
			?.getBoundingClientRect();
		setWidthOfImg((widthOfImgIcon?.width || 0) + 10);
	}, []);

	return (
		<div className={styles.accordion}>
			{items.map((item, index) => (
				<div key={index} className={`${styles.accordionItem} accordionItem b_r_12`}>
					{/* Accordion Header */}
					<div
						className={`${styles.accordionHeader} `}
						// onClick={() => handleAccordionClick(index)}
						onClick={() => toggleAccordion(index)}
					>
						<div
							className={`${fontStyle} ${fontWeight} ${fontFamily} ${fontColor} ${fontColor} headerF f_r_a_center`}
						>
							{item.imgIcons && (
								<img
									src={item.imgIcons}
									className={`${styles.imgIcons} imgIcons`}
									alt=""
								/>
							)}

							<div>
								{item?.tag && (
									<p className="text_xs text_uppercase color_light_gray m_b_30">
										{item?.tag} <br />
									</p>
								)}
								{item.title}
								{item.locationData && (
									<div className={`${styles.locationList} d_f pt_10`}>
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<p className="text_xs color_light_gray">{item.locationData}</p>
									</div>
								)}
							</div>
						</div>
						<span className="icon">
							{activeIndex === index ? (
								<img
									src={minus_icon.src}
									className={`${styles.AccImgMinus} AccImgMinus`}
									alt=""
								/>
							) : (
								<img
									src={plus_arrow.src}
									className={`${styles.AccImg} AccImgMinus `}
									alt=""
								/>
							)}
						</span>
					</div>

					{/* Accordion Content */}
					{item.children && (
						<div
							className={`${styles.accordionContent} ${
								activeIndex === index ? styles.active : ""
							}`}
							ref={(el) => (contentRefs.current[index] = el)}
							style={{
								height: activeIndex === index ? `${heights[index]}px` : "0px",
								overflow: "hidden",
								transition: "height 0.3s ease",
								paddingLeft: `${widthOfImg}px`,
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
					)}
				</div>
			))}
		</div>
	);
}
