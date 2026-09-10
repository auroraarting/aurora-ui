import RESTAPI, { restAll, restByIds } from "../Rest.service";

import { arr, html, shapeAcf, termLookup, termNodes, text } from "./shape";

/**
 * Early-career programme listings.
 *
 * `earlyCareers` is the ACF field-group name WPGraphQL nested each entry's
 * fields under. Two things need resolving that GraphQL inlined: the country a
 * programme runs in (an ACF relation, so a post id) and the `programs`
 * taxonomy terms (term ids on the post). Both are resolved once for the whole
 * listing rather than per entry.
 */

const listingFields = "id,slug,title,content,program,acf.banner,acf.thumbnail";

/**
 * The early-career entries, shaped as GraphQL nodes.
 *
 * @param {object} [options]
 * @param {number} [options.first] cap the list; omit for all of them
 * @returns {Promise<any[]>} the nodes previously read as
 *   `res.data.earlyCareers.nodes`
 */
export const getEarlyCareersListing = async (options = {}) => {
	const { first } = options;

	const posts = first
		? arr(
			await RESTAPI(
				`early-career?_fields=${listingFields}&per_page=${Math.min(first, 100)}`,
				{ apiID: "early-career" },
			),
		)
		: await restAll(`early-career?_fields=${listingFields}`, {
			apiID: "early-career",
		});
	if (!posts.length) return [];

	const shaped = posts.map((post) => ({
		title: text(post.title),
		slug: post.slug,
		content: html(post.content) || null,
		earlyCareers: shapeAcf(post.acf || {}),
		raw: post,
	}));

	// The country relation and the programs taxonomy, one call each for the
	// whole listing.
	const countryIds = [
		...new Set(
			shaped
				.map((item) => Number(arr(item.earlyCareers?.thumbnail?.country)[0]))
				.filter(Boolean),
		),
	];
	const programIds = [
		...new Set(shaped.flatMap((item) => arr(item.raw.program).map(Number))),
	].filter(Boolean);

	const [countries, programs] = await Promise.all([
		countryIds.length
			? restByIds("country", countryIds, {
				apiID: "country",
				fields: "id,slug,title",
			})
			: [],
		programIds.length
			? restByIds("program", programIds, {
				apiID: "program",
				fields: "id,name,slug",
			})
			: [],
	]);

	const countriesById = new Map(
		countries.map((country) => [
			Number(country.id),
			{ id: country.id, slug: country.slug, title: text(country.title) },
		]),
	);
	const programLookup = termLookup(programs);

	return shaped.map(({ raw, ...item }) => {
		const thumbnail = item.earlyCareers?.thumbnail;
		if (thumbnail) {
			// A single ACF relation was `{ node }` over GraphQL, not a connection.
			const id = Number(arr(thumbnail.country)[0]);
			thumbnail.country = { node: countriesById.get(id) || null };
		}
		return { ...item, programs: termNodes(raw.program, programLookup) };
	});
};
