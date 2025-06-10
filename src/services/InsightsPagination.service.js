import GraphQLAPI from "./Graphql.service";

/** Insights Page */
export const getInsights = async ({ first = 36, after = null } = {}) => {
	const query = `
    query GetInsights($first: Int!, $after: String) {
      posts(first: $first, after: $after) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          content
          title
          slug
          categories(first: 10) {
            nodes {
              slug
              name
            }
          }
          language {
            id
            code
            language_code
            native_name
          }
          tags(first: 10) {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

	const variables = { first, after };

	try {
		const res = await GraphQLAPI(query, variables);

		// Check if response contains the expected data
		if (res && res.data && res.data.posts) {
			const { nodes, pageInfo } = res.data.posts;
			return { nodes, pageInfo };
		} else {
			console.error("Unexpected response structure:", res);
			return { nodes: [], pageInfo: {} }; // Fallback structure if response is unexpected
		}
	} catch (error) {
		console.error("Error fetching data from GraphQL:", error);
		return { nodes: [], pageInfo: {} }; // Fallback structure in case of error
	}
};
