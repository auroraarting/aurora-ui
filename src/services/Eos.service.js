import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getEosPage = async () => {
	const query = `
query EOSPage {
  page(id: "eos", idType: URI) {
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
        buttonLink
        buttonText
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
          category(first: 999) {
            nodes {
              contentType {
                node {
                  name
                }
              }
              ... on Service {
                id
                slug
                title
                content
                services {
                  map {
                    logo {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
              ... on Software {
                id
                title
                slug
                content
                softwares {
                  map {
                    logo {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
              ... on Product {
                id
                title
                slug
                content
                products {
                  map {
                    logo {
                      node {
                        altText
                        sourceUrl
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      bundles {
        desc
        title
      }
      topSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      middleSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
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
