import { ServerHeaders } from "@/utils/RequestHeaders";
import GraphQLAPI from "./Graphql.service";
import { GraphQLAPILongerRevalidate } from "./Graphql.service";

/** Fetch Regions Data */
export const getRegions = async () => {
	const query = `
 query GetCountryInside {
  regions {
    nodes {
      name
      slug
      countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          content
          slug
          title
          countries {
            hideonglobalpresence
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
                    mediaItemUrl
                  }
                }
                mapThumbnail {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
                category {
                  nodes {
                    slug
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
              mediaItemUrl
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
  countryBy(slug: "${decodeURIComponent(slug)}") {
    translations {
      slug
      title
      countries {
        hideonglobalpresence
        bannerSection {
          description
          title
          videoLink
          image {
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
        announcement {
          slide {
            thumbnailImage {
              node {
                altText
                mediaItemUrl
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
                mediaItemUrl
              }
            }
            advantagesTitle
            advantagesDescription
          }
        }
        availableRegions {
          sectionTitle
          tabTitle
          team(first: 9999) {
            nodes {
              ... on Team {
                id
                title
                teams {
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
        ourClients {
          sectionTitle
          tabTitle
          selectLogos(first: 999) {
            nodes {
              ... on ClientsLogo {
                id
                featuredImage {
                  node {
                    altText
                    mediaItemUrl
                  }
                }
              }
            }
          }
          testimonials(first: 999) {
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
          sectionDesc
        }
        subscribeSection {
          description
          sectionTitle
          image {
            node {
              altText
              mediaItemUrl
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
                mediaItemUrl
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
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
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
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
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
                      headerLogo {
                        node {
                          altText
                          mediaItemUrl
                        }
                      }
                      logo {
                        node {
                          altText
                          mediaItemUrl
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
            bottomText
          }
        }
        mapThumb {
          node {
            altText
            mediaItemUrl
          }
        }
        topSectionsButton {
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
        middleSectionsButton {
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
        keyAdvantageSectionsButton {
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
        availableRegionsSectionsButton {
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
        insightsSectionsButton {
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
