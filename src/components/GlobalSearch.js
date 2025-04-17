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

// DATA //

/** GlobalSearch Component */
export default function GlobalSearch() {
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const [isTyping, setIsTyping] = useState(false);

	/** handleSearch */
	/** Fetch search results */
	const fetchSearchResults = async () => {
		if (!searchTerm.trim()) {
			setResults([]); // Clear results if input is empty
			return;
		}

		try {
			const response = await fetch("/api/search", {
				method: "POST",
				headers: {
					...ServerHeaders.headers,
				},
				body: JSON.stringify({ searchTerm }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			setResults(data);
		} catch (error) {
			console.error("Error during search:", error);
		}
	};

	/** Handle typing & debounce search */
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			fetchSearchResults();
			setIsTyping(false);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	/** Handle key press */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			fetchSearchResults();
		} else {
			setIsTyping(true);
		}
	};

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

			{results.length > 0 && (
				<div className={`${styles.results}`} data-lenis-prevent>
					{isTyping && (
						<p className={`${styles.title_link} text_md f_w_m`}>Searching...</p>
					)}
					{results.map((item) => (
						<div key={item.id} className={`${styles.title_link} `}>
							<a
								className="text_xs d_f"
								href={
									item.__typename === "Project"
										? `/projects/${item.slug}?search=${encodeURIComponent(searchTerm)}`
										: `${process.env.NEXT_PUBLIC_LIVE_URL || ""}/${
												item.slug === "home" ? "" : item.slug
										  }?search=${encodeURIComponent(searchTerm)}`
								}
							>
								<img src={SearchIcon.src} alt="search" />
								<h3 className="text_md f_w_m">{item.title}</h3>
							</a>
						</div>
					))}
				</div>
			)}

			{/* Show "No data found" only when search is performed and no results exist */}
			{results.length === 0 && !isTyping && searchTerm.trim() && (
				<div className={`${styles.results}`} data-lenis-prevent>
					<div className={`${styles.title_link} `}>
						<p className="no-data-text">No data found</p>
					</div>
				</div>
			)}
		</div>
	);
}
