// MODULES //
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import formatDate, {
	buildQueryFromContext,
	filterBySearchQuery,
	filterItems,
	isCategory,
	objectToGraphQLArgs,
} from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/aurora-insights/InsightsListing.module.scss";

// IMAGES //
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import dropdown_arrow from "@/../public/img/icons/dropdown_arrow.svg";
import search from "@/../public/img/icons/search.svg";
import hoverBg from "@/../public/img/home/hoverBg.png";

// SERVICES //
import { getInsights } from "@/services/Insights.service";

// DATA //

/** InsightsListing Section */
export default function InsightsListing({
	data,
	pagination,
	countries,
	productService,
	products,
	softwares,
	services,
	original,
	setOriginal,
}) {
	const router = useRouter();
	const [list, setList] = useState(data);
	const [selected, setSelected] = useState({});
	const [filteredPagination, setFilteredPagination] = useState(pagination);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dropdowns, setDropdowns] = useState({
		categoryType: { isOpen: false, selected: { title: "Category" } },
		countryType: { isOpen: false, selected: { title: "Country" } },
		offeringsType: { isOpen: false, selected: { title: "Products & Services" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
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
		categoryType: useRef(null),
		countryType: useRef(null),
		offeringsType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		categoryType: [
			{ title: "Articles", alternate: "Commentary" },
			{ title: "Case studies", alternate: "Case studies" },
			{ title: "Market reports", alternate: "Market reports" },
			{ title: "Press Release", alternate: "Press Release" },
			{ title: "Past Webinars", alternate: "Webinar Recording" },
			{ title: "Reports", alternate: "Reports" },
			{ title: "Public", alternate: "Public" },
		],
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
		yearsType: Array(new Date().getFullYear() - 2000)
			.fill(null)
			.map((item, ind) => {
				return { title: 2001 + ind };
			})
			.reverse(),
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
		if (key === "categoryType") {
			filter(option, key);
		} else {
			filter(option.title, key);
		}
	};

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

	/** handleNextPage  */
	const handleNextPage = async () => {
		setLoading(true);
		// Build your query with the new `after` cursor
		const newQuery = {
			...router.query,
			after: filteredPagination.endCursor,
		};

		router.push(
			{
				pathname: router.pathname,
				query: newQuery,
			},
			undefined,
			{ shallow: true }
		);

		const queryToUse = objectToGraphQLArgs(buildQueryFromContext(newQuery));
		const filteredData = await getInsights(queryToUse);
		setLoading(false);
		setList(filteredData.data.posts.nodes);
		setFilteredPagination(filteredData.data?.posts?.pageInfo);
	};

	/** handleNextPage  */
	const handlePreviousPage = async () => {
		window.history.back();
	};

	/** filter  */
	const filter = async (catName, key) => {
		let queryObj = { ...router.query };
		let selectedObj = selected;
		let arr = original;
		setLoading(true);

		if (key === "search") {
			selectedObj.search = catName;
			queryObj.search = catName;

			window.location.href = `/resources/aurora-insights?search=${catName}`;
			return;
		}
		if (key === "categoryType") {
			selectedObj.category = catName.alternate;
			queryObj.category = catName.alternate;
		}
		if (key === "countryType") {
			selectedObj.country = catName;
			queryObj.country = catName;
		}
		if (key === "offeringsType") {
			selectedObj.productService = catName;
			queryObj.productService = catName;
		}
		if (key === "yearsType") {
			selectedObj.year = catName;
			queryObj.year = catName;
		}
		if (key === "Product") {
			selectedObj.product = catName;
			queryObj.product = catName;
		}
		if (key === "Software") {
			selectedObj.software = catName;
			queryObj.software = catName;
		}
		if (key === "Service") {
			selectedObj.service = catName;
			queryObj.service = catName;
		}
		setSelected(selectedObj);

		const filteredArr = filterItems(arr, queryObj);
		console.log(filteredArr, queryObj);
		setList(filteredArr);
		setLoading(false);
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
		if (router.query.search) {
			const filtered = filterBySearchQuery(data, router.query.search);
			setList(filtered);
			setOriginal(filtered);
		}
	}, [router.query]);

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
										{selected.category || "Category"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.categoryType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.categoryType.map((option) => (
											<li
												key={option.title}
												className={option.title === selected.category ? "selected" : ""}
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
										{selected.country || "Country"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.countryType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{countries?.map((option) => (
											<li
												key={option.title}
												className={option.title === selected.country ? "selected" : ""}
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
										{/* {selected.productService || "Products & Services"} */}
										Products & Services
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
										{selected.year || "Years"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.yearsType.isOpen && (
									<ul className={styles.selectOptionBox}>
										{optionsData.yearsType.map((option) => (
											<li
												key={option.title}
												className={option.title === selected.year ? "selected" : ""}
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
								<form
									className="w-full"
									onSubmit={(e) => {
										e.preventDefault();
										const val = e.target.search.value;
										filter(val, "search");
										console.log(val);
									}}
								>
									<input name="search" type="text" placeholder="Search Events" />
								</form>
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
					{!loading &&
						list.map((item, ind) => {
							return (
								<div className={`${styles.ItemBox}`} key={item?.title + ind}>
									<a href={`/resources/aurora-insights/${item?.slug}`}>
										<div className={`${styles.hoverBox}`}>
											<img
												src={hoverBg.src}
												className={`${styles.hoverBg} width_100 b_r_10`}
												alt="img"
											/>
											{isCategory(optionsData.categoryType, item?.categories?.nodes) && (
												<p
													className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase`}
												>
													{/* Press Release */}
													{isCategory(optionsData.categoryType, item?.categories?.nodes)}
												</p>
											)}
											<p
												className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_10`}
											>
												{item?.title}
											</p>
											<div className={`${styles.dateFlex} f_j pt_30`}>
												<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
													<img
														src={data?.featuredImage?.node?.sourceUrl || calender.src}
														className={`${styles.calender}`}
														alt="calender"
													/>
													<span>{formatDate(item?.date)}</span>
												</p>
												{isCategory(countries, item?.categories?.nodes) && (
													<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
														<img
															src={location.src}
															className={`${styles.calender}`}
															alt="calender"
														/>
														{/* <span>India</span> */}
														<span>{isCategory(countries, item?.categories?.nodes)}</span>
													</p>
												)}
											</div>
										</div>
									</a>
								</div>
							);
						})}
					{loading && <p>Loading...</p>}
					{list?.length === 0 && !loading && <p>No Data</p>}
				</div>
			</div>
			{/* {filteredPagination?.hasPreviousPage && (
				<button onClick={handlePreviousPage}>Previous</button>
			)}
			{filteredPagination?.hasNextPage && (
				<button onClick={handleNextPage}>Next</button>
			)} */}
		</section>
	);
}
