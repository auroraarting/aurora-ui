"use client";
// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import { useRouter } from "next/router";
import Pagination from "@/components/Pagination";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

// UTILS //
import {
	filterBySearchQueryEvents,
	filterItemsBySelectedObjForCareers,
	filterItemsBySelectedObjForPress,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/careers/CareerCountryCard.module.scss";

// IMAGES //
import country_img from "../../../public/img/careers/country_img.png";
import location from "../../../public/img/icons/location.svg";
import slider_arrow_black from "../../../public/img/icons/slider_arrow_black.svg";
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import searchImg from "../../../public/img/icons/search.svg";

// DATA //

// CONTEXT //
import { GlobalContext, useContextProvider } from "@/context/GlobalContext";

/** CareerCountryCard Section */
export default function CareerCountryCard({ page, data, programs, countries }) {
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [filteredData, setFilteredData] = useState(data);
	const [loading, setLoading] = useState(false);
	const [original, setOriginal] = useState(data);
	const [paginationArr, setPaginationArr] = useState(data);
	const { search } = useContextProvider();
	const [dropdowns, setDropdowns] = useState({
		countryType: { isOpen: false, selected: { title: "Country" } },
		programsType: { isOpen: false, selected: { title: "Program" } },
	});

	/** Toggle Search Input */
	const toggleSearchInput = () => {
		setIsSearchVisible((prev) => !prev);
	};

	/** Close Search Input */
	const closeSearchInput = () => {
		setIsSearchVisible(false);
	};

	const dropdownRefs = {
		countryType: useRef(null),
		programsType: useRef(null),
	};

	const optionsData = {
		countryType: countries,
		programsType: programs?.map((item) => {
			return { title: item?.name };
		}),
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
		}
		if (key === "programsType") {
			selectedObj.program = catName;
		}
		if (key === "countryType") {
			selectedObj.country = catName;
		}
		const filteredArr = filterItemsBySelectedObjForCareers(arr, selectedObj);
		setFilteredData(filteredArr);
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
			const filtered = filterBySearchQueryEvents(data, search);
			setFilteredData(filtered);
			setPaginationArr(filtered);
			setOriginal(filtered);
		}
	}, [search]);

	return (
		<section
			className={`${styles.CareerCountryCard} CareerCountryCard ptb_100`}
			id="Programs"
			data-name="Programs"
		>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						{page?.listing?.title}
					</h2>
				</div>
				<div
					// className={styles.filterMain}
					className={styles.filterMain1}
				>
					<div className={styles.filterflex}>
						{/* Programs Type Dropdown */}
						{/* <div className={`${styles.selectBox}`} ref={dropdownRefs.programsType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.programsType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("programsType")}
									tabIndex={0}
								>
									<div
										className={`${styles.select_header} select_bg text_sm color_silver_gray text_500`}
									>
										{dropdowns.programsType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.programsType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.programsType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.programsType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("programsType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div> */}

						{/* Country Dropdown */}
						{/* <div className={styles.selectBox} ref={dropdownRefs.countryType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.countryType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("countryType")}
									tabIndex={0}
								>
									<div
										className={`${styles.select_header} select_bg text_sm color_silver_gray text_500`}
									>
										{dropdowns.countryType.selected.title || "Country"}
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
						</div> */}

						{/* Reset */}
						{/* <div className={`${styles.selectBox} ${styles.widthCustom} maxWidth`}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} "activeDropDown"`}
									onClick={() => {
										setSelected({});
										setFilteredData(data);
										setPaginationArr(data);
										setDropdowns({
											countryType: { isOpen: false, selected: { title: "Country" } },
											programsType: { isOpen: false, selected: { title: "Program" } },
										});
									}}
								>
									<div
										className={`${styles.select_header} select_bg text_sm text_500 color_white
                                            `}
									>
										Reset
									</div>
								</div>
							</div>
						</div> */}

						{/* search box */}
						{/* <div className={`${styles.selectBox} ${styles.widthCustomSearch} `}>
							<div className={`${styles.searchBox}`} onClick={toggleSearchInput}>
								<p className="text_sm color_silver_gray text_500">
									{selected.search || "Search"}
								</p>
								<span>
									<img src={searchImg.src} alt="icon" />
								</span>
							</div>
						</div> */}
						{/* Search Input - Show/Hide on Click */}
						{/* {isSearchVisible && (
							<div className={`${styles.searchInput} f_r_aj_between`}>
								<form
									className="w-full"
									onSubmit={(e) => {
										e.preventDefault();
										const val = e.target.search.value;
										console.log("Asdasda", val);

										filter(val, "search");
									}}
								>
									<input name="search" type="text" placeholder="Search Program" />
								</form>

								<span className="d_f">
									<div className={`${styles.closeBox}`} onClick={closeSearchInput}>
										<span className="text_xs">X</span>
									</div>
								</span>
							</div>
						)} */}
					</div>
				</div>

				<div className={`${styles.SliderMain} pt_20`}>
					{filteredData?.map((item) => {
						return (
							<div className={`${styles.cardItem}`} key={item?.slug}>
								<div className={`${styles.cardImg}`}>
									<img
										src={item?.earlyCareers?.thumbnail?.thumb?.node?.mediaItemUrl}
										className={`${styles.countryImg} b_r_10`}
										alt={item?.earlyCareers?.thumbnail?.country?.node?.title}
									/>
									{item?.earlyCareers?.thumbnail?.islive && (
										<p
											className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
										>
											Live
										</p>
									)}
								</div>
								<div className={`${styles.cardDesc} pt_20`}>
									{item?.earlyCareers?.thumbnail?.country?.node?.title && (
										<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
											<img
												src={location.src}
												className={`${styles.location}`}
												alt="location"
											/>
											<span>{item?.earlyCareers?.thumbnail?.country?.node?.title}</span>
										</p>
									)}
									<h4 className="text_md color_white f_w_m font_primary pt_10">
										{item?.title}
									</h4>
									<div className={`${styles.btn_box} pt_20`}>
										<a href={`/careers/early-careers/${item?.slug}`}>
											<Button color="secondary" variant="underline" mode="dark">
												Read More
											</Button>
										</a>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{filteredData.length === 0 && <p className="color_white">No Programs</p>}

				<Pagination
					data={filteredData}
					paginationArr={paginationArr}
					// itemsPerPage={5}
					setCurrentItems={setFilteredData}
				/>
			</div>
		</section>
	);
}
