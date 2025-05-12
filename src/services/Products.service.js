import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getProductPage = async (slug) => {
	const query = `
query GetPageProduct {
  page(id: "product", idType: URI) {
    title
    slug
    productLanding {
      banner {
        title
        description
      }
      mapMarquee
      keyAdvantages {
        title
        tabTitle
        description
        advantages {
          title
          description
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  products(first: 999) {
    nodes {
      title
      slug
      products {
        thumbnail {
          banner {
            node {
              altText
              mediaItemUrl
            }
          }
          logo {
            node {
              mediaItemUrl
              altText
            }
          }
          gradient {
            from
            to
          }
          shortDescription
        }
        ourClient {
          selectLogos(first: 999) {
            nodes {
              ... on ClientsLogo {
                id
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
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
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getProductBySlug = async (slug) => {
	const query = `
query GetProductBySlug {
  productBy(slug: "${slug}") {
    title
    slug
    products {
      thumbnail {
        banner {
          node {
            altText
            mediaItemUrl
          }
        }
        logo {
          node {
            mediaItemUrl
            altText
          }
        }
        gradient {
          from
          to
        }
        shortDescription
      }
      ourClient {
        selectLogos {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
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
      availableRegions {
        marqueeText
        tabTitle
      }
      banner {
        logo {
          node {
            altText
            mediaItemUrl
          }
        }
        buttonText
        buttonLink
        description
        title
        vimeoLink
        desktopThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      middleSectionButton {
        buttonText
        iframe
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
        file {
          node {
            altText
            mediaItemUrl
          }
        }
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
      caseStudy {
        tabTitle
        title
        selectCaseStudies {
          nodes {
            ... on Post {
              id
              title
              slug
              content
              date
              categories(first: 9999) {
                nodes {
                  slug
                  name
                }
              }
              postFields {
                time
              }
            }
          }
        }
      }
      expertSupport {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          description
          title
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      expertise {
        description
        tabTitle
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      introduction {
        description
        tabTitle
        title
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        lottie {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      keyAdvantages {
        desciption
        tabTitle
        title
        buttonLink
        buttonText
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      map {
        marquee
      }
      whyAurora {
        title
        description
        startText
        endText
        endPoint
        list {
          title
          description
          caption
          value
        }
      }
      fourStepProcess {
        buttonLink
        description
        processTitle
        tabTitle
        process {
          image {
            node {
              altText
              mediaItemUrl
            }
          }
          processDetails {
            description
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
