import GraphQLAPI from "./Graphql.service";

/** Team Sectors Section */
export const getTeamSectors = async () => {
	const query = `
query GetTeamSectors {
  teamsectors {
    nodes {
      name
      slug
      teams {
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
                  sourceUrl
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
                            sourceUrl
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
