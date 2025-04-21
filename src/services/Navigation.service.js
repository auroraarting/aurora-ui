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

/** Regions */
export const getRegions = async () => {
	const query = `
query GetRegions {
  regions {
    nodes {
      name
      slug
      countries {
        nodes {
          slug
          title
        }
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};

/** fetchNavigationData  */
export async function fetchNavigationData() {
	const combinedQuery = `
 query GetAllNavigationData {
  softwares(first: 999) {
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
  products(first: 999) {
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
  services(first: 999) {
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
  regions(first: 999) {
    nodes {
      name
      slug
      countries {
        nodes {
          slug
          title
        }
      }
    }
  }
  whoareyous(first: 999) {
    nodes {
      title
      slug
    }
  }
  howWeHelps(first: 999) {
    nodes {
      title
      slug
    }
  }
}
    `;
	const { data } = await GraphQLAPI(combinedQuery);

	const softwares = data?.softwares?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo: item?.softwares?.map?.logo?.node?.sourceUrl,
				altText: item?.softwares?.map?.logo?.node?.altText,
			},
		};
	});
	const products = data?.products?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo: item?.products?.map?.logo?.node?.sourceUrl,
				altText: item?.products?.map?.logo?.node?.altText,
			},
		};
	});
	const services = data?.services?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			content: item?.content,
			logo: {
				logo: item?.services?.map?.logo?.node?.sourceUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const regions = data?.regions.nodes;
	const whoareyous = data?.whoareyous.nodes;
	const howWeHelps = data?.howWeHelps.nodes;

	return { products, softwares, services, regions, whoareyous, howWeHelps };
}
