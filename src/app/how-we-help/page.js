/* eslint-disable quotes */
/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
// import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";
import Insights from "@/components/Insights";
import IframeModal from "@/components/IframeModal";

// SECTIONS //
import HowWeHelpWrap from "@/sections/how-we-help/HowWeHelpWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/how-we-help/HowWeHelp.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

// SERVICES //
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "how-we-help", idType: URI)');
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

/** HowWeHelp Page */
export default function HowWeHelp() {
	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<HowWeHelpWrap />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
