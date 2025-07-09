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
        countries
        advisoryProjects
      }
      ourClient {
        selectLogos(first: 999) {
          nodes {
            ... on ClientsLogo {
              id
              featuredImage {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
          }
        }
        testimonials(first: 999) {
          nodes {
            ... on Testimonial {
              id
              title
              slug
              content
              testimonials {
                designation
              }
            }
          }
        }
      }
    }
  }
countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
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

/** Home Page */
export const getHomePageVoices = async () => {
	const pageVoices = `
    query GetHomePageVoices {
  posts(first: 99999, where: {categoryName: "market-reports", orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
      language {
        id
        code
        language_code
        native_name
      }
      tags(first: 9999) {
        nodes {
          name
          slug
        }
      }
      postFields {
        time
        speakers {
          nodes {
            ... on PostSpeaker {
              id
              title
              slug
              postSpeakers {
                sessions {
                  address
                  time
                  timeSlot
                  title
                }
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              content
            }
          }
        }
      }
    }
  }
  podcasts(first: 99999) {
    nodes {
      title
      slug
      date
      content
      podcastFields {
        time
        date
        country(first: 9999) {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
        poweredBy {
          nodes {
            contentType {
              node {
                id
                label
                name
                uri
              }
            }
            ... on Product {
              id
              title
              slug
            }
            ... on Service {
              id
              title
              slug
            }
            ... on Software {
              id
              title
              slug
            }
          }
        }
      }
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
  webinars(first: 99999) {
    nodes {
      title
      slug
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      webinarTags(first: 9999) {
        nodes {
          name
          slug
        }
      }
      eventCategories(first: 9999) {
        nodes {
          name
          slug
        }
      }
      webinarsFields {
        country(first: 9999) {
          nodes {
            ... on Country {
              id
              title
              slug
            }
          }
        }
        startDateAndTime
        endDateAndTime
        timezone
        serviceBy(first: 99999) {
          nodes {
            contentType {
              node {
                name
              }
            }
            slug
            ... on Product {
              id
              slug
              title
            }
            ... on Service {
              id
              title
              slug
            }
            ... on Software {
              id
              title
              slug
            }
          }
        }
      }
    }
  }
  events(first: 99999) {
    nodes {
      title
      slug
      events {
        interestedDesc
        pricingDesc
        thumbnail {
          address
          date
          time
          externalUrl
          logo {
            node {
              altText
              mediaItemUrl
            }
          }
          country {
            nodes {
              ... on Country {
                id
                title
                slug
              }
            }
          }
          category(first: 999) {
            nodes {
              contentType {
                node {
                  name
                }
              }
              ... on Service {
                id
                slug
                title
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
              ... on Software {
                id
                title
                slug
                content
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
              ... on Product {
                id
                title
                slug
                content
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
          }
        }
        banner {
          desktop {
            node {
              altText
              mediaItemUrl
            }
          }
          mobile {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
      eventscategories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
    `;
	const pageCaseStudies = `query GetHomePageVoicesCaseStudies {
  posts(first: 1, where: {categoryName: "case-studies", orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
      language {
        id
        code
        language_code
        native_name
      }
      tags(first: 9999) {
        nodes {
          name
          slug
        }
      }
      postFields {
        time
        speakers {
          nodes {
            ... on PostSpeaker {
              id
              title
              slug
              postSpeakers {
                sessions {
                  address
                  time
                  timeSlot
                  title
                }
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              content
            }
          }
        }
      }
    }
  }
    }`;
	const pageCommentary = `query GetHomePageVoicesCommentary {
  posts(first: 1, where: {categoryName: "commentary", orderby: {field: DATE, order: DESC}}) {
    nodes {
      title
      slug
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
      categories(first: 9999) {
        nodes {
          slug
          name
        }
      }
      language {
        id
        code
        language_code
        native_name
      }
      tags(first: 9999) {
        nodes {
          name
          slug
        }
      }
      postFields {
        time
        speakers {
          nodes {
            ... on PostSpeaker {
              id
              title
              slug
              postSpeakers {
                sessions {
                  address
                  time
                  timeSlot
                  title
                }
                thumbnail {
                  designation
                  linkedinLink
                  image {
                    node {
                      altText
                      mediaItemUrl
                    }
                  }
                }
              }
              content
            }
          }
        }
      }
    }
  }
    }`;
	const [resFetchAll, resFetchCaseStudies, resFetchCommentary] =
		await Promise.all([
			await GraphQLAPI(pageVoices),
			await GraphQLAPI(pageCaseStudies),
			await GraphQLAPI(pageCommentary),
		]);
	const resAllData = resFetchAll;
	const resCaseStudiesData = resFetchCaseStudies;
	const resCommentaryData = resFetchCommentary;
	const events = resAllData?.data?.events?.nodes
		?.filter((item) => new Date() < new Date(item.events?.thumbnail?.date))
		?.sort(
			(a, b) =>
				new Date(a?.events?.thumbnail?.date) - new Date(b?.events?.thumbnail?.date)
		)
		.slice(0, 3);

	const obj = {
		events: events,
		podcasts: resAllData.data.podcasts.nodes.slice(0, 1),
		webinars: resAllData.data.webinars.nodes
			?.filter(
				(item) => new Date() < new Date(item?.webinarsFields?.startDateAndTime)
			)
			?.sort(
				(a, b) =>
					new Date(a?.webinarsFields?.startDateAndTime) -
					new Date(b?.webinarsFields?.startDateAndTime)
			)
			.slice(0, 1),
		marketReports: resAllData.data.posts.nodes.slice(0, 1),
		caseStudies: resCaseStudiesData.data.posts.nodes.slice(0, 1),
		commentary: resCommentaryData.data.posts.nodes.slice(0, 1),
	};

	let arr = [];

	obj.caseStudies?.map((item) => {
		arr.push({
			...item,
			link: `/resources/aurora-insights/case-studies/${item.slug}`,
			cat: "LATEST Case Study",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	});
	obj.podcasts?.map((item) => {
		let categories = {
			nodes: [],
		};
		item?.podcastFields?.country?.nodes?.map((item2, ind) => {
			categories.nodes.push({ name: item2.title });
		});
		arr.push({
			...item,
			link: `/resources/energy-unplugged/${item.slug}`,
			thumb: item?.featuredImage?.node?.mediaItemUrl,
			cat: "Energy Unplugged",
			categories,
			date: item?.podcastFields?.date,
		});
	});
	obj.events?.map((item) => {
		let categories = {
			nodes: [],
		};
		item?.events?.thumbnail?.country?.nodes?.map((item2, ind) => {
			categories.nodes.push({ name: item2.title });
		});
		arr.push({
			...item,
			link: `/events/${item.slug}`,
			thumb: item?.events?.banner?.desktop?.node?.mediaItemUrl,
			cat: "UPCOMING Event",
			categories,
			date: item?.events?.thumbnail?.date,
			externalUrl: item?.events?.thumbnail?.externalUrl,
		});
	});
	obj.commentary?.map((item) => {
		arr.push({
			...item,
			link: `/resources/aurora-insights/articles/${item.slug}`,
			cat: " Article",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	});
	obj.webinars?.map((item) => {
		let categories = {
			nodes: [],
		};
		item?.webinarsFields?.country?.nodes?.map((item2, ind) => {
			categories.nodes.push({ name: item2.title });
		});
		arr.push({
			...item,
			link: `/resources/webinar/${item.slug}`,
			thumb: item?.featuredImage?.node?.mediaItemUrl,
			cat: "Webinar",
			categories,
			date: item?.webinarsFields?.startDateAndTime,
		});
	});
	obj.marketReports?.map((item) => {
		arr.push({
			...item,
			link: `/resources/aurora-insights/market-reports/${item.slug}`,
			cat: "Market Report",
			thumb: item?.featuredImage?.node?.mediaItemUrl,
		});
	});

	return arr;
};
