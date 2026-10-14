/** Default content for the EOS MCP product page (/eos-mcp), CMS page
 *  "EOS MCP - Products". Shaped like the page's ACF fields: the page falls back
 *  to these field by field until the CMS has a value, and
 *  cms/eos-mcp-products-content.json seeds the CMS with exactly this copy. */

/** MCP quick-start guide on EOS (from "EOS MCP - Website request - answers") */
export const eosMcpConnectUrl =
	"https://eos.auroraer.com/dragonfly/user-guides/eos/aurora-mcp-guide?locale=en#quick-start";

/** Microsoft Bookings page for the commercial workshop team */
export const eosMcpDemoUrl =
	"https://bookings.cloud.microsoft/book/CommercialWorkshopBookings@auroraer.com/s/n2uLQiae5k67LMn2_yx3Xg2?ismsaljsauthenabled";

/** Resources page that the product page's "View all" and resource cards point to */
export const eosMcpResourcesUrl = "/eos-mcp/ai-powered-energy-workflows";

export const benefits = [
	{
		icon: "bars",
		title: "Built for real analytical work",
		description: "Energy market research, strategy, valuations and investment calls.",
	},
	{
		icon: "clock",
		title: "Compresses hours into minutes",
		description: "Your research and analytical capabilities, scaled.",
	},
	{
		icon: "database",
		title: "Built on Aurora's source of truth",
		description: "Aurora's proprietary intelligence, with the expertise clients trust.",
	},
	{
		icon: "network",
		title: "Bring Aurora into your own professional context",
		description: "Energy intelligence available in the AI tools you already use.",
	},
];

export const lifecycleStages = [
	{
		icon: "search",
		title: "Market understanding",
		question: "What is happening, and what is Aurora's view?",
		points: [
			"Generate tailored market briefings",
			"Explain market shifts and their drivers",
			"Compare Aurora's view across markets",
			"Track emerging opportunities and risks",
			"Turn research into board-ready summaries",
		],
	},
	{
		icon: "pin",
		title: "Project siting",
		question: "Where could we build?",
		points: [
			"Screen development locations at scale",
			"Identify new market hotspots",
			"Compare regions and countries",
			"Assess curtailment and network risks",
			"Shortlist the most attractive sites",
		],
	},
	{
		icon: "rank",
		title: "Project prioritisation",
		question: "Which opportunities are worth developing?",
		points: [
			"Rank projects across a pipeline",
			"Compare investment opportunities",
			"Stress test project economics",
			"Identify hidden upside and risks",
			"Build investment committee recommendations",
		],
	},
	{
		icon: "gear",
		title: "Project & asset design",
		question: "What should we build, or rebuild, at this site?",
		points: [
			"Compare technology configurations",
			"Optimise asset sizing and design",
			"Evaluate repowering opportunities",
			"Test hybrid asset concepts",
			"Quantify the value of design choices",
		],
	},
	{
		icon: "contract",
		title: "Contracting & route to market",
		question: "How should this asset earn revenue?",
		points: [
			"Compare revenue strategies",
			"Assess PPAs and merchant exposure",
			"Evaluate contracting options",
			"Test revenue outcomes under different scenarios",
			"Support negotiation and bidding decisions",
		],
	},
	{
		icon: "gauge",
		title: "Asset benchmarking",
		question: "Is this asset capturing the revenue it should?",
		points: [
			"Benchmark performance against expectations",
			"Diagnose drivers of underperformance",
			"Identify revenue leakage",
			"Compare assets across portfolios",
			"Produce automated performance reviews",
		],
	},
	{
		icon: "trend",
		title: "Asset value reporting",
		question: "Has the expected value of what we own changed?",
		points: [
			"Track portfolio value changes",
			"Explain valuation movements",
			"Generate mark-to-market updates",
			"Produce investor-ready reporting",
			"Highlight key value drivers and risks",
		],
	},
];

/** Each card jumps to a section of the resources page */
export const resources = [
	{
		title: "What is an MCP?",
		ctaText: "Understand MCPs",
		url: `${eosMcpResourcesUrl}#what-is-mcp`,
	},
	{
		title: "See EOS MCP in action",
		ctaText: "Watch real examples",
		url: `${eosMcpResourcesUrl}#use-cases`,
	},
	{
		title: "Frequently asked questions",
		ctaText: "Get answers",
		url: `${eosMcpResourcesUrl}#faqs`,
	},
];

export const eosMcpProducts = {
	buttons: {
		connectButtonText: "Connect EOS MCP",
		connectUrl: eosMcpConnectUrl,
		demoButtonText: "Book a demo",
		demoUrl: eosMcpDemoUrl,
	},
	banner: {
		title: "Turn AI into an energy market expert.",
		description:
			"Bring Aurora's trusted intelligence into your AI tools like ChatGPT and Claude to explore complex questions, generate decision-ready analysis, and move forward with confidence.",
		availabilityNote: "Available to all Aurora subscribers.",
	},
	overview: {
		kicker: "Overview",
		title: "Ask a question. Get a decision-ready outcome.",
		description:
			"EOS MCP helps your AI agent retrieve the right Aurora data, reason through the task, and generate the analysis, recommendations, content, or answers you need in seconds, all within your AI assistant.",
		demoQuestion: "What's driving the dips in French nuclear availability?",
		demoLabel: "Aurora Energy Research",
	},
	keyAdvantages: {
		kicker: "Key Advantages",
		items: benefits,
	},
	lifecycle: {
		kicker: "Full lifecycle coverage",
		title: "One AI agent, every stage of the asset lifecycle.",
		description:
			"Every decision in the asset lifecycle starts with a question. EOS MCP makes Aurora's market intelligence available directly within your AI workflows—enabling faster analysis and more informed decisions at every stage, from first market read to portfolio valuation.",
		pointsLabel: "MCP can help you",
		stages: lifecycleStages,
	},
	closingCta: {
		title: "Get started with EOS MCP today.",
		description:
			"Follow the simple setup instructions in our MCP documentation and connect your first AI tool in minutes.",
	},
	resources: {
		kicker: "Resources",
		title: "Learn more about EOS MCP",
		viewAllText: "View all",
		viewAllUrl: eosMcpResourcesUrl,
		cards: resources,
	},
};

/** Bar heights (px) and colours for the looping demo chart */
export const demoBars = [
	[22, "teal"],
	[38, "gold"],
	[50, "grey"],
	[30, "teal"],
	[60, "gold"],
	[44, "grey"],
	[70, "teal"],
	[55, "gold"],
	[80, "grey"],
	[62, "teal"],
	[48, "gold"],
	[36, "grey"],
	[58, "teal"],
	[42, "gold"],
];
