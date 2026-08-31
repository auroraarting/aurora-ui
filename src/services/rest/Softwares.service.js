// Software listing page (/software) content from WordPress over the REST API.
//
// Drop-in replacement for the GraphQL `getSoftwarePage` query: the object this
// returns is field-for-field what GraphQL returned, so `src/app/software/page.js`
// and the sections under it need no changes — same `{ data: { page, softwares } }`
// envelope, same camelCase names, same `{ node: … }` media wrappers and
// `{ nodes: [ … ] }` relation wrappers.
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
// The single-software pages still run on GraphQL (src/services/Softwares.service.js).

import RESTAPI from "../Rest.service";
import {
	GET,
	PER_PAGE,
	asList,
	group,
	loadByIds,
	orNull,
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
} from "./GraphqlShape";

const PAGE_ID = "/software";

/** `featured_image_url` is only populated when `featured_media` is requested
 *  alongside it, and alt text only comes from /media, so logos carry the
 *  attachment id and the media rows are fetched separately. */
const SOFTWARE_FIELDS = "id,slug,title,acf";
const LOGO_FIELDS = "id,featured_media";
const TESTIMONIAL_FIELDS = "id,title,content,acf.designation";

const rest = (path, apiID) => restCall(path, { apiID, pageID: PAGE_ID });

const byIds = (base, ids, fields) =>
	loadByIds(base, ids, fields, { pageID: PAGE_ID });

/** The logos, testimonials and featured-image media referenced by every
 *  software's ACF, fetched in one batched call per type. */
async function loadContext(acfBlocks) {
	const logoIds = [];
	const testimonialIds = [];
	for (const acf of acfBlocks) {
		if (!acf) continue;
		logoIds.push(...toIds(acf.our_client?.select_logos));
		testimonialIds.push(...toIds(acf.our_client?.testimonials));
	}

	const [logos, testimonials] = await Promise.all([
		byIds("clients-logo", logoIds, LOGO_FIELDS),
		byIds("testimonial", testimonialIds, TESTIMONIAL_FIELDS),
	]);

	// Alt text and URLs for the logos' featured images are only knowable once
	// the logos above are in.
	const mediaIds = [];
	for (const logo of logos.values()) {
		if (logo.featured_media) mediaIds.push(logo.featured_media);
	}
	const media = await byIds("media", mediaIds, "id,source_url,alt_text");

	return { logos, testimonials, media };
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

/** The thumbnail selection the listing page asked for — no `primaryColor`. */
function mapThumbnail(acf) {
	const thumbnail = group(acf, "thumbnail");
	if (!thumbnail) return null;
	const gradient = orNull(thumbnail.gradient);
	return {
		banner: toMediaNode(thumbnail.banner),
		logo: toMediaNode(thumbnail.logo),
		gradient: gradient
			? { from: orNull(gradient.from), to: orNull(gradient.to) }
			: null,
		title: orNull(thumbnail.title),
		shortDescription: orNull(thumbnail.short_description),
		spotlightTitle: orNull(thumbnail.spotlight_title),
		spotlightDesc: orNull(thumbnail.spotlight_desc),
	};
}

function mapOurClient(acf, ctx) {
	const ourClient = group(acf, "our_client");
	if (!ourClient) return null;

	const logoIds = toIds(ourClient.select_logos);
	const logos = logoIds
		.map((id) => ctx.logos.get(id))
		.filter(Boolean)
		.map((logo) => ({
			id: toGlobalId(logo.id),
			featuredImage: toFeaturedImage(ctx.media.get(logo.featured_media)),
		}));

	const testimonialIds = toIds(ourClient.testimonials);
	const testimonials = testimonialIds
		.map((id) => ctx.testimonials.get(id))
		.filter(Boolean)
		.map((testimonial) => ({
			id: toGlobalId(testimonial.id),
			content: renderedHtml(testimonial.content),
			title: renderedTitle(testimonial.title),
			testimonials: { designation: orNull(testimonial.acf?.designation) },
		}));

	return {
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
		pageID: `/software/${slug}`,
	});
	return res;
};

/** Fetch the /software landing page: the page's own fields, plus the thumbnail
 *  and client-proof blocks of every software. */
export const getSoftwarePage = async () => {
	const [pageRes, softwaresRes] = await Promise.all([
		rest("/pages?slug=software&_fields=id,slug,title,acf", "pages"),
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
