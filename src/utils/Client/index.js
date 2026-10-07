import { DateTime } from "luxon";
import formatDate from "..";

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

// Events entered before the per-event timezone field existed (and any where an
// editor leaves it blank) carry no zone of their own. Aurora is headquartered
// in Oxford, so that's the most common actual entry zone and the sanest
// default — closer to "right" than treating the digits as literal UTC.
export const defaultEventTimezone = "Europe/London";

/** Resolves a CMS event date/time to the correct absolute instant.
 *  WPGraphQL always suffixes thumbnail.date/endDate with "+00:00", but that
 *  offset isn't trustworthy — editors in different offices each enter the
 *  wall-clock time as it is where *they* are, so the digits actually mean
 *  local time in whatever zone thumbnail.timezone (an IANA id, e.g.
 *  "Europe/Paris") names. This discards the bogus offset and reinterprets
 *  the same wall-clock numbers as local time in that zone instead, falling
 *  back to defaultEventTimezone when no (valid) timezone is given.
 *  @param {string} dateStr @param {string} [timezone] @returns {Date|null} */
export function resolveEventDateTime(dateStr, timezone) {
	if (!dateStr) return null;
	const utc = DateTime.fromISO(dateStr, { setZone: true });
	if (!utc.isValid) return null;
	const local = utc.setZone(timezone || defaultEventTimezone, {
		keepLocalTime: true,
	});
	return local.isValid ? local.toJSDate() : utc.toJSDate();
}

/** formatWebinarDateTime  */
export function formatWebinarDateTime(
	startDateAndTime,
	endDateAndTime,
	timezone
) {
	// const zone = timezone[0];

	// const start = DateTime.fromISO(startDateAndTime, { zone: "utc" }).setZone(
	// 	zone
	// );
	// const end = DateTime.fromISO(endDateAndTime, { zone: "utc" }).setZone(zone);

	// const date = start.toLocaleString({
	// 	month: "short",
	// 	day: "numeric",
	// 	year: "numeric",
	// });
	// const startTime = start.toLocaleString(DateTime.TIME_SIMPLE);
	// const endTime = end.toLocaleString(DateTime.TIME_SIMPLE);

	// const abbrs = tzAbbreviationMap[zone] || {
	// 	std: start.offsetNameShort,
	// 	dst: end.offsetNameShort,
	// };
	// const startAbbr = start.isInDST ? abbrs.dst : abbrs.std;
	// const endAbbr = end.isInDST ? abbrs.dst : abbrs.std;
	// const tzAbbr = startAbbr === endAbbr ? startAbbr : `${startAbbr} – ${endAbbr}`;

	// // Compare current time (in event timezone) with event start time to get isUpcoming
	// const now = DateTime.now().setZone(zone);
	// const isUpcoming = now <= start;

	const date = formatDate(startDateAndTime);
	const startTime = new Date(startDateAndTime).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: "UTC",
	});
	const endTime = new Date(endDateAndTime).toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZone: "UTC",
	});
	const tzAbbr = timezone;
	// Compare current time (in UTC) with endDateAndTime
	const currentUTC = new Date().toISOString(); // current time in UTC as string
	const isUpcoming = new Date(currentUTC) <= new Date(endDateAndTime);

	return {
		date,
		time: `   ${startTime} – ${endTime} ${tzAbbr}`,
		isUpcoming,
	};
}
