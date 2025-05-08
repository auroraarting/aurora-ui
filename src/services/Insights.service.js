import GraphQLAPI from "./Graphql.service";

/** Insights Page */
export const getInsights = async (filterString = "first:9999") => {
	const query = `
query GetInsights {
  posts(${filterString}) {
    nodes {
      title
      slug
      date
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
      language {
        id
        code
        language_code
        native_name
      }
      tags(first: 9999) {
        nodes {
          name
          slug
        }
      }
      postFields {
        speakers {
          nodes {
            ... on PostSpeaker {
              id
              title
              slug
              postSpeakers {
                sessions {
                  address
                  time
                  timeSlot
                  title
                }
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
              }
              content
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

/** Insights Page */
export const getInsightsPath = async () => {
	const query = `
query GetInsights {
  posts(first:9999) {
    nodes {
      title
      slug
      date
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** getInsights Categories  */
export const getInsightsCategories = async () => {
	const query = `
query GetInsightsDropDowns {
  tags(first: 9999) {
    nodes {
      name
      slug
    }
  }
  categories(first: 9999) {
    nodes {
      name
      slug
    }
  }
 countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
    }
  }
  products(first: 9999) {
    nodes {
      title
      slug
    }
  }
  softwares(first: 9999) {
    nodes {
      slug
      title
    }
  }
  services(first: 9999) {
    nodes {
      slug
      title
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Insights Page */
export const getInsightsInside = async (slug) => {
	const query = `
query GetInsightsInside {
  postBy(slug: "${slug}") {
    title
    slug
    date
    content
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    categories(first: 9999) {
      nodes {
        slug
        name
      }
    }
    language {
      id
      code
      language_code
      native_name
    }
    tags(first: 9999) {
      nodes {
        name
        slug
      }
    }
    postFields {
      appleLink
      otherLink
      googleLink
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
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      bottomSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      spotifyLink
      time
      youtubeLink
      authors {
        nodes {
          ... on PostAuthor {
            content
            title
            slug
            postAuthors {
              thumbnail {
                linkedinLink
                designation
                image {
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
      speakers {
        nodes {
          ... on PostSpeaker {
            title
            slug
            postSpeakers {
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
            }
          }
        }
      }
      client {
        title
        image {
          node {
            altText
            sourceUrl
          }
        }
      }
      podcast
      poweredBy {
        nodes {
          ... on Product {
            id
            products {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
            title
            slug
          }
          contentType {
            node {
              id
              label
              name
              uri
            }
          }
          ... on Service {
            id
            title
            slug
            contentType {
              node {
                name
                uri
                label
              }
            }
            services {
              thumbnail {
                primaryColor
              }
              map {
                logo {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
              banner {
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
            contentType {
              node {
                label
                name
              }
            }
            softwares {
              thumbnail {
                primaryColor
              }
              banner {
                logo {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
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
      testimonials {
        nodes {
          ... on Testimonial {
            id
            content
            title
            slug
            testimonials {
              designation
            }
          }
        }
      }
      recordingSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      sections {
        content
        sectionTitle
      }
      mediaContact {
        designation
        email
        name
        phone
      }
      about {
        content
        sectionTitle
      }
    }
  }
}
    `;

	let res = {};
	try {
		res = await GraphQLAPI(query);
		return res;
	} catch (error) {
		console.log("error", error);
	}
	return res;
};
