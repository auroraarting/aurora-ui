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
		// The query reads posts plus their categories and tags, so all three have
		// to be flushed. (Note: `variables` is not actually forwarded as GraphQL
		// variables — Graphql.service only sends `query` — so $first/$after never
		// reach WordPress. This module has no importers; see Insights.service.js
		// for the version that is used.)
		const res = await GraphQLAPI(query, {
			...variables,
			tag: ["post", "category", "post-tag"],
		});

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
