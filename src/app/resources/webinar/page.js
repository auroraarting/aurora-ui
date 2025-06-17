/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import WebinarTalksWrap from "@/sections/resources/webinar/WebinarWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/resources/webinar/Webinar.module.scss";

// IMAGES //
import country_thumb from "@/../public/img/global-presence/country_thumb.jpg";

// SERVICES //
import {
	getInsights,
	getInsightsCategories,
} from "@/services/Insights.service";
import { getWebinarPage, getWebinars } from "@/services/Webinar.service";
import { getPageSeo } from "@/services/Seo.service";

// DATA //

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "webinar-listing", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "Default description",
		keywords: seo?.metaKeywords || "Default description",
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

export const revalidate = 60; // Revalidates every 60 seconds

/** Fetch  getStaticProps*/
async function getData() {
	const [data, categoriesForSelect, webinarpage] = await Promise.all([
		await getWebinars(),
		await getInsightsCategories(),
		await getWebinarPage(),
	]);
	let pastSpeakers = [];

	return {
		props: {
			pagination: data.data?.posts?.pageInfo || {},
			data:
				data?.data?.webinars?.nodes.sort(
					(a, b) =>
						new Date(b.webinarsFields?.startDateAndTime) -
						new Date(a.webinarsFields?.startDateAndTime)
				) || [],
			tags: categoriesForSelect.data.tags.nodes,
			categories: categoriesForSelect.data.categories.nodes,
			countries: categoriesForSelect.data.countries.nodes,
			products: categoriesForSelect.data.products.nodes,
			softwares: categoriesForSelect.data.softwares.nodes,
			services: categoriesForSelect.data.services.nodes,
			pastSpeakers,
			webinarpage: webinarpage.data.page.webinarsListing,
		},
	};
}

/** Webinar Page */
export default async function WebinarTalks() {
	const { props } = await getData();
	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Webinar"} Desc={""} OgImg={""} Url={"/webinar"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<WebinarTalksWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
