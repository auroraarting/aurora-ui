"use client";

import { createContext, useContext, Suspense, useEffect } from "react";
import InnerGlobalContext from "./InnerGlobalContext"; // we'll move logic here
import Loader from "@/components/Loader";

const BookmarkContext = createContext();

/** GlobalContext  */
export const GlobalContext = ({ children }) => {
	useEffect(() => {
		/**handleClick  */
		const handleClick = (e) => {
			// ⛔ Respect Cmd/Ctrl clicks (open in new tab)
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

			const link = e.target.closest("a");
			if (!link) return;

			const href = link.getAttribute("href");
			if (!href || href === "#") return;

			// ⛔ Skip if link opens in a new tab or downloads a file
			if (
				link.target === "_blank" ||
				link.hasAttribute("download") ||
				link.rel === "noopener noreferrer"
			) {
				return;
			}

			// ⛔ External links
			const isExternal =
				link.hostname !== window.location.hostname ||
				href.startsWith("http") ||
				href.startsWith("mailto:") ||
				href.startsWith("tel:");

			if (isExternal) return;

			// ✅ Internal link clicked normally
			console.log("User clicked internal link:", link.href);

			const getLoaderHtml = document.querySelector(".loaderWrap");
			if (getLoaderHtml) {
				getLoaderHtml.classList.remove("hide");
			}
		};

		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	return (
		<Suspense fallback={<Loader />}>
			<InnerGlobalContext>{children}</InnerGlobalContext>
		</Suspense>
	);
};

/** use bookmark */
export const useContextProvider = () => {
	const context = useContext(BookmarkContext);
	if (!context)
		throw new Error("useBookmark must be used within BookmarkProvider");
	return context;
};

export { BookmarkContext };
