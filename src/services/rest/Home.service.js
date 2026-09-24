import { getAllEvents } from "./Events.service";
import { getCountryList } from "./GlobalPresence.service";
import { getInsights } from "./Insights.service";
import { getPodcasts } from "./Podcast.service";
import { getPageGroup } from "./Single.service";
import { getWebinars } from "./Webinar.service";

/**
 * The home page.
 *
 * Replaces Home.service.js, which was six GraphQL queries: the page itself and
 * five `first: 99999` collection reads whose results were then sliced down to
 * one item each. The REST versions ask for what the page renders instead —
 * `getInsights({ first: 1, categories: [...] })` rather than every post in a
 * category — so the saving here is in payload as much as in request count.
 *
 * The output shapes are unchanged. `getHomePage` returns the `homepage` ACF
 * group and the country list the old query selected alongside it; the voices
 * rail is the same flat array in the same order, because HomeResources indexes
 * into it positionally (`slice(0, 3).reverse()` and `slice(5, 8)`).
 */

/**
 * The `homepage` field group, plus the country list.
 *
 * `ourClient.selectLogos` and `ourClient.testimonials` are two of the shared
 * relation fields, so getPageGroup resolves them without a spec of its own —
 * see Relations.service.js.
 *
 * @returns {Promise<{ data: any, countries: any[] }>} `data` is what the page
 *   previously read as `res.data.page.homepage`, `countries` as
 *   `res.data.countries.nodes`
 */
export const getHomePage = async () => {
	const [data, countries] = await Promise.all([
		getPageGroup("homepage"),
		getCountryList(),
	]);
	return { data, countries };
};

/** Soonest first, and only what has not happened yet. @param {any[]} items
 *  @param {(item: any) => string|undefined} dateOf */
const upcoming = (items, dateOf) => {
	const now = new Date();
	return (items || [])
		.filter((item) => {
			const when = new Date(dateOf(item));
			return !Number.isNaN(when.getTime()) && when > now;
		})
		.sort((a, b) => new Date(dateOf(a)) - new Date(dateOf(b)));
};

/** Country titles as the `{ nodes: [{ name }] }` shape the card reads.
 *  @param {any} country a `{ nodes }` connection of countries */
const countryNames = (country) => ({
	nodes: (country?.nodes || []).map((one) => ({ name: one.title })),
});

/**
 * The "All voices, all markets" rail.
 *
 * A flat array, built in this order because HomeResources slices it by
 * position rather than reading it by kind: case study, podcast, up to three
 * events, commentary, webinar, market report.
 *
 * @returns {Promise<any[]>}
 */
export const getHomePageVoices = async () => {
	const [caseStudies, commentary, marketReports, podcasts, events, webinars] =
		await Promise.all([
			getInsights({ first: 1, categories: ["case-studies"] }),
			getInsights({ first: 1, categories: ["commentary"] }),
			getInsights({ first: 1, categories: ["market-reports"] }),
			getPodcasts(),
			getAllEvents(),
			getWebinars(),
		]);

	const voices = [];

	for (const item of caseStudies.slice(0, 1)) {
		voices.push({
			...item,
			link: `/resources/aurora-insights/case-studies/${item.slug}`,
			cat: "LATEST Case Study",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	}

	// Ordered by the ACF date rather than the post date, which is what the
	// episode list is sorted by everywhere else on the site.
	const newestPodcast = [...podcasts].sort(
		(a, b) => new Date(b?.podcastFields?.date) - new Date(a?.podcastFields?.date),
	);
	for (const item of newestPodcast.slice(0, 1)) {
		voices.push({
			...item,
			link: `/resources/energy-unplugged/${item.slug}`,
			thumb: item?.featuredImage?.node?.mediaItemUrl,
			cat: "Energy Unplugged",
			categories: countryNames(item?.podcastFields?.country),
			date: item?.podcastFields?.date,
		});
	}

	for (const item of upcoming(events, (e) => e?.events?.thumbnail?.date).slice(0, 3)) {
		voices.push({
			...item,
			link: `/events/${item.slug}`,
			thumb: item?.events?.banner?.desktop?.node?.mediaItemUrl,
			cat: "UPCOMING Event",
			categories: countryNames(item?.events?.thumbnail?.country),
			date: item?.events?.thumbnail?.date,
			externalUrl: item?.events?.thumbnail?.externalUrl,
		});
	}

	for (const item of commentary.slice(0, 1)) {
		voices.push({
			...item,
			link: `/resources/aurora-insights/articles/${item.slug}`,
			// The leading space is the old service's, and the card renders it
			// next to a category name, so it is kept rather than tidied.
			cat: " Article",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	}

	for (const item of upcoming(
		webinars,
		(w) => w?.webinarsFields?.startDateAndTime,
	).slice(0, 1)) {
		voices.push({
			...item,
			link: `/resources/webinar/${item.slug}`,
			thumb: item?.featuredImage?.node?.mediaItemUrl,
			cat: "Webinar",
			categories: countryNames(item?.webinarsFields?.country),
			date: item?.webinarsFields?.startDateAndTime,
		});
	}

	for (const item of marketReports.slice(0, 1)) {
		voices.push({
			...item,
			link: `/resources/aurora-insights/market-reports/${item.slug}`,
			cat: "Market Report",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	}

	return voices;
};
