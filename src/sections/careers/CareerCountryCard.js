// MODULES //
import { useRef, useEffect, useState } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// UTILS //

// STYLES //
import styles from "@/styles/sections/careers/CareerCountryCard.module.scss";

// IMAGES //
import country_img from "../../../public/img/careers/country_img.png";
import location from "../../../public/img/icons/location.svg";
import slider_arrow_black from "../../../public/img/icons/slider_arrow_black.svg";
import dropdown_arrow from "../../../public/img/icons/dropdown_arrow.svg";
import search from "../../../public/img/icons/search.svg";

// DATA //

/** CareerCountryCard Section */
export default function CareerCountryCard() {
	const [selected, setSelected] = useState({});
	const [isSearchVisible, setIsSearchVisible] = useState(false);

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

	const [dropdowns, setDropdowns] = useState({
		countryType: { isOpen: false, selected: { title: "India" } },
		programsType: { isOpen: false, selected: { title: "Program" } },
	});

	const dropdownRefs = {
		countryType: useRef(null),
		programsType: useRef(null),
	};

	const optionsData = {
		countryType: [
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
			{ title: "India" },
		],
		programsType: [
			{ title: "Graduate Analyst" },
			{ title: "Graduate Modelling" },
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
		<section className={`${styles.CareerCountryCard} CareerCountryCard ptb_100`}>
			<div className="container">
				<div className={`${styles.title_wrap} f_r_aj_between`}>
					<h2 className="text_xl font_primary f_w_s_b color_white pb_20">
						Lorem ipsum dolor sit amet
					</h2>
				</div>
				<div className={styles.filterMain}>
					<div className={styles.filterflex}>
						{/* years Type Dropdown */}
						<div className={`${styles.selectBox}`} ref={dropdownRefs.programsType}>
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
						</div>

						{/* Language Dropdown */}
						<div className={styles.selectBox} ref={dropdownRefs.countryType}>
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

						{/* search box */}
						<div className={`${styles.selectBox} ${styles.widthCustomSearch} `}>
							<div className={`${styles.searchBox}`} onClick={toggleSearchInput}>
								<p className="text_sm color_silver_gray text_500">Search</p>
								<span>
									<img src={search.src} alt="icon" />
								</span>
							</div>
						</div>
						{/* Search Input - Show/Hide on Click */}
						{isSearchVisible && (
							<div className={`${styles.searchInput} f_r_aj_between`}>
								<input type="text" placeholder="Search Events" />
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

				<div className={`${styles.SliderMain} pt_20`}>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
					<div className={`${styles.cardItem}`}>
						<div className={`${styles.cardImg}`}>
							<img src={country_img.src} className={`${styles.countryImg} b_r_10`} />
							<p
								className={`${styles.categoryTxt} text_xxs color_secondary text_uppercase`}
							>
								Live
							</p>
						</div>
						<div className={`${styles.cardDesc} pt_20`}>
							<p className="text_sm color_white color_platinum_gray f_r_a_center text_uppercase">
								<img
									src={location.src}
									className={`${styles.location}`}
									alt="location"
								/>
								<span>Austin</span>
							</p>
							<h4 className="text_md color_white f_w_m font_primary pt_10">
								Graduate Analyst
							</h4>
							<div className={`${styles.btn_box} pt_20`}>
								<Button color="secondary" variant="underline" mode="dark">
									Read More
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
