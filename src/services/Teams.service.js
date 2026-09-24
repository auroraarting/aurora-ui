// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

/** Team Sectors Section */
export const getTeamSectors = async () => {
	const query = `
query GetTeamSectors {
  countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
    nodes {
      title
      slug
    }
  }
  teams(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
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
    `;
	const res = await GraphQLAPI(query, {
		apiID: "team",
		pageID: "/careers/our-team",
		// taxonomies
	});
	return res;
};
