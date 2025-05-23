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
        iframe
        videoThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      featured(first: 9999) {
        nodes {
          ... on Podcast {
            title
      slug
      date
      content
      podcastFields {
        time
        date
        country(first: 9999) {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
      }
      featuredImage {
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
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Insights  Page Social Link */
export const getEnergyTalksPageSocialLinks = async () => {
	const query = `
query GetSocialLinks {
  page(id: "energy-talks-listing", idType: URI) {
    energyTalksListing {
      socialLinks {
        url
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};
