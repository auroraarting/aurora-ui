/* eslint-disable quotes */
/* eslint-disable @next/next/no-html-link-for-pages */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
// SEO from GraphQL. Same signature and same `{ status, seo }` shape as the
// REST service, so this is an import swap; the endpoint and slug still
// become the cache tag (pages/faq -> page:faq).
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a
	// GraphQL selector, and returns the seo block directly.
	const meta = await getPageSeo("pages", "who-are-you");
	const seo = meta?.seo;

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

// No time-based revalidation. NOTE: this page's data still comes from
// /graphql, and those requests are POSTs, which Next.js cannot cache or tag —
// so it no longer refreshes on a timer and will only regenerate on a deploy or
// when WordPress calls /api/revalidate?paths=<this route>. Converting its
// services to the REST layer puts it back on cache tags.

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
