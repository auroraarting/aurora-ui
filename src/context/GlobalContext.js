"use client";

import {
	createContext,
	useContext,
	Suspense,
	useEffect,
	useState,
} from "react";
import InnerGlobalContext from "./InnerGlobalContext"; // we'll move logic here
import Loader from "@/components/Loader";
import { usePathname } from "next/navigation";

const BookmarkContext = createContext();

/** GlobalContext  */
export const GlobalContext = ({ children }) => {
	const pathname = usePathname();

	useEffect(() => {
		/**handleClick  */
		const handleClick = (e) => {
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

			const link = e.target.closest("a");
			if (!link) return;

			const href = link.getAttribute("href");
			if (!href || href === "#") return;

			if (
				link.target === "_blank" ||
				link.hasAttribute("download") ||
				link.rel === "noopener noreferrer" ||
				href.startsWith("#")
			) {
				return;
			}

			const isExternal =
				link.hostname !== window.location.hostname ||
				href.startsWith("http") ||
				href.startsWith("mailto:") ||
				href.startsWith("tel:");

			if (isExternal) return;

			// ✅ Skip loader if navigating to the same path
			const currentPath =
				window.location.pathname + window.location.search + window.location.hash;
			const linkPath =
				new URL(href, window.location.origin).pathname +
				new URL(href, window.location.origin).search +
				new URL(href, window.location.origin).hash;

			if (linkPath === currentPath) return;

			// ✅ Internal link clicked, path is different
			const getLoaderHtml = document.querySelector(".loaderWrap");
			if (getLoaderHtml) {
				getLoaderHtml.classList.remove("hide");
			}
		};

		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	}, []);

	useEffect(() => {
		// ✅ This runs once on page load
		const getLoaderHtml = document.querySelector(".loaderWrap");
		if (getLoaderHtml) {
			getLoaderHtml.classList.add("hide");
		}
	}, [pathname]); // <-- empty dependency array = run once on mount

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
