export const revalidate = 86400; // Revalidates every 86400 seconds

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
import Script from "next/script";
import { getWebinars } from "@/services/Webinar.service";

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
	const [navigationFetch, eventsFetch, webinarsFetch] = await Promise.all([
		fetchNavigationData(),
		getAllEvents("first:9999"),
		getWebinars("first:9999"),
	]);
	// const navigationFetch = await fetchNavigationData();
	// const eventsFetch = await getAllEvents("first:9999");
	const events = eventsFetch?.data?.events?.nodes
		?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
		?.sort(
			(a, b) =>
				new Date(a?.events?.thumbnail?.date) - new Date(b?.events?.thumbnail?.date)
		)
		.slice(0, 1);

	const navigation = { ...navigationFetch, events };

	// console.log(navigationFetch, "navigationFetch");
	// console.log(navigationJSON, "eventsFetch");

	return (
		<html lang="en">
			<head>
				<Script
					id="cookieyes"
					strategy="beforeInteractive"
					src="https://cdn-cookieyes.com/client_data/c6fa123059758f90cec26dbf/script.js"
				/>
			</head>
			<body>
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-T74CK9L2"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					></iframe>
				</noscript>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-Z75SWZL0J6"
				></Script>
				<Script id="google-analytics" strategy="afterInteractive">
					{`window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-Z75SWZL0J6');`}
				</Script>
				{/* Google Tag Manager */}
				<Script id="google-tag-manager" strategy="afterInteractive">
					{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-T74CK9L2');`}
				</Script>
				{/* End Google Tag Manager */}

				<GlobalContext>
					{/* Header */}
					<Header
						defaultNavigation={navigation}
						allEvents={eventsFetch}
						allWebinars={webinarsFetch}
					/>
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
