// Content for the early-careers redesign (/careers/early-careers/programmes),
// taken from aurora_early_careers_redesign.html. Static for now: the matching
// WordPress post type and field groups are in cms/early-careers/ for when the
// pages move onto the CMS, and this file is shaped like those fields so the
// sections will not need to change.

const mapDir = "/img/careers/early_careers/maps";

/** Every EMEA city with its card facts. `sequence` orders the hub list. */
const emeaCities = [
	{ key: "oxford", city: "Oxford", flagEmoji: "🇬🇧", sequence: 10, facts: ["Aurora HQ — largest EMEA team", "Vibrant university city, close to London", "All 3 graduate programmes available"] },
	{ key: "berlin", city: "Berlin", flagEmoji: "🇩🇪", sequence: 20, facts: ["German & Central European markets", "Fast-growing office in energy hub", "Analyst & Modeller roles"] },
	{ key: "madrid", city: "Madrid", flagEmoji: "🇪🇸", sequence: 30, facts: ["Iberian Peninsula energy markets", "Solar, wind & storage focus", "Graduate Analyst role"] },
	{ key: "paris", city: "Paris", flagEmoji: "🇫🇷", sequence: 40, facts: ["French & Benelux power markets", "Nuclear, hydro & renewables expertise", "Graduate Analyst role"] },
	{ key: "stockholm", city: "Stockholm", flagEmoji: "🇸🇪", sequence: 50, facts: ["Nordics energy market specialists", "Hydro-dominated system dynamics", "Graduate Analyst role"] },
	{ key: "athens", city: "Athens", flagEmoji: "🇬🇷", sequence: 60, facts: ["Greek & SE European power markets", "High-growth renewables market", "Graduate Analyst role"] },
];

/** Fallback flag emoji, hub order and card facts per city, keyed by the CMS
 *  `careercountry` slug. A flag image set on the term (programmeCountryFields
 *  .flag) takes precedence over the emoji. */
export const cityDetails = Object.fromEntries(
	emeaCities.map(({ key, flagEmoji, sequence, facts }) => [
		key,
		{ flagEmoji, sequence, facts },
	]),
);

/** City cards for one programme: every EMEA city, available where offered.
 *  @param {string[]} offered city keys */
const cityCards = (offered) =>
	emeaCities.map(({ key, ...city }) => ({
		...city,
		available: offered.includes(key),
		deadline: "Exp. Nov 27",
		// Pinpoint links still to come — until set, the card shows "Opening soon".
		applyUrl: "",
		applyText: "Apply via Pinpoint",
	}));

/** HTML list from an array of strings. @param {string[]} items */
const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

/** Overview cards shared by the EMEA programmes. @param {string} locations */
const overviewCards = (locations) => [
	{ label: "Programme length", value: "2 years" },
	{ label: "Start date", value: "September 2026" },
	{ label: "Region", value: "EMEA" },
	{ label: "Locations", value: locations },
];

