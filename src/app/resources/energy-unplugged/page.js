/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import EnergyTalksWrap from "@/sections/resources/energy-talks/EnergyTalksWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getEnergyTalksPage,
	getEnergyTalksPageSocialLinks,
} from "@/services/rest/EnergyTalks.service";
import { getInsightsCategories } from "@/services/rest/Insights.service";
import { getPodcasts } from "@/services/rest/Podcast.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "energy-talks-listing");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/resources/energy-unplugged", // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch getStaticProps */
async function getData() {
	// This page renders all six option lists, so getInsightsCategories earns
	// its keep here. The getInsights import alongside it was never called.
	const [podcasts, options, energyTalksPage, social] = await Promise.all([
		getPodcasts(),
		getInsightsCategories(),
		getEnergyTalksPage(),
		getEnergyTalksPageSocialLinks(),
	]);

	return {
		props: {
			// `pagination` read podcasts' response for a `posts.pageInfo` that was
			// never in it, so it has always been an empty object.
			pagination: {},
			data: [...podcasts].sort(
				(a, b) => new Date(b?.podcastFields.date) - new Date(a?.podcastFields.date),
			),
			tags: options.tags,
			categories: options.categories,
			countries: options.countries,
			products: options.products,
			softwares: options.softwares,
			services: options.services,
			energyTalksPage,
			socialLinks: social?.socialLinks,
		},
	};
}

/** Energy Page */
export default async function EnergyTalks() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Energy Unplugged"}
				Desc={""}
				OgImg={""}
				Url={"/energy-unplugged"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EnergyTalksWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
