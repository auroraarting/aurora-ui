import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getLifeAtAurora = async (slug) => {
	const query = `
query MyQuery {
  page(id: "life-at-aurora", idType: URI) {
    slug
    lifeAtAurora {
      banner {
        title
        description
        videoLink
        buttonText
        buttonLink
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
      benefits {
        sectionTitle
        list {
          desc
          title
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      middleSectionButton {
        buttonText
        iframe
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      topSectionButton {
        buttonText
        iframe
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
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
