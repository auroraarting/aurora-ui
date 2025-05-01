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
        videoThumbnail {
          node {
            altText
            sourceUrl
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
