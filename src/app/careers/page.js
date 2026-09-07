/* eslint-disable @next/next/no-html-link-for-pages */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

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
