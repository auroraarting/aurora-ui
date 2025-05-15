import { DateTime } from "luxon";

const tzAbbreviationMap = {
	"Europe/London": { std: "GMT", dst: "BST" },
	"America/New_York": { std: "EST", dst: "EDT" },
	"Europe/Paris": { std: "CET", dst: "CEST" },
	"Europe/Madrid": { std: "CET", dst: "CEST" },
	"America/Sao_Paulo": { std: "BRT", dst: "BRST" },
	"Europe/Berlin": { std: "CET", dst: "CEST" },
	"Australia/Sydney": { std: "AEST", dst: "AEDT" },
	"Asia/Tokyo": { std: "JST", dst: "JST" },
	"America/Chicago": { std: "CST", dst: "CDT" },
	"America/Santiago": { std: "CLT", dst: "CLST" },
	"Europe/Amsterdam": { std: "CET", dst: "CEST" },
	"Asia/Manila": { std: "PST", dst: "PST" },
	"Asia/Seoul": { std: "KST", dst: "KST" },
	"Europe/Stockholm": { std: "CET", dst: "CEST" },
	"Europe/Warsaw": { std: "CET", dst: "CEST" },
	"Australia/Perth": { std: "AWST", dst: "AWST" },
	"Europe/Rome": { std: "CET", dst: "CEST" },
	"UTC-6": { std: "CST", dst: "CDT" }, // map UTC-6 to America/Chicago abbreviations
};

/** formatWebinarDateTime  */
export function formatWebinarDateTime(
	startDateAndTime,
	endDateAndTime,
	timezone
) {
	const zone = timezone[0];

	const start = DateTime.fromISO(startDateAndTime, { zone: "utc" }).setZone(
		zone
	);
	const end = DateTime.fromISO(endDateAndTime, { zone: "utc" }).setZone(zone);

	const date = start.toLocaleString({
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	const startTime = start.toLocaleString(DateTime.TIME_SIMPLE);
	const endTime = end.toLocaleString(DateTime.TIME_SIMPLE);

	const abbrs = tzAbbreviationMap[zone] || {
		std: start.offsetNameShort,
		dst: end.offsetNameShort,
	};
	const startAbbr = start.isInDST ? abbrs.dst : abbrs.std;
	const endAbbr = end.isInDST ? abbrs.dst : abbrs.std;
	const tzAbbr = startAbbr === endAbbr ? startAbbr : `${startAbbr} – ${endAbbr}`;

	// Compare current time (in event timezone) with event start time to get isUpcoming
	const now = DateTime.now().setZone(zone);
	const isUpcoming = now <= start;

	return {
		date,
		time: `${startTime} – ${endTime} ${tzAbbr}`,
		isUpcoming,
	};
}
