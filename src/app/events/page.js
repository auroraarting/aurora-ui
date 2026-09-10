// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
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
	getAllEvents,
	getEventLandingPage,
	getFilterOptions,
} from "@/services/rest/Events.service";

// DATA //

/** Meta Data */
export const metadata = {
	title: "Events | Aurora",
	description: "Aurora",
	alternates: {
		canonical: "https://auroraer.com/events", // 👈 canonical URL
	},
};

// Statically generated, then refreshed on demand only: the REST services tag
// every fetch (see services/rest/tags.js) and WordPress invalidates those tags
// through /api/revalidate. There is deliberately no `export const revalidate`
// here — a TTL would regenerate this page on a timer whether or not anything
// changed.

/** events Page */
export default async function Events() {
	// getAllEventCountries queried four collections in one GraphQL request;
	// /aurora/v1/filter-options is the REST equivalent, also one request.
	const [events, eventCategories, filters, page] = await Promise.all([
		getAllEvents(),
		getAllEventCategories(),
		getFilterOptions(),
		getEventLandingPage(),
	]);
	const data = [...events].sort(
		(a, b) =>
			new Date(b?.events?.thumbnail?.date) - new Date(a?.events?.thumbnail?.date),
	);
	const categories = eventCategories.map((item) => ({ title: item.name }));
	const { countries, products, softwares, services } = filters;

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
