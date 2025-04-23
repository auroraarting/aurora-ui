/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
// MODULES //
import { useState, useEffect } from "react";
import { ServerHeaders } from "@/utils/RequestHeaders";

// COMPONENTS //

// SECTIONS //

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/components/GlobalSearch.module.scss";

// IMAGES //
import SearchIcon from "../../public/img/icons/search.svg";
import { searchData } from "@/services/Search.service";

// DATA //

/** GlobalSearch Component */
export default function GlobalSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState();
	const [isTyping, setIsTyping] = useState(false);
	const [noResults, setNoResults] = useState(true);

	/** handleSearch */
	/** Fetch search results */
	const fetchSearchResults = async () => {
		if (!searchTerm.trim()) {
			setResults(); // Clear results if input is empty
			return;
		}

		try {
			// const response = await fetch("/api/search", {
			// 	method: "POST",
			// 	headers: {
			// 		...ServerHeaders.headers,
			// 	},
			// 	body: JSON.stringify({ searchTerm }),
			// });

			// if (!response.ok) {
			// 	throw new Error(`HTTP error! Status: ${response.status}`);
			// }

			// const data = await response.json();
			const data = await searchData(searchTerm);
			console.log("data", data);
			setResults(data);
		} catch (error) {
			console.error("Error during search:", error);
		}
	};

	/** Handle key press */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			fetchSearchResults();
		} else {
			setIsTyping(true);
			setResults();
		}
	};

	/** checkLengthOfSearchedData  */
	const checkLengthOfSearchedData = () => {
		if (!results) return false;
		let length = Array(Object.keys(results)?.length).fill(false);

		Object.keys(results)?.forEach((key, ind) => {
			if (!results[key] || results[key].length === 0) {
				length[ind] = false;
			} else {
				length[ind] = true;
			}
		});

		return length.some((item) => item);
	};

	/** Handle typing & debounce search */
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchSearchResults();
			setIsTyping(false);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	useEffect(() => {
		setNoResults(!checkLengthOfSearchedData());
	}, [results]);

	return (
		<div className={`${styles.GlobalSearch}`}>
			<div className={`${styles.slobal_search_section} f_j`}>
				<div className={`${styles.input_section} `}>
					<input
						className="search_input"
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Search..."
					/>
				</div>
				<div className={`${styles.search_section} `}>
					<button onClick={fetchSearchResults}>
						<img src={SearchIcon.src} alt="search" />
					</button>
				</div>
			</div>

			{results && Object.keys(results)?.length > 0 && !noResults && (
				<div className={`${styles.results}`} data-lenis-prevent>
					{isTyping && (
						<p className={`${styles.title_link} text_md f_w_m`}>Searching...</p>
					)}
					{Object?.keys(results)?.map((key, index) => {
						let contentObj = results[key];
						if (!contentObj || contentObj?.length === 0) return <></>;

						// Static Pages
						let link;
						if (key === "about") {
							link = "/company/about";
							contentObj.title = "About";
						} else if (key === "eos") {
							link = "/eos";
							contentObj.title = "Eos";
						} else if (key === "globalPresence") {
							link = "/global-presence";
							contentObj.title = "Global Presence";
						} else if (key === "homepage") {
							link = "/";
							contentObj.title = "Home";
						} else if (key === "lifeAtAurora" || key === "offices") {
							link = "/careers/life-at-aurora";
							contentObj.title = "Life At Aurora";
						}

						if (contentObj?.title) {
							return (
								<div className={`${styles.title_link} ${contentObj?.title}`} key={key}>
									<a
										className="text_xs d_f"
										// href={`/projects/${contentObj?.slug}?search=${encodeURIComponent(
										// 	searchTerm
										// )}`}
										target="_blank"
										rel="noreferrer"
										href={link}
									>
										<img src={SearchIcon.src} alt="search" />
										<h3 className="text_md f_w_m">{contentObj?.title || "PPAs"}</h3>
									</a>
								</div>
							);
						} else {
							return contentObj?.map((item2, ind2) => {
								// Dynamic pages
								if (key === "softwares") {
									link = `/software/${item2?.slug}`;
								} else if (key === "products") {
									link = `/products/${item2?.slug}`;
								} else if (key === "services") {
									link = `/service/${item2?.slug}`;
								} else if (key === "teams" || key === "teamsectors") {
									link = "/company/team";
								} else if (key === "whoareyous") {
									link = `/who-are-you/${item2?.slug}`;
								} else if (key === "howWeHelps") {
									link = `/how-we-help/${item2?.slug}`;
								}

								return (
									<div className={`${styles.title_link}`} key={key}>
										<a
											className="text_xs d_f"
											// href={`/projects/${contentObj?.slug}?search=${encodeURIComponent(
											// 	searchTerm
											// )}`}
											target="_blank"
											rel="noreferrer"
											href={link}
										>
											<img src={SearchIcon.src} alt="search" />
											<h3 className="text_md f_w_m">{item2?.title || "PPAs"}</h3>
										</a>
									</div>
								);
							});
						}
					})}
				</div>
			)}

			{/* Show "No data found" only when search is performed and no results exist */}
			{noResults && (
				<div className={`${styles.results}`} data-lenis-prevent>
					<div className={`${styles.title_link} `}>
						<p className="no-data-text">No data found</p>
					</div>
				</div>
			)}
		</div>
	);
}
