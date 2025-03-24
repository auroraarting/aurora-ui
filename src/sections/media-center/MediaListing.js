// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/media-center/MediaListing.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import search from "../../../public/img/icons/search.svg";
import popup_close from "../../../public/img/icons/popup_close.svg";

// DATA //

/** MediaListing Section */
export default function MediaListing() {
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
	const handleChange = (option) => {
		setSelected((prev) => ({ ...prev, [option]: !prev[option] }));
	};

	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		languageType: { isOpen: false, selected: { title: "Language" } },
		offeringsType: { isOpen: false, selected: { title: "Products & Services" } },
		eventStatusType: { isOpen: false, selected: { title: "Event Status" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});

	const dropdownRefs = {
		eventNameType: useRef(null),
		languageType: useRef(null),
		offeringsType: useRef(null),
		eventStatusType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		languageType: [
			{ title: "English" },
			{ title: "English" },
			{ title: "English" },
			{ title: "English" },
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

	const checkBoxData = [
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
		<section className={styles.MediaListing}>
			<div className={styles.filterMain}>
				<div className="container">
					<div className={styles.filterflex}>
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
										{checkBoxData.map((item, index) => (
											<div key={index} className={styles.checkBoxItem}>
												<h4 className="text_sm color_dark_gray text_500">
													{item.category}
												</h4>
												<div className={styles.checkBoxList}>
													{item.options.map((option, idx) => (
														<label key={idx} className={styles.checkboxLabel}>
															<input
																type="checkbox"
																className={styles.hiddenCheckbox}
																checked={selected[option] || false}
																onChange={() => handleChange(option)}
															/>
															<span className={styles.customCheckbox}></span>
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

						{/* Language Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.languageType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.languageType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("languageType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{dropdowns.languageType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.languageType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.languageType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.languageType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("languageType", option)}
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
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
