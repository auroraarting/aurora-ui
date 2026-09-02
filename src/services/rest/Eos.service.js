// EOS page content over REST. Same `{ data: { page: { eos: … } } }` shape the
// GraphQL query returned, so /eos needs no changes.
//
// One request. The client logos and testimonials arrive inside the page payload,
// expanded by cms/aurora-acf-expand.php — previously this cost four requests
// (page, logos, testimonials, and the media behind the logos' featured images).

import {
	ACF_EXPAND,
	loadPage,
	orNull,
	renderedTitle,
	expandedTitle,
	toConnection,
	toExpanded,
	toExpandedImage,
	toGlobalId,
	toMediaNode,
	toRows,
	wpautop,
} from "./GraphqlShape";

const PAGE_ID = "/eos";

/** A button group, in the field order the query used. */
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

// banner / introduction / eosAi descriptions are WYSIWYG fields, which GraphQL
// served paragraphed.
/** EOS Page */
export const getEosPage = async () => {
	const row = await loadPage("eos", {
		pageID: PAGE_ID,
		fields: `id,slug,title,acf&${ACF_EXPAND}`,
	});
	if (!row) return { data: { page: null } };

	const acf = row.acf || {};
	const ourClient = orNull(acf.our_client);

	const banner = orNull(acf.banner);
	const eosAi = orNull(acf.eos_ai);
	const expertise = orNull(acf.expertise);
	const introduction = orNull(acf.introduction);
	const insights = orNull(acf.insights);
	const map = orNull(acf.map);
	const videos = toRows(banner?.videos);

	return {
		data: {
			page: {
				eos: {
					eosAi: eosAi
						? {
								logo: toMediaNode(eosAi.logo),
								title: orNull(eosAi.title),
								description: wpautop(eosAi.description),
								button: mapButton(eosAi.button),
							}
						: null,
					banner: banner
						? {
								buttonLink: orNull(banner.button_link),
								buttonText: orNull(banner.button_text),
								description: wpautop(banner.description),
								title: orNull(banner.title),
								vimeoLink: orNull(banner.vimeo_link),
								videos:
									videos?.map((video) => ({
										videoType: orNull(video.video_type),
										videoFile: toMediaNode(video.video_file, {
											withMimeType: true,
										}),
										vimeoLink: orNull(video.vimeo_link),
										youtubeLink: orNull(video.youtube_link),
									})) ?? null,
								desktopThumbnail: toMediaNode(banner.desktop_thumbnail),
								logo: toMediaNode(banner.logo),
								mobileThumbnail: toMediaNode(banner.mobile_thumbnail),
							}
						: null,
					expertise: expertise
						? {
								description: orNull(expertise.description),
								title: orNull(expertise.title),
								expertiseAccordion:
									toRows(expertise.expertise_accordion)?.map((accordion) => ({
										accordionDescription: orNull(
											accordion.accordion_description,
										),
										accordionTitle: orNull(accordion.accordion_title),
										buttonLink: orNull(accordion.button_link),
										icon: toMediaNode(accordion.icon),
									})) ?? null,
							}
						: null,
					map: map ? { marquee: orNull(map.marquee) } : null,
					ourClient: ourClient
						? {
								title: orNull(ourClient.title),
								selectLogos: toConnection(
									toExpanded(ourClient.select_logos).map((logo) => ({
										id: toGlobalId(logo.id),
										featuredImage: toExpandedImage(logo),
									})),
								),
								testimonials: toConnection(
									toExpanded(ourClient.testimonials).map((testimonial) => ({
										id: toGlobalId(testimonial.id),
										// The expanded row carries content already rendered, so
										// there is no .rendered wrapper to unwrap here.
										content: orNull(testimonial.content),
										title: expandedTitle(testimonial),
										testimonials: {
											designation: orNull(testimonial.acf?.designation),
										},
									})),
								),
							}
						: null,
					topSectionButton: mapButton(acf.top_section_button),
					middleSectionButton: mapButton(acf.middle_section_button),
					insightsSectionButton: mapButton(acf.insights_section_button),
					introduction: introduction
						? {
								description: wpautop(introduction.description),
								sectionTitle: orNull(introduction.section_title),
							}
						: null,
					insights: insights
						? {
								sectionTitle: orNull(insights.section_title),
								sectionDesc: orNull(insights.section_desc),
							}
						: null,
					stats:
						toRows(acf.stats)?.map((stat) => ({
							count: orNull(stat.count),
							title: orNull(stat.title),
						})) ?? null,
				},
			},
		},
	};
};
