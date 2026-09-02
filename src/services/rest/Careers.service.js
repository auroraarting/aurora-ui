// Life at Aurora page content over REST. Same
// `{ data: { page: { lifeAtAurora: … }, offices: { nodes } } }` shape the
// GraphQL query returned, so /careers/life-at-aurora needs no changes.
//
// Two requests: the page and the offices list. The offices half is the same
// selection as Offices.getOffices, so it is delegated there rather than
// duplicated — and the build cache means the two share one request when both
// run on the same page.

import {
	loadPage,
	orNull,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";
import { getOffices } from "./Offices.service";

const PAGE_ID = "/careers/life-at-aurora";

// The GraphQL query asked for `offices` with no `first:`, so it got WPGraphQL's
// default page size. Matching it keeps the list the same length.
const GRAPHQL_DEFAULT_PAGE_SIZE = 10;

/** The ACF field name here contains an ampersand ("collaboration_&_support"),
 *  so it is looked up on a normalised key rather than the literal name. */
const normalise = (key) => String(key).toLowerCase().replace(/[^a-z0-9]/g, "");
function group(acf, graphqlName) {
	const wanted = normalise(graphqlName);
	for (const key of Object.keys(acf)) {
		if (key.endsWith("_source")) continue;
		if (normalise(key) === wanted) return orNull(acf[key]);
	}
	return null;
}

/** Buttons here come in two selections: some include `url`, some do not. */
const mapButton = (field, { withUrl }) => {
	const button = orNull(field);
	if (!button) return null;
	return {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		...(withUrl ? { url: orNull(button.url) } : {}),
		file: toMediaNode(button.file),
	};
};

/** Life at Aurora */
export const getLifeAtAurora = async () => {
	const [row, offices] = await Promise.all([
		loadPage("life-at-aurora", { pageID: PAGE_ID, fields: "id,slug,acf" }),
		getOffices({ first: GRAPHQL_DEFAULT_PAGE_SIZE }),
	]);

	if (!row) return { data: { page: null, offices: offices.data.offices } };

	const acf = row.acf || {};
	const banner = group(acf, "banner");
	const keyAdvantages = group(acf, "keyAdvantages");
	const stats = group(acf, "stats");
	const globalMap = group(acf, "globalMap");
	const collaborationSupport = group(acf, "collaborationSupport");
	const insights = group(acf, "insights");
	const teamAurora = group(acf, "teamAurora");
	const benefits = group(acf, "benefits");

	return {
		data: {
			page: {
				slug: toSlug(row.slug),
				lifeAtAurora: {
					banner: banner
						? {
								title: orNull(banner.title),
								description: wpautop(banner.description),
								videoLink: orNull(banner.video_link),
								buttonText: orNull(banner.button_text),
								buttonLink: orNull(banner.button_link),
								// The CMS field name carries this typo on both sides.
								dekstopimage: toMediaNode(banner.dekstopimage),
								mobileimage: toMediaNode(banner.mobileimage),
							}
						: null,
					keyAdvantages: keyAdvantages
						? {
								title: orNull(keyAdvantages.title),
								description: orNull(keyAdvantages.description),
								tabTitle: orNull(keyAdvantages.tab_title),
								buttonLink: orNull(keyAdvantages.button_link),
								buttonText: orNull(keyAdvantages.button_text),
								accordian:
									toRows(keyAdvantages.accordian)?.map((entry) => ({
										title: orNull(entry.title),
										description: orNull(entry.description),
										buttonLink: orNull(entry.button_link),
										icon: toMediaNode(entry.icon),
									})) ?? null,
							}
						: null,
					stats: stats
						? {
								auroreans: orNull(stats.auroreans),
								nationalities: orNull(stats.nationalities),
							}
						: null,
					globalMap: globalMap
						? { marqueetext: orNull(globalMap.marqueetext) }
						: null,
					collaborationSupport: collaborationSupport
						? {
								list:
									toRows(collaborationSupport.list)?.map((entry) => ({
										description: wpautop(entry.description),
										name: orNull(entry.name),
										icon: toMediaNode(entry.icon),
										image: toMediaNode(entry.image),
									})) ?? null,
							}
						: null,
					insights: insights
						? {
								sectionDesc: orNull(insights.section_desc),
								sectionTitle: orNull(insights.section_title),
							}
						: null,
					insightsSectionButton: mapButton(acf.insights_section_button, {
						withUrl: false,
					}),
					teamAurora: teamAurora
						? {
								teams:
									toRows(teamAurora.teams)?.map((member) => ({
										content: orNull(member.content),
										designation: orNull(member.designation),
										name: orNull(member.name),
										image: toMediaNode(member.image),
									})) ?? null,
							}
						: null,
					benefits: benefits
						? {
								sectionTitle: orNull(benefits.section_title),
								list:
									toRows(benefits.list)?.map((entry) => ({
										desc: orNull(entry.desc),
										title: orNull(entry.title),
										icon: toMediaNode(entry.icon),
									})) ?? null,
							}
						: null,
					middleSectionButton: mapButton(acf.middle_section_button, {
						withUrl: true,
					}),
					topSectionButton: mapButton(acf.top_section_button, { withUrl: true }),
				},
			},
			offices: offices.data.offices,
		},
	};
};
