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
              mediaItemUrl
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
              testimonials {
                designation
              }
              title
            }
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
      stats {
        count
        title
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
              mediaItemUrl
            }
          }
          gradient {
            from
            to
          }
          logo {
            node {
              altText
              mediaItemUrl
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
                mediaItemUrl
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
