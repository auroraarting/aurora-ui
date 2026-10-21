export const dynamic = "force-static";

// SECTIONS //
import EarlyCareersHub from "@/sections/careers/EarlyCareersHub";

// DATA //
import { hub, programmes } from "@/data/earlyCareersProgrammes";

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

/** Group the programmes into region → city → programme for the accordion.
 *  A city offered by several programmes is listed once, with each programme
 *  under it; cities order by their lowest sequence, then by name. */
function buildRegions() {
	const citiesByRegion = new Map();
	for (const programme of programmes) {
		const fields = programme.programmes;
		const role = {
			slug: programme.slug,
			label: fields.header.hubLabel || programme.title,
			accent: fields.header.accent || "teal",
		};
		if (!citiesByRegion.has(programme.region))
			citiesByRegion.set(programme.region, new Map());
		const cities = citiesByRegion.get(programme.region);
		for (const row of fields.locations.cities) {
			if (!row.available) continue;
			const key = row.city.toLowerCase();
			if (!cities.has(key)) {
				cities.set(key, {
					city: row.city,
					flagEmoji: row.flagEmoji,
					sequence: row.sequence,
					roles: [],
				});
			}
			const city = cities.get(key);
			city.sequence = Math.min(city.sequence, row.sequence);
			city.roles.push(role);
		}
	}

	return hub.regions.map((region) => ({
		...region,
		cities: [...(citiesByRegion.get(region.slug)?.values() || [])]
			.sort((a, b) => a.sequence - b.sequence || a.city.localeCompare(b.city))
			.map(({ city, flagEmoji, roles }) => ({ city, flagEmoji, roles })),
	}));
}

/** Early careers hub (redesign) */
export default function EarlyCareersProgrammes() {
	return (
		<EarlyCareersHub
			hero={hub.hero}
			explore={hub.explore}
			regions={buildRegions()}
		/>
	);
}
