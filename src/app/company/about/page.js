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
import { getAboutPage } from "@/services/rest/About.service";
import { getCountryList } from "@/services/rest/GlobalPresence.service";
import { getOffices } from "@/services/rest/Offices.service";
import { getEosPage } from "@/services/rest/Eos.service";
import { getBundlesSection } from "@/services/rest/Bundles.service";
import { getPageSeo } from "@/services/rest/Seo.service";

/** generateMetadata  */
export async function generateMetadata() {
	// The REST SEO service takes an endpoint and a slug rather than a GraphQL
	// fragment, and returns the `seo` object directly.
	const meta = await getPageSeo("pages", "about");
	const seo = meta?.seo;

	return {
		title: seo?.title || "Default Title",
		description: seo?.metaDesc || "",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/company/about", // 👈 canonical URL
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
	// The 200ms sleeps between these calls were pacing /graphql by hand. Every
	// REST call queues through one p-limit limiter (services/rest/limiter.js),
	// so the pacing is central now and these can run together.
	// This page only ever read `countries` off getInsightsCategories, which
	// fetched six option lists to get it — getCountryList is the one call.
	const [data, countries, offices, pageEos, bundles] = await Promise.all([
		getAboutPage(),
		getCountryList(),
		getOffices(),
		getEosPage(),
		getBundlesSection(),
	]);

	// The section reads the field group with the office list merged onto it.
	const obj = { data: { ...data, offices } };

	let tempMapJson = {
		zoom: 9,
		name: "Global",
		centerOfCountry: {
			lat: 18.1307561,
			lng: 23.554042,
		},
		markers: [],
	};

	offices?.slice(0, 17).map((item) => {
		let obj = {
			name: item?.title,
			lat: item?.offices?.map?.lat,
			lng: item?.offices?.map?.lng,
			url: "",
			hoverImg: item?.offices?.thumbnail?.node?.mediaItemUrl,
			unique: Math.random(),
			// icon:
			// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
		};

		tempMapJson?.markers?.push(obj);
	});
	return {
		props: {
			...obj,
			mapJson: tempMapJson,
			countries: countries || [],
			pageEos,
			bundles,
		},
	};
}

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

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
