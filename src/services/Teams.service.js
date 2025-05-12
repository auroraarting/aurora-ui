import GraphQLAPI from "./Graphql.service";

/** Team Sectors Section */
export const getTeamSectors = async () => {
	const query = `
query GetTeamSectors {
  countries(first: 999) {
    nodes {
      title
      slug
    }
  }
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
                              ... on Post {
              id
              title
              slug
              content
              date
              categories(first: 9999) {
                nodes {
                  slug
                  name
                }
              }
              postFields {
                time
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
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
