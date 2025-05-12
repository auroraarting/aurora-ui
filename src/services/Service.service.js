import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getServiceData = async (slug) => {
	const query = `
query GetProductBySlug {
  serviceBy(slug: "${slug}") {
    title
    slug
    services {
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
          }
        }
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      caseStudy {
        tabTitle
        title
        selectCaseStudies(first: 999) {
          nodes {
            ... on CaseStudy {
              id
              content
              title
              slug
              date
              caseStudies {
                selectLocation(first: 999) {
                  nodes {
                    ... on Country {
                      id
                      title
                      slug
                    }
                  }
                }
                readTime
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
      customerSuccess {
        sectionTitle
        tabTitle
        customerSuccessRow {
          description
          title
          icon {
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
        description
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
      subscribeSectionButton {
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
