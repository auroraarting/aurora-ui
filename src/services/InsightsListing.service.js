import GraphQLAPI from "./Graphql.service";

/** Fetch Insights  Page */
export const getInsightsPage = async () => {
	const query = `
query GetWebinarListing {
  page(id: "insight-listing", idType: URI) {
    insightsListing {
      banner {
        desc
        title
      }
      video {
        redirectLink
        sectionDesc
        videoLink
        sectionTitle
        iframe
        videoThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      insights {
        desc
        title
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
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
