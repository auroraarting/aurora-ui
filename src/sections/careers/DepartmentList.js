// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //
import Button from "@/components/Buttons/Button";
// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/DepartmentList.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
// DATA //

/** DepartmentList Section */
export default function DepartmentList() {
	const [selected, setSelected] = useState({});
	const dropdownRefs = {
		eventNameType: useRef(null),
		offeringsType: useRef(null),
	};
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		offeringsType: { isOpen: false, selected: { title: "Offerings" } },
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
		{
			category: "Software1",
			options: ["Amun", "Chronos", "Lumus PPA", "Origin"],
		},
		{
			category: "Software21",
			options: ["Amun", "Chronos", "Lumus PPA", "Origin"],
		},
		{
			category: "Software2",
			options: ["Amun", "Chronos", "Lumus PPA", "Origin"],
		},
	];
	/** radio Input */
	const handleChange = (option) => {
		setSelected(option); // Only one selected option at a time
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
	return (
		<section className={`${styles.DepartmentList}`}>
			<div className={`${styles.topNav}`}>
				<div className="container">
					<div className={`${styles.filterflexMain} f_r_aj_between`}>
						<div className={`${styles.filterflex} `}>
							<p className={`${styles.selectBoxTxt} text_sm`}>Select a Department:</p>
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
										<div className={`${styles.selectOptionBox} ${styles.checkBoxWapper}`}>
											{radioData.map((item, index) => (
												<div key={index} className={styles.checkBoxItem}>
													<h4 className="text_sm color_dark_gray text_500">
														{item.category}
													</h4>
													<div className={styles.checkBoxList}>
														{item.options?.map((option, idx) => (
															<h4 key={idx} className="text_sm color_dark_gray text_500">
																{option}
															</h4>
														))}
													</div>
												</div>
											))}
										</div>
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
			<div className={`${styles.topNavContentMain}`}>
				<div className={`${styles.topNavContent}`}>
					<div className={`${styles.teamDetails}`}>
						<div className="container">
							<div className={`${styles.teamDetailsFlex} f_w_j ptb_50`}>
								<div className={`${styles.teamDetailsItem}`}>
									<h2 className="text_xl">Advisory</h2>
								</div>
								<div className={`${styles.teamDetailsItem}`}>
									<p className="text_reg m_b_20">
										As the “ear to the market,” our Advisory team supports our clients’
										decision-making with bespoke analyses, modelling, and advice to help
										them solve some of their toughest analytical challenges, from building
										business cases for the financing of renewables and batteries to
										quantifying the impact of novel technologies on the energy transition.
										Working with Power BI, Sourcetree, and PowerPoint are integral to our
										efforts on client-commissioned projects.
									</p>
									<p className="text_reg">
										While most new joiners typically start with a regional focus,
										depending on a person’s interest and capabilities, Advisory Analysts
										can take on a regional or topic focus. Working in Advisory is great
										for anyone who thrives with close client interaction and would like to
										directly inform decisions of major investors, utilities, and
										policymakers with bespoke analysis and advice, and get exposure to a
										broad range of energy topics. If you are eager to develop or further
										strengthen your stakeholder management, presenting, or business case
										evaluation skills, Advisory would be the right team for you!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
