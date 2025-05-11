"use client";

import { createContext, useContext, Suspense } from "react";
import InnerGlobalContext from "./InnerGlobalContext"; // we'll move logic here
import Loader from "@/components/Loader";

const BookmarkContext = createContext();

/** GlobalContext  */
export const GlobalContext = ({ children }) => {
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
