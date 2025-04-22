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
