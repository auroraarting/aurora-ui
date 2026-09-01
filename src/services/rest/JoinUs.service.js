// Join Us page content over REST. Same `{ data: { page: { joinUs: … } } }` shape
// the GraphQL query returned. One request.

import { loadPage, orNull, toMediaNode } from "./GraphqlShape";

const PAGE_ID = "/careers/join-us";

/** The button group as the query selected it — no `url`, unlike other buttons. */
const mapButton = (field) => {
	const button = orNull(field);
	if (!button) return null;
	return {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		file: toMediaNode(button.file),
	};
};

/** Our Join Page */
export const getJoinUsPage = async () => {
	const row = await loadPage("join-us", { pageID: PAGE_ID });
	const acf = row?.acf || {};
	const banner = orNull(acf.banner);
	const insights = orNull(acf.insights);

	return {
		data: {
			page: row
				? {
						joinUs: {
							banner: banner
								? {
										buttonLink: orNull(banner.button_link),
										buttonText: orNull(banner.button_text),
										desc: orNull(banner.desc),
										title: orNull(banner.title),
									}
								: null,
							insights: insights
								? {
										sectionDesc: orNull(insights.section_desc),
										sectionTitle: orNull(insights.section_title),
										insightsSectionButton: mapButton(
											insights.insights_section_button,
										),
									}
								: null,
						},
					}
				: null,
		},
	};
};
