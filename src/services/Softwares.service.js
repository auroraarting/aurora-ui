import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleSoftware = async (slug) => {
	const query = `
query GetProductBySlug {
countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
    }
  }
  softwareBy(slug: "${slug}") {
    title
    slug
    softwares {
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
            mediaItemUrl
          }
        }
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
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
      expertSupport {
        sectionTitle
        image {
          node {
            altText
            mediaItemUrl
          }
        }
        list {
          title
          description
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
            mediaItemUrl
          }
        }
        lottie {
          node {
            altText
            mediaItemUrl
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
            video {
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
      stepsSectionButton {
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
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getSoftwarePage = async (slug) => {
	const query = `
query GetPageSoftwares {
  page(id: "software", idType: URI) {
    title
    slug
    softwareLanding {
      banner {
        title
        description
      }
      mapMarquee
      keyAdvantages {
        title
        tabTitle
        description
        buttonLink
        buttonText
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
      inisghtsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    }
  }
  softwares(first: 999) {
    nodes {
      title
      slug
      softwares {
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
