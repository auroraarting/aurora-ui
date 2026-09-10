// Compares each REST service against the GraphQL service it replaces, by
// calling both for real. The live GraphQL query is the reference, so this
// catches a field the REST version forgot without anyone retyping a query.
//
//   npm run rest:parity
//
// A case passes when nothing the GraphQL service returned is missing from the
// REST result. Extra fields are fine — REST returns whole ACF groups where
// GraphQL selected individual fields. `type-mismatch` counts are informational:
// the known and accepted ones are numeric IDs where WPGraphQL returned base64
// global IDs.
import { compare } from "./diff.mjs";
import { importService } from "./paths.mjs";

const [gWho, gHow, gProd, gService, rWho, rHow, rProd, rService, rShared, rSeo, rBundles] =
	await Promise.all([
		importService("WhoAreYou.service.js"),
		importService("HowWeHelp.service.js"),
		importService("Products.service.js"),
		importService("Service.service.js"),
		importService("rest/WhoAreYou.service.js"),
		importService("rest/HowWeHelp.service.js"),
		importService("rest/Products.service.js"),
		importService("rest/Service.service.js"),
		importService("rest/GlobalPresence.service.js"),
		importService("rest/Seo.service.js"),
		importService("rest/Bundles.service.js"),
	]);

const gGlobal = await importService("GlobalPresence.service.js");
const gSeo = await importService("Seo.service.js");
const gBundles = await importService("Bundles.service.js");

// The landing pages and the services they share.
const [
	gCookies, gTerms, gPolicy, gSafe, gFaq, gContact, gJoinUs, gEos,
	gOurTeams, gAbout, gCareers, gOffices, gInsights, gEarly,
] = await Promise.all([
	importService("Cookies.service.js"),
	importService("Terms.service.js"),
	importService("Policy.service.js"),
	importService("SafeSender.service.js"),
	importService("Faq.service.js"),
	importService("Contact.service.js"),
	importService("JoinUs.service.js"),
	importService("Eos.service.js"),
	importService("OurTeams.service.js"),
	importService("About.service.js"),
	importService("Careers.service.js"),
	importService("Offices.service.js"),
	importService("Insights.service.js"),
	importService("EarlyCareers.service.js"),
]);

const [
	gVideos, gVideosLanding, gEnergyTalks, gInsightsListing, gPodcast, gWebinar,
] = await Promise.all([
	importService("Videos.service.js"),
	importService("VideosLanding.service.js"),
	importService("EnergyTalks.service.js"),
	importService("InsightsListing.service.js"),
	importService("Podcast.service.js"),
	importService("Webinar.service.js"),
]);
const [
	rVideos, rVideosLanding, rEnergyTalks, rInsightsListing, rPodcast, rWebinar,
] = await Promise.all([
	importService("rest/Videos.service.js"),
	importService("rest/VideosLanding.service.js"),
	importService("rest/EnergyTalks.service.js"),
	importService("rest/InsightsListing.service.js"),
	importService("rest/Podcast.service.js"),
	importService("rest/Webinar.service.js"),
]);

const [
	rContent, rFaq, rContact, rJoinUs, rEos, rOurTeams, rAbout, rCareers,
	rOffices, rInsights, rEarly,
] = await Promise.all([
	importService("rest/ContentPage.service.js"),
	importService("rest/Faq.service.js"),
	importService("rest/Contact.service.js"),
	importService("rest/JoinUs.service.js"),
	importService("rest/Eos.service.js"),
	importService("rest/OurTeams.service.js"),
	importService("rest/About.service.js"),
	importService("rest/Careers.service.js"),
	importService("rest/Offices.service.js"),
	importService("rest/Insights.service.js"),
	importService("rest/EarlyCareers.service.js"),
]);

/** The insight filter every landing page uses, in both dialects. */
const insightCategories = [
	"case-studies", "commentary", "market-reports",
	"policy-notes", "newsletters", "new-launches",
];
const insightFilter = `first: 3, where: {categoryName: "${insightCategories.join(",")}"}`;

/** GraphQL wrapped each option list in `{ nodes }`; REST returns arrays. */
const unwrapLists = (data) =>
	Object.fromEntries(
		Object.entries(data || {}).map(([key, value]) => [key, value?.nodes ?? value]),
	);

