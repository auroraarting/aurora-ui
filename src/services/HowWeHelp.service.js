import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleHowWeHelp = async (slug) => {
	const query = `
query GetSingleHowWeHelp {
  howwehelpBy(slug: "${decodeURIComponent(slug)}") {
    title
    slug
    howWeHelpInside {
      banner {
        title
        description
      }
      thumbnail {
        shortDescription
        banner {
          node {
            altText
            mediaItemUrl
          }
        }
        gradient {
          from
          to
        }
        logo {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      ourClient {
        title
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
              content
              title
              testimonials {
                designation
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
      keyAdvantages {
        tabTitle
        title
        description
        buttonLink
        buttonText
        advantages {
          advantagesTitle
          advantagesDescription
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      availableRegions {
        marqueeText
      }
      whyAurora {
        description
        endPoint
        endText
        startText
        title
        list {
          caption
          description
          title
          value
        }
      }
      middleSectionButton {
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
      spotlights {
        selected(first: 9999) {
          nodes {
            ... on Howwehelp {
              id
              title
              slug
              howWeHelpInside {
                thumbnail {
                  shortDescription
                  banner {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                  gradient {
                    from
                    to
                  }
                  logo {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
                stats {
                  count
                  title
                }
              }
            }
            ... on Product {
              id
              slug
              title
              products {
                thumbnail {
                  primaryColor
                  shortDescription
                  banner {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                  gradient {
                    from
                    to
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
            ... on Service {
              id
              title
              slug
              services {
                thumbnail {
                  primaryColor
                  shortDescription
                  banner {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                  gradient {
                    from
                    to
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
              softwares {
                thumbnail {
                  primaryColor
                  shortDescription
                  banner {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                  gradient {
                    from
                    to
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
            contentType {
              node {
                name
                showUi
                uri
              }
            }
          }
        }
      }
      stats {
        count
        title
      }
      insights {
        sectionDesc
        sectionTitle
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Fetch Page */
export const getHowWeHelps = async () => {
	const query = `
query GetAllHowWeHelps {
  howWeHelps(first: 999) {
    nodes {
      slug
      howWeHelpInside {
        banner {
          title
          fieldGroupName
          description
        }
        thumbnail {
          shortDescription
          banner {
            node {
              altText
              mediaItemUrl
            }
          }
          gradient {
            from
            to
          }
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        ourClient {
          title
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
                content
                title
                testimonials {
                  designation
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
        keyAdvantages {
          tabTitle
          title
          description
          buttonLink
          buttonText
          advantages {
            advantagesTitle
            advantagesDescription
            icon {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
        availableRegions {
          marqueeText
        }
      }
    }
  }
}
      `;
	const res = await GraphQLAPI(query);
	return res;
};