/** Programme pages, in hub order. */
export const programmes = [
	{
		slug: "emea-graduate-analyst",
		title: "EMEA Graduate Analyst",
		region: "emea",
		programmes: {
			header: {
				tag: "Graduate Analyst Programme",
				accent: "teal",
				hubLabel: "Graduate Analyst",
				breadcrumb: "Early Careers / EMEA",
				intro: "Join Aurora's analytical community across Europe, the Middle East and Africa — producing forecasts and strategic advice that shape the global energy transition.",
			},
			map: {
				eyebrow: "EMEA locations — Graduate Analyst",
				image: { node: { mediaItemUrl: `${mapDir}/emea-analyst.svg`, altText: "Map of EMEA Graduate Analyst locations" } },
			},
			overview: {
				eyebrow: "General overview of opportunities",
				cards: overviewCards("Oxford · Berlin · Madrid · Paris · Stockholm · Athens"),
			},
			bodySections: [
				{ heading: "About the programme", content: "<p>The Graduate Analyst Programme gives you an immersive introduction to energy markets analysis. You'll work alongside senior analysts on live client projects — producing forecasts, reports and strategic advisory that directly shape investment decisions across the global energy sector.</p>" },
				{ heading: "What you'll do", content: list(["Analyse power markets, grid infrastructure and policy across your region", "Build and maintain quantitative models for energy price forecasting", "Contribute to client reports and presentations", "Collaborate cross-functionally with modelling and software teams"]) },
				{ heading: "What we look for", content: list(["Strong quantitative and analytical ability", "Degree in economics, engineering, mathematics, physics or related field", "Intellectual curiosity about energy markets and the energy transition", "Excellent written and verbal communication"]) },
			],
			locations: {
				title: "Choose your location",
				subtitle: "Select a city to apply via Pinpoint — the full job description and application form will open.",
				cities: cityCards(["oxford", "berlin", "madrid", "paris", "stockholm", "athens"]),
			},
		},
	},
	{
		slug: "emea-graduate-modeller",
		title: "EMEA Graduate Modeller",
		region: "emea",
		programmes: {
			header: {
				tag: "Graduate Modeller Programme",
				accent: "gold",
				hubLabel: "Graduate Modeller",
				breadcrumb: "Early Careers / EMEA",
				intro: "Build the quantitative engine behind Aurora's forecasts — sitting at the intersection of energy systems, mathematics and cutting-edge computational methods.",
			},
			map: {
				eyebrow: "EMEA locations — Graduate Modeller",
				image: { node: { mediaItemUrl: `${mapDir}/emea-modeller.svg`, altText: "Map of EMEA Graduate Modeller locations" } },
			},
			overview: {
				eyebrow: "General overview of opportunities",
				cards: overviewCards("Oxford · Berlin"),
			},
			bodySections: [
				{ heading: "About the programme", content: "<p>Graduate Modellers develop Aurora's proprietary large-scale simulations of electricity markets and grid infrastructure. You'll work with world-class researchers and engineers to produce the forecasts that underpin strategic decisions for clients worldwide.</p>" },
				{ heading: "What you'll do", content: list(["Develop and validate energy system models in Python and other tools", "Improve forecast accuracy through statistical analysis and calibration", "Work with large, complex datasets from grid operators and market exchanges", "Collaborate with analysts and software engineers in cross-functional teams"]) },
				{ heading: "What we look for", content: list(["Strong mathematical, statistical or computational background", "Degree in mathematics, physics, engineering, computer science or related", "Programming experience (Python preferred)", "Interest in energy systems and market design"]) },
			],
			locations: {
				title: "Choose your location",
				subtitle: "Modeller roles available in Oxford and Berlin. Click to apply via Pinpoint.",
				cities: cityCards(["oxford", "berlin"]),
			},
		},
	},
	{
		slug: "emea-graduate-software-engineer",
		title: "EMEA Graduate Software Engineer",
		region: "emea",
		programmes: {
			header: {
				tag: "Graduate Software Engineer Programme",
				accent: "blue",
				hubLabel: "Graduate Software Engineer",
				breadcrumb: "Early Careers / EMEA",
				intro: "Build the tools, platforms and infrastructure that power Aurora's analytics and client-facing products — at the frontier of energy data and software engineering.",
			},
			map: {
				eyebrow: "EMEA locations — Graduate Software Engineer",
				image: { node: { mediaItemUrl: `${mapDir}/emea-software.svg`, altText: "Map of EMEA Graduate Software Engineer locations" } },
			},
			overview: {
				eyebrow: "General overview of opportunities",
				cards: overviewCards("Oxford"),
			},
			bodySections: [
				{ heading: "About the programme", content: "<p>Graduate Software Engineers at Aurora build and maintain the EOS platform, internal tools and the data pipelines that support our models and analytics. You'll work within agile product teams, contributing to real features that thousands of energy professionals use every day.</p>" },
				{ heading: "What you'll do", content: list(["Develop full-stack features for Aurora's EOS analytics platform", "Design and maintain scalable data pipelines and APIs", "Collaborate with modellers and analysts to surface insights effectively", "Participate in code reviews, testing and architectural decisions"]) },
				{ heading: "What we look for", content: list(["Degree in computer science, software engineering or related field", "Proficiency in Python and/or JavaScript/TypeScript", "Understanding of software design principles and data structures", "Collaborative, product-minded approach to engineering"]) },
			],
			locations: {
				title: "Choose your location",
				subtitle: "Software Engineering roles are Oxford-based. Click to apply via Pinpoint.",
				cities: cityCards(["oxford"]),
			},
		},
	},
];

const currentSite = "https://auroraer.com/careers/early-careers";

