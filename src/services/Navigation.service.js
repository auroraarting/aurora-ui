import GraphQLAPI from "./Graphql.service";

/** Softwares */
export const getSoftwares = async () => {
	const query = `
query GetSoftwares {
  softwares {
    nodes {
      title
      slug
      softwares {
        map {
          logo {
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Products */
export const getProducts = async () => {
	const query = `
query GetProducts {
  products {
    nodes {
      title
      slug
      products {
        map {
          logo {
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** Services */
export const getServices = async () => {
	const query = `
query GetServices {
  services {
    nodes {
      title
      slug
      content
      services {
        map {
          logo {
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
    `;
	const res = await GraphQLAPI(query);
	return res;
};
