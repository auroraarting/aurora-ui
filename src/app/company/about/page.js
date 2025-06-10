/* eslint-disable quotes */
// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import AboutWrap from "@/sections/company/about/AboutWrap";

// PLUGINS //

// UTILS //

// STYLES //
import styles from "@/styles/pages/company/About.module.scss";

// IMAGES //

// DATA //

// SERVICES //
import { getAboutPage } from "@/services/About.service";
import { getInsightsCategories } from "@/services/Insights.service";
import { getOffices } from "@/services/Offices.service";
import { getEosPage } from "@/services/Eos.service";
import { getBundlesSection } from "@/services/Bundles.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "about", idType: URI)');
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

/** Fetch  */
async function getData() {
	// const [data, categoriesForSelect, officesFetch, pageFetch, bundlesFetch] =
	// 	await Promise.all([
	// 		await getAboutPage(),
	// 		await getInsightsCategories(),
	// 		await getOffices(),
	// 		await getEosPage(),
	// 		await getBundlesSection(),
	// 	]);
	const data = await getAboutPage();
	await new Promise((res) => setTimeout(res, 200));
	const categoriesForSelect = await getInsightsCategories();
	await new Promise((res) => setTimeout(res, 200));
	const officesFetch = await getOffices();
	await new Promise((res) => setTimeout(res, 200));
	const pageFetch = await getEosPage();
	await new Promise((res) => setTimeout(res, 200));
	const bundlesFetch = await getBundlesSection();

	let obj = {
		data: { ...data.data.page.about, offices: officesFetch.data.offices.nodes },
	};
	delete obj.data.about;

	let tempMapJson = {
		zoom: 9,
		name: "Global",
		centerOfCountry: {
			lat: 18.1307561,
			lng: 23.554042,
		},
		markers: [],
	};

	officesFetch.data.offices.nodes?.slice(0, 17).map((item) => {
		let obj = {
			name: item.title,
			lat: item.offices.map.lat,
			lng: item.offices.map.lng,
			url: "",
			hoverImg: item.offices.thumbnail.node.mediaItemUrl,
			unique: Math.random(),
			// icon:
			// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
		};

		tempMapJson.markers.push(obj);
	});
	const pageEos = pageFetch.data.page.eos;
	const bundles = bundlesFetch.data.page.bundles;

	return {
		props: {
			...obj,
			mapJson: tempMapJson,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
			pageEos,
			bundles,
		},
	};
}

export const revalidate = 60; // Revalidates every 60 seconds

/** About Page */
export default async function About() {
	const { props } = await getData();

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"About"} Desc={""} OgImg={""} Url={"/about"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<AboutWrap {...props} />
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
