import GraphQLAPI from "./Graphql.service";

/** About Page */
export const getAboutPage = async () => {
	const query = `
query GetAbout {
  page(id: "about", idType: URI) {
    about {
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
        mobileThumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      history {
        description
        sectionTitle
        gallery {
          nodes {
            altText
            mediaItemUrl
          }
        }
      }
      leaders {
        sectionDescription
        sectionTitle
        leaders(first: 999) {
          nodes {
            ... on Team {
              id
              title
              slug
              teams {
                thumbnail {
                  designation
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                  linkedinLink
                }
                articles {
                  articlesby {
                    nodes {
                      ... on Post {
                        id
                        title
                        slug
                        featuredImage {
                          node {
                            altText
                            mediaItemUrl
                          }
                        }
                        postFields {
                          time
                        }
                        date
                        categories(first: 9999) {
                          nodes {
                            name
                            slug
                          }
                        }
                      }
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
              content
            }
          }
        }
      }
      map {
        marqueetext
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
              slug
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
      ourEdge {
        description
        sectionTitle
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
      stats {
        auroreans
        nationalities
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
      insights {
        sectionDesc
        sectionTitle
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
  offices {
    nodes {
      offices {
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        map {
          lat
          lng
          mapUrl
        }
      }
      title
      slug
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
