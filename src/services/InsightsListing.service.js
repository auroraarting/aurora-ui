// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

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
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/aurora-insights",
	});
	return res;
};
