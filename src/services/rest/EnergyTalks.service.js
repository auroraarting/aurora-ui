import { getPageGroup } from "./Single.service";

/**
 * The /resources/energy-unplugged landing content — the `energyTalksListing`
 * field group on the energy-talks-listing page.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.energyTalksListing`
 */
export const getEnergyTalksPage = () => getPageGroup("energy-talks-listing");

/**
 * Just the social links, which the listing renders in its own section.
 *
 * WPGraphQL returned null for `socialLinks.logo` on this page while the CMS
 * holds real Spotify/Apple/YouTube/Amazon icons, so REST serves images here
 * that were previously empty `<img>` tags.
 *
 * @returns {Promise<{ socialLinks: any }|null>}
 */
export const getEnergyTalksPageSocialLinks = async () => {
	const acf = await getPageGroup("energy-talks-listing", {
		fields: "id,slug,acf.social_links",
	});
	return acf ? { socialLinks: acf.socialLinks ?? null } : null;
};
