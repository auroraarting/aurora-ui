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
	GET,
	PER_PAGE,
	asList,
	decodeEntities,
	group,
	loadAll,
	loadByIds,
	orNull,
	orderTermsLikeGraphql,
	renderedHtml,
	renderedTitle,
	rest as restCall,
	toConnection,
	toFeaturedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toRelation,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";
import { entryTag, restTag } from "../CacheTags";

const PAGE_ID = "/software";

/** `featured_image_url` is only populated when `featured_media` is requested
 *  alongside it, and alt text only comes from /media, so logos carry the
 *  attachment id and the media rows are fetched separately. */
const SOFTWARE_FIELDS = "id,slug,title,acf";
const LOGO_FIELDS = "id,featured_media";
const TESTIMONIAL_FIELDS = "id,title,content,acf.designation";
const POST_FIELDS =
	"id,slug,title,date,content,featured_media,categories,acf.time";

/** `tag` defaults to the collection the path reads; single-entry calls pass
 *  their own so one software's save does not drop every software page. */
const rest = (path, apiID, tag) =>
	restCall(path, { apiID, pageID: PAGE_ID, tag: tag ?? restTag(apiID) });

const byIds = (base, ids, fields) =>
	loadByIds(base, ids, fields, { pageID: PAGE_ID });

/** The logos, testimonials, posts and featured-image media referenced by a set
 *  of software ACF blocks, fetched in one batched call per type.
 *
 *  `withPosts` pulls in the case studies and insights the detail page lists;
 *  the listing page's query never asked for them. */
async function loadContext(
	acfBlocks,
	{ withPosts = false, withTranslations = false } = {},
) {
	const t = withTranslations ? ",translations" : "";
	const logoIds = [];
	const testimonialIds = [];
	const postIds = [];
	for (const acf of acfBlocks) {
		if (!acf) continue;
		logoIds.push(...toIds(acf.our_client?.select_logos));
		testimonialIds.push(...toIds(acf.our_client?.testimonials));
		if (withPosts) {
			postIds.push(...toIds(acf.case_study?.select_case_studies));
			postIds.push(...toIds(acf.insights?.list));
		}
	}

	const [logos, testimonials, posts] = await Promise.all([
		byIds("clients-logo", logoIds, LOGO_FIELDS + t),
		byIds("testimonial", testimonialIds, TESTIMONIAL_FIELDS + t),
		withPosts
			? byIds("posts", postIds, POST_FIELDS + t)
			: Promise.resolve(new Map()),
	]);

	// Featured images and the names behind a post's category ids are only
	// knowable once the rows above are in.
	const mediaIds = [];
	const categoryIds = [];
	for (const logo of logos.values()) {
		if (logo.featured_media) mediaIds.push(logo.featured_media);
	}
	for (const post of posts.values()) {
		if (post.featured_media) mediaIds.push(post.featured_media);
		categoryIds.push(...(post.categories || []));
	}

	const [media, categories] = await Promise.all([
		byIds("media", mediaIds, "id,source_url,alt_text"),
		categoryIds.length
			? loadAll(
					"categories",
					`include=${[...new Set(categoryIds)].join(",")}&_fields=id,slug,name${t}`,
					{ apiID: "categories", tag: "category", pageID: PAGE_ID },
				).then((rows) => new Map(rows.map((row) => [row.id, row])))
			: Promise.resolve(new Map()),
	]);

	if (!withTranslations) {
		return { logos, testimonials, posts, media, categories };
	}

	// The translated counterparts of everything above, one batched call per type
	// per language. Keyed by the *translated* id, which is what the
	// `translations` field on each default-language row hands back.
	const [logoTr, testimonialTr, postTr, categoryTr] = await Promise.all([
		loadTranslated(logos, "clients-logo", LOGO_FIELDS),
		loadTranslated(testimonials, "testimonial", TESTIMONIAL_FIELDS),
		loadTranslated(posts, "posts", POST_FIELDS),
		loadTranslated(categories, "categories", "id,slug,name"),
	]);

	// A translated row's featured image is a *different* attachment, visible only
	// in that row's own language — so these are grouped by language rather than
	// fetched in one call.
	const mediaIdsByLanguage = new Map();
	for (const bundle of [logoTr, postTr]) {
		for (const [id, row] of bundle.byId) {
			if (!row.featured_media) continue;
			const code = bundle.languageOf.get(id);
			if (!mediaIdsByLanguage.has(code)) mediaIdsByLanguage.set(code, []);
			mediaIdsByLanguage.get(code).push(row.featured_media);
		}
	}
	await Promise.all(
		[...mediaIdsByLanguage].map(async ([code, ids]) => {
			const found = await loadByIds("media", ids, "id,source_url,alt_text", {
				apiID: "media",
				tag: "media",
				pageID: PAGE_ID,
				language: code,
			});
			for (const [id, row] of found) media.set(id, row);
		}),
	);

	return {
		logos,
		testimonials,
		posts,
		media,
		categories,
		translatedLogos: logoTr.byId,
		translatedTestimonials: testimonialTr.byId,
		translatedPosts: postTr.byId,
		translatedCategories: categoryTr.byId,
	};
}

