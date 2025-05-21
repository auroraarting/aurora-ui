import "@/styles/globals/globals.scss";

import { GlobalContext } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HighlightSearched from "@/components/HighlightSearched";
import "@/styles/globals/globals.scss";
import { fetchNavigationData } from "@/services/Navigation.service";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loader from "@/components/Loader";

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
	const navigation = await fetchNavigationData();

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
