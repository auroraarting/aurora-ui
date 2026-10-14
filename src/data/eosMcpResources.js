/** Default content for the EOS MCP resources page (/eos-mcp/ai-powered-energy-workflows), CMS
 *  page "EOS MCP - Resources", ported from "EOS MCP - Resources.html". Shaped
 *  like the page's ACF fields: the page falls back to these field by field
 *  until the CMS has a value, and cms/eos-mcp-resources-content.json seeds the
 *  CMS with exactly this copy. */

import { eosMcpConnectUrl, eosMcpDemoUrl } from "./eosMcp";

export const stats = [
	{
		number: "100+",
		label: "specialists across data, engineering, modelling and product building AI-powered analytics",
	},
	{
		number: "70%",
		label: "Estimated share of Aurora clients with access to agentic AI by H1 2027",
	},
	{
		number: "22k",
		label: "Monthly agentic tool calls made to EOS MCP.",
	},
];

export const mcpDoes = [
	"Connects AI to Aurora intelligence",
	"Allows AI agents to dynamically interact and reason with Aurora data",
	"Grounds analysis in trusted, traceable Aurora sources",
	"Speeds and scales analyst workflows",
];

export const mcpDoesnt = [
	"Replace your AI assistant",
	"Replace human expertise",
	"Access or use data it shouldn't",
	"Train on your conversations",
];

export const videoFilters = [
	"Market Understanding",
	"Project Siting",
	"Asset Management",
	"Best Practices",
];

/** `category` must match a videoFilters entry. The mockup had no mapping, so
 *  these are a first guess. Add `vimeoId` to a video to play it in place of
 *  its thumbnail. */
export const videos = [
	{
		thumbnail: "/img/eos-mcp/video-bess-markets.png",
		duration: "4:12",
		category: "Market Understanding",
		title: "Prioritise the most attractive European BESS markets",
		description: "Compare six markets on revenue potential, fundamentals and policy, in one prompt.",
	},
	{
		thumbnail: "/img/eos-mcp/video-forecast-assumptions.png",
		duration: "3:48",
		category: "Best Practices",
		title: "Trace forecast assumptions back to the source",
		description: "See how EOS MCP surfaces the analysis behind Aurora's Central scenario.",
	},
	{
		thumbnail: "/img/eos-mcp/video-repower.png",
		duration: "5:03",
		category: "Project Siting",
		title: "Decide what to build, rebuild, or repower",
		description: "Compare technology options for an existing project site, end to end.",
	},
	{
		thumbnail: "/img/eos-mcp/video-battery-benchmark.png",
		duration: "4:35",
		category: "Asset Management",
		title: "Benchmark battery performance",
		description: "Compare modelled vs. fleet revenues and update the outlook to 2035.",
	},
	/** New case studies from the "Website request - answers" doc. Each one
	 *  only has a raw Google Drive file, not a Vimeo ID — `driveLink` plays in
	 *  a popup via Drive's own preview iframe, and its thumbnail comes from
	 *  Drive's public thumbnail endpoint (see VideoLibrary in
	 *  EosMcpResourcesWrap). Swap in `vimeoId` + `thumbnail` once these are
	 *  uploaded to Vimeo. */
	{
		category: "Asset Management",
		title: "Test whether wider price spreads pay batteries",
		description:
			"Compare two-hour spreads with fleet revenue across four Australian states, split into wholesale and FCAS, in one prompt.",
		driveLink: "https://drive.google.com/file/d/1GNBZn4dQb7y7bNFKCsWKpCE__gow97Mv/view?usp=sharing",
	},
	{
		category: "Asset Management",
		title: "Quantify the value of switching off at negative prices",
		description:
			"See how much a Belgian solar plant's 2026 capture price improves if it stops generating through negative-price periods.",
		driveLink: "https://drive.google.com/file/d/1gLF5MNgrqC-xbDh0Q77U_ACauX06WFbs/view?usp=sharing",
	},
	{
		category: "Market Understanding",
		title: "Turn an Aurora report slide into an interactive analysis",
		description:
			"Recreate a CAISO nodal Sankey for 2020 vs 2025, add node-level tooltips and map the results, in three prompts.",
		driveLink: "https://drive.google.com/file/d/1dL4mtdYVTjWyo1lwM1afXjXrXtbnoQUo/view?usp=sharing",
	},
	{
		category: "Asset Management",
		title: "Benchmark battery margins against the wider fleet",
		description:
			"Compare ERCOT average, top-decile and bottom-decile margins, then trace the gap to revenue streams, cycling and spreads.",
		driveLink: "https://drive.google.com/file/d/12yi2DTd5q5IlfhMqUnklG_iF1xzvhcPM/view?usp=sharing",
	},
	{
		category: "Market Understanding",
		title: "Spot nuclear availability dips in the generation mix",
		description:
			"See how visible four years of French nuclear outages are in monthly generation, in one prompt.",
		driveLink: "https://drive.google.com/file/d/1pD9qpikjH_rmDy1OT2pC_bkoiCeXOtDe/view?usp=sharing",
	},
	{
		category: "Asset Management",
		title: "Size the premium for a better optimiser",
		description:
			"Measure what the day's best optimiser earns over a median 2-hour battery on GB's most volatile days.",
		driveLink: "https://drive.google.com/file/d/1QNiYMVc--L37R6IFZQBCceTmbmmvHKaw/view?usp=sharing",
	},
	{
		category: "Market Understanding",
		title: "Check forecasts against market outcomes",
		description:
			"Compare Aurora's India day-ahead price band with IEX clearing prices from Q3 2025 to Q1 2026, in one prompt.",
		driveLink: "https://drive.google.com/file/d/1rjNVKFkplC7WR3p0fUT_6FyiolJoHsZY/view?usp=drive_link",
	},
];

