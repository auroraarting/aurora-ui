// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/InsightsListing.module.scss";

// IMAGES //
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import dropdown_arrow from "@/../public/img/icons/dropdown_arrow.svg";
import search from "@/../public/img/icons/search.svg";

// DATA //

/** InsightsListing Section */
export default function InsightsListing() {
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);

	/** Toggle Search Input */
	const toggleSearchInput = () => {
		setIsSearchVisible((prev) => !prev);
	};

	/** Close Search Input */
	const closeSearchInput = () => {
		setIsSearchVisible(false);
	};

	/** checkBox Input */
	// const handleChange = (option) => {
	// 	setSelected((prev) => ({ ...prev, [option]: !prev[option] }));
	// };

	/** radio Input */
	const handleChange = (option) => {
		setSelected(option); // Only one selected option at a time
	};

	const [dropdowns, setDropdowns] = useState({
		categoryType: { isOpen: false, selected: { title: "Category" } },
		countryType: { isOpen: false, selected: { title: "Country" } },
		offeringsType: { isOpen: false, selected: { title: "Products & Services" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});

	const dropdownRefs = {
		categoryType: useRef(null),
		countryType: useRef(null),
		offeringsType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		categoryType: [{ title: "Public" }, { title: "Subscriber" }],
		countryType: [
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
		],
		offeringsType: [
			{ title: "Offerings1" },
			{ title: "Offerings2" },
			{ title: "Offerings3" },
			{ title: "Offerings4" },
		],
		yearsType: [
			{ title: "2025" },
			{ title: "2024" },
			{ title: "2023" },
			{ title: "2022" },
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

	/** Close Dropdown on Click Outside */
	useEffect(() => {
		/** handleClickOutside */
		const handleClickOutside = (event) => {
			Object.keys(dropdownRefs).forEach((key) => {
				if (
					dropdownRefs[key].current &&
					!dropdownRefs[key].current.contains(event.target)
				) {
					setDropdowns((prev) => ({
						...prev,
						[key]: { ...prev[key], isOpen: false },
					}));
				}
			});
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const radioData = [
		{
			category: "Product",
			options: [
				"Power & Renewables",
				"Flexible Energy",
				"Grid Add-on",
				"Hydrogen Service",
			],
		},
		{
			category: "Software",
			options: ["Amun", "Chronos", "Lumus PPA", "Origin"],
		},
		{
			category: "Service",
			options: ["Advisory"],
		},
	];

	return (
		<section className={styles.InsightsListing}>
			<div className={styles.filterMain}>
				<div className="container">
					<div className={styles.filterflex}>
						{/* Category Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.categoryType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.categoryType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("categoryType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.categoryType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.categoryType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.categoryType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.categoryType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("categoryType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
						{/* Country Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.countryType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.countryType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("countryType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.countryType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.countryType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.countryType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.countryType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("countryType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
						{/* Offerings Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.offeringsType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.offeringsType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("offeringsType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.offeringsType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.offeringsType.isOpen && (
									<div
										className={`${styles.selectOptionBox} ${styles.checkBoxWapper} f_w`}
									>
										{radioData.map((item, index) => (
											<div key={index} className={styles.checkBoxItem}>
												<h4 className="text_sm color_dark_gray text_500">
													{item.category}
												</h4>
												<div className={styles.checkBoxList}>
													{item.options.map((option, idx) => (
														// <label key={idx} className={styles.checkboxLabel}>
														// 	<input
														// 		type="checkbox"
														// 		className={styles.hiddenCheckbox}
														// 		checked={selected[option] || false}
														// 		onChange={() => handleChange(option)}
														// 	/>
														// 	<span className={styles.customCheckbox}></span>
														// 	{option}
														// </label>
														<label key={idx} className={styles.checkboxLabel}>
															<input
																type="radio"
																name="singleSelection" // Single name for all radio buttons
																className={styles.hiddenRadio}
																checked={selected === option} // Ensure only one is selected overall
																onChange={() => handleChange(option)}
															/>
															<span className={styles.customRadio}></span>
															{option}
														</label>
													))}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
						{/* years Type Dropdown */}
						<div
							className={`${styles.selectBox} ${styles.widthCustom}`}
							ref={dropdownRefs.yearsType}
						>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.yearsType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("yearsType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.yearsType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.yearsType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.yearsType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.yearsType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("yearsType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>
						{/* search box */}
						<div
							className={`${styles.selectBox} ${styles.widthCustom} f_r_aj_between`}
							onClick={toggleSearchInput}
						>
							<div className={`${styles.searchBox} f_r_aj_between`}>
								<p className="text_sm text_500">Search</p>
								<span>
									<img src={search.src} alt="icon" />
								</span>
							</div>
						</div>
						{/* Search Input - Show/Hide on Click */}
						{isSearchVisible && (
							<div className={`${styles.searchInput} f_r_aj_between`}>
								<input type="text" placeholder="Search Events" />
								<span className="d_f">
									<img src={search.src} alt="icon" />
									{/* Close Button */}
									<span className={`${styles.closeBox}`} onClick={closeSearchInput}>
										x
									</span>
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="container">
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Press Release
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Spain doubles its renewable capacity amidst grid limitations
								</p>
								<div className={`${styles.dateFlex} f_j pt_30`}>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={calender.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>Feb 26, 2025</span>
									</p>
									<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
										<img
											src={location.src}
											className={`${styles.calender}`}
											alt="calender"
										/>
										<span>India</span>
									</p>
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
