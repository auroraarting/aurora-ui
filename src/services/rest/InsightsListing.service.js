import { getPageGroup } from "./Single.service";

/**
 * The /resources/aurora-insights landing content — the `insightsListing` field
 * group on the insight-listing page.
 *
 * One field on this page was saved with a **blank** ACF field name, so REST
 * keys it `""`; shapeAcf recovers the name from the field's label ("Insights
 * Section Button"), which is what WPGraphQL did.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.insightsListing`
 */
export const getInsightsPage = () => getPageGroup("insight-listing");
