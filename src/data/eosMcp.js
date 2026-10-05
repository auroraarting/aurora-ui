/** Static content for the EOS MCP product page (/eos-mcp).
 *  There is no "eos-mcp" page in the CMS yet, so the copy lives here. */

/** MCP quick-start guide on EOS (from "EOS MCP - Website request - answers") */
export const eosMcpConnectUrl =
	"https://eos.auroraer.com/dragonfly/user-guides/eos/aurora-mcp-guide?locale=en#quick-start";

/** Microsoft Bookings page for the commercial workshop team */
export const eosMcpDemoUrl =
	"https://bookings.cloud.microsoft/book/CommercialWorkshopBookings@auroraer.com/s/n2uLQiae5k67LMn2_yx3Xg2?ismsaljsauthenabled";

/** Resources page that the product page's "View all" and resource cards point to */
export const eosMcpResourcesUrl = "/resources/eos-mcp";

export const benefits = [
	{
		icon: "bars",
		title: "Built for real analytical work",
		desc: "Energy market research, strategy, valuations and investment calls.",
	},
	{
		icon: "clock",
		title: "Compresses hours into minutes",
		desc: "Your research and analytical capabilities, scaled.",
	},
	{
		icon: "database",
		title: "Built on Aurora's source of truth",
		desc: "Aurora's proprietary intelligence, with the expertise clients trust.",
	},
	{
		icon: "network",
		title: "Bring Aurora into your own professional context",
		desc: "Energy intelligence available in the AI tools you already use.",
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
		title: "What's an MCP?",
		cta: "Understand MCPs",
		href: `${eosMcpResourcesUrl}#what-is-mcp`,
	},
	{
		title: "See EOS MCP in action",
		cta: "Watch real examples",
		href: `${eosMcpResourcesUrl}#use-cases`,
	},
	{
		title: "Frequently asked questions",
		cta: "Get answers",
		href: `${eosMcpResourcesUrl}#faqs`,
	},
];

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
