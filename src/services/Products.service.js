import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getProductPage = async (slug) => {
	const query = `
query GetPageProduct {
  page(id: "product", idType: URI) {
    title
    slug
    productLanding {
      banner {
        title
        description
      }
      mapMarquee
      keyAdvantages {
        title
        tabTitle
        description
        advantages {
          title
          description
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
    }
  }
  products {
    nodes {
      title
      slug
      products {
        thumbnail {
          banner {
            node {
              altText
              sourceUrl
            }
          }
          logo {
            node {
              sourceUrl
              altText
            }
          }
          gradient {
            from
            to
          }
          shortDescription
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
                content
                title
                testimonials {
                  designation
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
