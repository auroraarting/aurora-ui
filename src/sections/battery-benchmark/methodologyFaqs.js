// "Common questions" for the Battery Benchmark methodology panel.
//
// These are the same for every market, so they are not part of a market's
// methodology and are not editable per region in the CMS. They live here rather
// than in a field group by decision — changing them needs a deploy.
//
// Answers are HTML strings so they render through ContentFromCms, the same path
// CMS copy takes, rather than needing JSX.
const methodologyFaqs = [
	{
		question: "Is the benchmark free?",
		answer:
			"Yes - the headline index is published openly. Asset-level data and custom modelling sit in <b>Flexplorer</b> on EOS.",
	},
	{
		question: "Modelled or observed?",
		answer:
			"Modelled. Chronos simulates dispatch against observed monthly prices, so revenues are a modelled measure of what a battery could have earned - not metered output.",
	},
	{
		question: "How often is it refreshed?",
		answer:
			"Monthly, once the previous month's prices are final. See <b>Governance &amp; updates</b> for the review and versioning cycle.",
	},
	{
		question: "Which durations are shown?",
		answer:
			"1-hour, 2-hour and 4-hour reference assets, matching the duration cohorts in the chart's duration toggles.",
	},
	{
		question: "Can I personalise the benchmark to fit my asset?",
		answer:
			"Yes &mdash; the benchmark can be customised to your specific asset, so you can see exactly how it would have performed across different markets. For more information, please contact your Aurora account manager.",
	},
];

export default methodologyFaqs;
