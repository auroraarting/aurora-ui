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
import { getEosMcpProductsPage } from "@/services/EosMcp.service";
import { getPageSeo } from "@/services/Seo.service";

/** generateMetadata — Yoast SEO from the CMS page, or this copy until it exists */
export async function generateMetadata() {
	const meta = await getPageSeo('page(id: "eos-mcp", idType: URI)');
	const seo = meta?.data?.page?.seo;

	return {
		title: seo?.title || "EOS MCP | Aurora Energy Research",
		description:
			seo?.metaDesc ||
			"Bring Aurora's trusted energy market intelligence into AI tools like ChatGPT and Claude with EOS MCP, available to all Aurora subscribers.",
		keywords: seo?.metaKeywords || "",
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
}

/** EOS MCP Page */
export default async function EosMcpPage() {
	const data = await getEosMcpProductsPage();

	return <EosMcpWrap data={data} />;
}
