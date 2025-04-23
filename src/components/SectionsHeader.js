// MODULES //
import { useEffect, useState } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //
import { useInView } from "react-intersection-observer";

// UTILS //

// STYLES //
import styles from "@/styles/components/SectionsHeader.module.scss";
import Button from "./Buttons/Button";

// IMAGES //
import accarrow from "../../public/img/icons/acc_arrow.svg";
// DATA //

/** SectionsHeader Component */
export default function SectionsHeader({ data, customHtml }) {
	const [activeTab, setActiveTab] = useState(0);
	const [sectionsList, setSectionsList] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);

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
		const sections = [...getAllSections].map((section) => {
			return {
				id: "#" + section.id,
				name: section.dataset.name,
			};
		});
		if (customHtml) {
			if (winH > 992) {
				sections.push(customHtml);
			}
		}

		const list = sections ? sections : data;

		setSectionsList(list);

		// const headerArray = [
		// 	{ name: "Expertise", id: "#expertise" },
		// 	{ name: "Available Regions", id: "#availableregions" },
		// 	{ name: "Why Aurora", id: "#whyaurora" },
		// 	{ name: "Clients", id: "#clients" },
		// 	<div key="btn" to="Insights" onClick={() => scrollToSection("Insights")}>
		// 		<Button color="primary" variant="filled" shape="rounded">
		// 			Book a Demo
		// 		</Button>
		// 	</div>,
		// ];

		const sectionElements = list
			.filter((item) => typeof item.id === "string")
			.map((item) => document.querySelector(item.id));

		/** handleScroll  */
		const handleScroll = () => {
			let currentIndex = 0;

			sectionElements.forEach((el, index) => {
				if (!el) return;
				const rect = el.getBoundingClientRect();
				// Choose the section whose top is closest to 0 but still <= 0 (in view)
				if (rect.top <= window.innerHeight * 0.3) {
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

		// Run once on mount
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div className={`${styles.SectionsHeader} SectionsHeader`}>
				<div className={`${styles.boxWrap}`}>
					{sectionsList?.map((item, ind) => {
						return (
							<div
								key={ind}
								className={`${styles.box} ${styles.onlyText} ${
									activeTab >= ind ? "" : "color_medium_gray"
								} `}
							>
								{typeof item.name === "string" ? item.name : item}
							</div>
						);
					})}
				</div>
				<div className={`${styles.progress}`}></div>
			</div>
			<div className={`${styles.SectionsHeaderDropdown} SectionsHeaderDropdown`}>
				<div className={`${styles.SectionsHeaderDropdown} SectionsHeaderDropdown`}>
					<div
						className={`${styles.dropdownToggle} f_r_aj_between`}
						onClick={() => setDropdownOpen((prev) => !prev)}
					>
						<span>{sectionsList[activeTab]?.name || "Select"}</span>
						<div className={`${styles.flexInner} d_f`}>
							{customHtml}{" "}
							<img
								src={accarrow.src}
								className={`${styles.dropArrow} ${
									dropdownOpen ? styles.dropArrowAct : ""
								}`}
								alt=""
							/>
						</div>
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
		</>
	);
}
