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
          url
          file {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      categories {
        categorytext
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
        url
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
	const res = await GraphQLAPI(query, {
		apiID: "our-team",
		pageID: "/careers/our-team",
	});
	return res;
};
