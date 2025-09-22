"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/** Push events into the dataLayer */
export const gtmPush = (event) => {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push(event);
};

/** GTMClientTracker */
export default function GTMClientTracker() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!pathname) return;

		const query = searchParams?.toString();
		const url = pathname + (query ? `?${query}` : "");

		// Push a pageview event to GTM
		gtmPush({
			event: "pageview",
			page: {
				path: pathname,
				url,
			},
		});
	}, [pathname, searchParams]);

	return null;
}
