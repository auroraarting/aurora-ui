import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getAllEvents = async (filters = "first:9999") => {
	const query = `
query GetEvents {
  events(${filters}) {
    nodes {
      title
      slug
      content
      events {
        interestedDesc
      pricingDesc
      thumbnail {
        address
        date
        endDate
        time
        externalUrl
        logo {
          node {
            altText
            mediaItemUrl
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
            mediaItemUrl
          }
        }
        mobileImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      downloads {
        link
        file {
          node {
            altText
            mediaItemUrl
          }
        }
        type {
          nodes {
            ... on Eventdownload {
              id
              name
              eventDownloads {
                icon {
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
      glimps {
        sectionTitle
        gallery {
          nodes {
            altText
            mediaItemUrl
          }
        }
        video
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
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    middleSectionButton{
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
      location {
        address
        mapLink
        desc
      }
      speakers {
        sectionDesc
        sectionTitle
        speakers {
          sessions {
            address
            time
            timeSlot
            title
          }
          speakers {
            nodes {
              ... on PostSpeaker {
                id
                content
                title
                slug
                postSpeakers {
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
              mediaItemUrl
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
      whyAttend {
      desc
        agenda {
          address
          time
          timeSlot
          title
          speaker {
            nodes {
              ... on PostSpeaker {
                id
                title
                slug
                postSpeakers {
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
                }
              }
            }
          }
        }
      }
      banner {
        desktop {
          node {
            altText
            mediaItemUrl
          }
        }
        mobile {
          node {
            altText
            mediaItemUrl
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

/** Fetch Page */
export const getEventsInside = async (slug) => {
	const query = `
query GetEventInside {
  eventBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    content
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    events {
      interestedDesc
      pricingDesc
      thumbnail {
        address
        date
        endDate
        time
        logo {
          node {
            altText
            mediaItemUrl
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
            mediaItemUrl
          }
        }
        mobileImage {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      downloads {
        link
        file {
          node {
            altText
            mediaItemUrl
          }
        }
        type {
          nodes {
            ... on Eventdownload {
              id
              name
              eventDownloads {
                icon {
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
      glimps {
        sectionTitle
        gallery {
          nodes {
            altText
            mediaItemUrl
          }
        }
        video
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
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
    middleSectionButton{
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
      location {
        address
        mapLink
        desc
      }
      speakers {
        sectionDesc
        sectionTitle
        speakers {
          sessions {
            address
            time
            timeSlot
            title
          }
          speakers {
            nodes {
              ... on PostSpeaker {
                id
                content
                title
                slug
                postSpeakers {
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
              mediaItemUrl
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
      whyAttend {
      desc
        agenda {
          address
          time
          timeSlot
          title
          speaker {
            nodes {
              ... on PostSpeaker {
                id
                title
                slug
                postSpeakers {
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
                }
              }
            }
          }
        }
      }
      banner {
        desktop {
          node {
            altText
            mediaItemUrl
          }
        }
        mobile {
          node {
            altText
            mediaItemUrl
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

/** Fetch Page */
export const getEventLandingPage = async () => {
	const query = `
query GetEventLanding {
  page(id: "event-landing", idType: URI) {
    title
    slug
    eventLanding {
      banner {
        desc
        title
      }
      speakers {
        sectionTitle
        sectionDesc
        speakers(first: 999) {
          nodes {
            ... on PostSpeaker {
              id
              content
              title
              postSpeakers {
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      mediaItemUrl
                    }
                  }
                }
                sessions {
                  address
                  time
                  timeSlot
                  title
                }
                articles {
                  articlesby(first: 999) {
                    nodes {
                      ... on Post {
                        id
                        slug
                        title
                        postFields {
                          time
                        }
                        date
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      audienceSpeak {
        sectionTitle
        testimonials {
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
      featured {
        nodes {
          ... on Event {
            title
            slug
            events {
              interestedDesc
              pricingDesc
              thumbnail {
                address
                date
                time
                externalUrl
                logo {
                  node {
                    altText
                    mediaItemUrl
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
              banner {
                desktop {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
                mobile {
                  node {
                    altText
                    mediaItemUrl
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
}
      `;
	const res = await GraphQLAPI(query);
	return res;
};
