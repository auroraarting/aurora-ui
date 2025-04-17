import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getEosPage = async (slug) => {
	const query = `
query EOSPage {
  pageBy(id: "eos") {
    eos {
      banner {
        buttonLink
        buttonText
        description
        title
        vimeoLink
        desktopThumbnail {
          node {
            altText
            sourceUrl
          }
        }
        logo {
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
        description
        title
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
      keyAdvantages {
        description
        title
        advantages {
          advantagesDescription
          advantagesTitle
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      map {
        marquee
      }
      ourClient {
        title
        selectLogos {
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
              content
              title
              testimonials {
                designation
              }
            }
          }
        }
      }
      trustedModels {
        sectionTitle
        sectionDescription
        list {
          title
          description
          category {
            nodes {
              ... on Services {
                id
                title
                slug
                contentType {
                  node {
                    name
                  }
                }
              }
              ... on Software {
                id
                title
                slug
                contentType {
                  node {
                    name
                  }
                }
              }
              ... on Product {
                id
                title
                slug
                contentType {
                  node {
                    name
                  }
                }
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
