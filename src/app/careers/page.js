/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import CareersWrap from "@/sections/careers/CareersWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/careers/Careers.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";

/** Meta Data */
export const metadata = {
	title: "Careers | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/careers", // 👈 canonical URL
	},
};

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** Careers Page */
export default async function Careers() {
	const [categoriesForSelect, list] = await Promise.all([
		await getInsightsCategories(),
		await getInsights(
			'first: 3, where: {categoryName: "case-studies,commentary,market-reports,policy-notes,newsletters,new-launches"}'
		),
	]);
	const otherList = list?.data?.posts?.nodes;
	const countries = categoriesForSelect.data.countries.nodes;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Careers"} Desc={""} OgImg={""} Url={"/careers"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<CareersWrap otherList={otherList} countries={countries} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
