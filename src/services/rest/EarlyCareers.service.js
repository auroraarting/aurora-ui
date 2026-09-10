import RESTAPI, { restAll, restByIds } from "../Rest.service";

import { getPageGroup } from "./Single.service";
import { arr, html, shapeAcf, termLookup, termNodes, text } from "./shape";

/**
 * Early-career programmes: the landing page, the listing, one programme, and
 * the listing grouped by region.
 *
 * `earlyCareers` / `earlyCareersLanding` are the ACF field-group names
 * WPGraphQL nested these fields under, and the sections read those paths.
 *
 * Two things need resolving that GraphQL inlined: the country a programme runs
 * in (an ACF relation, so a post id) and the `programs` taxonomy terms (term
 * ids on the post). Both are resolved once for a whole listing rather than per
 * entry, so a twelve-programme page costs two extra calls, not twenty-four.
 */

/** What a programme card renders. `region` rides along so the by-region
 *  grouping can be done locally instead of one query per region. */
const listingFields =
	"id,slug,title,content,program,region,acf.banner,acf.thumbnail";

/** The detail page reads the whole field group. */
const insideFields = "id,slug,title,status,acf";

/**
 * Resolve the country relation and the programs taxonomy across a set of
 * entries, in one call each.
 *
 * @param {Array<{ earlyCareers: any, programIds: number[] }>} entries shaped
 *   entries, mutated in place
 */
async function attachRelations(entries) {
	const countryIds = [
		...new Set(
			entries
				.map((entry) => Number(arr(entry.earlyCareers?.thumbnail?.country)[0]))
				.filter(Boolean),
		),
	];
	const programIds = [
		...new Set(entries.flatMap((entry) => entry.programIds || [])),
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

	for (const entry of entries) {
		const thumbnail = entry.earlyCareers?.thumbnail;
		if (thumbnail) {
			// A single ACF relation was `{ node }` over GraphQL, not a connection.
			const id = Number(arr(thumbnail.country)[0]);
			thumbnail.country = { node: countriesById.get(id) || null };
		}
		if (entry.programIds) {
			entry.programs = termNodes(entry.programIds, programLookup);
		}
	}
}

/** One programme card, before its relations are attached.
 *  @param {any} post raw REST early-career post */
const shapeEntry = (post) => ({
	title: text(post.title),
	slug: post.slug,
	content: html(post.content) || null,
	earlyCareers: shapeAcf(post.acf || {}),
	programIds: arr(post.program).map(Number).filter(Boolean),
	regionIds: arr(post.region).map(Number).filter(Boolean),
});

/** Strip the taxonomy ids that were only needed for resolving and grouping.
 *  @param {any} entry */
function finalise(entry) {
	const clean = { ...entry };
	delete clean.programIds;
	delete clean.regionIds;
	return clean;
}

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

	const entries = posts.map(shapeEntry);
	await attachRelations(entries);
	return entries.map(finalise);
};

/**
 * The early-careers landing page.
 *
 * The GraphQL query selected the `programs` taxonomy alongside the page, which
 * REST cannot combine into one request, so it is a second call.
 *
 * @returns {Promise<{ page: any, programs: Array<{ slug: string, name: string }> }>}
 */
export const getEarlyCareersPage = async () => {
	const [page, programs] = await Promise.all([
		getPageGroup("early-careers-landing"),
		restAll("program?_fields=id,name,slug", { apiID: "program" }),
	]);

	return {
		page,
		programs: programs.map((program) => ({
			slug: program.slug,
			name: text(program.name),
		})),
	};
};

/**
 * One programme.
 *
 * @param {string} slug
 * @returns {Promise<any|null>} the node the section takes as `data`, or null
 *   when no programme matches
 */
export const getEarlyCareersInside = async (slug) => {
	const clean = decodeURIComponent(slug ?? "");
	const found = await RESTAPI(
		`early-career?slug=${encodeURIComponent(clean)}&_fields=${insideFields}`,
		{ apiID: "early-career", slug: clean },
	);
	const post = Array.isArray(found) ? found[0] : found;
	if (!post) return null;

	const entry = {
		title: text(post.title),
		slug: post.slug,
		// The page 404s on a missing or draft programme. REST will not serve an
		// unpublished post to this token anyway, so that path now ends in the
		// null check above rather than the status check — same 404 either way.
		status: post.status,
		earlyCareers: shapeAcf(post.acf || {}),
	};
	await attachRelations([entry]);
	return entry;
};

/**
 * Regions, each with the published programmes in it.
 *
 * The GraphQL query nested `regions { earlyCareers { … } }`, which REST cannot
 * express. Every programme carries its region term ids, so all twelve are
 * fetched once and grouped locally — four calls in total however many regions
 * or programmes there are.
 *
 * @returns {Promise<any[]>} the nodes previously read as
 *   `res.data.regions.nodes`
 */
export const getEarlyCareersListingByRegions = async () => {
	const [regions, posts] = await Promise.all([
		restAll("region?_fields=id,name,slug,acf", { apiID: "region" }),
		// `status=publish` mirrors the `where: {status: PUBLISH}` the GraphQL
		// query carried, rather than relying on the REST default.
		restAll(`early-career?_fields=${listingFields}&status=publish`, {
			apiID: "early-career",
		}),
	]);

	const entries = posts.map(shapeEntry);
	await attachRelations(entries);

	return regions.map((region) => ({
		name: text(region.name),
		slug: region.slug,
		// `regionsFields` is the ACF group on the region taxonomy; the page sorts
		// regions by its `sequence`.
		regionsFields: shapeAcf(region.acf || {}),
		earlyCareers: {
			nodes: entries
				.filter((entry) => entry.regionIds.includes(Number(region.id)))
				.map(finalise),
		},
	}));
};
