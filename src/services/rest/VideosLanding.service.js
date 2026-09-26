import { getPageGroupById } from "./Single.service";

/**
 * The /resources/videos landing content.
 *
 * The page is addressed by database id, not slug, exactly as the GraphQL
 * service did.
 *
 * NOTE: that id is stale. `page(id: 66697, idType: DATABASE_ID)` returns null
 * from WPGraphQL today, so the banner, video and social-link sections on
 * /resources/videos are already rendering empty in production. The live page is
 * slug `videos` / id 72006, which holds the full banner, video, featured and
 * social_links groups. That is left alone here because pointing at it would
 * make three sections appear that are absent today — a content change, not a
 * conversion. Switch `videosLandingPageId` to 72006 (or use getPageGroup
 * ("videos")) when that is wanted.
 */
const videosLandingPageId = 66697;

/**
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.videosLanding` — null while the id above is stale
 */
export const getVideosLandingPage = () => getPageGroupById(videosLandingPageId);

/**
 * Just the social links, for the footer of the energy-talks pages.
 * @returns {Promise<{ socialLinks: any }|null>}
 */
export const getVideosLandingPageSocialLinks = async () => {
	const acf = await getPageGroupById(videosLandingPageId, {
		fields: "id,slug,acf.social_links",
	});
	return acf ? { socialLinks: acf.socialLinks ?? null } : null;
};
