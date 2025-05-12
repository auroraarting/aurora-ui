import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getSingleHowWeHelp = async (slug) => {
	const query = `
query GetSingleHowWeHelp {
  howwehelpBy(slug: "${slug}") {
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
            sourceUrl
          }
        }
        gradient {
          from
          to
        }
        logo {
          node {
            altText
            sourceUrl
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
                  sourceUrl
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
                  sourceUrl
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
              sourceUrl
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
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      topSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
          }
        }
      }
      insightsSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            sourceUrl
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
                      sourceUrl
                    }
                  }
                  gradient {
                    from
                    to
                  }
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
              slug
              title
              products {
                thumbnail {
                  primaryColor
                  shortDescription
                  banner {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  gradient {
                    from
                    to
                  }
                  logo {
                    node {
                      altText
                      sourceUrl
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
                      sourceUrl
                    }
                  }
                  gradient {
                    from
                    to
                  }
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
              softwares {
                thumbnail {
                  primaryColor
                  shortDescription
                  banner {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  gradient {
                    from
                    to
                  }
                  logo {
                    node {
                      altText
                      sourceUrl
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
              sourceUrl
            }
          }
          gradient {
            from
            to
          }
          logo {
            node {
              altText
              sourceUrl
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
                    sourceUrl
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
                    sourceUrl
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
                sourceUrl
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
