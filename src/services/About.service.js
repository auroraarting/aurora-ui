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
      history {
        description
        sectionTitle
        gallery {
          nodes {
            altText
            sourceUrl
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
                      sourceUrl
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
                            sourceUrl
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
                  sourceUrl
                }
              }
            }
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
                  sourceUrl
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
              sourceUrl
            }
          }
        }
      }
      stats {
        auroreans
        nationalities
      }
    }
  }
  offices {
    nodes {
      offices {
        thumbnail {
          node {
            altText
            sourceUrl
          }
        }
        map {
          lat
          lng
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
