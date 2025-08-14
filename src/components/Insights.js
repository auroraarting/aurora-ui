"use client";
/* eslint-disable @next/next/no-html-link-for-pages */
// MODULES //
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

// COMPONENTS //
import Button from "@/components/Buttons/Button";
import ContentFromCms from "./ContentFromCms";
import { useForm } from "react-hook-form";

// SECTIONS //

// PLUGINS //

// UTILS //
import EqualHeight from "../utils/EqualHeight";
import formatDate, {
	allCategories,
	dynamicInsightsBtnProps,
	isCategory,
	OpenIframePopup,
	slugify,
} from "@/utils";

// STYLES //
import styles from "@/styles/components/Insights.module.scss";

// IMAGES //
import clock from "../../public/img/icons/clock.svg";
import white_calendar from "../../public/img/icons/white_calendar.svg";
import white_location from "../../public/img/icons/white_location.svg";
import close from "../../public/img/icons/close.png";
import form_img from "../../public/img/softwares/form_img.png";
import hoverBg from "../../public/img/home/hoverBg.png";
import Link from "next/link";

// DATA //
const tempdata = {
	data: [
		{
			title:
				"Upside forecast from participating in ancillary services in Iberia for a range of renewable-generation technologies",
			slug:
				"upside-forecast-from-participating-in-ancillary-services-in-iberia-for-a-range-of-renewable-generation-technologies",
			date: "2025-05-14T14:56:52",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Frame-8.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
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
				time: "5 MIN READ",
				speakers: null,
			},
		},
		{
			title:
				"Grid curtailment estimation at a specific node in the context of a solar PV financing in Spain",
			slug:
				"grid-curtailment-estimation-at-a-specific-node-in-the-context-of-a-solar-pv-financing-in-spain",
			date: "2025-05-14T14:53:11",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Grid-curtailment-estimation-Image.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
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
				time: "5 MIN READ",
				speakers: null,
			},
		},
		{
			title:
				"Optimal size determination of an electrolyser project co-located with solar PV and BESS for a developer in Spain",
			slug:
				"optimal-size-determination-of-an-electrolyser-project-co-located-with-solar-pv-and-bess-for-a-developer-in-spain",
			date: "2025-05-14T14:48:43",
			featuredImage: {
				node: {
					altText: "",
					mediaItemUrl:
						"https://cms-production.auroraer.com/wp-content/uploads/2025/05/Frame-3-1.jpg",
				},
			},
			categories: {
				nodes: [
					{
						slug: "case-studies",
						name: "Case Studies",
					},
					{
						slug: "uncategorized",
						name: "Uncategorized",
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
				time: "5 MIN READ",
				speakers: null,
			},
		},
	],
	countries: [
		{
			title: "Australia",
			slug: "australia",
		},
		{
			title: "Austria",
			slug: "austria",
		},
		{
			title: "Baltics",
			slug: "baltics",
		},
		{
			title: "Belgium",
			slug: "belgium",
		},
		{
			title: "Brazil",
			slug: "brazil",
		},
		{
			title: "Bulgaria",
			slug: "bulgaria",
		},
		{
			title: "Chile",
			slug: "chile",
		},
		{
			title: "Croatia",
			slug: "croatia",
		},
		{
			title: "Czechia",
			slug: "czechia",
		},
		{
			title: "Europe",
			slug: "europe",
		},
		{
			title: "France",
			slug: "france",
		},
		{
			title: "Germany",
			slug: "germany",
		},
		{
			title: "Great Britain",
			slug: "great-britain",
		},
		{
			title: "Greece",
			slug: "greece",
		},
		{
			title: "Hungary",
			slug: "hungary",
		},
		{
			title: "Iberia",
			slug: "iberia",
		},
		{
			title: "India",
			slug: "india",
		},
		{
			title: "Ireland",
			slug: "ireland",
		},
		{
			title: "Italy",
			slug: "italy",
		},
		{
			title: "Japan",
			slug: "japan",
		},
		{
			title: "Korea",
			slug: "korea",
		},
		{
			title: "London",
			slug: "london",
		},
		{
			title: "Malaysia",
			slug: "malaysia",
		},
		{
			title: "Netherlands",
			slug: "netherlands",
		},
		{
			title: "New Zealand",
			slug: "new-zealand",
		},
		{
			title: "Noram",
			slug: "noram",
		},
		{
			title: "Nordics",
			slug: "nordics",
		},
		{
			title: "Philippines",
			slug: "philippines",
		},
		{
			title: "Poland",
			slug: "poland",
		},
		{
			title: "Romania",
			slug: "romania",
		},
		{
			title: "Serbia",
			slug: "serbia",
		},
		{
			title: "Singapore",
			slug: "singapore",
		},
		{
			title: "Slovakia",
			slug: "slovakia",
		},
		{
			title: "Slovenia",
			slug: "slovenia",
		},
		{
			title: "Spain",
			slug: "spain",
		},
		{
			title: "Sweden",
			slug: "sweden",
		},
		{
			title: "Switzerland",
			slug: "switzerland",
		},
		{
			title: "UK",
			slug: "uk",
		},
	],
};

