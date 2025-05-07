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
            sourceUrl
          }
        }
        logo {
          node {
            sourceUrl
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
      availableRegions {
        marqueeText
        tabTitle
      }
      banner {
        logo {
          node {
            altText
            sourceUrl
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
                  sourceUrl
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
              sourceUrl
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
              sourceUrl
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
            sourceUrl
          }
        }
        lottie{
          node {
            altText
            sourceUrl
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
              sourceUrl
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
              sourceUrl
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
