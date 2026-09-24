// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import PressReleasesWrap from "@/sections/company/press-releases/PressReleasesWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/press-releases/PressReleases.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// DATA //

// SERVICES //
import { getFilterOptions } from "@/services/rest/FilterOptions.service";
import { getInsights } from "@/services/rest/Insights.service";
import { getAllLanguages } from "@/services/rest/Languages.service";
import { getPressPage } from "@/services/rest/Press.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "press-releases");
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

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** Fetch */
async function getData() {
	// getAllEventCountries queried four collections in one GraphQL request;
	// /aurora/v1/filter-options is the REST equivalent, also one request. The
	// getPresses and getPressesCards imports here were never called — that post
	// type no longer exists (WPGraphQL returns null for it), and this page reads
	// posts in the "media" category instead.
	const [data, filters, languages, page] = await Promise.all([
		getInsights({ all: true, categories: ["media"] }),
		getFilterOptions(),
		getAllLanguages(),
		getPressPage(),
	]);

	return {
		props: {
			data,
			countries: filters.countries,
			products: filters.products,
			softwares: filters.softwares,
			services: filters.services,
			languages,
			page,
		},
	};
}

/** Press Releases Page */
export default async function PressReleases() {
	const { props } = await getData();
	return (
		<div>
			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<PressReleasesWrap {...props} />

			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
