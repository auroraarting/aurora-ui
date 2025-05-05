/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/** GlobalSearch Component */

// MODULES //
import { useState, useEffect } from "react";

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

	/** Fetch search results */
	const fetchSearchResults = async () => {
		if (!searchTerm.trim()) {
			setResults(null);
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		try {
			const data = await fetch("/api/search", {
				method: "POST",
				body: JSON.stringify({ searchTerm }),
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
			default:
				return { link: "#", title: item.title || "PPAs" };
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
			{noResults && !isTyping && (
				<div className={styles.results} data-lenis-prevent>
					<div className={styles.title_link}>
						<p className="no-data-text">
							{!isLoading ? "No data found" : "Loading..."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
