// Event detail page, on core REST instead of WPGraphQL.
//
// The response matches the GraphQL query field for field, so the page and its
// sections need no changes — only the import does.
//
// Three requests, regardless of how much the editor put on the page:
//   1. the event itself, with `_acf_expand=1` resolving the country, speaker
//      and agenda-speaker relations inline (those alone used to cost a request
//      each, per row);
//   2. one batched /media call for the image fields that store bare ids
//      (the sidebar logo carousel and the galleries);
//   3. one batched /eventdownload call for the download-type terms, whose ACF
//      holds each type's icon.
//
// Steps 2 and 3 are skipped when the event has none of those.

import {
	ACF_EXPAND,
	asList,
	decodeEntities,
	expandedTitle,
	group,
	loadByIds,
	orNull,
	renderedHtml,
	renderedTitle,
	rest,
	restNamespaced,
	toConnection,
	toExpanded,
	toFeaturedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
} from "./GraphqlShape";

const FIELDS = "id,slug,status,title,content,featured_media,acf";

/** An ACF true/false field. `orNull` folds `false` into null because an empty
 *  ACF image arrives as `false`, but a checkbox that is off must stay `false`. */
const toBool = (value) =>
	value === undefined || value === null ? null : Boolean(value);

/** `whyattend` is the one `sectionOrders` sub-field WPGraphQL types as String;
 *  the rest pass the stored value through untouched. WordPress stores these
 *  inconsistently — the same field is an int on some events and a string on
 *  others — so only this one is coerced. */
const toOrderString = (value) => {
	const raw = orNull(value);
	return raw === null ? null : String(raw);
};

/** An ACF date/date-time field → ISO 8601, as WPGraphQL served it. The field's
 *  return format is "Y-m-d H:i:s", so REST gives "2026-10-15 00:00:00" where
 *  GraphQL gave "2026-10-15T00:00:00+00:00". Anything else passes through. */
function toIsoDate(value) {
	const raw = orNull(value);
	if (raw === null) return null;
	const match = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})$/.exec(
		String(raw).trim(),
	);
	return match ? `${match[1]}T${match[2]}+00:00` : raw;
}

/** `{ node: { mediaItemUrl } }` — the landing-popup and promotional-banner
 *  groups are the only two whose GraphQL selection omits `altText`, so their
 *  nodes must not carry the key at all. */
function toMediaUrlNode(field) {
	const node = toMediaNode(field)?.node;
	return node ? { node: { mediaItemUrl: node.mediaItemUrl } } : null;
}

/** A media id → the `{ node: … }` wrapper, from the batched /media lookup. */
const mediaNode = (id, media) => toFeaturedImage(media.get(Number(id)));

/** An ACF gallery or repeater of images. The field stores bare ids, so the urls
 *  and alt text come from the batched /media lookup rather than the event. */
function toGalleryConnection(field, media) {
	const ids = toIds(field);
	// An empty gallery gave null, not `{ nodes: [] }`.
	if (!ids.length) return null;
	return toConnection(
		ids.map((id) => mediaNode(id, media)?.node).filter(Boolean),
	);
}

/** An expanded post relation → the `{ nodes: [ … ] }` connection GraphQL used,
 *  with each row mapped by `mapRow`. An empty relation gave null. */
const toExpandedConnection = (field, mapRow) => {
	const rows = toExpanded(field);
	return rows.length ? toConnection(rows.map(mapRow)) : null;
};

/** A speaker relation → the connection GraphQL returned, resolved against the
 *  batched /post-speaker rows. An empty relation gave null. */
const toSpeakerConnection = (field, speakers, mapRow) => {
	const ids = toIds(field);
	if (!ids.length) return null;
	return toConnection(
		ids
			.map((id) => speakers.get(Number(id)))
			.filter(Boolean)
			.map(mapRow),
	);
};

/** A repeater, or null when it holds no rows — what GraphQL returned. */
const mapRows = (field, mapRow) => {
	const rows = toRows(field);
	return rows ? rows.map(mapRow) : null;
};

/** The `{ buttonText, iframe, url, file }` shape the four button groups share. */
const toButton = (button, { withUrl = true } = {}) => {
	if (!button) return button;
	const shaped = {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		file: toMediaNode(button.file),
	};
	if (withUrl) shaped.url = orNull(button.url);
	return shaped;
};

/** A speaker's own ACF, as the `postSpeakers` group.
 *
 *  The rows come from a batched /post-speaker request rather than from the ACF
 *  expansion, because the expansion is lossy one level down: it drops
 *  `company_logo` entirely and flattens `thumbnail.image` to a bare url, losing
 *  the alt text. Reading the speakers directly costs one extra request per
 *  event and returns exactly what GraphQL did. */
