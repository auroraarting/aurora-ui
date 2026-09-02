// Team members and the country list, over REST. Same
// `{ data: { countries: { nodes }, teams: { nodes } } }` shape the GraphQL query
// returned, so /company/old-team needs no changes.
//
// Three requests for the current data: the countries, and two pages of team
// members (125 of them, past WP's 100-per-request cap). Each member's `articles`
// relation is empty across the whole site today, so the posts behind it are
// fetched only if that ever changes.

import {
	decodeEntities,
	loadAll,
	loadByIds,
	orNull,
	orderTermsLikeGraphql,
	renderedHtml,
	renderedTitle,
	toConnection,
	toFeaturedImage,
	toGlobalId,
	toIds,
	toMediaNode,
	toSlug,
} from "./GraphqlShape";

const PAGE_ID = "/company/old-team";
const POST_FIELDS = "id,slug,title,content,date,featured_media,categories,acf.time";

/** A member's photo and role. */
const mapThumbnail = (field) => {
	const thumbnail = orNull(field);
	if (!thumbnail) return null;
	return {
		designation: orNull(thumbnail.designation),
		linkedinLink: orNull(thumbnail.linkedin_link),
		image: toMediaNode(thumbnail.image),
	};
};

/** The posts a member is credited on, in the `articlesby` connection the query
 *  used. Null when the relation is empty, which is what GraphQL returned. */
function mapArticles(field, ctx) {
	const articles = orNull(field);
	if (!articles) return null;
	const ids = toIds(articles.articlesby);
	if (!ids.length) return { articlesby: null };

	return {
		articlesby: toConnection(
			ids
				.map((id) => ctx.posts.get(id))
				.filter(Boolean)
				.map((post) => {
					const terms = orderTermsLikeGraphql(
						(post.categories || [])
							.map((id) => ctx.categories.get(id))
							.filter(Boolean)
							.sort((a, b) => String(a.name).localeCompare(String(b.name))),
					);
					return {
						id: toGlobalId(post.id),
						title: renderedTitle(post.title),
						slug: toSlug(post.slug),
						content: renderedHtml(post.content),
						date: post.date,
						categories: toConnection(
							terms.map((term) => ({
								slug: toSlug(term.slug),
								name: decodeEntities(term.name),
							})),
						),
						postFields: { time: orNull(post.acf?.time) },
						featuredImage: toFeaturedImage(ctx.media.get(post.featured_media)),
					};
				}),
		),
	};
}

/** Fetch Team Sectors */
export const getTeamSectors = async () => {
	const [countries, teams] = await Promise.all([
		loadAll("country", "orderby=title&order=asc&_fields=id,slug,title", {
			apiID: "country",
			pageID: PAGE_ID,
		}),
		loadAll(
			"team",
			"orderby=title&order=asc&_fields=id,slug,title,content,acf.thumbnail,acf.articles",
			{ apiID: "team", pageID: PAGE_ID },
		).then((rows) =>
			// Two members share a title; GraphQL broke that tie by descending id.
			orderTermsLikeGraphql(rows, (row) => row.title?.rendered),
		),
	]);

	// Only reached if a member ever gets articles attached.
	const articleIds = teams.flatMap((team) =>
		toIds(orNull(team.acf?.articles)?.articlesby),
	);
	let ctx = { posts: new Map(), categories: new Map(), media: new Map() };
	if (articleIds.length) {
		const posts = await loadByIds("posts", articleIds, POST_FIELDS, {
			pageID: PAGE_ID,
		});
		const mediaIds = [];
		const categoryIds = [];
		for (const post of posts.values()) {
			if (post.featured_media) mediaIds.push(post.featured_media);
			categoryIds.push(...(post.categories || []));
		}
		const [media, categories] = await Promise.all([
			loadByIds("media", mediaIds, "id,source_url,alt_text", { pageID: PAGE_ID }),
			categoryIds.length
				? loadAll(
						"categories",
						`include=${[...new Set(categoryIds)].join(",")}&_fields=id,slug,name`,
						{ apiID: "categories", pageID: PAGE_ID },
					).then((rows) => new Map(rows.map((row) => [row.id, row])))
				: Promise.resolve(new Map()),
		]);
		ctx = { posts, categories, media };
	}

	return {
		data: {
			countries: toConnection(
				countries.map((row) => ({
					title: renderedTitle(row.title),
					slug: toSlug(row.slug),
				})),
			),
			teams: toConnection(
				teams.map((row) => ({
					title: renderedTitle(row.title),
					slug: toSlug(row.slug),
					content: renderedHtml(row.content),
					teams: {
						thumbnail: mapThumbnail(row.acf?.thumbnail),
						articles: mapArticles(row.acf?.articles, ctx),
					},
				})),
			),
		},
	};
};
