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
            mediaItemUrl
          }
        }
        logo {
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
              mediaItemUrl
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
      introduction {
        description
        sectionTitle
      }
        insights {
        sectionTitle
        sectionDesc
      }
      stats {
        count
        title
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, { apiID: "page", pageID: "eos" });
	return res;
};
