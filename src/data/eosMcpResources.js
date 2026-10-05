/** Static content for the EOS MCP resources page (/resources/eos-mcp),
 *  ported from "EOS MCP - Resources.html". */

export const stats = [
	{
		num: "100+",
		label: "specialists across data, engineering, modelling and product building AI-powered analytics",
	},
	{
		num: "70%",
		label: "Estimated share of Aurora clients with access to agentic AI by H1 2027",
	},
	{
		num: "22k",
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
		thumb: "/img/eos-mcp/video-bess-markets.png",
		duration: "4:12",
		category: "Market Understanding",
		title: "Prioritise the most attractive European BESS markets",
		desc: "Compare six markets on revenue potential, fundamentals and policy, in one prompt.",
	},
	{
		thumb: "/img/eos-mcp/video-forecast-assumptions.png",
		duration: "3:48",
		category: "Best Practices",
		title: "Trace forecast assumptions back to the source",
		desc: "See how EOS MCP surfaces the analysis behind Aurora's Central scenario.",
	},
	{
		thumb: "/img/eos-mcp/video-repower.png",
		duration: "5:03",
		category: "Project Siting",
		title: "Decide what to build, rebuild, or repower",
		desc: "Compare technology options for an existing project site, end to end.",
	},
	{
		thumb: "/img/eos-mcp/video-battery-benchmark.png",
		duration: "4:35",
		category: "Asset Management",
		title: "Benchmark battery performance",
		desc: "Compare modelled vs. fleet revenues and update the outlook to 2035.",
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
		desc: "Naming the tool up front keeps your assistant grounded in Aurora data instead of guessing from general knowledge.",
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
		desc: "Specify the analysis, markets, comparisons, sources, and final format in one go—let the assistant chain the steps.",
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
		desc: "Turn a prompt you've refined into a reusable prompt file (skill.md) so the same analysis runs the same way every time.",
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
		q: "Is EOS MCP included in my subscription?",
		a: "Yes. EOS MCP is included with your subscription and does not require an additional add-on.",
	},
	{
		q: "Which AI tools can connect to EOS MCP?",
		a: "Any AI application, including in-house solutions, can connect if it supports MCP and Dynamic Client Registration.",
	},
	{
		q: "What's the difference between using an AI assistant directly and using EOS MCP?",
		a: "EOS MCP enables your AI assistant to access Aurora data and analytics directly within your workflow.",
	},
	{
		q: "How does EOS MCP find the right data?",
		a: "EOS MCP automatically selects relevant datasets, or you can specify a dataset directly in your prompt.",
	},
	{
		q: "Can I ask my AI to combine information from EOS MCP with my other data sources such as SharePoint documents, other MCPs, and internet search?",
		a: "Yes. An agentic AI such as Claude and ChatGPT is able to orchestrate workflows between multiple MCP connectors and data sources. EOS MCP enables you to bring Aurora into your professional context without switching between browser tabs.",
	},
	{
		q: "Which markets and datasets are available?",
		a: "EOS MCP provides access to the products, datasets and geographies included in your subscription.",
	},
	{
		q: "Can EOS MCP link me to the source data and reports?",
		a: "Yes. EOS MCP can provide direct links to the underlying reports and datasets.",
	},
	{
		q: "Are prompts shared with Aurora?",
		a: "No. Aurora does not see your prompts; we only see MCP tool calls and the parameters passed to those tools.",
	},
	{
		q: "Does EOS MCP reduce token usage?",
		a: "Typically, yes. EOS MCP retrieves only the information needed for a task, rather than processing large volumes of files.",
	},
	{
		q: "Where can I find MCP skills?",
		a: "Skills and installation instructions are available in the EOS MCP documentation.",
	},
];
