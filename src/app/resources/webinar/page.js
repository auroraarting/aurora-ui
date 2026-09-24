/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import WebinarTalksWrap from "@/sections/resources/webinar/WebinarWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/webinar/Webinar.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// SERVICES //
import { getInsightsCategories } from "@/services/rest/Insights.service";
import { getPageSeo } from "@/services/rest/Seo.service";
import {
	getWebinarPage,
	getWebinars,
} from "@/services/rest/Webinar.service";

// DATA //

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "webinar-listing");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/resources/webinar`, // 👈 canonical URL
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

/** Fetch  getStaticProps*/
async function getData() {
	// This page renders all six option lists, so getInsightsCategories earns
	// its keep here. The getInsights import alongside it was never called.
	const [webinars, options, webinarpage] = await Promise.all([
		getWebinars(),
		getInsightsCategories(),
		getWebinarPage(),
	]);
	let pastSpeakers = [];

	return {
		props: {
			// `pagination` read webinars' response for a `posts.pageInfo` that was
			// never in it, so it has always been an empty object.
			pagination: {},
			data: [...webinars].sort(
				(a, b) =>
					new Date(b.webinarsFields?.startDateAndTime) -
					new Date(a.webinarsFields?.startDateAndTime),
			),
			tags: options.tags,
			categories: options.categories,
			countries: options.countries,
			products: options.products,
			softwares: options.softwares,
			services: options.services,
			pastSpeakers,
			webinarpage,
		},
	};
}

/** Webinar Page */
export default async function WebinarTalks() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Webinar"} Desc={""} OgImg={""} Url={"/webinar"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<WebinarTalksWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
