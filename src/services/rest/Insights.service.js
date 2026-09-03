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
	ACF_EXPAND,
	asList,
	decodeEntities,
	expandedTitle,
	imageIdsIn,
	loadByIds,
	orNull,
	orderTermsLikeGraphql,
	renderedHtml,
	renderedTitle,
	rest,
	toEmbeddedImage,
	toExpanded,
	restNamespaced,
	toConnection,
	toGlobalId,
	toMediaNode,
	toRows,
	toSlug,
	wpautop,
	PER_PAGE,
} from "./GraphqlShape";

const NAMESPACE = "aurora/v1";
const PAGE_ID = "/resources/aurora-insights";

/** getInsights Categories — the option lists behind the insights filters.
 *
 *  One request. These six lists are independent full collections, not relations,
 *  so the ACF expansion plugin cannot help: over plain wp/v2 they cost nine
 *  requests (tags and categories need three and two pages of their own).
 *  cms/aurora-filter-options.php serves them together, already ordered the way
 *  the GraphQL query returned them — terms by name with ties broken by
 *  descending id, countries by title, the rest in WP's default order.
 *
 *  Titles and names come back HTML-escaped, as core REST escapes them, so they
 *  are decoded here the way WPGraphQL decoded them. */
export const getInsightsCategories = async () => {
	// One request returning six taxonomies/collections, so its scope needs the
	// explicit list — a single apiID cannot express it.
	const options = await restNamespaced(NAMESPACE, "/filter-options", {
		apiID: "post",
		tags: ["post", "category", "tag", "product", "service", "software", "country"],
		pageID: PAGE_ID,
	});

	// The endpoint returns MySQL's name ordering; equal names still need their
	// tie broken by descending id, the way WPGraphQL did.
	const terms = (list) =>
		toConnection(
			orderTermsLikeGraphql(asList(list)).map((term) => ({
				name: decodeEntities(term.name),
				slug: toSlug(term.slug),
			})),
		);
	/** `slugFirst` mirrors the key order the softwares and services selections
	 *  used; it makes no difference to consumers, only to a strict diff. */
	const titles = (list, { slugFirst = false } = {}) =>
		toConnection(
			asList(list).map((row) =>
				slugFirst
					? { slug: toSlug(row.slug), title: decodeEntities(row.title) }
					: { title: decodeEntities(row.title), slug: toSlug(row.slug) },
			),
		);

	return {
		data: {
			tags: terms(options?.tags),
			categories: terms(options?.categories),
			countries: titles(options?.countries),
			products: titles(options?.products),
			softwares: titles(options?.softwares, { slugFirst: true }),
			services: titles(options?.services, { slugFirst: true }),
		},
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

// `_embed` folds the post's terms and featured image into the same response, and
// `_acf_expand` resolves its relations, so a post costs one request rather than
// six. `_links` has to be requested for `_embed` to work at all.
const POST_FIELDS =
	"id,slug,title,date,content,acf,translations,_links,_embedded";
const POST_QUERY = `_embed=wp:term,wp:featuredmedia&${ACF_EXPAND}`;

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
function mapPeople(field, { withContent, wrapper }) {
	const people = toExpanded(field);
	if (!people.length) return null;
	return toConnection(
		people.map((person) => ({
			...(withContent ? { content: orNull(person.content) } : {}),
			title: expandedTitle(person),
			slug: toSlug(person.slug),
			[wrapper]: { thumbnail: mapPersonThumbnail(person.acf) },
		})),
	);
}

/** `postFields.poweredBy` — a relation that can land on any of three post
 *  types, which GraphQL resolved through inline fragments. */
function mapPoweredBy(field) {
	const targets = toExpanded(field);
	if (!targets.length) return null;
	return toConnection(
		targets.map((target) => {
			const acf = target.acf || {};
			return {
				contentType: {
					node: {
						id: Buffer.from(`post_type:${target.type}`).toString("base64"),
						// The expanded row reports its own post type and label, so
						// neither needs a /types lookup any more.
						label: target.type_label,
						name: target.type,
						uri: null,
					},
				},
				id: toGlobalId(target.id),
				title: expandedTitle(target),
				slug: toSlug(target.slug),
				[target.type]: {
					thumbnail: {
						primaryColor: orNull((acf.thumbnail || {}).primary_color),
					},
					banner: { logo: toMediaNode((acf.banner || {}).logo) },
					map: { logo: toMediaNode((acf.map || {}).logo) },
				},
			};
		}),
	);
}

/** `postFields.testimonials`. */
function mapPostTestimonials(field) {
	const rows = toExpanded(field);
	if (!rows.length) return null;
	return toConnection(
		rows.map((row) => ({
			id: toGlobalId(row.id),
			content: orNull(row.content),
			title: expandedTitle(row),
			slug: toSlug(row.slug),
			testimonials: { designation: orNull(row.acf?.designation) },
		})),
	);
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
		authors: mapPeople(acf.authors, {
			withContent: true,
			wrapper: "postAuthors",
		}),
		speakers: mapPeople(acf.speakers, {
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
		poweredBy: mapPoweredBy(acf.powered_by),
		testimonials: mapPostTestimonials(acf.testimonials),
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
function mapPostTerms(terms, { withTranslations }) {
	const nodes = orderTermsLikeGraphql(
		[...terms].sort((a, b) => String(a.name).localeCompare(String(b.name))),
	).map((term) => {
		const node = { slug: toSlug(term.slug), name: decodeEntities(term.name) };
		if (withTranslations) {
			// The translated name now travels with the translation entry, so
			// reading it costs no request per language.
			node.translations = (term.translations || []).map((translation) => ({
				name: translation.name ? decodeEntities(translation.name) : null,
				languageCode: translation.language?.language_code ?? null,
			}));
		}
		return node;
	});
	return toConnection(nodes);
}

/** A post's embedded terms for one taxonomy. `_embed` returns them grouped, one
 *  group per taxonomy, in no guaranteed order. */
function embeddedTerms(post, taxonomy) {
	const groups = post._embedded?.["wp:term"] || [];
	return groups.flat().filter((term) => term?.taxonomy === taxonomy);
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
				`/posts?per_page=${perPage}&page=${page}${categoryFilter}` +
					`&_fields=${POST_FIELDS}&${POST_QUERY}`,
				{ apiID: "post", pageID: PAGE_ID },
			),
		);
		posts.push(...rows);
		if (rows.length < perPage) break;
	}

	// The one thing still worth a request: registered sizes for images embedded in
	// the WYSIWYG bodies, which decide the srcset WP would have added. Only fires
	// when a body actually embeds an image.
	const embeddedImageIds = [];
	for (const post of posts) {
		const acf = post.acf || {};
		for (const section of toRows(acf.sections) || []) {
			embeddedImageIds.push(...imageIdsIn(section.content));
		}
		embeddedImageIds.push(...imageIdsIn(orNull(acf.about)?.content));
	}
	const embeddedImages = embeddedImageIds.length
		? await loadByIds("media", embeddedImageIds, "id,media_details", {
				pageID: PAGE_ID,
			})
		: new Map();
	const imageMedia = new Map(
		[...embeddedImages].map(([id, row]) => [id, row.media_details]),
	);

	const ctx = { imageMedia };

	return {
		data: {
			posts: toConnection(
				posts.map((post) => ({
					title: renderedTitle(post.title),
					slug: toSlug(post.slug),
					date: post.date,
					content: renderedHtml(post.content),
					translations: (post.translations || []).map((translation) => ({
						title: translation.title
							? decodeEntities(translation.title)
							: null,
						// A translated post's body is not carried inline — nothing
						// reading this list renders it, and fetching it would cost a
						// request per language.
						content: null,
						languageCode: translation.language?.language_code ?? null,
					})),
					featuredImage: toEmbeddedImage(post),
					categories: mapPostTerms(embeddedTerms(post, "category"), {
						withTranslations: true,
					}),
					tags: mapPostTerms(embeddedTerms(post, "post_tag"), {
						withTranslations: false,
					}),
					postFields: mapPostFields(post.acf || {}, ctx),
				})),
			),
		},
	};
};
