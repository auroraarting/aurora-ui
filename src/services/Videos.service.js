import { cache } from "react";
import GraphQLAPI from "./Graphql.service";

/** Fetch All Videos */
export const getAllVideos = async (filters = "first:9999") => {
	const query = `
query GetVideosListing {
  videos(${filters}) {
    nodes {
      title
      slug
      content
      videoFields {
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        topic {
          nodes {
            ... on Page {
              id
              title
              slug
            }
            ... on Software {
              id
              title
              slug
            }
            ... on Product {
              id
              title
              slug
            }
          }
        }
        date
        # TODO: enable once the "customText" (WYSIWYG) field is added to the
        # Video Fields group in the CMS - the listing already renders it and
        # falls back to a default line while it is missing.
        # customText
        country {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
        videoLink
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "video",
		pageID: "/resources/videos",
	});
	return res;
};

/** Videos Page */
export const getVideosInside = async (slug) => {
	const query = `
query GetVideosInside {
  videoBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    date
    content
    status
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    videoCategories(first: 9999) {
      nodes {
        slug
        name
      }
    }
    videoTags(first: 9999) {
      nodes {
        name
        slug
      }
    }
    videoFields {
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
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      bottomSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
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
      time
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
                    mediaItemUrl
                  }
                }
              }
              articles {
                articlesby(first: 9999) {
                  nodes {
                    ... on Post {
                      id
                      slug
                      title
                      date
                      postFields {
                        time
                      }
                      categories(first: 9999) {
                        nodes {
                          name
                          slug
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
      newSpeakers {
        desc
        title
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
      client {
        title
        image {
          node {
            altText
            mediaItemUrl
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
                    mediaItemUrl
                  }
                }
              }
              banner {
                logo {
                  node {
                    altText
                    mediaItemUrl
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
                    mediaItemUrl
                  }
                }
              }
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
                    mediaItemUrl
                  }
                }
              }
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
            mediaItemUrl
          }
        }
      }
      sections {
        content
        sectionTitle
        lottie {
          node {
            altText
            mediaItemUrl
          }
        }
        buttons {
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
      mediaContact {
        designation
        name
        email {
          text
        }
        phone {
          text
        }
      }
      about {
        content
        sectionTitle
      }
      insights {
        desc
        title
      }
      thumbnail {
        node {
          altText
          mediaItemUrl
        }
      }
      topic {
        nodes {
          ... on Page {
            id
            title
            slug
          }
          ... on Software {
            id
            title
            slug
          }
          ... on Product {
            id
            title
            slug
          }
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
      videoLink
      interestedIn {
        description
      }
    }
  }
}
    `;

	let res = {};
	try {
		res = await GraphQLAPI(query, {
			apiID: "videos",
			pageID: `/resources/videos`,
		});
		return res;
	} catch (error) {
		console.log("error", error);
	}
	return res;
};