/** Every translation of the given rows, batched one call per language.
 *
 *  Returns the rows keyed by their translated id, plus which language each one
 *  came from — the caller needs that to fetch a translated row's own
 *  attachments, which WPML duplicates per language and which are therefore
 *  invisible from the default language context.
 *
 *  Translated rows only exist inside their own language, which is what
 *  `language` on the loader switches to. */
async function loadTranslated(rows, base, fields) {
	const idsByLanguage = new Map();
	for (const row of rows.values()) {
		for (const translation of row.translations || []) {
			const code = translation.language?.code;
			if (!code) continue;
			if (!idsByLanguage.has(code)) idsByLanguage.set(code, []);
			idsByLanguage.get(code).push(translation.id);
		}
	}
	const byId = new Map();
	const languageOf = new Map();
	await Promise.all(
		[...idsByLanguage].map(async ([code, ids]) => {
			const found = await loadByIds(base, ids, fields, {
				apiID: base,
				tag: restTag(base),
				pageID: PAGE_ID,
				language: code,
			});
			for (const [id, row] of found) {
				byId.set(id, row);
				languageOf.set(id, code);
			}
		}),
	);
	return { byId, languageOf };
}

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

/** A post's terms as GraphQL listed them: by name, ties broken by descending id.
 *
 *  `withTranslations` adds the translated `{ slug, name }` pairs. Note the
 *  GraphQL query selected no `language` inside those, which is why the
 *  `alternateName` lookup in the language merge never matches — kept as-is
 *  rather than quietly changed. */
function mapCategories(post, ctx, { withTranslations = false } = {}) {
	const terms = orderTermsLikeGraphql(
		(post.categories || [])
			.map((id) => ctx.categories.get(id))
			.filter(Boolean)
			.sort((a, b) => String(a.name).localeCompare(String(b.name))),
	);
	return toConnection(
		terms.map((term) => {
			const node = {
				slug: toSlug(term.slug),
				name: decodeEntities(term.name),
			};
			if (withTranslations) {
				node.translations = (term.translations || []).map((translation) => {
					const row = ctx.translatedCategories?.get(translation.id);
					return {
						slug: row ? toSlug(row.slug) : null,
						name: row ? decodeEntities(row.name) : null,
					};
				});
			}
			return node;
		}),
	);
}

/** The translated fields of a case study, as its `translations` entry carried. */
function mapCaseStudyTranslation(translation, ctx) {
	const row = ctx.translatedPosts?.get(translation.id);
	return {
		language: translation.language,
		title: row ? renderedTitle(row.title) : null,
		slug: row ? toSlug(row.slug) : null,
		content: row ? renderedHtml(row.content) : null,
		date: row ? row.date : null,
		featuredImage: row
			? toFeaturedImage(ctx.media.get(row.featured_media))
			: null,
		postFields: { time: row ? orNull(row.acf?.time) : null },
	};
}

