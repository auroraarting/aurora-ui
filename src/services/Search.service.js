import { allCategories, isCategory } from "@/utils";
import GraphQLAPI from "./Graphql.service";

/** Search Data  */
export async function searchData(searchTerm) {
	const combinedQuery = `
 query GetSearchData {
  softwares(first: 999, where: {search: "${searchTerm}"}) {
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
  products(first: 999, where: {search: "${searchTerm}"}) {
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
  services(first: 999, where: {search: "${searchTerm}"}) {
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
  regions(first: 999, where: {search: "${searchTerm}"}) {
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
  whoareyous(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      title
      slug
    }
  }
  howWeHelps(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      title
      slug
    }
  }
  webinars(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      slug
      title
    }
  }
  offices(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      offices {
        contact {
          address
          tel
        }
      }
      title
      slug
    }
  }
  pages(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      slug
      title
    }
  }
  teamsectors(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      name
      slug
    }
  }
  teams(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      content
      slug
      title
    }
  }
  testimonials(first: 999, where: {search: "${searchTerm}"}) {
    nodes {
      content
      title
      testimonials {
        designation
      }
    }
  }
  posts(first: 9999,where: {search: "${searchTerm}", categoryName: "case-studies,commentary,market-reports,media,policy-notes,newsletters,new-launches"}) {
    nodes {
      title
      slug
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
    }
  }
  events(first: 9999, where: {search: "${searchTerm}"}) {
    nodes {
      title
      slug
      events{
         thumbnail {
        externalUrl
        openExternalInNewTab
      }
      }
    }
  }
  earlyCareers(first: 9999, where: {search: "${searchTerm}"}) {
    nodes {
      title
      slug
    }
  }
  podcasts(first: 9999, where: {search: "${searchTerm}"}) {
    nodes {
      title
      slug
    }
  }
    countries(first: 9999, where: {orderby: {field: TITLE, order: ASC},search: "${searchTerm}"}) {
        nodes {
          slug
          title
        }
  }
}
    `;
	const { data } = await GraphQLAPI(combinedQuery, {
		apiID: "common",
		pageID: "/common",
	});

	/** removeDuplicatesByTitle  */
	function removeDuplicatesByTitle(arr) {
		const seen = new Set();
		return arr.filter((item) => {
			if (!item.title || seen.has(item.title)) return false;
			seen.add(item.title);
			return true;
		});
	}

	const softwares = data?.softwares?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo: item?.softwares?.map?.logo?.node?.mediaItemUrl,
				altText: item?.softwares?.map?.logo?.node?.altText,
			},
		};
	});
	const products = data?.products?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			logo: {
				logo: item?.products?.map?.logo?.node?.mediaItemUrl,
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
				logo: item?.services?.map?.logo?.node?.mediaItemUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const teamsectors = data?.teamsectors?.nodes?.map((item) => {
		return {
			title: item?.name,
			slug: item?.slug,
			logo: {
				logo: item?.services?.map?.logo?.node?.mediaItemUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const teams = data?.teams?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			content: item?.content,
			logo: {
				logo: item?.services?.map?.logo?.node?.mediaItemUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const testimonials = data?.testimonials?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			content: item?.content,
			logo: {
				logo: item?.services?.map?.logo?.node?.mediaItemUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const howWeHelps = data?.howWeHelps?.nodes?.map((item) => {
		return {
			title: item?.title,
			slug: item?.slug,
			content: item?.content,
			logo: {
				logo: item?.services?.map?.logo?.node?.mediaItemUrl,
				altText: item?.services?.map?.logo?.node?.altText,
			},
		};
	});
	const posts = data?.posts?.nodes?.map((item) => {
		/** href  */
		const href = () => {
			let cat = isCategory(allCategories, item?.categories?.nodes, true);
			console.log(item.categories.nodes, "cat");

			if (cat.includes("Articles")) {
				return `/resources/aurora-insights/articles/${item?.slug}`;
			} else if (cat.includes("Case Studies")) {
				return `/resources/aurora-insights/case-studies/${item?.slug}`;
			} else if (cat.includes("Market Reports")) {
				return `/resources/aurora-insights/market-reports/${item?.slug}`;
			} else if (cat.includes("New Launches")) {
				return `/resources/aurora-insights/new-launches/${item?.slug}`;
			} else if (cat.includes("Newsletters")) {
				return `/resources/aurora-insights/newsletters/${item?.slug}`;
			} else if (cat.includes("Policy Notes")) {
				return `/resources/aurora-insights/policy-notes/${item?.slug}`;
			} else if (cat.includes("Media")) {
				return `/company/press-room/${item?.slug}`;
			}
			// ,policy-notes,newsletters
		};
		return { ...item, slug: href() };
	});
	const pages = data?.pages?.nodes;
	const events = data?.events?.nodes;
	const regions = data?.regions.nodes;
	const whoareyous = data?.whoareyous.nodes;
	const offices = data?.offices?.nodes;
	const podcasts = data?.podcasts?.nodes;
	const webinars = data?.webinars?.nodes;
	const earlyCareers = data?.earlyCareers?.nodes;
	const countries = data?.countries?.nodes;

	// const about = data?.pages?.nodes?.[0]?.about;
	// const eos = data?.pages?.nodes?.[0]?.eos;
	// const globalPresence = data?.pages?.nodes?.[0]?.globalPresence;
	// const homepage = data?.pages?.nodes?.[0]?.homepage;
	// const lifeAtAurora = data?.pages?.nodes?.[0]?.lifeAtAurora;

	return {
		products: removeDuplicatesByTitle(products),
		softwares: removeDuplicatesByTitle(softwares),
		services: removeDuplicatesByTitle(services),
		regions: removeDuplicatesByTitle(regions),
		whoareyous: removeDuplicatesByTitle(whoareyous),
		howWeHelps: removeDuplicatesByTitle(howWeHelps),
		teamsectors: removeDuplicatesByTitle(teamsectors),
		teams: removeDuplicatesByTitle(teams),
		// testimonials: removeDuplicatesByTitle(testimonials),
		offices: removeDuplicatesByTitle(offices),
		webinars: removeDuplicatesByTitle(webinars),
		posts: removeDuplicatesByTitle(posts),
		events: removeDuplicatesByTitle(events),
		pages: removeDuplicatesByTitle(pages),
		podcasts: removeDuplicatesByTitle(podcasts),
		earlyCareers: removeDuplicatesByTitle(earlyCareers),
		countries: removeDuplicatesByTitle(countries),
	};
}
