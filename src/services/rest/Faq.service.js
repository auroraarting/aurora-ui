import { getPageGroup } from "./Single.service";

/**
 * /careers/faq — the `faq` field group on the faq page: a banner plus
 * categories of question/answer rows. No relationship fields, so one call.
 *
 * @returns {Promise<any|null>} what the section previously read as
 *   `res.data.page.faq`
 */
export const getFaqPage = () =>
	getPageGroup("faq", { fields: "id,slug,acf.banner,acf.categories" });
