import { getPageGroup } from "./Single.service";

/**
 * /company/contact — the `contact` field group, which is just the banner.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.contact`
 */
export const getContact = () =>
	getPageGroup("contact", { fields: "id,slug,acf.banner" });
