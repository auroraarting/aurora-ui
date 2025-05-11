// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import LifeAtAuroraWrap from "@/sections/careers/LifeAtAuroraWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getLifeAtAurora } from "@/services/Careers.service";
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getOffices } from "@/services/Offices.service";

/** LifeAtAurora Page */
export default async function LifeAtAurora() {
	const [data, jobs, offices, categoriesForSelect, list] = await Promise.all([
		getLifeAtAurora(),
		getFetchJobData(),
		getOffices(),
		getInsightsCategories(),
		getInsights('first: 3, where: {categoryName: ""}'),
	]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: data.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Life At Aurora"}
				Desc={""}
				OgImg={""}
				Url={"/life-at-aurora"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<LifeAtAuroraWrap
				data={obj.data}
				offices={offices?.data?.offices?.nodes}
				otherList={otherList}
				countries={countries}
				jobs={jobs}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
