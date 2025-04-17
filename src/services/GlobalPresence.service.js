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
                slug
                title
                content
                service {
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
                coordinates {
                  lat
                  lng
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
query GetCountryInside {
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
        title
        tabTitle
        description
        advantages {
          icon {
            node {
              altText
              sourceUrl
            }
          }
          advantagesTitle
          advantagesDescription
        }
      }
      availableRegions {
        sectionTitle
        tabTitle
      }
      ourClients {
        sectionTitle
        tabTitle
        selectLogos {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
        testimonials {
          nodes {
            ... on Testimonial {
              id
              title
              content
              testimonials {
                designation
              }
            }
          }
        }
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
                slug
                title
                content
                service {
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
              slug
            }
          }
          coordinates {
            lat
            lng
          }
          locationtitle
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
