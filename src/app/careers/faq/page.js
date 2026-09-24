/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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

export const revalidate = false; // On-demand only: refreshed by tags via /api/revalidate
export const maxDuration = 300; // Let ISR regeneration outlive Vercel's 15s default (slow CMS)

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
