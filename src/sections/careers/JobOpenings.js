/* eslint-disable @next/next/no-html-link-for-pages */
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
export default function JobOpenings({ data }) {
	const [jobs, setJobs] = useState(data.jobs.data);
	const [filterdJob, setFilterdJob] = useState(data.jobs.data);
	const [filters, setFilters] = useState({
		countries: data.countries,
		departments: data.departments,
	});
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "" } },
		offeringsType: { isOpen: false, selected: { title: "" } },
		search: { isOpen: false, selected: { title: "" } },
	});
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
		console.log(dropdownObj, "arr");
		setFilterdJob(arr);

		setDropdowns((prev) => ({
			...prev,
			[key]: { isOpen: false, selected: { title: option } },
		}));
	};

	/** search  */
	const search = (val) => {
		console.log(val);
	};

	/** Toggle Dropdown */
	const toggleDropdown = (key) => {
		setDropdowns((prev) => ({
			...prev,
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
			console.log(json.data);
		} catch (error) {
			console.log(error, "json");
		}
	}

	useEffect(() => {
		// FetchJobData();
	}, []);

	return (
		<section className={`${styles.JobOpenings} dark_bg ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Job Openings
					</h2>
					<a href="/careers/join-us" className={`${styles.bookBtn}`}>
						<Button color="primary" variant="filled" shape="rounded" mode="dark">
							Join Us
						</Button>
					</a>
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
													{dropdowns.eventNameType.selected.title || "Country"}
													<img src={dropdown_arrow.src} alt="icon" />
												</div>
											</div>
											{dropdowns.eventNameType.isOpen && (
												<ul className={styles.selectOptionBox}>
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
												<ul className={styles.selectOptionBox}>
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
								</div>
								<div className={`${styles.searchInput}`}>
									<input
										type="text"
										placeholder="Serach..."
										onChange={(e) =>
											handleOptionClick("search", e.target.value.toLowerCase())
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={`${styles.tableBox}`}>
					<table>
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
												Link to Job Post
											</Button>
										</a>
									</td>
								</tr>
							);
						})}
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
			</div>
		</section>
	);
}
