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
import { getEosMcpResourcesPage } from "@/services/EosMcp.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata — Yoast SEO from the CMS page, or this copy until it exists */
export async function generateMetadata() {
	const meta = await getPageSeo(
		'page(id: "eos-mcp/ai-powered-energy-workflows", idType: URI)',
	);
	const seo = meta?.data?.page?.seo;

	return {
		title:
			seo?.title ||
			"AI-Powered Energy Workflows with EOS MCP | Aurora Energy Research",
		description:
			seo?.metaDesc ||
			"Learn what EOS MCP is, see it in action, and get set up in minutes: use cases, best practices and FAQs for bringing Aurora's intelligence into ChatGPT, Claude and other AI tools.",
		keywords: seo?.metaKeywords || "",
		alternates: {
			canonical: "https://auroraer.com/eos-mcp/ai-powered-energy-workflows",
		},
		openGraph: {
			images: [
				{
					url: "https://auroraer.com/img/og-image.jpg",
				},
			],
		},
	};
}

/** EOS MCP Resources Page */
export default async function EosMcpResourcesPage() {
	const data = await getEosMcpResourcesPage();

	return <EosMcpResourcesWrap data={data} />;
}
