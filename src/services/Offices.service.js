import GraphQLAPI from "./Graphql.service";

/** Get Offices By Regions Page */
export const getOfficesByRegions = async () => {
	const query = `
query GetOffices {
  regions(first: 999) {
    nodes {
      name
      slug
      regionsFields {
        sequence
      }
      countries(first: 9999, where: {orderby: {field: TITLE, order: ASC}}) {
        nodes {
          title
          slug
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
          countries {
            sequence
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
                        mapUrl
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
            bannerSection {
              image {
                node {
                  altText
                  mediaItemUrl
                }
              }
            }
            hideonglobalpresence
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
          mapUrl
        }
      }
      title
      slug
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
