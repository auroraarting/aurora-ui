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
	insightTeaserCategories,
} from "@/services/rest/Insights.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";

/** Meta Data */
export const metadata = {
	title: "Careers | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/careers", // 👈 canonical URL
	},
};

// No time-based revalidation. NOTE: this page's data still comes from
// /graphql, and those requests are POSTs, which Next.js cannot cache or tag —
// so it no longer refreshes on a timer and will only regenerate on a deploy or
// when WordPress calls /api/revalidate?paths=<this route>. Converting its
// services to the REST layer puts it back on cache tags.

/** Careers Page */
export default async function Careers() {
	// getInsightsCategories fetched six option lists — tags, categories,
	// countries, products, softwares, services — for the `countries` value this
	// page actually reads. getCountryList is the one call. The category list is
	// the same six the other landing pages use, so it comes from the shared
	// insightTeaserCategories rather than being spelled out again.
	const [countries, otherList] = await Promise.all([
		getCountryList(),
		getInsights({ first: 3, categories: insightTeaserCategories }),
	]);

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
