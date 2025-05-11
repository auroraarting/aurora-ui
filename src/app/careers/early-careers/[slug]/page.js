// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import EarlyCareersInsideWrap from "@/sections/careers/EarlyCareersInsideWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getInsightsCategories } from "@/services/Insights.service";
import {
	getEarlyCareersInside,
	getEarlyCareersListing,
} from "@/services/EarlyCareers.service";
import { getOffices } from "@/services/Offices.service";

// DATA //

/** EarlyCareers Page */
export default async function EarlyCareers({ params }) {
	const [dataFetch, categoriesForSelect, list, officesFetch] = await Promise.all(
		[
			getEarlyCareersInside(params.slug),
			getInsightsCategories(),
			getEarlyCareersListing("first: 10"),
			getOffices(),
		]
	);

	const countries = categoriesForSelect.data.countries.nodes;
	const data = dataFetch.data.earlyCareerBy;
	const otherList = list.data.earlyCareers.nodes?.filter(
		(item) => item.slug !== params.slug
	);
	const offices = officesFetch.data.offices.nodes;
	const dataForBtn = { postFields: data?.earlyCareers?.insights || {} };

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={data?.title}
				Desc={""}
				OgImg={""}
				Url={`/careers/early-careers/${data?.slug}`}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EarlyCareersInsideWrap
				data={data}
				otherList={otherList}
				offices={offices}
				dataForBtn={dataForBtn}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
