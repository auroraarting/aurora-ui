/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import EosMcpResourcesWrap from "@/sections/eos-mcp/EosMcpResourcesWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //

// Static like /eos-mcp — there is no CMS page behind it
export const metadata = {
	title: "AI-Powered Energy Workflows with EOS MCP | Aurora Energy Research",
	description:
		"Learn what EOS MCP is, see it in action, and get set up in minutes: use cases, best practices and FAQs for bringing Aurora's intelligence into ChatGPT, Claude and other AI tools.",
	alternates: {
		canonical: "https://auroraer.com/resources/eos-mcp",
	},
	openGraph: {
		images: [
			{
				url: "https://auroraer.com/img/og-image.jpg",
			},
		],
	},
};

/** EOS MCP Resources Page */
export default function EosMcpResourcesPage() {
	return <EosMcpResourcesWrap />;
}
