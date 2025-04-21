import GraphQLAPI from "./Graphql.service";

/** Home Page */
export const getHomePage = async () => {
	const query = `
query NewQuery {
  page(id: "homepage", idType: URI) {
    homepage {
      title
      stats {
        clients
        transactions
      }
      ourClient {
        selectLogos(first: 999) {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              title
              slug
              content
              testimonials {
                designation
              }
            }
          }
        }
      }
    }
  }
  countries(first: 999) {
    nodes {
      title
      slug
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
