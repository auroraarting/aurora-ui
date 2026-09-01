// Energy Unplugged listing page content over REST. Same
// `{ data: { page: { energyTalksListing: … } } }` shape the GraphQL queries
// returned. The two exports mirror the two GraphQL queries; both read the same
// page, so the second is served from the build cache rather than a new request.

import { loadPage, orNull, toMediaNode, toRows, wpautop } from "./GraphqlShape";

const SLUG = "energy-talks-listing";
const PAGE_ID = "/resources/energy-unplugged";

/** `socialLinks` repeater → the array GraphQL returned. */
const mapSocialLinks = (field) =>
	toRows(field)?.map((link) => ({
		url: orNull(link.url),
		logo: toMediaNode(link.logo),
	})) ?? null;

/** Fetch Page */
export const getEnergyTalksPage = async () => {
	const row = await loadPage(SLUG, { pageID: PAGE_ID });
	const acf = row?.acf || {};
	const banner = orNull(acf.banner);
	const video = orNull(acf.video);

	return {
		data: {
			page: row
				? {
						energyTalksListing: {
							banner: banner
								? { desc: orNull(banner.desc), title: orNull(banner.title) }
								: null,
							video: video
								? {
										redirectLink: orNull(video.redirect_link),
										// A WYSIWYG field on this page (unlike the plain-text
										// field of the same name on insight-listing).
										sectionDesc: wpautop(video.section_desc),
										videoLink: orNull(video.video_link),
										sectionTitle: orNull(video.section_title),
										iframe: orNull(video.iframe),
										videoThumbnail: toMediaNode(video.video_thumbnail),
									}
								: null,
						},
					}
				: null,
		},
	};
};

/** Fetch Social Links */
export const getEnergyTalksPageSocialLinks = async () => {
	const row = await loadPage(SLUG, { pageID: PAGE_ID });
	return {
		data: {
			page: row
				? {
						energyTalksListing: {
							socialLinks: mapSocialLinks(row.acf?.social_links),
						},
					}
				: null,
		},
	};
};
