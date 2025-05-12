import GraphQLAPI from "./Graphql.service";

/** Team Sectors Section */
export const getTeamSectors = async () => {
	const query = `
query GetTeamSectors {
  teamsectors(first: 9999) {
    nodes {
      name
      slug
      teams(first: 9999) {
        nodes {
          title
          slug
          content
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
                articles {
                  articlesby {
                    nodes {
                      ... on CaseStudy {
                        id
                        content
                        title
                        slug
                        date
                        featuredImage {
                          node {
                            altText
                            mediaItemUrl
                          }
                        }
                        caseStudies {
                          readTime
                          selectLocation {
                            nodes {
                              ... on Country {
                                id
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
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
