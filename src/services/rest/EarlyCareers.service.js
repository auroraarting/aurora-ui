// Early Careers detail page, on core REST instead of WPGraphQL.
//
// The response is shaped to match the GraphQL query byte for byte, so the page
// and its sections need no changes — only the import does.
//
// One request. Every field on this post type is plain ACF except
// `thumbnail.country`, which is a relation the ACF expansion mu-plugin resolves
// inline (`_acf_expand=1`), so the country no longer costs a second call.

import {
	ACF_EXPAND,
	asList,
	group,
	orNull,
	rest,
	renderedTitle,
	expandedTitle,
	toExpanded,
	toGlobalId,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";

// `acf` is asked for whole rather than field by field: these groups are small,
// and naming all eleven would break every time the editor adds one.
const FIELDS = "id,slug,status,title,acf";

/** ACF's snake_case keys differ from the GraphQL field names in three places,
 *  and two of them are not mechanical — the group is literally named
 *  `collaboration_&_support` with an ampersand, and the application process
 *  group uses hyphens where everything else uses underscores. */
const COLLABORATION = "collaboration_&_support";
const APPLICATION_PROCESS = "the-application-process";

/** An ACF true/false field. `orNull` deliberately folds `false` into null,
 *  because an empty ACF image or file arrives as `false` — but a checkbox that
 *  is genuinely off must stay `false`, which is what GraphQL returned. */
const toBool = (value) =>
	value === undefined || value === null ? null : Boolean(value);

/** An ACF date field → the ISO 8601 string WPGraphQL served.
 *
 *  The field's return format is `Ymd`, so REST gives "20250204" where GraphQL
 *  gave "2025-02-04T00:00:00+00:00". Anything that is not eight digits is
 *  passed through untouched rather than guessed at. */
function toIsoDate(value) {
	const raw = orNull(value);
	if (raw === null) return null;
	const match = /^(\d{4})(\d{2})(\d{2})$/.exec(String(raw).trim());
	if (!match) return raw;
	const [, year, month, day] = match;
	return `${year}-${month}-${day}T00:00:00+00:00`;
}

/** An expanded single relation → the `{ node: … }` wrapper GraphQL returned.
 *  `country` is a one-item relation, so GraphQL gave `node`, not `nodes`. */
function toCountryNode(field) {
	const [row] = toExpanded(field);
	if (!row) return null;
	return {
		node: {
			id: toGlobalId(row.id),
			// Core REST escapes titles ("US &amp; Canada"); WPGraphQL decoded them.
			title: expandedTitle(row),
			slug: toSlug(row.slug),
		},
	};
}

/** A repeater whose rows only carry scalars, mapped key by key so a field the
 *  editor adds later cannot silently leak into the response. */
const mapRows = (field, mapRow) => {
	const rows = toRows(field);
	return rows ? rows.map(mapRow) : null;
};

/** The `earlyCareers` ACF group, in the shape the GraphQL query returned. */
function mapEarlyCareers(acf = {}) {
	const banner = group(acf, "banner");
	const careerSeries = group(acf, "career_series");
	const collaboration = group(acf, COLLABORATION);
	const expertise = group(acf, "expertise");
	const expertise2 = group(acf, "expertise_2");
	const insights = group(acf, "insights");
	const keyAdvantages = group(acf, "key_advantages");
	const thumbnail = group(acf, "thumbnail");
	const topSectionButton = group(acf, "top_section_button");
	const workingWithOurTeams = group(acf, "working_with_our_teams");
	const applicationProcess = group(acf, APPLICATION_PROCESS);

	const insightsButton = insights && group(insights, "insights_section_button");
	const applicationTips =
		applicationProcess && group(applicationProcess, "application_tips");

	return {
		banner: banner && {
			city: orNull(banner.city),
			applicationWindow: orNull(banner.application_window),
			commencingIn: orNull(banner.commencing_in),
			programmeDuration: orNull(banner.programme_duration),
			desktop: toMediaNode(banner.desktop),
			mobile: toMediaNode(banner.mobile),
		},
		careerSeries: careerSeries && {
			buttonLink: orNull(careerSeries.button_link),
			buttonText: orNull(careerSeries.button_text),
			iframe: orNull(careerSeries.iframe),
			title: orNull(careerSeries.title),
		},
		collaborationSupport: collaboration && {
			sectionTitle: orNull(collaboration.section_title),
			list: mapRows(collaboration.list, (row) => ({
				desc: wpautop(row.desc),
				bgcolor: orNull(row.bgcolor),
				featuredImg: toMediaNode(row.featured_img),
				icon: toMediaNode(row.icon),
			})),
		},
		expertise: expertise && {
			description: orNull(expertise.description),
			title: orNull(expertise.title),
			expertiseAccordion: mapRows(expertise.expertise_accordion, (row) => ({
				accordionTitle: orNull(row.accordion_title),
			})),
		},
		expertise2: expertise2 && {
			description: orNull(expertise2.description),
			title: orNull(expertise2.title),
			expertiseAccordion: mapRows(expertise2.expertise_accordion, (row) => {
				const popup = group(row, "popup");
				return {
					accordionDescription: orNull(row.accordion_description),
					accordionTitle: orNull(row.accordion_title),
					buttonLink: orNull(row.button_link),
					icon: toMediaNode(row.icon),
					popup: popup && {
						desc: wpautop(popup.desc),
						title: orNull(popup.title),
						list: mapRows(popup.list, (item) => ({
							address: orNull(item.address),
							category: orNull(item.category),
							date: toIsoDate(item.date),
							time: orNull(item.time),
						})),
					},
				};
			}),
		},
		insights: insights && {
			desc: orNull(insights.desc),
			title: orNull(insights.title),
			insightsSectionButton: insightsButton && {
				buttonText: orNull(insightsButton.button_text),
				iframe: orNull(insightsButton.iframe),
				file: toMediaNode(insightsButton.file),
			},
		},
		keyAdvantages: keyAdvantages && {
			buttonText: orNull(keyAdvantages.button_text),
			description: orNull(keyAdvantages.description),
			title: orNull(keyAdvantages.title),
			advantages: mapRows(keyAdvantages.advantages, (row) => ({
				advantagesDescription: orNull(row.advantages_description),
				advantagesTitle: orNull(row.advantages_title),
				icon: toMediaNode(row.icon),
			})),
			buttonLink: orNull(keyAdvantages.button_link),
		},
		thumbnail: thumbnail && {
			islive: toBool(thumbnail.islive),
			thumb: toMediaNode(thumbnail.thumb),
			country: toCountryNode(thumbnail.country),
		},
		topSectionButton: topSectionButton && {
			buttonText: orNull(topSectionButton.button_text),
			iframe: orNull(topSectionButton.iframe),
			url: orNull(topSectionButton.url),
			file: toMediaNode(topSectionButton.file),
		},
		workingWithOurTeams: workingWithOurTeams && {
			buttonLink: orNull(workingWithOurTeams.button_link),
			buttonText: orNull(workingWithOurTeams.button_text),
			sectionDesc: orNull(workingWithOurTeams.section_desc),
			sectionTitle: orNull(workingWithOurTeams.section_title),
			list: mapRows(workingWithOurTeams.list, (row) => ({
				desc: orNull(row.desc),
				title: orNull(row.title),
				icon: toMediaNode(row.icon),
			})),
		},
		theApplicationProcess: applicationProcess && {
			description: orNull(applicationProcess.description),
			title: orNull(applicationProcess.title),
			applicationTips: applicationTips && {
				desc: wpautop(applicationTips.desc),
				list: mapRows(applicationTips.list, (row) => ({
					desc: wpautop(row.desc),
					title: orNull(row.title),
				})),
			},
			expertiseAccordion: mapRows(
				applicationProcess.expertise_accordion,
				(row) => ({
					accordionTitle: orNull(row.accordion_title),
					accordionDesc: orNull(row.accordion_desc),
					icon: toMediaNode(row.icon),
				}),
			),
		},
	};
}

/** One early-career programme by slug.
 *
 *  `earlyCareerBy` is null when no such programme exists, which is what
 *  GraphQL returned and what the route's notFound check expects. */
export const getEarlyCareersInside = async (slug) => {
	const decoded = decodeURIComponent(slug);
	const row =
		asList(
			await rest(
				`/early-career?slug=${encodeURIComponent(decoded)}&_fields=${FIELDS}&${ACF_EXPAND}`,
				{
					apiID: "early-career",
					tags: ["early-career", decoded],
					pageID: `/early-careers/${slug}`,
				},
			),
		)[0] || null;

	return {
		data: {
			earlyCareerBy: row
				? {
						title: renderedTitle(row.title),
						slug: toSlug(row.slug),
						status: orNull(row.status),
						earlyCareers: mapEarlyCareers(row.acf || {}),
					}
				: null,
		},
	};
};
