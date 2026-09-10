import { getPageContent } from "./Single.service";

/**
 * The routes that render nothing but a page's title and content.
 *
 * These need no ACF at all, so they are the one group of pages whose
 * conversion cannot be affected by whether a field group is exposed to REST.
 * The GraphQL services each held their own near-identical query; here they are
 * one call apiece through getPageContent, keeping the original function names
 * so the pages change only their import path.
 */

/** /legal/cookies @returns {Promise<any|null>} */
export const getCookies = () => getPageContent("cookies");

/** /legal/terms @returns {Promise<any|null>} */
export const getTerms = () => getPageContent("terms");

/** /policies-and-compliance @returns {Promise<any|null>} */
export const getPolicy = () => getPageContent("policies-and-compliance");

/** /add-aurora-as-a-safe-sender @returns {Promise<any|null>} */
export const getSafeSender = () => getPageContent("add-aurora-as-a-safe-sender");
