import GraphQLAPI from "./Graphql.service";

/** About Page */
export const getOurTeamsPage = async () => {
	const query = `
query OurTeamPage {
  page(id: "our-team", idType: URI) {
    ourTeams {
      banner {
        title
        desc
      }
      insights {
        sectionTitle
        sectionDesc
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
      categories {
        category {
          node {
            ... on Product {
              id
              slug
              title
            }
            ... on Service {
              id
              slug
              title
            }
            ... on Software {
              id
              slug
              title
            }
            slug
          }
        }
        desc
        leader {
          node {
            ... on Team {
              id
              title
              slug
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
        leaderDesc {
          desc
          title
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
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
