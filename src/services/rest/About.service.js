
import { getGallery, getTeamMembers } from "./Relations.service";
import { getPageGroup } from "./Single.service";

/**
 * /company/about — the `about` field group.
 *
 * Three relationship fields beyond the shared client-logo and testimonial
 * pickers: the leadership list (team posts, each of which points at its own
 * articles — resolved in one further call for the whole list), and the history
 * gallery, which REST stores as attachment ids.
 *
 * The `topSectionButton` group on this page was saved with a **blank** ACF
 * field name, so REST keys it `""`; shapeAcf recovers the name from the
 * field's label, which is what WPGraphQL did.
 *
 * The GraphQL query also selected a sibling `offices` connection. The page
 * takes its offices from getOffices instead, so that is not reproduced here.
 */

/** @type {Record<string, (ids: number[]) => Promise<any>>} */
const relations = {
	"leaders.leaders": getTeamMembers,
	"history.gallery": getGallery,
};

/**
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.about`
 */
export const getAboutPage = () => getPageGroup("about", { relations });
