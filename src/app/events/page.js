// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
// ❌ Remove: export const fetchCache = "force-no-store";

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
		await getAllEvents(),
		await getAllEventCategories(),
		await getAllEventCountries(),
		await getEventLandingPage(),
	]);
	const data = dataFetch.data.events.nodes.sort(
		(a, b) =>
			new Date(b?.events?.thumbnail?.date) - new Date(a?.events?.thumbnail?.date)
	);
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