/** Step images are crops of the screenshot in the answers doc — replace
 *  with the originals (sent by email) when they arrive */
export const steps = [
	{
		text: "Follow the simple setup instructions in our MCP documentation.",
		image: "/img/eos-mcp/step-setup-guide.png",
		time: "5 minutes",
	},
	{
		text: "In your AI tool, open Connectors, select EOS MCP, and sign in.",
		image: "/img/eos-mcp/step-connectors.png",
		time: "1 minute",
	},
	{
		text: "Start querying—immediately.",
		image: "/img/eos-mcp/step-start-querying.png",
		time: "Instant",
	},
];

export const practices = [
	{
		index: "01—Invocation",
		title: "Tell your AI assistant when to use EOS MCP",
		description: "Naming the tool up front keeps your assistant grounded in Aurora data instead of guessing from general knowledge.",
		benefit: "keeps answers specific and saves tokens",
		sayLabel: "Say it like this",
		quotes: [
			"“Using Aurora's data…”",
			"You can invoke single tools too: “Using the Aurora content tools only, comment on battery profitability under the Central scenario.”",
		],
	},
	{
		index: "02—Assign the whole task",
		title: "Don't stop at a single question",
		description: "Specify the analysis, markets, comparisons, sources, and final format in one go—let the assistant chain the steps.",
		benefit: "complex analysis becomes one structured workflow, compressing days of work into minutes",
		sayLabel: "One prompt, a full IC report",
		quotes: [
			"“Latest flex scenarios, seven markets in one confidential HTML report, each benchmarked against GB, with web research on grid connection status folded into a ‘probability of success’ metric.”",
		],
		note: "Your tool choice shows here: Claude runs the prompt step by step end-to-end, where some assistants stall partway and ask which scenario to use.",
	},
	{
		index: "03—Skills",
		title: "Save your preferred workflows as skills",
		description: "Turn a prompt you've refined into a reusable prompt file (skill.md) so the same analysis runs the same way every time.",
		benefit: "reproducible results, fewer tokens",
		sayLabel: "From one-off to quarterly",
		quotes: [
			"You build a “What happened last quarter to batteries across six European markets” newsletter with Claude and EOS MCP, iterating until structure, detail, citations and tone are right.",
		],
		note: "Save it as a skill—the same report lands every quarter, without rebuilding the prompt.",
	},
];

