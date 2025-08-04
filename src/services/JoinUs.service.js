import GraphQLAPI from "./Graphql.service";

/** About Page */
export const getJoinUsPage = async () => {
	const query = `
query OurJoinPage {
  page(id: "join-us", idType: URI) {
    joinUs {
      banner {
        buttonLink
        buttonText
        desc
        title
      }
      insights {
        sectionDesc
        sectionTitle
        insightsSectionButton {
          buttonText
          iframe
          file {
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
		apiID: "page",
		pageID: "/careers/join-us",
	});
	return res;
};
