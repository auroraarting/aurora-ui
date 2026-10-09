/* eslint-disable quotes */
import GraphQLAPI from "./Graphql.service";

// DATA //
import { eosMcpProducts } from "@/data/eosMcp";
import { eosMcpResources } from "@/data/eosMcpResources";

// Field groups "EOS MCP - Products" / "EOS MCP - Resources" (exports in cms/).
// Until a page exists in the CMS, or while a field is empty, the page falls back
// to the copy in src/data — so the response is normalised here, field by field,
// rather than read straight off `data.page`.

const image = `node { altText mediaItemUrl }`;
const buttons = `buttons { connectButtonText connectUrl demoButtonText demoUrl }`;

/** Whether a CMS value should win over the default. */
const filled = (val) =>
	val !== null &&
	val !== undefined &&
	val !== "" &&
	!(Array.isArray(val) && !val.length);

/** CMS group over its defaults: each non-empty CMS field wins. */
const withDefaults = (cms, defaults) => {
	const out = { ...defaults };
	for (const [key, val] of Object.entries(cms || {})) {
		if (filled(val)) out[key] = val;
	}
	return out;
};

/** Image field -> URL, or undefined so the section uses its bundled image. */
const imageUrl = (val) => val?.node?.mediaItemUrl || undefined;

/** One-column repeater -> list of strings. */
const strings = (rows, key) => rows?.map((row) => row?.[key]).filter(Boolean);

/** Select fields can arrive as a one-item list, depending on the ACF plugin. */
const selectValue = (val) => (Array.isArray(val) ? val[0] : val);

/** Fetch "EOS MCP - Products" (/eos-mcp) */
export const getEosMcpProductsPage = async () => {
	const query = `
query EosMcpProductsPage {
  page(id: "eos-mcp-products", idType: URI) {
    eosMcpProducts {
      ${buttons}
      banner {
        logo { ${image} }
        title
        description
        availabilityNote
        image { ${image} }
      }
      overview { kicker title description demoQuestion demoLabel }
      keyAdvantages {
        kicker
        items { icon title description }
      }
      lifecycle {
        kicker
        title
        description
        pointsLabel
        stages {
          icon
          title
          question
          points { point }
        }
      }
      closingCta { title description }
      resources {
        kicker
        title
        viewAllText
        viewAllUrl
        cards { title ctaText url }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: "page:eos-mcp",
		pageID: "eos-mcp",
	});
	return toEosMcpProducts(res);
};

/** Products response -> the shape of `eosMcpProducts` in src/data/eosMcp.js */
function toEosMcpProducts(res) {
	const cms = res?.data?.page?.eosMcpProducts || {};
	const d = eosMcpProducts;

	return {
		buttons: withDefaults(cms.buttons, d.buttons),
		banner: withDefaults(
			{
				...cms.banner,
				logo: imageUrl(cms.banner?.logo),
				image: imageUrl(cms.banner?.image),
			},
			d.banner,
		),
		overview: withDefaults(cms.overview, d.overview),
		keyAdvantages: withDefaults(
			{
				...cms.keyAdvantages,
				items: cms.keyAdvantages?.items?.map((item) => ({
					...item,
					icon: selectValue(item.icon),
				})),
			},
			d.keyAdvantages,
		),
		lifecycle: withDefaults(
			{
				...cms.lifecycle,
				stages: cms.lifecycle?.stages?.map((stage) => ({
					...stage,
					icon: selectValue(stage.icon),
					points: strings(stage.points, "point") || [],
				})),
			},
			d.lifecycle,
		),
		closingCta: withDefaults(cms.closingCta, d.closingCta),
		resources: withDefaults(cms.resources, d.resources),
	};
}

/** Fetch "EOS MCP - Resources" (/eos-mcp/ai-powered-energy-workflows) */
export const getEosMcpResourcesPage = async () => {
	const query = `
query EosMcpResourcesPage {
  page(id: "eos-mcp-resources", idType: URI) {
    eosMcpResources {
      ${buttons}
      banner {
        title
        description
        image { ${image} }
      }
      intelligenceLayer {
        kicker
        title
        content
        stats { number label }
        highlightText
        logo { ${image} }
      }
      whatIsMcp {
        kicker
        definition
        description
        diagram { ${image} }
        doesTitle
        does { text }
        doesntTitle
        doesnt { text }
      }
      useCases {
        kicker
        title
        description
        filters { name }
        videos {
          title
          description
          category
          duration
          thumbnail { ${image} }
          vimeoId
		  driveLink
        }
      }
      gettingStarted {
        kicker
        title
        buttonText
        steps {
          text
          image { ${image} }
          time
        }
      }
      bestPractices {
        kicker
        title
        items {
          index
          title
          description
          benefit
          sayLabel
          quotes { quote }
          note
        }
      }
      faqs {
        kicker
        title
        items { question answer }
      }
      finalCta { title description }
    }
  }
}
    `;
	// The page's slug is "eos-mcp" (under Resources), so a save flushes the
	// same entry tag as the products page
	const res = await GraphQLAPI(query, {
		apiID: "page",
		tag: "page:eos-mcp",
		pageID: "eos-mcp/ai-powered-energy-workflows",
	});
	return toEosMcpResources(res);
};

/** Resources response -> the shape of `eosMcpResources` in src/data/eosMcpResources.js */
function toEosMcpResources(res) {
	const cms = res?.data?.page?.eosMcpResources || {};
	const d = eosMcpResources;

	return {
		buttons: withDefaults(cms.buttons, d.buttons),
		banner: withDefaults(
			{ ...cms.banner, image: imageUrl(cms.banner?.image) },
			d.banner,
		),
		intelligenceLayer: withDefaults(
			{ ...cms.intelligenceLayer, logo: imageUrl(cms.intelligenceLayer?.logo) },
			d.intelligenceLayer,
		),
		whatIsMcp: withDefaults(
			{
				...cms.whatIsMcp,
				diagram: imageUrl(cms.whatIsMcp?.diagram),
				does: strings(cms.whatIsMcp?.does, "text"),
				doesnt: strings(cms.whatIsMcp?.doesnt, "text"),
			},
			d.whatIsMcp,
		),
		useCases: withDefaults(
			{
				...cms.useCases,
				filters: strings(cms.useCases?.filters, "name"),
				videos: cms.useCases?.videos?.map((video) => ({
					...video,
					thumbnail: imageUrl(video.thumbnail),
				})),
			},
			d.useCases,
		),
		gettingStarted: withDefaults(
			{
				...cms.gettingStarted,
				steps: cms.gettingStarted?.steps?.map((step) => ({
					...step,
					image: imageUrl(step.image),
				})),
			},
			d.gettingStarted,
		),
		bestPractices: withDefaults(
			{
				...cms.bestPractices,
				items: cms.bestPractices?.items?.map((item) => ({
					...item,
					quotes: strings(item.quotes, "quote") || [],
				})),
			},
			d.bestPractices,
		),
		faqs: withDefaults(cms.faqs, d.faqs),
		finalCta: withDefaults(cms.finalCta, d.finalCta),
	};
}
