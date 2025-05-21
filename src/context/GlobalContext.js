"use client";

import { createContext, useContext, Suspense, useEffect } from "react";
import InnerGlobalContext from "./InnerGlobalContext"; // we'll move logic here
import Loader from "@/components/Loader";

const BookmarkContext = createContext();

/** GlobalContext  */
export const GlobalContext = ({ children }) => {
	useEffect(() => {
		/** handleClick  */
		const handleClick = (e) => {
			// Look for <a> tags only
			const link = e.target.closest("a");

			if (link && link.href && link.origin === window.location.origin) {
				// Internal link clicked
				console.log("User clicked link:", link.href);
				const getLoaderHtml = document.querySelector(".loaderWrap");
				getLoaderHtml.classList.remove("hide");

				// Add your logic here (e.g., start spinner)
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
