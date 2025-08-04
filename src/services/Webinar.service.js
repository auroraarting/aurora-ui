import GraphQLAPI from "./Graphql.service";

/** Fetch Webinar  Page */
export const getWebinarPage = async () => {
	const query = `
query GetWebinarListing {
  page(id: "webinar-listing", idType: URI) {
    webinarsListing {
      banner {
        desc
        title
      }
      video {
        redirectLink
        sectionDesc
        videoLink
        sectionTitle
        iframe
        videoThumbnail {
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
        url
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
	const res = await GraphQLAPI(query, {
		apiID: "page",
		pageID: "/resources/webinar",
	});
	return res;
};

/** Fetch Webinar  Page */
export const getWebinars = async (filters = "first: 9999") => {
	const query = `
query GetWebinars {
  webinars(${filters}) {
    nodes {
    translations{
        title
        languageCode
      }
      title
      slug
      content(format: RAW)
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      webinarTags(first: 9999) {
        nodes {
          name
          slug
          translations{
          languageCode
          name
          }
        }
      }
      eventCategories(first: 9999) {
        nodes {
          name
          slug
          translations{
          languageCode
          name
          }
        }
      }
      webinarsFields {
        country(first: 9999) {
          nodes {
            ... on Country {
              id
              title
              slug
              translations{
              languageCode
              title
              }
            }
          }
        }
        startDateAndTime
        endDateAndTime
        timezone
        serviceBy(first: 99999) {
          nodes {
            contentType {
              node {
                name
              }
            }
            slug
            ... on Product {
              id
              slug
              title
            }
            ... on Service {
              id
              title
              slug
            }
            ... on Software {
              id
              title
              slug
            }
          }
        }
        sections {
          content
          tabTitle
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "tribe_events",
		pageID: "/resources/webinar",
	});
	return res;
};

/** Fetch Webinar  Page */
export const getWebinarInside = async (slug) => {
	const query = `
query GetWebinarInside {
  webinar(
    id: "${decodeURIComponent(slug)}"
    idType: SLUG
  ) {
    title
    slug
    webinarTags(first: 9999) {
      nodes {
        name
        slug
      }
    }
    eventCategories(first: 9999) {
      nodes {
        name
        slug
      }
    }
    webinarsFields {
    venue
      country(first: 9999) {
        nodes {
          ... on Country {
            id
            title
            slug
          }
        }
      }
      startDateAndTime
      endDateAndTime
      timezone
      serviceBy(first: 99999) {
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
                services {
                  banner {
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
                softwares {
                  banner {
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
                products {
                  banner {
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
      accessRecordingSectionButton {
        buttonText
        iframe
        thumbtext
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
          thumb {
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
        url
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      sections {
        content
        tabTitle
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
      speakers(first: 9999) {
        nodes {
          ... on PostSpeaker {
            id
            slug
            title
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
    content
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "tribe_events",
		pageID: `/resources/webinar/${slug}`,
	});
	return res;
};
