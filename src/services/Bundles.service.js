// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/** Bundles Section */
export const getBundlesSection = async () => {
	const query = `
query BundlesPage {
  page(id: "bundles", idType: URI) {
    bundles {
      bundleTabs {
        tabName
        list {
          bgColor
          designAndOptimisation
          financingMA
          investmentAnalysis
          logoText
          ongoingValuation
          portfolioManagementPpas
          projectSiting
          strategyPlanning
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      tabs {
        tabName
        list {
          bgColor
          designAndOptimisation
          financingMA
          investmentAnalysis
          logoText
          ongoingValuation
          portfolioManagementPpas
          projectSiting
          strategyPlanning
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, { apiID: "page", pageID: "/page" });
	return res;
};
