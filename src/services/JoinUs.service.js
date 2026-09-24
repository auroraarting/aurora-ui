// Switched from Graphql.service (Redis hop, POST, uncacheable) to
// GraphqlDirect (origin, GET, cached and tagged). Reverting is this one line
// — the old module is untouched and still exported.
import GraphQLAPI from "./GraphqlDirect.service";

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
