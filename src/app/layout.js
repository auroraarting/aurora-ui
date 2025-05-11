import "@/styles/globals/globals.scss";

import { GlobalContext } from "@/context/GlobalContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HighlightSearched from "@/components/HighlightSearched";
import "@/styles/globals/globals.scss";

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
	// const headerData = await GetHeadersData();
	// const footerData = await getFooterData();

	return (
		<html lang="en">
			<body>
				<GlobalContext>
					{/* Header */}
					<Header />
					<HighlightSearched />
					{children}
					{/* Footer */}
					<Footer />
				</GlobalContext>
			</body>
		</html>
	);
}
