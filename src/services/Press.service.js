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
            sourceUrl
          }
        }
      }
      topSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      middleSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            sourceUrl
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
            sourceUrl
          }
        }
      }
      downSectionButton {
        iframe
        buttonText
        file {
          node {
            altText
            sourceUrl
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
        sourceUrl
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
              sourceUrl
            }
          }
        }
        topSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              sourceUrl
            }
          }
        }
        middleSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              sourceUrl
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
              sourceUrl
            }
          }
        }
        downSectionButton {
          iframe
          buttonText
          file {
            node {
              altText
              sourceUrl
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
          sourceUrl
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
              sourceUrl
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
                        sourceUrl
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
                        sourceUrl
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
                        sourceUrl
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
          sourceUrl
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
            sourceUrl
          }
        }
        brief {
          node {
            altText
            sourceUrl
          }
        }
        thumbnail {
          node {
            altText
            sourceUrl
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
                      sourceUrl
                    }
                  }
                }
                articles {
                  articlesby {
                    nodes {
                      ... on CaseStudy {
                        id
                        content
                        title
                        slug
                        date
                        featuredImage {
                          node {
                            altText
                            sourceUrl
                          }
                        }
                        caseStudies {
                          readTime
                          selectLocation {
                            nodes {
                              ... on Country {
                                id
                                title
                                slug
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                file {
                  node {
                    sourceUrl
                    altText
                  }
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
