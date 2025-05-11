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