/** Value differences that are understood and accepted.
 *
 *  `postFields.sections[].content` differs by a single paragraph boundary
 *  inside a `[caption]` shortcode: WPGraphQL's `the_content` pass closes the
 *  `<p>` before the caption's own `<p>` and ACF's formatted value does not.
 *  Compared at tag level the whole difference is one stray `</p>` in the
 *  GraphQL output, with no `<p>` open to close — unbalanced markup that every
 *  HTML parser discards, so the rendered DOM is the same. Confirmed by
 *  rendering the page both ways: identical text, media, `<p>` and `<img>`
 *  counts. REST's output is simply the better-formed of the two. */
const acceptedValuePaths = [
	/^\[\d+\]\.postFields\.sections\[\d+\]\.content$/,
	/^postFields\.sections\[\d+\]\.content$/,
];

/** `contentType` subfields the GraphQL queries select but nothing in src/ ever
 *  reads — every one of the ~12 usages goes through `contentType.node.name`.
 *  Reproducing `uri`/`label`/`id` would mean another call per post type for
 *  values no section looks at. */
const acceptedMissing = [/\.contentType\.node\.(uri|label|id|showUi)$/];

/** Fields the GraphQL queries select but nothing in src/ ever reads, so REST
 *  does not reproduce them. Verified by grepping the whole tree. */
const accepted = new Set([
	"howWeHelpInside.banner.fieldGroupName",
	"[0].howWeHelpInside.banner.fieldGroupName",
	"howWeHelpInside.spotlights.selected.nodes[0].contentType.node.uri",
	"howWeHelpInside.spotlights.selected.nodes[0].contentType.node.showUi",
]);

