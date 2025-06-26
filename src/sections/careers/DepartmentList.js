// MODULES //
import { useRef, useEffect, useState } from "react";
// COMPONENTS //
import Button from "@/components/Buttons/Button";
import EventSmarterEnergy from "@/components/EventSmarterEnergy";
import Insights from "@/components/Insights";
import ContentFromCms from "@/components/ContentFromCms";

// SECTIONS //
import JobOpenings from "./JobOpenings";
// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/DepartmentList.module.scss";

// IMAGES //
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import linKed from "../../../public/img/icons/linkedin.svg";
import advisoryMain from "../../../public/img/careers/advisoryMain.jpg";
import hoverEffect from "../../../public/img/events/hoverEffect.png";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

/** DepartmentList Section */
export default function DepartmentList({ data, jobs, departments }) {
	const [showAll, setShowAll] = useState(false);
	const [selected, setSelected] = useState({});
	const dropdownRefs = {
		eventNameType: useRef(null),
		offeringsType: useRef(null),
	};
	const [dropdowns, setDropdowns] = useState({
		eventNameType: { isOpen: false, selected: { title: "Event Name" } },
		offeringsType: { isOpen: false, selected: { title: "Advisory" } },
	});
	const [selectedDepartment, setSelectedDepartment] = useState(0);
	const dataForBtn = { postFields: data || {} };

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

	const infoData = [
		{
			title: "Describe your key responsibilities.",
			desc:
				"My responsibilities cover various aspects related to the growth of the Tokyo office. These include developing and executing our business strategy, improving our research and advisory capabilities, and building out our team.",
		},
		{
			title: "What is the highlight of your role?",
			desc:
				"What I most enjoy about my role can be captured by our subscriber Group Meetings, part of our Service-level product offering. Our team brings forward quantitative analysis and insights to our subscribers, focusing on curtailment and its impacts on the Japanese market, while also facilitating in-depth discussions on these topics. These Group Meetings bring a collaborative feel and real-world application to our research. These aspects of my role motivate me in my day-to-day work.",
		},
		{
			title: "What's the best thing about your team?",
			desc:
				"The best thing about my team is that they are collaborative professionals with a wealth of expertise on energy topics.",
		},
		{
			title: "What's the best thing about your team?",
			desc:
				"The best thing about my team is that they are collaborative professionals with a wealth of expertise on energy topics.",
		},
		{
			title: "Reflect on what you like most about working at Aurora.",
			desc:
				"What I most enjoy about working at Aurora is that there are many opportunities to have interesting discussions on energy markets with internal and external experts across the world.",
		},
		{
			title:
				"If you could capture the essence of Aurora in word, what would it be?",
			desc:
				"Collaborative. The culture at Aurora fosters collaboration and cooperation across teams, departments, and offices to achieve our goals, solve problems, and learn from each other.",
		},
	];

	/** handleSelect  */
	const handleSelect = (option) => {
		setDropdowns({
			eventNameType: { isOpen: false, selected: { title: "Event Name" } },
			offeringsType: { isOpen: false, selected: { title: option } },
		});
		const selectedOption = data?.categories?.findIndex(
			(item) => item.categorytext === option
		);
		setSelectedDepartment(selectedOption);
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
											{departments.map((item, index) => (
												<div
													key={index}
													className={styles.checkBoxItem}
													onClick={() => handleSelect(item)}
												>
													<h4 className="text_sm color_dark_gray text_500">{item}</h4>
												</div>
											))}
										</div>
									)}
								</div>
							</div>
						</div>

						<div {...dynamicInsightsBtnProps(dataForBtn, "topSectionButton")}>
							<Button color="primary" variant="filled" shape="rounded">
								{dynamicInsightsBtnProps(dataForBtn, "topSectionButton").btntext}
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
									<h2 className="text_xl">
										{dropdowns.offeringsType.selected.title}
										{selectedDepartment < 0 && "No Data"}
									</h2>
								</div>
								<div className={`${styles.teamDetailsItem} text_reg color_dark_gray`}>
									<ContentFromCms>
										{data?.categories?.[selectedDepartment]?.desc}
									</ContentFromCms>
								</div>
							</div>
						</div>
					</div>
					{data?.categories?.[selectedDepartment]?.leader?.node?.teams?.thumbnail
						?.image?.node?.mediaItemUrl && (
						<div className={`${styles.leadDetails} pb_50`}>
							<div className="containerLarge">
								<div
									className={`${styles.leadDetailsFlex} f_w_j ptb_50 dark_bg b_r_20`}
								>
									<div className={`${styles.leadDetailsItem} ${styles.thumFix}`}>
										<div className={`${styles.leadThumb}`}>
											<img
												src={
													data?.categories?.[selectedDepartment]?.leader?.node?.teams
														?.thumbnail?.image?.node?.mediaItemUrl
												}
												className="b_r_20"
												alt={data?.categories?.[selectedDepartment]?.leader?.node?.title}
											/>
											<div className={`${styles.popUp}`}>
												<img src={hoverEffect.src} className="b_r_20" alt=" img" />
											</div>
										</div>
									</div>
									<div className={`${styles.leadDetailsItem}`}>
										<div className={`${styles.leadDetailsContent}`}>
											<h3 className="text_lg color_white ">
												{data?.categories?.[selectedDepartment]?.leader?.node?.title}
											</h3>
											<p className="text_xs color_platinum_gray">
												{
													data?.categories?.[selectedDepartment]?.leader?.node?.teams
														?.thumbnail?.designation
												}
											</p>
										</div>
										{data?.categories?.[selectedDepartment]?.leader?.node?.teams
											?.thumbnail?.linkedinLink && (
											<div className={`${styles.leadDetailsContentSocial}`}>
												<a
													href={
														data?.categories?.[selectedDepartment]?.leader?.node?.teams
															?.thumbnail?.linkedinLink
													}
												>
													<img src={linKed.src} alt="linkedin" />
												</a>
											</div>
										)}
										<div className={`${styles.leadDetailsInfo} pt_20`}>
											{data?.categories?.[selectedDepartment]?.leaderDesc
												?.slice(0, showAll ? infoData.length : 2)
												?.map((item, idx) => (
													<div key={idx} className={`${styles.leadDetailsInfoInner} pb_40`}>
														<h5 className={`${styles.headTxt} text_reg color_white f_w_b`}>
															{item.title}
														</h5>
														<p className="text_xs color_platinum_gray">{item.desc}</p>
													</div>
												))}
										</div>
										{data?.categories?.[selectedDepartment]?.leaderDesc?.length > 2 && (
											<div onClick={() => setShowAll(!showAll)}>
												<Button color="secondary" variant="underline" mode="dark">
													{showAll ? "Read less" : "Read more"}
												</Button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}
					<div>
						<JobOpenings
							data={jobs}
							hideFilters={false}
							hideRedirect={true}
							defaultSelected={dropdowns?.offeringsType?.selected?.title}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
