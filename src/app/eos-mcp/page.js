/* eslint-disable quotes */
// MODULES //

// COMPONENTS //

// SECTIONS //
import EosMcpWrap from "@/sections/eos-mcp/EosMcpWrap";

// PLUGINS //

// UTILS //

// STYLES //

// IMAGES //

// DATA //

// SERVICES //

// No "eos-mcp" page exists in the CMS yet, so the SEO is static too
export const metadata = {
	title: "EOS MCP | Aurora Energy Research",
	description:
		"Bring Aurora's trusted energy market intelligence into AI tools like ChatGPT and Claude with EOS MCP, available to all Aurora subscribers.",
	alternates: {
		canonical: "https://auroraer.com/eos-mcp",
	},
	openGraph: {
		images: [
			{
				url: "https://auroraer.com/img/og-image.jpg",
			},
		],
	},
};

/** EOS MCP Page */
export default function EosMcpPage() {
	return <EosMcpWrap />;
}
