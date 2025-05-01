import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getAllEvents = async (filters = "first:9999") => {
	const query = `
query GetEvents {
  events(${filters}) {
    nodes {
      title
      slug
      events {
      interestedDesc
      pricingDesc
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
export const getEventsInside = async (slug) => {
	const query = `
query GetEventInside {
  eventBy(slug: "${slug}") {
    title
    slug
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    events {
    interestedDesc
      pricingDesc
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
        desktopImage {
          node {
            altText
            sourceUrl
          }
        }
        mobileImage {
          node {
            altText
            sourceUrl
          }
        }
      }
      downloads {
        link
        text
        icon {
          node {
            altText
            sourceUrl
          }
        }
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
        video
        videoThumbnail {
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
              content
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
                sessions {
                  address
                  time
                  timeSlot
                  title
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
      banner {
        desktop {
          node {
            altText
            sourceUrl
          }
        }
        mobile {
          node {
            altText
            sourceUrl
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
