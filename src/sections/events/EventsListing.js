// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/events/EventsListing.module.scss";

// IMAGES //
import energy_transition from "../../../public/img/events/energy_transition.png";
import location from "../../../public/img/icons/location.svg";
import calender from "../../../public/img/icons/calender.svg";
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import search from "../../../public/img/icons/search.svg";

// DATA //

/** EventsListing Section */
export default function EventsListing() {
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		countryType: { isOpen: false, selected: { title: "Country" } },
		offeringsType: { isOpen: false, selected: { title: "Offerings" } },
		eventStatusType: { isOpen: false, selected: { title: "Event Status" } },
		yearsType: { isOpen: false, selected: { title: "Year" } },
	});

	const dropdownRefs = {
		eventNameType: useRef(null),
		countryType: useRef(null),
		offeringsType: useRef(null),
		eventStatusType: useRef(null),
		yearsType: useRef(null),
	};

	const optionsData = {
		eventNameType: [
			{ title: "Event Name1" },
			{ title: "Event Name2" },
			{ title: "Event Name3" },
			{ title: "Event Name4" },
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
		eventStatusType: [
			{ title: "Event Status" },
			{ title: "Event Status" },
			{ title: "Event Status" },
			{ title: "Event Status" },
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
									<ul className={styles.selectOptionBox}>
										{optionsData.offeringsType.map((option) => (
											<li
												key={option.title}
												className={
													option.title === dropdowns.offeringsType.selected.title
														? "selected"
														: ""
												}
												onClick={() => handleOptionClick("offeringsType", option)}
											>
												{option.title}
											</li>
										))}
									</ul>
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
										{dropdowns.eventStatusType.selected.title}
										<img src={dropdown_arrow.src} alt="icon" />
									</div>
								</div>
								{dropdowns.eventStatusType.isOpen && (
									<ul className={styles.selectOptionBox}>
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

						{/* Event Status Type Dropdown */}
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
						>
							<div className={`${styles.searchBox} f_r_aj_between`}>
								<p className="text_sm text_500">Search</p>
								<span>
									<img src={search.src} alt="icon" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
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
				</div>
				<div className={`${styles.insightsItemFlex} d_f m_t_20`}>
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
				</div>
			</div>
		</section>
	);
}
