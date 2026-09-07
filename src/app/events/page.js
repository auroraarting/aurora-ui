// Renders here outlast Vercel's 15s default function budget (the layout alone
// spends ~11s on WPGraphQL — see services/Graphql.service.js). Without this,
// every ISR regeneration is killed mid-render, so a revalidated page has
// nothing to replace its stale HTML with and the edit never appears.
// 300s is the Pro + Fluid compute ceiling.
export const maxDuration = 300;

// Force SSR (like getServerSideProps)
// export const dynamic = "force-dynamic"; // ⚠️ Important!
export const dynamic = "force-static"; // Use when data is highly cacheable
// ❌ Remove: export const fetchCache = "force-no-store";

// MODULES //

// COMPONENTS //

// SECTIONS //
import EventsWrap from "@/sections/events/EventsWrap";

import { pause } from "@/utils/pace";

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
	alternates: {
		canonical: "https://auroraer.com/events", // 👈 canonical URL
	},
};

/** events Page */
export default async function Events() {
	// One at a time, a second apart. Note the shape this replaced —
	// `Promise.all([await getAllEvents(), await getAllEventCategories(), …])` —
	// was already sequential: array elements evaluate left to right, so each
	// `await` settled before the next call was made and Promise.all only ever
	// received finished values. The pauses are the actual change.
	const dataFetch = await getAllEvents();
	await pause();
	const categoriesFetch = await getAllEventCategories();
	await pause();
	const filters = await getAllEventCountries();
	await pause();
	const pageFetch = await getEventLandingPage();
	const data = dataFetch?.data?.events?.nodes?.sort(
		(a, b) =>
			new Date(b?.events?.thumbnail?.date) - new Date(a?.events?.thumbnail?.date),
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
