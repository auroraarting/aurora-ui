/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/** GlobalSearch Component */

// MODULES //
import { useState, useEffect, useRef } from "react";

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// SECTIONS //

// PLUGINS //

// UTILS //
import { ServerHeaders } from "@/utils/RequestHeaders";

// STYLES //
import styles from "@/styles/components/GlobalSearch.module.scss";

// IMAGES //
import searchIcon from "../../public/img/icons/searchIcon.svg";
import search_hover from "@/../public/img/icons/search_hover.svg";
import { OpenIframePopup } from "@/utils";

// SERVICES //

// DATA //

/** GlobalSearch Component */
export default function GlobalSearch({ data, setShowSearch }) {
	// STATE //
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState(null);
	const [isTyping, setIsTyping] = useState(false);
	const [noResults, setNoResults] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const abortControllerRef = useRef(null);

	/** Fetch search results */
	const fetchSearchResults = async () => {
		if (!searchTerm.trim()) {
			setResults(null);
			setIsLoading(false);
			return;
		}

		// Cancel the previous request if it exists
		if (abortControllerRef.current) {
			abortControllerRef.current.abort("New search started");
		}
		setIsLoading(true);
		// Create a new AbortController for the current request
		const controller = new AbortController();
		abortControllerRef.current = controller;

		try {
			const data = await fetch("/api/search", {
				method: "POST",
				body: JSON.stringify({ searchTerm }),
				signal: controller.signal, // Attach the abort signal
			});
			const json = await data.json();
			setResults(json);
		} catch (error) {
			console.error("Error during search:", error);
		} finally {
			setIsLoading(false);
		}
	};

	/** Debounced search when typing */
	useEffect(() => {
		const delay = setTimeout(() => {
			if (isTyping) {
				fetchSearchResults();
				setIsTyping(false);
			}
		}, 500);

		return () => clearTimeout(delay);
	}, [searchTerm, isTyping]);

	/** Check for any valid result */
	useEffect(() => {
		const hasResults = results
			? Object.values(results).some((items) =>
					Array.isArray(items) ? items.length > 0 : !!items
			  )
			: false;
		setNoResults(!hasResults);
	}, [results]);

	/** Handle keyboard input */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			fetchSearchResults();
		} else {
			setIsTyping(true);
			setResults(null);
		}
	};

	/** Generate link and title based on content key */
	const getLinkAndTitle = (key, item = {}) => {
		/** slug  */
		function Slug(pageSlug) {
			switch (pageSlug) {
				case "early-careers-landing":
					return "/careers/early-careers";
				case "faq":
					return "/careers/faq";
				case "join-us":
					return "/careers/join-us";
				case "our-team":
					return "/careers/our-team";
				case "life-at-aurora":
					return "/careers/life-at-aurora";
				case "press-landing":
					return "/company/press-landing";
				case "about":
					return "/company/about";
				case "global-presence":
					return "/company/global-presence";
				case "contact":
					return "/company/contact";
				case "event-landing":
					return "/events";
				case "energy-talks-listing":
					return "/resources/energy-unplugged";
				case "insight-listing":
					return "/resources/aurora-insights";
				case "webinar-listing":
					return "/resources/webinar";
				case "eos":
					return "/eos";
				case "product":
					return "/products";
				case "software":
					return "/software";
				case "homepage":
					return "/";
				case "bundles":
					return "/careers/life-at-aurora";
				default:
					return "/";
			}
		}

		switch (key) {
			case "about":
				return {
					link: `/company/about?search=${encodeURIComponent(searchTerm)}`,
					title: "About",
				};
			case "eos":
				return {
					link: `/eos?search=${encodeURIComponent(searchTerm)}`,
					title: "Eos",
				};
			case "globalPresence":
				return {
					link: `/global-presence?search=${encodeURIComponent(searchTerm)}`,
					title: "Global Presence",
				};
			case "homepage":
				return {
					link: `/?search=${encodeURIComponent(searchTerm)}`,
					title: "Home",
				};
			case "lifeAtAurora":
			case "offices":
				return {
					link: `/careers/life-at-aurora?search=${encodeURIComponent(searchTerm)}`,
					title: "Life At Aurora",
				};
			case "softwares":
				return {
					link: `/software/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "products":
				return {
					link: `/products/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "services":
				return {
					link: `/service/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "teams":
			case "teamsectors":
				return {
					link: `/company/team?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "whoareyous":
				return {
					link: `/who-are-you/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "howWeHelps":
				return {
					link: `/how-we-help/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "posts":
				return {
					link: `${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "events":
				return {
					...item,
					link: `/events/${item.slug}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "pages":
				return {
					link: `${Slug(item?.slug)}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "podcasts":
				return {
					link: `/resources/energy-unplugged/${
						item?.slug
					}?search=${encodeURIComponent(searchTerm)}`,
					title: item.title,
				};
			case "webinars":
				return {
					link: `/resources/webinar/${item?.slug}?search=${encodeURIComponent(
						searchTerm
					)}`,
					title: item.title,
				};
			case "earlyCareers":
				return {
					link: `/careers/early-careers/${item?.slug}?search=${encodeURIComponent(
						searchTerm
					)}`,
					title: item.title,
				};
			case "countries":
				return {
					link: `/global-presence//${item?.slug}?search=${encodeURIComponent(
						searchTerm
					)}`,
					title: item.title,
				};

			default:
				return {
					link: `/?search=${encodeURIComponent(searchTerm)}`,
					title: "Home",
				};
		}
	};

	return (
		<div className={styles.GlobalSearch}>
			{/* Search Bar */}
			<div className={`${styles.megaMenuBox} f_w_j`} data-lenis-prevent>
				<div className={`${styles.menuBoxRight}`}>
					{/* <div className={`${styles.pageName}`}>
						<h4 className="text_xxs font_primary color_medium_gray">
							What are you looking for?
						</h4>
					</div> */}
					<div className={`${styles.SearchResultsBox}`}>
						<div className={`${styles.slobal_search_section} f_j`}>
							<div className={styles.input_section}>
								<input
									autoFocus
									className="search_input"
									type="text"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={handleKeyDown}
									placeholder="What are you looking for?"
								/>
							</div>
							<div className={styles.search_section}>
								<button onClick={fetchSearchResults}>
									<img src={searchIcon.src} alt="search" />
								</button>
							</div>
						</div>
						{/* Search Results */}
						{results && !noResults && (
							<div className={styles.results} data-lenis-prevent>
								{Object.entries(results).map(([key, value]) => {
									if (!value || (Array.isArray(value) && value.length === 0))
										return null;

									const items = Array.isArray(value) ? value : [value];
									return items.map((item, idx) => {
										const { link, title } = getLinkAndTitle(key, item);
										let hrefObj = {};

										if (item?.events) {
											if (item?.events?.thumbnail?.externalUrl) {
												// hrefObj.href = item?.events?.thumbnail?.externalUrl;
												// hrefObj.target = "_blank";
												// hrefObj.rel = "noreferrer";
												hrefObj.onClick = () => {
													setShowSearch(false);
													OpenIframePopup(
														"iframePopup",
														item?.events?.thumbnail?.externalUrl ||
															"https://go.auroraer.com/l/885013/2025-04-22/pbkzc"
													);
												};
												if (item?.events?.thumbnail?.openExternalInNewTab) {
													delete hrefObj.onClick;
													hrefObj.target = "_blank"; // Open in new tab
													hrefObj.rel = "noopener noreferrer"; // Security best practice
												}
											} else {
												hrefObj.href = `/events/${item?.slug}`;
											}
										} else {
											hrefObj.href = link;
											hrefObj.target = "_blank"; // Open in new tab
											hrefObj.rel = "noopener noreferrer"; // Security best practice
										}

										return (
											<div className={styles.title_link} key={`${key}-${idx}`}>
												<a
													// href={/projects/${contentObj?.slug}?search=${encodeURIComponent(searchTerm)}}
													className="text_xs d_f"
													// href={link}
													target="_blank"
													rel="noreferrer"
													{...hrefObj}
												>
													<h3 className="text_sm">{title}</h3>
												</a>
											</div>
										);
									});
								})}
							</div>
						)}
						{/* No Results */}
						{searchTerm.trim() && !isLoading && results && noResults && (
							<div className={styles.results} data-lenis-prevent>
								<div className={styles.title_link}>
									<p className="no-data-text">No data found</p>
								</div>
							</div>
						)}
						{isLoading && (
							<div className={styles.results} data-lenis-prevent>
								<div className={styles.title_link}>
									<p className="no-data-text">{"Loading..."}</p>
								</div>
							</div>
						)}
					</div>
					<div className={`${styles.topSearchList}`}>
						<div
							className={`${styles.pageLinks} f_r_a_center text_reg f_w_m font_primary color_dark_gray pt_20`}
						>
							Top Searches
						</div>
						<div className={`${styles.eosItem}`}>
							{data?.topSearches?.map((item) => {
								return (
									<a
										key={item?.title}
										href={item?.url}
										className={`${styles.eosLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
									>
										<span>{item?.title}</span> <img src={search_hover.src} alt="arrow" />
									</a>
								);
							})}
						</div>
					</div>
				</div>
				<div className={`${styles.menuBoxleft}`}>
					<div
						className={`${styles.pageLinks} f_r_a_center text_reg f_w_m font_primary color_dark_gray pt_20`}
					>
						Top Pages
					</div>
					<div className={`${styles.eosItem}`}>
						{data?.topPages?.map((item) => {
							return (
								<a
									key={item?.title}
									href={item?.url}
									className={`${styles.eosLinksTxt} f_r_a_center text_xs font_primary color_dark_gray`}
								>
									<span>{item?.title}</span> <img src={search_hover.src} alt="arrow" />
								</a>
							);
						})}
					</div>
				</div>
			</div>
			{/* <div className={`${styles.slobal_search_section} f_j`}>
				<div className={styles.input_section}>
					<input
						className="search_input"
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search..."
					/>
				</div>
				<div className={styles.search_section}>
					<button onClick={fetchSearchResults}>
						<img src={SearchIcon.src} alt="search" />
					</button>
				</div>
			</div> */}
			{/* Typing feedback */}
			{/* {isTyping && (
				<p className={`${styles.title_link} text_md f_w_m`}>Searching...</p>
			)} */}
		</div>
	);
}
