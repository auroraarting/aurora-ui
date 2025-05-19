// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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

/** Meta Data */
export const metadata = {
	title: "About | Aurora",
	description: "Aurora",
};

/** Fetch  */
async function getData() {
	const [data, categoriesForSelect, officesFetch] = await Promise.all([
		getAboutPage(),
		getInsightsCategories(),
		getOffices(),
	]);
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
			url: "/careers/life-at-aurora",
			hoverImg: item.offices.thumbnail.node.mediaItemUrl,
			unique: Math.random(),
			// icon:
			// 	"https://aurora.mystagingwebsite.com/wp-content/uploads/2025/03/serviceIcon.png",
		};

		tempMapJson.markers.push(obj);
	});

	return {
		props: {
			...obj,
			mapJson: tempMapJson,
			countries: categoriesForSelect?.data?.countries?.nodes || [],
		},
	};
}

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
