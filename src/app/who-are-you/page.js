/* eslint-disable quotes */
/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //
import MetaTags from "@/components/MetaTags";
import SoftwareCards from "@/components/SoftwareCards";

// SECTIONS //
import Insights from "@/components/Insights";
import WhoAreYouWrap from "@/sections/who-are-you/WhoAreYouWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/who-are-you/WhoAreYou.module.scss";

// IMAGES //
import dropdown_arrow from "/public/img/icons/dropdown_arrow.svg";

// DATA //

// SERVICES //
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "who-are-you" });
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: `https://auroraer.com/who-are-you`, // 👈 canonical URL
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

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** WhoAreYou Page */
export default function WhoAreYou() {
	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<WhoAreYouWrap />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
