export const dynamic = "force-static";

// SECTIONS //
import EarlyCareersHub from "@/sections/careers/EarlyCareersHub";

// SERVICES //
import { getProgrammeList } from "@/services/EarlyCareers.service";

// DATA //
import { cityDetails, hub, programmeAccent } from "@/data/earlyCareersProgrammes";

export const metadata = {
	title: "Early Careers | Aurora Energy Research",
	description: hub.hero.description,
	alternates: {
		canonical: "https://auroraer.com/careers/early-careers",
	},
	openGraph: {
		images: [{ url: "https://auroraer.com/img/og-image.jpg" }],
	},
};

/** Group the CMS programmes into region → city → programme for the accordion.
 *  A city offered by several programmes is listed once, with each programme
 *  under it; cities order by their hub sequence, then by name.
 *
 *  Regions follow the hub's own list (matched to the CMS term by slug or name),
 *  so the regions without programmes yet keep their "on the current site" note;
 *  a CMS region the hub doesn't know is added after them.
 *  @param {Array} programmes `programmes.nodes` from getProgrammeList */
function buildRegions(programmes) {
	const regionsBySlug = new Map();
	programmes.forEach((programme) => {
		const role = {
			slug: programme.slug,
			label: programme.title,
			accent: programmeAccent(programme.slug),
		};
		for (const term of programme.regions?.nodes || []) {
			if (!regionsBySlug.has(term.slug)) {
				regionsBySlug.set(term.slug, { ...term, cities: new Map() });
			}
			const cities = regionsBySlug.get(term.slug).cities;
			for (const country of programme.careercountries?.nodes || []) {
				if (!cities.has(country.slug)) {
					cities.set(country.slug, {
						city: country.name,
						flagEmoji: cityDetails[country.slug]?.flagEmoji,
						sequence: cityDetails[country.slug]?.sequence ?? Infinity,
						roles: [],
					});
				}
				cities.get(country.slug).roles.push(role);
			}
		}
	});

	/** City map → sorted accordion rows. @param {Map} [cities] */
	const toCities = (cities) =>
		[...(cities?.values() || [])]
			.sort((a, b) => a.sequence - b.sequence || a.city.localeCompare(b.city))
			.map(({ city, flagEmoji, roles }) => ({ city, flagEmoji, roles }));

	const matched = new Set();
	const known = hub.regions.map((region) => {
		const cms = [...regionsBySlug.values()].find(
			(term) => term.slug === region.slug || term.name === region.name,
		);
		if (cms) matched.add(cms.slug);
		return { ...region, name: cms?.name || region.name, cities: toCities(cms?.cities) };
	});
	const extra = [...regionsBySlug.values()]
		.filter((term) => !matched.has(term.slug))
		.map((term) => ({ name: term.name, slug: term.slug, note: null, cities: toCities(term.cities) }));

	return [...known, ...extra];
}

/** Early careers hub (redesign) */
export default async function EarlyCareersProgrammes() {
	const res = await getProgrammeList();
	const programmes = res?.data?.programmes?.nodes || [];

	return (
		<EarlyCareersHub
			hero={hub.hero}
			explore={hub.explore}
			regions={buildRegions(programmes)}
		/>
	);
}
