"use client";

import { highlightMatches } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** HighlightSearched  */
function HighlightSearched() {
	const searchParams = useSearchParams();
	const search = searchParams.get("search");

	useEffect(() => {
		setTimeout(() => {
			highlightMatches(document.body, search?.toLowerCase(), "");
		}, 1000);
	}, [search]);

	return <></>;
}

export default HighlightSearched;
