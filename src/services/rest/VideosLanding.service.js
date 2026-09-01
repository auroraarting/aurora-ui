// Videos landing page content over REST. Same
// `{ data: { page: { videosLanding: … } } }` shape the GraphQL queries returned.
//
// The GraphQL query addressed this page by database id rather than slug, so the
// id is kept here to point at exactly the same page.

import { loadPage, orNull, toMediaNode, toRows, wpautop } from "./GraphqlShape";

const PAGE_ID_NUMBER = 66697;
const PAGE_ID = "/resources/videos";

const mapSocialLinks = (field) =>
	toRows(field)?.map((link) => ({
		url: orNull(link.url),
		logo: toMediaNode(link.logo),
	})) ?? null;

/** Fetch Page */
export const getVideosLandingPage = async () => {
	const row = await loadPage(PAGE_ID_NUMBER, { pageID: PAGE_ID });
	const acf = row?.acf || {};
	const banner = orNull(acf.banner);
	const video = orNull(acf.video);

	return {
		data: {
			page: row
				? {
						videosLanding: {
							banner: banner
								? { desc: orNull(banner.desc), title: orNull(banner.title) }
								: null,
							socialLinks: mapSocialLinks(acf.social_links),
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
export const getVideosLandingPageSocialLinks = async () => {
	const row = await loadPage(PAGE_ID_NUMBER, { pageID: PAGE_ID });
	return {
		data: {
			page: row
				? { videosLanding: { socialLinks: mapSocialLinks(row.acf?.social_links) } }
				: null,
		},
	};
};
