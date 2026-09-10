import {
	getSelectedPosts,
	getTeamMembers,
} from "./Relations.service";
import { getPageGroup } from "./Single.service";

/**
 * The press-room landing content — the `pressLanding` field group on the
 * press-landing page.
 *
 * Note what is *not* here: `getPresses` and `getPressesCards`, which queried a
 * `press` post type. WPGraphQL returns null for `presses` on production and
 * wp/v2 registers no such post type, so that content is gone; the press-room
 * pages already read posts in the "media" category through getInsights
 * instead, and both functions were imported without ever being called.
 */

/** The relationship fields on this page: a hand-picked list of posts and the
 *  press-office leads. */
const relations = {
	featured: getSelectedPosts,
	"leaders.leaders": getTeamMembers,
};

/**
 * @returns {Promise<any|null>} what the pages previously read as
 *   `res.data.page.pressLanding`
 */
export const getPressPage = () =>
	getPageGroup("press-landing", { relations });

/**
 * The same field group. The GraphQL service had a second function selecting a
 * narrower slice of it, and the detail page reads `insights`, `about` and
 * `insightsSectionButton` off the result — all of which getPressPage already
 * returns, so this is an alias kept for the call site.
 *
 * @returns {Promise<any|null>}
 */
export const getPressPageInsights = () => getPressPage();

export { getAllLanguages as getPressesLanguages } from "./Languages.service";
