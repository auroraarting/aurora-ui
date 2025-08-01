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
          primaryColor
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
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/common",
	});
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
          primaryColor
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
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/common",
	});
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
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/common",
	});
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
	const res = await GraphQLAPI(query, {
		apiID: "common",
		pageID: "/common",
	});
	return res;
};

/** fetchNavigationData  */
export async function fetchNavigationData() {
	/** removeDuplicateCountries */
	function removeDuplicateCountries(regions) {
		const seenSlugs = new Set();

		return regions.map((region) => {
			const uniqueCountries = [];

			for (const country of region.countries.nodes) {
				if (!seenSlugs.has(country.slug)) {
					seenSlugs.add(country.slug);
					uniqueCountries.push(country);
				}
			}

			return {
				...region,
				countries: {
					nodes: uniqueCountries,
				},
			};
		});
	}

	const combinedQuery = `
 query GetAllNavigationData {
  softwares(first: 9999,where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      softwares {
        map {
          headerLogo {
            node {
              altText
              mediaItemUrl
            }
          }
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
  products(first: 9999, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      products {
        map {
          headerLogo {
            node {
              altText
              mediaItemUrl
            }
          }
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
  services(first: 9999, where: {orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      content
      services {
        map {
          headerLogo {
            node {
              altText
              mediaItemUrl
            }
          }
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
          openExternalInNewTab
          date
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
		GraphQLAPI(combinedQuery, {
			apiID: "common",
			pageID: "/common",
		}),
		getInsights(
			// eslint-disable-next-line quotes
			'first:1, where: { categoryName: "public-webinar,webinar,webinar-recording" }'
		),
	]);

	const data = navdata?.data;
	const webinar = webinardata?.data?.posts?.nodes || [];

	const softwares = data?.softwares?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo:
					item?.softwares?.map?.headerLogo?.node?.mediaItemUrl ||
					item?.softwares?.map?.logo?.node?.mediaItemUrl,
				altText:
					item?.softwares?.map?.headerLogo?.altText ||
					item?.softwares?.map?.logo?.node?.altText,
			},
		};
	});
	// .sort((a, b) => a.title.localeCompare(b.title));
	const products = data?.products?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo:
					item?.products?.map?.headerLogo?.node?.mediaItemUrl ||
					item?.products?.map?.logo?.node?.mediaItemUrl,
				altText:
					item?.products?.map?.headerLogo?.altText ||
					item?.products?.map?.logo?.node?.altText,
			},
		};
	});
	// .sort((a, b) => a.title.localeCompare(b.title));
	const services = data?.services?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			content: item?.content,
			logo: {
				logo:
					item?.services?.map?.headerLogo?.node?.mediaItemUrl ||
					item?.services?.map?.logo?.node?.mediaItemUrl,
				altText:
					item?.services?.map?.headerLogo?.altText ||
					item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	// .sort((a, b) => a.title.localeCompare(b.title));
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
		regions: removeDuplicateCountries(regions),
		whoareyous,
		howWeHelps,
		events,
		webinar,
		topPages,
		topSearches,
		ok: true,
	};
}
