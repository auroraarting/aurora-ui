import GraphQLAPI from "./Graphql.service";

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
	const res = await GraphQLAPI(query, { apiID: "common", pageID: "/common" });
	return res;
};
