import GraphQLAPI from "./Graphql.service";

/** Fetch Page */
export const getServiceData = async (slug) => {
	const query = `
    query designation {
  servicesBy(slug: "${slug}") {
    content
    slug
    title
    banner {
      banner {
        title
        description
        mobileThumbnail{
          node {
            altText
            sourceUrl
          }
        }
        desktopThumbnail {
          node {
            altText
            sourceUrl
          }
        }
        vimeoLink
        buttonLink
      }
      expertise {
        title
        tabTitle
        description
        accordian {
          title
          description
          buttonLink
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      keyAdvantages {
        title
        desciption
        buttonLink
        tabTitle
        advantages {
          description
          icon {
            node {
              altText
              sourceUrl
            }
          }
        }
      }
      availableRegions {
        tabTitle
        marqueeText
      }
      ourClients {
        tabTitle
        title
      }
      map {
        lat
        lng
      }
    }
  }
}
    `;
	const res = await GraphQLAPI(query);
	return res;
};
