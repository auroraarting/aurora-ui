/* eslint-disable quotes */

// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/UpstreamRequest.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import FaqWrap from "@/sections/careers/FaqWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //
import { getFaqPage } from "@/services/Faq.service";
import { getPageSeo } from "@/services/Seo.service";


/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "faq", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/careers/faq", // 👈 canonical URL
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

/** Faq Page */
export default async function Faq() {
	const [pageFetch] = await Promise.all([await getFaqPage()]);
	const page = pageFetch.data.page.faq;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Faq"} Desc={""} OgImg={""} Url={"/careers/faq"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<FaqWrap page={page} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
