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
        time
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

/** Fetch Previous Videos - videos published before the given one, newest first */
export const getPreviousVideos = async (slug, filters = "first:9999") => {
	const query = `
query GetPreviousVideos {
  videos(${filters}) {
    nodes {
      title
      slug
      date
      videoFields {
        date
        time
        thumbnail {
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
    }
  }
}
    `;
	const res = await GraphQLAPI(query, {
		apiID: "previousVideos",
		pageID: "/resources/videos",
	});

	const nodes = res?.data?.videos?.nodes || [];
	/** videoDate - the CMS date, falling back to the published date */
	const videoDate = (item) => item?.videoFields?.date || item?.date;
	const current = nodes?.find(
		(item) => item?.slug === decodeURIComponent(slug || ""),
	);

	return nodes
		?.filter((item) => {
			if (item?.slug === current?.slug) return false;
			if (!videoDate(current)) return true;
			return new Date(videoDate(item)) < new Date(videoDate(current)); // published before this one
		})
		?.sort((a, b) => new Date(videoDate(b)) - new Date(videoDate(a)))
		?.map((item) => ({ ...item, date: videoDate(item) }));
};

/** Videos Page */
export const getVideosInside = async (slug) => {
	const query = `
query GetPodcastBy {
  videoBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    content
    featuredImage {
      node {
        altText
        mediaItemUrl
      }
    }
    videoFields {
      date
      appleLink
      otherLink
      googleLink
      thumbnail{
      node {
        altText
        mediaItemUrl
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
      sectionsCopy{
        content
        sectionTitle
        button2 {
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