const toPostSpeakers = (speakerAcf, { withCompanyLogo }) => {
	const thumbnail = group(speakerAcf, "thumbnail");
	const shaped = {};
	if (withCompanyLogo) {
		shaped.companyLogo = toMediaNode(speakerAcf?.company_logo);
	}
	shaped.thumbnail = thumbnail && {
		designation: orNull(thumbnail.designation),
		linkedinLink: orNull(thumbnail.linkedin_link),
		image: toMediaNode(thumbnail.image),
	};
	return shaped;
};

/** The `events` ACF group, in the shape the GraphQL query returned. */
function mapEvents(acf = {}, { media, downloadTypes, speakers }) {
	const sectionOrders = group(acf, "section_orders");
	const landingPopup = group(acf, "landing_popup");
	const thumbnail = group(acf, "thumbnail");
	const breakdown = group(acf, "breakdown");
	const glimps = group(acf, "glimps");
	const hightlights = group(acf, "hightlights");
	const insights = group(acf, "insights");
	const location = group(acf, "location");
	const speakerSection = group(acf, "speakers");
	const sponsors = group(acf, "sponsors");
	const sponsors2 = group(acf, "sponsors_2");
	const whyAttend = group(acf, "why_attend");
	const banner = group(acf, "banner");

	return {
		sectionOrders: sectionOrders && {
			glimps: orNull(sectionOrders.glimps),
			hightlights: orNull(sectionOrders.hightlights),
			overview: orNull(sectionOrders.overview),
			promotionalbanner: orNull(sectionOrders.promotionalbanner),
			speakers: orNull(sectionOrders.speakers),
			sponsors: orNull(sectionOrders.sponsors),
			thumbnail: orNull(sectionOrders.thumbnail),
			whyattend: toOrderString(sectionOrders.whyattend),
			sections: orNull(sectionOrders.sections),
		},
		landingPopup: landingPopup && {
			text: orNull(landingPopup.text),
			banner: toMediaUrlNode(landingPopup.banner),
			bannerMobile: toMediaUrlNode(landingPopup.bannerMobile),
		},
		// A repeater, despite reading like a group: GraphQL returned a list here.
		promotionalBanner: mapRows(acf.promotional_banner, (row) => ({
			banner: toMediaUrlNode(row.banner),
			bannerMobile: toMediaUrlNode(row.bannerMobile),
			text: orNull(row.text),
		})),
		interestedDesc: wpautop(acf.interested_desc),
		pricingDesc: orNull(acf.pricing_desc),
		sidebarLogos: toGalleryConnection(acf.sidebar_logos, media),
		thumbnail: thumbnail && {
			openExternalInNewTab: toBool(thumbnail.open_external_in_new_tab),
			address: orNull(thumbnail.address),
			date: toIsoDate(thumbnail.date),
			endDate: toIsoDate(thumbnail.end_date),
			time: orNull(thumbnail.time),
			logo: toMediaNode(thumbnail.logo),
			country: toExpandedConnection(thumbnail.country, (row) => ({
				id: toGlobalId(row.id),
				title: expandedTitle(row),
				slug: toSlug(row.slug),
			})),
		},
		breakdown: breakdown && {
			sectionDesc: orNull(breakdown.section_desc),
			sectionTitle: orNull(breakdown.section_title),
			desktopImage: toMediaNode(breakdown.desktop_image),
			mobileImage: toMediaNode(breakdown.mobile_image),
		},
		downloads: mapRows(acf.downloads, (row) => ({
			link: orNull(row.link),
			file: toMediaNode(row.file),
			// The type is a taxonomy term whose own ACF carries the icon, which
			// the expanded term does not include — hence the batched term lookup.
			type: toConnection(
				toIds(row.type)
					.map((id) => downloadTypes.get(Number(id)))
					.filter(Boolean)
					.map((term) => ({
						id: toGlobalId(term.id),
						name: decodeEntities(term.name),
						eventDownloads: { icon: toMediaNode(term.acf?.icon) },
					})),
			),
		})),
		glimps: glimps && {
			sectionTitle: orNull(glimps.section_title),
			gallery: toGalleryConnection(glimps.gallery, media),
			video: orNull(glimps.video),
		},
		hightlights: hightlights && {
			sectionTitle: orNull(hightlights.section_title),
			hightlights: mapRows(hightlights.hightlights, (row) => ({
				text: orNull(row.text),
			})),
		},
		insights: insights && {
			sectionDesc: orNull(insights.section_desc),
			sectionTitle: orNull(insights.section_title),
		},
		insightsSectionButton: toButton(group(acf, "insights_section_button")),
		middleSectionButton: toButton(group(acf, "middle_section_button")),
		location: location && {
			address: orNull(location.address),
			mapLink: orNull(location.map_link),
			desc: wpautop(location.desc),
		},
		speakers: speakerSection && {
			sectionDesc: orNull(speakerSection.section_desc),
			sectionTitle: orNull(speakerSection.section_title),
			speakers: mapRows(speakerSection.speakers, (row) => ({
				sessions: mapRows(row.sessions, (session) => ({
					address: orNull(session.address),
					time: orNull(session.time),
					timeSlot: orNull(session.time_slot),
					title: orNull(session.title),
				})),
				speakers: toSpeakerConnection(row.speakers, speakers, (person) => ({
					id: toGlobalId(person.id),
					content: renderedHtml(person.content),
					title: renderedTitle(person.title),
					slug: toSlug(person.slug),
					postSpeakers: toPostSpeakers(person.acf, {
						withCompanyLogo: true,
					}),
				})),
			})),
		},
		sponsors: sponsors && {
			sectionTitle: orNull(sponsors.section_title),
			sponsors: mapRows(sponsors.sponsors, (row) => ({
				title: orNull(row.title),
				gallery: toGalleryConnection(row.gallery, media),
			})),
		},
		sponsors2: sponsors2 && {
			sectionTitle: orNull(sponsors2.section_title),
			sponsors: mapRows(sponsors2.sponsors, (row) => ({
				title: orNull(row.title),
				list: mapRows(row.list, (item) => ({
					url: orNull(item.url),
					description: wpautop(item.description),
					logo: toMediaNode(item.logo),
				})),
			})),
		},
		topSectionButton: toButton(group(acf, "top_section_button")),
		whyAttend: whyAttend && {
			sectionTitle: orNull(whyAttend.section_title),
			desc: wpautop(whyAttend.desc),
			agenda: mapRows(whyAttend.agenda, (row) => ({
				address: orNull(row.address),
				time: orNull(row.time),
				timeSlot: orNull(row.time_slot),
				title: orNull(row.title),
				description: wpautop(row.description),
				speaker: toSpeakerConnection(row.speaker, speakers, (person) => ({
					id: toGlobalId(person.id),
					title: renderedTitle(person.title),
					slug: toSlug(person.slug),
					postSpeakers: toPostSpeakers(person.acf, {
						withCompanyLogo: false,
					}),
				})),
			})),
		},
		banner: banner && {
			desktop: toMediaNode(banner.desktop),
			mobile: toMediaNode(banner.mobile),
		},
		sections: mapRows(acf.sections, (row) => ({
			content: wpautop(row.content),
			sectionTitle: orNull(row.section_title),
		})),
	};
}

