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
import {
	getPresses,
	getPressesCards,
	getPressesLanguages,
	getPressPage,
} from "@/services/Press.service";
import { getAllEventCountries } from "@/services/Events.service";
import { getInsights } from "@/services/Insights.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "press-releases", idType: URI)');
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

/** Fetch */
async function getData() {
	const [data, filters, languages, page] = await Promise.all([
		await getInsights('first: 9999, where: {categoryName: "media"}'),
		await getAllEventCountries(),
		await getPressesLanguages(),
		await getPressPage(),
	]);

	return {
		props: {
			data: data.data.posts.nodes,
			countries: filters.data.countries.nodes,
			products: filters.data.products.nodes,
			softwares: filters.data.softwares.nodes,
			services: filters.data.services.nodes,
			languages: languages.data.languages,
			page: page?.data?.page?.pressLanding,
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
