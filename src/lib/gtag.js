/* eslint-disable @typescript-eslint/naming-convention */
// lib/gtag.ts
export const GA_TRACKING_ID = "G-XXXXXXXXXX";

/** Track pageviews */
export const pageview = (url) => {
	window.gtag("config", GA_TRACKING_ID, {
		page_path: url,
	});
};

/** Track custom events */
export const event = ({ action, params }) => {
	window.gtag("event", action, params);
};
