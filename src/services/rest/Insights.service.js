// Insights data from WordPress over the REST API.
//
// Drop-in replacements for the matching GraphQL queries — the objects returned
// here are field-for-field what GraphQL returned, so the components consuming
// them need no changes.
//
// `getInsights` keeps its GraphQL-shaped `filterString` argument so callers do
// not change; the two forms every call site uses (`first: N` and
// `where: {categoryName: "a,b,c"}`) are translated to REST query params, and
// anything else throws rather than quietly returning the wrong posts.
//
// It leans on two CMS-side additions: the ACF field groups for products,
// services, post-author and post-speaker being exposed to REST
// (cms/aurora-scf-rest.php), and the WPML `translations` field
// (cms/aurora-wpml-rest-translations.php).

import {
	asList,
	decodeEntities,
	imageIdsIn,
	loadAll,
	loadByIds,
	orNull,
	orderTermsLikeGraphql,
	renderedHtml,
	renderedTitle,
	rest,
	toConnection,
	toFeaturedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
	PER_PAGE,
} from "./GraphqlShape";

const PAGE_ID = "/resources/aurora-insights";

/** A taxonomy's terms as GraphQL listed them: `{ name, slug }`, ordered by name
 *  with ties broken by descending term id. */
async function getTerms(taxonomy) {
	const terms = await loadAll(taxonomy, "_fields=id,name,slug", {
		apiID: taxonomy,
		pageID: PAGE_ID,
	});
	return toConnection(
		orderTermsLikeGraphql(terms).map((term) => ({
			name: decodeEntities(term.name),
			slug: toSlug(term.slug),
		})),
	);
}

/** A post type's entries as `{ title, slug }`. `orderBy` mirrors the ordering
 *  the GraphQL connection used — WP's own default (date, newest first) unless
 *  the query asked for something else. */
async function getPostTypeTitles(postType, { orderBy = "", keyOrder } = {}) {
	const rows = await loadAll(
		postType,
		`${orderBy}_fields=id,title,slug`.replace(/^&/, ""),
		{ apiID: postType, pageID: PAGE_ID },
	);
	return toConnection(
		rows.map((row) =>
			keyOrder === "slugFirst"
				? { slug: toSlug(row.slug), title: renderedTitle(row.title) }
				: { title: renderedTitle(row.title), slug: toSlug(row.slug) },
		),
	);
}

/** getInsights Categories — the option lists behind the insights filters. */
export const getInsightsCategories = async () => {
	const [tags, categories, countries, products, softwares, services] =
		await Promise.all([
			getTerms("tags"),
			getTerms("categories"),
			// The only list the GraphQL query ordered explicitly.
			getPostTypeTitles("country", { orderBy: "orderby=title&order=asc&" }),
			getPostTypeTitles("products"),
			getPostTypeTitles("softwares", { keyOrder: "slugFirst" }),
			getPostTypeTitles("services", { keyOrder: "slugFirst" }),
		]);

	return {
		data: { tags, categories, countries, products, softwares, services },
	};
};


// ---------------------------------------------------------------------------
// getInsights
// ---------------------------------------------------------------------------

/** The post types `postFields.poweredBy` can point at, with the field name
 *  GraphQL nested each one's ACF under and the label its contentType reported. */
const POWERED_BY_TYPES = [
	{ postType: "products", field: "products", label: "Products" },
	{ postType: "softwares", field: "softwares", label: "Softwares" },
	{ postType: "services", field: "services", label: "Services" },
];

const RELATION_FIELDS = {
	author: "id,slug,title,content,acf.thumbnail",
	speaker: "id,slug,title,acf.thumbnail",
	testimonial: "id,slug,title,content,acf.designation",
	poweredBy: "id,slug,title,acf.thumbnail.primary_color,acf.map.logo,acf.banner.logo",
};

const POST_FIELDS =
	"id,slug,title,date,content,featured_media,categories,tags,acf,translations";

/** One of the button groups on a post. Unlike the software buttons, the
 *  insights query never selected `url`. */
function mapPostButton(field) {
	const button = orNull(field);
	if (!button) return null;
	return {
		buttonText: orNull(button.button_text),
		iframe: orNull(button.iframe),
		file: toMediaNode(button.file),
	};
}