/** The translated fields of an insight — a narrower selection. */
function mapInsightTranslation(translation, ctx) {
	const row = ctx.translatedPosts?.get(translation.id);
	return {
		language: translation.language,
		slug: row ? toSlug(row.slug) : null,
		title: row ? renderedTitle(row.title) : null,
		date: row ? row.date : null,
		postFields: { time: row ? orNull(row.acf?.time) : null },
	};
}

/** A case study, as the `caseStudy` relation returned it. */
function mapCaseStudyNode(post, ctx, { withTranslations = false } = {}) {
	const node = {
		id: toGlobalId(post.id),
		title: renderedTitle(post.title),
		slug: toSlug(post.slug),
		content: renderedHtml(post.content),
		date: post.date,
		categories: mapCategories(post, ctx, { withTranslations }),
		postFields: { time: orNull(post.acf?.time) },
		featuredImage: toFeaturedImage(ctx.media.get(post.featured_media)),
	};
	if (withTranslations) {
		node.translations = (post.translations || []).map((translation) =>
			mapCaseStudyTranslation(translation, ctx),
		);
	}
	return node;
}

/** An insight, whose selection is narrower than a case study's. */
function mapInsightNode(post, ctx, { withTranslations = false } = {}) {
	const node = {
		id: toGlobalId(post.id),
		title: renderedTitle(post.title),
		slug: toSlug(post.slug),
		postFields: { time: orNull(post.acf?.time) },
		categories: mapCategories(post, ctx, { withTranslations }),
		date: post.date,
	};
	if (withTranslations) {
		node.translations = (post.translations || []).map((translation) =>
			mapInsightTranslation(translation, ctx),
		);
	}
	return node;
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
				videofile: toMediaNode(video.video_file, { withMimeType: true }),
				vimeoLink: orNull(video.vimeo_link),
				youtubeLink: orNull(video.youtube_link),
			})) ?? null,
		desktopThumbnail: toMediaNode(banner.desktop_thumbnail),
		mobileThumbnail: toMediaNode(banner.mobile_thumbnail),
	};
}

