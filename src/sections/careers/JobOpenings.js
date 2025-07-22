"use client";

/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import Pagination from "@/components/Pagination";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/JobOpenings.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import searchImg from "/public/img/icons/search.svg";

// DATA //

/** JobOpenings Section */
export default function JobOpenings({
	data,
	hideFilters = true,
	hideRedirect = false,
	defaultSelected,
}) {
	console.log(data, "data");
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [jobs, setJobs] = useState(data?.jobs?.data);
	const [filterdJob, setFilterdJob] = useState(data?.jobs?.data);
	const [filters, setFilters] = useState({
		countries: data.countries,
		departments: data.departments,
	});
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "" } },
		offeringsType: { isOpen: false, selected: { title: defaultSelected || "" } },
		search: { isOpen: false, selected: { title: "" } },
	});
	const [paginationArr, setPaginationArr] = useState(data?.jobs?.data);
	const [searchInput, setSearchInput] = useState(null);
	/** Debounced search when typing */
	useEffect(() => {
		const delay = setTimeout(() => {
			if (searchInput === null) return;
			handleOptionClick("search", searchInput.toLowerCase());
		}, 500);

		return () => clearTimeout(delay);
	}, [searchInput]);

	const dropdownRefs = {
		eventNameType: useRef(null),
		offeringsType: useRef(null),
	};

	/** Handle Option Click */
	const handleOptionClick = (key, option) => {
		let arr = jobs;
		let dropdownObj = {
			...dropdowns,
			[key]: { isOpen: false, selected: { title: option } },
		};
		if (option === "") {
			arr = [...jobs]; // clone to force re-render & effect
		}
		if (dropdownObj.eventNameType.selected.title) {
			arr = arr.filter((item) =>
				item.location.name
					.toLowerCase()
					.includes(dropdownObj?.eventNameType?.selected?.title?.toLowerCase())
			);
		}
		if (dropdownObj.offeringsType.selected.title) {
			arr = arr.filter((item) =>
				item?.job?.department?.name
					?.toLowerCase()
					?.includes(dropdownObj.offeringsType.selected.title?.toLowerCase())
			);
		}
		if (dropdownObj.search.selected.title) {
			arr = arr.filter(
				(item) =>
					item?.title?.toLowerCase()?.includes(dropdownObj.search.selected.title) ||
					item?.location?.province
						?.toLowerCase()
						?.includes(dropdownObj.search.selected.title) ||
					item?.job?.department?.name
						?.toLowerCase()
						?.includes(dropdownObj.search.selected.title) ||
					item?.employment_type_text
						?.toLowerCase()
						?.includes(dropdownObj.search.selected.title)
			);
		}
		setFilterdJob(arr);
		setPaginationArr(arr);

		setDropdowns((prev) => ({
			...prev,
			[key]: { isOpen: false, selected: { title: option } },
		}));
	};

	/** Toggle Dropdown */
	const toggleDropdown = (key) => {
		setDropdowns((prev) => ({
			...prev,
			eventNameType: { ...prev.eventNameType, isOpen: prev.eventNameType.isOpen },
			offeringsType: {
				...prev.offeringsType,
				isOpen: prev.offeringsType.isOpen,
			},
			search: {
				...prev.search,
				isOpen: prev.search.isOpen,
			},
			[key]: { ...prev[key], isOpen: !prev[key].isOpen },
		}));
	};

	/** FetchJobData  */
	async function FetchJobData() {
		try {
			const res = await fetch("https://auroraer.pinpointhq.com/postings.json");
			const json = await res.json();
			const tempCountries = [
				...new Set(
					json.data.map((item) => item?.location?.name.split(", ")[1] || "")
				),
			].filter((item) => item);
			const tempDepartments = [
				...new Set(
					json.data.map(
						(item) =>
							item?.job?.department?.name?.split("/")[1] ||
							item?.job?.department?.name?.split("/")[0]
					)
				),
			].filter((item) => item);
			setFilters({ countries: tempCountries, departments: tempDepartments });
			setJobs(json.data);
			setFilterdJob(json.data);
			setPaginationArr(json.data);
		} catch (error) {
			console.log(error, "json");
		}
	}

	/** Toggle Search Input */
	const toggleSearchInput = () => {
		setDropdowns((prev) => ({
			eventNameType: { isOpen: false, selected: { title: "" } },
			offeringsType: { isOpen: false, selected: { title: defaultSelected || "" } },
			search: { isOpen: false, selected: { title: "" } },
		}));
		setIsSearchVisible((prev) => !prev);
	};

	/** Close Search Input */
	const closeSearchInput = () => {
		setIsSearchVisible(false);
	};

	useEffect(() => {
		if (defaultSelected) {
			handleOptionClick("offeringsType", defaultSelected);
		}
	}, [defaultSelected]);

	return (
		<section className={`${styles.JobOpenings} dark_bg ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Job Openings
					</h2>
					{!hideRedirect && (
						<a href="/careers/join-us" className={`${styles.bookBtn}`}>
							<Button color="primary" variant="filled" shape="rounded" mode="dark">
								Explore All Roles
							</Button>
						</a>
					)}
				</div>
				{!hideFilters && (
					<div className={`${styles.filterBox}`}>
						<div className={`${styles.topNav}`}>
							<div className="">
								<div className={`${styles.filterflexMain} f_r_aj_between`}>
									<div className={`${styles.filterflex} `}>
										<div className={styles.selectBox} ref={dropdownRefs.eventNameType}>
											<div className={styles.custom_select}>
												<div
													className={`${styles.select_header_wapper} ${
														dropdowns.eventNameType.isOpen ? "activeDropDown" : ""
													}`}
													onClick={() => toggleDropdown("eventNameType")}
													tabIndex={0}
												>
													<div
														className={`${styles.select_header} select_bg text_sm text_500`}
													>
														{dropdowns.eventNameType.selected.title || "Country"}
														<img src={dropdown_arrow.src} alt="icon" />
													</div>
												</div>
												{dropdowns.eventNameType.isOpen && (
													<ul className={styles.selectOptionBox} data-lenis-prevent>
														<li
															className={
																dropdowns.eventNameType.selected.title === "" ? "selected" : ""
															}
															onClick={() => handleOptionClick("eventNameType", "")}
														>
															All
														</li>
														{filters?.countries?.map((option) => (
															<li
																key={option.title}
																className={
																	option === dropdowns.eventNameType.selected.title
																		? "selected"
																		: ""
																}
																onClick={() => handleOptionClick("eventNameType", option)}
															>
																{option}
															</li>
														))}
													</ul>
												)}
											</div>
										</div>
										<div className={styles.selectBox} ref={dropdownRefs.offeringsType}>
											<div className={styles.custom_select}>
												<div
													className={`${styles.select_header_wapper} ${
														dropdowns.offeringsType.isOpen ? "activeDropDown" : ""
													}`}
													onClick={() => toggleDropdown("offeringsType")}
													tabIndex={0}
												>
													<div
														className={`${styles.select_header} select_bg text_sm text_500`}
													>
														{dropdowns.offeringsType.selected.title || "Department"}
														<img src={dropdown_arrow.src} alt="icon" />
													</div>
												</div>
												{dropdowns.offeringsType.isOpen && (
													<ul className={styles.selectOptionBox} data-lenis-prevent>
														<li
															className={
																dropdowns.offeringsType.selected.title === "" ? "selected" : ""
															}
															onClick={() => handleOptionClick("offeringsType", "")}
														>
															All
														</li>
														{filters?.departments?.map((option) => (
															<li
																key={option.title}
																className={
																	option === dropdowns.offeringsType.selected.title
																		? "selected"
																		: ""
																}
																onClick={() => handleOptionClick("offeringsType", option)}
															>
																{option}
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
														setPaginationArr(data?.jobs?.data);
														setDropdowns({
															eventNameType: { isOpen: false, selected: { title: "" } },
															offeringsType: { isOpen: false, selected: { title: "" } },
															search: { isOpen: false, selected: { title: "" } },
														});
													}}
												>
													<div
														className={`${styles.select_header} select_bg text_sm text_500`}
													>
														Reset
													</div>
												</div>
											</div>
										</div>
									</div>
									{/* <div className={`${styles.searchInput}`}>
										<input
											type="text"
											placeholder="Search..."
											onChange={(e) =>
												handleOptionClick("search", e.target.value.toLowerCase())
											}
										/>
									</div> */}
									{/* search box */}
									<div className={`${styles.selectBox} ${styles.widthCustomSearch} `}>
										<div className={`${styles.searchBox}`} onClick={toggleSearchInput}>
											<p className="text_sm color_silver_gray text_500">Search</p>
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
													handleOptionClick("search", e.target.search.value.toLowerCase());
												}}
											>
												<input
													autoFocus
													name="search"
													type="text"
													placeholder="Search Program"
													onChange={(e) => setSearchInput(e.target.value)}
												/>
											</form>

											<span className="d_f">
												<img
													src={searchImg.src}
													alt="icon"
													onClick={() =>
														handleOptionClick("search", searchInput.toLowerCase())
													}
												/>
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
					</div>
				)}
				<div className={`${styles.tableBox}`}>
					<table className={`${hideFilters && styles.borderHide}`}>
						<tbody>
							{/* {filterdJob?.length > 0 && (
								<tr>
									<td className="text_xxs font_primary color_light_gray f_w_m text_uppercase">
										Position
									</td>
									<td className="text_xxs color_light_gray text_uppercase">

										Country
									</td>
									<td className="text_xxs color_light_gray text_uppercase">

										Department
									</td>
									<td className="text_xxs color_light_gray text_uppercase">

										Employment Type
									</td>
									<td className="text_xxs color_light_gray text_uppercase">

									</td>
								</tr>
							)} */}
							{filterdJob?.map((item, ind) => {
								return (
									<tr key={item?.title + ind}>
										<td className="text_md font_primary color_white f_w_m">
											{item?.title}
										</td>
										<td className="text_reg color_platinum_gray">
											{/* Singapore */}
											{item?.location?.province}
										</td>
										<td className="text_reg color_platinum_gray">
											{/* Advisory */}
											{item?.job?.department?.name}
										</td>
										<td className="text_reg color_platinum_gray">
											{/* Permanent - Full Time */}
											{item?.employment_type_text}
										</td>
										<td className="text_reg color_platinum_gray">
											{/* Permanent - Full Time */}
											{/* {item?.employment_type_text} */}
											<a href={item?.url} target="_blank" rel="noreferrer">
												<Button color="primary" variant="filled" shape="rounded" mode="max">
													View Job
												</Button>
											</a>
										</td>
									</tr>
								);
							})}
							{filterdJob?.length === 0 && (
								<tr>
									<td className="text_md font_primary color_white f_w_m">
										There are currently no opportunities based on your filters. Please try
										again, or register your interest.
									</td>
								</tr>
							)}
						</tbody>
						{/* <tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Associate
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								(Senior) Commercial Associate <br />
								(Power & Renewables)
							</td>
							<td className="text_reg color_platinum_gray">Gurugram, India</td>
							<td className="text_reg color_platinum_gray">
								Commercial - Sales & <br />
								Account Management
							</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Associate
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr>
						<tr>
							<td className="text_md font_primary color_white f_w_m">
								Senior Research Analyst
							</td>
							<td className="text_reg color_platinum_gray">Singapore</td>
							<td className="text_reg color_platinum_gray">Advisory</td>
							<td className="text_reg color_platinum_gray">Permanent - Full Time</td>
						</tr> */}
					</table>
				</div>
				<Pagination
					data={filterdJob}
					paginationArr={paginationArr}
					itemsPerPage={5}
					setCurrentItems={setFilterdJob}
				/>
			</div>
		</section>
	);
}