/** A repeater of `{ text }` rows, which is how ACF stores the media contact's
 *  email and phone and how GraphQL returned them. */
function mapTextRows(field) {
	const rows = toRows(field);
	return rows?.map((row) => ({ text: orNull(row.text) })) ?? null;
}

/** `thumbnail` on a post-author / post-speaker. */
function mapPersonThumbnail(acf) {
	const thumbnail = orNull(acf?.thumbnail);
	if (!thumbnail) return null;
	return {
		linkedinLink: orNull(thumbnail.linkedin_link),
		designation: orNull(thumbnail.designation),
		image: toMediaNode(thumbnail.image),
	};
}

/** `postFields.authors` / `.speakers`. GraphQL selected `content` on authors
 *  only, and named the ACF wrapper after the post type. */
function mapPeople(ids, people, { withContent, wrapper }) {
	if (!ids.length) return null;
	const nodes = ids
		.map((id) => people.get(id))
		.filter(Boolean)
		.map((person) => ({
			...(withContent ? { content: renderedHtml(person.content) } : {}),
			title: renderedTitle(person.title),
			slug: toSlug(person.slug),
			[wrapper]: { thumbnail: mapPersonThumbnail(person.acf) },
		}));
	return toConnection(nodes);
}

/** `postFields.poweredBy` — a relation that can land on any of three post
 *  types, which GraphQL resolved through inline fragments. */
function mapPoweredBy(ids, targets) {
	if (!ids.length) return null;
	const nodes = [];
	for (const id of ids) {
		const target = targets.get(id);
		if (!target) continue;
		const acf = target.row.acf || {};
		nodes.push({
			contentType: {
				node: {
					id: Buffer.from(`post_type:${target.postType}`).toString("base64"),
					label: target.label,
					name: target.postType,
					uri: null,
				},
			},
			id: toGlobalId(target.row.id),
			title: renderedTitle(target.row.title),
			slug: toSlug(target.row.slug),
			[target.field]: {
				thumbnail: { primaryColor: orNull((acf.thumbnail || {}).primary_color) },
				banner: { logo: toMediaNode((acf.banner || {}).logo) },
				map: { logo: toMediaNode((acf.map || {}).logo) },
			},
		});
	}
	return toConnection(nodes);
}

/** `postFields.testimonials`. */
function mapPostTestimonials(ids, testimonials) {
	if (!ids.length) return null;
	const nodes = ids
		.map((id) => testimonials.get(id))
		.filter(Boolean)
		.map((row) => ({
			id: toGlobalId(row.id),
			content: renderedHtml(row.content),
			title: renderedTitle(row.title),
			slug: toSlug(row.slug),
			testimonials: { designation: orNull(row.acf?.designation) },
		}));
	return toConnection(nodes);
}

/** `postFields.sections` — a repeater of prose blocks with their own buttons. */
function mapSections(field, imageMedia) {
	const sections = toRows(field);
	return (
		sections?.map((section) => ({
			content: wpautop(section.content, imageMedia),
			sectionTitle: orNull(section.section_title),
			lottie: toMediaNode(section.lottie),
			buttons:
				toRows(section.buttons)?.map((button) => ({
					buttonText: orNull(button.button_text),
					iframe: orNull(button.iframe),
					url: orNull(button.url),
					file: toMediaNode(button.file),
				})) ?? null,
		})) ?? null
	);
}