function mapCaseStudy(acf, ctx, options = {}) {
	const caseStudy = group(acf, "case_study");
	if (!caseStudy) return null;
	const ids = toIds(caseStudy.select_case_studies);
	return {
		tabTitle: orNull(caseStudy.tab_title),
		title: orNull(caseStudy.title),
		selectCaseStudies: toRelation(
			ids,
			ids
				.map((id) => ctx.posts.get(id))
				.filter(Boolean)
				.map((post) => mapCaseStudyNode(post, ctx, options)),
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

function mapInsights(
	acf,
	ctx,
	{ extended = false, withTranslations = false } = {},
) {
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
		list: toRelation(
			ids,
			ids
				.map((id) => ctx.posts.get(id))
				.filter(Boolean)
				.map((post) => mapInsightNode(post, ctx, { withTranslations })),
		),
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
function mapSoftwares(
	acf,
	ctx,
	{
		extended = false,
		withTranslations = false,
		withShowTranslation = true,
	} = {},
) {
	if (!acf) return null;
	return {
		...(withShowTranslation
			? { showTranslation: acf.show_translation ?? null }
			: {}),
		thumbnail: mapThumbnail(acf, { withPrimaryColor: true }),
		ourClient: mapOurClient(acf, ctx, {
			withTabTitle: extended,
			withTranslations,
		}),
		availableRegions: mapAvailableRegions(acf),
		banner: mapBanner(acf),
		caseStudy: mapCaseStudy(acf, ctx, { withTranslations }),
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
		insights: mapInsights(acf, ctx, { extended, withTranslations }),
		...(extended ? { integratedSystem: mapIntegratedSystem(acf) } : {}),
	};
}

function mapOurClient(
	acf,
	ctx,
	{ withTabTitle = false, withTranslations = false } = {},
) {
	const ourClient = group(acf, "our_client");
	if (!ourClient) return null;

	const logoIds = toIds(ourClient.select_logos);
	const logos = logoIds
		.map((id) => ctx.logos.get(id))
		.filter(Boolean)
		.map((logo) => {
			const node = {
				id: toGlobalId(logo.id),
				featuredImage: toFeaturedImage(ctx.media.get(logo.featured_media)),
			};
			if (withTranslations) {
				node.translations = (logo.translations || []).map((translation) => {
					const row = ctx.translatedLogos?.get(translation.id);
					return {
						language: translation.language,
						featuredImage: row
							? toFeaturedImage(ctx.media.get(row.featured_media))
							: null,
					};
				});
			}
			return node;
		});

	const testimonialIds = toIds(ourClient.testimonials);
	const testimonials = testimonialIds
		.map((id) => ctx.testimonials.get(id))
		.filter(Boolean)
		.map((testimonial) => {
			const node = {
				id: toGlobalId(testimonial.id),
				content: renderedHtml(testimonial.content),
				title: renderedTitle(testimonial.title),
				testimonials: { designation: orNull(testimonial.acf?.designation) },
			};
			if (withTranslations) {
				node.translations = (testimonial.translations || []).map((translation) => {
					const row = ctx.translatedTestimonials?.get(translation.id);
					return {
						language: translation.language,
						content: row ? renderedHtml(row.content) : null,
						title: row ? renderedTitle(row.title) : null,
						testimonials: {
							designation: row ? orNull(row.acf?.designation) : null,
						},
					};
				});
			}
			return node;
		});

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
		tag: "software",
		pageID: `/software/${slug}`,
	});
	return res;
};

/** Fetch the /software landing page: the page's own fields, plus the thumbnail
 *  and client-proof blocks of every software. */
export const getSoftwarePage = async () => {
	const [pageRes, softwaresRes] = await Promise.all([
		rest(
			"/pages?slug=software&_fields=id,slug,title,acf",
			"pages",
			"page:software",
		),
		rest(
			`/softwares?per_page=${PER_PAGE}&_fields=${SOFTWARE_FIELDS}`,
			"softwares",
		),
	]);

	const pageRow = asList(pageRes)[0] || null;
	const softwares = asList(softwaresRes);
	const ctx = await loadContext(softwares.map((software) => software.acf));

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
								ourClient: mapOurClient(software.acf, ctx),
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
		{ apiID: "country", tag: "country", pageID: PAGE_ID },
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
				`/softwares?slug=${encodeURIComponent(decoded)}&_fields=${SOFTWARE_FIELDS},translations`,
				"softwares",
				entryTag("software", decoded),
			),
		)[0] || null;

	const [countries, ctx] = await Promise.all([
		getCountries(),
		loadContext([software?.acf], { withPosts: true }),
	]);

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
						softwares: mapSoftwares(software.acf, ctx),
					}
				: null,
		},
	};
};

/** Fetch one software's detail page in a given language
 *  (/software/[slug]/[language]).
 *
 *  Builds the same object the GraphQL query produced — including each
 *  translation's own full `softwares` group and the per-node `translations`
 *  arrays — and then runs the original merge over it untouched, so the routes
 *  receive exactly what they received before, quirks included. */
