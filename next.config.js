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
        img-src 'self' data: https://www.google.co.in/ https://www.googletagmanager.com/ https://cms-staging.auroraer.com/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://img.youtube.com https://i.ytimg.com https://maps.googleapis.com https://maps.gstatic.com https://google.com https://ggpht.com;
        font-src 'self' data: https://fonts.gstatic.com https://storage.googleapis.com/ https://maps.gstatic.com;
        connect-src 'self' https://vimeo.com/ https://log.cookieyes.com/ https://cdn-cookieyes.com/ https://cms-staging.auroraer.com/ https://audio.api.speechify.com/ https://speechify-api-dot-speechifymobile.uc.r.appspot.com/ https://cdn.jsdelivr.net/ https://auroraer.pinpointhq.com/ https://f.clarity.ms/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://analytics.google.com/ https://www.youtube.com https://maps.googleapis.com https://www.google.com/;
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
				destination: "/careers/early-careers/sao-paulo-graduate-modelling-programme",
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
				destination: "/company/press-releases",
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
				source: "/webinar/powering-tshe-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				destination: "/resources/webinar/powering-the-italian-future-here-comes-the-sun-the-wind-and-the-atom",
				permanent: true,
			},
			{
				source: "/country/europe/great-britain/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				destination: "/company/press-releases/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				permanent: true,
			},
			{
				source: "/country/europe/ais-energy-appetite-can-renewable-ppas-deliver",
				destination: "/resources/aurora-insights/articles/ais-energy-appetite-can-renewable-ppas-deliver",
				permanent: true,
			},
			{
				source: "/country/global/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth",
				destination: "/company/press-releases/tpg-rise-climate-acquires-aurora-energy-research-to-accelerate-strategic-growth?search=tpg%20rise",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-for-germany",
				destination: "/software/chronos",
				permanent: true,
			},
			{
				source: "/media/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				destination: "/company/press-releases/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				permanent: true,
			},
			{
				source: "/media/aurora-launches-lumus-to-bring-clarity-to-ppa-pricing-across-europe",
				destination: "/company/press-releases/northeast-brazil-netherlands-green-hydrogen-corridor-could-fulfill-dutch-imports-by-2030-new-study-reveals",
				permanent: true,
			},
			{
				source: "/media/evs-data-centers-and-hydrogen-to-quadruple-brazils-power-demand-share-by-2060-study-finds",
				destination: "/company/press-releases/evs-data-centers-and-hydrogen-to-quadruple-brazils-power-demand-share-by-2060-study-finds",
				permanent: true,
			},
			{
				source: "/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				destination: "/company/press-releases/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source: "/media/aurora-energy-transition-forum-2025",
				destination: "/company/press-releases/aurora-energy-transition-forum-2025",
				permanent: true,
			},
			{
				source: "/media/proposed-texas-legislation/",
				destination: "/company/press-releases/proposed-texas-legislation",
				permanent: true,
			},
			{
				source: "/media/surging-demand-growth-in-texas",
				destination: "/company/press-releases/surging-demand-growth-in-texas",
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
				source: "/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				destination: "/resources/webinar/charging-ahead-navigating-risks-in-french-battery-storage-projects",
				permanent: true,
			},
			{
				source: "/media/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says/",
				destination: "/company/press-releases/frances-battery-market-expected-to-expand-rapidly-by-2030-but-faces-saturation-risks-aurora-says",
				permanent: true,
			},
			{
				source: "/media/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				destination: "https://www-staging.auroraer.com/company/press-releases/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				permanent: true,
			},
			{
				source: "/country/europe/nordics-and-iberia-step-up-as-europes-hydrogen-frontrunners/",
				destination: "/company/press-releases/nordics-and-iberia-step-up-as-europes-hydrogen-frontrunners",
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
				source: "/country/north-america/capacity-market-dynamics-and-reforms-in-miso",
				destination: "/resources/webinar/capacity-market-dynamics-and-reforms-in-miso-2",
				permanent: true,
			},
			{
				source: "/media/texas-consumers-face-10-increase-in-power-bills-and-higher-reliability-risks-without-renewables-expansion-aurora-finds",
				destination: "/company/press-releases/texas-consumers-face-10-increase-in-power-bills-and-higher-reliability-risks-without-renewables-expansion-aurora-energy-research-finds",
				permanent: true,
			},
			{
				source: "/media/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				destination: "/company/press-releases/community-solar-and-storage-would-save-californians-6-5-billion-in-electricity-costs",
				permanent: true,
			},
			{
				source: "/country/north-america/deep-dive-into-caiso-load-growth",
				destination: "/resources/webinar/a-deep-dive-into-caiso-load-growth",
				permanent: true,
			},
			{
				source: "/country/north-america/impact-of-demand-side-management-in-ercot",
				destination: "/resources/aurora-insights/articles/impact-of-demand-side-management-in-ercot",
				permanent: true,
			},
			{
				source: "/country/north-america/implications-of-retroactive-firming-requirements-sb715-hb3356",
				destination: "/resources/aurora-insights/articles/implications-of-retroactive-firming-requirements-sb715-hb3356",
				permanent: true,
			},
			{
				source: "/country/north-america/miso-capacity-market-2025-26-pra-results",
				destination: "/resources/aurora-insights/articles/miso-capacity-market-2025-26-pra-results",
				permanent: true,
			},
			{
				source: "/country/north-america/new-yorks-energy-needs-reliability-offshore-wind",
				destination: "/resources/aurora-insights/market-reports/meeting-new-yorks-energy-needs-reliability-offshore-wind",
				permanent: true,
			},
			{
				source: "/webinar/spp-expansion-through-markets-rto-west",
				destination: "/resources/webinar/go-west-spps-expansion-through-markets-rto-west",
				permanent: true,
			},
			{
				source: "/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns",
				destination: "/resources/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns-2",
				permanent: true,
			},
			{
				source: "/webinar/thermal-generation-in-pjm",
				destination: "/resources/webinar/thermal-generation-in-pjm-natural-gas-coal-and-decarbonization-2",
				permanent: true,
			},
			{
				source: "/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso/",
				destination: "/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso",
				permanent: true,
			},
			{
				source: "/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2/",
				destination: "/resources/webinar/shifting-currents-nodal-price-forecasting-and-grid-congestion-in-nyiso-2",
				permanent: true,
			},
			{
				source: "/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy/",
				destination: "/resources/webinar/miso-market-outlook-coal-retirements-and-resource-adequacy-concerns-2",
				permanent: true,
			},
			{
				source: "/webinar/albertas-restructured-energy-market",
				destination: "/resources/webinar/the-path-ahead-analyzing-albertas-restructured-energy-market",
				permanent: true,
			},
			{
				source: "/media/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future/",
				destination: "/company/press-releases/aurora-finds-offshore-wind-is-key-to-new-yorks-energy-future",
				permanent: true,
			},
			{
				source: "/media/proposed-texas-legislation",
				destination: "/company/press-releases/proposed-texas-legislation",
				permanent: true,
			},
			{
				source: "/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets/",
				destination: "/company/press-releases/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source: "/country/global/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets/",
				destination: "/company/press-releases/russian-gas-resumption-to-cut-european-energy-prices-by-7-in-the-long-term-while-trade-tariffs-weigh-on-us-growth-global-markets",
				permanent: true,
			},
			{
				source: "/media/surging-demand-growth-in-texas",
				destination: "/company/press-releases/surging-demand-growth-in-texas",
				permanent: true,
			},
			{
				source: "/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen/",
				destination: "/resources/webinar/electricity-demand-in-brazil-data-centers-evs-and-hydrogen",
				permanent: true,
			},
			{
				source: "/webinar/from-volatility-to-value-negative-prices-and-batteries-in-the-baltics/",
				destination: "/resources/webinar/from-volatility-to-value-negative-prices-and-batteries-in-the-baltics",
				permanent: true,
			},
			{
				source: "/new-york-energy-transition-forum-2025",
				destination: "/events/us-energy-at-a-crossroads-dominance-or-disruption",
				permanent: true,
			},
			{
				source: "/insight/risks-for-renewables-in-the-nordics-negative-prices-and-demand",
				destination: "/resources/webinar/risks-for-renewables-in-the-nordics-negative-prices-demand",
				permanent: true,
			},
			{
				source: "/insight/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres",
				destination: "/company/press-releases/coordinated-action-could-unlock-35bn-in-green-investment-and-5-gw-of-data-centres-new-aurora-report-says",
				permanent: true,
			},
			{
				source: "/life-at-aurora",
				destination: "/careers/life-at-aurora",
				permanent: true,
			},
			{
				source: "/software/chronos/chronos-for-germany",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter"
					},
					{
						type: "query",
						key: "utm_medium",
						value: "Chronos+Banner"
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Chronos+x+pv+magazine"
					}
				],
				destination: "/software/chronos",
				permanent: true
			},
			{
				source: "/software/lumus",
				has: [
					{
						type: "query",
						key: "utm_source",
						value: "Newsletter"
					},
					{
						type: "query",
						key: "utm_medium",
						value: "Lumus+Banner"
					},
					{
						type: "query",
						key: "utm_campaign",
						value: "Lumus+x+pv+magazine"
					}
				],
				destination: "/software/lumus",
				permanent: true
			}
		];
	},
};

module.exports = nextConfig;
