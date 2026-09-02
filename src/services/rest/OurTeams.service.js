// Our Team page content over REST. Same `{ data: { page: { ourTeams: … } } }`
// shape the GraphQL query returned, so /careers/our-team needs no changes.
//
// One request: the department leaders arrive inside the page payload, expanded by
// cms/aurora-acf-expand.php.
//
// One deliberate difference: WPGraphQL returned `leader: { node: {} }` — an
// empty node — for every department, because its inline fragment resolved
// nothing, so DepartmentList's `leader?.node?.teams?.thumbnail` guard suppressed
// the leader card. The CMS does hold those Team ids, so REST resolves them and
// the cards render.

import {
	ACF_EXPAND,
	loadPage,
	orNull,
	expandedTitle,
	toExpanded,
	toGlobalId,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";

const PAGE_ID = "/careers/our-team";

const mapButton = (field) => {
	const button = orNull(field);
	if (!button) return null;
	return {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		url: orNull(button.url),
		file: toMediaNode(button.file),
	};
};

/** A department's leader, in the `{ node: … }` wrapper the query used. An
 *  unresolvable id yields `{ node: {} }`, which is what GraphQL always returned
 *  and what the section treats as "no leader". */
function mapLeader(field) {
	const [team] = toExpanded(field);
	if (!team) return { node: {} };
	const thumbnail = orNull(team.acf?.thumbnail);
	return {
		node: {
			id: toGlobalId(team.id),
			title: expandedTitle(team),
			slug: toSlug(team.slug),
			teams: {
				thumbnail: thumbnail
					? {
							designation: orNull(thumbnail.designation),
							linkedinLink: orNull(thumbnail.linkedin_link),
							image: toMediaNode(thumbnail.image),
						}
					: null,
			},
		},
	};
}

/** Our Team Page */
export const getOurTeamsPage = async () => {
	const row = await loadPage("our-team", {
		pageID: PAGE_ID,
		fields: `id,slug,title,acf&${ACF_EXPAND}`,
	});
	if (!row) return { data: { page: null } };

	const acf = row.acf || {};
	const categories = toRows(acf.categories);

	const banner = orNull(acf.banner);
	const insights = orNull(acf.insights);

	return {
		data: {
			page: {
				ourTeams: {
					banner: banner
						? { title: orNull(banner.title), desc: orNull(banner.desc) }
						: null,
					insights: insights
						? {
								sectionTitle: orNull(insights.section_title),
								sectionDesc: orNull(insights.section_desc),
								insightsSectionButton: mapButton(
									insights.insights_section_button,
								),
							}
						: null,
					categories:
						categories?.map((category) => ({
							categorytext: orNull(category.categorytext),
							// A WYSIWYG field — GraphQL served it paragraphed.
							desc: wpautop(category.desc),
							leader: mapLeader(category.leader),
							leaderDesc:
								toRows(category.leader_desc)?.map((entry) => ({
									desc: orNull(entry.desc),
									title: orNull(entry.title),
								})) ?? null,
						})) ?? null,
					topSectionButton: mapButton(acf.top_section_button),
				},
			},
		},
	};
};
