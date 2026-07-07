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
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "company", idType: URI)');
	const seo = meta?.data?.page?.seo;

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

export const revalidate = 30; // Revalidates every 60 seconds

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
