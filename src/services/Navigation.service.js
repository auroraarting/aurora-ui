import { getAllEvents } from "./Events.service";
import GraphQLAPI from "./Graphql.service";

/** Softwares */
export const getSoftwares = async () => {
	const query = `
query GetSoftwares {
  softwares(first: 9999) {
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
          thumbnail {
          banner {
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
          thumbnail {
          banner {
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
  softwares(first: 9999) {
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
  products(first: 9999) {
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
  services(first: 9999) {
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
  regions(first: 9999) {
    nodes {
      name
      slug
      regionsFields {
        sequence
      }
      countries(first: 9999) {
        nodes {
          slug
          title
        }
      }
    }
  }
  whoareyous(first: 9999) {
    nodes {
      title
      slug
    }
  }
  howWeHelps(first: 9999) {
    nodes {
      title
      slug
    }
  }
  events(first: 1) {
    nodes {
      title
      slug
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      events {
        thumbnail {
          date
          status
          time
          logo {
            node {
              altText
              sourceUrl
            }
          }
        }
        banner {
          desktop {
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
	const [navdata, eventsdata] = await Promise.all([
		GraphQLAPI(combinedQuery),
		getAllEvents("first: 1"),
	]);

	const data = navdata?.data;

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
	const regions = data?.regions.nodes?.sort(
		(a, b) =>
			parseFloat(a.regionsFields?.sequence || 0) -
			parseFloat(b.regionsFields?.sequence || 0)
	);
	const events = data?.events?.nodes;
	const whoareyous = data?.whoareyous.nodes;
	const howWeHelps = data?.howWeHelps.nodes;

	return {
		products,
		softwares,
		services,
		regions,
		whoareyous,
		howWeHelps,
		events,
		ok: true,
	};
}