const cases = [
	{
		label: "service/[slug]",
		gql: async () => (await gService.getServiceData("advisory"))?.data?.serviceBy,
		rest: () => rService.getServiceData("advisory"),
	},
	{
		label: "who-are-you/[slug]",
		gql: async () => (await gWho.getSingleWhoAreYou("developers"))?.data?.whoareyouBy,
		rest: () => rWho.getSingleWhoAreYou("developers"),
	},
	{
		label: "how-we-help/[slug]",
		gql: async () => (await gHow.getSingleHowWeHelp("ppas"))?.data?.howwehelpBy,
		rest: () => rHow.getSingleHowWeHelp("ppas"),
	},
	{
		label: "products/[slug]",
		gql: async () => (await gProd.getProductBySlug("power-renewables"))?.data?.productBy,
		rest: () => rProd.getProductBySlug("power-renewables"),
	},
	{
		label: "how-we-help listing",
		gql: async () => (await gHow.getHowWeHelps())?.data?.howWeHelps?.nodes,
		rest: () => rHow.getHowWeHelpListing(),
	},
	{
		label: "regions",
		gql: () => gGlobal.getRegions().then((r) => r?.data),
		rest: () => rShared.getRegions().then((r) => r?.data),
	},
	{
		label: "bundles",
		gql: async () => (await gBundles.getBundlesSection())?.data?.page?.bundles,
		rest: () => rBundles.getBundlesSection(),
	},
	{
		label: "seo",
		gql: async () =>
			(await gSeo.getPageSeo('serviceBy(slug: "advisory")'))?.data?.serviceBy?.seo,
		rest: async () => (await rSeo.getPageSeo("services", "advisory"))?.seo,
	},
	// ---- content-only pages -------------------------------------------
	{
		label: "legal/cookies",
		gql: async () => (await gCookies.getCookies())?.data?.page,
		rest: () => rContent.getCookies(),
	},
	{
		label: "legal/terms",
		gql: async () => (await gTerms.getTerms())?.data?.page,
		rest: () => rContent.getTerms(),
	},
	{
		label: "policies-and-compliance",
		gql: async () => (await gPolicy.getPolicy())?.data?.page,
		rest: () => rContent.getPolicy(),
	},
	{
		label: "safe-sender",
		gql: async () => (await gSafe.getSafeSender())?.data?.page,
		rest: () => rContent.getSafeSender(),
	},
	// ---- landing pages ------------------------------------------------
	{
		label: "careers/faq",
		gql: async () => (await gFaq.getFaqPage())?.data?.page?.faq,
		rest: () => rFaq.getFaqPage(),
	},
	{
		label: "company/contact page",
		gql: async () => (await gContact.getContact())?.data?.page?.contact,
		rest: () => rContact.getContact(),
	},
	{
		label: "careers/join-us",
		gql: async () => (await gJoinUs.getJoinUsPage())?.data?.page?.joinUs,
		rest: () => rJoinUs.getJoinUsPage(),
	},
	{
		label: "eos",
		gql: async () => (await gEos.getEosPage())?.data?.page?.eos,
		rest: () => rEos.getEosPage(),
	},
	{
		label: "careers/our-team",
		gql: async () => (await gOurTeams.getOurTeamsPage())?.data?.page?.ourTeams,
		rest: () => rOurTeams.getOurTeamsPage(),
	},
	{
		label: "company/about",
		gql: async () => (await gAbout.getAboutPage())?.data?.page?.about,
		rest: () => rAbout.getAboutPage(),
	},
	{
		label: "careers/life-at-aurora",
		gql: async () => (await gCareers.getLifeAtAurora())?.data?.page?.lifeAtAurora,
		rest: () => rCareers.getLifeAtAurora(),
	},
	// ---- shared services ----------------------------------------------
	{
		label: "offices",
		gql: async () => (await gOffices.getOffices())?.data?.offices?.nodes,
		rest: () => rOffices.getOffices(),
	},
	{
		label: "offices by regions",
		gql: async () => (await gOffices.getOfficesByRegions())?.data,
		rest: async () => (await rOffices.getOfficesByRegions())?.data,
	},
	{
		label: "insights (first 3)",
		gql: async () => (await gInsights.getInsights(insightFilter))?.data?.posts?.nodes,
		rest: () => rInsights.getInsights({ first: 3, categories: insightCategories }),
	},
	{
		label: "insights categories",
		gql: async () => unwrapLists((await gInsights.getInsightsCategories())?.data),
		rest: () => rInsights.getInsightsCategories(),
	},
	{
		label: "early careers listing",
		gql: async () =>
			(await gEarly.getEarlyCareersListing("first: 10"))?.data?.earlyCareers?.nodes,
		rest: () => rEarly.getEarlyCareersListing({ first: 10 }),
	},
	{
		label: "early careers landing",
		gql: async () =>
			(await gEarly.getEarlyCareersPage())?.data?.page?.earlyCareersLanding,
		rest: async () => (await rEarly.getEarlyCareersPage())?.page,
	},
	{
		label: "early careers programs",
		gql: async () => (await gEarly.getEarlyCareersPage())?.data?.programs?.nodes,
		rest: async () => (await rEarly.getEarlyCareersPage())?.programs,
	},
	{
		label: "early-careers/[slug]",
		gql: async () =>
			(await gEarly.getEarlyCareersInside(earlyCareerSlug))?.data?.earlyCareerBy,
		rest: () => rEarly.getEarlyCareersInside(earlyCareerSlug),
	},
	{
		label: "early careers by region",
		gql: async () =>
			(await gEarly.getEarlyCareersListingByRegions())?.data?.regions?.nodes,
		rest: () => rEarly.getEarlyCareersListingByRegions(),
	},
	// ---- resources ------------------------------------------------------
	{
		label: "all videos",
		gql: async () => (await gVideos.getAllVideos())?.data?.videos?.nodes,
		rest: () => rVideos.getAllVideos(),
	},
	{
		label: "latest videos",
		gql: () => gVideos.getLatestVideos(videoSlug),
		rest: () => rVideos.getLatestVideos(videoSlug),
	},
	{
		label: "videos/[slug]",
		gql: async () => (await gVideos.getVideosInside(videoSlug))?.data?.videoBy,
		rest: () => rVideos.getVideosInside(videoSlug),
	},
	{
		label: "videos landing",
		gql: async () =>
			(await gVideosLanding.getVideosLandingPage())?.data?.page?.videosLanding,
		rest: () => rVideosLanding.getVideosLandingPage(),
	},
	{
		label: "energy talks landing",
		gql: async () =>
			(await gEnergyTalks.getEnergyTalksPage())?.data?.page?.energyTalksListing,
		rest: () => rEnergyTalks.getEnergyTalksPage(),
	},
	{
		label: "energy talks social",
		gql: async () =>
			(await gEnergyTalks.getEnergyTalksPageSocialLinks())?.data?.page
				?.energyTalksListing,
		rest: () => rEnergyTalks.getEnergyTalksPageSocialLinks(),
	},
	{
		label: "insights landing",
		gql: async () =>
			(await gInsightsListing.getInsightsPage())?.data?.page?.insightsListing,
		rest: () => rInsightsListing.getInsightsPage(),
	},
	{
		label: "podcasts",
		gql: async () => (await gPodcast.getPodcasts())?.data?.podcasts?.nodes,
		rest: () => rPodcast.getPodcasts(),
	},
	{
		label: "energy-unplugged/[slug]",
		gql: async () => (await gPodcast.getPodcastInside(podcastSlug))?.data?.podcastBy,
		rest: () => rPodcast.getPodcastInside(podcastSlug),
	},
	{
		label: "aurora-insights/[slug]",
		gql: async () => (await gInsights.getInsightsInside(insightSlug))?.data?.postBy,
		rest: () => rInsights.getInsightsInside(insightSlug),
	},
	{
		label: "webinar landing",
		gql: async () =>
			(await gWebinar.getWebinarPage())?.data?.page?.webinarsListing,
		rest: () => rWebinar.getWebinarPage(),
	},
	{
		label: "webinars",
		gql: async () =>
			(await gWebinar.getWebinars("first: 20"))?.data?.webinars?.nodes,
		rest: () => rWebinar.getWebinars({ first: 20 }),
	},
	{
		label: "webinar/[slug]",
		gql: async () => (await gWebinar.getWebinarInside(webinarSlug))?.data?.webinar,
		rest: () => rWebinar.getWebinarInside(webinarSlug),
	},
];

