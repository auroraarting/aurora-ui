export const revalidate = 30; // Revalidates every 86400 seconds

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
import { GTM_ID } from "@/lib/tags";

/** Meta Data */
export const metadata = {
	// title: "Aurora",
	// description: "Aurora",
	icons: {
		icon: "/img/favicon.png",
	},
	metadataBase: new URL("https://auroraer.com"),
	openGraph: {
		images: [
			{
				url: "https://auroraer.com/img/og-image.jpg",
			},
		],
	},
	alternates: {
		// canonical: "https://auroraer.com/", // 👈 canonical URL
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
				{/* Google Tag Manager */}
				<Script id="google-tag-manager" strategy="beforeInteractive">
					{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','${GTM_ID}');
                    `}
				</Script>
				{/* End Google Tag Manager */}

				<Script id="linkedin-insight" strategy="beforeInteractive">
					{`_linkedin_partner_id = "6679418"; window._linkedin_data_partner_ids =
					window._linkedin_data_partner_ids || [];
					window._linkedin_data_partner_ids.push(_linkedin_partner_id);`}
				</Script>
				<Script id="linkedin-insight-tag" strategy="beforeInteractive">
					{`(function(l) {
                        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                        window.lintrk.q=[]}
                        var s = document.getElementsByTagName("script")[0];
                        var b = document.createElement("script");
                        b.type = "text/javascript";b.async = true;
                        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                        s.parentNode.insertBefore(b, s);})(window.lintrk);
                    `}
				</Script>

				<Script
					id="cookieyes"
					strategy="beforeInteractive"
					src="https://cdn-cookieyes.com/client_data/c6fa123059758f90cec26dbf/script.js"
				/>

				<Script id="ms-clarity" strategy="afterInteractive">
					{`(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "s5h7yx11f3");`}
				</Script>
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
				<noscript>
					<img
						height="1"
						width="1"
						style={{ display: "none" }}
						alt=""
						src="https://px.ads.linkedin.com/collect/?pid=6679418&fmt=gif"
					/>
				</noscript>

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
