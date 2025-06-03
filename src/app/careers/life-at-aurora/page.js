// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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
import { getEarlyCareersListing } from "@/services/EarlyCareers.service";

/** Meta Data */
export const metadata = {
	title: "Life at Aurora | Aurora",
	description: "Aurora",
};

/** LifeAtAurora Page */
export default async function LifeAtAurora() {
	const [data, jobs, offices, categoriesForSelect, list, careersListFetch] =
		await Promise.all([
			await getLifeAtAurora(),
			await getFetchJobData(),
			await getOffices(),
			await getInsightsCategories(),
			await getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
			),
			await getEarlyCareersListing("first: 10"),
		]);
	let obj = {
		data: { ...data.data.page.lifeAtAurora, offices: offices.data.offices.nodes },
	};
	delete obj.data.lifeAtAurora;
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	const careersList = careersListFetch.data.earlyCareers.nodes;

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
				careersList={careersList}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
