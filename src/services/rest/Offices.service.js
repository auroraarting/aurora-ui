import { restAll, restByIds } from "../Rest.service";

import { arr, html, mediaNode, shapeAcf, text, urlNode } from "./shape";

/**
 * Office locations.
 *
 * Two shapes, because two pages want different things: a flat list for the
 * careers and about maps, and a region → country → office tree for the contact
 * page's directory.
 */

/** `offices` is the ACF field-group name WPGraphQL nested these under, and the
 *  sections read `item.offices.map.lat`. */
const officeFields = "id,slug,title,content,acf";

/** Only what the contact directory renders off each country. */
const countryFields = [
	"id",
	"slug",
	"title",
	"region",
	"featured_media",
	"featured_image_url",
	"acf.sequence",
	"acf.offices",
	"acf.banner_section",
	"acf.hideonglobalpresence",
].join(",");

/**
 * One office in the GraphQL shape.
 * @param {any} office raw REST office
 */
const shapeOffice = (office) => ({
	id: office.id,
	title: text(office.title),
	slug: office.slug,
	content: html(office.content) || null,
	offices: shapeAcf(office.acf || {}),
});

/**
 * Every office, flat.
 *
 * @param {object} [options]
 * @param {number} [options.first] cap the list — WPGraphQL's default connection
 *   page size is 10, and the Life at Aurora query relied on that, so a caller
 *   that wants only the first N has to say so
 * @returns {Promise<any[]>} the nodes previously read as `res.data.offices.nodes`
 */
export const getOffices = async (options = {}) => {
	const offices = await restAll(`offices?_fields=${officeFields}`, {
		apiID: "offices",
	});
	const shaped = offices.map(shapeOffice);
	return options.first ? shaped.slice(0, options.first) : shaped;
};

/**
 * Regions, their countries, and the offices in each country.
 *
 * The contact page walks region → country → `countries.offices.offices.nodes`,
 * so that nesting is rebuilt. Countries are grouped by their region term ids
 * locally and every office is fetched once and indexed by id, so the call count
 * is four regardless of how many offices there are: regions, countries,
 * offices, and the region taxonomy's own fields.
 *
 * The GraphQL envelope is kept — the page reads `regions.data.regions.nodes`.
 *
 * @returns {Promise<{ data: { regions: { nodes: any[] } } }>}
 */
export const getOfficesByRegions = async () => {
	const [regions, countries, offices] = await Promise.all([
		restAll("region?_fields=id,name,slug,acf", { apiID: "region" }),
		restAll(`country?_fields=${countryFields}&orderby=title&order=asc`, {
			apiID: "country",
			tags: ["region"],
		}),
		restAll(`offices?_fields=${officeFields}`, { apiID: "offices" }),
	]);

	const officesById = new Map(
		offices.map((office) => [Number(office.id), shapeOffice(office)]),
	);

	/** One country with its offices resolved. @param {any} country */
	const shapeCountry = (country) => {
		const acf = country.acf || {};
		const officeNodes = arr(acf.offices?.offices)
			.map((id) => officesById.get(Number(id)))
			.filter(Boolean);
		return {
			title: text(country.title),
			slug: country.slug,
			featuredImage: urlNode(country.featured_image_url),
			// "countries" is the ACF field-group name WPGraphQL used here.
			countries: {
				sequence: shapeAcf(acf.sequence),
				hideonglobalpresence: acf.hideonglobalpresence ?? null,
				bannerSection: {
					image: mediaNode(acf.banner_section?.image),
				},
				offices: {
					// Empty was null over GraphQL, not an empty connection.
					offices: officeNodes.length ? { nodes: officeNodes } : null,
				},
			},
		};
	};

	const nodes = regions.map((region) => ({
		name: text(region.name),
		slug: region.slug,
		// `regionsFields` is the ACF group on the region taxonomy; the page sorts
		// regions by its `sequence`.
		regionsFields: shapeAcf(region.acf || {}),
		countries: {
			nodes: countries
				.filter((country) =>
					arr(country.region).map(Number).includes(Number(region.id)),
				)
				.map(shapeCountry),
		},
	}));

	return { data: { regions: { nodes } } };
};

/**
 * Offices by id, as a `{ nodes }` connection — for the ACF office pickers on
 * the country pages.
 *
 * @param {Array<number>} ids
 */
export const getOfficesByIds = async (ids) => {
	const offices = await restByIds("offices", ids, {
		apiID: "offices",
		fields: officeFields,
	});
	return { nodes: offices.map(shapeOffice) };
};
