// Software content from WordPress over the REST API — the /software listing
// (`getSoftwarePage`) and the /software/[slug] detail page (`getSingleSoftware`).
//
// Drop-in replacements for the matching GraphQL queries: the objects returned
// are field-for-field what GraphQL returned, so the routes and the sections
// under them need no changes — same envelope, same camelCase names, same
// `{ node: … }` media wrappers and `{ nodes: [ … ] }` relation wrappers.
//
// Three things REST does not hand over the way GraphQL did:
//   * ACF relation fields (client logos, testimonials) arrive as bare post ids,
//     so the referenced posts are fetched in one batched `include=` call per
//     post type rather than one call per row.
//   * Core REST HTML-encodes post titles and percent-encodes non-ASCII slugs
//     where GraphQL returned both readable.
//   * An ACF relation the editor left empty is null in GraphQL, not an empty
//     connection.
//
// `getSingleSoftware` backs the /software/[slug] detail page. The
// language variant (/software/[slug]/[language]) still runs on GraphQL.

import RESTAPI from "../Rest.service";
import {
	ACF_EXPAND,
	GET,
	PER_PAGE,
	asList,
	decodeEntities,
	group,
	loadAll,
	loadByIds,
	orNull,
	orderTermsLikeGraphql,
	renderedTitle,
	rest as restCall,
	toConnection,
	toExpanded,
	expandedTitle,
	toExpandedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toRelation,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";

const PAGE_ID = "/software";

/** `featured_image_url` is only populated when `featured_media` is requested
 *  alongside it, and alt text only comes from /media, so logos carry the
 *  attachment id and the media rows are fetched separately. */
const SOFTWARE_FIELDS = "id,slug,title,acf";
const LOGO_FIELDS = "id,featured_media";
const TESTIMONIAL_FIELDS = "id,title,content,acf.designation";
const POST_FIELDS =
	"id,slug,title,date,content,featured_media,categories,acf.time";

const rest = (path, apiID) => restCall(path, { apiID, pageID: PAGE_ID });

const byIds = (base, ids, fields) =>
	loadByIds(base, ids, fields, { pageID: PAGE_ID });

// Relations (logos, testimonials, case studies, insights) now arrive expanded
// inside the software payload, courtesy of cms/aurora-acf-expand.php, so there is
// no context to assemble and no request per relation. Categories come with each
// expanded post under `terms.category`.

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

function mapButton(field) {
	const button = orNull(field);
	if (!button) return null;
	return {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		url: orNull(button.url),
		file: toMediaNode(button.file),
	};
}

/** The thumbnail group. `primaryColor` is only selected by the detail page's
 *  query, so the listing keeps it out rather than adding a field. */
function mapThumbnail(acf, { withPrimaryColor = false } = {}) {
	const thumbnail = group(acf, "thumbnail");
	if (!thumbnail) return null;
	const gradient = orNull(thumbnail.gradient);
	return {
		banner: toMediaNode(thumbnail.banner),
		logo: toMediaNode(thumbnail.logo),
		gradient: gradient
			? { from: orNull(gradient.from), to: orNull(gradient.to) }
			: null,
		...(withPrimaryColor
			? { primaryColor: orNull(thumbnail.primary_color) }
			: {}),
		title: orNull(thumbnail.title),
		shortDescription: orNull(thumbnail.short_description),
		spotlightTitle: orNull(thumbnail.spotlight_title),
		spotlightDesc: orNull(thumbnail.spotlight_desc),
	};
}

// --- detail page only -------------------------------------------------------

/** An expanded post's terms, as GraphQL listed them: by name, ties broken by
 *  descending id. They arrive with the post under `terms.category`, so naming
 *  them costs no extra request. */
function mapCategories(post) {
	const terms = orderTermsLikeGraphql(
		[...(post.terms?.category || [])].sort((a, b) =>
			String(a.name).localeCompare(String(b.name)),
		),
	);
	return toConnection(
		terms.map((term) => ({
			slug: toSlug(term.slug),
			name: decodeEntities(term.name),
		})),
	);
}

/** A case study, as the `caseStudy` relation returned it. */
function mapCaseStudyNode(post) {
	return {
		id: toGlobalId(post.id),
		title: expandedTitle(post),
		slug: toSlug(post.slug),
		content: orNull(post.content),
		date: post.date,
		categories: mapCategories(post),
		postFields: { time: orNull(post.acf?.time) },
		featuredImage: toExpandedImage(post),
	};
}

/** An insight, whose selection is narrower than a case study's. */
function mapInsightNode(post) {
	return {
		id: toGlobalId(post.id),
		title: expandedTitle(post),
		slug: toSlug(post.slug),
		postFields: { time: orNull(post.acf?.time) },
		categories: mapCategories(post),
		date: post.date,
	};
}

function mapAvailableRegions(acf) {
	const regions = group(acf, "available_regions");
	if (!regions) return null;
	return {
		marqueeText: orNull(regions.marquee_text),
		tabTitle: orNull(regions.tab_title),
	};
}

function mapBanner(acf) {
	const banner = group(acf, "banner");
	if (!banner) return null;
	const videos = toRows(banner.videos);
	return {
		logo: toMediaNode(banner.logo),
		buttonText: orNull(banner.button_text),
		buttonLink: orNull(banner.button_link),
		description: wpautop(banner.description),
		title: orNull(banner.title),
		vimeoLink: orNull(banner.vimeo_link),
		videos:
			videos?.map((video) => ({
				videoType: orNull(video.video_type),
				videoFile: toMediaNode(video.video_file, { withMimeType: true }),
				vimeoLink: orNull(video.vimeo_link),
				youtubeLink: orNull(video.youtube_link),
			})) ?? null,
		desktopThumbnail: toMediaNode(banner.desktop_thumbnail),
		mobileThumbnail: toMediaNode(banner.mobile_thumbnail),
	};
}

function mapCaseStudy(acf) {
	const caseStudy = group(acf, "case_study");
	if (!caseStudy) return null;
	const ids = toIds(caseStudy.select_case_studies);
	return {
		tabTitle: orNull(caseStudy.tab_title),
		title: orNull(caseStudy.title),
		selectCaseStudies: toRelation(
			ids,
			toExpanded(caseStudy.select_case_studies).map(mapCaseStudyNode),
		),
	};
}

/** `expertSupport` and `benefits` share one shape; `sectionTitle` is WYSIWYG
 *  on both. */
function mapIconList(acf, key) {
	const section = group(acf, key);
	if (!section) return null;
	const list = toRows(section.list);
	return {
		sectionTitle: wpautop(section.section_title),
		image: toMediaNode(section.image),
		list:
			list?.map((row) => ({
				title: orNull(row.title),
				description: orNull(row.description),
				logo: toMediaNode(row.logo),
			})) ?? null,
	};
}

/** `expertise` and `whatSetsUsApart` share one shape; only `expertise` selected
 *  `buttonText` on its accordion rows. */
function mapAccordionSection(acf, key, { withButtonText }) {
	const section = group(acf, key);
	if (!section) return null;
	const rows = toRows(section.expertise_accordion);
	return {
		description: orNull(section.description),
		tabTitle: orNull(section.tab_title),
		title: orNull(section.title),
		expertiseAccordion:
			rows?.map((row) => ({
				accordionDescription: orNull(row.accordion_description),
				accordionTitle: orNull(row.accordion_title),
				buttonLink: orNull(row.button_link),
				...(withButtonText ? { buttonText: orNull(row.button_text) } : {}),
				icon: toMediaNode(row.icon),
			})) ?? null,
	};
}

function mapIntroduction(acf) {
	const introduction = group(acf, "introduction");
	if (!introduction) return null;
	return {
		description: orNull(introduction.description),
		tabTitle: orNull(introduction.tab_title),
		title: wpautop(introduction.title),
		image: toMediaNode(introduction.image),
		lottie: toMediaNode(introduction.lottie),
	};
}

function mapKeyAdvantages(acf) {
	const advantages = group(acf, "keyAdvantages");
	if (!advantages) return null;
	const rows = toRows(advantages.advantages);
	return {
		desciption: orNull(advantages.desciption),
		tabTitle: orNull(advantages.tab_title),
		title: orNull(advantages.title),
		buttonLink: orNull(advantages.button_link),
		buttonText: orNull(advantages.button_text),
		advantages:
			rows?.map((row) => ({
				advantagesTitle: orNull(row.advantages_title),
				advantagesDescription: orNull(row.advantages_description),
				icon: toMediaNode(row.icon),
			})) ?? null,
	};
}

function mapMap(acf) {
	const map = group(acf, "map");
	if (!map) return null;
	return {
		marquee: orNull(map.marquee),
		headerLogo: toMediaNode(map.header_logo),
	};
}

function mapFourStepProcess(acf) {
	const process = group(acf, "4_step_process");
	if (!process) return null;
	const steps = toRows(process.process);
	return {
		buttonLink: orNull(process.button_link),
		description: orNull(process.description),
		processTitle: orNull(process.process_title),
		tabTitle: orNull(process.tab_title),
		process:
			steps?.map((step) => {
				const details = toRows(step.process_details);
				return {
					image: toMediaNode(step.image),
					video: toMediaNode(step.video),
					processDetails:
						details?.map((detail) => ({
							description: orNull(detail.description),
						})) ?? null,
				};
			}) ?? null,
	};
}

function mapInsights(acf, { extended = false } = {}) {
	const insights = group(acf, "insights");
	if (!insights) return null;
	const ids = toIds(insights.list);
	return {
		sectionDesc: orNull(insights.section_desc),
		sectionTitle: orNull(insights.section_title),
		// Only the language query selected these two.
		...(extended
			? {
					insightsTitle: orNull(insights.insights_title),
					listButtonText: orNull(insights.list_button_text),
				}
			: {}),
		list: toRelation(ids, toExpanded(insights.list).map(mapInsightNode)),
	};
}

/** `integratedSystem` — selected only by the language query. */
function mapIntegratedSystem(acf) {
	const system = group(acf, "integrated_system");
	if (!system) return null;
	return {
		tabTitle: orNull(system.tab_title),
		desc: wpautop(system.desc),
		buttonText: orNull(system.button_text),
		buttonLink: orNull(system.button_link),
	};
}

/** The whole `softwares` field group.
 *
 *  `extended` adds the fields only the language route's query asked for
 *  (`ourClient.tabTitle`, two extra `insights` fields, `integratedSystem`).
 *  `withTranslations` adds the per-node `translations` arrays that route's merge
 *  reads. `withShowTranslation` is off inside a `translations[]` entry, whose
 *  sub-query never selected it. */
function mapSoftwares(acf, { extended = false, withShowTranslation = true } = {}) {
	if (!acf) return null;
	return {
		...(withShowTranslation
			? { showTranslation: acf.show_translation ?? null }
			: {}),
		thumbnail: mapThumbnail(acf, { withPrimaryColor: true }),
		ourClient: mapOurClient(acf, { withTabTitle: extended }),
		availableRegions: mapAvailableRegions(acf),
		banner: mapBanner(acf),
		caseStudy: mapCaseStudy(acf),
		expertSupport: mapIconList(acf, "expert_support"),
		benefits: mapIconList(acf, "benefits"),
		expertise: mapAccordionSection(acf, "expertise", { withButtonText: true }),
		whatSetsUsApart: mapAccordionSection(acf, "what_sets_us_apart", {
			withButtonText: false,
		}),
		introduction: mapIntroduction(acf),
		keyAdvantages: mapKeyAdvantages(acf),
		map: mapMap(acf),
		whyAurora: mapWhyAurora(acf),
		fourStepProcess: mapFourStepProcess(acf),
		topSectionButton: mapButton(acf.top_section_button),
		middleSectionButton: mapButton(acf.middle_section_button),
		stepsSectionButton: mapButton(acf.steps_section_button),
		insightsSectionButton: mapButton(acf.insights_section_button),
		insights: mapInsights(acf, { extended }),
		...(extended ? { integratedSystem: mapIntegratedSystem(acf) } : {}),
	};
}

function mapOurClient(acf, { withTabTitle = false } = {}) {
	const ourClient = group(acf, "our_client");
	if (!ourClient) return null;

	const logoIds = toIds(ourClient.select_logos);
	const logos = toExpanded(ourClient.select_logos).map((logo) => ({
		id: toGlobalId(logo.id),
		featuredImage: toExpandedImage(logo),
	}));

	const testimonialIds = toIds(ourClient.testimonials);
	const testimonials = toExpanded(ourClient.testimonials).map((testimonial) => ({
		id: toGlobalId(testimonial.id),
		content: orNull(testimonial.content),
		title: expandedTitle(testimonial),
		testimonials: { designation: orNull(testimonial.acf?.designation) },
	}));

	return {
		// Only the language query selected `tabTitle`.
		...(withTabTitle ? { tabTitle: orNull(ourClient.tab_title) } : {}),
		selectLogos: toRelation(logoIds, logos),
		testimonials: toRelation(testimonialIds, testimonials),
	};
}

function mapWhyAurora(acf) {
	const whyAurora = group(acf, "why_aurora");
	if (!whyAurora) return null;
	const list = toRows(whyAurora.list);
	return {
		endPoint: orNull(whyAurora.end_point),
		description: orNull(whyAurora.description),
		endText: orNull(whyAurora.end_text),
		startText: orNull(whyAurora.start_text),
		title: orNull(whyAurora.title),
		list:
			list?.map((row) => ({
				caption: orNull(row.caption),
				description: orNull(row.description),
				title: orNull(row.title),
				value: orNull(row.value),
			})) ?? null,
	};
}

function mapSoftwareLanding(acf) {
	const banner = group(acf, "banner");
	const insights = group(acf, "insights");
	return {
		banner: banner
			? { title: orNull(banner.title), description: orNull(banner.description) }
			: null,
		mapMarquee: orNull(acf.map_marquee),
		// The field name carries the typo the CMS shipped with, on both sides.
		inisghtsSectionButton: mapButton(acf.inisghts_section_button),
		insights: insights
			? {
					sectionDesc: orNull(insights.section_desc),
					sectionTitle: orNull(insights.section_title),
				}
			: null,
		whyAurora: mapWhyAurora(acf),
	};
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Fetch All Softwares */
export const getALLSoftware = async (slug) => {
	const res = await RESTAPI("/softwares", {
		...GET,
		apiID: "softwares",
		tags: ["software", decodeURIComponent(slug)],
		pageID: `/software/${slug}`,
	});
	return res;
};

/** Fetch the /software landing page: the page's own fields, plus the thumbnail
 *  and client-proof blocks of every software. */
export const getSoftwarePage = async () => {
	const [pageRes, softwaresRes] = await Promise.all([
		rest("/pages?slug=software&_fields=id,slug,title,acf", {
			apiID: "pages",
			pageID: "/software",
		}),
		rest(
			`/softwares?per_page=${PER_PAGE}&_fields=${SOFTWARE_FIELDS}&${ACF_EXPAND}`,
			{ apiID: "softwares", pageID: "/software" },
		),
	]);

	const pageRow = asList(pageRes)[0] || null;
	const softwares = asList(softwaresRes);
	return {
		data: {
			page: pageRow
				? {
						title: renderedTitle(pageRow.title),
						slug: toSlug(pageRow.slug),
						softwareLanding: mapSoftwareLanding(pageRow.acf || {}),
					}
				: null,
			softwares: toConnection(
				softwares.map((software) => ({
					title: renderedTitle(software.title),
					slug: toSlug(software.slug),
					softwares: software.acf
						? {
								thumbnail: mapThumbnail(software.acf),
								ourClient: mapOurClient(software.acf),
							}
						: null,
				})),
			),
		},
	};
};

/** The countries list, ordered by title the way the query asked for.
 *
 *  The language query also selected each country's translated titles — every
 *  translation, not only the requested language — so those are fetched one
 *  batched call per language. */
async function getCountries({ withTranslations = false } = {}) {
	const rows = await loadAll(
		"country",
		`orderby=title&order=asc&_fields=id,slug,title${withTranslations ? ",translations" : ""}`,
		{ apiID: "country", pageID: PAGE_ID },
	);

	if (!withTranslations) {
		return toConnection(
			rows.map((row) => ({
				title: renderedTitle(row.title),
				slug: toSlug(row.slug),
			})),
		);
	}

	const byId = new Map(rows.map((row) => [row.id, row]));
	const { byId: translated } = await loadTranslated(byId, "country", "id,title");

	return toConnection(
		rows.map((row) => ({
			title: renderedTitle(row.title),
			slug: toSlug(row.slug),
			translations: (row.translations || []).map((translation) => ({
				title: renderedTitle(translated.get(translation.id)?.title),
			})),
		})),
	);
}

/** Fetch one software's detail page (/software/[slug]).
 *
 *  `translations` carries only the WPML language details here — the detail page
 *  reads nothing else from it, using `language.language_code` to decide which
 *  entries the language switcher offers. It comes from the `translations` REST
 *  field added by cms/aurora-wpml-rest-translations.php; without that plugin the
 *  field is absent and the switcher simply offers no translations. */
export const getSingleSoftware = async (slug) => {
	const decoded = decodeURIComponent(slug);
	const software =
		asList(
			await rest(
				`/softwares?slug=${encodeURIComponent(decoded)}&_fields=${SOFTWARE_FIELDS},translations&${ACF_EXPAND}`,
				{
					apiID: "softwares",
					pageID: `/software/${slug}`,
					tags: ["software", decoded],
				},
			),
		)[0] || null;

	const countries = await getCountries();

	return {
		data: {
			countries,
			softwareBy: software
				? {
						title: renderedTitle(software.title),
						slug: toSlug(software.slug),
						translations: (software.translations || []).map((translation) => ({
							language: translation.language,
						})),
						softwares: mapSoftwares(software.acf),
					}
				: null,
		},
	};
};

// `getSingleSoftwareByLanguage` is intentionally absent. The language route needs
// each relation's WPML *translation*, which one-level ACF expansion does not
// reach — resolving it still costs a request per language per relation type, so
// /software/[slug]/[language] stays on the GraphQL service.
