import GraphQLAPI from "./Graphql.service";

/** Podcasts Page */
export const getPodcasts = async (filterString = "first:9999") => {
	const query = `
query GetPodcasts {
  podcasts(${filterString}) {
    nodes {
      title
      slug
      date
      content
      podcastFields {
        time
        date
        country(first: 9999) {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
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

/** Podcast Page */
export const getPodcastInside = async (slug) => {
	const query = `
query GetPodcastBy {
  podcastBy(slug: "${slug}") {
    title
    slug
    content
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    podcastFields {
      date
      appleLink
      otherLink
      googleLink
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
      spotifyLink
      time
      youtubeLink
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
                    mediaItemUrl
                  }
                }
              }
            }
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
      sections {
        content
        sectionTitle
      }
      country(first: 9999) {
        nodes {
          ... on Country {
            id
            title
            slug
          }
        }
      }
      interested
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
