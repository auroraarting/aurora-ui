import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getLifeAtAurora = async (slug) => {
	const query = `
query MyQuery {
  page(id: "life-at-aurora", idType: URI) {
    lifeAtAurora {
      banner {
        title
        description
        videoLink
        dekstopimage {
          node {
            altText
            mediaItemUrl
          }
        }
        mobileimage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      keyAdvantages {
        title
        description
        tabTitle
        buttonLink
        buttonText
        accordian {
          title
          description
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      stats {
        auroreans
        nationalities
      }
      globalMap {
        marqueetext
      }
      collaborationSupport {
        list {
          description
          name
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      insights {
        sectionDesc
        sectionTitle
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
      teamAurora {
        teams {
          content
          designation
          name
          image {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
    slug
  }
  offices {
    nodes {
      offices {
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        map {
          lat
          lng
          mapUrl
        }
      }
      title
      slug
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
