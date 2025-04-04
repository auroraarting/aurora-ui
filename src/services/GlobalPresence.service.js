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
                      softwares {
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
          featuredImage {
            node {
              altText
              sourceUrl(size: LARGE)
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

/** Fetch Country Inside */
export const getCountryInside = async (slug) => {
	const query = `
   query NewQuery {
  countryBy(slug: "${slug}") {
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
          mobileImage {
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
      featuredImage {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
