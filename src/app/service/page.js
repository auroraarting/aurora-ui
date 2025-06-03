/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //
import Link from "next/link";

// COMPONENTS //
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MetaTags from "@/components/MetaTags";
import InnerBanner from "@/components/InnerBanner";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";

// SECTIONS //
import ServicesListingWrap from "@/sections/services/ServicesListingWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/services/Services.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";
import { dynamicInsightsBtnProps } from "@/utils";

// DATA //

// SERVICES //
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "service", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://www-staging.auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** Services Page */
export default function Services() {
	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<ServicesListingWrap />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
