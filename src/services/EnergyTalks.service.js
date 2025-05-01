import GraphQLAPI from "./Graphql.service";

/** Fetch Insights  Page */
export const getEnergyTalksPage = async () => {
	const query = `
query GetWebinarListing {
  page(id: "energy-talks-listing", idType: URI) {
    energyTalksListing {
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
