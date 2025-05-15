/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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
import { getCountryInside } from "@/services/GlobalPresence.service";
import { getCountryInside as getCountryInsideWithLanguages } from "@/services/GlobalPresenceLanguages.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Fetch Meta Data */
export async function generateMetadata({ params }) {
	const data = await getCountryInside(params.slug);
	const post = data?.data?.countryBy;

	return {
		title: post?.title || "Default Title",
		description: post?.excerpt || "Default description",
		openGraph: {
			title: post?.title,
			// description: post?.excerpt,
			// url: `https://your-domain.com/company/press-releases/${post?.slug}`,
			images: [
				{
					url:
						post?.featuredImage?.node?.mediaItemUrl ||
						"https://www-production.auroraer.com/img/og-image.jpg",
					width: 1200,
					height: 630,
					alt: post?.title,
				},
			],
		},
	};
}

/** Fetch  */
async function getData({ params, query }) {
	const language = query.language;
	let data, countryBy, mapJson;

	if (language && language === "jp") {
		// Fetch Japanese data
		[data] = await Promise.all([getCountryInsideWithLanguages(params.slug)]);
		countryBy = data?.data?.countryBy?.translations?.[0];
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	} else {
		// Default fetch
		[data] = await Promise.all([getCountryInside(params.slug)]);
		countryBy = data?.data?.countryBy;
		mapJson = getMapJsonForCountries(countryBy?.countries?.map || []);
	}
	const [insights, categoriesForSelect] = await Promise.all([
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getInsightsCategories(),
	]);
	const insightsList = insights?.data?.posts?.nodes;

	// Return 404 if no valid data
	if (!countryBy) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			data: countryBy,
			mapJson,
			insightsList,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
		},
	};
}

/** Australia Page */
export default async function Australia({ params, searchParams }) {
	const query = await searchParams;
	const { props } = await getData({ params, query });

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
			<GlobalPresenceInsideWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