/** A published programme to compare the detail page against. */
const earlyCareerSlug = "tokyo-graduate-analyst-programme";

/** A published video for the detail and "latest" comparisons. */
const videoSlug = "flexplorer";

/** A published podcast episode. */
const podcastSlug = "ep-305-what-happens-when-a-market-moves-fast";

/** A published insight with authors, sections and a powered-by reference. */
const insightSlug = "ireland-energy-affordability-challenge";

/** A published webinar. */
const webinarSlug = "ai-powered-energy-workflows-with-aurora-mcp-noram-special-edition";

const only = process.argv[2];
const summary = [];

for (const { label, gql, rest } of cases) {
	if (only && !label.includes(only)) continue;

	let g;
	let r;
	try {
		g = await gql();
	} catch (error) {
		summary.push([label, null, null, `GraphQL failed: ${error.message}`]);
		continue;
	}
	try {
		r = await rest();
	} catch (error) {
		summary.push([label, null, null, `REST failed: ${error.message}`]);
		continue;
	}
	if (!g) {
		// Both empty is parity: the videos landing page is addressed by a stale
		// database id, so WPGraphQL returns null there too. Only GraphQL
		// returning nothing while REST returns something is a real mismatch.
		if (!r) {
			summary.push([label, [], 0, null, [], "both empty"]);
		} else {
			summary.push([label, null, null, "GraphQL returned nothing, REST did not"]);
		}
		continue;
	}

	const { onlyGql, typeMismatch, valueMismatch } = compare(g, r, { label });
	const missing = onlyGql.filter(
		(path) =>
			!accepted.has(path) &&
			!acceptedMissing.some((pattern) => pattern.test(path)),
	);
	// A node `id` is WPGraphQL's base64 global id and REST's numeric post id;
	// they cannot match, and nothing treats them as opaque strings — the utils
	// only test them for truthiness or use them to de-duplicate.
	const values = valueMismatch.filter(
		({ path }) =>
			!/(^|\.)id$/.test(path) &&
			!path.endsWith("].id") &&
			!acceptedValuePaths.some((pattern) => pattern.test(path)),
	);
	summary.push([label, missing, typeMismatch.length, null, values]);
}

console.log(`\n${"=".repeat(72)}\nSUMMARY\n${"=".repeat(72)}`);
let failed = 0;
for (const [label, missing, mismatch, error, values = [], note] of summary) {
	if (error) {
		failed++;
		console.log(`ERR  ${label.padEnd(24)} ${error}`);
		continue;
	}
	if (missing.length || values.length) {
		failed++;
		if (missing.length) {
			console.log(`FAIL ${label.padEnd(24)} ${missing.length} field(s) missing in REST:`);
			for (const path of missing.slice(0, 20)) console.log(`       ${path}`);
		}
		if (values.length) {
			console.log(`FAIL ${label.padEnd(24)} ${values.length} value(s) differ:`);
			for (const { path, gql: g, rest: r } of values.slice(0, 10)) {
				console.log(`       ${path}`);
				console.log(`         gql : ${JSON.stringify(g)?.slice(0, 120)}`);
				console.log(`         rest: ${JSON.stringify(r)?.slice(0, 120)}`);
			}
		}
	} else if (note) {
		console.log(`ok   ${label.padEnd(24)} ${note}`);
	} else {
		console.log(`ok   ${label.padEnd(24)} shape and values match (type-mismatch=${mismatch})`);
	}
}
console.log(`\n${summary.length - failed}/${summary.length} cases at parity`);
process.exitCode = failed ? 1 : 0;
