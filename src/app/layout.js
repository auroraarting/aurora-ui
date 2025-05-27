import "@/styles/globals/globals.scss";

import { GlobalContext } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HighlightSearched from "@/components/HighlightSearched";
import "@/styles/globals/globals.scss";
import { fetchNavigationData } from "@/services/Navigation.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loader from "@/components/Loader";
import navigationJSON from "@/data/navigationData.json";
import { getAllEvents } from "@/services/Events.service";

/** Meta Data */
export const metadata = {
	title: "Aurora",
	description: "Aurora",
	icons: {
		icon: "/img/favicon.png",
	},
};

/** layout page */
export default async function RootLayout({ children }) {
	// const navigation = await fetchNavigationData();
	const eventsFetch = await getAllEvents("first:9999");
	const events = eventsFetch?.data?.events?.nodes
		?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
		?.sort(
			(a, b) =>
				new Date(a?.events?.thumbnail?.date) - new Date(b?.events?.thumbnail?.date)
		)
		.slice(0, 1);

	const navigation = { ...navigationJSON, events };

	return (
		<html lang="en">
			<body>
				<GlobalContext>
					{/* Header */}
					<Header defaultNavigation={navigation} />
					<HighlightSearched />
					<Loader hide />
					{/* <Breadcrumbs /> */}
					{children}
					{/* Footer */}
					<Footer defaultNavigation={navigation} />
				</GlobalContext>
			</body>
		</html>
	);
}
