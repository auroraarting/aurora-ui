import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleWhoAreYou = async (slug) => {
	const query = `
 query GetWhoAreYouBySlug {
  whoareyouBy(slug: "${slug}") {
    title
    slug
    whoAreYous {
      banner {
        buttonLink
        description
        title
        vimeoLink
        desktopThumbnail {
          node {
            altText
            sourceUrl
          }
        }
        mobileThumbnail {
          node {
            altText
            sourceUrl
          }
        }
      }
      expertise {
        tabTitle
        title
        description
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
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
      whyAurora {
        description
        end
        endText
        startText
        title
        list {
          caption
          description
          title
          value
        }
      }
      ourClient {
        tabTitle
        title
        selectLogos(first: 999) {
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
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              content
              testimonials {
                designation
              }
              title
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

/** Fetch Page */
export const getWhoAreYous = async () => {
	const query = `
query GetAllHowWeHelps {
  howWeHelps(first: 999) {
    nodes {
      title
      slug
      howWeHelpInside {
        banner {
          title
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
          selectLogos(first: 999) {
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
          testimonials(first: 999) {
            nodes {
              ... on Testimonial {
                id
                content
                title
                testimonials {
                  designation
                }
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
          buttonLink
          buttonText
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