/** The whole `postFields` group. */
function mapPostFields(acf, ctx) {
	return {
		topSectionButton: mapPostButton(acf.top_section_button),
		middleSectionButton: mapPostButton(acf.middle_section_button),
		bottomSectionButton: mapPostButton(acf.bottom_section_button),
		insightsSectionButton: mapPostButton(acf.insights_section_button),
		time: orNull(acf.time),
		authors: mapPeople(toIds(acf.authors), ctx.authors, {
			withContent: true,
			wrapper: "postAuthors",
		}),
		speakers: mapPeople(toIds(acf.speakers), ctx.speakers, {
			withContent: false,
			wrapper: "postSpeakers",
		}),
		client: (() => {
			const client = orNull(acf.client);
			if (!client) return null;
			return {
				title: orNull(client.title),
				image: toMediaNode(client.image),
			};
		})(),
		podcast: orNull(acf.podcast),
		poweredBy: mapPoweredBy(toIds(acf.powered_by), ctx.poweredBy),
		testimonials: mapPostTestimonials(
			toIds(acf.testimonials),
			ctx.testimonials,
		),
		recordingSectionButton: mapPostButton(acf.recording_section_button),
		sections: mapSections(acf.sections, ctx.imageMedia),
		mediaContact:
			toRows(acf.media_contact)?.map((row) => ({
				designation: orNull(row.designation),
				name: orNull(row.name),
				email: mapTextRows(row.email),
				phone: mapTextRows(row.phone),
			})) ?? null,
		about: (() => {
			const about = orNull(acf.about);
			if (!about) return null;
			return {
				content: wpautop(about.content, ctx.imageMedia),
				sectionTitle: orNull(about.section_title),
			};
		})(),
		insights: (() => {
			const insights = orNull(acf.insights);
			if (!insights) return null;
			return { desc: orNull(insights.desc), title: orNull(insights.title) };
		})(),
	};
}

/** A post's terms, named from the batched fetch and carrying their WPML
 *  translations. GraphQL ordered them by name. */
function mapPostTerms(ids, terms, translated, { withTranslations }) {
	const nodes = orderTermsLikeGraphql(
		(ids || [])
			.map((id) => terms.get(id))
			.filter(Boolean)
			.sort((a, b) => String(a.name).localeCompare(String(b.name))),
	)
		.map((term) => {
			const node = { slug: toSlug(term.slug), name: decodeEntities(term.name) };
			if (withTranslations) {
				node.translations = (term.translations || []).map((translation) => {
					const row = translated.get(translation.id);
					return {
						name: row ? decodeEntities(row.name) : null,
						languageCode: translation.language?.language_code ?? null,
					};
				});
			}
			return node;
		});
	return toConnection(nodes);
}

/** `translated id -> row` for every translation of the given items, one batched
 *  call per language. */
async function loadTranslated(items, base, fields, pageID) {
	const idsByLanguage = new Map();
	for (const item of items) {
		for (const translation of item.translations || []) {
			const code = translation.language?.code;
			if (!code) continue;
			if (!idsByLanguage.has(code)) idsByLanguage.set(code, []);
			idsByLanguage.get(code).push(translation.id);
		}
	}
	const translated = new Map();
	await Promise.all(
		[...idsByLanguage].map(async ([code, ids]) => {
			// The translated items only exist in their own language context.
			const rows = await loadByIds(base, ids, fields, {
				apiID: base,
				pageID,
				language: code,
			});
			for (const [id, row] of rows) translated.set(id, row);
		}),
	);
	return translated;
}

/** Insights Page
 *
 *  Takes REST-shaped options rather than the GraphQL argument string the
 *  WPGraphQL service expected:
 *
 *      getInsights({ first: 3, categories: ["commentary", "market-reports"] })
 *
 *  `categories` are slugs, matching how the old `categoryName` filter read, and
 *  a post in any one of them qualifies. `first` caps the total returned, paging
 *  through WP's 100-per-request limit when it needs to.
 *
 *  The response is unchanged — same `{ data: { posts: { nodes } } }` shape the
 *  GraphQL query returned, so the components reading it need no changes. */
