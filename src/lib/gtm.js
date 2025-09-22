import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/* eslint-disable @typescript-eslint/naming-convention */
export const GTM_ID = "GTM-T74CK9L2"; // replace with your GTM ID

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
