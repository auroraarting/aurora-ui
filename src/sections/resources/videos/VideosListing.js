"use client";
// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Pagination from "@/components/Pagination";

// SECTIONS //

// PLUGINS //
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-video.css";

// UTILS //
import formatDate from "@/utils";

// STYLES //
import styles from "@/styles/sections/resources/videos/VideosListing.module.scss";

// IMAGES //
import location from "@/../public/img/icons/location.svg";
import calender from "@/../public/img/icons/calender.svg";
import dropdown_arrow from "@/../public/img/icons/dropdown_arrow.svg";
import searchImg from "@/../public/img/icons/search.svg";
import hoverBg from "@/../public/img/home/hoverBg.png";

// DATA //
/** Fallback rich text shown in the video popup when the CMS has no custom text */
const DEFAULT_CUSTOM_TEXT =
	"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil debitis facere expedita laudantium quam molestiae pariatur ad vitae cum ea consectetur nobis ex, iste dolor! Aperiam ipsam ducimus animi unde.</p>";

/**
 * lightGallery sizes the video container at runtime, so the caption width can
 * only be matched from JS. Keeps the custom text from spilling past the video.
 */
const syncCaptionWidth = () => {
	document.querySelectorAll(".videoPopupCaption").forEach((gallery) => {
		const caption = gallery.querySelector(".lg-sub-html");
		const video =
			gallery.querySelector(".lg-current .lg-video-cont") ||
			gallery.querySelector(".lg-video-cont");
		if (!caption || !video) return;

		const width = video.getBoundingClientRect().width;
		if (width > 0) caption.style.maxWidth = `${Math.round(width)}px`;
	});
};

/**
 * lightGallery closes the popup on any click that bubbles up to `.lg-outer`,
 * which would swallow clicks on links inside the custom text. Stopping
 * propagation on the caption keeps the popup open while links, mailto's and
 * text selection keep working.
 */