export const getSingleSoftwareByLanguage = async (slug, language) => {
	const decoded = decodeURIComponent(slug);
	const software =
		asList(
			await rest(
				`/softwares?slug=${encodeURIComponent(decoded)}&_fields=${SOFTWARE_FIELDS},translations`,
				"softwares",
				entryTag("software", decoded),
			),
		)[0] || null;

	const [countries, ctx] = await Promise.all([
		getCountries({ withTranslations: true }),
		loadContext([software?.acf], { withPosts: true, withTranslations: true }),
	]);

	if (!software) return { data: { countries, softwareBy: null } };

	// Each translation of the software itself, with its own related entities —
	// a Japanese software post references Japanese logos, posts and terms.
	const softwareTranslations = software.translations || [];
	const bundles = new Map();
	for (const translation of softwareTranslations) {
		const code = translation.language?.code;
		if (!code || bundles.has(code)) continue;
		const rows = await loadByIds(
			"softwares",
			softwareTranslations
				.filter((other) => other.language?.code === code)
				.map((other) => other.id),
			SOFTWARE_FIELDS,
			{ apiID: "softwares", tag: "software", pageID: PAGE_ID, language: code },
		);
		const translatedCtx = await loadContext(
			[...rows.values()].map((row) => row.acf),
			{ withPosts: true },
		);
		bundles.set(code, { rows, ctx: translatedCtx });
	}

	const res = {
		data: {
			countries,
			softwareBy: {
				title: renderedTitle(software.title),
				slug: toSlug(software.slug),
				softwares: mapSoftwares(software.acf, ctx, {
					extended: true,
					withTranslations: true,
				}),
				translations: softwareTranslations.map((translation) => {
					const bundle = bundles.get(translation.language?.code);
					const row = bundle?.rows?.get(translation.id);
					return {
						language: translation.language,
						title: row ? renderedTitle(row.title) : null,
						// A translation's sub-query selected neither `showTranslation`
						// nor any nested `translations`.
						softwares: row
							? mapSoftwares(row.acf, bundle.ctx, {
									extended: true,
									withShowTranslation: false,
								})
							: null,
					};
				}),
			},
		},
	};

	// ---- unchanged from the GraphQL implementation ----
	// Kept byte-for-byte so the object the route receives is the same one it
	// received before. It reads the requested language's `softwares` as the base,
	// then writes the default-language relation nodes back over it.

	let newRes =
		res?.data?.softwareBy?.translations?.filter(
			(countryItem) => countryItem.language.code === language,
		)[0] || res?.data?.softwareBy;

	if (res?.data?.softwareBy?.softwares?.ourClient?.testimonials?.nodes) {
		newRes.softwares.ourClient.testimonials.nodes =
			res?.data?.softwareBy.softwares.ourClient.testimonials.nodes.map((item) => {
				const dataByLang = item.translations.filter(
					(item2) => item2.language.language_code === language,
				)?.[0];
				return { ...item, ...dataByLang };
			});
	}
	if (res?.data?.softwareBy?.softwares?.ourClient?.selectLogos?.nodes) {
		newRes.softwares.ourClient.selectLogos.nodes =
			res?.data?.softwareBy.softwares.ourClient.selectLogos.nodes?.map((item) => {
				return {
					...item,
					featuredImage: {
						node:
							item?.featuredImage?.node?.translations?.filter(
								(item2) => item2?.language.code === language,
							)?.[0] || item?.featuredImage?.node,
					},
				};
			});
	}

	if (res?.data?.softwareBy?.softwares?.insights?.list?.nodes) {
		newRes.softwares.insights.list = {
			nodes: res.data.softwareBy.softwares.insights.list.nodes?.map((item) => {
				if (item?.translations?.length === 0) {
					return item;
				}
				let temp1 =
					item?.translations?.filter(
						(item2) => item2?.language?.language_code === language,
					)?.[0] || [];
				return {
					...item,
					...temp1,
					categories: {
						nodes: item?.categories?.nodes?.map((item3) => ({
							...item3,
							alternateName: item3?.translations?.filter(
								(item4) => item4?.language?.language_code === language,
							)?.[0]?.name,
						})),
					},
				};
			}),
		};
	}

	if (res?.data?.softwareBy?.softwares?.caseStudy?.selectCaseStudies?.nodes) {
		newRes.softwares.caseStudy.selectCaseStudies.nodes =
			res?.data?.softwareBy.softwares.caseStudy.selectCaseStudies.nodes.map(
				(item) => {
					const dataByLang = item.translations.filter(
						(item2) => item2.language.language_code === language,
					)?.[0];
					return { ...item, ...dataByLang };
				},
			);
	}

	const newObj = {
		data: {
			countries: res.data.countries,
			softwareBy: {
				...res.data.softwareBy,
				...newRes,
			},
		},
	};

	return newObj;
};
