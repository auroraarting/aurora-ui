import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSinglePress = async (slug) => {
	const query = `
query GetPresses {
  pressBy(slug: "${slug}") {
    content
    title
    slug
    presses {
      banner {
        date
        time
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      topSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      middleSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      tags {
        text
      }
      highlights {
        title
        designation
        content
      }
      mediaContact {
        email
        designation
        name
        phone
      }
      about {
        content
        sectionTitle
      }
      insightsSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      downSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      insights {
        insightsTitle
        sectionDesc
        sectionTitle
      }
    }
    language {
      code
      id
      native_name
    }
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getPresses = async () => {
	const query = `
query GetPresses {
  presses(first: 99999) {
    nodes {
      content
      title
      slug
      presses {
        banner {
          date
          time
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        topSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        middleSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        tags {
          text
        }
        highlights {
          title
          designation
          content
        }
        mediaContact {
          email
          designation
          name
          phone
        }
        about {
          content
          sectionTitle
        }
        insightsSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        downSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      language {
        code
        id
        native_name
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
      `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getPressesCards = async (filters = "first: 9999") => {
	const query = `
query GetPressesCards {
  presses(${filters}) {
    nodes {
      title
      slug
      presses {
        banner {
          date
          time
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
             tags {
          text
        }
        thumbnail{
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
                        mediaItemUrl
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
                        mediaItemUrl
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
                        mediaItemUrl
                      }
                    }
                  }
                }
              }
        }
      }
        }
      }
      language {
        code
        id
        native_name
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
      `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getPressesLanguages = async () => {
	const query = `
query GetPressesLanguages {
  languages {
    code
    id
    default_locale
    native_name
  }
}
      `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getPressPage = async () => {
	const query = `
query GetPressMediaKit {
  page(id: "press-landing", idType: URI) {
    pressLanding {
      banner {
        desc
        title
      }
      mediaKit {
        desc
        title
        logos {
          node {
            altText
            mediaItemUrl
          }
        }
        brief {
          node {
            altText
            mediaItemUrl
          }
        }
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      leaders {
        sectionTitle
        sectionDesc
        leaders {
          nodes {
            ... on Team {
              id
              content
              title
              slug
              teams {
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
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
                file {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }
        }
      }
      featured {
        nodes {
          ... on Post {
            id
            title
            slug
            postFields {
              time
            }
            date
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
  }
}
      `;
	const res = await GraphQLAPI(query);
	return res;
};
