"use client";
// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/router";

// SECTIONS //

// PLUGINS //
import { useContextProvider } from "@/context/GlobalContext";

// UTILS //
import formatDate, {
	filterBySearchQueryEvents,
	filterItemsBySelectedObj,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/events/EventsListing.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import searchImg from "../../../public/img/icons/search.svg";
import popup_close from "../../../public/img/icons/popup_close.svg";
import hoverBg from "@/../public/img/home/hoverBg.png";

// DATA //

/** EventsListing Section */
export default function EventsListing({
	countries,
	productService,
	data,
	years,
	categories,
}) {
	const { search } = useContextProvider();
	const [original, setOriginal] = useState(data);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		countryType: { isOpen: false, selected: { title: "Country" } },
		offeringsType: { isOpen: false, selected: { title: "Products & Services" } },
		eventStatusType: { isOpen: false, selected: { title: "Event Status" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});
	const [list, setList] = useState(data);

	console.log(list, "list");

	/** Toggle Search Input */
	const toggleSearchInput = () => {
		setIsSearchVisible((prev) => !prev);
	};

	/** Close Search Input */
	const closeSearchInput = () => {
		setIsSearchVisible(false);
	};

	/** radio Input */
	const handleChange = (option) => {
		setSelected(option); // Only one selected option at a time
	};

	const dropdownRefs = {
		eventNameType: useRef(null),
		countryType: useRef(null),
		offeringsType: useRef(null),
		eventStatusType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		eventNameType: categories,
		countryType: countries,
		offeringsType: [
			{ title: "Offerings1" },
			{ title: "Offerings2" },
			{ title: "Offerings3" },
			{ title: "Offerings4" },
		],
		eventStatusType: [{ title: "Upcoming" }, { title: "Past" }],
		yearsType: years,
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
		filter(option.title, key);
	};

	/** filter  */
	const filter = async (catName, key) => {
		let selectedObj = selected;
		let arr = original;
		setLoading(true);

		if (key === "search") {
			selectedObj.search = catName;
			window.location.href = `/events?search=${catName}`;
			return;
		}
		if (key === "eventType") {
			selectedObj.type = catName;
		}
		if (key === "countryType") {
			selectedObj.country = catName;
		}
		if (key === "yearsType") {
			selectedObj.year = catName;
		}
		if (key === "Product") {
			selectedObj.product = catName;
		}
		if (key === "Software") {
			selectedObj.software = catName;
		}
		if (key === "Service") {
			selectedObj.service = catName;
		}
		if (key === "eventStatusType") {
			selectedObj.status = catName;
		}
		const filteredArr = filterItemsBySelectedObj(arr, selectedObj);
		setList(filteredArr);
		setSelected(selectedObj);
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

	useEffect(() => {
		if (search) {
			const filtered = filterBySearchQueryEvents(data, search);
			setList(filtered);
			setOriginal(filtered);
		}
	}, [search]);

	return (
		<section className={styles.EventsListing}>
			<div className={styles.filterMain}>
				<div className="container">
					<div className={styles.filterflex}>
						{/* Event Name Type Dropdown */}
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
										{selected?.type || "Event Name"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.eventNameType.isOpen && (
									<ul className={styles.selectOptionBox} data-lenis-prevent>
										<li
											className={
												dropdowns.eventNameType.selected.title === "" ? "selected" : ""
											}
											onClick={() => handleOptionClick("eventType", "")}
										>
											All
										</li>
										{categories.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.eventNameType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("eventType", option)}
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
										{selected?.country || "Country"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.countryType.isOpen && (
									<ul className={styles.selectOptionBox} data-lenis-prevent>
										<li
											className={
												dropdowns.countryType.selected.title === "" ? "selected" : ""
											}
											onClick={() => handleOptionClick("countryType", "")}
										>
											All
										</li>
										{countries.map((option) => (
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
										data-lenis-prevent
									>
										{productService.map((item, index) => (
											<div key={index} className={styles.checkBoxItem}>
												<h4 className="text_sm color_dark_gray text_500">
													{item.category}
												</h4>
												<div className={styles.checkBoxList}>
													{item?.options?.map((option, idx) => (
														<label key={option} className={styles.checkboxLabel}>
															<input
																type="radio"
																id={item.category}
																name={item.category} // Single name for all radio buttons
																className={styles.hiddenRadio}
																defaultChecked={
																	selected?.[item.category.toLowerCase()] === option
																} // Ensure only one is selected overall
																onChange={() => {
																	// handleChange(option);
																	filter(option, item.category);
																}}
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

						{/* Event Status Type Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.eventStatusType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.eventStatusType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("eventStatusType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{selected?.status || "Event Status"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.eventStatusType.isOpen && (
									<ul className={styles.selectOptionBox} data-lenis-prevent>
										<li
											className={
												dropdowns.eventStatusType.selected.title === "" ? "selected" : ""
											}
											onClick={() => handleOptionClick("eventStatusType", "")}
										>
											All
										</li>
										{optionsData.eventStatusType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.eventStatusType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("eventStatusType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
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
										{selected?.year || "Year"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.yearsType.isOpen && (
									<ul className={styles.selectOptionBox} data-lenis-prevent>
										<li
											className={
												dropdowns.yearsType.selected.title === "" ? "selected" : ""
											}
											onClick={() => handleOptionClick("yearsType", "")}
										>
											All
										</li>
										{years.map((option) => (
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
						{/* Reset */}
						<div className={`${styles.selectBox} ${styles.widthCustom} maxWidth`}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} "activeDropDown"`}
									onClick={() => {
										setSelected({});
										setList(data);
									}}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										Reset
									</div>
								</div>
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
									<img src={searchImg.src} alt="icon" />
								</span>
							</div>
						</div>
						{/* Search Input - Show/Hide on Click */}
						{isSearchVisible && (
							<div className={`${styles.searchInput} f_r_aj_between`}>
								<form
									className="w-full"
									onSubmit={(e) => {
										e.preventDefault();
										const val = e.target.search.value;
										filter(val, "search");
									}}
								>
									<input name="search" type="text" placeholder="Search Events" />
								</form>
								<span className="d_f">
									<img src={searchImg.src} alt="icon" />
									{/* Close Button */}
									<div className={`${styles.closeBox}`} onClick={closeSearchInput}>
										<span className="text_xs">X</span>
									</div>
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="container">
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
					{list?.map((item, ind) => {
						let hrefObj = {};

						if (item?.events?.thumbnail?.externalUrl) {
							hrefObj.href = item?.events?.thumbnail?.externalUrl;
							hrefObj.target = "_blank";
							hrefObj.rel = "noreferrer";
						} else {
							hrefObj.href = `/events/${item?.slug}`;
						}

						return (
							<div className={`${styles.ItemBox}`} key={item?.title}>
								<a {...hrefObj}>
									<div className={`${styles.hoverBox}`}>
										<img
											src={hoverBg.src}
											className={`${styles.hoverBg} width_100 b_r_10`}
											alt="img"
										/>
										<img
											src={item?.events?.thumbnail?.logo?.node?.mediaItemUrl}
											className={`${styles.productLogo} `}
											alt="img"
										/>
										<p
											className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
										>
											{item?.eventscategories?.nodes?.map((item2) => item2.name)}
										</p>
										<p
											className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
										>
											{item?.title}
										</p>
										<div className={`${styles.dateFlex} f_j pt_30`}>
											<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
												<img
													src={calender.src}
													className={`${styles.calender}`}
													alt="calender"
												/>
												<span>{formatDate(item?.events?.thumbnail?.date)}</span>
											</p>
											<p className="text_xs f_w_m color_medium_gray f_r_a_center">
												<img
													src={location.src}
													className={`${styles.location}`}
													alt="location"
												/>
												<span>
													{item?.events?.thumbnail?.country?.nodes?.map(
														(item2) => item2.title
													)}
												</span>
											</p>
										</div>
									</div>
								</a>
							</div>
						);
					})}
				</div>
				{/* <div className={`${styles.insightsItemFlex} d_f m_t_20`}>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
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
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
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
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
					<div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img src={energy_transition.src} className="" alt="img" />
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
								>
									Spring Forum
								</p>
								<p
									className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
								>
									Competing Visions of Progress: The Energy Transition in a Polarised
									World
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
									<p className="text_xs f_w_m color_medium_gray f_r_a_center">
										<img
											src={location.src}
											className={`${styles.location}`}
											alt="location"
										/>
										<span>UK</span>
									</p>
								</div>
							</div>
						</a>
					</div>
				</div> */}
			</div>
		</section>
	);
}
