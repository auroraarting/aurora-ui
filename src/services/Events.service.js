import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getAllEvents = async () => {
	const query = `
query GetEvents {
  events(first:9999) {
    nodes {
      title
      slug
      events {
        thumbnail {
          address
          date
          status
          time
          logo {
            node {
              altText
              sourceUrl
            }
          }
          country {
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
      eventscategories {
        nodes {
          name
          slug
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
export const getAllEventCategories = async () => {
	const query = `
query GetEventCategories {
  eventscategories {
    nodes {
      name
      slug
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getAllEventCountries = async () => {
	const query = `
query GetEventInside {
  countries(first: 9999) {
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

/** Fetch Page */
export const getEventsInside = async () => {
	const query = `
query GetEventInside {
  events {
    nodes {
      title
      slug
      events {
        thumbnail {
          address
          date
          status
          time
          logo {
            node {
              altText
              sourceUrl
            }
          }
          country {
            nodes {
              ... on Country {
                id
                title
                slug
              }
            }
          }
        }
        breakdown {
          sectionDesc
          sectionTitle
          images {
            nodes {
              altText
              sourceUrl
            }
          }
        }
        downloads {
          link
          text
          file {
            node {
              altText
              sourceUrl
            }
          }
        }
        glimps {
          sectionTitle
          gallery {
            nodes {
              altText
              sourceUrl
            }
          }
          video {
            node {
              altText
              sourceUrl
            }
          }
        }
        hightlights {
          sectionTitle
          hightlights {
            text
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
              sourceUrl
            }
          }
        }
        location {
          address
          mapLink
        }
        speakers {
          sectionDesc
          sectionTitle
          speakers {
            nodes {
              ... on PostSpeaker {
                id
                title
                slug
                postSpeakers {
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
                }
              }
            }
          }
        }
        sponsors {
          sectionTitle
          sponsors {
            title
            gallery {
              nodes {
                altText
                sourceUrl
              }
            }
          }
        }
        topSectionButton {
          buttonText
          iframe
          file {
            node {
              altText
              sourceUrl
            }
          }
        }
        whyAttend {
          agenda {
            text
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
