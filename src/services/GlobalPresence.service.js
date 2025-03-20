import { ServerHeaders } from "@/utils/RequestHeaders";
import GraphQLAPI from "./Graphql.service";

/** Fetch Regions Data */
export const getRegions = async () => {
	const query = `
    query NewQuery {
  regions {
    nodes {
      name
      slug
      countries {
        nodes {
          content
          slug
          title
          countries {
            bannerSection {
              description
              title
              videoLink
              image {
                node {
                  altText
                  sourceUrl(size: LARGE)
                }
              }
            }
            announcement {
              slide {
                thumbnailImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                videoLink
                heading
                description
                buttonText
                buttonLink
              }
            }
            introduction {
              sectionTitle
              tabTitle
              description
            }
            ourOfferings {
              sectionTitle
              tabTitle
            }
            keyAdvantages {
              buttonLink
              buttonText
              descripition
              sectionTitle
              advantages {
                description
                image {
                  node {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
              }
            }
            availableRegions {
              sectionTitle
              tabTitle
            }
            ourClients {
              sectionTitle
              tabTitle
            }
            eventsAndWebinars {
              sectionTitle
              tabTitle
            }
            insights {
              sectionTitle
            }
            subscribeSection {
              description
              sectionTitle
              image {
                node {
                  altText
                  sourceUrl(size: LARGE)
                }
              }
            }
            map {
              zoom
              countryPin {
                lat
                lng
              }
              markers {
                icon {
                  node {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
                mapThumbnail {
                  node {
                    altText
                    sourceUrl(size: LARGE)
                  }
                }
                category {
                  nodes {
                    contentType {
                      node {
                        name
                      }
                    }
                    ... on Services {
                      id
                      banner {
                        map {
                          lat
                          lng
                        }
                      }
                      slug
                      title
                    }
                    ... on Software {
                      id
                      banner {
                        map {
                          lat
                          lng
                        }
                      }
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
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getGlobalPresencePage = async () => {
	const query = `
    query NewQuery {
    page(id: "global-presence", idType: URI) {
      globalPresence {
        title
        mapMarquee
        description
      }
    }
  }
    `;
	const res = await GraphQLAPI(query);
	return res;
};

// /** Fetch Blogs Inside Data */
// export const getBlogBySlug = async (slug) => {
// 	const req = await fetch(
// 		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$eq]=${slug}`,
// 		ServerHeaders
// 	);
// 	const res = await req.json();
// 	return res;
// };

// /** Fetch Related Blogs Data */
// export const getRelatedBlogsBySlug = async (slug) => {
// 	const req = await fetch(
// 		`${process.env.STRAPI_DO_BASE_URL}/api/blogs?populate=*&filters[slug][$ne]=${slug}`,
// 		ServerHeaders
// 	);
// 	const res = await req.json();
// 	return res;
// };
