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
        selectLogos {
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
        testimonials {
          nodes {
            ... on Testimonial {
              id
              title
              slug
              testimonials {
                designation
              }
            }
          }
        }
      }
    }
  }
  countries {
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
