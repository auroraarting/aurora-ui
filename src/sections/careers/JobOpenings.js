// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/JobOpenings.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
// DATA //

/** JobOpenings Section */
export default function JobOpenings() {
	const dropdownRefs = {
		eventNameType: useRef(null),
		offeringsType: useRef(null),
	};
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		offeringsType: { isOpen: false, selected: { title: "Advisory" } },
	});
	const optionsData = {
		eventNameType: [
			{ title: "Event Name1" },
			{ title: "Event Name2" },
			{ title: "Event Name3" },
			{ title: "Event Name4" },
		],
		offeringsType: [
			{ title: "Offerings1" },
			{ title: "Offerings2" },
			{ title: "Offerings3" },
			{ title: "Offerings4" },
		],
	};
	/** Handle Option Click */
	const handleOptionClick = (key, option) => {
		setDropdowns((prev) => ({
			...prev,
			[key]: { isOpen: false, selected: option },
		}));
	};
	/** Toggle Dropdown */
	const toggleDropdown = (key) => {
		setDropdowns((prev) => ({
			...prev,
			[key]: { ...prev[key], isOpen: !prev[key].isOpen },
		}));
	};
	return (
		<section className={`${styles.JobOpenings} dark_bg ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Job Openings
					</h2>
					<div className={`${styles.bookBtn}`}>
						<Button color="primary" variant="filled" shape="rounded" mode="dark">
							Join Us
						</Button>
					</div>
				</div>
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
								</div>
								<div>
									<Button color="primary" variant="filled" shape="rounded">
										Read More
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.tableBox}`}>
					<table>
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
						</tr>
					</table>
				</div>
			</div>
		</section>
	);
}
