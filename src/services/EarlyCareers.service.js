import GraphQLAPI from "./Graphql.service";

/** About Page */
export const getEarlyCareersPage = async () => {
	const query = `
query GetEarlyCareersLanding {
  page(id: "early-careers-landing", idType: URI) {
    id
    earlyCareersLanding {
      banner {
        desc
        title
        desktop {
          node {
            altText
            mediaItemUrl
          }
        }
        mobile {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      careerSeries {
        buttonLink
        buttonText
        iframe
        title
      }
      expertise {
        description
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
          popup {
            title
            desc
            list {
              address
              category
              date
              time
            }
            list2 {
              desc
              title
            }
          }
        }
      }
      keyAdvantages {
        description
        title
        advantages {
          advantagesDescription
          advantagesTitle
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      listing {
        title
      }
    }
  }
  programs(first: 9999) {
    nodes {
      slug
      name
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** About Page */
export const getEarlyCareersListing = async (filters = "first: 99999") => {
	const query = `
query GetEarlyCareersListing {
  earlyCareers(${filters}) {
    nodes {
      title
      slug
      earlyCareers {
        thumbnail {
          islive
          country {
            node {
              ... on Country {
                id
                slug
                title
              }
            }
          }
          thumb {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      programs(first: 99999) {
        nodes {
          slug
          name
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** About Page */
export const getEarlyCareersInside = async (slug) => {
	const query = `
query GetCareers {
  earlyCareerBy(slug: "${slug}") {
    title
    slug
    earlyCareers {
      banner {
      city
        applicationWindow
        commencingIn
        programmeDuration
        desktop {
          node {
            altText
            mediaItemUrl
          }
        }
        mobile {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      careerSeries {
        buttonLink
        buttonText
        iframe
        title
      }
      collaborationSupport {
        sectionTitle
        list {
          desc
          bgcolor
          featuredImg {
            node {
              altText
              mediaItemUrl
            }
          }

          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      expertise {
        description
        title
        expertiseAccordion {
          accordionTitle
        }
      }
      expertise2 {
        description
        title
        expertiseAccordion {
          accordionDescription
          accordionTitle
          buttonLink
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
          popup {
            desc
            title
            list {
              address
              category
              date
              time
            }
          }
        }
      }
      insights {
        desc
        title
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
      }
      keyAdvantages {
        buttonText
        description
        title
        advantages {
          advantagesDescription
          advantagesTitle
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
        buttonLink
      }
      thumbnail {
        islive
        thumb {
          node {
            altText
            mediaItemUrl
          }
        }
        country {
          node {
            ... on Country {
              id
              title
              slug
            }
          }
        }
      }
      topSectionButton {
        buttonText
        iframe
        file {
          node {
            altText
            mediaItemUrl
          }
        }
      }
      workingWithOurTeams {
        buttonLink
        buttonText
        sectionDesc
        sectionTitle
        list {
          desc
          title
          icon {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      theApplicationProcess {
        description
        title
        applicationTips {
          desc
          list {
            desc
            title
          }
        }
        expertiseAccordion {
          accordionTitle
          accordionDesc
          icon {
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
