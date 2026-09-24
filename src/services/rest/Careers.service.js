import { getPageGroup } from "./Single.service";

/**
 * /careers/life-at-aurora — the `lifeAtAurora` field group.
 *
 * No relationship fields: `teamAurora.teams` and `collaborationSupport.list`
 * are repeaters holding their own images rather than pointers at other posts,
 * so this is a single call.
 *
 * Two ACF keys here need the full naming rules rather than plain snake_case:
 * `collaboration_&_support` becomes `collaborationSupport` and `global_map`
 * becomes `globalMap` — see camelKey in shape.js.
 *
 * The GraphQL query also selected a sibling `offices` connection that the page
 * ignores in favour of getOffices, so that is not reproduced.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.lifeAtAurora`
 */
export const getLifeAtAurora = () => getPageGroup("life-at-aurora");
