/* eslint-disable quotes */
/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import CompanyWrap from "@/sections/company/CompanyWrap";
// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/company.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

// SERVICES //
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a
	// GraphQL selector, and returns the seo block directly.
	const meta = await getPageSeo("pages", "company");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/company", // 👈 canonical URL
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

// No time-based revalidation. NOTE: this page's data still comes from
// /graphql, and those requests are POSTs, which Next.js cannot cache or tag —
// so it no longer refreshes on a timer and will only regenerate on a deploy or
// when WordPress calls /api/revalidate?paths=<this route>. Converting its
// services to the REST layer puts it back on cache tags.

/** company Page */
export default function Company() {
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Company"} Desc={""} OgImg={""} Url={"/company"} /> */}
			{/* Header */}
			{/* <Header /> */}
			{/* Page Content starts here */}
			<CompanyWrap />
			{/* Page Content ends here */}
			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
