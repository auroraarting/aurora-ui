/* eslint-disable quotes */
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
import { getFaqPage } from "@/services/rest/Faq.service";
import { getPageSeo } from "@/services/rest/Seo.service";

// No page-level timer: content refreshes when WordPress calls /api/revalidate
// with the tags it changed. The fetches keep a 24h safety net for a webhook that
// never arrives (see services/cacheTags.js).

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo({ postType: "pages", slug: "faq" });
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
