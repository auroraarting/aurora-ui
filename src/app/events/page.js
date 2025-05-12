// Force SSR (like getServerSideProps)
export const dynamic = "force-dynamic"; // ⚠️ Important!
export const fetchCache = "force-no-store"; // Optional: disables fetch caching

// MODULES //

// COMPONENTS //

// SECTIONS //
import EventsWrap from "@/sections/events/EventsWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// SERVICES //
import {
	getAllEventCategories,
	getAllEventCountries,
	getAllEvents,
	getEventLandingPage,
} from "@/services/Events.service";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Events | Aurora",
	description: "Aurora",
};

/** events Page */
export default async function Events() {
	const [dataFetch, categoriesFetch, filters, pageFetch] = await Promise.all([
		getAllEvents(),
		getAllEventCategories(),
		getAllEventCountries(),
		getEventLandingPage(),
	]);
	const data = dataFetch.data.events.nodes;
	const categories = categoriesFetch.data.eventscategories.nodes?.map((item) => {
		return { title: item.name };
	});
	const countries = filters.data.countries.nodes;
	const products = filters.data.products.nodes;
	const softwares = filters.data.softwares.nodes;
	const services = filters.data.services.nodes;
	const page = pageFetch.data.page.eventLanding;

	return (
		<div>
			{/* Metatags */}
			{/* <MetaTags Title={"Events"} Desc={""} OgImg={""} Url={"/events"} /> */}

			{/* Header */}
			{/* <Header /> */}

			{/* Page Content starts here */}
			<EventsWrap
				data={data}
				categories={categories}
				countries={countries}
				products={products}
				softwares={softwares}
				services={services}
				page={page}
			/>
			{/* Page Content ends here */}

			{/* Footer */}
			{/* <Footer /> */}
		</div>
	);
}
