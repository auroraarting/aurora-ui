"use client";
// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { Link, scroller } from "react-scroll";

// UTILS //

// STYLES //
import styles from "@/styles/components/SectionsHeader.module.scss";

// IMAGES //
import accarrow from "../../public/img/icons/dropdown_arrow.svg";

// DATA //

/** SectionsHeader Component */
export default function SectionsHeader({ data, hideall, customHtml }) {
	const [activeTab, setActiveTab] = useState(0);
	const [sectionsList, setSectionsList] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	/** scrollToSection */
	const scrollToSection = (id) => {
		/** removeStartingHash  */
		function removeStartingHash(str) {
			return str.startsWith("#") ? str?.slice(1) : str;
		}
		scroller.scrollTo(removeStartingHash(id), {
			duration: 500,
			smooth: true,
			offset: -230,
			spy: true,
			// onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
		});
		window.history.pushState(null, "", id); // <- Adds hash to URL
	};

	/**  */
	const handleItemClick = (item) => {
		if (item?.id) {
			document.querySelector(item.id)?.scrollIntoView({ behavior: "smooth" });
		}
		setDropdownOpen(false);
	};

	useEffect(() => {
		const winH = window.innerWidth;
		const getAllSections = document.querySelectorAll("section[id][data-name]");
		const sectionsArray = [...getAllSections].map((section) => {
			return {
				id: "#" + section.id,
				name: section.dataset.name,
			};
		});
		// Deduplicate based on `id`
		const sections = Array.from(
			new Map(sectionsArray.map((item) => [item.id, item])).values()
		);

		if (customHtml) {
			if (winH > 992) {
				sections.push(customHtml);
			}
		}

		let list = [];
		if (hideall) {
			list = customHtml ? ["", customHtml] : [];
		} else {
			list = sections ? sections : data;
		}

		setSectionsList(list);

		const sectionElements = list
			.filter(
				(item) =>
					typeof item.id === "string" && item.id.trim() !== "" && item.id !== "#"
			)
			.map((item) => {
				const selector = item.id.startsWith("#") ? item.id : `#${item.id}`;
				const el = document?.querySelector(selector);
				return el || null;
			})
			.filter(Boolean);

		/** handleScroll  */
		const handleScroll = () => {
			if (hideall) {
				return;
			}

			let currentIndex = 0;

			sectionElements.forEach((el, index) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				// Choose the section whose top is closest to 0 but still <= 0 (in view)
				if (rect.top <= window.innerHeight * 0.7) {
					currentIndex = index;
				}
			});

			const diff = 100 / list.length;
			const percentage = `${diff * (currentIndex + 1)}%`;

			document
				.querySelector(`.${styles.SectionsHeader}`)
				.style.setProperty("--progress", percentage);

			setActiveTab(currentIndex);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		if (!hideall) {
			// Run once on mount
			handleScroll();
		}

		// Custom scroll for hash on page load
		if (typeof window !== "undefined" && window.location.hash) {
			const hash = window.location.hash.slice(1); // Remove #
			setTimeout(() => {
				scroller.scrollTo(hash, {
					duration: 500,
					smooth: true,
					offset: -200,
					spy: true,
					// onEnd: () => console.log("Scrolling finished!"), // ❌ Not available directly
				});
			}, 500); // Wait a bit to ensure sections are mounted
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div className={`${styles.SectionsHeader} SectionsHeader`}>
				<div className="container">
					<div className={`${styles.boxWrap}`}>
						{sectionsList?.map((item, ind) => {
							return (
								<div
									key={item?.id}
									className={`${styles.box} ${styles.onlyText} ${
										activeTab >= ind ? `${styles.activeTxt}` : ""
									} text_xs text_uppercase`}
									onClick={() => scrollToSection(item?.id)}
								>
									{typeof item.name === "string" ? item.name : item}
								</div>
							);
						})}
					</div>
					<div className={`${styles.progress}`}></div>
				</div>
			</div>
			<div
				className={`${styles.SectionsHeaderDropdown} ${styles.SectionsHeaderResponsive} SectionsHeaderDropdown`}
			>
				<div className="container">
					<div className={`${styles.SectionsHeaderDropdown} SectionsHeaderDropdown`}>
						<div
							className={`${styles.dropdownToggle} f_r_aj_between`}
							onClick={() => setDropdownOpen((prev) => !prev)}
						>
							<span>
								{sectionsList[activeTab]?.name || "Select"} &nbsp;
								<img
									src={accarrow.src}
									className={`${styles.dropArrow} ${
										dropdownOpen ? styles.dropArrowAct : ""
									}`}
									alt=""
								/>
							</span>
							<div className={`${styles.flexInner} d_f`}>{customHtml} </div>
						</div>
						{dropdownOpen && (
							<div className={styles.dropdownList}>
								{sectionsList?.map((item, ind) => (
									<div
										key={ind}
										className={styles.dropdownItem}
										onClick={() => handleItemClick(item)}
									>
										{typeof item.name === "string" ? item.name : item}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