export const getInsights = async ({
	first = 9999,
	// Aliased because `categories` is also the name of the loaded term map below.
	categories: categorySlugs = [],
} = {}) => {
	// Core REST filters posts by category *id*; there is no slug filter, so the
	// slugs are resolved first. One request, deduped across the build.
	let categoryFilter = "";
	if (categorySlugs.length) {
		const terms = asList(
			await rest(
				`/categories?slug=${categorySlugs.join(",")}&per_page=${PER_PAGE}&_fields=id,slug`,
				{ apiID: "categories", pageID: PAGE_ID },
			),
		);
		// None of the slugs exist — no posts can match.
		if (!terms.length) return { data: { posts: toConnection([]) } };
		categoryFilter = `&categories=${terms.map((term) => term.id).join(",")}`;
	}

	// Newest first, which is what the GraphQL connection defaulted to.
	const posts = [];
	for (let page = 1; posts.length < first; page++) {
		const perPage = Math.min(PER_PAGE, first - posts.length);
		const rows = asList(
			await rest(
				`/posts?per_page=${perPage}&page=${page}${categoryFilter}&_fields=${POST_FIELDS}`,
				{ apiID: "post", pageID: PAGE_ID },
			),
		);
		posts.push(...rows);
		if (rows.length < perPage) break;
	}

	// Everything the posts reference, batched one call per type.
	const termIds = [];
	const tagIds = [];
	const mediaIds = [];
	const authorIds = [];
	const speakerIds = [];
	const testimonialIds = [];
	const poweredByIds = [];
	// Attachments embedded in the WYSIWYG bodies, whose registered sizes decide
	// the srcset WP would have added.
	const embeddedImageIds = [];
	for (const post of posts) {
		termIds.push(...(post.categories || []));
		tagIds.push(...(post.tags || []));
		if (post.featured_media) mediaIds.push(post.featured_media);
		const acf = post.acf || {};
		authorIds.push(...toIds(acf.authors));
		speakerIds.push(...toIds(acf.speakers));
		testimonialIds.push(...toIds(acf.testimonials));
		poweredByIds.push(...toIds(acf.powered_by));
		for (const section of toRows(acf.sections) || []) {
			embeddedImageIds.push(...imageIdsIn(section.content));
		}
		embeddedImageIds.push(...imageIdsIn(orNull(acf.about)?.content));
	}

	const [
		categories,
		tags,
		media,
		authors,
		speakers,
		testimonials,
		poweredByRows,
		embeddedImages,
	] = await Promise.all([
			loadByIds("categories", termIds, "id,slug,name,translations", {
				pageID: PAGE_ID,
			}),
			loadByIds("tags", tagIds, "id,slug,name", { pageID: PAGE_ID }),
			loadByIds("media", mediaIds, "id,source_url,alt_text", {
				pageID: PAGE_ID,
			}),
			loadByIds("post-author", authorIds, RELATION_FIELDS.author, {
				pageID: PAGE_ID,
			}),
			loadByIds("post-speaker", speakerIds, RELATION_FIELDS.speaker, {
				pageID: PAGE_ID,
			}),
			loadByIds("testimonial", testimonialIds, RELATION_FIELDS.testimonial, {
				pageID: PAGE_ID,
			}),
			Promise.all(
				POWERED_BY_TYPES.map(({ postType }) =>
					loadByIds(postType, poweredByIds, RELATION_FIELDS.poweredBy, {
						pageID: PAGE_ID,
					}),
				),
			),
			loadByIds("media", embeddedImageIds, "id,media_details", {
				pageID: PAGE_ID,
			}),
		]);

	const imageMedia = new Map(
		[...embeddedImages].map(([id, row]) => [id, row.media_details]),
	);

	const poweredBy = new Map();
	poweredByRows.forEach((rows, index) => {
		const { postType, field, label } = POWERED_BY_TYPES[index];
		for (const [id, row] of rows) {
			// An id belongs to one post type only, so the first answer wins.
			if (!poweredBy.has(id)) poweredBy.set(id, { postType, field, label, row });
		}
	});

	// WPML translations of the posts and of their categories.
	const [translatedPosts, translatedTerms] = await Promise.all([
		loadTranslated(posts, "posts", "id,title,content", PAGE_ID),
		loadTranslated([...categories.values()], "categories", "id,name", PAGE_ID),
	]);

	const ctx = { authors, speakers, testimonials, poweredBy, imageMedia };

	return {
		data: {
			posts: toConnection(
				posts.map((post) => ({
					title: renderedTitle(post.title),
					slug: toSlug(post.slug),
					date: post.date,
					content: renderedHtml(post.content),
					translations: (post.translations || []).map((translation) => {
						const row = translatedPosts.get(translation.id);
						return {
							title: row ? renderedTitle(row.title) : null,
							content: row ? renderedHtml(row.content) : null,
							languageCode: translation.language?.language_code ?? null,
						};
					}),
					featuredImage: toFeaturedImage(media.get(post.featured_media)),
					categories: mapPostTerms(
						post.categories,
						categories,
						translatedTerms,
						{ withTranslations: true },
					),
					tags: mapPostTerms(post.tags, tags, translatedTerms, {
						withTranslations: false,
					}),
					postFields: mapPostFields(post.acf || {}, ctx),
				})),
			),
		},
	};
};
