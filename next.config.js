/* eslint-disable no-sparse-arrays */
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	// experimental: {
	// 	dynamicIO: true,
	// },
	staticPageGenerationTimeout: 1000, // Increase to 1000 seconds (or higher if needed)
	images: {
		domains: [
			"img.youtube.com",
			"aurora-staging.mystagingwebsite.com",
			"cms-production.auroraer.com",
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
        default-src 'self';
        media-src 'self'  data: https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://cms-staging.auroraer.com/;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms/ https://snap.licdn.com/ https://cdn-cookieyes.com/ https://storage.googleapis.com/ https://googleads.g.doubleclick.net/ https://connect.facebook.net/ https://www.googletagmanager.com/ https://www.youtube.com https://s.ytimg.com https://maps.googleapis.com https://maps.gstatic.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com;
        img-src 'self' data: https://www.google.co.in/ https://*.clarity.ms/ https://c.bing.com/ https://px.ads.linkedin.com/ https://cdn-cookieyes.com/ https://www.googletagmanager.com/ https://cms-staging.auroraer.com/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://img.youtube.com https://i.ytimg.com https://maps.googleapis.com https://maps.gstatic.com https://google.com https://ggpht.com;
        font-src 'self' data: https://fonts.gstatic.com https://storage.googleapis.com/ https://maps.gstatic.com;
        connect-src 'self' https://vimeo.com/ https://*.clarity.ms/ https://px.ads.linkedin.com/ https://www.google-analytics.com/ https://log.cookieyes.com/ https://cdn-cookieyes.com/ https://cms-staging.auroraer.com/ https://audio.api.speechify.com/ https://speechify-api-dot-speechifymobile.uc.r.appspot.com/ https://cdn.jsdelivr.net/ https://auroraer.pinpointhq.com/ https://f.clarity.ms/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://analytics.google.com/ https://www.youtube.com https://maps.googleapis.com https://www.google.com/;
        frame-src https://www.googletagmanager.com/ https://go.auroraer.com/ https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app https://www.youtube.com https://www.youtube-nocookie.com/ https://player.vimeo.com/ https://www.google.com https://maps.google.com https://www.google.com/maps https://www.podbean.com/ https://embed.podcasts.apple.com/;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        upgrade-insecure-requests;
        `
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
					{
						key: "X-Frame-Options",
						value:
							"ALLOW-FROM https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app/ https://auroraer.com/",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "geolocation=(), camera=(), microphone=()",
					},
					{
						key: "Access-Control-Allow-Origin",
						value:
							"https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app/ https://auroraer.com/",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/advisory",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/insights",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/webinars",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/podcast",
				destination: "/resources/energy-talks",
				permanent: true,
			},
			{
				source: "/graduate-programmes",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/graduate-programmes/sao-paulo-graduate-modeling-program",
				destination:
					"/careers/early-careers/sao-paulo-graduate-modelling-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/gurugram-graduate-modeling-programme",
				destination: "/careers/early-careers/gurugram-graduate-modelling-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/austin-graduate-analyst",
				destination: "/careers/early-careers/austin-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/berlin-graduate-analyst",
				destination: "/careers/early-careers/berlin-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/oxford-graduate-analyst",
				destination: "/careers/early-careers/oxford-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/oxford-graduate-modelling",
				destination: "/careers/early-careers/oxford-graduate-modelling-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/sydney-graduate-analyst",
				destination: "/careers/early-careers/sydney-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/graduate-programmes/tokyo-graduate-analyst",
				destination: "/careers/early-careers/tokyo-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/teams",
				destination: "/careers/our-team",
				permanent: true,
			},
			{
				source: "/location",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/location/austria",
				destination: "/global-presence/austria",
				permanent: true,
			},
			{
				source: "/location/bulgaria",
				destination: "/global-presence/bulgaria",
				permanent: true,
			},
			{
				source: "/location/france",
				destination: "/global-presence/france",
				permanent: true,
			},
			{
				source: "/location/greece",
				destination: "/global-presence/greece",
				permanent: true,
			},
			{
				source: "/location/ireland",
				destination: "/global-presence/ireland",
				permanent: true,
			},
			{
				source: "/location/nordics",
				destination: "/global-presence/nordics",
				permanent: true,
			},
			{
				source: "/location/serbia",
				destination: "/global-presence/serbia",
				permanent: true,
			},
			{
				source: "/location/switzerland",
				destination: "/global-presence/switzerland",
				permanent: true,
			},
			{
				source: "/location/baltics",
				destination: "/global-presence/baltics",
				permanent: true,
			},
			{
				source: "/location/croatia",
				destination: "/global-presence/croatia",
				permanent: true,
			},
			{
				source: "/location/germany",
				destination: "/global-presence/germany",
				permanent: true,
			},
			{
				source: "/location/hungary",
				destination: "/global-presence/hungary",
				permanent: true,
			},
			{
				source: "/location/italy",
				destination: "/global-presence/italy",
				permanent: true,
			},
			{
				source: "/location/poland",
				destination: "/global-presence/poland",
				permanent: true,
			},
			{
				source: "/location/slovakia",
				destination: "/global-presence/slovakia",
				permanent: true,
			},
			{
				source: "/location/belgium",
				destination: "/global-presence/belgium",
				permanent: true,
			},
			{
				source: "/location/czechia",
				destination: "/global-presence/czechia",
				permanent: true,
			},
			{
				source: "/location/great-britain",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/location/iberia",
				destination: "/global-presence/iberia",
				permanent: true,
			},
			{
				source: "/location/netherlands",
				destination: "/global-presence/netherlands",
				permanent: true,
			},
			{
				source: "/location/romania",
				destination: "/global-presence/romania",
				permanent: true,
			},
			{
				source: "/location/slovenia",
				destination: "/global-presence/slovenia",
				permanent: true,
			},
			{
				source: "/location/india",
				destination: "/global-presence/india",
				permanent: true,
			},
			{
				source: "/location/korea",
				destination: "/global-presence/korea",
				permanent: true,
			},
			{
				source: "/location/philippines",
				destination: "/global-presence/philippines",
				permanent: true,
			},
			{
				source: "/location/japan",
				destination: "/global-presence/japan",
				permanent: true,
			},
			{
				source: "/location/malaysia",
				destination: "/global-presence/malaysia",
				permanent: true,
			},
			{
				source: "/location/singapore",
				destination: "/global-presence/singapore",
				permanent: true,
			},
			{
				source: "/location/australia",
				destination: "/global-presence/australia",
				permanent: true,
			},
			{
				source: "/location/us-canada",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/location/brazil",
				destination: "/global-presence/brazil",
				permanent: true,
			},
			{
				source: "/location/chile",
				destination: "/global-presence/chile",
				permanent: true,
			},
			{
				source: "/company/media",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/market-reports",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/company/models",
				destination: "/company/about",
				permanent: true,
			},
			{
				source: "/webinar/battery-investments-in-belgium",
				destination: "/resources/webinar/battery-investments-in-belgium",
				permanent: true,
			},
			{
				source:
					"/webinar/powering-tshe-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				destination:
					"/resources/webinar/powering-the-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				destination:
					"/company/press-room/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				permanent: true,
			},
			{
				source: "/country/europe/ais-energy-appetite-can-renewable-ppas-deliver",
				destination:
					"/resources/aurora-insights/articles/ais-energy-appetite-can-renewable-ppas-deliver",
				permanent: true,
			},
			{
				source:
					"/country/global/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth",
				destination:
					"/company/press-room/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-for-germany",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source:
					"/media/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				destination:
					"/company/press-room/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				permanent: true,
			},
			{
				source:
					"/media/aurora-launches-lumus-to-bring-clarity-to-ppa-pricing-across-europe",
				destination:
					"/company/press-room/northeast-brazil-netherlands-green-hydrogen-corridor-could-fulfill-dutch-imports-by-2030-new-study-reveals",
				permanent: true,
			},
			{
				source:
					"/media/evs-data-centers-and-hydrogen-to-quadruple-brazils-power-demand-share-by-2060-study-finds",
				destination:
					"/company/press-room/evs-data-centers-and-hydrogen-to-quadruple-brazils-power-demand-share-by-2060-study-finds",
				permanent: true,
			},
			{
				source:
					"/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				destination:
					"/company/press-room/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source: "/media/aurora-energy-transition-forum-2025",
				destination: "/company/press-room/aurora-energy-transition-forum-2025",
				permanent: true,
			},
			{
				source: "/media/proposed-texas-legislation",
				destination: "/company/press-room/proposed-texas-legislation",
				permanent: true,
			},
			{
				source: "/media/surging-demand-growth-in-texas",
				destination: "/company/press-room/surging-demand-growth-in-texas",
				permanent: true,
			},
			{
				source: "/webinar/hydrogen-market-report-hymar-april-2025",
				destination: "/resources/webinar/hydrogen-market-report-hymar-april-2025",
				permanent: true,
			},
			{
				source:
					"/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				destination:
					"/resources/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				permanent: true,
			},
			{
				source:
					"/media/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				destination:
					"/company/press-room/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				permanent: true,
			},
			{
				source:
					"/media/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				destination:
					"/company/press-room/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				permanent: true,
			},
			{
				source:
					"/country/europe/nordics-and-iberia-step-up-as-europes-hydrogen-frontrunners",
				destination:
					"/company/press-room/nordics-and-iberia-step-up-as-europes-hydrogen-frontrunners",
				permanent: true,
			},
			{
				source: "/sector/hydrogen/hymar",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/spanish-grid-curtailment-forecast",
				destination: "/products/grid",
				permanent: true,
			},
			{
				source:
					"/country/north-america/capacity-market-dynamics-and-reforms-in-miso",
				destination:
					"/resources/webinar/capacity-market-dynamics-and-reforms-in-miso-2",
				permanent: true,
			},
			{
				source:
					"/media/texas-consumers-face-10-increase-in-power-bills-and-higher-reliability-risks-without-renewables-expansion-aurora-finds",
				destination:
					"/company/press-room/texas-consumers-face-10-increase-in-power-bills-and-higher-reliability-risks-without-renewables-expansion-aurora-energy-research-finds",
				permanent: true,
			},
			{
				source: "/country/north-america/deep-dive-into-caiso-load-growth",
				destination: "/resources/webinar/a-deep-dive-into-caiso-load-growth",
				permanent: true,
			},
			{
				source: "/country/north-america/impact-of-demand-side-management-in-ercot",
				destination:
					"/resources/aurora-insights/articles/impact-of-demand-side-management-in-ercot",
				permanent: true,
			},
			{
				source:
					"/country/north-america/implications-of-retroactive-firming-requirements-sb715-hb3356",
				destination:
					"/resources/aurora-insights/articles/implications-of-retroactive-firming-requirements-sb715-hb3356",
				permanent: true,
			},
			{
				source: "/country/north-america/miso-capacity-market-2025-26-pra-results",
				destination:
					"/resources/aurora-insights/articles/miso-capacity-market-2025-26-pra-results",
				permanent: true,
			},
			{
				source:
					"/country/north-america/new-yorks-energy-needs-reliability-offshore-wind",
				destination:
					"/resources/aurora-insights/market-reports/meeting-new-yorks-energy-needs-reliability-offshore-wind",
				permanent: true,
			},
			{
				source: "/webinar/spp-expansion-through-markets-rto-west",
				destination:
					"/resources/webinar/go-west-spps-expansion-through-markets-rto-west",
				permanent: true,
			},
			{
				source:
					"/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns",
				destination:
					"/resources/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns-2",
				permanent: true,
			},
			{
				source: "/webinar/thermal-generation-in-pjm",
				destination:
					"/resources/webinar/thermal-generation-in-pjm-natural-gas-coal-and-decarbonization-2",
				permanent: true,
			},
			{
				source:
					"/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso",
				destination:
					"/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso",
				permanent: true,
			},
			{
				source:
					"/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2",
				destination:
					"/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2",
				permanent: true,
			},
			{
				source:
					"/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy",
				destination:
					"/resources/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns-2",
				permanent: true,
			},
			{
				source: "/webinar/albertas-restructured-energy-market",
				destination:
					"/resources/webinar/the-path-ahead-analyzing-albertas-restructured-energy-market",
				permanent: true,
			},
			{
				source:
					"/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen",
				destination:
					"/resources/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen",
				permanent: true,
			},
			{
				source:
					"/webinar/from-volatility-to-value-negative-prices-and-batteries-in-the-baltics",
				destination:
					"/resources/webinar/from-volatility-to-value-negative-prices-and-batteries-in-the-baltics",
				permanent: true,
			},
			{
				source: "/new-york-energy-transition-forum-2025",
				destination: "/events/us-energy-at-a-crossroads-dominance-or-disruption",
				permanent: true,
			},
			{
				source:
					"/insight/risks-for-renewables-in-the-nordics-negative-prices-and-demand",
				destination:
					"/resources/webinar/risks-for-renewables-in-the-nordics-negative-prices-demand",
				permanent: true,
			},
			{
				source:
					"/insight/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres",
				destination:
					"/company/press-room/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				permanent: true,
			},
			{
				source: "/life-at-aurora",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/archive",
				destination: "/events",
				permanent: true,
			},
			{
				source: "/nodal",
				destination: "/software/nodalexplorer",
				permanent: true,
			},
			{
				source: "/spp",
				destination:
					"/company/press-room/spps-current-project-pipeline-exceeds-2030-capacity-needs-aurora-finds",
				permanent: true,
			},
			{
				source: "/india",
				destination: "/global-presence/india",
				permanent: true,
			},
			{
				source: "/category/feeds",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/alberta",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/category/subscription",
				destination: "/products/power-renewables",
				permanent: true,
			},
			{
				source: "/recruitment-faqs",
				destination: "/careers/faq",
				permanent: true,
			},
			{
				source: "/category/media",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/company/leadership",
				destination: "/company/team",
				permanent: true,
			},
			{
				source: "/category/insight",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/2170",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/sector",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/webinar",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/series/chile",
				destination: "/global-presence/chile",
				permanent: true,
			},
			{
				source: "/tag/china",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/webinars/category/public",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/hydrogen-at-aurora",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/advisory/bidding-strategy",
				destination:
					"/resources/aurora-insights/case-studies/strategic-competitive-analysis-for-an-offshore-wind-developer-for-cfd-ar7-and-future-auction-rounds",
				permanent: true,
			},
			{
				source: "/category/country/global",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/insight-type",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/insight/germany-2045",
				destination: "/resources/aurora-insights?country=Germany",
				permanent: true,
			},
			{
				source: "/category/sector/hydrogen",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/graduate-programmes-3",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/webinar/subscriber",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/ireland",
				destination: "/global-presence/ireland",
				permanent: true,
			},
			{
				source: "/category/country/europe/poland",
				destination: "/global-presence/poland",
				permanent: true,
			},
			{
				source: "/graduate-experience-florence-miller",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/country/europe/italy",
				destination: "/global-presence/italy",
				permanent: true,
			},
			{
				source: "/software/chronos/introducing-chronos",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/category/insight/page/7",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/insight/page/2",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/feeds/showcase-feed",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/france",
				destination: "/global-presence/france",
				permanent: true,
			},
			{
				source: "/category/country/north-america",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/location/north-america-noram",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/category/country/europe/germany",
				destination: "/global-presence/germany",
				permanent: true,
			},
			{
				source: "/category/insight/page/3",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/insight/page/8",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/country/europe/romania",
				destination: "/global-presence/romania",
				permanent: true,
			},
			{
				source: "/category/insight/page/4",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/nordics",
				destination: "/global-presence/nordics",
				permanent: true,
			},
			{
				source: "/category/country/europe/belgium",
				destination: "/global-presence/belgium",
				permanent: true,
			},
			{
				source: "/category/country/europe/greece",
				destination: "/global-presence/greece",
				permanent: true,
			},
			{
				source: "/category/insight-type/commentary",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/iberia",
				destination: "/global-presence/iberia",
				permanent: true,
			},
			{
				source: "/insight/solaire-en-france",
				destination:
					"/resources/aurora-insights/articles/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				permanent: true,
			},
			{
				source: "/category/country/europe/hungary",
				destination: "/global-presence/hungary",
				permanent: true,
			},
			{
				source: "/category/country/europe/bulgaria",
				destination: "/global-presence/bulgaria",
				permanent: true,
			},
			{
				source: "/insight/french-renewables-forecast",
				destination:
					"/resources/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				permanent: true,
			},
			{
				source: "/graduate-programme-mailing-list",
				destination: "/notification/mailing-list",
				permanent: true,
			},
			{
				source: "/category/webinar/public-webinar",
				destination: "/resources/webinar?category=Public",
				permanent: true,
			},
			{
				source: "/category/country/page/13",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/careers-fairs-uk-2024",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/category/subscription/software/amun",
				destination: "/software/amun",
				permanent: true,
			},
			{
				source: "/european-careers-fairs-2024",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/category/insight/page/10",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/baltics",
				destination: "/global-presence/baltics",
				permanent: true,
			},
			{
				source: "/careers-fairs-aus-2024",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/spring-forum-2021-presentations",
				destination:
					"/company/press-room/aurora-spring-forum-2025-comes-at-a-defining-moment-to-navigate-geopolitical-uncertainty-and-energy-transition",
				permanent: true,
			},
			{
				source: "/category/webinar/group-meeting",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/category/country/europe/page/4",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/sector/hydrogen/page/2",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/category/country/central-south-america",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/country/europe/page/2",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/analytics/apac-hydrogen-market-service",
				destination:
					"/resources/aurora-insights/articles/comment-opportunities-challenges-in-the-korean-energy-market",
				permanent: true,
			},
			{
				source: "/webinar/battery-storage-in-pjm",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/category/country/europe/page/3",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/category/sector/electric-hydrogen-mobility",
				destination: "/resources/webinar/hydrogen-market-report-hymar-april-2025",
				permanent: true,
			},
			{
				source: "/energy-modelling-analyst-george-irving",
				destination: "/careers/early-careers/oxford-graduate-modelling-programme",
				permanent: true,
			},
			{
				source: "/media/reaching-40gw-offshore-wind",
				destination:
					"/resources/aurora-insights/articles/reaching-40gw-offshore-wind",
				permanent: true,
			},
			{
				source: "/insight/german-governments-coalition-agreement",
				destination:
					"/resources/aurora-insights/articles/coalition-in-progress-energy-in-transition-whats-next-for-germanys-power-future",
				permanent: true,
			},
			{
				source: "/webinar/auroras-korean-grid-modelling",
				destination:
					"/resources/webinar/korean-grid-modelling-power-flow-transmission-modelling-to-determine-loss-and-curtailment-grid-outcomes",
				permanent: true,
			},
			{
				source: "/insight/brazilian-offshore-wind-landscape",
				destination:
					"/company/press-room/auroras-amun-launches-in-brazil-as-investors-tap-into-the-countrys-wind-potential-and-regulatory-barriers-ease",
				permanent: true,
			},
			{
				source: "/events/battery-conference-london/archive",
				destination:
					"/company/press-room/europes-battery-storage-investments-in-the-spotlight-at-this-years-aurora-battery-conference",
				permanent: true,
			},
			{
				source: "/insight/hydrogen-important-uk-decarbonisation",
				destination:
					"/company/press-room/decarbonisation-key-to-alleviating-europes-energy-crisis-aurora-spring-forum-2023-keynotes",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-for-iberia",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/insight/gb-ffr-market-summary-september-2020",
				destination:
					"/resources/aurora-insights/articles/comment-in-the-zone-understanding-lmp-in-the-gb-electricity-market",
				permanent: true,
			},
			{
				source: "/insight/european-gas-market-forecast-may-2021",
				destination: "/resources/webinar/power-renewables-forecast-for-spp",
				permanent: true,
			},
			{
				source: "/insight/gb-wholesale-power-market-summary-october-2020",
				destination:
					"/company/press-room/spps-current-project-pipeline-exceeds-2030-capacity-needs-aurora-finds",
				permanent: true,
			},
			{
				source:
					"/media/spps-current-project-pipeline-exceeds-2030-capacity-needs-aurora-finds",
				destination:
					"/company/press-room/spps-current-project-pipeline-exceeds-2030-capacity-needs-aurora-finds",
				permanent: true,
			},
			{
				source: "/venue/zoom",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/category/spp",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/webinar/38450",
				destination:
					"/resources/webinar/commodities-forecast-annual-update-april-2025",
				permanent: true,
			},
			{
				source: "/tag/gdp",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/tag/coal",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/tag/ec",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/advisory/policy-modelling",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/webinars/category/subscriber",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/events/hydrogen-conference",
				destination:
					"/events/europes-hydrogen-economy-policy-demand-and-investment-insights",
				permanent: true,
			},
			{
				source: "/advisory/transaction-financing",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/company/leadership-archive",
				destination: "/company/about",
				permanent: true,
			},
			{
				source: "/analytics/european-hydrogen",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/insight/baltics-webinar",
				destination: "/global-presence/baltics",
				permanent: true,
			},
			{
				source: "/careers-fairs-japan",
				destination: "/careers/early-careers/tokyo-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/advisory/green-power",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/advisory/strategy-development",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/events/spring-forum",
				destination:
					"/events/competing-visions-of-progress-the-energy-transition-in-a-polarised-world",
				permanent: true,
			},
			{
				source: "/category/sector/heating",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/analytics/granular-data",
				destination: "/products",
				permanent: true,
			},
			{
				source: "/2023-north-america",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/graduate-application-tips",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/graduate-experience-nicolas",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/tag/webinar-recordings",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/advisory/market-sizing",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/insight/hymar-insights",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/category/report-type",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/category/market-reports",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/2022-energiemarkte",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/subscription/software",
				destination: "/software",
				permanent: true,
			},
			{
				source: "/careers-fairs-berlin",
				destination: "/careers/early-careers/berlin-graduate-analyst-programme",
				permanent: true,
			},
			{
				source: "/careers/vacancy",
				destination: "/careers/join-us",
				permanent: true,
			},
			{
				source: "/ppa-early-adopter-programme",
				destination: "/",
				permanent: true,
			},
			{
				source: "/category/sector/page/3",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/spring-forum-oxford",
				destination:
					"/events/navigating-rising-geopolitical-instability-enabling-the-next-wave-of-decarbonisation",
				permanent: true,
			},
			{
				source: "/energy-transition-forum-2024",
				destination:
					"/events/the-state-of-the-u-s-energy-transition-opportunities-and-headwinds",
				permanent: true,
			},
			{
				source: "/category/sector/renewable-energy",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/feeds/showcase-hero",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/company/media/company-media",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/grad-experience-john-lee",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/report-type/forecasts",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/graduate-experience-star-xian",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/sector/carbon-markets",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/subscription/power-markets",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/new-york-new-england",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/advisory/bespoke-scenario-modelling",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/graduate-experience-maya-sagdieva",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/insight-type/public",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/energy-finance-conference",
				destination:
					"/events/closing-the-investment-gap-accelerating-europes-path-to-net-zero-with-private-capital",
				permanent: true,
			},
			{
				source: "/category/feeds/page/7",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/romanian-ppas-renewables",
				destination: "/global-presence/romania",
				permanent: true,
			},
			{
				source: "/events/hydrogen-conference/archive",
				destination:
					"/events/europes-hydrogen-economy-policy-demand-and-investment-insights",
				permanent: true,
			},
			{
				source: "/company/aurora-turns-ten",
				destination: "/company/about",
				permanent: true,
			},
			{
				source: "/insight/batteries-case-italy",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/flexible-technologies-netherlands",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/2050-decarbonisation-pathways",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/feeds/page/4",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/media/page/2",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/category/media/page/3",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/insight/brazilian-market-outlook",
				destination: "/global-presence/brazil",
				permanent: true,
			},
			{
				source: "/analytics/global-energy-forecast",
				destination: "/products",
				permanent: true,
			},
			{
				source: "/category/report-type/featured",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/subscription/page/2",
				destination: "/products",
				permanent: true,
			},
			{
				source: "/category/insight-type/reports",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/renewables-summit-london",
				destination:
					"/events/navigating-choppy-waters-can-the-uk-and-europe-overcome-challenges-to-realise-renewable-ambitions",
				permanent: true,
			},
			{
				source: "/insight/2020-nachhaltiges-konjunkturpaket",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/sector/page/2",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/feeds/page/3",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/renewables-summit-berlin",
				destination:
					"/events/after-the-energy-crisis-prospects-for-renewables-and-batteries-in-germany",
				permanent: true,
			},
			{
				source: "/european-hydrogen-market-service",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/category/subscription/independent-report",
				destination:
					"/resources/aurora-insights/market-reports/european-battery-market-attractiveness-report",
				permanent: true,
			},
			{
				source: "/events/battery-conference-london",
				destination:
					"/events/charging-ahead-unlocking-investments-in-europes-battery-storage-market",
				permanent: true,
			},
			{
				source: "/insight/german-coalition-agreement",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/auctions-to-action",
				destination: "/resources/aurora-insights/articles/auctions-to-action",
				permanent: true,
			},
			{
				source: "/graduate-experience-akane-iwado",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/insight/poland-cfd-risks",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/graduate-experience-isa-dijkstra",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/category/subscription/commodities-markets",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/graduate-experience-william-eastwick",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/insight/spanish-capacity-market",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/german-renewables-week",
				destination:
					"/events/after-the-energy-crisis-prospects-for-renewables-and-batteries-in-germany",
				permanent: true,
			},
			{
				source: "/careers-fairs-usa-2024",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/insight/gb-renewables-summary",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/webinar/nem-battery-market",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/events/energy-transition-summit-warsaw",
				destination:
					"/events/energy-transition-in-central-and-eastern-europe-challenges-and-investments-opportunities",
				permanent: true,
			},
			{
				source: "/category/report-type/research-notes",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/ramped-up-a-guide-to-quick-reserve",
				destination:
					"/resources/aurora-insights/articles/ramped-up-a-guide-to-quick-reserve",
				permanent: true,
			},
			{
				source: "/software/amun/amun-for-brazil",
				destination: "/software/amun",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-for-australia",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-in-italy",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/insight/charting-the-future-chiles-pmgd-stabilized-price-outlook",
				destination:
					"/resources/aurora-insights/market-reports/charting-the-future-chiles-pmgd-stabilized-price-outlook",
				permanent: true,
			},
			{
				source: "/author/lucy-sovetova",
				destination: "/",
				permanent: true,
			},
			{
				source: "/category/country/europe/great-britain",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/software/amun/amun-for-japan-ja",
				destination: "/software/amun",
				permanent: true,
			},
			{
				source: "/category/country/central-south-america/chile",
				destination: "/global-presence/chile",
				permanent: true,
			},
			{
				source: "/author/penelope-woodham",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/uncategorized/renewable-delays-a-risk-for-batteries-with-a-silver-lining",
				destination:
					"/resources/aurora-insights/articles/renewable-delays-a-risk-for-batteries-with-a-silver-lining",
				permanent: true,
			},
			{
				source: "/insight/insights-from-the-new-brazilian-carbon-market-framework",
				destination:
					"/resources/aurora-insights/market-reports/insights-from-the-new-brazilian-carbon-market-framework",
				permanent: true,
			},
			{
				source: "/software/amun/amun-for-japan",
				destination: "/software/amun",
				permanent: true,
			},
			{
				source: "/category/country/central-south-america/brazil",
				destination: "/global-presence/brazil",
				permanent: true,
			},
			{
				source: "/category/uncategorized",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/spring-forum-oxford/archive",
				destination: "/events",
				permanent: true,
			},
			{
				source: "/careers/graduate-programmes",
				destination: "/careers/early-careers",
				permanent: true,
			},
			{
				source: "/author/bruno",
				destination: "/",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific/other-asia-pacific",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source:
					"/insight/delivering-hydrogen-and-carbon-capture-technologies-at-scale-is-essential-to-enable-a-net-zero-power-system-in-britain-2",
				destination:
					"/resources/aurora-insights/articles/delivering-hydrogen-and-carbon-capture-technologies-at-scale-is-essential-to-enable-a-net-zero-power-system-in-britain-2",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific/india",
				destination: "/global-presence/india",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific/japan",
				destination: "/global-presence/japan",
				permanent: true,
			},
			{
				source: "/author/samuel-reidauroraer-com",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/insight-type/commentary/comment-opportunities-challenges-in-the-korean-energy-market",
				destination:
					"/resources/aurora-insights/articles/comment-opportunities-challenges-in-the-korean-energy-market",
				permanent: true,
			},
			{
				source: "/author/ethan",
				destination: "/",
				permanent: true,
			},
			{
				source: "/sector/flexible-energy-storage/running-up-that-hill-isem",
				destination:
					"/resources/aurora-insights/articles/running-up-that-hill-isem",
				permanent: true,
			},
			{
				source: "/category/sector/power-consumption-ppas",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/sector/thermal-power-generation",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/sector/renewable-energy/can-long-run-equilibrium-electricity-market-models-be-useful-in-energy-markets-that-are-in-equilibrium",
				destination:
					"/resources/aurora-insights/articles/can-long-run-equilibrium-electricity-market-models-be-useful-in-energy-markets-that-are-in-equilibrium",
				permanent: true,
			},
			{
				source:
					"/insight-type/commentary/comment-an-intro-to-the-india-power-sector",
				destination:
					"/resources/aurora-insights/articles/comment-an-intro-to-the-india-power-sector",
				permanent: true,
			},
			{
				source:
					"/sector/flexible-energy-storage/what-goes-wrong-when-modelling-forecasting-grid-scale-battery-investment-cases",
				destination:
					"/resources/aurora-insights/articles/what-goes-wrong-when-modelling-forecasting-grid-scale-battery-investment-cases",
				permanent: true,
			},
			{
				source: "/insight/decarbonising-the-dutch-power-sector",
				destination:
					"/resources/aurora-insights/articles/decarbonising-the-dutch-power-sector",
				permanent: true,
			},
			{
				source:
					"/media/delivering-hydrogen-and-carbon-capture-technologies-at-scale-is-essential-to-enable-a-net-zero-power-system-in-britain",
				destination:
					"/resources/aurora-insights/articles/delivering-hydrogen-and-carbon-capture-technologies-at-scale-is-essential-to-enable-a-net-zero-power-system-in-britain",
				permanent: true,
			},
			{
				source: "/insight-type/commentary/comment-india-nuclear-energy-mission",
				destination:
					"/resources/aurora-insights/articles/comment-india-nuclear-energy-mission",
				permanent: true,
			},
			{
				source:
					"/insight-type/commentary/comment-the-challenges-of-grid-modelling-in-japan",
				destination:
					"/resources/aurora-insights/articles/comment-the-challenges-of-grid-modelling-in-japan",
				permanent: true,
			},
			{
				source:
					"/insight/offshore-wind-leasing-round-4-and-details-of-uk-ets-scheme",
				destination:
					"/resources/aurora-insights/articles/offshore-wind-leasing-round-4-and-details-of-uk-ets-scheme",
				permanent: true,
			},
			{
				source: "/author/misha-zlatkova",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/insight/financing-the-energy-transition-in-spain-risks-and-mitigations",
				destination:
					"/resources/aurora-insights/articles/financing-the-energy-transition-in-spain-risks-and-mitigations",
				permanent: true,
			},
			{
				source: "/insight/no-more-russian-gas-via-ukraine",
				destination:
					"/resources/aurora-insights/articles/no-more-russian-gas-via-ukraine",
				permanent: true,
			},
			{
				source: "/insight/the-success-story-of-cfds-is-turning-sour",
				destination:
					"/resources/aurora-insights/articles/the-success-story-of-cfds-is-turning-sour",
				permanent: true,
			},
			{
				source:
					"/country/europe/germany/germanys-ambitious-hydrogen-strategy-update-summary-and-considerations",
				destination:
					"/resources/aurora-insights/articles/germanys-ambitious-hydrogen-strategy-update-summary-and-considerations",
				permanent: true,
			},
			{
				source: "/insight/the-road-to-2c-what-are-the-challenges-and-implications",
				destination:
					"/resources/aurora-insights/articles/the-road-to-2c-what-are-the-challenges-and-implications",
				permanent: true,
			},
			{
				source: "/category/subscription/power-markets/gb-flex-pu",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/insight/the-energy-crunch-uk-and-european-energy-markets-in-the-spotlight",
				destination:
					"/resources/aurora-insights/articles/the-energy-crunch-uk-and-european-energy-markets-in-the-spotlight",
				permanent: true,
			},
			{
				source:
					"/insight/comment-in-the-zone-understanding-lmp-in-the-gb-electricity-market",
				destination:
					"/resources/aurora-insights/articles/comment-in-the-zone-understanding-lmp-in-the-gb-electricity-market",
				permanent: true,
			},
			{
				source: "/insight/grid-capacity-auction-iberia",
				destination:
					"/resources/aurora-insights/articles/grid-capacity-auction-iberia",
				permanent: true,
			},
			{
				source: "/insight/the-battery-buildout-in-europe",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/2026-t-5-polish-capacity-market-auction-target",
				destination:
					"/resources/aurora-insights/articles/2026-t-5-polish-capacity-market-auction-target",
				permanent: true,
			},
			{
				source: "/insight/comment-bankability-and-hpas",
				destination:
					"/resources/aurora-insights/articles/comment-bankability-and-hpas",
				permanent: true,
			},
			{
				source:
					"/insight/uks-hydrogen-strategy-confirms-the-launch-of-a-hydrogen-production-subsidy-scheme-in-2023-and-expects-hydrogen-demand-to-grow-twenty-fold-by-2050-higher-than-auroras-high-scenario-2",
				destination:
					"/resources/aurora-insights/articles/uks-hydrogen-strategy-confirms-the-launch-of-a-hydrogen-production-subsidy-scheme-in-2023-and-expects-hydrogen-demand-to-grow-twenty-fold-by-2050-higher-than-auroras-high-scenario-2",
				permanent: true,
			},
			{
				source:
					"/country/europe/analysis-10-point-plan-green-industrial-revolution",
				destination:
					"/resources/aurora-insights/articles/analysis-10-point-plan-green-industrial-revolution",
				permanent: true,
			},
			{
				source:
					"/country/europe/germany/coalition-in-progress-energy-in-transition-whats-next-for-germanys-power-future",
				destination:
					"/resources/aurora-insights/articles/coalition-in-progress-energy-in-transition-whats-next-for-germanys-power-future",
				permanent: true,
			},
			{
				source:
					"/media/global-emissions-to-peak-around-2030-but-further-cuts-needed-to-hit-2-degrees-target",
				destination:
					"/resources/aurora-insights/articles/global-emissions-to-peak-around-2030-but-further-cuts-needed-to-hit-2-degrees-target",
				permanent: true,
			},
			{
				source:
					"/insight/long-term-global-gas-forecast-to-2050-impacted-by-covid19",
				destination:
					"/resources/aurora-insights/articles/long-term-global-gas-forecast-to-2050-impacted-by-covid19",
				permanent: true,
			},
			{
				source:
					"/insight/impact-of-russia-ukraine-war-on-european-gas-markets-can-europe-cope-without-russian-gas",
				destination:
					"/resources/aurora-insights/articles/impact-of-russia-ukraine-war-on-european-gas-markets-can-europe-cope-without-russian-gas",
				permanent: true,
			},
			{
				source: "/category/subscription/power-markets/iberian-power-pu",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/insight/commentary-reflection-on-the-global-development-of-hydrogen-regulation",
				destination:
					"/resources/aurora-insights/articles/commentary-reflection-on-the-global-development-of-hydrogen-regulation",
				permanent: true,
			},
			{
				source:
					"/insight/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				destination:
					"/resources/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				permanent: true,
			},
			{
				source: "/insight/russia-ukraine-war-how-is-uk-gas-security-affected",
				destination:
					"/resources/aurora-insights/articles/russia-ukraine-war-how-is-uk-gas-security-affected",
				permanent: true,
			},
			{
				source:
					"/country/europe/this-powerful-tool-can-help-drive-europes-green-recovery",
				destination:
					"/resources/aurora-insights/articles/this-powerful-tool-can-help-drive-europes-green-recovery",
				permanent: true,
			},
			{
				source: "/insight/battery-blitz-a-guide-to-the-enduring-auction-capability",
				destination:
					"/resources/aurora-insights/articles/battery-blitz-a-guide-to-the-enduring-auction-capability",
				permanent: true,
			},
			{
				source: "/insight/accelerating-power-demand-in-the-nordics",
				destination:
					"/resources/aurora-insights/articles/accelerating-power-demand-in-the-nordics",
				permanent: true,
			},
			{
				source: "/category/report-type/strategic-insight-reports",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/sector/natural-gas-lng",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/insight/key-themes-auroras-energy-forecasts-in-the-philippine-power-markets-and-grid",
				destination:
					"/resources/aurora-insights/articles/key-themes-auroras-energy-forecasts-in-the-philippine-power-markets-and-grid",
				permanent: true,
			},
			{
				source:
					"/media/companies-are-developing-over-200-gw-of-hydrogen-electrolyser-projects-globally-85-of-which-are-in-europe",
				destination:
					"/resources/aurora-insights/articles/companies-are-developing-over-200-gw-of-hydrogen-electrolyser-projects-globally-85-of-which-are-in-europe",
				permanent: true,
			},
			{
				source:
					"/insight/one-year-of-war-in-ukraine-whats-next-for-the-european-gas-market",
				destination:
					"/resources/aurora-insights/articles/one-year-of-war-in-ukraine-whats-next-for-the-european-gas-market",
				permanent: true,
			},
			{
				source: "/author/natalie-hewitt",
				destination: "/",
				permanent: true,
			},
			{
				source: "/insight/commentary-afrr-capacity-market-open-in-france-2024",
				destination:
					"/resources/aurora-insights/articles/commentary-afrr-capacity-market-open-in-france-2024",
				permanent: true,
			},
			{
				source: "/author/james-pigden",
				destination: "/",
				permanent: true,
			},
			{
				source: "/category/insight-type/webinar-recording",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/insight/comment-european-hydrogen-bank-pilot-results",
				destination:
					"/resources/aurora-insights/articles/comment-european-hydrogen-bank-pilot-results",
				permanent: true,
			},
			{
				source: "/category/sector/flexible-energy-storage",
				destination: "/products/flexible-energy",
				permanent: true,
			},
			{
				source: "/insight/gb-2024-25-t-4-capacity-market",
				destination:
					"/resources/aurora-insights/articles/gb-2024-25-t-4-capacity-market",
				permanent: true,
			},
			{
				source:
					"/insight/unlocking-the-future-takeaways-from-the-aurora-hydrogen-conference-2023",
				destination:
					"/resources/aurora-insights/articles/unlocking-the-future-takeaways-from-the-aurora-hydrogen-conference-2023",
				permanent: true,
			},
			{
				source:
					"/media/uks-hydrogen-strategy-confirms-the-launch-of-a-hydrogen-production-subsidy-scheme-in-2023-and-expects-hydrogen-demand-to-grow-twenty-fold-by-2050-higher-than-auroras-high-scenario",
				destination:
					"/resources/aurora-insights/articles/uks-hydrogen-strategy-confirms-the-launch-of-a-hydrogen-production-subsidy-scheme-in-2023-and-expects-hydrogen-demand-to-grow-twenty-fold-by-2050-higher-than-auroras-high-scenario-2",
				permanent: true,
			},
			{
				source: "/category/insight-type/commentary/page/2",
				destination: "/resources/aurora-insights?category=Commentary",
				permanent: true,
			},
			{
				source: "/insight/analysis-reer-auction-spain",
				destination:
					"/resources/aurora-insights/articles/analysis-reer-auction-spain",
				permanent: true,
			},
			{
				source:
					"/sector/flexible-energy-storage/comment-missing-the-point-what-a-delay-to-hinkley-point-c-means-for-the-gb-power-market",
				destination:
					"/resources/aurora-insights/articles/comment-missing-the-point-what-a-delay-to-hinkley-point-c-means-for-the-gb-power-market",
				permanent: true,
			},
			{
				source: "/insight-type/commentary/comment-ds3-system-service-tariff-review",
				destination:
					"/resources/aurora-insights/articles/comment-ds3-system-service-tariff-review",
				permanent: true,
			},
			{
				source: "/category/subscription/power-markets/gb-power-pu",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/country/europe/netherlands",
				destination: "/global-presence/netherlands",
				permanent: true,
			},
			{
				source:
					"/insight/the-2nd-rema-consultation-the-future-of-electricity-market-design-in-gb",
				destination:
					"/resources/aurora-insights/articles/the-2nd-rema-consultation-the-future-of-electricity-market-design-in-gb",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific/australia",
				destination: "/global-presence/australia",
				permanent: true,
			},
			{
				source: "/insight/comparative-report-california-and-spain-energy-markets",
				destination:
					"/resources/aurora-insights/articles/comparative-report-california-and-spain-energy-markets",
				permanent: true,
			},
			{
				source: "/insight/german-amun-wind-atlas",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/gb-power-market-forecast-october-2020",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/insight/exploring-the-new-wave-of-subsidy-support-in-romania-and-hungary",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/subscription/power-markets/gb-power-mf",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/co-locating-batteries-with-solar-pv-in-france",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/country/europe/nordics/recent-trends-price-benchmarks-for-nordic-ppas",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight-type/reports/gb-market-summary-may-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/report-type/market-summaries",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/market-reports/european-battery-markets-attractiveness-report-3rd-edition-1",
				destination:
					"/resources/aurora-insights/market-reports/european-battery-markets-attractiveness-report-3rd-edition-1",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-november-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source:
					"/country/europe/greece/italy-great-britain-germany-currently-the-most-attractive-battery-markets-in-europe-aurora-finds",
				destination:
					"/company/press-room/italy-great-britain-germany-currently-the-most-attractive-battery-markets-in-europe-aurora-finds",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-october-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/insight/the-role-of-ppas-in-the-gb-power-market",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/media/six-fold-increase-in-gb-negative-price-periods-triggers-concerns-around-renewable-profitability-but-highlights-opportunity-for-flexible-assets",
				destination:
					"/company/press-room/six-fold-increase-in-gb-negative-price-periods-triggers-concerns-around-renewable-profitability-but-highlights-opportunity-for-flexible-assets",
				permanent: true,
			},
			{
				source:
					"/media/innovation-needed-to-meet-britains-renewables-targets-aurora-renewables-summit-london-2023-keynotes",
				destination:
					"/company/press-room/innovation-needed-to-meet-britains-renewables-targets-aurora-renewables-summit-london-2023-keynotes",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/additional-offshore-wind-a-key-pillar-against-gas-price-volatility-new-analysis-finds",
				destination:
					"/company/press-room/additional-offshore-wind-a-key-pillar-against-gas-price-volatility-new-analysis-finds",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-december-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source:
					"/media/prioritising-grid-expansion-is-crucial-to-achieving-net-zero-in-britain",
				destination:
					"/company/press-room/prioritising-grid-expansion-is-crucial-to-achieving-net-zero-in-britain",
				permanent: true,
			},
			{
				source:
					"/insight-type/webinar-recording/chronos-bankable-battery-valuations-at-your-fingertips",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/insight/gb-market-summary-may-2023",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-april-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source:
					"/country/europe/germany-great-britain-the-ireland-i-sem-and-poland-top-four-markets-for-renewables-and-battery-co-location-in-europe",
				destination:
					"/company/press-room/germany-great-britain-the-ireland-i-sem-and-poland-top-four-markets-for-renewables-and-battery-co-location-in-europe",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-for-august-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source:
					"/media/uk-gas-price-crash-drives-down-baseload-prices-by-20-for-the-next-4-years",
				destination:
					"/company/press-room/uk-gas-price-crash-drives-down-baseload-prices-by-20-for-the-next-4-years",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/aurora-supports-tagenergy-in-securing-funding-for-battery-project",
				destination:
					"/company/press-room/aurora-supports-tagenergy-in-securing-funding-for-battery-project",
				permanent: true,
			},
			{
				source: "/author/zinovia-fragkiadaki",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/leading-energy-sector-experts-to-speak-at-aurora-renewables-summit-london-this-june",
				destination:
					"/company/press-room/leading-energy-sector-experts-to-speak-at-aurora-renewables-summit-london-this-june",
				permanent: true,
			},
			{
				source: "/insight/gb-market-summary-june-2023",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/insight/strait-of-hormuz-report",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/category/subscription/commodities-markets/european-hydrogen-market-service-pu",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source:
					"/uncategorized/short-term-hydrogen-demand-sizing-which-offtakers-will-buy-renewable-hydrogen",
				destination:
					"/resources/webinar/short-term-hydrogen-demand-sizing-which-offtakers-will-buy-renewable-hydrogen",
				permanent: true,
			},
			{
				source: "/insight/locational-marginal-pricing-in-great-britain",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/insight/comment-in-the-balance-introduction-to-the-balancing-mechanism",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/long-duration-energy-energy-storage-in-spain",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/market-reports/european-battery-market-attractiveness-report",
				destination:
					"/resources/aurora-insights/market-reports/european-battery-market-attractiveness-report",
				permanent: true,
			},
			{
				source:
					"/insight/optimal-dispatch-strategy-and-contracted-revenues-in-the-italian-battery-market",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/wem-power-renewables-market-forecast-october-2024",
				destination: "/resources/aurora-insights?category=Commentary",
				permanent: true,
			},
			{
				source:
					"/insight-type/public/european-renewables-market-overview-report-2025",
				destination:
					"/resources/aurora-insights/market-reports/european-renewables-market-overview-report",
				permanent: true,
			},
			{
				source:
					"/market-reports/european-offshore-wind-markets-attractiveness-report",
				destination:
					"/resources/aurora-insights/market-reports/european-offshore-wind-markets-attractiveness-report",
				permanent: true,
			},
			{
				source:
					"/insight/iberia-renewable-investment-opportunities-in-the-balearic-and-canary-islands",
				destination:
					"/resources/aurora-insights/market-reports/iberia-renewable-investment-opportunities-in-the-balearic-and-canary-islands",
				permanent: true,
			},
			{
				source: "/insight/electrolysers-in-germany-and-their-rocky-ppa-path",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/the-future-of-chiles-power-market",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/gb-monthly-market-summary-february-2024-2",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/apac-hydrogen-market-forecast-october-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight-type/reports/gb-market-summary-july-2024-2",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/battery-investment-opportunities-france",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/market-reports/european-renewables-co-location-report",
				destination:
					"/resources/aurora-insights/market-reports/european-renewables-co-location-report",
				permanent: true,
			},
			{
				source: "/insight-type/reports/gb-market-summary-april-2024",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/country/europe/ireland/ress3-results-and-implications-for-the-future",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/market-reports/europe-e-fuels-market-study",
				destination:
					"/resources/aurora-insights/market-reports/europe-e-fuels-market-study",
				permanent: true,
			},
			{
				source: "/insight/gb-market-summary-september-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/country/europe/great-britain/gb-monthly-market-summary-january-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/author/chiara-boye",
				destination: "/",
				permanent: true,
			},
			{
				source: "/insight/brazil-wind-energy-investment-strategy",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/wwf-germany-climate-neutral-power-system-report",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/capacity-remuneration-mechanisms-in-europe",
				destination:
					"/resources/aurora-insights/market-reports/capacity-remuneration-mechanisms-in-europe",
				permanent: true,
			},
			{
				source: "/insight/brazils-capacity-market-auction",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/category/insight-type/reports/page/3",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/insight/now-available-in-korean-korean-power-renewables-market-forecast-september-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/gb-monthly-market-summary-march-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/market-reports/european-renewables-market-overview-report",
				destination:
					"/resources/aurora-insights/market-reports/european-renewables-market-overview-report",
				permanent: true,
			},
			{
				source:
					"/insight/philippines-power-renewables-market-forecast-october-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/country/europe/germany/bridging-the-gap-between-revenue-indices-and-forecasts",
				destination:
					"/resources/aurora-insights/market-reports/bridging-the-gap-between-revenue-indices-and-forecasts",
				permanent: true,
			},
			{
				source: "/insight/weather-years-and-their-impact-on-ppas-in-brazil",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/decarbonising-the-dutch-gas-fired-power-fleet",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/from-brazil-to-europe-the-renewable-hydrogen-opportunity",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/insight/2023-outlook-for-the-polish-energy-market-a-report-by-aurora-and-dentons",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight-type/reports/gb-market-summary-june-2024",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/category/country/north-america/nyiso",
				destination: "/global-presence/us-canada",
				permanent: true,
			},
			{
				source: "/category/insight-type/reports/page/6",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/chile-power-renewables-market-insights",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/brazilian-market-scenarios-2024",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/long-duration-electricity-storage-consultation-response",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/category/insight-type/reports/page/2",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/webinar/powering-the-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				destination:
					"/resources/webinar/powering-the-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				permanent: true,
			},
			{
				source:
					"/media/northeast-brazil-netherlands-green-hydrogen-corridor-could-fulfill-dutch-imports-by-2030-new-study-reveals",
				destination:
					"/company/press-room/northeast-brazil-netherlands-green-hydrogen-corridor-could-fulfill-dutch-imports-by-2030-new-study-reveals",
				permanent: true,
			},
			{
				source:
					"/webinar/wasted-potential-dispatch-down-of-renewables-in-the-i-sem",
				destination:
					"/resources/webinar/wasted-potential-dispatch-down-of-renewables-in-the-i-sem",
				permanent: true,
			},
			{
				source:
					"/webinar/blue-sky-thinking-analysing-power-market-uncertainty-in-the-cloud",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/the-french-ppa-market-coming-of-age-in-a-post-arenh-world",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/load-growth-in-pjm-data-centers-electric-vehicles-and-heat-pumps",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/french-flexibility-in-flux",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/going-granular-the-future-of-the-european-guarantees-of-origin-market",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/evolution-of-grid-curtailment-in-spain",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/from-iberia-to-france-renewable-portfolio-optimisation-across-borders",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/from-brazil-to-europe-the-renewable-hydrogen-opportunity",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/by-popular-demand-exploring-the-future-of-power-demand-in-great-britain",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/corporate-ppas-on-the-rise-a-european-market-overview",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/understanding-and-anticipating-k-factor-indexation-in-french-renewables-auctions",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/unveiling-chronos-for-australia",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/the-economics-of-hydrogen-in-japan-a-recap-of-our-in-person-q3-japan-group-meeting",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/miso-interconnection-queue-reform",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/the-end-of-a-wind-win-for-ireland",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/assumptions-shaping-the-future-of-chiles-power-market",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/closing-the-gap-offtakers-willingness-to-pay-for-low-carbon-hydrogen",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/charging-ahead-battery-storage-offtake-agreements-in-the-us",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/innovative-strategies-to-boost-renewable-revenues-in-the-netherlands",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/the-13k-mechanism-price-formation-and-its-impact-on-hydrogen-production",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/japan-grid-subscription-service",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/japan-grid-subscription-service-ja",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/the-race-for-renewables-incentive-outlook-in-nyiso-and-iso-ne",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/key-topics-in-the-philippines-electricity-market-and-grid-evolution",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/power-purchase-agreements-in-the-nem",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/amun-in-brazil-auroras-wind-valuation-tool",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/part-1-when-they-go-low-negative-prices-in-the-french-power-sector",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/part-2-negative-prices-and-cfds-quantifying-the-downside",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/us-election-implications-for-gas-and-power-markets",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/canadian-power-markets-and-the-project-finance-landscape",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/the-race-for-renewables-incentive-outlook-in-nyiso",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/us-election-implications-for-gas-and-power-markets-2",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/new-release-japanese-grid-subscription-service",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/chilean-power-renewables-market-forecast",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/kraftwerkssicherheitsgesetz-gas-power-generation-germany",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/understanding-carbon-markets-the-role-of-gas-and-other-drivers",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/turning-the-valve-outlook-for-russian-gas-transit-via-ukraine",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/strategic-battery-investments-in-iberia-and-italy-powered-by-chronos",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/unlocking-the-potential-of-hydrogen-in-the-nordics-opportunities-and-challenges",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/the-case-for-battery-storage-in-pjm",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/miso-state-policies-and-utility-integrated-resource-plans",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/evolution-of-resource-adequacy-in-california",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/ercot-ppa-pricing-and-risk-mitigation",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/unlocking-potential-why-merchant-power-holds-the-key-to-indias-energy-future",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/the-future-of-ppas-in-poland",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/conservative-policy-scenarios-in-albertas-electricity-market",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/opportunities-and-uncertainties-in-western-australias-wholesale-electricity-market",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/webinar/chilean-power-prices-auroras-long-term-forecast-and-alternative-scenarios",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/resource-adequacy-in-california",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/ercot-ppa-pricing-and-risk-mitigation-public-webinar",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/idaho-power-resource-plan-and-procurement-activities",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/watts-the-deal-a-2024-battery-power-recap",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/hybridization-of-renewables-and-storage-in-brazil",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/weather-years-impact-on-asset-economics-in-japan",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/a-shift-in-iberian-demand-from-machinery-to-data-centres",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/webinar/battery-capacity-in-the-nordics",
				destination: "/resources/webinar/nordics-battery-boom",
				permanent: true,
			},
			{
				source:
					"/webinar/solar-innovation-in-the-netherlands-will-new-technologies-power-a-brighter-future",
				destination:
					"/resources/webinar/netherlands-solar-innovations-will-new-technologies-power-a-brighter-future",
				permanent: true,
			},
			{
				source: "/webinar/renewables-participation-in-french-balancing-markets",
				destination:
					"/resources/webinar/renewables-participation-in-french-balancing-markets",
				permanent: true,
			},
			{
				source:
					"/webinar/designing-for-value-innovative-power-procurement-strategies-for-electrolyser-business-models",
				destination:
					"/resources/webinar/designing-for-value-innovative-power-procurement-strategies-for-electrolyser-business-models",
				permanent: true,
			},
			{
				source: "/webinar/power-play-unlocking-battery-storage-potential-in-nyiso",
				destination:
					"/resources/webinar/power-play-unlocking-battery-storage-potential-in-nyiso-2",
				permanent: true,
			},
			{
				source: "/webinar/power-renewables-forecast-for-spp",
				destination: "/resources/webinar/power-renewables-forecast-for-spp",
				permanent: true,
			},
			{
				source: "/webinar/a-new-era-europe-without-ukraines-russian-gas-corridor",
				destination:
					"/resources/webinar/a-new-era-europe-without-ukraines-russian-gas-corridor",
				permanent: true,
			},
			{
				source: "/webinar/speed-and-scale-load-growth-potential-in-alberta",
				destination:
					"/resources/webinar/speed-and-scale-load-growth-potential-in-alberta-2",
				permanent: true,
			},
			{
				source:
					"/webinar/light-at-the-end-of-the-queue-short-and-long-term-outlook-for-solar-economics-in-pjm",
				destination:
					"/resources/webinar/light-at-the-end-of-the-queue-short-and-long-term-outlook-for-solar-economics-in-pjm",
				permanent: true,
			},
			{
				source: "/webinar/a-deep-dive-into-caiso-load-growth",
				destination: "/resources/webinar/a-deep-dive-into-caiso-load-growth",
				permanent: true,
			},
			{
				source: "/webinar/watts-next-for-renewables-in-europe",
				destination: "/resources/webinar/watts-next-for-renewables-in-europe",
				permanent: true,
			},
			{
				source:
					"/webinar/amun-in-brazil-auroras-wind-asset-valuation-software-portuguese-version",
				destination:
					"/resources/webinar/amun-in-brazil-auroras-wind-asset-valuation-software-portuguese-version",
				permanent: true,
			},
			{
				source: "/webinar/power-renewables-forecast-for-spp-2",
				destination:
					"/resources/webinar/the-evolution-of-spp-long-term-power-market-forecast-highlights",
				permanent: true,
			},
			{
				source: "/webinar/flexible-energy-add-on-in-miso",
				destination:
					"/resources/webinar/the-case-for-battery-storage-in-miso-market-reforms-and-opportunities",
				permanent: true,
			},
			{
				source:
					"/webinar/overview-of-the-tucson-electric-power-resource-plan-and-procurement-activities",
				destination:
					"/resources/webinar/overview-of-the-tucson-electric-power-resource-plan-and-procurement-activities",
				permanent: true,
			},
			{
				source: "/webinar/renewables-participation-in-french-balancing-markets-2",
				destination:
					"/resources/webinar/renewables-participation-in-french-balancing-markets",
				permanent: true,
			},
			{
				source:
					"/webinar/the-bess-is-yet-to-come-storage-strategies-for-the-italian-market",
				destination:
					"/resources/webinar/the-bess-is-yet-to-come-storage-strategies-for-the-italian-market",
				permanent: true,
			},
			{
				source: "/webinar/introducing-auroras-battery-benchmark",
				destination: "/resources/webinar/introducing-auroras-battery-benchmark",
				permanent: true,
			},
			{
				source: "/webinar/the-highs-and-lows-of-ercots-battery-market",
				destination:
					"/resources/webinar/powering-through-change-the-highs-and-lows-of-ercots-battery-market-2",
				permanent: true,
			},
			{
				source:
					"/webinar/power-play-unlocking-battery-storage-potential-in-nyiso-2",
				destination:
					"/resources/webinar/power-play-unlocking-battery-storage-potential-in-nyiso-2",
				permanent: true,
			},
			{
				source: "/webinar/below-zero-understanding-negative-power-prices-in-iberia",
				destination:
					"/resources/webinar/below-zero-understanding-negative-power-prices-in-iberia",
				permanent: true,
			},
			{
				source: "/webinar/e-fuels-in-europe-opportunities-and-obstacles",
				destination:
					"/resources/webinar/e-fuels-in-europe-opportunities-and-obstacles",
				permanent: true,
			},
			{
				source:
					"/webinar/impact-of-reform-to-clean-energy-tax-credits-on-investment-jobs-and-consumer-bills",
				destination:
					"/resources/webinar/impact-of-reform-to-clean-energy-tax-credits-on-investment-jobs-and-consumer-bills",
				permanent: true,
			},
			{
				source: "/webinar/speed-and-scale-load-growth-potential-in-alberta-2",
				destination:
					"/resources/webinar/speed-and-scale-load-growth-potential-in-alberta-2",
				permanent: true,
			},
			{
				source: "/webinar/charting-the-future-chiles-pmgd-stabilized-price-outlook",
				destination:
					"/resources/webinar/charting-the-future-chiles-pmgd-stabilized-price-outlook",
				permanent: true,
			},
			{
				source: "/webinar/how-attractive-are-battery-economics-in-india",
				destination:
					"/resources/webinar/how-attractive-are-battery-economics-in-india",
				permanent: true,
			},
			{
				source:
					"/webinar/hydrogen-demand-outlook-key-drivers-and-sectoral-insights",
				destination:
					"/resources/webinar/hydrogen-demand-outlook-key-drivers-and-sectoral-insights",
				permanent: true,
			},
			{
				source:
					"/webinar/outlook-for-the-2028-29-t-4-and-2025-26-t-1-capacity-market-auctions",
				destination:
					"/resources/webinar/outlook-for-the-2028-29-t-4-and-2025-26-t-1-capacity-market-auctions",
				permanent: true,
			},
			{
				source:
					"/webinar/a-new-hope-for-net-zero-insights-from-the-new-brazilian-carbon-market-framework",
				destination:
					"/resources/webinar/a-new-hope-for-net-zero-insights-from-the-new-brazilian-carbon-market-framework",
				permanent: true,
			},
			{
				source: "/webinar/capacity-market-dynamics-and-reforms-in-miso",
				destination:
					"/resources/webinar/capacity-market-dynamics-and-reforms-in-miso-2",
				permanent: true,
			},
			{
				source: "/webinar/peak-interest-the-role-of-battery-storage-in-iso-ne",
				destination:
					"/resources/webinar/peak-interest-the-role-of-battery-storage-in-iso-ne",
				permanent: true,
			},
			{
				source:
					"/webinar/charge-ahead-riding-the-next-wave-of-europes-battery-energy-storage-investments",
				destination:
					"/resources/webinar/charge-ahead-riding-the-next-wave-of-europes-battery-energy-storage-investments",
				permanent: true,
			},
			{
				source:
					"/webinar/powering-through-change-the-highs-and-lows-of-ercots-battery-market",
				destination:
					"/resources/webinar/powering-through-change-the-highs-and-lows-of-ercots-battery-market-2",
				permanent: true,
			},
			{
				source: "/webinar/hybrid-ppas-in-europe-unlocking-new-value-streams",
				destination:
					"/resources/webinar/hybrid-ppas-in-europe-unlocking-new-value-streams",
				permanent: true,
			},
			{
				source: "/webinar/battery-investments-in-the-netherlands",
				destination: "/resources/webinar/battery-investments-in-the-netherlands",
				permanent: true,
			},
			{
				source: "/webinar/poland-energy-transition",
				destination:
					"/resources/webinar/powering-the-energy-transition-security-of-supply-in-poland",
				permanent: true,
			},
			{
				source:
					"/webinar/auroras-korean-power-renewable-market-forecast-briefing-april-2025-release",
				destination:
					"/resources/webinar/auroras-korean-power-renewable-market-forecast-briefing-april-2025-release",
				permanent: true,
			},
			{
				source: "/webinar/capacity-market-dynamics-and-reforms-in-miso-2",
				destination:
					"/resources/webinar/capacity-market-dynamics-and-reforms-in-miso-2",
				permanent: true,
			},
			{
				source:
					"/webinar/hydrogen-demand-outlook-key-drivers-and-sectoral-insights-2",
				destination:
					"/resources/webinar/hydrogen-demand-outlook-key-drivers-and-sectoral-insights",
				permanent: true,
			},
			{
				source: "/webinar/repowering-or-retiring-the-wind-fleet-at-a-crossroads",
				destination:
					"/resources/webinar/repowering-or-retiring-the-wind-fleet-at-a-crossroads",
				permanent: true,
			},
			{
				source:
					"/webinar/japans-changing-power-demand-impacts-on-power-mix-prices-and-investment",
				destination:
					"/resources/webinar/japans-changing-power-demand-impacts-on-power-mix-prices-and-investment",
				permanent: true,
			},
			{
				source:
					"/webinar/japans-changing-power-demand-impacts-on-power-mix-prices-and-investment_ja",
				destination:
					"/webinar/japans-changing-power-demand-impacts-on-power-mix-prices-and-investment",
				permanent: true,
			},
			{
				source:
					"/webinar/flexible-grid-connection-agreements-and-their-impact-on-batteries-in-germany",
				destination:
					"/resources/webinar/flexible-grid-connection-agreements-and-their-impact-on-batteries-in-germany",
				permanent: true,
			},
			{
				source: "/webinar/nordic-hydrogen-strategies-green-steel-to-green-deals",
				destination:
					"/resources/webinar/nordic-hydrogen-strategies-green-steel-to-green-deals",
				permanent: true,
			},
			{
				source: "/webinar/charging-ahead-the-future-of-battery-storage-in-chile",
				destination:
					"/resources/webinar/charging-ahead-the-future-of-battery-storage-in-chile",
				permanent: true,
			},
			{
				source:
					"/webinar/indian-power-markets-101-opportunities-for-foreign-investors",
				destination:
					"/resources/webinar/indian-power-markets-101-opportunities-for-foreign-investors",
				permanent: true,
			},
			{
				source: "/webinar/global-nuclear-experience-and-insights-for-australia",
				destination:
					"/resources/webinar/global-nuclear-experience-and-insights-for-australia",
				permanent: true,
			},
			{
				source:
					"/webinar/navigating-ercot-analysis-of-the-legislative-session-market-implications",
				destination:
					"/resources/webinar/navigating-ercot-analysis-of-the-legislative-session-market-implications",
				permanent: true,
			},
			{
				source: "/webinar/western-regionalization-caisos-extended-day-ahead-market",
				destination:
					"/resources/webinar/western-regionalization-caisos-extended-day-ahead-market",
				permanent: true,
			},
			{
				source:
					"/webinar/stress-testing-the-future-europe-under-russian-gas-and-trump-tariff-uncertainty",
				destination:
					"/resources/webinar/stress-testing-the-future-europe-under-russian-gas-and-trump-tariff-uncertainty",
				permanent: true,
			},
			{
				source: "/webinar/stress-testing-the-future-global-gas-in-trumps-world",
				destination:
					"/resources/webinar/stress-testing-the-future-global-gas-in-trumps-world",
				permanent: true,
			},
			{
				source:
					"/webinar/risks-for-renewables-in-the-nordics-negative-prices-demand",
				destination:
					"/resources/webinar/risks-for-renewables-in-the-nordics-negative-prices-demand",
				permanent: true,
			},
			{
				source: "/webinar/glowing-prospects-the-future-of-polish-nuclear-power",
				destination:
					"/resources/webinar/glowing-prospects-the-future-of-polish-nuclear-power",
				permanent: true,
			},
			{
				source: "/insight/grid-fee-outlook-for-the-netherlands-2045",
				destination:
					"/resources/aurora-insights/articles/grid-fee-outlook-for-the-netherlands-2045",
				permanent: true,
			},
			{
				source: "/media/reform-to-clean-energy-tax-credits",
				destination: "/company/press-room/reform-to-clean-energy-tax-credits",
				permanent: true,
			},
			{
				source:
					"/media/aurora-energy-research-launches-bankable-battery-valuations-software-chronos",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/media/global-hydrogen-pipeline-grows-to-957-gw",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source:
					"/resources/Aurora-Hydrogen-for-a-Net-Zero-GB-An-integrated-energy-market-perspective.pdf",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source:
					"/media/trump-administration-unlikely-to-meaningfully-slow-energy-transition-or-reduce-energy-costs-for-american-consumers-aurora-finds",
				destination:
					"/company/press-room/trump-administration-unlikely-to-meaningfully-slow-energy-transition-or-reduce-energy-costs-for-american-consumers-aurora-finds",
				permanent: true,
			},
			{
				source: "/category/country/asia-pacific/india",
				destination: "/global-presence/india",
				permanent: true,
			},
			{
				source: "/category/country/central-south-america/chile",
				destination: "/global-presence/chile",
				permanent: true,
			},
			{
				source:
					"/sector/flexible-energy-storage/what-goes-wrong-when-modelling-forecasting-grid-scale-battery-investment-cases",
				destination:
					"/resources/aurora-insights/articles/what-goes-wrong-when-modelling-forecasting-grid-scale-battery-investment-cases",
				permanent: true,
			},
			{
				source:
					"/media/renewable-hydrogen-imports-could-compete-with-eu-production-by-2030",
				destination:
					"/resources/aurora-insights/articles/renewable-hydrogen-imports-could-compete-with-eu-production-by-2030",
				permanent: true,
			},
			{
				source: "/media/reducing-europes-dependency-on-russian-gas",
				destination:
					"/company/press-room/reducing-europes-dependency-on-russian-gas",
				permanent: true,
			},
			{
				source: "/insight/enabling-the-european-hydrogen-economy",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/webinar/speed-and-scale-load-growth-potential-in-alberta-2",
				destination:
					"/resources/webinar/speed-and-scale-load-growth-potential-in-alberta-2",
				permanent: true,
			},
			{
				source:
					"/media/data-centers-energy-iberian-peninsula-energy-demand-ppa-renewable-energy-industrial-transformation-spain-portugal",
				destination:
					"/company/press-room/data-centers-energy-iberian-peninsula-energy-demand-ppa-renewable-energy-industrial-transformation-spain-portugal",
				permanent: true,
			},
			{
				source: "/webinar/how-attractive-are-battery-economics-in-india",
				destination:
					"/resources/webinar/how-attractive-are-battery-economics-in-india",
				permanent: true,
			},
			{
				source: "/insight/european-renewable-energy-markets-attractiveness-report",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/category/insight-type/aurora-news",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/insight/resource-adequacy-in-california",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/media/new-global-headquarters-secured-in-the-heart-of-oxford-by-aurora-energy-research",
				destination:
					"/company/press-room/new-global-headquarters-secured-in-the-heart-of-oxford-by-aurora-energy-research",
				permanent: true,
			},
			{
				source: "/insight/decarbonisation-of-heat-in-great-britain",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/webinar/watts-next-for-renewables-in-europe",
				destination: "/resources/webinar/watts-next-for-renewables-in-europe",
				permanent: true,
			},
			{
				source: "/market-reports/european-renewables-market-overview-report",
				destination:
					"/resources/aurora-insights/market-reports/european-renewables-market-overview-report",
				permanent: true,
			},
			{
				source:
					"/media/aurora-finds-regional-variation-in-battery-returns-throughout-chile-immediate-opportunities-in-the-south-steady-returns-in-the-north",
				destination:
					"/resources/aurora-insights/market-reports/aurora-finds-regional-variation-in-battery-returns-throughout-chile-immediate-opportunities-in-the-south-steady-returns-in-the-north",
				permanent: true,
			},
			{
				source:
					"/insight/hydrogen-market-attractiveness-rating-hymar-report-april-2021",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/iberian-energy-demand-data-centers",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/country/europe/great-britain/the-new-economics-of-offshore-wind",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/insight-type/webinar-recording/french-power-market-annual-outlook-and-market-consensus",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source:
					"/country/europe/aurora-spring-forum-2025-comes-at-a-defining-moment-to-navigate-geopolitical-uncertainty-and-energy-transition",
				destination:
					"/company/press-room/aurora-spring-forum-2025-comes-at-a-defining-moment-to-navigate-geopolitical-uncertainty-and-energy-transition",
				permanent: true,
			},
			{
				source:
					"/media/aurora-officially-kicks-off-graduate-analyst-programme-in-berlin",
				destination:
					"/company/press-room/aurora-officially-kicks-off-graduate-analyst-programme-in-berlin",
				permanent: true,
			},
			{
				source:
					"/insight/investing-in-european-hydrogen-which-are-the-most-attractive-markets",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/category/sector/renewable-energy/page/5",
				destination: "/",
				permanent: true,
			},
			{
				source: "/category/insight-type/public/page/6",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/country/europe/greece/italy-great-britain-germany-currently-the-most-attractive-battery-markets-in-europe-aurora-finds",
				destination:
					"/company/press-room/italy-great-britain-germany-currently-the-most-attractive-battery-markets-in-europe-aurora-finds",
				permanent: true,
			},
			{
				source: "/category/feeds/showcase-feed/page/6",
				destination: "/",
				permanent: true,
			},
			{
				source:
					"/media/new-report-from-aurora-energy-research-finds-that-battery-storage-facilities-saved-texas-grid-over-750-million-during-peak-demand-days-in-winter-2024",
				destination:
					"/company/press-room/new-report-from-aurora-energy-research-finds-that-battery-storage-facilities-saved-texas-grid-over-750-million-during-peak-demand-days-in-winter-2024",
				permanent: true,
			},
			{
				source: "/insight/the-battery-buildout-in-europe",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/webinar/overview-of-the-tucson-electric-power-resource-plan-and-procurement-activities",
				destination:
					"/resources/webinar/overview-of-the-tucson-electric-power-resource-plan-and-procurement-activities",
				permanent: true,
			},
			{
				source:
					"/country/europe/corporate-ppas-on-the-rise-a-european-market-overview",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/company/press-releases/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				destination:
					"/company/press-room/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				permanent: true,
			},
			{
				source:
					"/media/indias-%E2%82%B910-kwh-price-cap-could-undermine-renewables-investment-slow-down-power-sector-decarbonisation",
				destination:
					"/company/press-room/indias-%E2%82%B910-kwh-price-cap-could-undermine-renewables-investment-slow-down-power-sector-decarbonisation",
				permanent: true,
			},
			{
				source:
					"/media/auroras-chronos-poised-to-revolutionise-battery-valuations-in-italy",
				destination:
					"/company/press-room/auroras-chronos-poised-to-revolutionise-battery-valuations-in-italy",
				permanent: true,
			},
			{
				source:
					"/media/aurora-sonnedix-energy-renewable-wind-solar-storage-pipeline",
				destination:
					"/company/press-room/aurora-sonnedix-energy-renewable-wind-solar-storage-pipeline",
				permanent: true,
			},
			{
				source:
					"/media/auroras-first-ever-forecast-in-the-western-balkans-eyes-investor-movement-reaching-tens-of-billions-of-euros-in-the-regions-renewable-energy",
				destination:
					"/company/press-room/auroras-first-ever-forecast-in-the-western-balkans-eyes-investor-movement-reaching-tens-of-billions-of-euros-in-the-regions-renewable-energy",
				permanent: true,
			},
			{
				source:
					"/media/aurora-warns-of-opportunities-and-risks-for-indian-market-amid-rapid-demand-growth-and-rising-merchant-power-liquidity",
				destination:
					"/company/press-room/aurora-warns-of-opportunities-and-risks-for-indian-market-amid-rapid-demand-growth-and-rising-merchant-power-liquidity",
				permanent: true,
			},
			{
				source:
					"/resources/Aurora-Hydrogen-in-the-Northwest-European-energy-system.pdf",
				destination: "/",
				permanent: true,
			},
			{
				source: "/media/aurora-expands-in-brazil",
				destination: "/company/press-room/aurora-expands-in-brazil",
				permanent: true,
			},
			{
				source: "/media/aurora-energy-research-expands-reach-in-philippines",
				destination:
					"/company/press-room/aurora-energy-research-expands-reach-in-philippines",
				permanent: true,
			},
			{
				source: "/media/europe-on-track-to-double-solar-capacity-by-2030",
				destination:
					"/company/press-room/europe-on-track-to-double-solar-capacity-by-2030",
				permanent: true,
			},
			{
				source:
					"/country/europe/netherlands/dutch-energy-intensive-industry-presents-aurora-report-on-rising-network-costs-to-minister-of-climate-and-green-growth",
				destination:
					"/company/press-room/dutch-energy-intensive-industry-presents-aurora-report-on-rising-network-costs-to-minister-of-climate-and-green-growth",
				permanent: true,
			},
			{
				source: "/insight/long-duration-electricity-storage-in-gb-2",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/hydrogen-for-a-net-zero-gb",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source:
					"/media/guarantees-of-origin-market-set-for-growth-trajectory-projected-to-reach-3-7-bn-e-by-2030",
				destination:
					"/company/press-room/guarantees-of-origin-market-set-for-growth-trajectory-projected-to-reach-3-7-bn-e-by-2030",
				permanent: true,
			},
			{
				source: "/media/long-duration-electricity-storage-in-gb",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/insight/hydrogen-in-the-northwest-european-energy-system",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/insight/decarbonising-hydrogen-in-a-net-zero-economy",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source:
					"/media/companies-are-developing-over-200-gw-of-hydrogen-electrolyser-projects-globally-85-of-which-are-in-europe",
				destination:
					"/company/press-room/companies-are-developing-over-200-gw-of-hydrogen-electrolyser-projects-globally-85-of-which-are-in-europe",
				permanent: true,
			},
			{
				source: "/media/hydrogen-could-be-120-billion-industry-in-europe-by-2050",
				destination:
					"/company/press-room/hydrogen-could-be-120-billion-industry-in-europe-by-2050",
				permanent: true,
			},
			{
				source:
					"/insight/preserving-the-competitiveness-of-european-industry-and-power-prices",
				destination: "/resources/aurora-insights?category=Market+reports",
				permanent: true,
			},
			{
				source: "/how-we-help/asset-citing-optimisation",
				destination: "/how-we-help/asset-siting-optimisation",
				permanent: true,
			},
			{
				source: "/Company",
				destination: "/company/about",
				permanent: true,
			},
			{
				source: "/Locations",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/advisory",
				destination: "/service/advisory",
				permanent: true,
			},
			{
				source: "/Analytics",
				destination: "/products",
				permanent: true,
			},
			{
				source: "/Sector",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/media/aurora-energy-transition",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/Legal",
				destination: "/legal/terms",
				permanent: true,
			},
			{
				source: "/Careers",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/uploads/2025/02/Press",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/media/reform-to-clean-energy",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/media/aurora-energy-research-launches-bankable-battery",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/media/new-aurora-report-finds",
				destination:
					"/company/press-room/new-aurora-report-finds-northern-virginia-data-center-demand-could-incentivize-up-to-15-gw-of-additional-natural-gas-generators-by-2030",
				permanent: true,
			},
			{
				source: "/media/trump-administration-unlikely",
				destination:
					"/company/press-room/trump-administration-unlikely-to-meaningfully-slow-energy-transition-or-reduce-energy-costs-for-american-consumers-aurora-finds",
				permanent: true,
			},
			{
				source: "/company/press-releases/tpg-rise",
				destination:
					"/company/press-room/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth",
				permanent: true,
			},
			{
				source: "/company/press-releases/aurora-energy-research-finds",
				destination: "/company/press-room/",
				permanent: true,
			},
			{
				source: "/uploads/2022/02/Aurora",
				destination:
					"/company/press-room/aurora-advises-ni-government-on-renewables-scheme-auction-design-released",
				permanent: true,
			},
			{
				source: "/company/press-releases/aurora-launches-lumus",
				destination:
					"/company/press-room/aurora-launches-lumus-to-bring-clarity-to-ppa-pricing-across-europe",
				permanent: true,
			},
			{
				source: "/category/Central%20&%20South%20America",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/media/global-hydrogen-pipeline",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source: "/uploads/2023/09/Locational",
				destination: "/resources/aurora-insights",
				permanent: true,
			},
			{
				source: "/events/unpacking-germanys-new",
				destination:
					"/events/unpacking-germanys-new-energy-direction-turning-point",
				permanent: true,
			},
			{
				source: "/company/press-releases/evs-data-centers-hydrogen",
				destination: "/company/press-room/",
				permanent: true,
			},
			{
				source: "/uploads/2022/07/Aurora",
				destination:
					"/company/press-room/aurora-advises-ni-government-on-renewables-scheme-auction-design-released",
				permanent: true,
			},
			{
				source: "/AER-Media-Brief-2024",
				destination: "/wp-content/uploads/2024/06/AER-Media-Brief-2024.pdf",
				permanent: true,
			},
			{
				source: "/uploads/2025/01/Capacity",
				destination: "/resources/webinar",
				permanent: true,
			},
			{
				source: "/analytics/gb-power",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/analytics/gb-renewables",
				destination: "/global-presence/great-britain",
				permanent: true,
			},
			{
				source: "/analytics/iberian-power",
				destination: "/global-presence/iberia",
				permanent: true,
			},
			{
				source: "/insight/grid-fee-outlook-for-the-netherlands-2045",
				destination:
					"/resources/aurora-insights/articles/grid-fee-outlook-for-the-netherlands-2045",
				permanent: true,
			},
			{
				source: "/company/media/press-release-subscription",
				destination: "/company/press-room",
				permanent: true,
			},
			{
				source:
					"/insight/decarbonisation-of-the-german-power-system-our-study-shows-savings-potential-of-between-e300-and-e700-billion-by-2045",
				destination:
					"/resources/aurora-insights/market-reports/decarbonisation-of-the-german-power-system-our-study-shows-savings-potential-of-between-e300-and-e700-billion-by-2045",
				permanent: true,
			},
			{
				source: "/insight/power-market-impact-of-splitting-the-german-bidding-zone",
				destination:
					"/resources/aurora-insights/market-reports/power-market-impact-of-splitting-the-german-bidding-zone",
				permanent: true,
			},
			{
				source: "/country/north-america/pjm-capacity-market-policy-note",
				destination:
					"/resources/aurora-insights/market-reports/pjm-capacity-market-policy-note",
				permanent: true,
			},
			{
				source: "/insight/federal-policy-update-trumps-first-three-weeks-in-office",
				destination:
					"/resources/aurora-insights/market-reports/federal-policy-update-trumps-first-three-weeks-in-office",
				permanent: true,
			},
			{
				source: "/insight/data-centers-and-their-impact-on-the-us-power-market",
				destination:
					"/resources/aurora-insights/market-reports/data-centers-and-their-impact-on-the-us-power-market",
				permanent: true,
			},
			{
				source:
					"/insight/impact-of-reform-to-clean-energy-tax-credits-on-investment-jobs-and-consumer-bills",
				destination:
					"/resources/aurora-insights/market-reports/impact-of-reform-to-clean-energy-tax-credits-on-investment-jobs-and-consumer-bills-2",
				permanent: true,
			},
			{
				source:
					"/2025/05/07/green-dreams-bankable-schemes-how-to-thrive-in-the-philippine-power-market",
				destination:
					"/resources/aurora-insights/newsletters/green-dreams-bankable-schemes-how-to-thrive-in-the-philippine-power-market",
				permanent: true,
			},
			{
				source:
					"/2025/03/06/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				destination:
					"/resources/aurora-insights/newsletters/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				permanent: true,
			},
			{
				source: "/2025/02/05/no-more-russian-gas-via-ukraine",
				destination:
					"/resources/aurora-insights/newsletters/no-more-russian-gas-via-ukraine",
				permanent: true,
			},
			{
				source: "/2025/01/08/the-battery-buildout-in-europe",
				destination:
					"/resources/aurora-insights/newsletters/the-battery-buildout-in-europe",
				permanent: true,
			},
			{
				source: "/2024/12/09/will-trump-delay-americas-energy-transition",
				destination:
					"/resources/aurora-insights/newsletters/will-trump-delay-americas-energy-transition",
				permanent: true,
			},
			{
				source: "/2024/11/06/what-does-chiles-solar-powered-future-look-like",
				destination:
					"/resources/aurora-insights/newsletters/what-does-chiles-solar-powered-future-look-like",
				permanent: true,
			},
			{
				source:
					"/2024/10/07/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				destination:
					"/resources/aurora-insights/newsletters/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				permanent: true,
			},
			{
				source: "/products/flexible-energy-service",
				destination: "/products/flexible-energy",
				permanent: true,
			},
			{
				source: "/products/hydrogen-service",
				destination: "/products/hydrogen",
				permanent: true,
			},
			{
				source: "/products/power-renewables-service",
				destination: "/products/power-renewables",
				permanent: true,
			},
			{
				source: "/products/lumus-ppa-valuations-software",
				destination: "/software/lumus",
				permanent: true,
			},
			{
				source: "/products/grid-add-on",
				destination: "/products/grid",
				permanent: true,
			},
			{
				source:
					"/country/asia-pacific/green-dreams-bankable-schemes-how-to-thrive-in-the-philippine-power-market",
				destination:
					"/resources/aurora-insights/newsletters/green-dreams-bankable-schemes-how-to-thrive-in-the-philippine-power-market",
				permanent: true,
			},
			{
				source: "/insight/will-trump-delay-americas-energy-transition",
				destination:
					"/resources/aurora-insights/newsletters/will-trump-delay-americas-energy-transition",
				permanent: true,
			},
			{
				source:
					"/insight/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				destination:
					"/resources/aurora-insights/newsletters/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				permanent: true,
			},
			{
				source:
					"/insight/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				destination:
					"/resources/aurora-insights/newsletters/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				permanent: true,
			},
			{
				source:
					"/feeds/portugal-renewable-wind-energy-transition-onshore-repowering",
				destination:
					"/company/press-room/portugal-renewable-wind-energy-transition-onshore-repowering",
				permanent: true,
			},
			{
				source:
					"/insight/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter",
					},
					{
						type: "query",
						key: "utm_medium",
						value: "LinkedIn+Newsletter",
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Aurora_March+2025_LinkedIn_Commentary",
					},
					{
						type: "query",
						key: "utm_id",
						value: "March_2025+-+Aurora_LinkedIn_Commentary",
					},
				],
				destination:
					"/resources/aurora-insights/newsletters/inside-the-us-data-center-boom-whats-powering-the-next-tech-revolution",
				permanent: true,
			},
			{
				source: "/",
				has: [
					{
						type: "query",
						key: "p",
						value: "36996",
					},
					{
						type: "query",
						key: "preview",
						value: "true",
					},
				],
				destination:
					"/resources/aurora-insights/newsletters/no-more-russian-gas-via-ukraine",
				permanent: true,
			},
			{
				source: "/",
				has: [
					{
						type: "query",
						key: "p",
						value: "36434",
					},
					{
						type: "query",
						key: "preview",
						value: "true",
					},
				],
				destination:
					"/resources/aurora-insights/newsletters/the-battery-buildout-in-europe",
				permanent: false,
			},
			{
				source: "/",
				has: [
					{
						type: "query",
						key: "p",
						value: "35055",
					},
					{
						type: "query",
						key: "preview",
						value: "true",
					},
				],
				destination:
					"/resources/aurora-insights/newsletters/what-does-chiles-solar-powered-future-look-like",
				permanent: false,
			},
			{
				source:
					"/insight/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter",
					},
					{
						type: "query",
						key: "utm_medium",
						value: "LinkedIn Newsletter",
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Commentary_Western_Balkans_Newsletter",
					},
					{
						type: "query",
						key: "utm_id",
						value: "October 2024 - Commentary - Wester_Balkans",
					},
				],
				destination:
					"/resources/aurora-insights/newsletters/the-future-of-energy-in-the-western-balkans-a-renewables-revolution",
				permanent: true,
			},
			{
				source: "/company/press-releases/:path*",
				destination: "/company/press-room/:path*",
				permanent: true,
			},
			{
				source: "/resources/energy-talks/:path*",
				destination: "/resources/energy-unplugged/:path*",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
