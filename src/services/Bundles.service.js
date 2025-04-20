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
              sourceUrl
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
              sourceUrl
            }
          }
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
