/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import GlobalPresenceInsideWrap from "@/sections/global-presence/GlobalPresenceInsideWrap";

// PLUGINS //

// UTILS //
import { getMapJsonForCountries } from "@/utils";

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import {
	getCountries,
	getCountryInside,
	getRegions,
} from "@/services/GlobalPresence.service";
import { getCountryInside as getCountryInsideWithLanguages } from "@/services/GlobalPresenceLanguages.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getAllEvents } from "@/services/Events.service";
import { getWebinars } from "@/services/Webinar.service";
import { getPageSeo } from "@/services/Seo.service";

// export const revalidate = 18000; // Revalidates every 60 seconds

/** generateMetadata  */
export async function generateMetadata({ params }) {
	const { slug } = await params;
	const meta = await getPageSeo(`countryBy(slug: "${slug}")`);
	const seo = meta?.data?.countryBy?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** generateStaticParams  */
export async function generateStaticParams() {
	const countries = await getCountries();
	return countries?.data?.countries?.nodes?.map((item) => ({
		slug: item?.slug || "india",
	}));
}

/** Fetch  */
async function getData({ params, query }) {
	const language = query.language;
	// const isJapanese = language === "jp";

	const [
		insightsRes,
		categoriesRes,
		//  eventsRes,
		//  webinarsRes,
		countryData,
	] = await Promise.all([
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getInsightsCategories(),
		// getAllEvents("first:9999"),
		// getWebinars("first:9999"),
		// isJapanese
		// 	? getCountryInsideWithLanguages(params.slug)
		// 	: getCountryInside(params.slug),
		getCountryInside(params.slug),
	]);

	// const countryBy = isJapanese
	// 	? {
	// 			...countryData?.data?.countryBy?.translations?.[0],
	// 			translations: [{ slug: "jp", title: "Japan" }],
	// 	  }
	// 	: countryData?.data?.countryBy;

	const countryBy = countryData?.data?.countryBy;
	const mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	const insightsList = insightsRes?.data?.posts?.nodes || [];
	const countries = categoriesRes?.data?.countries?.nodes || [];

	// Optional: enable this if fallback 404 is desired
	// if (!countryBy) return { notFound: true };

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList,
			countries,
			// events: eventsList.slice(0, 1),
			// webinars: webinarList.slice(0, 3),
		},
	};
}

/** Australia Page */
export default async function Australia({ params, searchParams }) {
	const { slug } = await params;
	const query = await searchParams;
	const { props } = await getData({ params: { slug }, query });

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data.title}
				Desc={""}
				OgImg={""}
				Url={`/global-presense/${data.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<GlobalPresenceInsideWrap {...props} slug={slug} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
