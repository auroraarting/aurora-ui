// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import OurTeamWrap from "@/sections/careers/OurTeamWrap";

// PLUGINS //

// UTILS //
import { dynamicInsightsBtnProps } from "@/utils";

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
import { getOurTeamsPage } from "@/services/OurTeams.service";
import { getOffices } from "@/services/Offices.service";

/** Meta Data */
export const metadata = {
	title: "Our Team | Aurora",
	description: "Aurora",
};

export const revalidate = 60; // Revalidates every 60 seconds

/** LifeAtAurora Page */
export default async function LifeAtAurora() {
	const [dataFetch, jobs, page, categoriesForSelect, list, offices] =
		await Promise.all([
			await getLifeAtAurora(),
			await getFetchJobData(),
			await getOurTeamsPage(),
			await getInsightsCategories(),
			await getInsights(
				'first: 3, where: {categoryName: "case-studies,commentary,market-reports"}'
			),
			await getOffices(),
		]);
	let obj = {
		data: {
			...dataFetch.data.page.lifeAtAurora,
			offices: dataFetch.data.offices.nodes,
		},
	};
	delete obj.data.lifeAtAurora;

	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;
	const data = page.data.page.ourTeams;
	const products = categoriesForSelect.data.products.nodes;
	const softwares = categoriesForSelect.data.softwares.nodes;
	const services = categoriesForSelect.data.services.nodes;
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags
				Title={"Our Team"}
				Desc={""}
				OgImg={""}
				Url={"/careers/our-team"}
			/> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<OurTeamWrap
				data={data}
				jobs={jobs}
				otherList={otherList}
				countries={countries}
				products={products}
				softwares={softwares}
				services={services}
				offices={offices?.data?.offices?.nodes}
			/>
			<IframeModal />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