// SERVICES //

/** Insights Section */
export default function Insights({
	language,
	isFormVisible,
	setIsFormVisible,
	isPowerBgVisible,
	isInsightsBlogsVisible,
	defaultList,
	countries,
	insightsTitle = "Insights",
	formSectionTitle = "Let’s power the future, together",
	formSectionDesc = "",
	formSectionBtnText = "Sign up",
	formdata,
	insightsLink = "/resources/aurora-insights/",
	customHtml,
	hideall,
	allTag,
	insightsListButtonText = "View all",
}) {
	const pathname = usePathname();
	const [data, setData] = useState({ data: defaultList, countries });
	const formRef = useRef();
	const [thankYouMessage, setthankYouMessage] = useState(false);
	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		trigger,
		formState: { errors },
	} = useForm({ mode: "onChange" });

	/** handleOpenForm Section */
	const handleOpenForm = () => {
		setIsFormVisible(true);
		// setIsTitleVisible(false); // Hide title when opening form
	};

	/** handleCloseForm Section */
	const handleCloseForm = () => {
		setIsFormVisible(false);
		// setIsTitleVisible(true); // Show title when closing form
	};

	/** defaultPathname  */
	const defaultPathname = (categories) => {
		if (categories && insightsLink.includes("/resources/aurora-insights/")) {
			return `${insightsLink}${slugify(
				isCategory(allCategories, categories, true)
			)}/`;
		}
		if (insightsLink) {
			return insightsLink;
		}
		if (pathname?.split("[slug]")?.length > 1) {
			return pathname?.split("[slug]")[0];
		}
		return pathname;
	};

	/** fetchdata  */
	const fetchdata = async () => {
		const resdata = await fetch("/api/shortInsights");
		let resjson = await resdata.json();
		if (language) {
			resjson.data = resjson.data?.map((item) => ({
				...item,
				...item?.translations?.[0],
				categories: {
					nodes: item?.categories?.nodes?.map((item2) => ({
						...item2,
						// ...item2?.translations?.[0],
						alternateName: item2?.translations?.[0]?.name,
					})),
				},
			}));
		}
		setData(resjson);
	};

	/** BtnProps  */
	function BtnProps() {
		if (formdata) {
			return {
				...formdata,
				// href: defaultPathname(),
			};
		} else {
			return dynamicInsightsBtnProps();
		}
	}

	useEffect(() => {
		if (!defaultList || defaultList.length === 0) {
			setData(tempdata);
			fetchdata();
		}

		trigger("privacy"); // Trigger validation for privacy checkbox
	}, []);

	let sectionId = {};
	// if (!hideall) {
	// 	sectionId.id = "insights";
	// 	sectionId["data-name"] = "Insights";
	// }

	/** Function to handle submit */
	const onSubmit = async (data, e) => {
		// Write form submission codes here
		setLoading(true);
		try {
			await fetch("/api/press-room-subscribe-leads", {
				method: "POST",
				body: JSON.stringify({
					data: data,
				}),
			});
			reset();
			setthankYouMessage(true);
			setLoading(false);

			await Promise.all([
				fetch("/api/sendEmail", {
					method: "POST",
					body: JSON.stringify({
						...data,
						name: data?.name,
						email: data?.email,
						subject: "Aurora Energy Research - Press Room Subscription Query",
						customHTML: `
			<div>
				<p>Hi ${data?.name},</p>
				</br>
				<p>Thank you for subscribing to our press releases!</p>
				<p>For media-related questions, please contact our <a href="mailto:aurora-press@auroraer.com">Media Relations Team</a></p>
				<p>For more information on our products and services, please browse our website <a href="www.auroraer.com" target="_blank" rel="noreferrer">www.auroraer.com</a></p>
				</br>
				<p>Thank You,</p>
				<p>Team Aurora Energy Research</p>
			</div>`,
					}),
				}),
			]);

			setTimeout(() => {
				setthankYouMessage(false);
			}, 5000);
			// const result = await res.json();
		} catch (error) {
			setLoading(false);
		}
	};

	useEffect(() => {
		EqualHeight(`${styles.ItemBox}`);
	}, [data]);

	return (
		<section className={`${styles.Insights} Insights`} {...sectionId}>
			<div className="containerLarge">
				<div className={`${styles.insightsBg} insightsBg dark_bg`}>
					{isPowerBgVisible && (
						<div className={`${styles.powerBg} powerBg`}>
							<div
								className={`${styles.contentFlex} contentFlex f_j ${
									isFormVisible ? styles.isFormVisible : ""
								}`}
							>
								<div className={`${styles.title_wrap}`}>
									{/* <h2 className="text_lg font_primary f_w_s_b color_white m_b_15">
											{insightsTitle}
										</h2> */}
									<p className="text_lg font_primary f_w_s_b color_white pb_10">
										{formSectionTitle}
									</p>
									<div className={`${styles.desc} text_reg color_silver_gray`}>
										<ContentFromCms>{formSectionDesc}</ContentFromCms>
									</div>
								</div>
								{customHtml && customHtml}
								{!customHtml && !isFormVisible && (
									<a
										className={`${styles.bookBtn}`}
										onClick={() => handleOpenForm()}
										// {...formdata}
										// href={defaultPathname()}
										{...BtnProps()}
									>
										<Button
											color="primary"
											variant="filled"
											shape="rounded"
											mode="dark"
											textlowercase
										>
											{formSectionBtnText}
										</Button>
									</a>
								)}
							</div>

							{isFormVisible && (
								<form
									className={`${styles.form}`}
									onSubmit={handleSubmit(onSubmit)}
									ref={formRef}
								>
									<div className={`${styles.ContactMain}`}>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="name">
												First Name*
											</label>
											<input
												className={styles.input}
												type="text"
												id="name"
												name="name"
												{...register("name", {
													required: true,
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.name && errors.name.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.name && errors.name.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.name && errors.name.type == "validate" && (
												<label className="error">Invalid characters detected!</label>
											)}
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="last">
												Last Name*
											</label>
											<input
												className={styles.input}
												type="text"
												id="last"
												name="last"
												{...register("last", {
													required: true,
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.last && errors.last.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.last && errors.last.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.last && errors.last.type == "validate" && (
												<label className="error">Invalid characters detected!</label>
											)}
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="email">
												Email*
											</label>
											<input
												className={styles.input}
												type="email"
												id="email"
												name="email"
												{...register("email", {
													required: true,
													pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.email && errors.email.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.email && errors.email.type == "pattern" && (
												<label className="error">Enter valid email</label>
											)}
											{errors.email && errors.email.type == "validate" && (
												<label className="error">Invalid characters detected!</label>
											)}
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="outlet">
												Media Outlet
											</label>
											<input
												className={styles.input}
												type="text"
												id="outlet"
												name="outlet"
												{...register("outlet", {
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.outlet && errors.outlet.type == "required" && (
												<label className="error">This field is required</label>
											)}
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="role">
												Role/Title
											</label>
											<input
												className={styles.input}
												type="text"
												id="role"
												name="role"
												{...register("role", {
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.role && errors.role.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.role && errors.role.type == "validate" && (
												<label className="error">Invalid characters detected!</label>
											)}
										</div>
										<div className={styles.formGroup}>
											<label className={styles.label} htmlFor="interest">
												Region of Interest*
											</label>
											<input
												className={styles.input}
												type="text"
												id="interest"
												name="interest"
												{...register("interest", {
													required: true,
													validate: (value) =>
														!/<[^>]*script|<[^>]+>/gi.test(value) ||
														"Invalid characters detected",
												})}
											/>
											{errors.interest && errors.interest.type == "required" && (
												<label className="error">This field is required</label>
											)}
											{errors.interest && errors.interest.type == "validate" && (
												<label className="error">Invalid characters detected!</label>
											)}
										</div>
										<div className={`${styles.formGroup} ${styles.fullWidthBox} m_t_20`}>
											<div className={`${styles.formRow}`}>
												<input
													className={styles.input}
													type="checkbox"
													id="privacy"
													name="privacy"
													{...register("privacy", {
														required: true,
													})}
												/>
												<label className={styles.label} htmlFor="privacy">
													I understand that Aurora Energy Research uses and protects any
													personal data that I provide in line with its Privacy Policy and
													Privacy Notice.
												</label>
											</div>
										</div>
									</div>
									<div
										className={`${styles.submit} ${
											(errors.privacy || loading) && "disabled"
										} m_t_20`}
									>
										<Button color="primary" variant="filled" shape="rounded" mode="dark">
											{loading ? "Subscribing..." : "Subscribe"}
										</Button>
									</div>
									{thankYouMessage && (
										// <h2 >
										// 	Thank you for your details, we will get back to you soon.
										// </h2>
										<div className="text_sm font_primary color_primary pt_20">
											<p>Thank you for subscribing to our press releases!</p>
											<p>
												For media-related questions, please contact our{" "}
												<a
													className="text_underline"
													href="mailto:aurora-press@auroraer.com"
												>
													Media Relations Team
												</a>
											</p>
											<p>
												For more information on our products and services, please browse our
												website{" "}
												<a
													className="text_underline"
													href="www.auroraer.com"
													target="_blank"
													rel="noreferrer"
												>
													www.auroraer.com
												</a>
											</p>
										</div>
									)}
								</form>
							)}
						</div>
					)}
					{isInsightsBlogsVisible && (
						<div className={`${styles.insightsItemBox} insightsItemBox`}>
							<div className={`${styles.titleFlex} pb_20 f_j`}>
								<div className={`${styles.title} `}>
									<h2 className="text_xl font_primary f_w_s_b color_white ">
										{insightsTitle}
									</h2>
								</div>
								<a
									// onClick={() => handleOpenForm()}
									// {...formdata}
									href={defaultPathname()}
									// {...BtnProps()}
									className={`${styles.bookBtn}`}
								>
									<Button
										color="primary"
										variant="filled"
										shape="rounded"
										mode="dark"
										textlowercase
									>
										{insightsListButtonText || "View all"}
									</Button>
								</a>
							</div>
							<div className={`${styles.insightsItemFlex} d_f m_t_30`}>
								{data?.data?.slice(0, 3)?.map((item, ind) => {
									let hrefObj = {};
									if (item?.externalUrl) {
										hrefObj.href = item?.externalUrl;
										hrefObj.onClick = (e) => {
											e?.preventDefault(); // Prevent navigation
											OpenIframePopup(
												"iframePopup",
												item?.externalUrl ||
													"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
											);
										};
										if (item.openExternalInNewTab) {
											delete hrefObj.onClick;
											hrefObj.target = "_blank"; // Open in new tab
											hrefObj.rel = "noopener noreferrer"; // Security best practice
										}
									} else {
										hrefObj.href = `${defaultPathname(item?.categories?.nodes)}${
											item?.slug
										}`;
									}
									return (
										<Link
											{...hrefObj}
											// href={`${defaultPathname(item?.categories?.nodes)}${item?.slug}`}
											className={`${styles.ItemBox} boxH`}
											key={item?.title}
										>
											<div className={`${styles.hoverBox}`}>
												<img
													height={179}
													width={446}
													src={hoverBg.src}
													className={`${styles.hoverBg} width_100 b_r_10`}
													alt="img"
												/>
												{(isCategory(allCategories, item?.categories?.nodes) || allTag) && (
													<p
														className={`${styles.categoryTxt} text_xs color_medium_gray text_uppercase`}
													>
														{allTag || isCategory(allCategories, item?.categories?.nodes)}
													</p>
												)}

												<p
													className={`${styles.descTxt} text_reg color_platinum_gray pt_10`}
												>
													{item?.customHtmlForTitle ? (
														<ContentFromCms>{item?.title}</ContentFromCms>
													) : (
														item?.title
													)}
												</p>
												<div className={`${styles.dateFlex} f_j pt_30`}>
													<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
														<img src={white_calendar.src} alt="calendar" />
														<span>
															{formatDate(item?.date || item?.presses?.banner?.date, language)}
														</span>
													</p>
													{isCategory(data?.countries, item?.categories?.nodes) && (
														<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
															<img src={white_location.src} alt="location" />
															<span>
																{isCategory(data?.countries, item?.categories?.nodes)}
															</span>
														</p>
													)}
													{item.podcastFields?.country?.nodes && (
														<p className="text_xs f_w_m color_medium_gray d_f text_uppercase">
															<img src={white_location.src} alt="location" />
															<span>
																{item.podcastFields?.country?.nodes?.map(
																	(item2) => item2.title
																)}
															</span>
														</p>
													)}
												</div>
											</div>
										</Link>
									);
								})}
							</div>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
