// MODULES //
import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import Pagination from "@/components/Pagination";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, {
	filterBySearchQuery,
	filterBySearchQueryEvents,
	filterItems,
	filterItemsBySelectedObj,
	filterItemsBySelectedObjForPress,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/company/press-releases/MediaListing.module.scss";

// IMAGES //
import energy_transition from "/public/img/events/energy_transition.png";
import location from "/public/img/icons/location.svg";
import calender from "/public/img/icons/calender.svg";
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import searchImg from "/public/img/icons/search.svg";
import popup_close from "/public/img/icons/popup_close.svg";
import hoverBg from "/public/img/home/hoverBg.png";

// DATA //

/** MediaListing Section */
export default function MediaListing({
	data,
	years,
	productService,
	languages,
}) {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");
	const [original, setOriginal] = useState(data);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [dropdowns, setDropdowns] = useState({
		languageType: { isOpen: false, selected: { title: "Language" } },
		offeringsType: { isOpen: false, selected: { title: "Products & Services" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});
	const [list, setList] = useState(data);
	const [paginationArr, setPaginationArr] = useState(data);

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
		languageType: useRef(null),
		offeringsType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		languageType: languages?.map((item) => {
			return { title: item?.native_name };
		}),
		offeringsType: [
			{ title: "Offerings1" },
			{ title: "Offerings2" },
			{ title: "Offerings3" },
			{ title: "Offerings4" },
		],
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
			window.location.href = `/company/press-releases?search=${catName}`;
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
		if (key === "languageType") {
			selectedObj.language = catName;
		}
		const filteredArr = filterItems(arr, selectedObj);
		setList(filteredArr);
		setPaginationArr(filteredArr);
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
			const filtered = filterBySearchQuery(data, search);
			setList(filtered);
			setPaginationArr(filtered);
			setOriginal(filtered);
		}
	}, [search]);

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
						{/* Reset */}
						<div className={`${styles.selectBox} ${styles.widthCustom} maxWidth`}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} "activeDropDown"`}
									onClick={() => {
										setSelected({});
										setList(data);
										setPaginationArr(data);
										setDropdowns({
											languageType: { isOpen: false, selected: { title: "Language" } },
											offeringsType: {
												isOpen: false,
												selected: { title: "Products & Services" },
											},
											yearsType: { isOpen: false, selected: { title: "Year" } },
										});
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
									<img src={search.src} alt="icon" />
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
						return (
							<div className={`${styles.ItemBox}`} key={item?.title}>
								<a href={`/company/press-releases/${item?.slug}`}>
									<div className={`${styles.hoverBox}`}>
										<img
											height={179}
											width={446}
											src={hoverBg.src}
											className={`${styles.hoverBg} width_100 b_r_10`}
											alt="img"
										/>

										<p
											className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase m_t_30`}
										>
											Press Release
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
												<span>{formatDate(item?.date)}</span>
											</p>
										</div>
									</div>
								</a>
							</div>
						);
					})}
					{list.length === 0 && <p>No Data Found!</p>}
					{/* <div className={`${styles.ItemBox}`}>
						<a href="">
							<div className={`${styles.hoverBox}`}>
								<img
									src={hoverBg.src}
									className={`${styles.hoverBg} width_100 b_r_10`}
									alt="img"
								/>
								<p
									className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase`}
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
					</div> */}
				</div>
				<Pagination
					data={list}
					paginationArr={paginationArr}
					setCurrentItems={setList}
					isDark={true}
					itemsPerPage={12}
				/>
			</div>
		</section>
	);
}
