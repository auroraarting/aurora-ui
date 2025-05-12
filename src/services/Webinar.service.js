import GraphQLAPI from "./Graphql.service";

/** Fetch Webinar  Page */
export const getWebinarPage = async () => {
	const query = `
query GetWebinarListing {
  page(id: "webinar-listing", idType: URI) {
    webinarsListing {
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
