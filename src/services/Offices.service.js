import GraphQLAPI from "./Graphql.service";

/** Get Offices By Regions Page */
export const getOfficesByRegions = async () => {
	const query = `
query GetOffices {
  regions(first: 999) {
    nodes {
      name
      slug
      countries(first: 999) {
        nodes {
          title
          slug
          countries {
            offices {
              offices(first: 999) {
                nodes {
                  ... on Office {
                    id
                    content
                    title
                    offices {
                      thumbnail {
                        node {
                          altText
                          sourceUrl
                        }
                      }
                      map {
                        lat
                        lng
                      }
                      contact {
                        address
                        tel
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
