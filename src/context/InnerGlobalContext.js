"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BookmarkContext } from "./GlobalContext"; // import from above
import SmoothScrolling from "@/utils/SmoothScrolling";
import ScrollOut from "scroll-out";
import { setTimeout } from "timers";

/** InnerGlobalContext  */
export default function InnerGlobalContext({ children }) {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	/** addCssVariables  */
	const addCssVariables = () => {
		const header = document
			?.querySelector(".main_headerBox")
			?.getBoundingClientRect();
		const sectionHeader = document
			?.querySelector(".SectionsHeader")
			?.getBoundingClientRect();

		if (header) {
			document.documentElement.style.setProperty(
				"--header_height",
				`${header.height}px`
			);
		}
		if (sectionHeader) {
			document.documentElement.style.setProperty(
				"--section_height",
				`${sectionHeader.height}px`
			);
		}
	};

	useEffect(() => {
		SmoothScrolling();
		addCssVariables();
		ScrollOut({
			targets: [".fadeInUp", ".scaleUpAnimation"],
			once: true,
		});
		setTimeout(() => {
			addCssVariables();
		}, 1000);
	}, []);

	return (
		<BookmarkContext.Provider value={{ search }}>
			{children}
		</BookmarkContext.Provider>
	);
}
