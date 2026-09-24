import { getPageGroup } from "./Single.service";

/**
 * /careers/join-us — the `joinUs` field group: a banner and the insights
 * section heading. No relationship fields, so one call.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.joinUs`
 */
export const getJoinUsPage = () =>
	getPageGroup("join-us", { fields: "id,slug,acf.banner,acf.insights" });
