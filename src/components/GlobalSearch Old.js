/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/** GlobalSearch Component */

// MODULES //
import { useState, useEffect, useRef } from "react";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //
import { ServerHeaders } from "@/utils/RequestHeaders";

// STYLES //
import styles from "@/styles/components/GlobalSearch.module.scss";

// IMAGES //
import SearchIcon from "../../public/img/icons/search.svg";

// SERVICES //
import { searchData } from "@/services/Search.service";

// DATA //

/** GlobalSearch Component */
export default function GlobalSearch() {
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
					return "/resources/energy-talks";
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
					link: `/resources/energy-talks/${item?.slug}?search=${encodeURIComponent(
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
			<div className={`${styles.slobal_search_section} f_j`}>
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
			</div>

			{/* Typing feedback */}
			{/* {isTyping && (
				<p className={`${styles.title_link} text_md f_w_m`}>Searching...</p>
			)} */}

			{/* Search Results */}
			{results && !noResults && (
				<div className={styles.results} data-lenis-prevent>
					{Object.entries(results).map(([key, value]) => {
						if (!value || (Array.isArray(value) && value.length === 0)) return null;

						const items = Array.isArray(value) ? value : [value];
						return items.map((item, idx) => {
							const { link, title } = getLinkAndTitle(key, item);
							return (
								<div className={styles.title_link} key={`${key}-${idx}`}>
									<a
										// href={/projects/${contentObj?.slug}?search=${encodeURIComponent(searchTerm)}}
										className="text_xs d_f"
										href={link}
										target="_blank"
										rel="noreferrer"
									>
										<img src={SearchIcon.src} alt="search" />
										<h3 className="text_reg f_w_m">{title}</h3>
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
	);
}
