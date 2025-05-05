/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/Footer.module.scss";

// IMAGES //
import footer_logo from "../../public/img/footer_logo.svg";
import ting_logo from "../../public/img/ting_logo.svg";
import white_plus_arrow from "../../public/img/icons/white_plus_arrow.png";
import white_minus_arrow from "../../public/img/icons/white_minus_arrow.svg";
import black_right from "../../public/img/icons/black_right.svg";
import x from "../../public/img/icons/social/x.svg";
import footer_linkedin from "../../public/img/icons/social/footer_linkedin.svg";
import footer_youtube from "../../public/img/icons/social/footer_youtube.svg";
import soundcloud from "../../public/img/icons/social/soundcloud.svg";
import popup_close from "/public/img/icons/popup_close.svg";
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //
const defaultNavigation = {
	products: [
		{
			title: "Grid Add-On",
			slug: "grid-add-on",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Grid-Add-On.svg",
				altText: "",
			},
		},
		{
			title: "Hydrogen Service",
			slug: "hydrogen-service",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Hydrogen-Service.svg",
				altText: "",
			},
		},
		{
			title: "Flexible Energy Service",
			slug: "flexible-energy-service",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Flexible-Energy-Service.svg",
				altText: "",
			},
		},
		{
			title: "Power & Renewables Service",
			slug: "power-renewables-service",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Power-Renewables-Service-1.svg",
				altText: "",
			},
		},
	],
	softwares: [
		{
			title: "Lumus",
			slug: "lumus",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Lumus.svg",
				altText: "",
			},
		},
		{
			title: "Origin",
			slug: "origin",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Origin-1.svg",
				altText: "",
			},
		},
		{
			title: "Amun",
			slug: "amun",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Amun-1.svg",
				altText: "",
			},
		},
		{
			title: "Chronos",
			slug: "chronos",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/04/Chronos.svg",
				altText: "",
			},
		},
	],
	services: [
		{
			title: "Advisory",
			slug: "advisory",
			content: "<p>Aurora empowers smarter energy decisions.</p>\n",
			logo: {
				logo:
					"https://cms-production.auroraer.com/wp-content/uploads/2025/03/Advisory.svg",
				altText: "",
			},
		},
	],
	regions: [
		{
			name: "Europe",
			slug: "europe",
			regionsFields: {
				sequence: 1,
			},
			countries: {
				nodes: [
					{
						slug: "netherlands",
						title: "Netherland",
					},
					{
						slug: "switzerland",
						title: "Switzerland",
					},
					{
						slug: "slovakia",
						title: "Slovakia",
					},
					{
						slug: "serbia",
						title: "Serbia",
					},
					{
						slug: "romania",
						title: "Romania",
					},
					{
						slug: "nordics",
						title: "Nordics",
					},
					{
						slug: "poland",
						title: "Poland",
					},
					{
						slug: "italy",
						title: "Italy",
					},
					{
						slug: "iberia",
						title: "Iberia",
					},
					{
						slug: "slovenia",
						title: "Slovenia",
					},
					{
						slug: "hungary",
						title: "Hungary",
					},
					{
						slug: "greece",
						title: "Greece",
					},
					{
						slug: "germany",
						title: "Germany",
					},
					{
						slug: "france",
						title: "France",
					},
					{
						slug: "czechia",
						title: "Czechia",
					},
					{
						slug: "croatia",
						title: "Croatia",
					},
					{
						slug: "bulgaria",
						title: "Bulgaria",
					},
					{
						slug: "ireland",
						title: "Ireland",
					},
					{
						slug: "great-britain",
						title: "Great Britain",
					},
					{
						slug: "baltics",
						title: "Baltics",
					},
					{
						slug: "austria",
						title: "Austria",
					},
					{
						slug: "belgium",
						title: "Belgium",
					},
				],
			},
		},
		{
			name: "Asia",
			slug: "asia",
			regionsFields: {
				sequence: 2,
			},
			countries: {
				nodes: [
					{
						slug: "singapore",
						title: "Singapore",
					},
					{
						slug: "philippines",
						title: "Philippines",
					},
					{
						slug: "malaysia",
						title: "Malaysia",
					},
					{
						slug: "korea",
						title: "Korea",
					},
					{
						slug: "india",
						title: "India",
					},
					{
						slug: "japan",
						title: "Japan",
					},
				],
			},
		},
		{
			name: "Australia",
			slug: "australia",
			regionsFields: {
				sequence: 3,
			},
			countries: {
				nodes: [
					{
						slug: "australia",
						title: "Australia",
					},
				],
			},
		},
		{
			name: "North America",
			slug: "north-america",
			regionsFields: {
				sequence: 4,
			},
			countries: {
				nodes: [
					{
						slug: "noram",
						title: "Noram",
					},
				],
			},
		},
		{
			name: "South America",
			slug: "south-america",
			regionsFields: {
				sequence: 5,
			},
			countries: {
				nodes: [
					{
						slug: "chile",
						title: "Chile",
					},
					{
						slug: "brazil",
						title: "Brazil",
					},
				],
			},
		},
	],
	whoareyous: [
		{
			title: "Developer",
			slug: "developer",
		},
		{
			title: "Utilities",
			slug: "utilities",
		},
		{
			title: "Energy Consumer",
			slug: "energy-consumer",
		},
		{
			title: "Financial Sector",
			slug: "financial-sector",
		},
	],
	howWeHelps: [
		{
			title: "PPAs",
			slug: "ppas",
		},
		{
			title: "Strategy Us",
			slug: "strategy-us",
		},
		{
			title: "Asset Citing & Optimisation",
			slug: "asset-citing-optimisation",
		},
		{
			title: "Portfolio Valuation",
			slug: "portfolio-valuation",
		},
		{
			title: "Transaction Support",
			slug: "transactions-support",
		},
	],
	events: [
		{
			title: "Aurora Energy Transition Summit Warsaw 2025-2",
			slug: "aurora-energy-transition-summit-warsaw-2025-2",
			featuredImage: {
				node: {
					altText: "",
					sourceUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/04/event_inside_banner.5c571806.jpg",
				},
			},
			events: {
				thumbnail: {
					date: "2025-04-30T00:00:00+00:00",
					status: "Upcoming",
					time: "Doors open at 12:30 CET",
					logo: {
						node: {
							altText: "",
							sourceUrl:
								"https://cms-production.auroraer.com/wp-content/uploads/2025/04/energy_transition.cbbdc6fc.png",
						},
					},
				},
				banner: {
					desktop: {
						node: {
							altText: "",
							sourceUrl:
								"https://cms-production.auroraer.com/wp-content/uploads/2023/07/Wind-original-1449359885-scaled-1-1024x689.jpg",
						},
					},
				},
			},
		},
	],
	webinar: [
		{
			title:
				"Powering Through Change: The Highs and Lows of ERCOT’s Battery Market",
			slug: "powering-through-change-the-highs-and-lows-of-ercots-battery-market",
			date: "2025-03-18T21:52:56",
			featuredImage: {
				node: {
					altText: "",
					sourceUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/03/Screenshot-2025-03-18-164856.png",
				},
			},
			categories: {
				nodes: [
					{
						slug: "ercot",
						name: "ERCOT",
					},
					{
						slug: "north-america",
						name: "North America",
					},
					{
						slug: "public-webinar",
						name: "Public",
					},
					{
						slug: "webinar",
						name: "Webinar",
					},
				],
			},
			language: {
				id: "1",
				code: "en",
				language_code: "en",
				native_name: "English",
			},
			tags: {
				nodes: [],
			},
			postFields: {
				speakers: {
					nodes: [
						{
							id: "cG9zdDozOTAwNw==",
							title: "John Feddersen",
							slug: "john-feddersen",
							postSpeakers: {
								sessions: [
									{
										address: "InterContinental Warsaw, Conference Room1",
										time: "1:30 PM1",
										timeSlot: "1:30 PM - 1:40 PM CET1",
										title: "Welcome and Opening Remarks1",
									},
								],
								thumbnail: {
									designation: "Founder and CEO",
									linkedinLink: "/",
									image: {
										node: {
											altText: "",
											sourceUrl:
												"https://cms-production.auroraer.com/wp-content/uploads/2025/04/profile.png",
										},
									},
								},
							},
							content: null,
						},
					],
				},
			},
		},
	],
	ok: true,
};