const setupPopupCaption = () => {
	document.querySelectorAll(".videoPopupCaption .lg-sub-html").forEach((el) => {
		if (!el.dataset.captionBound) {
			el.dataset.captionBound = "true";
			["mousedown", "mouseup", "click", "touchstart", "touchend"].forEach((evt) =>
				el.addEventListener(evt, (e) => e.stopPropagation()),
			);
		}

		// Web links open in a new tab so the video is not interrupted,
		// mailto / tel links are left alone. Re-applied on every render because
		// lightGallery rewrites the caption markup each time it is appended.
		el.querySelectorAll("a[href]").forEach((link) => {
			const href = link.getAttribute("href") || "";
			if (/^(mailto:|tel:|#)/i.test(href)) return;
			link.setAttribute("target", "_blank");
			link.setAttribute("rel", "noreferrer");
		});
	});

	// The video container is not measurable on the same frame the popup opens.
	requestAnimationFrame(syncCaptionWidth);
	setTimeout(syncCaptionWidth, 300);
};

/** Filter videos by selected filters */
function filterVideos(arr, selectedObj) {
	let filtered = [...arr];

	if (selectedObj?.topic) {
		filtered = filtered.filter((item) =>
			item?.videoFields?.topic?.nodes?.some((t) => t.title === selectedObj.topic),
		);
	}
	if (selectedObj?.country) {
		filtered = filtered.filter((item) =>
			item?.videoFields?.country?.nodes?.some(
				(c) => c.title === selectedObj.country,
			),
		);
	}
	if (selectedObj?.year) {
		filtered = filtered.filter((item) => {
			const date = item?.videoFields?.date;
			if (!date) return false;
			const year = new Date(date).getFullYear();
			return year === parseInt(selectedObj.year);
		});
	}
	if (selectedObj?.search) {
		const q = selectedObj.search.toLowerCase();
		filtered = filtered.filter((item) => item?.title?.toLowerCase().includes(q));
	}

	return filtered;
}

/** VideosListing Section */
export default function VideosListing({ countries, data, years, topics }) {
	const [original] = useState(data);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [dropdowns, setDropdowns] = useState({
		topicType: { isOpen: false, selected: { title: "Topic" } },
		countryType: { isOpen: false, selected: { title: "Country" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});
	const [list, setList] = useState(data);
	const [paginationArr, setPaginationArr] = useState(data);
	const [searchInput, setSearchInput] = useState(null);

	/** Debounced search when typing */
	useEffect(() => {
		const delay = setTimeout(() => {
			if (searchInput === null) return;
			applyFilter({ ...selected, search: searchInput });
		}, 500);

		return () => clearTimeout(delay);
	}, [searchInput]);

	/** Keep the popup caption matched to the video width on resize */
	useEffect(() => {
		window.addEventListener("resize", syncCaptionWidth);
		return () => window.removeEventListener("resize", syncCaptionWidth);
	}, []);

	/** Apply filters */
	const applyFilter = (selectedObj) => {
		setLoading(true);
		const filteredArr = filterVideos(original, selectedObj);
		setList(filteredArr);
		setPaginationArr(filteredArr);
		setSelected(selectedObj);
		setLoading(false);
	};

	/** Toggle Search Input */
	const toggleSearchInput = () => {
		setIsSearchVisible((prev) => !prev);
	};

	/** Close Search Input */
	const closeSearchInput = () => {
		setIsSearchVisible(false);
	};

	const dropdownRefs = {
		topicType: useRef(null),
		countryType: useRef(null),
		yearsType: useRef(null),
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
		const newSelected = { ...selected };
		if (key === "topicType") {
			if (option.title) newSelected.topic = option.title;
			else delete newSelected.topic;
		}
		if (key === "countryType") {
			if (option.title) newSelected.country = option.title;
			else delete newSelected.country;
		}
		if (key === "yearsType") {
			if (option.title) newSelected.year = option.title;
			else delete newSelected.year;
		}
		applyFilter(newSelected);
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

	return (
		<section className={styles.VideosListing}>
			<div className={styles.filterMain}>
				<div className="container">
					<div className={styles.filterflex}>
						{/* Topic Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.topicType}>
							<div className={styles.custom_select}>
								<div
									className={`${styles.select_header_wapper} ${
										dropdowns.topicType.isOpen ? "activeDropDown" : ""
									}`}
									onClick={() => toggleDropdown("topicType")}
									tabIndex={0}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										{selected?.topic || "Topic"}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.topicType.isOpen && (
									<ul className={styles.selectOptionBox} data-lenis-prevent>
										<li onClick={() => handleOptionClick("topicType", "")}>All</li>
										{topics.map((option) => (
											<li
												key={option.title}
												className={option.title === selected?.topic ? "selected" : ""}
												onClick={() => handleOptionClick("topicType", option)}
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
										<li onClick={() => handleOptionClick("countryType", "")}>All</li>
										{countries.map((option) => (
											<li
												key={option.title}
												className={option.title === selected?.country ? "selected" : ""}
												onClick={() => handleOptionClick("countryType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
								)}
							</div>
						</div>

						{/* Year Dropdown */}
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
										<li onClick={() => handleOptionClick("yearsType", "")}>All</li>
										{years.map((option) => (
											<li
												key={option.title}
												className={option.title === selected?.year ? "selected" : ""}
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
										setPaginationArr(data);
									}}
								>
									<div className={`${styles.select_header} select_bg text_sm text_500`}>
										Reset
									</div>
								</div>
							</div>
						</div>

						{/* Search Box */}
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

						{/* Search Input */}
						{isSearchVisible && (
							<div className={`${styles.searchInput} f_r_aj_between`}>
								<form
									className="w-full"
									onSubmit={(e) => {
										e.preventDefault();
										const val = e.target.search.value;
										applyFilter({ ...selected, search: val });
									}}
								>
									<input
										autoFocus
										name="search"
										type="text"
										placeholder="Search Videos"
										onChange={(e) => setSearchInput(e.target.value)}
									/>
								</form>
								<span className="d_f">
									<img
										src={searchImg.src}
										alt="icon"
										onClick={() => applyFilter({ ...selected, search: searchInput })}
									/>
									<div
										className={`${styles.closeBox}`}
										onClick={() => {
											setSearchInput("");
											applyFilter({ ...selected, search: "" });
											closeSearchInput();
										}}
									>
										<span className="text_xs">X</span>
									</div>
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="container">
				<div className={`${styles.videosItemFlex} d_f m_t_20`}>
					{list?.map((item) => {
						const videoUrl = item?.videoFields?.videoLink;
						const customText = item?.videoFields?.customText || DEFAULT_CUSTOM_TEXT;
						const topic = item?.videoFields?.topic?.nodes
							?.map((t) => t.title)
							.join(", ");
						const date = item?.videoFields?.date;
						const country = item?.videoFields?.country?.nodes
							?.map((c) => c.title)
							.join(", ");

						return (
							/* One gallery per video so the popup never becomes a slider */
							<LightGallery
								key={item?.slug || item?.title}
								speed={500}
								plugins={[lgZoom, lgVideo]}
								mobileSettings={{ closable: true }}
								thumbnail={false}
								animateThumb={false}
								counter={false}
								addClass="videoPopupCaption"
								elementClassNames={`${styles.ItemBox}`}
								onAfterOpen={setupPopupCaption}
								onAfterAppendSubHtml={setupPopupCaption}
							>
								<a
									href={videoUrl || "#"}
									data-src={videoUrl || ""}
									data-sub-html={customText}
								>
									<div className={`${styles.hoverBox}`}>
										<img
											src={hoverBg.src}
											className={`${styles.hoverBg} width_100 b_r_10`}
											alt="img"
										/>
										{/* Topic */}
										{topic && (
											<p
												className={`${styles.categoryTxt} text_xs font_primary color_dark_gray text_uppercase`}
											>
												{topic}
											</p>
										)}

										{/* Video Title */}
										<p
											className={`${styles.descTxt} text_reg font_primary color_dark_gray pt_20`}
										>
											{item?.title}
										</p>

										{/* Date & Country */}
										{(date || country) && (
											<div className={`${styles.dateFlex} f_j pt_40`}>
												{date && (
													<p className="text_xs f_w_m color_light_gray text_uppercase f_r_a_center">
														<img
															src={calender.src}
															className={`${styles.calender}`}
															alt="calendar"
														/>
														<span>{formatDate(date)}</span>
													</p>
												)}
												{country && (
													<p className="text_xs f_w_m color_light_gray f_r_a_center">
														<img
															src={location.src}
															className={`${styles.location}`}
															alt="location"
														/>
														<span className="text_uppercase">{country}</span>
													</p>
												)}
											</div>
										)}
									</div>
								</a>
							</LightGallery>
						);
					})}
					{loading && <p>Loading...</p>}
					{list?.length === 0 && !loading && (
						<p className={`${styles.nodataText} nodataText`}>
							No videos available for this selection. Please choose a different option.
						</p>
					)}
				</div>
				{list?.length > 0 && (
					<Pagination
						data={list}
						paginationArr={paginationArr}
						setCurrentItems={setList}
						isDark={true}
					/>
				)}
			</div>
		</section>
	);
}
