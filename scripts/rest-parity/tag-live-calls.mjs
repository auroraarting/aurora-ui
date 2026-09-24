// Which service functions the live tag capture should exercise, and with what.
// Anything missing here is simply not captured, so keep it in step with the
// service layer.
const slugs = {
	service: "advisory",
	whoareyou: "developers",
	howwehelp: "ppas",
	product: "power-renewables",
	software: "origin",
	country: "australia",
	earlyCareer: "tokyo-graduate-analyst-programme",
	video: "flexplorer",
	podcast: "ep-305-what-happens-when-a-market-moves-fast",
	insight: "ireland-energy-affordability-challenge",
	webinar: "ai-powered-energy-workflows-with-aurora-mcp-noram-special-edition",
	event: "aurora-energy-transition-summit-london-2026",
};

export const liveCalls = [
	["rest/Seo.service.js", [["getPageSeo", ["services", slugs.service]]]],
	["rest/Bundles.service.js", [["getBundlesSection", []]]],
	["rest/ContentPage.service.js", [
		["getCookies", []], ["getTerms", []], ["getPolicy", []], ["getSafeSender", []],
	]],
	["rest/Faq.service.js", [["getFaqPage", []]]],
	["rest/Contact.service.js", [["getContact", []]]],
	["rest/JoinUs.service.js", [["getJoinUsPage", []]]],
	["rest/Eos.service.js", [["getEosPage", []]]],
	["rest/Careers.service.js", [["getLifeAtAurora", []]]],
	["rest/OurTeams.service.js", [["getOurTeamsPage", []]]],
	["rest/About.service.js", [["getAboutPage", []]]],
	["rest/Service.service.js", [
		["getServiceData", [slugs.service]], ["getAllServiceData", []],
	]],
	["rest/WhoAreYou.service.js", [
		["getSingleWhoAreYou", [slugs.whoareyou]], ["getWhoAreYouSlugs", []],
	]],
	["rest/HowWeHelp.service.js", [
		["getSingleHowWeHelp", [slugs.howwehelp]],
		["getHowWeHelpListing", []], ["getHowWeHelpSlugs", []],
	]],
	["rest/Products.service.js", [
		["getProductBySlug", [slugs.product]], ["getProductSlugs", []],
		["getProductPage", []],
	]],
	["rest/Softwares.service.js", [
		["getSingleSoftware", [slugs.software]], ["getSoftwarePage", []],
		["getSoftwareSlugs", []],
	]],
	["rest/GlobalPresence.service.js", [
		["getRegions", []], ["getCountryList", []], ["getCountries", []],
		["getGlobalPresencePage", []], ["getCountryInside", [slugs.country]],
		["getCountryListWithTranslations", []],
	]],
	["rest/Offices.service.js", [["getOffices", []], ["getOfficesByRegions", []]]],
	["rest/Insights.service.js", [
		["getInsights", [{ first: 3, categories: ["commentary"] }]],
		["getInsightsCategories", [{ only: ["countries"] }]],
		["getInsightsPath", []], ["getInsightsInside", [slugs.insight]],
	]],
	["rest/EarlyCareers.service.js", [
		["getEarlyCareersListing", [{ first: 5 }]], ["getEarlyCareersPage", []],
		["getEarlyCareersInside", [slugs.earlyCareer]],
		["getEarlyCareersListingByRegions", []],
	]],
	["rest/Videos.service.js", [
		["getAllVideos", []], ["getLatestVideos", [slugs.video]],
		["getVideosInside", [slugs.video]],
	]],
	["rest/VideosLanding.service.js", [
		["getVideosLandingPage", []], ["getVideosLandingPageSocialLinks", []],
	]],
	["rest/EnergyTalks.service.js", [
		["getEnergyTalksPage", []], ["getEnergyTalksPageSocialLinks", []],
	]],
	["rest/InsightsListing.service.js", [["getInsightsPage", []]]],
	["rest/Podcast.service.js", [
		["getPodcasts", []], ["getPodcastInside", [slugs.podcast]],
	]],
	["rest/Webinar.service.js", [
		["getWebinarPage", []], ["getWebinars", [{ first: 3 }]],
		["getWebinarInside", [slugs.webinar]],
	]],
	["rest/Press.service.js", [
		["getPressPage", []], ["getPressPageInsights", []], ["getPressesLanguages", []],
	]],
	["rest/Events.service.js", [
		["getAllEvents", []], ["getEventsInside", [slugs.event]],
		["getEventLandingPage", []], ["getAllEventCategories", []],
	]],
	["rest/Languages.service.js", [["getAllLanguages", []]]],
	["rest/FilterOptions.service.js", [["getFilterOptions", []]]],
];
