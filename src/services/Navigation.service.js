import { getAllEvents } from "./Events.service";
import GraphQLAPI from "./Graphql.service";
import { getInsights } from "./Insights.service";

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
              mediaItemUrl
            }
          }
        }
          thumbnail {
          banner {
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
              mediaItemUrl
            }
          }
        }
          thumbnail {
          banner {
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
              mediaItemUrl
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
              mediaItemUrl
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
              mediaItemUrl
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
              mediaItemUrl
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
      countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          slug
          title
          countries {
            hideonglobalpresence
          }
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
          mediaItemUrl
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
              mediaItemUrl
            }
          }
        }
        banner {
          desktop {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  page(id: "search-topics", idType: URI) {
    searchTopics {
      topPages {
        title
        url
      }
      topSearches {
        title
        url
      }
    }
  }
}
    `;

	const [navdata, webinardata] = await Promise.all([
		GraphQLAPI(combinedQuery),
		getInsights(
			// eslint-disable-next-line quotes
			'first:1, where: { categoryName: "public-webinar,webinar,webinar-recording" }'
		),
	]);

	const data = navdata?.data;
	const webinar = webinardata?.data?.posts?.nodes || [];

	const softwares = data?.softwares?.nodes
		?.map((item) => {
			return {
				title: item?.title,
				slug: item?.slug,
				logo: {
					logo: item?.softwares?.map?.logo?.node?.mediaItemUrl,
					altText: item?.softwares?.map?.logo?.node?.altText,
				},
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));
	const products = data?.products?.nodes
		?.map((item) => {
			return {
				title: item?.title,
				slug: item?.slug,
				logo: {
					logo: item?.products?.map?.logo?.node?.mediaItemUrl,
					altText: item?.products?.map?.logo?.node?.altText,
				},
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));
	const services = data?.services?.nodes
		?.map((item) => {
			return {
				title: item?.title,
				slug: item?.slug,
				content: item?.content,
				logo: {
					logo: item?.services?.map?.logo?.node?.mediaItemUrl,
					altText: item?.services?.map?.logo?.node?.altText,
				},
			};
		})
		.sort((a, b) => a.title.localeCompare(b.title));
	const regions = data?.regions.nodes?.sort(
		(a, b) =>
			parseFloat(a.regionsFields?.sequence || 0) -
			parseFloat(b.regionsFields?.sequence || 0)
	);
	const events = data?.events?.nodes;
	const whoareyous = data?.whoareyous.nodes.sort((a, b) =>
		a.title.localeCompare(b.title)
	);
	const howWeHelps = data?.howWeHelps.nodes.sort((a, b) =>
		a.title.localeCompare(b.title)
	);
	const topPages = data?.page?.searchTopics?.topPages;
	const topSearches = data?.page?.searchTopics?.topSearches;

	return {
		products,
		softwares,
		services,
		regions,
		whoareyous,
		howWeHelps,
		events,
		webinar,
		topPages,
		topSearches,
		ok: true,
	};
}