/** Every media id on the event that is stored as a bare id rather than an
 *  object, so all of them can be fetched in one /media call. */
function galleryMediaIds(acf = {}) {
	const ids = [
		...toIds(acf.sidebar_logos),
		...toIds(group(acf, "glimps")?.gallery),
	];
	for (const row of toRows(group(acf, "sponsors")?.sponsors) || []) {
		ids.push(...toIds(row.gallery));
	}
	return ids;
}

/** One event by slug.
 *
 *  `eventBy` is null when no such event exists, which is what GraphQL returned
 *  and what the route's notFound check expects. */
export const getEventsInside = async (slug) => {
	const decoded = decodeURIComponent(slug);
	const options = {
		apiID: "event",
		tags: ["event", decoded],
		pageID: `/events/${slug}`,
	};

	const row =
		asList(
			await rest(
				`/event?slug=${encodeURIComponent(decoded)}&_fields=${FIELDS}&${ACF_EXPAND}`,
				options,
			),
		)[0] || null;

	if (!row) return { data: { eventBy: null } };

	const acf = row.acf || {};
	const mediaIds = [...galleryMediaIds(acf), row.featured_media].filter(
		Boolean,
	);
	const downloadTypeIds = (toRows(acf.downloads) || []).flatMap((download) =>
		toIds(download.type),
	);
	const speakerIds = [
		...(toRows(group(acf, "speakers")?.speakers) || []).flatMap((row) =>
			toIds(row.speakers),
		),
		...(toRows(group(acf, "why_attend")?.agenda) || []).flatMap((row) =>
			toIds(row.speaker),
		),
	];

	const [media, downloadTypes, speakers] = await Promise.all([
		mediaIds.length
			? loadByIds("media", mediaIds, "id,source_url,alt_text", {
					...options,
					apiID: "media",
				})
			: new Map(),
		downloadTypeIds.length
			? loadByIds("eventdownload", downloadTypeIds, "id,name,slug,acf", options)
			: new Map(),
		speakerIds.length
			? loadByIds(
					"post-speaker",
					speakerIds,
					"id,slug,title,content,acf",
					options,
				)
			: new Map(),
	]);

	return {
		data: {
			eventBy: {
				title: renderedTitle(row.title),
				slug: toSlug(row.slug),
				content: renderedHtml(row.content),
				featuredImage: mediaNode(row.featured_media, media),
				events: mapEvents(acf, { media, downloadTypes, speakers }),
			},
		},
	};
};
