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
            sourceUrl
          }
        }
        mobile {
          node {
            altText
            sourceUrl
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
              sourceUrl
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
              sourceUrl
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
export const getEarlyCareersListing = async () => {
	const query = `
query GetEarlyCareersListing {
  earlyCareers(first: 9999) {
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
              sourceUrl
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