// SERVICES //
import { fetchNavigationData } from "@/services/Navigation.service";

/** Footer Component */
export default function Footer() {
	const currentYear = new Date().getFullYear();
	const [toggleState, settoggleState] = useState(0);
	const [data, setData] = useState(defaultNavigation);
	const [isPopupActive, setIsPopupActive] = useState(false);

	/** toggleTab */
	const toggleTab = (index) => {
		if (toggleState == index) {
			return settoggleState(null);
		}
		settoggleState(index);
	};

	/** fetchData  */
	async function fetchData() {
		const localData = window.localStorage.getItem("navigation");
		if (localData) {
			setData(JSON.parse(localData));
		}
		const obj = await fetch("/api/navigation");
		const json = await obj.json();
		window.localStorage.setItem("navigation", JSON.stringify(json));
		setData(json);
	}

	/** Open closePopup on click of hamburger */
	const closePopup = () => {
		setIsPopupActive(false);
	};

	/** Open togglePopup on click of hamburger */
	const togglePopup = () => {
		setIsPopupActive((prev) => !prev);
	};

	useEffect(() => {
		fetchData();
	}, []);

	// if (!data) return <div className="stalePage"></div>;

	return (
		<footer className={`${styles.main_footer}`}>
			<div className={`${styles.bg_footer}`}>
				<div className={`${styles.footerMenuMain}`}>
					<div className="container">
						<div className={`${styles.footerMenuFlex}`}>
							<div className={`${styles.footerMenuItem_left}`}>
								<div className={`${styles.footerLogo}`}>
									<Link href="/">
										<img src={footer_logo.src} alt="logo" />
									</Link>
								</div>
								<div className={`${styles.social_media} pt_40`}>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<Link
												href="https://x.com/i/flow/login?redirect_after_login=%2Fauroraer_oxford"
												target="_blank"
												rel="noreferrer"
											>
												<img src={x.src} alt="x" />
											</Link>
										</li>
										<li>
											<Link
												href="https://www.linkedin.com/company/aurora-energy-research-limited"
												target="_blank"
												rel="noreferrer"
											>
												<img src={footer_linkedin.src} alt="x" />
											</Link>
										</li>
										<li>
											<Link
												href="https://www.youtube.com/channel/UCp62kF6LHu7IycqpxQ7IqbQ"
												target="_blank"
												rel="noreferrer"
											>
												<img src={footer_youtube.src} alt="youtube" />
											</Link>
										</li>
										<li>
											<Link
												href="https://soundcloud.com/user-564729441"
												target="_blank"
												rel="noreferrer"
											>
												<img src={soundcloud.src} alt="soundcloud" />
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className={`${styles.footerMenuItem_center}`}>
								<div className={`${styles.footerMenuInnerFlex}`}>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<Link href="/company/about">About Us</Link>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 1 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(1)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a href="/who-are-you" className="">
													Who Are You
												</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.whoareyous?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/who-are-you/${item?.slug}`}>
																<span className="">{item?.title}</span>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 2 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(2)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a href="/how-we-help" className="">
													How We Help
												</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.howWeHelps?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/how-we-help/${item?.slug}`}>
																<span className="">{item?.title}</span>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 3 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(3)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a href="/careers">Careers</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												<p>
													<a href="/careers/early-careers">
														<span className="">Early Careers</span>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/faq">
														<span className="">Faq</span>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/join-us">
														<span className="">Join Us</span>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/life-at-aurora">
														<span className="">Life at Aurora</span>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<a href="/careers/our-team">
														<span className="">Our Team</span>
													</a>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
											</div>
										</li>
									</ul>
									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<a href="/eos">EOS Platform</a>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 4 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(4)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a href="/software">Software</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.softwares?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/software/${item?.slug}`}>
																<span className="">{item?.title}</span>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										<li
											className={`${styles.sub_menu_box} ${
												toggleState === 5 && styles.drop_down_active
											}`}
											onClick={() => toggleTab(5)}
										>
											<div className={`${styles.sub_menu_flex} d_f`}>
												<a href="/products">Subscription Analytics</a>
												<img
													src={white_plus_arrow.src}
													className={`${styles.white_plus_arrow}`}
													alt="down"
												/>
												<img
													src={white_minus_arrow.src}
													className={`${styles.white_minus_arrow}`}
													alt="down"
												/>
											</div>
											<div className={`${styles.sub_menu_list}`}>
												{data?.products?.map((item, ind) => {
													return (
														<p key={ind}>
															<a href={`/products/${item?.slug}`}>
																<span className="">{item?.title}</span>
															</a>
															<img
																src={black_right.src}
																className={`${styles.black_right}`}
																alt="down"
															/>
														</p>
													);
												})}
												{/* <p>
													<Link href="">
														<a className="">Flexible Energy</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Power & Renewable</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p>
												<p>
													<Link href="">
														<a className="">Hydrogen</a>
													</Link>
													<img
														src={black_right.src}
														className={`${styles.black_right}`}
														alt="down"
													/>
												</p> */}
											</div>
										</li>
										{data?.services?.map((item, ind) => {
											return (
												<li key={ind}>
													<a href={`/service/${item?.slug}`}>{item?.title}</a>
												</li>
											);
										})}
									</ul>

									<ul className={`${styles.footerMenuInnerItem}`}>
										<li>
											<a href="/company/press-releases">Press</a>
										</li>
										<li>
											<a href="/events">Events</a>
										</li>
										<li>
											<a href="/resources">Resources</a>
										</li>
										<li>
											<a href="/company/contact">Contact Us</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className={`${styles.footerGlobal} m_t_30`} onClick={togglePopup}>
							<p className="font_primary color_white f_r_aj_between">
								<span>Global Presence</span>
								<img
									src={white_plus_arrow.src}
									className={`${styles.white_plus_arrow}`}
									alt="down"
								/>
							</p>
						</div>
						<div className={`${styles.footerBtmFlex} f_w_j a_center`}>
							<div className={`${styles.footerBtmItem}`}>
								<p className="text_sm  color_silver_gray">
									© {currentYear} Aurora Energy Research
								</p>
							</div>
							<div className={`${styles.footerBtmItem}`}>
								<ul>
									<li className="color_silver_gray">
										<a href="/legal/terms">Terms</a>
									</li>
									<li className="color_silver_gray">
										<a href="/legal/cookies">Cookies</a>
									</li>
									<li className="color_silver_gray">
										<a href="/policies-and-compliance">Policies and Compliance</a>
									</li>
								</ul>
							</div>
							<div className={`${styles.footerBtmItem}`}>
								<a
									href="https://www.ting.in/"
									className="text_reg text_500"
									target="_blank"
									rel="noreferrer"
								>
									<img src={ting_logo.src} alt="ting logo" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`${styles.globalPopUp} ${isPopupActive ? styles.active : ""}`}
				data-lenis-prevent
			>
				<div className="container">
					<div className={`${styles.globalListMain}`}>
						<button className={styles.close_btn} onClick={closePopup}>
							<img src={popup_close.src} alt="" />
						</button>
						<div className={`${styles.listFlex} f_w`}>
							{data?.regions?.map((item, ind) => {
								return (
									<div className={`${styles.listItem}`} key={ind}>
										<div
											className={`${styles.CountryHeading}`}
											onClick={() => toggleTab(ind + 1)}
										>
											<h4 className="text_md f_w_m color_white font_primary">
												{item?.name}
											</h4>
											<img
												src={dropdown_arrow.src}
												className={`${
													toggleState === ind + 1 ? styles.arrow_rotate : ""
												} visible_xs`}
												alt=""
											/>
										</div>
										<div
											className={`${styles.CountryNameBox} ${
												toggleState === ind + 1 ? styles.ul_section_active : ""
											} `}
										>
											<ul>
												{item?.countries?.nodes?.map((country, index) => (
													<li key={index} className="text_xs color_platinum_gray">
														<a href={`/global-presence/${country.slug}`}>{country?.title}</a>
													</li>
												))}
												{/* <li className="text_xs color_platinum_gray">India</li>
													<li className="text_xs color_platinum_gray">Japan</li>
													<li className="text_xs color_platinum_gray">Korea</li>
													<li className="text_xs color_platinum_gray">Philippines</li> */}
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			{/* <p>© {new Date().getFullYear()} Copyright</p> */}
		</footer>
	);
}
