/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	// experimental: {
	// 	dynamicIO: true,
	// },
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
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms/ https://cdn-cookieyes.com/ https://storage.googleapis.com/ https://googleads.g.doubleclick.net/ https://connect.facebook.net/ https://www.googletagmanager.com/ https://www.youtube.com https://s.ytimg.com https://maps.googleapis.com https://maps.gstatic.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com;
        img-src 'self' data: https://www.google.co.in/ https://cdn-cookieyes.com/ https://www.googletagmanager.com/ https://cms-staging.auroraer.com/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://img.youtube.com https://i.ytimg.com https://maps.googleapis.com https://maps.gstatic.com https://google.com https://ggpht.com;
        font-src 'self' data: https://fonts.gstatic.com https://storage.googleapis.com/ https://maps.gstatic.com;
        connect-src 'self' https://vimeo.com/ https://www.google-analytics.com/ https://log.cookieyes.com/ https://cdn-cookieyes.com/ https://cms-staging.auroraer.com/ https://audio.api.speechify.com/ https://speechify-api-dot-speechifymobile.uc.r.appspot.com/ https://cdn.jsdelivr.net/ https://auroraer.pinpointhq.com/ https://f.clarity.ms/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://analytics.google.com/ https://www.youtube.com https://maps.googleapis.com https://www.google.com/;
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
				source: "/insights",
				destination: "/resources/aurora-insights",
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
					"/company/press-room/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth?search=tpg%20rise",
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
				source: "/media/proposed-texas-legislation/",
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
				source: "/software/chronos/chronos-for-germany",
				destination: "/software/chronos",
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
					"/media/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says/",
				destination:
					"/company/press-room/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				permanent: true,
			},
			{
				source:
					"/media/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				destination:
					"https://www-staging.auroraer.com/company/press-room/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				permanent: true,
			},
			{
				source:
					"/country/europe/nordics-and-iberia-step-up-as-europes-hydrogen-frontrunners/",
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
				source:
					"/media/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				destination:
					"/company/press-room/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
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
					"/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso/",
				destination:
					"/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso",
				permanent: true,
			},
			{
				source:
					"/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2/",
				destination:
					"/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2",
				permanent: true,
			},
			{
				source:
					"/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy/",
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
					"/media/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future/",
				destination:
					"/company/press-room/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				permanent: true,
			},
			{
				source: "/media/proposed-texas-legislation",
				destination: "/company/press-room/proposed-texas-legislation",
				permanent: true,
			},
			{
				source:
					"/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets/",
				destination:
					"/company/press-room/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source:
					"/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets/",
				destination:
					"/company/press-room/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source: "/media/surging-demand-growth-in-texas",
				destination: "/company/press-room/surging-demand-growth-in-texas",
				permanent: true,
			},
			{
				source:
					"/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen/",
				destination:
					"/resources/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen",
				permanent: true,
			},
			{
				source:
					"/webinar/from-volatility-to-value-negative-prices-and-batteries-in-the-baltics/",
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
				source: "/location/ireland",
				destination: "/global-presence/ireland",
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
				destination: "/who-are-you/developers",
				permanent: true,
			},
			{
				source: "/location/serbia",
				destination: "/global-presence/serbia",
				permanent: true,
			},
			{
				source: "/location/belgium",
				destination: "/global-presence/belgium",
				permanent: true,
			},
			{
				source: "/category/country",
				destination: "/global-presence",
				permanent: true,
			},
			{
				source: "/location/poland",
				destination: "/global-presence/poland",
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
				destination:
					"https://www-production.auroraer.com/resources/aurora-insights",
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
				destination: "/who-are-you/developers",
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
				destination:
					"/resources/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
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
				source: "/software/chronos/chronos-for-germany",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter",
					},
					{
						type: "query",
						key: "utm_medium",
						value: "Chronos+Banner",
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Chronos+x+pv+magazine",
					},
				],
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/software/lumus",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter",
					},
					{
						type: "query",
						key: "utm_medium",
						value: "Lumus+Banner",
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Lumus+x+pv+magazine",
					},
				],
				destination: "/software/lumus",
				permanent: true,
			},
			{
				source: "/company/press-releases/:path*",
				destination: "/company/press-room/:path*",
				permanent: true, // or false if it's temporary
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
		];
	},
};

module.exports = nextConfig;