/** Hub hero, explore heading and regions (in accordion order). */
export const hub = {
	hero: {
		title: "Launch your energy career",
		highlight: "with Aurora",
		description: "At Aurora, we don't just predict the future of energy — we help shape it. Our graduate opportunities offer you a unique platform to thrive, with roles available across the globe.",
		buttonText: "Join us",
		buttonLink: "",
		image: { node: { mediaItemUrl: "/img/careers/early_careers/desktop_banner.jpg", altText: "Aurora graduates" } },
	},
	explore: {
		eyebrow: "Explore",
		title: "Explore Aurora's opportunities by region",
	},
	regions: [
		{ slug: "emea", name: "Europe, Middle East & Africa", note: null },
		{ slug: "apac", name: "Asia Pacific", note: `<p>🌏 &nbsp;APAC graduate programmes — roles in Japan, Singapore, Australia and India are available on the <a href="${currentSite}">current site</a>. This section will be updated as the page expands.</p>` },
		{ slug: "noram", name: "North America", note: `<p>🌎 &nbsp;North America graduate programmes — United States and Canada roles are available on the <a href="${currentSite}">current site</a>.</p>` },
		{ slug: "latam", name: "South America", note: `<p>🌎 &nbsp;South America graduate programmes — Brazil and Chile roles are available on the <a href="${currentSite}">current site</a>.</p>` },
	],
};

/** One programme by slug, or undefined. @param {string} slug */
export const getProgrammeBySlug = (slug) => programmes.find((p) => p.slug === slug);

const accentCycle = ["teal", "gold", "blue"];

/** Dot / page accent for a programme. The CMS has no field for it: the three
 *  original programmes keep theirs, any other slug gets a stable one from the
 *  cycle so the hub and the programme page always agree.
 *  @param {string} slug */
export function programmeAccent(slug = "") {
	const known = getProgrammeBySlug(slug)?.programmes.header.accent;
	if (known) return known;
	const hash = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
	return accentCycle[hash % accentCycle.length];
}

/** Strip the <p> wrapper WordPress puts round single-line ACF text.
 *  @param {string} html */
const plainText = (html) => String(html || "").replace(/<[^>]*>/g, "").trim();

/** A CMS `programme` node (GetProgrammeBySlug) in the shape EarlyProgramme
 *  renders — the same shape as the static `programmes` above.
 *
 *  The CMS carries the banner, map, overview points and body sections. The
 *  rest has no field yet and is derived: the tag and breadcrumb from the title
 *  and region, and the city cards from the `careercountry` terms: flag image
 *  from the term (emoji from cityDetails when unset), facts from cityDetails. Each card's apply link is the term's `pinpointUrl`;
 *  a city without one reads "Opening soon".
 *
 *  The link lives on the city term, not the programme, so a city offered by
 *  several programmes shares one link across all their pages.
 *  @param {any} node */
export function toProgrammeData(node) {
	const fields = node?.programmeFields || {};
	const cards = (fields.overviewPoints || [])
		.map((point) => ({ label: point?.title, value: point?.value }))
		.filter((card) => card.label || card.value);
	const region =
		cards.find((card) => /^region$/i.test(card.label || ""))?.value ||
		node?.regions?.nodes?.[0]?.name ||
		"";

	const cities = (node?.careercountries?.nodes || [])
		.map((term) => ({
			city: term.name,
			flagEmoji: cityDetails[term.slug]?.flagEmoji,
			flagImage: term.programmeCountryFields?.flag?.node || null,
			facts: cityDetails[term.slug]?.facts || [],
			sequence: cityDetails[term.slug]?.sequence ?? Infinity,
			available: true,
			applyUrl: term.programmeCountryFields?.pinpointUrl || "",
			applyText: "Apply via Pinpoint",
		}))
		.sort((a, b) => a.sequence - b.sequence || a.city.localeCompare(b.city));

	return {
		slug: node?.slug,
		title: plainText(fields.banner?.heading) || node?.title,
		programmes: {
			header: {
				tag: `${node?.title} Programme`,
				accent: programmeAccent(node?.slug),
				breadcrumb: region ? `Early Careers / ${region}` : "Early Careers",
				intro: fields.banner?.description,
			},
			map: {
				eyebrow: region ? `${region} locations — ${node?.title}` : null,
				image: fields.map?.image,
			},
			overview: {
				eyebrow: "General overview of opportunities",
				cards,
			},
			bodySections: (fields.sections || []).map((section) => ({
				heading: section?.sectionTitle,
				content: section?.sectionDescription,
			})),
			locations: {
				title: "Choose your location",
				subtitle:
					"Select a city to apply via Pinpoint — the full job description and application form will open.",
				cities,
			},
		},
	};
}
