// Insights listing page content over REST. Same
// `{ data: { page: { insightsListing: … } } }` shape the GraphQL query returned.
// One request.

import { loadPage, orNull, toMediaNode } from "./GraphqlShape";

const PAGE_ID = "/resources/aurora-insights";

/** The subscribe button. Its ACF field name is an empty string in the CMS — the
 *  field was saved without one — so it is found by shape rather than by name,
 *  which also keeps working if someone gives it a proper name later. */
function findSectionButton(acf) {
	const named = orNull(acf.insights_section_button);
	if (named) return named;
	for (const [key, value] of Object.entries(acf)) {
		if (key.endsWith("_source") || !value || typeof value !== "object") continue;
		if ("button_text" in value && "iframe" in value) return value;
	}
	return null;
}

const mapButton = (button) =>
	button
		? {
				buttonText: orNull(button.button_text),
				iframe: orNull(button.iframe),
				file: toMediaNode(button.file),
			}
		: null;

/** Fetch Page */
export const getInsightsPage = async () => {
	const row = await loadPage("insight-listing", { pageID: PAGE_ID });
	const acf = row?.acf || {};
	const banner = orNull(acf.banner);
	const video = orNull(acf.video);
	const insights = orNull(acf.insights);

	return {
		data: {
			page: row
				? {
						insightsListing: {
							banner: banner
								? { desc: orNull(banner.desc), title: orNull(banner.title) }
								: null,
							video: video
								? {
										redirectLink: orNull(video.redirect_link),
										sectionDesc: orNull(video.section_desc),
										videoLink: orNull(video.video_link),
										sectionTitle: orNull(video.section_title),
										iframe: orNull(video.iframe),
										videoThumbnail: toMediaNode(video.video_thumbnail),
									}
								: null,
							insights: insights
								? { desc: orNull(insights.desc), title: orNull(insights.title) }
								: null,
							insightsSectionButton: mapButton(findSectionButton(acf)),
						},
					}
				: null,
		},
	};
};
