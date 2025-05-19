// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

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

// DATA //

/** Meta Data */
export const metadata = {
	title: "Webinar | Aurora",
	description: "Aurora",
};

/** Fetch  getStaticProps*/
async function getData() {
	const [data, categoriesForSelect, webinarpage] = await Promise.all([
		getWebinars(),
		getInsightsCategories(),
		getWebinarPage(),
	]);
	let pastSpeakers = [];

	console.log(data?.data?.webinars?.nodes);

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
