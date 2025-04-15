import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleHowWeHelp = async (slug) => {
	const query = `
        query GetSingleHowWeHelp {
  howwehelpBy(slug: "${slug}") {
    title
    slug
    howWeHelpInside {
      banner {
        fieldGroupName
        description
      }
      thumbnail {
        shortDescription
        banner {
          node {
            altText
            sourceUrl
          }
        }
        gradient {
          from
          to
        }
        logo {
          node {
            altText
            sourceUrl
          }
        }
      }
      ourClient {
        title
        tabTitle
        selectLogo {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
        testimonials {
          nodes {
            ... on Testimonial {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      }
      keyAdvantages {
        tabTitle
        title
        description
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      availableRegions {
        marqueeText
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getHowWeHelps = async () => {
	const query = `
query GetAllHowWeHelps {
  howWeHelps {
    nodes {
      howWeHelpInside {
        banner {
        fieldGroupName
        description
      }
      thumbnail {
        shortDescription
        banner {
          node {
            altText
            sourceUrl
          }
        }
        gradient {
          from
          to
        }
        logo {
          node {
            altText
            sourceUrl
          }
        }
      }
      ourClient {
        title
        tabTitle
        selectLogo {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
        testimonials {
          nodes {
            ... on Testimonial {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
      }
      keyAdvantages {
        tabTitle
        title
        description
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      availableRegions {
        marqueeText
      }
      }
    }
  }
}
      `;
	const res = await GraphQLAPI(query);
	return res;
};
