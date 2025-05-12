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
                          mediaItemUrl
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

/** Get Offices By Regions Page */
export const getOffices = async () => {
	const query = `
query GetOffices {
  offices(first: 999999) {
    nodes {
      offices {
        thumbnail {
          node {
            altText
            mediaItemUrl
          }
        }
        map {
          lat
          lng
        }
      }
      title
      slug
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
