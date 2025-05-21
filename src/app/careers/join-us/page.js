// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import JoinusWrap from "@/sections/careers/JoinusWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getFetchJobData } from "@/services/JobOpenings.service";
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getJoinUsPage } from "@/services/JoinUs.service";

/** Meta Data */
export const metadata = {
	title: "Join Us | Aurora",
	description: "Aurora",
};

/** JoinUs Page */
export default async function JoinUs() {
	const [jobs, categoriesForSelect, list, pageFetch] = await Promise.all([
		getFetchJobData(),
		getInsightsCategories(),
		getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
		),
		getJoinUsPage(),
	]);

	const page = pageFetch.data.page.joinUs;
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Join Us"} Desc={""} OgImg={""} Url={"/careers/join-us"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<JoinusWrap
				jobs={jobs}
				page={page}
				otherList={otherList}
				countries={countries}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
