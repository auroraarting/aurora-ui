import RESTAPI from "../Rest.service";

import { getTeamMembers } from "./Relations.service";
import { arr, shapeAcf } from "./shape";

/**
 * /careers/our-team — the `ourTeams` field group.
 *
 * Its one relationship field sits inside a repeater: every row of `categories`
 * names a department leader. resolveRelations addresses fields by a dotted
 * path, which cannot reach into an array, so the leaders are gathered across
 * all rows, resolved in one call, and handed back to their rows — a fifteen-
 * department page costs one extra call rather than fifteen.
 */

/**
 * @returns {Promise<any|null>} what the section previously read as
 *   `res.data.page.ourTeams`
 */
export const getOurTeamsPage = async () => {
	const found = await RESTAPI("pages?slug=our-team&_fields=id,slug,acf", {
		apiID: "pages",
		slug: "our-team",
	});
	const page = Array.isArray(found) ? found[0] : found;
	if (!page) return null;

	const acf = shapeAcf(page.acf || {});
	const rows = arr(acf.categories);

	// `leader` is a single relation, so GraphQL returned `{ node }` rather than
	// a `{ nodes }` connection.
	const leaderIds = rows
		.map((row) => Number(arr(row?.leader)[0]))
		.filter(Boolean);

	if (leaderIds.length) {
		const { nodes: members } = await getTeamMembers(leaderIds);
		const byId = new Map(members.map((member) => [Number(member.id), member]));
		for (const row of rows) {
			const id = Number(arr(row?.leader)[0]);
			row.leader = { node: byId.get(id) || null };
		}
	}

	return acf;
};
