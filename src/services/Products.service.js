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
      insights {
        sectionDesc
        sectionTitle
      }
      insightsSectionButton {
        buttonText
        iframe
        url
        file {
          node {
            mediaItemUrl
            altText
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
          title
          shortDescription
          spotlightTitle
          spotlightDesc
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
countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
    }
  }
  productBy(slug: "${decodeURIComponent(slug)}") {
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
        primaryColor
        title
        shortDescription
        spotlightTitle
        spotlightDesc
      }
      ourClient {
        selectLogos(first: 9999) {
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
        testimonials(first: 9999) {
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
      insightsSectionButton {
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
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
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
        headerLogo {
          node {
            altText
            mediaItemUrl
          }
        }
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
      insights {
        sectionDesc
        sectionTitle
        list(first: 999) {
          nodes {
            ... on Post {
              id
              date
              title
              slug
              categories(first: 999) {
                nodes {
                  name
                  slug
                }
              }
              postFields {
                time
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
