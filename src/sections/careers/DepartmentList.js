// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/DepartmentList.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
// DATA //

/** DepartmentList Section */
export default function DepartmentList() {
	const dropdownRefs = {
		eventNameType: useRef(null),
	};
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
	});
	const optionsData = {
		eventNameType: [
			{ title: "Event Name1" },
			{ title: "Event Name2" },
			{ title: "Event Name3" },
			{ title: "Event Name4" },
		],
	};
	/** Toggle Dropdown */
	const toggleDropdown = (key) => {
		setDropdowns((prev) => ({
			...prev,
			[key]: { ...prev[key], isOpen: !prev[key].isOpen },
		}));
	};
	/** Handle Option Click */
	const handleOptionClick = (key, option) => {
		setDropdowns((prev) => ({
			...prev,
			[key]: { isOpen: false, selected: option },
		}));
	};
	return (
		<section className={`${styles.DepartmentList}`}>
			<div>
				<div className="container">
					<div className={styles.filterflex}>
						<div className={styles.selectBox} ref={dropdownRefs.eventNameType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.eventNameType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("eventNameType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.eventNameType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.eventNameType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.eventNameType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.eventNameType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("eventNameType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