export const faqs = [
	{
		question: "Is EOS MCP included in my subscription?",
		answer: "Yes. EOS MCP is included with your subscription and does not require an additional add-on.",
	},
	{
		question: "Which AI tools can connect to EOS MCP?",
		answer: "Any AI application, including in-house solutions, can connect if it supports MCP and Dynamic Client Registration.",
	},
	{
		question: "What's the difference between using an AI assistant directly and using EOS MCP?",
		answer: "EOS MCP enables your AI assistant to access Aurora data and analytics directly within your workflow.",
	},
	{
		question: "How does EOS MCP find the right data?",
		answer: "EOS MCP automatically selects relevant datasets, or you can specify a dataset directly in your prompt.",
	},
	{
		question: "Can I ask my AI to combine information from EOS MCP with my other data sources such as SharePoint documents, other MCPs, and internet search?",
		answer: "Yes. An agentic AI such as Claude and ChatGPT is able to orchestrate workflows between multiple MCP connectors and data sources. EOS MCP enables you to bring Aurora into your professional context without switching between browser tabs.",
	},
	{
		question: "Which markets and datasets are available?",
		answer: "EOS MCP provides access to the products, datasets and geographies included in your subscription.",
	},
	{
		question: "Can EOS MCP link me to the source data and reports?",
		answer: "Yes. EOS MCP can provide direct links to the underlying reports and datasets.",
	},
	{
		question: "Are prompts shared with Aurora?",
		answer: "No. Aurora does not see your prompts; we only see MCP tool calls and the parameters passed to those tools.",
	},
	{
		question: "Does EOS MCP reduce token usage?",
		answer: "Typically, yes. EOS MCP retrieves only the information needed for a task, rather than processing large volumes of files.",
	},
	{
		question: "Where can I find MCP skills?",
		answer: "Skills and installation instructions are available in the EOS MCP documentation.",
	},
];

export const eosMcpResources = {
	buttons: {
		connectButtonText: "Connect EOS MCP",
		connectUrl: eosMcpConnectUrl,
		demoButtonText: "Book a demo",
		demoUrl: eosMcpDemoUrl,
	},
	banner: {
		title: "AI-Powered Energy Workflows",
		description: "Learn, explore and get more from AI with EOS MCP.",
	},
	intelligenceLayer: {
		kicker: "",
		title: "The new intelligence layer",
		content:
			"<p>AI is rapidly becoming the primary way clients access intelligence and insights. At Aurora, we've invested heavily in that future, building APIs, EOS AI and Aurora EOS MCP with support from more than 100 specialists across data, engineering, modelling and product teams.</p>\n<p><strong>Our goal is simple: bring Aurora's intelligence directly into the tools clients use every day.</strong></p>",
		stats,
		highlightText:
			"As the energy industry enters a new intelligence era, EOS MCP extends Aurora's intelligence beyond the EOS platform, enabling seamless integration with AI-driven research and analysis workflows.",
	},
	whatIsMcp: {
		kicker: "What is an MCP?",
		definition:
			"MCP stands for <strong>Model Context Protocol</strong>—an open standard that lets AI models query live, structured data sources in real time, without manual data export.",
		description:
			"In practice, EOS MCP delivers Aurora's market intelligence directly into tools such as ChatGPT and Claude, so users can access trusted data and insights wherever analysis happens.",
		doesTitle: "What EOS MCP does",
		does: mcpDoes,
		doesntTitle: "What EOS MCP doesn't do",
		doesnt: mcpDoesnt,
	},
	useCases: {
		kicker: "Use cases",
		title: "See EOS MCP in action",
		description:
			"Short walkthroughs of real prompts, run against real Aurora data—no reformatting, no manual lookups.",
		filters: videoFilters,
		videos,
	},
	gettingStarted: {
		kicker: "Getting started",
		title: "Three steps to get up and running",
		buttonText: "Get started today",
		steps,
	},
	bestPractices: {
		kicker: "Best practices",
		title: "Tips for effective use of EOS MCP",
		items: practices,
	},
	faqs: {
		kicker: "FAQs",
		title: "Frequently asked questions",
		items: faqs,
	},
	finalCta: {
		title: "Ready to get started?",
		description:
			"Follow the simple setup instructions in our MCP documentation and connect your first AI tool in minutes.",
	},
};
